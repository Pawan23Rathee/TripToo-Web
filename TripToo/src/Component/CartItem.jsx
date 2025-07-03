// src/Component/CartItem.jsx
import React from 'react';
// No useCart import here, as props are passed from CartPage
// Import react-icons if you use them for other elements here
// import { FaMinus, FaPlus } from 'react-icons/fa'; // Example if you want quantity buttons

function CartItem({ item, onQuantityChange, onRemove }) {
  const { id, name, description, images, quantity, price } = item;

  const handleSelectChange = (e) => {
    onQuantityChange(id, e.target.value);
  };

  const handleRemoveClick = () => {
    onRemove(id);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200 gap-4 sm:gap-6 last:border-b-0">
      <div className="flex-shrink-0">
        <img
          src={images && images.length > 0 ? images[0] : '/placeholder.png'}
          alt={name}
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain border border-gray-300 rounded-md p-1"
        />
      </div>
      <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-2 sm:mb-0">
          <span className="font-bold text-lg text-[#0f1c2e] block">{name}</span>
          <span className="text-gray-600 text-sm">{description}</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-start">
            <select
              value={quantity}
              onChange={handleSelectChange}
              className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-base"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <span className="text-gray-500 text-xs mt-1">Quantity</span>
          </div>

          <div className="flex flex-col items-end min-w-[70px]">
            <span className="font-bold text-lg text-[#0f1c2e]">${(price * quantity).toFixed(2)}</span>
          </div>

          <div
            className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium ml-2 sm:ml-4"
            onClick={handleRemoveClick}
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;