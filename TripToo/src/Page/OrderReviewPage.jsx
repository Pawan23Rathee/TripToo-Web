// src/Page/OrderReviewPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';

const API_BASE_URL = 'https://triptoo-backend-6wsx.onrender.com/api';

const OrderReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, setCartItems } = useCart();
  const { currentUser } = useAuth();

  const { shippingInfo, paymentDetails, cartItems: passedCartItems } = location.state || {};
  const cartItemsToUse = passedCartItems || cartItems;

  const [orderPlacing, setOrderPlacing] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
  const estimatedShipping = 10.00;
  const taxRate = 0.08;
  const estimatedTax = (parseFloat(totalCartPrice) * taxRate).toFixed(2);
  const grandTotal = (parseFloat(totalCartPrice) + estimatedShipping + parseFloat(estimatedTax)).toFixed(2);

  if (!cartItems || cartItems.length === 0 || !shippingInfo) {
    return (
      <div className="bg-[#f0f2f5] min-h-screen py-20 text-center text-xl text-red-700">
        Missing order details. Please start from the cart.
        <br /><Link to="/cart" className="text-blue-600 hover:underline">Go to Cart</Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      alert("Please log in to place your order.");
      navigate('/signin');
      return;
    }

    setOrderPlacing(true);
    setOrderError(null);

    try {
      const token = await currentUser.getIdToken();

      const orderData = {
        firebaseUid: currentUser.uid,
        orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        total: parseFloat(grandTotal),
        status: 'Pending',
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.title,
          quantity: item.quantity,
          price: item.price,
          image: item.images[0] || '/assets/placeholder.png'
        })),
        shippingInfo,
        paymentMethod: {
          type: paymentDetails.cardNumber ? 'Credit Card' : 'Other',
          last4: paymentDetails.cardNumber ? paymentDetails.cardNumber.slice(-4) : '',
          expiry: paymentDetails.expiryDate,
          nameOnCard: paymentDetails.cardName,
        }
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const createdOrder = await response.json();
      console.log('Order successfully placed:', createdOrder);
      alert('Order placed successfully! Your Order ID is: ' + createdOrder.orderId);

      setCartItems([]);
      navigate('/checkout/confirmation', { state: { orderId: createdOrder.orderId } });
    } catch (err) {
      console.error('Error placing order:', err);
      setOrderError('Failed to place order. ' + err.message);
    } finally {
      setOrderPlacing(false);
    }
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-8 sm:py-12 px-4">
      <div className="bg-white max-w-4xl mx-auto p-6 sm:p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0f1c2e] mb-6 sm:mb-8 text-center">Order Summary & Review</h1>

        {orderError && <p className="text-red-500 text-center mb-4">{orderError}</p>}

        <div className="mb-8 border-b border-gray-200 pb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Items in Order ({cartItems.length})</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                <img src={item.images[0] || '/assets/placeholder.png'} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-lg text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 border-b border-gray-200 pb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
          {shippingInfo ? (
            <div className="text-gray-700 space-y-1">
              <p>{shippingInfo.fullName}</p>
              <p>{shippingInfo.addressLine1}</p>
              {shippingInfo.addressLine2 && <p>{shippingInfo.addressLine2}</p>}
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
              <p>{shippingInfo.country}</p>
              <p>Phone: {shippingInfo.phone}</p>
            </div>
          ) : (
            <p className="text-red-500">Shipping information missing.</p>
          )}
        </div>

        <div className="mb-8 border-b border-gray-200 pb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
          {paymentDetails ? (
            <div className="text-gray-700 space-y-1">
              <p>Credit Card ending in: **** {paymentDetails.cardNumber.slice(-4)}</p>
              <p>Expires: {paymentDetails.expiryDate}</p>
              <p>Name on Card: {paymentDetails.cardName}</p>
            </div>
          ) : (
            <p className="text-red-500">Payment information missing.</p>
          )}
        </div>

        <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner">
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal:</span>
            <span>${totalCartPrice}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping:</span>
            <span>${estimatedShipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Tax ({Math.round(taxRate * 100)}%):</span>
            <span>${estimatedTax}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-[#0f1c2e] pt-4 border-t border-gray-300 mt-4">
            <span>Order Total:</span>
            <span>${grandTotal}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={orderPlacing}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors duration-300 disabled:opacity-50"
        >
          {orderPlacing ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default OrderReviewPage;