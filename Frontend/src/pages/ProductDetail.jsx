import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access URL params
import { StoreContext } from '../context/StoreContext.jsx';
import './ProductDetail.css'; // Assuming you will add styles for the product detail page

const ProductDetail = () => {
    const { productList } = useContext(StoreContext); // Get the product list from context
    const { productId } = useParams(); // Get the product ID from URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (productList && productList.length > 0) {
            // Find the product based on the productId from URL
            const foundProduct = productList.find(item => item.id === productId);
            setProduct(foundProduct);
        }
    }, [productId, productList]);

    if (!product) {
        return <div>{productList.length ? "Product not found" : "Loading..."}</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <img
                    src={product.image} // Use the correct image path
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
