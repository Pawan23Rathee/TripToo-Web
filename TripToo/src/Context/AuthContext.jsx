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
    if (!user || !user.uid || user.uid === "null") {
      console.error('❌ Firebase UID is missing or invalid. User not saved to backend.');
      alert('Firebase UID is missing or invalid.');
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
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential?.user;

  console.log("🔥 SIGNUP userCredential:", userCredential);
  console.log("🔥 Firebase UID during signup:", user?.uid);

  // ✅ Validate UID before sending to backend
  if (!user?.uid || user.uid === "null") {
    console.error("❌ Firebase UID missing or invalid. Skipping backend save.");
    alert("Signup failed: Firebase UID is missing.");
    return userCredential;
  }

  await saveUserProfileToDb(user, additionalDetails);
  return userCredential;
};


  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential?.user;

    console.log("🔥 LOGIN userCredential:", userCredential);
    console.log("🔥 Firebase UID during login:", user?.uid);

    if (user && user.uid) {
      await saveUserProfileToDb(user);
    }

    return userCredential;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await saveUserProfileToDb(userCredential.user);
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
