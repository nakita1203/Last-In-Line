import React, { useState, useEffect } from "react";
import apiClient from "../utils/axios.js";
import FoodDetail from "./FoodDetail.jsx";

const AdminDashboardPage = () => {
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState("");
    

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await apiClient.get("/item/list-items");
                console.log(response);
                setFoods(response.data.data);
            } catch (err) {
                console.error("Fetch foods error:", err);
                setError(err.response?.data?.message || "Error fetching foods.");
            }
        };

        fetchFoods();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Dashboard</h2>

                {error && <div className="mb-4 text-red-600 text-center text-sm">{error}</div>}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {foods.map((food) => (
                        <FoodDetail key={food._id} foodParam={food} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardPage;