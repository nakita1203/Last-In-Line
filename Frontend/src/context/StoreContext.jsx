import npReact, {createContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import omen from '../assets/omen.png'
import alien from '../assets/alien.png'
import { productList, optionList, foodList } from "../assets/assets.jsx";
import apiClient from "../utils/axios.js"; 

export const StoreContext = createContext(); // No arguments here

const StoreProvider = ({ children }) => {
    const url = '../assets'
    const [cartItems, setCartItems] = useState({
        1: 2,
        2: 1,
        3: 1,
    });

    const [user, setUser] = useState(null); // Start with null user

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

    useEffect(() => {
        const fetchUser = async () => {
            console.log("Fetching user...");
            try {
                const response = await apiClient.get(`/user/api/account`, { withCredentials: true });
                if (response.data.success) {
                    setUser(response.data.user); // Save user data from the backend
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            }
        };

        fetchUser(); // Call the function when the component mounts
    }, []);

    return (
        <StoreContext.Provider
            value={{
                cartItems,
                optionList,
                productList,
                foodList,
                removeFromCart,
                getTotalCartAmount,
                url,
                user,
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