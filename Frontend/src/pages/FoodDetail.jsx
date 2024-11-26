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
        <div className="product-detail-page">
            <div className="product-detail-container">
                <img
                    src={food.image} // Use the correct image path
                    alt={food.name}
                    className="product-detail-image"
                />
                <div className="product-detail-info">
                    <h1>{food.name}</h1>
                    <p>{food.description}</p>
                    <button>Add to Cart</button> {/* Add to cart functionality here */}
                </div>
            </div>
        </div>
    );
};

export default FoodDetail;
