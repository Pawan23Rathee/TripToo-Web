// src/Component/UserDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Import useAuth hook
// Optional: Import an icon for the user avatar
// import { FaUserCircle } from 'react-icons/fa';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for clicking outside

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin'); // Redirect to sign-in page after logout
    } catch (error) {
      console.error("Failed to log out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="User menu"
      >
        {/* You can use an image here for the user avatar, or an icon */}
        {/* <img src={currentUser?.photoURL || '/default-avatar.png'} alt="User Avatar" className="w-full h-full rounded-full object-cover" /> */}
        {/* Or a simple user icon */}
        {/* <FaUserCircle className="text-3xl" /> */}
        <span className="text-lg font-semibold">
          {currentUser?.email ? currentUser.email[0].toUpperCase() : 'U'}
        </span> {/* First letter of email or 'U' */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            to="/my-orders"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Your Orders
          </Link>
          <Link
            to="/help-settings" /* Create this page later if needed */
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Help Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 border-t border-gray-200 mt-1 pt-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;