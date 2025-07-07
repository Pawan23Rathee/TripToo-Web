// src/Page/OrderConfirmationPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
// Optional: Checkmark icon
// import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { orderId } = location.state || {}; // Get orderId from state

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <div className="bg-white max-w-md mx-auto p-8 rounded-lg shadow-xl">
        {/* <FaCheckCircle className="text-green-500 text-6xl mb-6 mx-auto" /> */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully!</p>
        
        {orderId && (
          <p className="text-2xl font-bold text-[#0f1c2e] mb-6">Order Number: <span className="text-green-600">{orderId}</span></p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/my-orders"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
          >
            View My Orders
          </Link>
          <Link
            to="/shop"
            className="border border-gray-300 text-gray-800 hover:bg-gray-100 font-bold py-2 px-6 rounded-md transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;