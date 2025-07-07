// src/Page/PaymentPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // <--- ADDED useLocation

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <--- ADDED useLocation
  const { shippingInfo } = location.state || {}; // <--- Get shippingInfo from state

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '', cardName: '', expiryDate: '', cvv: '', saveCard: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Info Submitted:', paymentDetails);
    // Navigate to Order Review Page, passing both shipping and payment info
    navigate('/checkout/review', { state: { shippingInfo, paymentDetails } });
  };

  if (!shippingInfo) {
    // If user somehow lands on payment page without shipping info, redirect
    return (
      <div className="bg-[#f0f2f5] min-h-screen py-20 text-center text-xl text-red-700">
        Shipping information missing. Please start from the cart.
        <br /><Link to="/cart" className="text-blue-600 hover:underline">Go to Cart</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-2xl mx-auto p-6 sm:p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0f1c2e] mb-6 sm:mb-8 text-center">Payment Method</h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="flex justify-center space-x-4 mb-6">
            <img src="/assets/visa_logo.png" alt="Visa" className="h-8 sm:h-10" />
            <img src="/assets/mastercard_logo.png" alt="Mastercard" className="h-8 sm:h-10" />
          </div>

          <div>
            <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-medium mb-1">Card Number</label>
            <input
              type="text" id="cardNumber" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleChange}
              placeholder="XXXX XXXX XXXX XXXX" className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]" required maxLength="16"
            />
          </div>

          <div>
            <label htmlFor="cardName" className="block text-gray-700 text-sm font-medium mb-1">Name on Card</label>
            <input
              type="text" id="cardName" name="cardName" value={paymentDetails.cardName} onChange={handleChange}
              placeholder="Full Name" className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]" required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-medium mb-1">Expiry Date (MM/YY)</label>
              <input
                type="text" id="expiryDate" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleChange}
                placeholder="MM/YY" className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]" required maxLength="5"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-gray-700 text-sm font-medium mb-1">CVV</label>
              <input
                type="text" id="cvv" name="cvv" value={paymentDetails.cvv} onChange={handleChange}
                placeholder="XXX" className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]" required maxLength="4"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox" id="saveCard" name="saveCard" checked={paymentDetails.saveCard} onChange={handleChange}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="saveCard" className="ml-2 block text-gray-700 text-sm">Save card for future purchases</label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-4 rounded-md transition-colors duration-300 text-base sm:text-lg"
          >
            Continue to Order Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;