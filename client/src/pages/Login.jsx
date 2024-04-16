import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { post_login } from "../Actions/action";

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        email_or_phone: "",
        password: "",
    });

    const handleChange = (e) => {
        setMessage("");
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form data = ", formData);
        const { email_or_phone, password } = formData;
        if (!email_or_phone) {
            setMessage("Enter Email or Phone number");
            return;
        } else if (!password) {
            setMessage("Enter password");
            return;
        }

        // Send formData to backend
        const response = await post_login(formData);
        if (response.message) {
            console.log("message");
            setMessage(response.message);
        }
        if (response.userExist) {
            console.log("exist");
            console.log("source =", response.source);
            navigate("/verify-otp", { state: { source: response.source } });
        }
        console.log("response = ", response);
    };

    return (
        <div className="signup_container">
            <div className="signup_box">
                <h1>Login</h1>
                <div className={message ? "alert" : "no_alert"}>{message}</div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="email_or_phone" onChange={handleChange} value={formData.email_or_phone} placeholder="Email or Phone number" />
                    <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" />
                    <button type="submit">Send OTP</button>
                </form>
                <p>
                    Dont have an account?<Link to="/signup"> Signup</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
