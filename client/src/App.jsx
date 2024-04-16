import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
    );
}

export default App;
