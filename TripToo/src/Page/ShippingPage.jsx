// src/Page/ShippingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';

const ShippingPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await res.json();
          setShippingInfo(prev => ({
            ...prev,
            city: data.city || '',
            state: data.principalSubdivision || '',
            country: data.countryName || '',
            zipCode: data.postcode || '',
          }));
        } catch (err) {
          console.error('Failed to fetch location info:', err);
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingInfo(prevInfo => ({ ...prevInfo, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(shippingInfo.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    console.log('Shipping Info Submitted:', shippingInfo);
    navigate('/checkout/review', { state: { shippingInfo, cartItems } });
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-2xl mx-auto p-6 sm:p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0f1c2e] mb-6 sm:mb-8 text-center">Shipping Information</h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>

          <div>
            <label htmlFor="addressLine1" className="block text-gray-700 text-sm font-medium mb-1">Address Line 1</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={shippingInfo.addressLine1}
              onChange={handleChange}
              placeholder="123 Main St"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>

          <div>
            <label htmlFor="addressLine2" className="block text-gray-700 text-sm font-medium mb-1">Address Line 2 (Apt, Suite, etc.)</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={shippingInfo.addressLine2}
              onChange={handleChange}
              placeholder="Apt 4B"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                placeholder="New York"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-gray-700 text-sm font-medium mb-1">State / Province</label>
              <input
                type="text"
                id="state"
                name="state"
                value={shippingInfo.state}
                onChange={handleChange}
                placeholder="NY"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
                required
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-gray-700 text-sm font-medium mb-1">Zip / Postal Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleChange}
                placeholder="10001"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={shippingInfo.country}
              onChange={handleChange}
              placeholder="United States"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-4 rounded-md transition-colors duration-300 text-base sm:text-lg"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
