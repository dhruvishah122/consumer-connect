"use client"

import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Star } from "lucide-react"

// Import company data
import { companiesData } from "./ComapanyProfile"

const WriteReview = () => {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [name, setName] = useState("")
  const [hoverRating, setHoverRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  // Get company data
  const companyData = companiesData[companyId] || companiesData["d-mart"]

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    console.log({
      companyId,
      name,
      rating,
      comment,
      date: new Date().toISOString(),
    })

    // Show success message
    setSubmitted(true)

    // Reset form
    setRating(0)
    setComment("")
    setName("")

    // After 2 seconds, redirect back to company profile
    setTimeout(() => {
      navigate(`/company/${companyId}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Thank you for your review!</h2>
            <p className="text-green-600 mb-4">Your feedback has been submitted successfully.</p>
            <p className="text-gray-600">Redirecting you back to the company profile...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center mb-8">
              <Link to={`/company/${companyId}`} className="text-gray-500 hover:text-gray-700 mr-4">
                &larr; Back to profile
              </Link>
              <h1 className="text-2xl font-bold">Write a review for {companyData.name}</h1>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`${companyData.logoColor || "bg-green-500"} text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold`}
                >
                  {companyData.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{companyData.name}</h2>
                  {companyData.location && <p className="text-gray-500">{companyData.location}</p>}
                </div>
              </div>
            </div>

            {/* Review Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Rate your experience</h2>

              <form onSubmit={handleSubmit}>
                {/* Star Rating */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Your rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-10 w-10 ${
                            (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating === 0 && <p className="text-red-500 text-sm mt-1">Please select a rating</p>}
                </div>

                {/* Name */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Review Comment */}
                <div className="mb-6">
                  <label htmlFor="comment" className="block text-gray-700 mb-2 font-medium">
                    Your review
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[150px]"
                    placeholder="Share your experience with this company..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={rating === 0 || !comment || !name}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default WriteReview
