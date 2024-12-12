import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext.jsx';
import './ProductDetail.css';

const ProductDetail = () => {
    const { productList } = useContext(StoreContext);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (productList && productList.length > 0) {
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
                <div className="product-detail-image-container">
                    <img src={product.image} alt={product.name} className="product-detail-image" />
                </div>
                <div className="product-detail-info">
                    <div>
                        <h1 className="product-name">{product.name}</h1>
                        <p className="product-price">{product.price}</p>
                        <div className="product-description-container">
                            <p className="product-description">{product.description}</p>
                        </div>
                    </div>
                    <div className="product-actions">
                        <button className="product-button product-button-buy">Buy</button>
                        <button className="product-button product-button-cart">+ Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;