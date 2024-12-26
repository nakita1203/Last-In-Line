import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/axios.js";
import Cookies from "js-cookie";
import DeleteConfirmationModel from "../components/DeleteConfirmation.jsx";
import "../styles/AdminDashboardPage.css";

const AdminDashboardPage = () => {
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState("");
    const [showModel, setShowModel] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            const token = Cookies.get("adminToken");
            if (!token) {
                alert("You must be logged in as an admin to access this page.");
                navigate("/admin/login");
                return;
            }

            try {
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

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setIsLoading(true);
                const token = Cookies.get("adminToken");

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

    const handleDeleteClick = (food) => {
        setSelectedFood(food);
        setShowModel(true);
    };

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
                        Authorization: `Bearer ${token}`,
                    },
                    data: { food_id: selectedFood._id },
                }
            );

            if (response.data.success) {
                setFoods((prevFoods) =>
                    prevFoods.filter((food) => food._id !== selectedFood._id)
                );
                setShowModel(false);
                alert("Item deleted successfully.");
            } else {
                alert(response.data.message || "Failed to delete the item.");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert(err.response?.data?.message || "Failed to delete the item.");
        }
    };

    const handleCancel = () => {
        setShowModel(false);
    };

    const handleAddFoodClick = () => {
        navigate("/admin/api/add-food");
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-header">
                <h2>Admin Dashboard</h2>
                <button onClick={handleAddFoodClick} className="admin-add-food-button">
                    Add Food
                </button>
            </div>

            {error && <div className="admin-dashboard-error">{error}</div>}

            {isLoading ? (
                <div className="admin-dashboard-loading">Loading...</div>
            ) : (
                <div className="admin-food-grid">
                    {foods.map((food) => (
                        <div key={food._id} className="admin-food-card">
                            <img
                                src={`${import.meta.env.VITE_BASE_URL}/images/${food.image}`}
                                alt={food.name}
                                className="admin-food-image"
                            />
                            <h3 className="admin-food-name">{food.name}</h3>
                            <p className="admin-food-description">{food.description}</p>
                            <div className="admin-food-price">Rp {food.price}</div>
                            <button
                                onClick={() => handleDeleteClick(food)}
                                className="admin-delete-food-button"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

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