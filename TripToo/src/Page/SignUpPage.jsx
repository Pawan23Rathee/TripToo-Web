// src/Page/SignUpPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // --- ADD NEW STATE VARIABLES FOR USER DETAILS ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  // --- END NEW STATE VARIABLES ---
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      // Pass new user details to the signup function
      await signup(email, password, { firstName, lastName, address, phone });
      navigate('/');
    } catch (err) {
      console.error("Failed to create an account:", err);
      setError('Failed to create an account. ' + err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle(); // Google Sign-in already provides display name
      navigate('/');
    } catch (err) {
      console.error("Failed to sign in with Google:", err);
      setError('Failed to sign in with Google. ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-10 flex items-center justify-center px-4">
      <div className="bg-white max-w-md mx-auto p-8 rounded-lg shadow-xl w-full">
        <h1 className="text-4xl font-bold text-[#0f1c2e] mb-8 text-center">Sign Up</h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Input Fields */}
          <div>
            <label htmlFor="firstName" className="sr-only">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>
          {/* End New Input Fields */}

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>

          {/* New Input Fields */}
          <div>
            <label htmlFor="address" className="sr-only">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address (Street, City, State, Zip, Country)"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
              required
            />
          </div>
          {/* End New Input Fields */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="mr-2" /> Sign Up with Google
          </button>
        </div>

        <div className="text-center mt-6 text-gray-700">
          Already have an account? <Link to="/signin" className="text-blue-600 hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;