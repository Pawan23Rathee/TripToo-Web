// src/Component/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 sm:py-6 text-center mt-auto px-4"> {/* Responsive padding */}
      <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} TripToo. All rights reserved.</p> {/* Responsive font size */}
    </footer>
  );
};

export default Footer;