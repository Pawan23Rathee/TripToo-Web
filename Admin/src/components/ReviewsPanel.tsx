import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Trash2,
  Calendar
} from 'lucide-react';

const ReviewsPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const reviews = [
    {
      id: 1,
      customer: 'John Doe',
      product: 'Premium Travel Kit',
      rating: 5,
      comment: 'Excellent quality! Everything I needed for my business trip. The organizer compartments are perfect.',
      date: '2024-01-20',
      status: 'approved',
      helpful: 24,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1'
    },
    {
      id: 2,
      customer: 'Jane Smith',
      product: 'Toiletry Organizer Pro',
      rating: 4,
      comment: 'Good product overall, but the zipper could be more durable. Still recommend it for travelers.',
      date: '2024-01-19',
      status: 'pending',
      helpful: 12,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1'
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      product: 'Travel Comfort Set',
      rating: 5,
      comment: 'Amazing comfort during long flights! The pillow and blanket quality exceeded my expectations.',
      date: '2024-01-18',
      status: 'approved',
      helpful: 31,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1'
    },
    {
      id: 4,
      customer: 'Sarah Wilson',
      product: 'Tech Travel Bundle',
      rating: 2,
      comment: 'The charging cables stopped working after just one trip. Very disappointed with the quality.',
      date: '2024-01-17',
      status: 'pending',
      helpful: 8,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1'
    },
    {
      id: 5,
      customer: 'David Brown',
      product: 'Basic Travel Kit',
      rating: 4,
      comment: 'Good value for money. Basic but functional. Perfect for short trips.',
      date: '2024-01-16',
      status: 'approved',
      helpful: 15,
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1'
    }
  ];

  const ratingOptions = ['all', '5', '4', '3', '2', '1'];
  const statusOptions = ['all', 'approved', 'pending', 'rejected'];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleApprove = (reviewId: number) => {
    console.log('Approve review:', reviewId);
  };

  const handleReject = (reviewId: number) => {
    console.log('Reject review:', reviewId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reviews & Feedback
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Moderate customer reviews and manage feedback
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reviews</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">2,456</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">23</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">4.6</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Positive Reviews</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">87%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews by customer, product, or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ratingOptions.map(rating => (
                <option key={rating} value={rating}>
                  {rating === 'all' ? 'All Ratings' : `${rating} Stars`}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 sm:space-y-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between">
              <div className="flex items-start space-x-3 sm:space-x-4 flex-1 w-full">
                <img
                  src={review.avatar}
                  alt={review.customer}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        {review.customer}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.product}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(review.status)}`}>
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {review.date}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {review.comment}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {review.helpful} helpful
                      </div>
                    </div>
                    
                    <div className="flex items-center flex-wrap gap-2">
                      {review.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(review.id)}
                            className="flex items-center px-3 py-1 bg-green-600 text-white text-xs sm:text-sm rounded hover:bg-green-700 transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(review.id)}
                            className="flex items-center px-3 py-1 bg-red-600 text-white text-xs sm:text-sm rounded hover:bg-red-700 transition-colors"
                          >
                            <ThumbsDown className="w-4 h-4 mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPanel