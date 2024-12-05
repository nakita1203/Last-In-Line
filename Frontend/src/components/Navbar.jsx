import Logo from '../assets/logo.png';
import Home from '../assets/home.png';
import GiveLove from '../assets/give-love.png';
import ShoppingCart from '../assets/shopping-cart.png';
import User from '../assets/user.png';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md rounded-full flex items-center justify-between px-10 py-3 w-full relative">
            {/* Left: Logo */}
            <div className="flex items-center">
                <img src={Logo} alt="LIL Logo" className="h-14 w-auto" />
            </div>

            {/* Center: Icons */}
            <div className="absolute inset-x-0 mx-auto flex justify-center space-x-4 w-max">
                <Link to={"/"} className="p-2 rounded-lg hover:bg-gray-300 transition">
                    <img src={Home} alt="Home" className="h-6 w-6" />
                </Link>
                <button className="p-2 rounded-lg hover:bg-gray-300 transition">
                    <img src={GiveLove} alt="Donation" className="h-7 w-7" />
                </button>
                <Link to={"/cart"} className="p-2 rounded-lg hover:bg-gray-300 transition">
                    <img src={ShoppingCart} alt="Shopping Cart" className="h-6 w-6" />
                </Link>
            </div>

            {/* Right: Search bar and User Icon */}
            <div className="flex items-center space-x-4 relative">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="search..."
                        className="rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 pl-4 pr-12 py-1 transition w-48"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        🔍
                    </span>
                </div>

                {/* User Icon and Dropdown */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <button className="p-2 rounded-lg hover:bg-gray-300 transition">
                        <img src={User} alt="User" className="h-6 w-6" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg"
                            style={{ zIndex: 1000 }} // Ensure it appears over the banner
                        >
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </Link>
                            <Link
                                to="/sell-goods"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Sell Goods
                            </Link>
                            <Link
                                to="/sell-foods"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Sell Foods
                            </Link>
                            <button
                                onClick={() => alert('Logging out...')}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
