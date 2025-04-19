import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardTable = () => {
  const { email } = useParams();
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [hoveredRatings, setHoveredRatings] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8083/${email}/status`);
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [email]);

  const filteredUsers = userData.filter(user => {
    const matchesSearch = user.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.productDetails.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    Active: userData.filter(user => user.status === 'Active').length,
    Resolved: userData.filter(user => user.status === 'Resolved').length
  };

  const handleRating = (userId, rating) => {
    setRatings(prev => ({
      ...prev,
      [userId]: rating
    }));
  };

  const handleReviewChange = (userId, text) => {
    setReviews(prev => ({
      ...prev,
      [userId]: text
    }));
  };

  const handleSubmitReview = async (userId) => {
    const user = filteredUsers[parseInt(userId.split('-')[1])];

    const payload = {
      customerName: user.customerName,
      branchName: user.branchName,
      productDetails: user.productDetails,
      rating: ratings[userId] || 0,
      reviewText: reviews[userId] || '',
      email: email,
      privateID: user.privateID
    };
console.log(payload);
    try {
      const res = await fetch('http://localhost:8083/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log('✅✨ Review saved successfully! 🎉📝`');
        handleReviewChange(userId, '');
        alert("✅✨ Review saved successfully! 🎉📝");
      } else {
        console.error('Failed to submit review');
        alert("❌ Failed to save review. Please try again! 😞");
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rate brands</h2>
        <div className="flex gap-2">
          
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-4 flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Filter users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />
          <svg
            className="absolute left-2 top-3 h-4 w-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        {/* Status Filter */}
        <div className="relative">
         

          {isStatusDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-10">
              <div className="py-1">
                {['Active', 'Resolved'].map((status) => (
                  <label
                    key={status}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setStatusFilter(statusFilter === status ? null : status);
                      setIsStatusDropdownOpen(false);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={statusFilter === status}
                      readOnly
                      className="mr-2"
                    />
                    <span className="flex-grow">{status}</span>
                    <span className="text-gray-500 ml-2">{statusCounts[status]}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow">
        <div className="grid grid-cols-5 gap-2 border-b border-gray-200 dark:border-gray-700 py-3 px-4 font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
          <div>Customer Name</div>
          <div>Branch Name</div>
          <div>Product Details</div>
          <div>Rating</div>
          <div>Review</div>
        </div>

        {filteredUsers.map((user, index) => {
          const userId = `user-${index}`;
          const currentRating = ratings[userId] || 0;
          const hoveredRating = hoveredRatings[userId] || 0;
          const reviewText = reviews[userId] || '';

          return (
            <div
              key={index}
              className="grid grid-cols-5 gap-2 border-b border-gray-100 dark:border-gray-700 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="text-gray-900 dark:text-white">{user.customerName}</div>
              <div className="text-gray-600 dark:text-gray-300">{user.branchName}</div>
              <div className="text-gray-600 dark:text-gray-300">{user.productDetails}</div>

              {/* Rating */}
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => handleRating(userId, star)}
                    onMouseEnter={() => setHoveredRatings({ ...hoveredRatings, [userId]: star })}
                    onMouseLeave={() => setHoveredRatings({ ...hoveredRatings, [userId]: 0 })}
                  >
                    <svg
                      className={`w-5 h-5 ${star <= (hoveredRating || currentRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 fill-gray-300'
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                ))}
              </div>

              {/* Review */}
              <div className="relative">
                <textarea
                  value={reviewText}
                  onChange={(e) => handleReviewChange(userId, e.target.value)}
                  placeholder="Write a review..."
                  className="w-full p-2 border rounded text-sm resize-none"
                  rows="2"
                />
                {reviewText && (
                  <Button
                    onClick={() => handleSubmitReview(userId)}
                    className="absolute right-2 bottom-2 h-[13px] "
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardTable;
