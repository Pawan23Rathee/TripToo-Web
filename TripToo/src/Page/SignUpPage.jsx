// src/Page/SignUpPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext'; // Import useAuth hook
import { useNavigate, Link } from 'react-router-dom'; // For navigation

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth(); // Get signup function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      await signup(email, password);
      navigate('/'); // Redirect to homepage after successful signup
    } catch (err) {
      console.error("Failed to create an account:", err);
      setError('Failed to create an account. ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-10 flex items-center justify-center">
      <div className="bg-white max-w-md mx-auto p-8 rounded-lg shadow-xl w-full">
        <h1 className="text-4xl font-bold text-[#0f1c2e] mb-8 text-center">Sign Up</h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-700">
          Already have an account? <Link to="/signin" className="text-blue-600 hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;