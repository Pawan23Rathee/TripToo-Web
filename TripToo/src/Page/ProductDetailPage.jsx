// src/Page/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get product ID from URL
import { useCart } from '../Context/CartContext'; // To add to cart
import allProducts from '../data/products'; // To find the product data
import Slider from 'react-slick'; // For product image carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetailPage = () => {
  const { productId } = useParams(); // Get productId from the URL
  const { addItemToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Find the product based on the ID from the URL
  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct);
    if (foundProduct && foundProduct.images.length > 0) {
      setSelectedImage(foundProduct.images[0]); // Set initial selected image
    }
  }, [productId]); // Re-run when productId changes

  const handleAddToCart = () => {
    if (product) {
      // Create a copy of the product and set the desired quantity
      addItemToCart({ ...product, quantity: quantity });
      alert(`${quantity} of ${product.title} added to cart!`);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Use arrows for easier navigation on detail page
    autoplay: false,
  };

  if (!product) {
    return (
      <div className="bg-[#f0f2f5] min-h-screen py-20 text-center text-xl text-gray-700">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-8 sm:py-12 px-4">
      <div className="bg-white max-w-6xl mx-auto p-6 sm:p-8 rounded-lg shadow-xl flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Product Image Gallery */}
        <div className="lg:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-md h-80 sm:h-96 flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-sm">
            <img src={selectedImage} alt={product.title} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="w-full max-w-md">
            <Slider {...sliderSettings}>
              {product.images.map((img, index) => (
                <div key={index} className="px-1 py-1">
                  <img
                    src={img}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-cover cursor-pointer border-2 ${selectedImage === img ? 'border-green-500' : 'border-transparent'} rounded-md`}
                    onClick={() => setSelectedImage(img)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 flex flex-col justify-start text-[#0f1c2e]">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>

          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-extrabold text-green-600">${product.price.toFixed(2)}</span>
            {/* Optional: Add old price/discount here if applicable */}
            {/* <span className="text-gray-500 line-through text-xl ml-3">$XX.XX</span> */}
          </div>

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center space-x-4">
            <label htmlFor="quantity" className="text-lg font-medium">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-base"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Add to Cart
          </button>

          {/* Optional: Reviews Section Placeholder */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
            <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            {/* You can implement a review submission form and display here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;