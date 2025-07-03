// src/Component/ProductSection.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCart } from '../Context/CartContext'; // CORRECT: Named import
import allProducts from '../data/products'; // Default import (from products.js)

const homepageProducts = allProducts.slice(0, 5);

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};

const ProductSection = () => {
  const { addItemToCart } = useCart();
  const handleAddToCart = (product) => {
    addItemToCart(product);
  };

  return (
    <section className="bg-white text-[#0f1c2e] px-4 py-10">
      <h3 className="text-2xl font-bold mb-8 text-center">Featured Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {homepageProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-3 shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="mb-2">
              <Slider {...sliderSettings}>
                {product.images.map((img, i) => (
                  <div key={i} className="h-40 flex justify-center items-center">
                    <img
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      className="max-h-full object-contain"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="mt-2 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-md mb-1">{product.title}</h4>
                <p className="text-sm leading-snug mb-3">{product.description}</p>
                {product.price && <p className="font-bold text-lg mb-2">${product.price.toFixed(2)}</p>}
              </div>
              <div className="flex space-x-2">
                <button
                  className="border border-[#a8e063] hover:bg-[#f1f9eb] text-[#0f1c2e] px-3 py-1 rounded text-sm font-semibold w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button className="bg-[#a8e063] hover:bg-[#92c955] text-[#0f1c2e] px-3 py-1 rounded text-sm font-semibold w-full">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;