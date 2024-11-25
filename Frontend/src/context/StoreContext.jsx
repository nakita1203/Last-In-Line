import React, {createContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import omen from '../assets/omen.png'
import alien from '../assets/alien.png'
import { productList, optionList } from "../assets/assets.jsx";

export const StoreContext = createContext(); // No arguments here

const StoreProvider = ({ children }) => {
    const url = '../assets'
    const [cartItems, setCartItems] = useState({
        1: 2,
        2: 1,
        3: 1,
    });

    const removeFromCart = (id) => {
        const newCart = { ...cartItems };
        delete newCart[id];
        setCartItems(newCart);
    };

    const getTotalCartAmount = () => {
        return productList.reduce((total, product) => {
            const quantity = cartItems[product.id] || 0;
            return total + product.price * quantity;
        }, 0);
    };

    return (
        <StoreContext.Provider
            value={{
                cartItems,
                optionList,
                productList,
                removeFromCart,
                getTotalCartAmount,
                url,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StoreProvider;