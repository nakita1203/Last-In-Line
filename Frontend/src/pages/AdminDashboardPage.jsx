import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/axios.js";
import Cookies from "js-cookie";
import DeleteConfirmationModel from "../components/DeleteConfirmation.jsx";

const AdminDashboardPage = () => {
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState("");
    const [showModel, setShowModel] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    // Validate token on mount
    useEffect(() => {
        const validateToken = async () => {
            const token = Cookies.get("adminToken"); // Retrieve token from cookies

            if (!token) {
                alert("You must be logged in as an admin to access this page.");
                navigate("/admin/login");
                return;
            }

            try {
                // Verify token with the server
                const response = await apiClient.get(
                    `${import.meta.env.VITE_BASE_URL}/admin/api/verify-token`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.data.success) {
                    navigate("/admin/login");
                }
            } catch (err) {
                console.error("Token validation error:", err);
                navigate("/admin/login");
            }
        };

        validateToken();
    }, [navigate]);

    // Fetch food items from the server
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setIsLoading(true);
                const token = Cookies.get("adminToken"); // Retrieve token from cookies

                const response = await apiClient.get(
                    `${import.meta.env.VITE_BASE_URL}/admin/list`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setFoods(response.data.data);
                setIsLoading(false);
            } catch (err) {
                console.error("Fetch foods error:", err);
                setError(err.response?.data?.message || "Error fetching foods.");
                setIsLoading(false);
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
            const token = Cookies.get("adminToken");
            if (!token) {
                alert("You are not logged in as an admin. Please log in and try again.");
                navigate("/admin/login");
                return;
            }

            const response = await apiClient.delete(
                `${import.meta.env.VITE_BASE_URL}/admin/api/delete-food`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                    },
                    data: { food_id: selectedFood._id }, // Send food_id in the request body
                }
            );

            if (response.data.success) {
                console.log("Deletion successful for food ID:", selectedFood._id);
                setFoods((prevFoods) => prevFoods.filter((food) => food._id !== selectedFood._id));
                setShowModel(false);
                alert("Item deleted successfully.");
            } else {
                console.error("Deletion failed:", response.data.message);
                alert(response.data.message || "Failed to delete the item.");
            }
        } catch (err) {
            console.error("Error during delete API call:", err);
            alert(err.response?.data?.message || "Failed to delete the item. Please try again.");
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
                    <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
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

                {isLoading ? (
                    <div className="text-center text-gray-600">Loading...</div>
                ) : (
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
                                <p className="text-sm text-gray-600">{food.description}</p>

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
                )}
            </div>
            {showModel && (
                <DeleteConfirmationModel
                    foodName={selectedFood?.name}
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default AdminDashboardPage;