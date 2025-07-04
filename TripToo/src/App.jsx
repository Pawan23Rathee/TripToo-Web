// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar.jsx'; // Ensure .jsx
import Footer from './Component/Footer.jsx'; // Ensure .jsx
import ProductSection from './Component/ProductSection.jsx'; // Ensure .jsx
import Banner from './Component/Banner.jsx'; // Ensure .jsx
import CartPage from './Component/CartPage.jsx'; // Ensure .jsx
import AboutUs from './Page/AboutUs.jsx'; // Ensure .jsx
import ShopPage from './Page/ShopPage.jsx'; // Ensure .jsx
import ContactPage from './Page/ContactPage.jsx'; // Ensure .jsx
import OrderPage from './Page/OrderPage.jsx'; // Ensure .jsx
import SignUpPage from './Page/SignUpPage.jsx'; // Ensure .jsx
import SignInPage from './Page/SignInPage.jsx'; // Ensure .jsx
import ProductDetailPage from './Page/ProductDetailPage.jsx'; // Ensure .jsx
import { useAuth } from './Context/AuthContext.jsx'; // Ensure .jsx

// A simple ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-20 text-xl text-gray-700">Loading user...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

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

            {/* Authentication Routes */}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />

            {/* Product Detail Route */}
            <Route path="/products/:productId" element={<ProductDetailPage />} />

            {/* Protected Routes */}
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help-settings"
              element={
                <ProtectedRoute>
                  <div className="bg-white max-w-2xl mx-auto my-8 p-8 rounded-lg shadow-xl text-[#0f1c2e]">
                    <h1 className="text-3xl font-bold mb-4">Help & Settings</h1>
                    <p>This is a protected page. Only logged-in users can see this content.</p>
                  </div>
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;