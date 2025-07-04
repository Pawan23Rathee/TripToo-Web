// src/Context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase.js'; // Ensure this is .js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Define your backend API base URL for DEPLOYMENT
// AFTER DEPLOYING BACKEND ON RENDER, PASTE ITS URL HERE
// Example: const API_BASE_URL = 'https://triptoo-backend.onrender.com/api';
// For LOCAL DEVELOPMENT, you would use: const API_BASE_URL = '/api'; (with Vite proxy)
const API_BASE_URL = 'https://triptoo-backend.onrender.com'; // <--- REPLACE THIS LINE

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUserProfileToDb = async (user) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save user profile to DB');
      }
      const userData = await response.json();
      console.log('User profile saved/updated in MongoDB:', userData);
    } catch (error) {
      console.error('Error saving user profile to MongoDB:', error);
    }
  };

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserProfileToDb(userCredential.user);
    return userCredential;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await saveUserProfileToDb(userCredential.user);
    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};