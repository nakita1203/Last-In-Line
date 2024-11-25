import React, { createContext, useState } from 'react';
import PropTypes from "prop-types";

export const StoreContext = createContext(); // No arguments here

const StoreProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({
        'alienware': 1,
        'omen': 2,
    });

    const productList = [
        { id: 'alienware', name: 'Alienware X14 2022 R1', price: 6000000, image: '/assets/alien.png' },
        { id: 'omen', name: 'HP Omen 2021 i5', price: 5000000, image: 'assets/omen.png' },
    ];

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

    const url = '/assets'

    return (
        <StoreContext.Provider
            value={{
                cartItems,
                productList,
                removeFromCart,
                getTotalCartAmount,
                url
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