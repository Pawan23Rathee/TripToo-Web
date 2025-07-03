import React from 'react';
import bannerImg from '../assets/Banner.png'; // correct relative path

const Banner = () => {
  return (
    <header
      className="text-white p-70 text bg-cover bg-center h-[60vh] flex flex-col items-center justify-bottom"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* <h1 className="text-4xl font-bold text-bottom">Triptoo</h1>
      <p className="text-xl mt-2">TRAVEL KITS</p>
      <button className="mt-4 bg-[#a8e063] px-6 py-2 rounded-full text-[#0f1c2e] font-bold">WITH WOW</button> */}
    </header>
  );
};

export default Banner;
