import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFoodPage = () => {
    const [newFood, setNewFood] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        prodDate: "",
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFood({ ...newFood, [name]: value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formNewFood = new FormData();
        formNewFood.append("name", newFood.name);
        formNewFood.append("description", newFood.description);
        formNewFood.append("price", Number(newFood.price));
        formNewFood.append("category", newFood.category);
        formNewFood.append("prodDate", newFood.prodDate);
        formNewFood.append("image", image);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/admin/api/add-food`,
                formNewFood,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.data.success) {
                navigate("/admin/dashboard"); // Redirect to dashboard on success
            } else {
                setError(response.data.message || "Failed to add food. Please try again.");
            }
        } catch (err) {
            console.error("Add food error:", err);
            setError(err.response?.data?.message || "Failed to add food. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Add New Food</h3>
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={newFood.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={newFood.description}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={newFood.price}
                            onChange={handleChange}
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
                    <div className="mb-4">
                        <input
                            type="date"
                            name="prodDate"
                            placeholder="Production Date"
                            value={newFood.prodDate}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            name="category"
                            value={newFood.category}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        >
                            <option value="" disabled>
                                Select Category
                            </option>
                            <option value="Fried Goods">Fried Goods</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Snacks">Snacks</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/dashboard")}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
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