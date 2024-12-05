import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodDisplay.css';
import FoodItem from "./FoodItem.jsx";
import {StoreContext} from "../context/StoreContext.jsx";

const FoodDisplay = ({category}) => {
    const { foodList } = useContext(StoreContext);
    console.log("FoodDisplay rendered with category:", category);

    if (category !== "Foods") return null;

    //Check if food list is empty
    if (!foodList.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="food-display" id='food-display'>
            <div className="option-menu-list">
                {foodList.map((item) => {
                    if (category === "All" || category === item.category) {
                        return <FoodItem
                            key={item.id}
                            image={item.image}
                            name={item.name}
                            desc={item.description}
                            id={item.id}
                        />;
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

FoodDisplay.propTypes = {
    category: PropTypes.string.isRequired,
};

export default FoodDisplay;