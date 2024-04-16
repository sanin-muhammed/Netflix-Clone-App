const Users = require("../models/users");
const colors = require("colors");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv"); // Load variables from .env file
dotenv.config();

// twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize Twilio client
const twilioClient = twilio(accountSid, authToken);

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, //  email SMTP host
    port: process.env.EMAIL_PORT, //  email SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, //  email address
        pass: process.env.EMAIL_PASSWORD, //  email password
    },
});
let otpCache = {};

// Function to generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to send OTP via SMS
function sendOTPviaSMS(phoneNumber, otp) {
    const message = `Your OTP is: ${otp}`;

    twilioClient.messages
        .create({
            body: message,
            from: twilioPhoneNumber,
            to: "+91" + phoneNumber,
        })
        .then((message) => console.log("OTP sent successfully via SMS:".yellow, message.sid))
        .catch((error) => console.error("Error sending OTP via SMS:", error));
}

// Function to send OTP via email
function sendOTPviaEmail(email, otp) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP",
        text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error("Error sending OTP via email:", error);
        }
        console.log("OTP sent successfully via email:".yellow, info.messageId);
    });
}

const sendMailFunction = (email) => {
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Login Message",
        html: `<h1>Welcome to Netflix</h1>
           <h4>Thank you for signing up!</h4>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error occurred:", error);
        } else {
            console.log("Email sent successfully:".yellow, info.messageId);
        }
    });
};

// create a user token function
const maxAge = 24 * 60 * 60;
const createUserToken = (id) => {
    return jwt.sign({ id }, "user secret key", {
        expiresIn: maxAge,
    });
};

exports.post_signup = async (req, res) => {
    try {
        const { username, email, phoneNumber, password } = req.body;
        console.log("req body = ", { username, email, phoneNumber, password });
        const newUser = new Users({ username, email, phoneNumber, password });

        await newUser.save(); // Saving the new user to the database
        sendMailFunction(email);

        const token = createUserToken(newUser._id);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });

        // console.log('token =',token);
        console.log("signup successfull".yellow);
        
        res.status(200).json({ newUser })
    } catch (error) {
        if (error.name === "ValidationError") {
            // Handle validation errors
            res.status(400).json({ message: error.message });
        } else if (error.code === 11000) {
            // Handle duplicate key errors
            if (error.keyValue.email) {
                console.log("This email is already used".red);
                res.status(400).json({ message: "This email is already used" });
            } else if (error.keyValue.phoneNumber) {
                console.log("This phone number is already used".red);
                res.status(400).json({ message: "This phone number is already used" });
            } else {
                // If neither email nor phoneNumber is provided, send a generic error message
                console.log("Duplicate key error".red);
                res.status(400).json({ message: "Duplicate key error" });
            }
        } else {
            // Handle other errors
            console.log("error =>", { error });
            res.status(500).json({ error });
        }
    }
};
const checkValue = (value) => {
    console.log("value =", value);
    return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
};

exports.post_login = async (req, res) => {
    try {
        const { email_or_phone, password } = req.body;
        console.log(req.body);
        const result = await checkValue(email_or_phone);
        console.log("result =", result);
        if (result) {
            // the request is email
            const email = email_or_phone;
            const userExist = await Users.findOne({ email, password });
            console.log("user =", userExist);
            if (userExist) {
                const otp = generateOTP();
                otpCache[email] = otp; // Store OTP in cache
                console.log("otp =", otp.yellow);
                console.log("otpcache =", otpCache);
                // Send OTP via email
                sendOTPviaEmail(email, otp);
                res.status(200).json({ userExist, source: email });
            } else {
                res.status(400).json({ message: "User is not exist" });
            }
        } else {
            // the request is phoneNumber
            const phoneNumber = email_or_phone;
            const userExist = await Users.findOne({ phoneNumber, password });
            console.log("user =", userExist);
            if (userExist) {
                const otp = await generateOTP();
                otpCache[phoneNumber] = otp; // Store OTP in cache
                console.log("otp =", otp.yellow);
                console.log("otpcache =", otpCache);
                // Send OTP via SMS
                sendOTPviaSMS(phoneNumber, otp);
                res.status(200).json({ userExist, source: phoneNumber });
            } else {
                res.status(400).json({ message: "User is not exist" });
            }
        }
    } catch (error) {
        console.log("server error", error);
    }
};

exports.verify_otp = (req, res) => {
    const { otp, source } = req.body;
    console.log("req body otp =", otp);
    console.log("req body source =", source);

    if (otpCache[source] == otp) {
        res.status(200).json({ status: true });
        console.log(true);
    } else {
        console.log(false);
        res.status(200).json({ status: false, message: "otp is incorrect" });
    }
};
