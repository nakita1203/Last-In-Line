import React, { useContext } from "react";
import "../styles/CartPage.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Cart = () => {
    const { cartItems, productList, removeFromCart, getTotalCartAmount } =
        useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className="cart">
            {/* Cart Items */}
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr className="title-line"/>
                {productList.map((item, index) => {
                    if (cartItems[item.id] > 0) {
                        return (
                            <div key={index}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={item.image}
                                         alt=""
                                         style={{ width: "100px", height: "100px" }}
                                    />
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
                                <div className="cart-items-line">
                                    <hr/>
                                </div>
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
