// src/Page/CartPage.jsx
import React from 'react';
import CartItem from '../Component/CartItem.jsx';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_BASE_URL = '/api'; // Backend API URL

function CartPage() {
  const { cartItems, updateItemQuantity, removeItemFromCart, setCartItems } = useCart(); // Get setCartItems
  const { currentUser } = useAuth(); // Get current user from auth context
  const navigate = useNavigate();

  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

  const handleProceedToCheckout = async () => {
    if (!currentUser) {
      alert("Please log in to proceed with your order.");
      navigate('/signin'); // Redirect to sign-in page
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }

    // Prepare order data for the backend
    const orderData = {
      firebaseUid: currentUser.uid,
      orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Simple unique ID
      total: parseFloat(totalCartPrice),
      status: 'Pending', // Initial status
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.title, // Use item.title for product name
        quantity: item.quantity,
        price: item.price,
        image: item.images[0] || '/placeholder.png'
      }))
    };

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const createdOrder = await response.json();
      console.log('Order successfully created:', createdOrder);
      alert('Order placed successfully! Your Order ID is: ' + createdOrder.orderId);

      // Clear cart after successful order
      setCartItems([]);
      navigate('/my-orders'); // Redirect to order history page
    } catch (error) {
      console.error('Error proceeding to checkout:', error);
      alert('There was an error placing your order. Please try again. ' + error.message);
    }
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