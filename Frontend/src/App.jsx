import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import StoreProvider from "./context/StoreContext.jsx";
import ProductsDetail from "./pages/ProductDetail.jsx";

function App() {
    return (
        <StoreProvider>
            <Navbar />
            <div className="mt-16">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="product/:productId" element={<ProductsDetail />} />
                </Routes>
            </div>
        </StoreProvider>
    );
}

export default App;
