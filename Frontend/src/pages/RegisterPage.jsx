import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/RegisterPage.css";
import BackArrow from "../assets/back-arrow.png";

const RegisterPage = () => {
    const navigate = useNavigate();
    const url = `${import.meta.env.VITE_API_URL}/user/register`;
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const validateInputs = () => {
        if (!data.name || !data.username || !data.email || !data.password) {
            setError("All fields are required.");
            toast.error("All fields are required.", {
                position: "top-right",
            });
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            setError("Please enter a valid email address.");
            toast.error("Please enter a valid email address.", {
                position: "top-right",
            });
            return false;
        }
        if (data.password.length < 8) {
            setError("Password must be at least 8 characters.");
            toast.error("Password must be at least 8 characters.", {
                position: "top-right",
            });
            return false;
        }
        return true;
    };

    const userRegister = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(url, data, { withCredentials: true });
            if (response.data.success) {
                toast.success("Registration successful! Please log in.", {
                    position: "top-right",
                });
                navigate("/login");
            } else if (response.data.error === "User already exists.") {
                setError("An account with this email already exists.");
                toast.error("An account with this email already exists.", {
                    position: "top-right",
                });
            } else {
                setError(response.data.error || "Registration failed.");
                toast.error(response.data.error || "Registration failed.", {
                    position: "top-right",
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
            toast.error(err.response?.data?.message || "An error occurred. Please try again.", {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <ToastContainer />
            <form onSubmit={userRegister} className="register-form">
                <a href="/" className="back-to-home">
                    <img src={BackArrow} alt="back" />
                </a>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={onChangeHandler}
                        placeholder="Enter your name"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={data.username}
                        onChange={onChangeHandler}
                        placeholder="Enter your username"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        placeholder="Enter your email"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        placeholder="Enter your password"
                        required
                        disabled={loading}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                <p>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="login-link">
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;