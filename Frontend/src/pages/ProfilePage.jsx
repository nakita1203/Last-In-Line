import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import "../styles/ProfilePage.css";
import axios from "axios";
import apiClient from "../utils/axios.js";

const ProfilePage = () => {
    const { user, setUser } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`user/api/logout`, {}, { withCredentials: true });
            setUser(null); // Clear user from context
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        if (!user) {
            const timeout = setTimeout(() => {
                navigate("/login"); // Delay navigation by 2 seconds
            }, 2000);
            return () => clearTimeout(timeout); // Cleanup timeout on unmount
        }
    }, [user, navigate]);

    if (!user) {
        return (
            <div className="redirect-container">
                <div className="redirect-box">
                    <h2 className="redirect-title">Redirecting...</h2>
                    <p className="redirect-message">You will be taken to the Login Page shortly.</p>
                </div>
            </div>
        );
    }       

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-header">
                    <h1 className="profile-welcome">Welcome, {user.name}</h1>
                    <p className="profile-username">@{user.username}</p>
                </div>
                <div className="profile-options">
                    <button className="profile-button logout-button" onClick={handleLogout}>
                        Log Out
                    </button>
                    <Link to="/sell/goods">
                        <button className="profile-button sell-goods-button">Sell Goods</button>
                    </Link>
                    <Link to="/sell/food">
                        <button className="profile-button sell-food-button">Sell Food</button>
                    </Link>
                    <Link to="/donate/add">
                        <button className="profile-button donate-button">Donate Here</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
