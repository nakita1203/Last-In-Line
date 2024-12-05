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
import DonationPage from "./pages/DonationPage.jsx";
import DonationForm from "./pages/DonationForm.jsx";

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
                    <Route path="/donate" element={<DonationPage />} />
                    <Route path="/donate/add" element={<DonationForm />} />
                </Routes>
            </div>
        </StoreProvider>
    );
}

export default App;
