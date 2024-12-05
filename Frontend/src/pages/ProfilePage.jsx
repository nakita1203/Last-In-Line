import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from "../context/StoreContext.jsx";
import '../styles/ProfilePage.css';

const ProfilePage = () => {
    const { user } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data
        navigate('/'); // Redirect to home page
    };

    if (!user) {
        return <div>Loading...</div>;
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
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
