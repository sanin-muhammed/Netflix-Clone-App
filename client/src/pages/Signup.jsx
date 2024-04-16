import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { post_signup } from "../Actions/action";

const Signup = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
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
        const { username, email, phoneNumber, password } = formData;
        if (!username) {
            setMessage("Enter username");
            return;
        } else if (!email) {
            setMessage("Enter email");
            return;
        } else if (!phoneNumber) {
            setMessage("Enter phone number");
            return;
        } else if (!password) {
            setMessage("Enter password");
            return;
        }

        // Send formData to your backend
        const response = await post_signup(formData);
        if (response.message) {
            setMessage(response.message);
        }
        if (response.newUser) {
            navigate("/");
        }
        console.log("response = ", response);
    };

    return (
        <div className="signup_container">
            <div className="signup_box">
                <h1>Sign Up</h1>
                <div className={message ? "alert" : "no_alert"}>{message}</div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Username" />
                    <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" />
                    <input type="number" name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} placeholder="Phone number" />
                    <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" />
                    <button type="submit">Sign Up</button>
                </form>
                <p>
                    Already have an account?<Link to="/login"> Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
