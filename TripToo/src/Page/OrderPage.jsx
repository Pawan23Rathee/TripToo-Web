// src/Page/OrderPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderPage = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (authLoading || !currentUser) {
        setPageLoading(false);
        return;
      }

      setPageLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/orders/${currentUser.uid}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError('Failed to load your orders. ' + err.message);
      } finally {
        setPageLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, authLoading]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  if (authLoading || pageLoading) return <div className="text-center py-20 text-xl">Loading orders...</div>;
  if (error) return <div className="text-center py-20 text-xl text-red-700">{error}</div>;
  if (!currentUser) return <div className="text-center py-20 text-xl">Please log in to view your orders.</div>;

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-4xl mx-auto p-6 sm:p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="border rounded-lg shadow-sm">
                <div
                  className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleExpand(order._id)}
                >
                  <div>
                    <h2 className="font-semibold">Order ID: {order.orderId}</h2>
                    <p className="text-sm text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">Total: ${order.total.toFixed(2)}</p>
                    <p className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-500' : 'text-blue-500'}`}>
                      Status: {order.status}
                    </p>
                  </div>
                </div>
                {expandedOrderId === order._id && (
                  <div className="p-4 bg-white border-t">
                    {order.items.map(item => (
                      <div key={item.productId} className="flex items-center mb-2">
                        <img src={item.image || '/placeholder.png'} className="w-12 h-12 object-contain mr-4" />
                        <div className="flex-grow">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
