// src/Page/OrderPage.jsx
import React, { useState } from 'react';
import mockOrders from '../data/mockOrders';

const OrderPage = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-4xl mx-auto p-6 sm:p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0f1c2e] mb-6 sm:mb-8 text-center">Your Orders</h1>

        {mockOrders.length === 0 ? (
          <p className="text-center text-gray-600 text-base sm:text-lg py-10">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {mockOrders.map(order => (
              <div key={order.id} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div
                  className="bg-gray-50 p-3 sm:p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => toggleExpand(order.id)}
                >
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-[#0f1c2e]">Order ID: {order.id}</h2>
                    <p className="text-gray-600 text-xs sm:text-sm">Date: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base sm:text-lg font-bold text-green-600">Total: ${order.total.toFixed(2)}</p>
                    <p className={`text-xs sm:text-sm font-medium ${order.status === 'Delivered' ? 'text-green-500' : order.status === 'Processing' ? 'text-blue-500' : 'text-orange-500'}`}>
                      Status: {order.status}
                    </p>
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
                    <h3 className="text-base sm:text-lg font-semibold text-[#0f1c2e] mb-2 sm:mb-3">Items in this Order:</h3>
                    <div className="space-y-2 sm:space-y-3">
                      {order.items.map(item => (
                        <div key={item.productId} className="flex items-center space-x-3 sm:space-x-4">
                          <img
                            src={item.image || '/placeholder.png'}
                            alt={item.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-contain border border-gray-200 rounded-md"
                          />
                          <div className="flex-grow">
                            <p className="font-medium text-[#0f1c2e] text-sm sm:text-base">{item.name}</p>
                            <p className="text-gray-600 text-xs sm:text-sm">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-sm sm:text-md text-[#0f1c2e]">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
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