// src/Component/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 sm:py-6 text-center mt-auto px-4">
      <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} TripToo. All rights reserved.</p>
    </footer>
  );
};

export default Footer;