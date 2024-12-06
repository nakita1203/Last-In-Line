import React from 'react';
import '../styles/ProductList.css';

const ProductList = ({ products }) => {
    return (
        <div className="product-list-container">
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                            />
                            <div className="product-details">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-donator">Donated by: {product.donator}</p>
                                <div className="product-status">
                                    <span
                                        className={`product-status-label ${
                                            product.status.toLowerCase().replace(" ", "-")
                                        }`}
                                    >
                                        {product.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-products-message">No products available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;