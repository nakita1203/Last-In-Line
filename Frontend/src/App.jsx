import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import StoreProvider from "./context/StoreContext.jsx";
import ProductsDetail from "./pages/ProductDetail.jsx";
import FoodDetail from "./pages/FoodDetail.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import SellGoodsPage from "./pages/SellGoodsPage.jsx";
import SellFoodPage from "./pages/SellFoodPage.jsx";

function App() {

    const user = { name: 'hachiware', username: 'hachiwareeee' }; // Mock user data

    return (
        <StoreProvider>
            <Navbar />
            <div className="mt-16">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage user={user} />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="product/:productId" element={<ProductsDetail />} />
                    <Route path="foods/:foodId" element={<FoodDetail />} />
                    <Route path="/sell/goods" element={<SellGoodsPage />} />
                    <Route path="/sell/food" element={<SellFoodPage />} />
                </Routes>
            </div>
        </StoreProvider>
    );
}

export default App;
