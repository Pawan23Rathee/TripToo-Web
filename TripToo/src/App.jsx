// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import ProductSection from './Component/ProductSection';
import Banner from './Component/Banner';
import CartPage from './Component/CartPage';
import AboutUs from './Page/AboutUs';
import ShopPage from './Page/ShopPage';
import ContactPage from './Page/ContactPage';
import OrderPage from './Page/OrderPage';
import SignUpPage from './Page/SignUpPage';
import SignInPage from './Page/SignInPage';
import ProductDetailPage from './Page/ProductDetailPage'; // <--- Import ProductDetailPage
import { useAuth } from './Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) { return <div className="text-center py-20 text-xl text-gray-700">Loading user...</div>; }
  if (!currentUser) { return <Navigate to="/signin" replace />; }
  return children;
};

function App() {
  return (
    <Router>
      <div className="bg-[#f0f2f5] text-[#333] min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<><Banner /><ProductSection /><AboutUs /></>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />

            {/* <--- New: Product Detail Page Route */}
            <Route path="/products/:productId" element={<ProductDetailPage />} />

            <Route path="/my-orders" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
            <Route path="/help-settings" element={<ProtectedRoute>
              <div className="bg-white max-w-2xl mx-auto my-8 p-8 rounded-lg shadow-xl text-[#0f1c2e]">
                <h1 className="text-3xl font-bold mb-4">Help & Settings</h1>
                <p>This is a protected page. Only logged-in users can see this content.</p>
              </div>
            </ProtectedRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;