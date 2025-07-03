// src/Component/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext'; // CORRECT: Named import

const Navbar = () => {
  const { totalCartItemsCount } = useCart();

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-white text-[#0f1c2e] px-10 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-2">
         <h2 className="text-2xl font-bold">Trip<span className="text-green-500">Too</span></h2>
      </div>
      <ul className="flex space-x-6 text-lg font-medium items-center">
        <li className="hover:text-[#a8e063] cursor-pointer">
          <Link to="/">HOME</Link>
        </li>
        <li className="hover:text-[#a8e063] cursor-pointer">
          <Link to="/shop">SHOP</Link>
        </li>
        <li
          className="hover:text-[#a8e063] cursor-pointer"
          onClick={() => handleScrollToSection('about-us')}
        >
          <Link to="/About">ABOUT US</Link>
          
        </li>
        <li className="hover:text-[#a8e063] cursor-pointer">
          <Link to="/contact">CONTACT</Link>
        </li>
        <li>
        <li className="relative">
            <Link to="/cart" className="hover:text-[#a8e063] cursor-pointer flex items-center space-x-1">
                <span>🛒</span>
                <span>CART</span>
                {totalCartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalCartItemsCount}
                    </span>
                )}
            </Link>
        </li>
        </li>
          <button className="hover:text-[#a8e063] cursor-pointer">SIGN IN</button>
      </ul>
    </nav>
  );
};

export default Navbar;