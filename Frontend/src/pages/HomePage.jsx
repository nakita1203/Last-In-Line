import React, {useContext, useState} from 'react';
import Header from '../components/Header.jsx';
import OptionMenu from "../components/OptionMenu.jsx";
import ItemDisplay from "../components/ItemDisplay.jsx";
import FoodDisplay from "../components/FoodDisplay.jsx";
import {StoreContext} from "../context/StoreContext.jsx";

const HomePage = () => {
    const [category, setCategory] = useState("All");
    const { productList } = useContext(StoreContext);
    const { foodList } = useContext(StoreContext);

    return (
        <>
            <Header />
            <OptionMenu setCategory={setCategory} category={category}/>
            {/* Show ItemDisplay for categories other than "Foods" */}
            {category !== "Foods" && <ItemDisplay category={category} productList={productList} />}
            {/* Show FoodDisplay only when category is "Foods" */}
            <FoodDisplay category={category} />
        </>
    );
};

export default HomePage;