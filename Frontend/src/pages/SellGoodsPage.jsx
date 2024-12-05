import React, { useState } from 'react';
import './SellGoodsPage.css';

const SellGoodsPage = () => {
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        description: '',
        category: '',
        image: null
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
        console.log('Submitted Product:', formData);
        // TODO: Replace with API call or state management logic to save the product
        alert('Product listed successfully!');
    };

    return (
        <div className="sell-goods-page">
            <h1>Sell Your Product</h1>
            <form className="sell-goods-form" onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
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
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                        <option value="others">Others</option>
                    </select>
                </label>

                <label>
                    Upload Image:
                    <input type="file" onChange={handleImageUpload} accept="image/*" />
                </label>

                <button type="submit">List Product</button>
            </form>
        </div>
    );
};

export default SellGoodsPage;
