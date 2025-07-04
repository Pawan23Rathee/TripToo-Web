// src/Component/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import UserDropdown from './UserDropdown.jsx';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { totalCartItemsCount } = useCart();
  const { currentUser, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white text-[#0f1c2e] px-4 sm:px-10 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-2">
         <h2 className="text-2xl font-bold">Trip<span className="text-green-500">Too</span></h2>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-2xl focus:outline-none">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <ul className="hidden md:flex space-x-6 text-lg font-medium items-center">
        <li className="hover:text-[#a8e063] cursor-pointer"><Link to="/">HOME</Link></li>
        <li className="hover:text-[#a8e063] cursor-pointer"><Link to="/shop">SHOP</Link></li>
        <li className="hover:text-[#a8e063] cursor-pointer" onClick={() => handleScrollToSection('about-us')}><Link to="/about">About US</Link></li>
        <li className="hover:text-[#a8e063] cursor-pointer"><Link to="/contact">CONTACT</Link></li>
        <li className="hover:text-[#a8e063] cursor-pointer"><Link to="/my-orders">MY ORDERS</Link></li>
        {!loading && (
          currentUser ? (
            <UserDropdown />
          ) : (
            <>
              <li><Link to="/signin" className="hover:text-[#a8e063] cursor-pointer">SIGN IN</Link></li>
              <li><Link to="/signup" className="hover:text-[#a8e063] cursor-pointer">SIGN UP</Link></li>
            </>
          )
        )}
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
      </ul>

      {isMobileMenuOpen && (
        <ul className="absolute top-[64px] left-0 w-full bg-white shadow-lg py-4 md:hidden flex flex-col items-center space-y-4 text-lg font-medium z-40">
          <li className="hover:text-[#a8e063] cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}><Link to="/">HOME</Link></li>
          <li className="hover:text-[#a8e063] cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}><Link to="/shop">SHOP</Link></li>
          <li className="hover:text-[#a8e063] cursor-pointer" onClick={() => handleScrollToSection('about-us')}>ABOUT US</li>
          <li className="hover:text-[#a8e063] cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}><Link to="/contact">CONTACT</Link></li>
          <li className="hover:text-[#a8e063] cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}><Link to="/my-orders">MY ORDERS</Link></li>
          {!loading && (
            currentUser ? (
              <>
                <li className="hover:text-[#a8e063] cursor-pointer">
                  <Link to="/my-profile" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                </li>
                <li>
                  <button onClick={() => { setIsMobileMenuOpen(false); /* handleLogout from UserDropdown */ }}>LOGOUT</button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/signin" className="hover:text-[#a8e063] cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>SIGN IN</Link></li>
                <li><Link to="/signup" className="hover:text-[#a8e063] cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>SIGN UP</Link></li>
              </>
            )
          )}
          <li className="relative">
            <Link to="/cart" className="hover:text-[#a8e063] cursor-pointer flex items-center space-x-1" onClick={() => setIsMobileMenuOpen(false)}>
                <span>🛒</span>
                <span>CART</span>
                {totalCartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalCartItemsCount}
                    </span>
                )}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;