import React, { useContext, useState } from "react";
import "./ProductItem.css";
import { assets } from '../assets/assets.jsx';
import { StoreContext } from '../context/StoreContext.jsx';
import {Link} from "react-router-dom";

const ProductItem = ({image, name, price, desc, id}) => {

    const [itemCount, setItemCount] = useState(0);
    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

    return(
        <Link to={`/product/${id}`}>
            <div className="product-item">
                <div className="product-item-img-container">
                    <img
                        className="product-item-image"
                        src={`${image}`}
                        alt={name}
                    />
                    {!cartItems[id] ? (
                        <img
                            className="add"
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_white} alt="add to cart"
                        />
                    ) : (
                        <div className="product-item-counter">
                            <img
                                src={assets.remove_icon_red}
                                onClick={() => removeFromCart(id)}
                                alt="remove from cart"
                            />
                        </div>
                    )}
                </div>
                <div className="product-item-info">
                    <p className="product-item-name">{name}</p>
                    <p className="product-item-desc">{desc}</p>
                    <p className="product-item-price">{price}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem;