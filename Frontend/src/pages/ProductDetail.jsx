import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access URL params
import { StoreContext } from '../context/StoreContext.jsx';
import './ProductDetail.css'; // Assuming you will add styles for the product detail page

const ProductDetail = () => {
    const { productList } = useContext(StoreContext); // Get the product list from context
    const { productId } = useParams(); // Get the product ID from URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Find the product based on the productId from URL
        const foundProduct = productList.find(item => item.id === parseInt(productId));
        setProduct(foundProduct);
    }, [productId, productList]);

    if (!product) {
        return <div>Loading...</div>; // Show loading until the product is found
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <img
                    src={require(`../assets/${product.image}`)} // Assuming image is in assets folder
                    alt={product.name}
                    className="product-detail-image"
                />
                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p className="product-detail-price">{product.price}</p>
                    <button>Add to Cart</button> {/* Add to cart functionality here */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
