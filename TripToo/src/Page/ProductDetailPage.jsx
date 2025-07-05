// src/Page/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx'; // <--- IMPORT useAuth
import allProducts from '../data/products.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// For icons like star ratings, user avatar placeholder
// import { FaStar, FaUserCircle } from 'react-icons/fa';

const API_BASE_URL = 'https://YOUR_ACTUAL_RENDER_BACKEND_URL/api'; // <--- Your backend API base URL

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addItemToCart } = useCart();
  const { currentUser } = useAuth(); // <--- Get current user for commenting
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([]); // <--- State for comments
  const [newCommentText, setNewCommentText] = useState(''); // <--- State for new comment input
  const [newCommentRating, setNewCommentRating] = useState(0); // <--- State for new comment rating
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentError, setCommentError] = useState(null);


  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct);
    if (foundProduct && foundProduct.images.length > 0) {
      setSelectedImage(foundProduct.images[0]);
    }
  }, [productId]);

  // --- Fetch Comments on component mount or product change ---
  useEffect(() => {
    const fetchComments = async () => {
      setCommentLoading(true);
      setCommentError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}/comments`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setCommentError('Failed to load comments.');
      } finally {
        setCommentLoading(false);
      }
    };

    if (productId) { // Only fetch if productId is available
      fetchComments();
    }
  }, [productId]); // Refetch comments when product ID changes

  const handleAddToCart = () => {
    if (product) {
      addItemToCart({ ...product, quantity: quantity });
      alert(`${quantity} of ${product.title} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItemToCart({ ...product, quantity: quantity });
      navigate('/checkout/shipping');
      alert(`Proceeding to checkout with ${quantity} of ${product.title}!`);
    }
  };

  // --- Handle Comment Submission ---
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please log in to post a comment.");
      navigate('/signin');
      return;
    }
    if (!newCommentText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    setCommentLoading(true); // Indicate loading state for comments
    try {
      const token = localStorage.getItem('jwtToken'); // Get JWT token
      if (!token) {
          alert("Authentication token missing. Please log in again.");
          navigate('/signin');
          return;
      }

      const response = await fetch(`${API_BASE_URL}/products/${productId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // <--- Send JWT token
        },
        body: JSON.stringify({
          comment: newCommentText,
          rating: newCommentRating || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post comment');
      }

      const newComment = await response.json();
      setComments([newComment, ...comments]); // Add new comment to the top
      setNewCommentText(''); // Clear input
      setNewCommentRating(0); // Reset rating
      alert('Comment posted successfully!');

    } catch (err) {
      console.error('Error posting comment:', err);
      setCommentError('Failed to post comment. ' + err.message);
    } finally {
      setCommentLoading(false);
    }
  };
  // --- END Handle Comment Submission ---


  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } }
    ]
  };

  if (!product) {
    return (
      <div className="bg-[#f0f2f5] min-h-screen py-20 text-center text-xl text-gray-700">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-8 sm:py-12 px-4 flex flex-col">
      <div className="bg-white w-full mx-auto p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl flex-grow">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 items-start">
          {/* Product Image Gallery (Left/Top Section) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center flex-shrink-0">
            <div className="w-full max-w-md h-80 sm:h-96 flex items-center justify-center overflow-hidden mb-4 rounded-lg shadow-xl bg-gray-50 border border-gray-100">
              <img src={selectedImage} alt={product.title} className="max-w-full max-h-full object-contain" />
            </div>

            <div className="w-full max-w-md">
              {product.images.length > 1 && (
                <Slider {...sliderSettings}>
                  {product.images.map((img, index) => (
                    <div key={index} className="px-1 py-1">
                      <img
                        src={img}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        className={`w-20 h-20 sm:w-24 sm:h-24 object-cover cursor-pointer rounded-md transition-all duration-200 ${selectedImage === img ? 'ring-2 ring-green-500 shadow-md transform scale-105' : 'ring-2 ring-transparent hover:ring-green-300'}`}
                        onClick={() => setSelectedImage(img)}
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>

          {/* Product Details (Right/Bottom Section) */}
          <div className="lg:w-1/2 flex flex-col justify-start text-[#0f1c2e] pt-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-baseline mb-6 border-b border-gray-100 pb-4">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-600">${product.price.toFixed(2)}</span>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">{product.description}</p>

            <div className="p-4 sm:p-6 bg-gray-50 rounded-lg shadow-inner flex flex-col gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-lg font-medium text-gray-700">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-grow flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-grow flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* --- CUSTOMER COMMENTS SECTION --- */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews ({comments.length})</h3>

              {commentError && <p className="text-red-500 text-center mb-4">{commentError}</p>}
              {commentLoading && <p className="text-gray-600 text-center mb-4">Loading comments...</p>}

              {/* Comment Submission Form (only for logged-in users) */}
              {currentUser ? (
                <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                  <h4 className="text-lg font-semibold text-gray-800">Leave a Review</h4>
                  <div>
                    <label htmlFor="commentText" className="sr-only">Your Comment</label>
                    <textarea
                      id="commentText"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Write your comment here..."
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]"
                      required
                    ></textarea>
                  </div>
                  {/* Optional Rating Input */}
                  <div className="flex items-center space-x-2">
                    <label htmlFor="commentRating" className="text-gray-700 font-medium">Rating:</label>
                    <select
                      id="commentRating"
                      value={newCommentRating}
                      onChange={(e) => setNewCommentRating(parseInt(e.target.value, 10))}
                      className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="0">Select rating (optional)</option>
                      <option value="5">5 Stars - Excellent</option>
                      <option value="4">4 Stars - Very Good</option>
                      <option value="3">3 Stars - Good</option>
                      <option value="2">2 Stars - Fair</option>
                      <option value="1">1 Star - Poor</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={commentLoading}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
                  >
                    Post Comment
                  </button>
                </form>
              ) : (
                <p className="text-gray-600 text-center mb-8">Please <Link to="/signin" className="text-blue-600 hover:underline">log in</Link> to leave a review.</p>
              )}

              {/* Display Existing Comments */}
              <div className="space-y-6">
                {comments.length === 0 && !commentLoading && !commentError && (
                  <p className="text-gray-600 text-center">No comments yet. Be the first to review this product!</p>
                )}
                {comments.map((comment) => (
                  <div key={comment._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      {/* Optional: User Avatar or default icon */}
                      {/* {comment.userId && comment.userId.avatar ? (
                        <img src={comment.userId.avatar} alt={comment.userId.firstName || comment.userId.email} className="w-8 h-8 rounded-full mr-3 object-cover" />
                      ) : (
                        <FaUserCircle className="text-gray-400 text-2xl mr-3" />
                      )} */}
                      <p className="font-semibold text-gray-800">{comment.userId ? `${comment.userId.firstName} ${comment.userId.lastName}`.trim() || comment.userId.email : 'Anonymous'}</p>
                      <span className="text-gray-500 text-sm ml-auto">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    {/* Display Rating (Optional) */}
                    {comment.rating > 0 && (
                      <div className="flex items-center mb-2">
                        {/* {[...Array(comment.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500" />
                        ))}
                        {[...Array(5 - comment.rating)].map((_, i) => (
                          <FaStar key={i} className="text-gray-300" />
                        ))} */}
                      </div>
                    )}
                    <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* --- END CUSTOMER COMMENTS SECTION --- */}
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h3>
              <ul className="list-none space-y-2 text-gray-700">
                <li className="flex items-center">
                  Durable & Water-Resistant
                </li>
                <li className="flex items-center">
                  Compact & Lightweight Design
                </li>
                <li className="flex items-center">
                  TSA Approved Carry-On Size
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 