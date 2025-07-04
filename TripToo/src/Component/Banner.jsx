// src/Component/Banner.jsx
import React from 'react';

const Banner = () => {
  return (
    <section className="bg-gray-800 text-white py-12 sm:py-20 text-center px-4"> {/* Added px-4 for mobile padding */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">Welcome to TRIPTOO</h1> {/* Responsive font sizes */}
      <p className="text-base sm:text-lg lg:text-xl">Your one-stop shop for travel essentials.</p> {/* Responsive font sizes */}
    </section>
  );
};

export default Banner;