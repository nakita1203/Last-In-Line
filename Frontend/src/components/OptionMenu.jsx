import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './OptionMenu.css';
import { StoreContext } from "../context/StoreContext.jsx";
import autoprefixer from "autoprefixer";

const OptionMenu = ({ category, setCategory }) => {
    const { optionList } = useContext(StoreContext);

    console.log('optionList', optionList); //Debug log

    if(!optionList || optionList.length === 0) {
        console.error('optionList is empty or undefined');
        return <p>Loading options...</p>;
    }

    return (
        <div className="option-menu">
            <div className="option-menu-list">
                {optionList.map((option) => (
                    <div
                        key={option.option_name}
                        className={`option-menu-list-item ${category === option.option_name ? "active" : ""}`}
                        onClick={() => setCategory(option.option_name)} // Update category
                    >
                        <img src={option.image} alt={option.option_name} />
                        <p>{option.option_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

OptionMenu.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
};

export default OptionMenu;