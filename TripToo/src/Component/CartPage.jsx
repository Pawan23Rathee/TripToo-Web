// src/Page/CartPage.jsx
import React from 'react';
import CartItem from '../Component/CartItem.jsx';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cartItems, updateItemQuantity, removeItemFromCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const totalCartPrice = cartItems
    .reduce((acc, item) => acc + (item.price * item.quantity), 0)
    .toFixed(2);

  const handleProceedToCheckout = () => {
    if (!currentUser) {
      alert("Please log in to proceed with your order.");
      navigate('/signin');
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }

    // ✅ Navigate to the shipping step (first step of checkout)
    navigate('/checkout/shipping');
  };

  return (
    <div className="bg-white text-[#0f1c2e] max-w-4xl mx-auto my-8 p-6 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">Your Cart</h1>
      <div className="cart-items-container">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={updateItemQuantity}
              onRemove={removeItemFromCart}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 py-10 text-lg">Your cart is empty. Start shopping!</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-end">
          <div className="flex justify-between items-center w-full max-w-sm mb-4">
            <span className="text-2xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-green-600">${totalCartPrice}</span>
          </div>
          <button
            onClick={handleProceedToCheckout}
            className="bg-[#a8e063] hover:bg-[#92c955] text-[#0f1c2e] px-8 py-3 rounded-lg text-lg font-bold transition-all duration-300 ease-in-out"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
