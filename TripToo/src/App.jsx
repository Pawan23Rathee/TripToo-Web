// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import ProductSection from './Component/ProductSection';
import Banner from './Component/Banner';
import CartPage from './Component/CartPage';
import AboutUs from './Page/AboutUs';
import ShopPage from './Page/ShopPage';
import ContactPage from './Page/ContactPage'; // <--- Import the new ContactPage component

function App() {
  return (
    <Router>
      <div className="bg-[#0f1c2e] text-white min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Homepage route */}
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <ProductSection />
                  <AboutUs /> {/* Assuming AboutUs is a section on homepage */}
                </>
              }
            />
            {/* Cart Page route */}
            <Route
              path="/cart"
              element={
                <CartPage />
              }
            />
            {/* About Us Page route (if separate page) */}
            <Route
              path="/about" // Using lowercase 'about' for consistency
              element={
                <AboutUs />
              }
            />
            {/* Shop Page Route */}
            <Route
              path="/shop"
              element={
                <ShopPage />
              }
            />
            {/* <--- New: Contact Page Route */}
            <Route
              path="/contact"
              element={
                <ContactPage />
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