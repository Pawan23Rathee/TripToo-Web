// src/Page/ShopPage.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext.jsx'; // Correct: .js
import allProducts from '../data/products.js'; // Correct: .js
import { Link } from 'react-router-dom';

const ShopPage = () => {
  const { addItemToCart } = useCart();
  const [displayedProducts, setDisplayedProducts] = useState(allProducts);
  const [filter, setFilter] = useState('All Kits');
  const [sort, setSort] = useState('Portone');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = [...allProducts];
    if (filter !== 'All Kits') { /* filter logic here */ }
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sort === 'Portone') { filtered.sort((a, b) => a.id.localeCompare(b.id)); }
    else if (sort === 'Price: Low to High') { filtered.sort((a, b) => a.price - b.price); }
    else if (sort === 'Price: High to Low') { filtered.sort((a, b) => b.price - a.price); }
    setDisplayedProducts(filtered);
  }, [filter, sort, searchTerm]);

  const handleAddToCart = (product) => {
    addItemToCart(product);
  };

  return (
    <div className="bg-[#f0f2f5] text-[#333] min-h-screen">
      <div className="bg-[#1a5b4f] text-white py-8 sm:py-12 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">Shop</h1>
          <p className="text-xl sm:text-2xl font-semibold">All Kits</p>
        </div>
        <div className="relative w-full md:w-auto mt-4 md:mt-0">
          <img src="/assets/shop-hero-image.png" alt="All Kits" className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-lg shadow-lg" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#0f1c2e]">All Kits</h2>
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full md:w-auto">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <label htmlFor="filter" className="font-medium text-gray-700 text-sm sm:text-base">Filter:</label>
              <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 w-full text-sm sm:text-base">
                <option value="All Kits">All Kits</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <label htmlFor="sort" className="font-medium text-gray-700 text-sm sm:text-base">Sorty Sontis:</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 w-full text-sm sm:text-base">
                <option value="Portone">Portone (Default)</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0 w-full md:w-auto">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 flex-grow text-sm sm:text-base" />
            <button className="bg-[#1a5b4f] hover:bg-[#206f61] text-white px-4 py-2 rounded-md font-semibold text-sm sm:text-base">View</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-md flex flex-col transition-transform duration-200 hover:scale-[1.02]">
              <Link to={`/products/${product.id}`} className="block">
                <div className="relative h-40 sm:h-48 mb-4 flex items-center justify-center overflow-hidden">
                  <img src={product.images[0] || '/placeholder.png'} alt={product.title} className="max-h-full max-w-full object-contain rounded-md" />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-1 text-[#0f1c2e]">{product.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-grow">{product.description}</p>
              </Link>
              <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-200">
                <span className="font-bold text-lg sm:text-xl text-[#0f1c2e]">${product.price.toFixed(2)}</span>
                <button onClick={() => handleAddToCart(product)} className="bg-[#38b000] hover:bg-[#42c500] text-white rounded-full p-2 transition-colors duration-200" title="Add to Cart">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          {displayedProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-600 text-base sm:text-lg py-10">No products found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;