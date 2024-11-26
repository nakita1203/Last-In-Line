import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from '../assets/assets.jsx';
import { StoreContext } from '../context/StoreContext.jsx';
import {Link} from "react-router-dom";

const FoodItem = ({image, name, desc, id}) => {

    const [itemCount, setItemCount] = useState(0);

    return(
        <Link to={`/foods/${id}`}>
            <div className="food-item">
                <div className="food-item-img-container">
                    <img
                        className="food-item-image"
                        src={`${image}`}
                        alt={name}
                    />
                </div>
                <div className="food-item-info">
                    <p className="food-item-name">{name}</p>
                    <p className="food-item-desc">{desc}</p>
                </div>
            </div>
        </Link>
    )
}

export default FoodItem;