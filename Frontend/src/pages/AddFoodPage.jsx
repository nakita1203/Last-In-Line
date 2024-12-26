import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {assets} from "../assets/assets.jsx";
import Cookies from "js-cookie";
import "../styles/AddFoodPage.css";

const AddFoodPage = () => {
    const [newFood, setNewFood] = useState({
        name: "",
        description: "",
        price: "",
        category: "Fried Goods",
        prodDate: "",
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFood((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", newFood.name);
        formData.append("description", newFood.description);
        formData.append("price", Number(newFood.price));
        formData.append("category", newFood.category);
        formData.append("prodDate", newFood.prodDate);
        formData.append("image", image);

        try {
            const token = Cookies.get("adminToken"); // Use token for authorization
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/admin/api/add-food`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                alert(response.data.message);
                setNewFood({
                    name: "",
                    description: "",
                    price: "",
                    category: "Fried Goods",
                    prodDate: "",
                });
                setImage(null);
                navigate("/admin/dashboard");
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            console.error("Add food error:", err);
            alert(err.response?.data?.message || "Failed to add food. Please try again.");
        }
    };

    return (
        <div className="add-food">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload">
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img
                            src={!image ? assets.upload_area : URL.createObjectURL(image)}
                            alt="Uploaded Preview"
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name">
                    <p>Food Name</p>
                    <input
                        name="name"
                        value={newFood.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
                <div className="add-product-description">
                    <p>Food Description</p>
                    <textarea
                        name="description"
                        value={newFood.description}
                        onChange={handleChange}
                        type="text"
                        rows={6}
                        placeholder="Write content here"
                        required
                    />
                </div>
                <div className="add-category-price">
                    <div className="add-category">
                        <p>Food Category</p>
                        <select
                            name="category"
                            value={newFood.category}
                            onChange={handleChange}
                        >
                            <option value="Fried Goods">Fried Goods</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Carbs">Carbs</option>
                        </select>
                    </div>
                    <div className="add-price">
                        <p>Food Price</p>
                        <input
                            type="number"
                            name="price"
                            value={newFood.price}
                            onChange={handleChange}
                            placeholder="25000"
                            min="0"
                            required
                        />
                    </div>
                </div>
                <div className="add-prod-date">
                    <p>Production Date</p>
                    <input
                        type="date"
                        name="prodDate"
                        value={newFood.prodDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="add-btn">
                    ADD
                </button>
            </form>
        </div>
    );
};

export default AddFoodPage;