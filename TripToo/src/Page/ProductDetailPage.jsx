// src/Page/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import allProducts from '../data/products.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addItemToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(0);
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct);
    if (foundProduct?.images?.length > 0) {
      setSelectedImage(foundProduct.images[0]);
    }
  }, [productId]);

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

    if (productId) {
      fetchComments();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItemToCart({ ...product, quantity });
      alert(`${quantity} of ${product.title} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItemToCart({ ...product, quantity });
      navigate('/checkout/shipping');
      alert(`Proceeding to checkout with ${quantity} of ${product.title}!`);
    }
  };

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

    setCommentLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        alert("Authentication token missing. Please log in again.");
        navigate('/signin');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/products/${productId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
      setComments([newComment, ...comments]);
      setNewCommentText('');
      setNewCommentRating(0);
      alert('Comment posted successfully!');
    } catch (err) {
      console.error('Error posting comment:', err);
      setCommentError('Failed to post comment. ' + err.message);
    } finally {
      setCommentLoading(false);
    }
  };

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
    return <div className="py-20 text-center text-xl text-gray-700">Product not found.</div>;
  }

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-8 px-4">
      <div className="bg-white max-w-screen-lg mx-auto p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-md h-96 flex items-center justify-center overflow-hidden mb-4 rounded-lg shadow-xl bg-gray-50 border">
              <img src={selectedImage} alt={product.title} className="max-w-full max-h-full object-contain" />
            </div>

            <div className="w-full max-w-md">
              <Slider {...sliderSettings}>
                {product.images.map((img, index) => (
                  <div key={index} className="px-1 py-1">
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-24 h-24 object-cover cursor-pointer rounded-md transition-all duration-200 ${
                        selectedImage === img ? 'ring-2 ring-green-500 scale-105' : 'ring-2 ring-transparent hover:ring-green-300'
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="lg:w-1/2 text-[#0f1c2e]">
            <h1 className="text-4xl font-extrabold mb-3">{product.title}</h1>
            <div className="flex items-baseline mb-6 pb-4 border-b">
              <span className="text-5xl font-extrabold text-green-600">${product.price.toFixed(2)}</span>
            </div>

            <p className="text-lg mb-8">{product.description}</p>

            <div className="p-4 bg-gray-50 rounded-lg mb-8">
              <div className="mb-4">
                <label htmlFor="quantity" className="text-lg">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="ml-2 p-2 border rounded-md bg-white text-gray-800"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <button onClick={handleAddToCart} className="flex-1 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
                  Buy Now
                </button>
              </div>
            </div>

            {/* --- Customer Comments Section --- */}
            <div className="mt-10 pt-6 border-t">
              <h3 className="text-2xl font-bold mb-6">Customer Reviews ({comments.length})</h3>

              {commentError && <p className="text-red-500 mb-4">{commentError}</p>}
              {commentLoading && <p className="text-gray-600 mb-4">Loading comments...</p>}

              {currentUser ? (
                <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
                  <textarea
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write your comment..."
                    rows="3"
                    className="w-full p-3 border rounded-md"
                    required
                  />
                  <div className="flex gap-2 items-center">
                    <label htmlFor="rating">Rating:</label>
                    <select
                      id="rating"
                      value={newCommentRating}
                      onChange={(e) => setNewCommentRating(parseInt(e.target.value))}
                      className="p-2 border rounded-md"
                    >
                      <option value="0">Select</option>
                      {[5, 4, 3, 2, 1].map(num => (
                        <option key={num} value={num}>{num} Star{num > 1 && 's'}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                    Post Comment
                  </button>
                </form>
              ) : (
                <p>Please <Link to="/signin" className="text-blue-600 underline">log in</Link> to leave a review.</p>
              )}

              <div className="space-y-6">
                {comments.length === 0 && !commentLoading && !commentError && (
                  <p>No comments yet. Be the first to review!</p>
                )}
                {comments.map(comment => (
                  <div key={comment._id} className="border-b pb-4">
                    <p className="font-semibold">
                      {comment.userId?.firstName || 'Anonymous'}{' '}
                      <span className="text-sm text-gray-500">({new Date(comment.createdAt).toLocaleDateString()})</span>
                    </p>
                    {comment.rating > 0 && (
                      <p className="text-yellow-500">⭐ {comment.rating}/5</p>
                    )}
                    <p>{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* --- End Customer Comments --- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
