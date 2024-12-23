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
                const response = await apiClient.get(`${import.meta.env.VITE_BASE_URL}/admin/list`);
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
        if (!selectedFood) {
            alert("No food selected for deletion.");
            return;
        }

        try {
            // Pass food_id in the request body (using food_id from selectedFood)
            const response = await apiClient.delete(
                `${import.meta.env.VITE_BASE_URL}/admin/api/delete-food`,
                { data: { food_id: selectedFood._id } }  // Send food_id in the request body
            );

            if (response.data.success) {
                // Remove the deleted item from local state
                setFoods((prevFoods) => prevFoods.filter((food) => food._id !== selectedFood._id));
                setShowModel(false); // Close the modal
                alert("Item deleted successfully.");
            } else {
                alert(response.data.message || "Failed to delete the item.");
            }
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
                            className="bg-white rounded-lg shadow-md p-4 text-center flex flex-col"
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

                            {/* Price Box with Translucent Background */}
                            <div className="mt-2 p-2 bg-gray-700 bg-opacity-50 text-white text-sm font-bold rounded-md inline-block">
                                <span>Rp </span>
                                {food.price}
                            </div>

                            <div className="flex-grow"></div> {/* Ensures button stays at the bottom */}

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