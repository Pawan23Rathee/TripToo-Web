// src/Context/AuthContext.jsx - Reverted to Firebase Auth with Backend Profile Sync
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase.js'; // Using firebase.js again
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider, // Re-add for Google
  signInWithPopup,    // Re-add for Google
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Define your backend API base URL for deployment (or '/api' for local)
const API_BASE_URL = 'https://triptoo-backend-6wsx.onrender.com/api'; // <--- Set this to your deployed Render backend URL

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to create/update user profile in MongoDB (Linked by Firebase UID)
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


  // Firebase Auth functions (re-added)
  const signup = async (email, password, additionalDetails) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserProfileToDb(userCredential.user, additionalDetails);
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

  const logout = () => {
    return signOut(auth);
  };

  // Listen for auth state changes (re-added)
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
    signInWithGoogle, // Include Google sign-in
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};