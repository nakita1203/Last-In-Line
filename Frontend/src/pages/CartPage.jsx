import React, { useContext } from "react";
import "./CartCSS.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Cart = () => {
    const { cartItems, productList, removeFromCart, getTotalCartAmount } =
        useContext(StoreContext);
    const navigate = useNavigate();

    // Handle master checkbox (select all)
    const handleSelectAll = (e) => {
        const checkboxes = document.querySelectorAll(".product-checkbox");
        checkboxes.forEach((checkbox) => (checkbox.checked = e.target.checked));
    };

    return (
        <div className="cart">
            {/* Cart Items */}
            <div className="cart-items">
                <div className="cart-items-title">
                    <input
                        type="checkbox"
                        id="selectAll"
                        onChange={handleSelectAll}
                    />
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                {productList.map((item) => {
                    if (cartItems[item.id] > 0) {
                        return (
                            <div key={item.id} className="cart-items-item">
                                <div className="cart-items-title">
                                    <input type="checkbox" className="product-checkbox" />
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <div>{cartItems[item.id]}</div>
                                    <p>${item.price * cartItems[item.id]}</p>
                                    <p
                                        className="cart-items-remove-icon"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        x
                                    </p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null; // Skip items not in the cart
                })}
            </div>

            {/* Cart Summary */}
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
