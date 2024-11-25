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
        <div className="option-menu" id='option-menu'>
            <h1>What are you looking for?</h1>
            <p className='option-menu-text'>
                fuck around and find out
            </p>
            <div className="option-menu-list">
                {optionList.map((option, index) => (
                    <div
                        onClick={() => setCategory((prev) => (prev === option.option_name ? 'All' : option.option_name))}
                        key={index}
                        className='option-menu-list-item'>
                        <img src={option.image} className={category === option.option_name ? 'active' : ''} alt={option.option_name} />
                        <p>{option.option_name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
};

OptionMenu.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
};

export default OptionMenu;