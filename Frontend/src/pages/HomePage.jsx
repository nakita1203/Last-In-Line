import React, {useContext, useState} from 'react';
import Header from '../components/Header.jsx';
import OptionMenu from "../components/OptionMenu.jsx";
import ItemDisplay from "../components/ItemDisplay.jsx";
import {StoreContext} from "../context/StoreContext.jsx";

const HomePage = () => {
    const [category, setCategory] = useState("All");
    const { productList } = useContext(StoreContext);

    return (
        <>
            <Header />
            <OptionMenu setCategory={setCategory} category={category}/>
            <ItemDisplay category={category} productList={productList}/>
        </>
    )
}

export default HomePage;