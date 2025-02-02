import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyUser from "../backend/dummu_user.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"; // Custom CSS for additional styling

const Home = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [googleEmail, setGoogleEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGoogleEmailChange = (e) => {
        setGoogleEmail(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        navigate("/organisation-setup");
    };

    const handleGoogleSignIn = () => {
        setStep(2);
    };

    const handleGoogleEmailSubmit = () => {
        const user = dummyUser.find((user) => user.email === googleEmail);
        if (!user) {
            alert("User not found");
        } else {
            alert("An OTP has been sent to your email");
            setStep(3);
        }
    };

    const handleOtpSubmit = () => {
        const user = dummyUser.find((user) => user.email === googleEmail);
        if (user && user.verification_code === otp) {
            alert("Sign-in successful");
            setFormData({
                name: user.name,
                email: user.email,
                password: user.password,
            });
            navigate("/organisation-setup");
        } else {
            alert("Invalid OTP");
        }
    };

    return (
        <div className="container mt-5 p-4 bg-light rounded shadow form-container">
            <h2 className="text-center mb-4">User Registration Form</h2>
            {step === 1 && (
                <div className="card p-4">
                    <button className="btn btn-danger mb-3 google-btn" onClick={handleGoogleSignIn}>
                        <i className="fab fa-google me-2"></i> Continue with Google
                    </button>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            )}
            {step === 2 && (
                <div className="card p-4">
                    <label className="form-label">Enter your email:</label>
                    <input
                        type="email"
                        className="form-control mb-3"
                        value={googleEmail}
                        onChange={handleGoogleEmailChange}
                    />
                    <button className="btn btn-primary w-100" onClick={handleGoogleEmailSubmit}>Submit</button>
                </div>
            )}
            {step === 3 && (
                <div className="card p-4">
                    <label className="form-label">Enter OTP:</label>
                    <input type="text" className="form-control mb-3" value={otp} onChange={handleOtpChange} />
                    <button className="btn btn-success w-100" onClick={handleOtpSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
};

export default Home;
