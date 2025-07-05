// src/Context/AuthContext.jsx - Firebase Auth with Backend Profile Sync
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

export const useAuth = () => useContext(AuthContext);

// Backend API base URL
const API_BASE_URL = 'https://triptoo-backend-6wsx.onrender.com/api';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUserProfileToDb = async (user, additionalDetails = {}) => {
    if (!user || !user.uid) {
      console.error('❌ Firebase UID is missing. User not saved to backend.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
          firstName: additionalDetails.firstName || (user.displayName ? user.displayName.split(' ')[0] : ''),
          lastName: additionalDetails.lastName || (user.displayName ? user.displayName.split(' ').slice(1).join(' ') : ''),
          address: additionalDetails.address || '',
          phone: additionalDetails.phone || '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save user profile to DB');
      }

      const result = await response.json();
      console.log('✅ User profile saved to MongoDB:', result);
    } catch (error) {
      console.error('❌ Error saving user profile to MongoDB:', error.message);
    }
  };

  const signup = async (email, password, additionalDetails) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password); // ✅ FIXED HERE
    const user = userCredential?.user;

    if (user && user.uid) {
      await saveUserProfileToDb(user, additionalDetails);
    } else {
      console.error("🔥 Signup successful, but Firebase UID not found.");
    }

    return userCredential;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await saveUserProfileToDb(userCredential.user); // Sync profile on login
    return userCredential;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await saveUserProfileToDb(userCredential.user); // Sync Google profile
    return userCredential;
  };

  const logout = () => signOut(auth);

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
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
