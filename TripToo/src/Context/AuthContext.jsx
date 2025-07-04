// src/Context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase.js';
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

// Define your backend API base URL
const API_BASE_URL = '/api'; // Make sure this matches your backend port

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to create/update user profile in MongoDB
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
          // You can add more profile fields here if you collect them during signup
          // e.g., firstName: '...', lastName: '...'
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
      // You might want to handle this error more gracefully, e.g., show a toast
    }
  };

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // After successful Firebase signup, save basic profile to MongoDB
    await saveUserProfileToDb(userCredential.user);
    return userCredential;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // After successful Firebase login, ensure profile exists/is updated in MongoDB
    // This is useful if a user logs in from a new device or if their profile wasn't saved immediately after signup
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
      // Optional: If you want to fetch full user profile from MongoDB on every auth state change:
      // if (user) {
      //   fetchUserProfile(user.uid);
      // }
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