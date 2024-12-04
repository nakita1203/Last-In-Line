import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access URL params
import { StoreContext } from '../context/StoreContext.jsx';
import './FoodDetail.css';
import foodItem from "../components/FoodItem.jsx";

const FoodDetail = () => {
    const { foodList } = useContext(StoreContext); // Get the food list from context
    const { foodId } = useParams(); // Get the food ID from URL
    const [food, setFood ] = useState(null);

    useEffect(() => {
        if (foodList && foodList.length > 0) {
            // Find the food based on the foodId from URL
            const foundFood = foodList.find(food => food.id === foodId);
            setFood(foundFood);
        }
    }, [foodId, foodList]);

    if (!food) {
        return <div>{foodList.length ? "Product not found" : "Loading..."}</div>;
    }

    return (
        <div className="food-detail-page">
            <div className="food-detail-container">
                <div className="food-detail-image-container">
                    <img src={food.image} alt={food.name} className="food-detail-image"/>
                </div>
                <div className="food-detail-info">
                    <div>
                        <h1 className="food-name">{food.name}</h1>
                        <p className="food-price">{food.price}</p>
                        <div className="food-description-container">
                            <p className="food-description">{food.description}</p>
                        </div>
                    </div>
                    <div className="food-actions">
                        <button className="food-button food-button-buy">+ Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetail;
