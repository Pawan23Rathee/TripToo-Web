// src/Component/Banner.jsx
import React from 'react';

const Banner = () => {
  return (
    // Use background-image via style prop for more control
    <section 
      className="relative w-full h-60 sm:h-80 lg:h-140 flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/Banner.png')" }} // Set image as background
    >
      
      
    </section>
  );
};

export default Banner;