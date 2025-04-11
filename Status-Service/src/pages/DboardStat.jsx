import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const DashboardTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [hoveredRatings, setHoveredRatings] = useState({});

  const userData = [
    {
      customerName: "Lessie Brown",
      branchName: "Main Branch",
      productDetails: "Software License",
      status: "Active"
    },
    {
      customerName: "Al Thiel",
      branchName: "North Branch",
      productDetails: "Cloud Services",
      status: "Resolved"
    },
    {
      customerName: "Amie Lebsack",
      branchName: "West Branch",
      productDetails: "Consulting Package",
      status: "Resolved"
    },
    {
      customerName: "Verlie Windler",
      branchName: "East Branch",
      productDetails: "Support Plan",
      status: "Active"
    },
    {
      customerName: "Zachary Welch",
      branchName: "South Branch",
      productDetails: "Training Program",
      status: "Active"
    },
    {
      customerName: "Bryce Greenfelder",
      branchName: "Central Branch",
      productDetails: "Enterprise Solution",
      status: "Resolved"
    },
    {
      customerName: "Elsie Dooley",
      branchName: "Remote Branch",
      productDetails: "Maintenance Contract",
      status: "Active"
    }
  ];

  // Filter logic
  const filteredUsers = userData.filter(user => {
    const matchesSearch = user.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.productDetails.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  // Count users by status
  const statusCounts = {
    Active: userData.filter(user => user.status === 'Active').length,
    Resolved: userData.filter(user => user.status === 'Resolved').length
  };

  // Handle star rating
  const handleRating = (userId, rating) => {
    setRatings(prev => ({
      ...prev,
      [userId]: rating
    }));
  };

  // Handle review text change
  const handleReviewChange = (userId, text) => {
    setReviews(prev => ({
      ...prev,
      [userId]: text
    }));
  };

  // Handle review submission
  const handleSubmitReview = (userId) => {
    console.log(`Review submitted for user ${userId}:`, {
      rating: ratings[userId] || 0,
      reviewText: reviews[userId] || ''
    });
    
    // Clear the review text after submission
    handleReviewChange(userId, '');
  };

  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User List</h2>
        <div className="flex gap-2">
          <Button variant="outline">Invite User</Button>
          <Button>Add User</Button>
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
          <button 
            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            className="flex items-center border rounded-md px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          >
            <span className="mr-2">Status</span>
            <svg 
              className="h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {isStatusDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-10">
              <div className="py-1">
                {/* Active Status */}
                <label 
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setStatusFilter(statusFilter === 'Active' ? null : 'Active');
                    setIsStatusDropdownOpen(false);
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={statusFilter === 'Active'}
                    readOnly
                    className="mr-2"
                  />
                  <span className="flex-grow">Active</span>
                  <span className="text-gray-500 ml-2">{statusCounts.Active}</span>
                </label>

                {/* Resolved Status */}
                <label 
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setStatusFilter(statusFilter === 'Resolved' ? null : 'Resolved');
                    setIsStatusDropdownOpen(false);
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={statusFilter === 'Resolved'}
                    readOnly
                    className="mr-2"
                  />
                  <span className="flex-grow">Resolved</span>
                  <span className="text-gray-500 ml-2">{statusCounts.Resolved}</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-2 border-b border-gray-200 dark:border-gray-700 py-3 px-4 font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
          <div>Customer Name</div>
          <div>Branch Name</div>
          <div>Product Details</div>
          <div>Rating</div>
          <div>Review</div>
        </div>
        
        {/* Table Body */}
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
              
              {/* Star Rating Column */}
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => handleRating(userId, star)}
                    onMouseEnter={() => setHoveredRatings({...hoveredRatings, [userId]: star})}
                    onMouseLeave={() => setHoveredRatings({...hoveredRatings, [userId]: 0})}
                  >
                    <svg 
                      className={`w-5 h-5 ${
                        star <= (hoveredRating || currentRating) 
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
              
              {/* Review Column */}
              <div className="relative">
                <textarea
                  value={reviewText}
                  onChange={(e) => handleReviewChange(userId, e.target.value)}
                  placeholder="Write a review..."
                  className="w-full p-2 border rounded text-sm resize-none"
                  rows="2"
                />
                {reviewText && (
                  <button
                    onClick={() => handleSubmitReview(userId)}
                    className="absolute right-2 bottom-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Submit
                  </button>
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