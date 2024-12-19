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
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminRegisterPage from "./pages/AdminRegisterPage.jsx";
import AdminDashboard from "./pages/AdminDashboardPage.jsx";

function App() {

    const user = { name: 'hachiware', username: 'hachiwareeee' }; // Mock user data

    return (
        <StoreProvider>
            {/*<Navbar />*/}
            {/*<div className="mt-16">*/}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage user={user} />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="product/:productId" element={<ProductsDetail />} />
                    <Route path="foods/:foodId" element={<FoodDetail />} />
                    <Route path="/sell/goods" element={<SellGoodsPage />} />
                    <Route path="/sell/food" element={<SellFoodPage />} />
                    <Route path="/donate" element={<DonationPage />} />
                    <Route path="/donate/add" element={<DonationForm />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin/register" element={<AdminRegisterPage />} />
                    <Route path="/admin/list" element={<AdminDashboard />} />
                </Routes>
            {/*</div>*/}
        </StoreProvider>
    );
}

export default App;
