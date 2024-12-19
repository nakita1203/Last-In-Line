import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/axios.js";

const AddFoodPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);

        try {
            await apiClient.post("/api/add-food", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/admin/list"); // Redirect to dashboard after successful addition
        } catch (err) {
            console.error("Add food error:", err);
            setError("Failed to add food. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Add New Food</h3>
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/list")}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={() => navigate("/admin/api/add-food")}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFoodPage;