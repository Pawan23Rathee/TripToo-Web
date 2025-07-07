// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Correct: App.jsx
import './index.css'; // Global CSS
import { CartProvider } from './Context/CartContext.jsx'; // Correct: CartContext.js
import { AuthProvider } from './Context/AuthContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);