import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Home from "../assets/home.png";
import GiveLove from "../assets/give-love.png";
import ShoppingCart from "../assets/shopping-cart.png";
import User from "../assets/user.png";
import "../styles/Navbar.css";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserIconClicked, setIsUserIconClicked] = useState(false);

    const handleMouseEnter = () => {
        if (!isUserIconClicked) {
            setIsDropdownOpen(true);
        }
    };
    const handleMouseLeave = () => {
        if (!isUserIconClicked) {
            setIsDropdownOpen(false);
        }
    };
    const handleUserClick = () => {
        setIsUserIconClicked(true);
        window.location.href = "/profile";
    };

    return (
        <nav className="navbar">
            {/* Left: Logo */}
            <div className="navbar-logo">
                <img src={Logo} alt="LIL Logo" />
            </div>

            {/* Center: Icons */}
            <div className="navbar-icons">
                <Link to={"/"} className="icon-link">
                    <img src={Home} alt="Home" />
                </Link>
                <Link to={"/donate"} className="icon-link">
                    <img src={GiveLove} alt="Donation" />
                </Link>
                <Link to={"/cart"} className="icon-link">
                    <img src={ShoppingCart} alt="Shopping Cart" />
                </Link>
            </div>

            {/* Right: Search bar and User Icon */}
            <div className="navbar-right">
                <div className="search-bar">
                    <input type="text" placeholder="search..." />
                    <span className="search-icon">🔍</span>
                </div>

                {/* User Icon and Dropdown */}
                <div
                    className="user-menu"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button className="icon-button" onClick={handleUserClick}>
                        <img src={User} alt="User" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && !isUserIconClicked && (
                        <div className="dropdown">
                            <Link to="/profile" className="dropdown-link">
                                Profile
                            </Link>
                            <Link to="/sell/goods" className="dropdown-link">
                                Sell Goods
                            </Link>
                            <Link to="/sell/foods" className="dropdown-link">
                                Sell Foods
                            </Link>
                            <Link to="/donate/add" className="dropdown-link">
                                Donate
                            </Link>
                            <button
                                onClick={() => alert("Logging out...")}
                                className="dropdown-link"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;