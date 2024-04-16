import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Signup.css";
import { verify_otp } from "../Actions/action";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const source = location.state?.source;

    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        otp: "",
        source: source,
    });
    const handleChange = (e) => {
        setMessage("");
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form data = ", formData);
        const { otp } = formData;
        if (!otp) {
            setMessage("Enter otp");
            return;
        }

        // Send formData to backend
        const response = await verify_otp(formData);
        console.log("response =>", response);
        if (response.status) {
            navigate("/");
        } else {
            setMessage(response.message);
        }
    };

    useEffect(() => {
        if (!source) {
            console.log("source =>", source);
            navigate("/login");
        }
    });

    return (
        <div className="signup_container">
            <div className="signup_box">
                <h1>Enter Otp</h1>
                <div className={message ? "alert" : "no_alert"}>{message}</div>{" "}
                <form onSubmit={handleSubmit}>
                    <input type="number" name="otp" onChange={handleChange} value={formData.otp} placeholder={`Enter otp from ${source}`} />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
