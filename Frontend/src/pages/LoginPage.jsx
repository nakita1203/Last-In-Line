import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/LoginPage.css';
import BackArrow from "../assets/back-arrow.png";

const LoginPage = () => {
    const navigate = useNavigate();
    const url = `${import.meta.env.VITE_API_URL}/user/login`;
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const sessionId = localStorage.getItem('sessionId');
        if (token && sessionId) {
            axios.get(`${import.meta.env.VITE_API_URL}/user/validate-session`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })
                .then(res => {
                    if (res.data.success) {
                        navigate("/home");
                    }
                })
                .catch((err) => {
                    console.error("Session validation error: ", err);
                    localStorage.removeItem("token");
                    localStorage.removeItem("sessionId");
                });
        }
    }, [navigate]);

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    };

    const userLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                url,
                data,
                {
                    withCredentials: true
                }
            );
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("sessionId", response.data.sessionId);
                toast.success("Welcome back!");
                navigate("/home");
            } else if (response.data.message === "Session expired or invalid.") {
                setError("Session expired. Please log in again.");
                toast.error("Session expired. Please log in again.", {
                    position: "top-right",
                });
            } else if (response.data.message === "User already logged in elsewhere.") {
                setError("You are already logged in from another device.");
                toast.error("You are already logged in from another device.", {
                    position: "top-right",
                });
            } else {
                setError(response.data.error || "Invalid credentials.");
                toast.error(response.data.error || "Invalid credentials.", {
                    position: "top-right",
                });
            }
        } catch (err) {
            setError("Login failed. Please check your credentials.");
            toast.error("Login failed. Please check your credentials.", {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-container">
            <ToastContainer />
            <form onSubmit={userLogin} className="login-form">
                <a href="/home" className="back-to-register">
                    <img src={BackArrow} alt="back" />
                </a>
                <h2>Login</h2>
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
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p>
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/register")} className="register-link">
                        Register here
                    </span>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;