import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../styles/HeaderWithMenu.css";
import { StoreContext } from "../context/StoreContext.jsx";

const HeaderWithMenu = ({ category, setCategory }) => {
    const { optionList } = useContext(StoreContext);

    if (!optionList || optionList.length === 0) {
        console.error("optionList is empty or undefined");
        return <p>Loading options...</p>;
    }

    return (
        <div className="header-container">
            {/* Header Section */}
            <div className="header">
                <div className="header-contents">
                    <h2>Preloved Treasures, New Beginnings</h2>
                    <p>
                        Discover high-quality, gently used items that still have plenty of
                        life to give. From fashion to home essentials, shop sustainably and
                        save without sacrificing style or function. Every purchase supports
                        a greener future by giving great products a second chance.
                    </p>
                    <button>View Menu</button>
                </div>
            </div>

            {/* Option Menu Section */}
            <div className="option-menu">
                <div className="option-menu-list">
                    {optionList.map((option) => (
                        <div
                            key={option.option_name}
                            className={`option-menu-list-item ${
                                category === option.option_name ? "active" : ""
                            }`}
                            onClick={() => setCategory(option.option_name)}
                        >
                            <img src={option.image} alt={option.option_name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

HeaderWithMenu.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
};

export default HeaderWithMenu;