import React, {useState} from "react";
import Alien from "../assets/alien.png";
import Omen from "../assets/omen.png";

export default function CartPage() {
    // Example cart items
    const initialCartItems = [
        {
            id: 1,
            name: "HP OMEN 2021 i5",
            image: Omen,
            price: "0.000069 BTC",
            quantity: 1,
            checked: false,
        },
        {
            id: 2,
            name: "Alienware X14 2022 R1",
            image: Alien,
            price: "Rp6.000.000,00",
            quantity: 1,
            checked: false,
        },
    ];

    const [cartItems, setCartItems] = useState(initialCartItems);
    //const [isAllChecked, setIsAllChecked] = useState(false);
    const isAllChecked = cartItems.every((item) => item.checked);

    // Handle individual checkbox toggle
    const handleCheckboxChange = (id) => {
        const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
        );
        setCartItems(updatedCart);

        // Update the master checkbox state
        // const allchecked = updatedCart.every((item) => item.checked);
        // setIsAllChecked(allchecked);
    };

    // Handle master checkbox toggle
    const handleMasterCheckboxChange = (id) => {
        const updatedState = !isAllChecked; // Toggle all checked state
        const updatedCart = cartItems.map((item) => ({
            ...item,
            checked: updatedState,
        }));
        setCartItems(updatedCart);
    };

    return (
        <div className="cart-page p-6 bg-gray-50 min-h-screen">
            {/* Cart Title */}
            <h1 className="text-2xl font-bold mb-6">Cart</h1>

            {/* Table Headers */}
            <div className="header-row flex items-center justify-between bg-white p-4 rounded-t-lg font-bold text-lg">
                <div className="flex items-center gap-2 flex-1">
                    <input
                        type="checkbox"
                        checked={isAllChecked}
                        onChange={handleMasterCheckboxChange}
                    />Product</div>
                <div className="flex-1 text-center">Quantity</div>
                <div className="flex-1 text-right">Price</div>
            </div>

            {/* Cart Items */}
            <div className="cart-items space-y-6">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="cart-item flex items-center justify-between bg-white shadow-md p-4 rounded-lg mt-4"
                    >
                        {/* Product Details */}
                        <div className="flex-1 flex items-center gap-4">
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 border rounded-lg object-cover"
                            />
                            <span className="text-lg font-medium">{item.name}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex-1 flex items-center gap-4 justify-center">
                            <button className="w-8 h-8 flex items-center justify-center border rounded">
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button className="w-8 h-8 flex items-center justify-center border rounded">
                                +
                            </button>
                            <button className="text-red-500 flex items-center gap-1">
                                <i className="fas fa-trash"></i> Remove
                            </button>
                        </div>

                        {/* Price */}
                        <div className="flex-1 text-right text-lg font-medium">
                            {item.price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
