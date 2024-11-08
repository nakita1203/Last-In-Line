import {UilUser} from '@iconscout/react-unicons';
import Logo from '../assets/logo.png'
import Home from '../assets/home.png'
import GiveLove from '../assets/give-love.png'
import ShoppingCart from '../assets/shopping-cart.png'


export default function Navbar() {
    return (
        <nav className="bg-white shadow-md rounded-full flex items-center justify-between px-10 py-3 w-full relative">
            {/* Left: Logo */}
            <div className="flex items-center">
                <img src={Logo} alt="LIL Logo" className="h-14 w-auto"/>
            </div>

            {/* Center: Icons */}
            <div className="absolute inset-x-0 mx-auto flex justify-center space-x-4 w-max">
                <button className="p-2 rounded-lg hover:bg-gray-300 transition">
                    <img src={Home} alt="Home" className="h-6 w-6" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-300 transition">
                    <img src={GiveLove} alt="Donation" className="h-7 w-7" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-300 transition">
                    <img src={ShoppingCart} alt="Shopping Cart" className="h-6 w-6" />
                </button>
            </div>

            {/* Right: Search bar and User Icon */}
            <div className="flex items-center space-x-4">
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
                <button className="p-2 rounded-lg hover:bg-gray-300 transition">
                    <UilUser size="25" />
                </button>
            </div>
        </nav>
    );
}
