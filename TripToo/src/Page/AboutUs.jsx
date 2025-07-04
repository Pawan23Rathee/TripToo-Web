// src/Page/AboutUs.jsx
import React from 'react';
import { FaFacebookF, FaXTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa6';

const AboutUs = () => {
  return (
    <section id="about-us" className="bg-white text-[#0f1c2e] max-w-5xl mx-auto my-8 sm:my-12 p-6 sm:p-8 rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-[1.005] px-4"> {/* Responsive padding */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f1c2e] mb-2 sm:mb-4 relative pb-4">
          About <span className="text-green-500">TripToo</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-green-500 rounded-full"></span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 italic">"Your Journey, Simplified."</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12"> {/* Responsive grid */}
        <div className="bg-gray-50 p-5 sm:p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1c2e] mb-3 sm:mb-4 flex items-center">
            <span className="text-green-500 text-3xl sm:text-4xl mr-2 sm:mr-3">🚀</span> Our Mission
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Our mission is to revolutionize the way people travel by providing innovative, high-quality, and thoughtfully curated travel kits. We aim to simplify packing, enhance comfort, and ensure every journey is as seamless and enjoyable as possible, allowing our customers to focus purely on the adventure ahead.
          </p>
        </div>
        <div className="bg-gray-50 p-5 sm:p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1c2e] mb-3 sm:mb-4 flex items-center">
            <span className="text-green-500 text-3xl sm:text-4xl mr-2 sm:mr-3">🌟</span> Our Vision
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            To be the leading global provider of travel essentials, recognized for our commitment to innovation, sustainability, and exceptional customer experience. We envision a world where every traveler feels prepared, confident, and excited about their next destination, empowered by TripToo kits.
          </p>
        </div>
      </div>

      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0f1c2e] mb-4 sm:mb-6">
          The TripToo Story
        </h2>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
          Welcome to **TripToo**, your trusted companion for all your travel needs! Founded with a passion for seamless and comfortable journeys, we understand the challenges travelers face. Our journey began with a simple idea: make travel preparation effortless. We've meticulously designed our kits to cater to various travel styles and needs, ensuring you have the essentials without the bulk.
        </p>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          We are deeply committed to sustainability and responsible sourcing. We strive to include eco-friendly products and packaging wherever possible, contributing to a healthier planet for future generations of travelers. Our dedication extends beyond just products; we aim to build a community of enthusiastic explorers who value convenience, quality, and mindful travel.
        </p>
      </div>

      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1c2e] mb-4 sm:mb-6">Connect With Us!</h2>
        <div className="flex justify-center space-x-4 sm:space-x-6 text-green-500">
          <a href="https://facebook.com/yourtriptoo" target="_blank" rel="noopener noreferrer"
             className="text-4xl sm:text-5xl hover:text-green-600 transition-colors duration-300"
             title="Facebook">
             <FaFacebookF />
          </a>
          <a href="https://x.com/yourtriptoo" target="_blank" rel="noopener noreferrer"
             className="text-4xl sm:text-5xl hover:text-green-600 transition-colors duration-300"
             title="X (Twitter)">
             <FaXTwitter />
          </a>
          <a href="https://instagram.com/yourtriptoo" target="_blank" rel="noopener noreferrer"
             className="text-4xl sm:text-5xl hover:text-green-600 transition-colors duration-300"
             title="Instagram">
             <FaInstagram />
          </a>
          <a href="mailto:info@triptoo.com"
             className="text-4xl sm:text-5xl hover:text-green-600 transition-colors duration-300"
             title="Email Us">
             <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1c2e] mb-3 sm:mb-4">Ready for Your Next Adventure?</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-5 sm:mb-6">
          Explore our wide range of travel kits designed to make your journeys effortless and enjoyable.
        </p>
        <a href="/shop"
           className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
          Shop Our Kits Now!
        </a>
      </div>
    </section>
  );
};

export default AboutUs;