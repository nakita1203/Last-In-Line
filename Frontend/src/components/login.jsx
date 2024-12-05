import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
    console.log("setShowLogin:", typeof setShowLogin); // Debugging log
    const [currentState, setCurrentState] = useState("Login"); // "Login" or "Sign Up"
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Handles input changes
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handles Login or Sign Up form submission
    const onLogin = async (e) => {
        e.preventDefault();
        const endpoint =
            currentState === "Login" ? "/api/user/login" : "/api/user/register";

        try {
            const response = await axios.post(endpoint, data);

            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem("token", token); // Save token to localStorage
                toast.success("Login successful!");
                setShowLogin(false); // Close login popup
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    // Check for existing token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setShowLogin(false);
        }
    }, [setShowLogin]); // Include setShowLogin in dependency array

    return (
        <div className="w-full h-full relative">
            {/* Popup background */}
            <div className="absolute w-[369px] h-[539px] left-[15px] top-[12px] bg-[#5B778D] rounded-[10px]" />
            <div className="absolute w-[369px] h-[539px] left-0 top-0 bg-[#F1F1F1] rounded-[10px] border border-black" />

            {/* Popup title */}
            <div className="absolute left-[100px] top-[93px] text-black text-[32px] font-[600] font-[League Spartan] break-words">
                {currentState === "Login" ? "Please Login" : "Create Account"}
            </div>

            {/* Input fields */}
            {currentState === "Sign Up" && (
                <div className="absolute w-[304px] h-[45px] left-[36px] top-[100px] bg-[#F4F4F4] rounded-[5px] border border-[rgba(27.78,78.51,105.83,0.3)]">
                    <input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={data.name}
                        onChange={onChangeHandler}
                        className="w-full h-full px-3 bg-transparent border-none outline-none"
                        required
                    />
                </div>
            )}
            <div className="absolute w-[304px] h-[45px] left-[36px] top-[159px] bg-[#F4F4F4] rounded-[5px] border border-[rgba(27.78,78.51,105.83,0.3)]">
                <input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={data.email}
                    onChange={onChangeHandler}
                    className="w-full h-full px-3 bg-transparent border-none outline-none"
                    required
                />
            </div>
            <div className="absolute w-[304px] h-[45px] left-[36px] top-[218px] bg-[#F4F4F4] rounded-[5px] border border-[rgba(27.78,78.51,105.83,0.3)]">
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={onChangeHandler}
                    className="w-full h-full px-3 bg-transparent border-none outline-none"
                    required
                />
            </div>

            {/* Submit button */}
            <button
                onClick={onLogin}
                className="absolute w-[304px] h-[45px] left-[36px] top-[374px] bg-[#100909] text-white rounded-[5px] border border-[rgba(27.78,78.51,105.83,0.3)]"
            >
                {currentState === "Login" ? "Sign in" : "Create account"}
            </button>

            {/* Toggle between Login and Sign Up */}
            <div className="absolute left-[78px] top-[488px] text-black text-[14px] font-[500] font-[League Spartan] break-words">
                {currentState === "Login" ? (
                    <p>
                        Don’t have an account?{" "}
                        <span
                            onClick={() => setCurrentState("Sign Up")}
                            className="text-[#0063C0] cursor-pointer"
                        >
                            Sign Up
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span
                            onClick={() => setCurrentState("Login")}
                            className="text-[#0063C0] cursor-pointer"
                        >
                            Login
                        </span>
                    </p>
                )}
            </div>

            {/* Close button */}
            <div
                className="absolute left-[328px] top-[13px] text-black text-[40px] font-[400] font-[League Spartan] break-words cursor-pointer"
                onClick={() => setShowLogin(false)}
            >
                ×
            </div>
        </div>
    );
};

export default LoginPopup;
