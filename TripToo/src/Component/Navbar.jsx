// src/Component/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext'; // <--- Import useAuth hook
import UserDropdown from './UserDropdown'; // <--- Import UserDropdown

const Navbar = () => {
  const { totalCartItemsCount } = useCart();
  const { currentUser, loading } = useAuth(); // <--- Get currentUser and loading from AuthContext

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
          ABOUT US
        </li>
        <li className="hover:text-[#a8e063] cursor-pointer">
          <Link to="/contact">CONTACT</Link>
        </li>
        {/* Conditional rendering for Auth buttons or UserDropdown */}
        {!loading && ( // Only render after auth state is determined
          currentUser ? (
            <UserDropdown /> // Show dropdown if user is logged in
          ) : (
            <>
              <li>
                <Link to="/signin" className="hover:text-[#a8e063] cursor-pointer">SIGN IN</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-[#a8e063] cursor-pointer">SIGN UP</Link>
              </li>
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
    </nav>
  );
};

export default Navbar;