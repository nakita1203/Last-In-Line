import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import './ItemDisplay.css';
import ProductItem from "./ProductItem.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import {optionList} from "../assets/assets.jsx";

const ItemDisplay = ({category}) => {
    const { productList } = useContext(StoreContext);

    //Check if prod list is empty
    if (!productList.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="item-display" id='item-display'>
            <h2>New and cheap stuffs 'round the block</h2>
            <div className="option-menu-list">
                {productList.map((item) => {
                    if (category === "All" || category === item.category) {
                        return <ProductItem
                            key={item.id}
                            image={item.image}
                            name={item.name}
                            desc={item.description}
                            price={item.price}
                            id={item.id}
                        />;
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

ItemDisplay.propTypes = {
    category: PropTypes.string.isRequired,
};

export default ItemDisplay;