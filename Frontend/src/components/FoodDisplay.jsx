import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodDisplay.css';
import FoodItem from "./FoodItem.jsx";
import { StoreContext } from "../context/StoreContext.jsx";

const FoodDisplay = ({ category }) => {
    const { foodList, loading, error } = useContext(StoreContext);

    if (category !== "Foods") return null;

    if (loading) {
        return <div>Loading food items...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="food-display" id="food-display">
            <div className="option-menu-list">
                {foodList.map((item) => (
                    <FoodItem
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        desc={item.description}
                        id={item.id}
                    />
                ))}
            </div>
        </div>
    );
};

FoodDisplay.propTypes = {
    category: PropTypes.string.isRequired,
};

export default FoodDisplay;