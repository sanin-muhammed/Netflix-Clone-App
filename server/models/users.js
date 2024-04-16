const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness of email addresses
        validate: {
            validator: function(value) {
                // Regular expression for validating email format
                return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model("users", userSchema);
// export Users collection
module.exports = Users;
