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

  const { shippingInfo, cartItems: passedCartItems } = location.state || {};
  const cartItemsToUse = passedCartItems || cartItems;

  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderPlacing, setOrderPlacing] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const totalCartPrice = cartItemsToUse.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
  const estimatedShipping = 10.00;
  const taxRate = 0.08;
  const estimatedTax = (parseFloat(totalCartPrice) * taxRate).toFixed(2);
  const grandTotal = (parseFloat(totalCartPrice) + estimatedShipping + parseFloat(estimatedTax)).toFixed(2);

  if (!cartItemsToUse || cartItemsToUse.length === 0 || !shippingInfo) {
    return (
      <div className="bg-[#f0f2f5] min-h-screen py-20 text-center text-xl text-red-700">
        Missing order details. Please start from the cart.
        <br /><Link to="/cart" className="text-blue-600 hover:underline">Go to Cart</Link>
      </div>
    );
  }

  const handleContinue = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (paymentMethod === 'COD') {
      // Place order directly without going to payment page
      if (!currentUser) {
        alert("Please log in to place your order.");
        navigate('/signin');
        return;
      }

      setOrderPlacing(true);
      setOrderError(null);

      const orderData = {
        firebaseUid: currentUser.uid,
        orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        total: parseFloat(grandTotal),
        status: 'Pending',
        items: cartItemsToUse.map(item => ({
          productId: item.id,
          name: item.title,
          quantity: item.quantity,
          price: item.price,
          image: item.images[0] || '/assets/placeholder.png'
        })),
        shippingInfo: shippingInfo,
        paymentMethod: {
          type: 'Cash on Delivery',
          nameOnCard: 'N/A',
        }
      };

      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) throw new Error("Authentication token missing.");

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
        alert('Order placed successfully! Your Order ID is: ' + createdOrder.orderId);
        setCartItems([]);
        navigate('/checkout/confirmation', { state: { orderId: createdOrder.orderId } });
      } catch (err) {
        setOrderError('Failed to place order. ' + err.message);
      } finally {
        setOrderPlacing(false);
      }
    } else {
      // Redirect to Razorpay payment page
      navigate('/checkout/payment', {
        state: {
          shippingInfo,
          cartItems: cartItemsToUse,
          paymentMethod, // pass selected payment type like UPI or Razorpay
          grandTotal
        }
      });
    }
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-8 sm:py-12 px-4">
      <div className="bg-white max-w-4xl mx-auto p-6 sm:p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0f1c2e] mb-6 text-center">Order Summary & Review</h1>

        {orderError && <p className="text-red-500 text-center mb-4">{orderError}</p>}

        {/* Items */}
        <div className="mb-8 border-b pb-6">
          <h2 className="text-xl font-bold mb-4">Items in Order ({cartItemsToUse.length})</h2>
          <div className="space-y-4">
            {cartItemsToUse.map(item => (
              <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-grow">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mb-8 border-b pb-6">
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          <div className="text-gray-700 space-y-1">
            <p>{shippingInfo.fullName}</p>
            <p>{shippingInfo.addressLine1}</p>
            {shippingInfo.addressLine2 && <p>{shippingInfo.addressLine2}</p>}
            <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            <p>{shippingInfo.country}</p>
            <p>Phone: {shippingInfo.phone}</p>
          </div>
        </div>

        {/* Select Payment Method */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="COD" onChange={() => setPaymentMethod('COD')} />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="UPI" onChange={() => setPaymentMethod('UPI')} />
              UPI (Google Pay, PhonePe, Paytm)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="Razorpay" onChange={() => setPaymentMethod('Razorpay')} />
              Razorpay (Card, Netbanking)
            </label>
          </div>
        </div>

        {/* Totals */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-2"><span>Subtotal:</span><span>${totalCartPrice}</span></div>
          <div className="flex justify-between mb-2"><span>Shipping:</span><span>${estimatedShipping.toFixed(2)}</span></div>
          <div className="flex justify-between mb-2"><span>Tax ({Math.round(taxRate * 100)}%):</span><span>${estimatedTax}</span></div>
          <div className="flex justify-between text-xl font-bold mt-4 border-t pt-4">
            <span>Total:</span><span>${grandTotal}</span>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={orderPlacing}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition"
        >
          {orderPlacing ? 'Processing...' : paymentMethod === 'COD' ? 'Place Order' : 'Continue to Payment'}
        </button>
      </div>
    </div>
  );
};

export default OrderReviewPage;
