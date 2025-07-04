// src/Context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const API_BASE_URL = 'https://triptoo-backend.onrender.com'; // Ensure this is your deployed backend URL

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modified: saveUserProfileToDb now accepts more details
  const saveUserProfileToDb = async (user, additionalDetails = {}) => { // Added additionalDetails
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
          firstName: additionalDetails.firstName || (user.displayName ? user.displayName.split(' ')[0] : ''), // Use provided or Google's
          lastName: additionalDetails.lastName || (user.displayName ? user.displayName.split(' ').slice(1).join(' ') : ''), // Use provided or Google's
          address: additionalDetails.address || '',
          phone: additionalDetails.phone || '',
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

  // Modified: signup function now accepts additionalDetails
  const signup = async (email, password, additionalDetails) => { // Added additionalDetails
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserProfileToDb(userCredential.user, additionalDetails); // Pass additionalDetails
    return userCredential;
  };

  // Modified: login function also passes basic user info
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await saveUserProfileToDb(userCredential.user, { // Pass basic info during login too, for updates
      firstName: userCredential.user.displayName ? userCredential.user.displayName.split(' ')[0] : '',
      lastName: userCredential.user.displayName ? userCredential.user.displayName.split(' ').slice(1).join(' ') : ''
    });
    return userCredential;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await saveUserProfileToDb(userCredential.user); // Google user info already available in userCredential.user
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
    signInWithGoogle,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};