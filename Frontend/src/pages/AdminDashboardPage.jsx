import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import apiClient from "../utils/axios.js";
import DeleteConfirmationModel from "../components/DeleteConfirmation.jsx";

const AdminDashboardPage = () => {
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState("");
    const [showModel, setShowModel] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    // Fetch food items from the server
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await apiClient.get("/items/list-items");
                setFoods(response.data.data);
            } catch (err) {
                console.error("Fetch foods error:", err);
                setError(err.response?.data?.message || "Error fetching foods.");
            }
        };

        fetchFoods();
    }, []);

    // Handle delete button click
    const handleDeleteClick = (food) => {
        setSelectedFood(food);
        setShowModel(true);
    };

    // Confirm deletion
    const handleDeleteConfirm = async () => {
        try {
            await apiClient.delete(`/items/delete-item/${selectedFood._id}`);
            setFoods((prevFoods) =>
                prevFoods.filter((food) => food._id !== selectedFood._id)
            );
            setShowModel(false);
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete the item. Please try again.");
        }
    };

    // Cancel deletion
    const handleCancel = () => {
        setShowModel(false);
    };

    // Handle add food button click
    const handleAddFoodClick = () => {
        navigate("/admin/api/add-food");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Admin Dashboard
                    </h2>
                    <button
                        onClick={handleAddFoodClick}
                        className="bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Add Food
                    </button>
                </div>

                {error && (
                    <div className="mb-4 text-red-600 text-center text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {foods.map((food) => (
                        <div
                            key={food._id}
                            className="bg-white rounded-lg shadow-md p-4 text-center"
                        >
                            <img
                                src={"/" + food.image}
                                alt={food.name}
                                className="h-32 w-full object-scale-down rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-bold text-gray-800">
                                {food.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {food.description}
                            </p>
                            <p className="text-sm text-gray-800 font-bold mt-2">
                                {food.price}
                            </p>
                            <button
                                onClick={() => handleDeleteClick(food)}
                                className="mt-4 bg-red-500 text-white text-sm py-1 px-4 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {showModel && (
                <DeleteConfirmationModel
                    foodName={selectedFood.name}
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default AdminDashboardPage;