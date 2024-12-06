import React, { useState } from 'react';
import '../styles/SellFoodPage.css';
import Navbar from "../components/Navbar.jsx";

const SellFoodPage = () => {
    const [formData, setFormData] = useState({
        foodName: '',
        price: '',
        description: '',
        category: '',
        expirationDate: '',
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Food Item:', formData);
        // TODO: Replace with API call or state management logic to save the food item
        alert('Food item listed successfully!');
    };

    return (
        <>
            <Navbar />
            <div className="sell-food-page">
                <h1>Sell Your Food</h1>
                <form className="sell-food-form" onSubmit={handleSubmit}>
                    <label>
                        Food Name:
                        <input
                            type="text"
                            name="foodName"
                            value={formData.foodName}
                            onChange={handleInputChange}
                            placeholder="Enter food name"
                            required
                        />
                    </label>

                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Enter price"
                            required
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter a brief description"
                            required
                        />
                    </label>

                    <label>
                        Category:
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="meals">Meals</option>
                            <option value="snacks">Snacks</option>
                            <option value="beverages">Beverages</option>
                            <option value="others">Others</option>
                        </select>
                    </label>

                    <label>
                        Expiration Date:
                        <input
                            type="date"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label>
                        Upload Image:
                        <input type="file" onChange={handleImageUpload} accept="image/*" />
                    </label>

                    <button type="submit">List Food</button>
                </form>
            </div>
        </>
    );
};

export default SellFoodPage;