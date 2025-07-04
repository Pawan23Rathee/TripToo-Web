// src/Component/Banner.jsx
import React from 'react';

const Banner = () => {
  return (
    // Make the section relative to position content absolutely within it
    <section className="relative w-full h-150 sm:h-80 lg:h-140 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/assets/Banner.png" /* Path to your saved image */
        alt="Welcome to TripToo - Your Travel Essentials"
        className="absolute inset-0 w-full h-full object-cover object-center" // Image covers the entire section
      />

      
    </section>
  );
};

export default Banner;