"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { useParams, Link } from "react-router-dom"

// Company data for multiple companies
export const companiesData = {
  "d-mart": {
    id: "d-mart",
    name: "D-Mart",
    location: "Mumbai, India",
    rating: 5,
    description: "Leading retail chain offering competitive prices on groceries and household items.",
    longDescription:
      "D-Mart is one of India's largest and most successful retail chains founded in 2000. Known for offering products at discounted prices, D-Mart operates on an everyday low cost/low price model. The company focuses on providing customers with a wide range of basic home and personal products under one roof, including food items, toiletries, beauty products, garments, kitchenware, bedsheets, toys, and games.",
    reviews: [
      {
        id: 1,
        user: "Rahul M.",
        rating: 5,
        date: "April 3, 2025",
        comment: "Best prices in town! I always find everything I need for my monthly groceries at excellent rates.",
      },
      {
        id: 2,
        user: "Priya S.",
        rating: 5,
        date: "March 30, 2025",
        comment: "The store layout is so convenient, and they have great discounts on household items.",
      },
      {
        id: 3,
        user: "Ankit J.",
        rating: 4,
        date: "March 27, 2025",
        comment: "Good variety of products, though weekends can get very crowded.",
      },
      {
        id: 4,
        user: "Meera P.",
        rating: 5,
        date: "March 23, 2025",
        comment: "Their private label products are affordable and good quality. Been shopping here for years.",
      },
      {
        id: 5,
        user: "Vikram T.",
        rating: 4,
        date: "March 18, 2025",
        comment: "Excellent value for money. Just wish they would expand their organic food section.",
      },
    ],
    logoColor: "bg-blue-500",
  },
  zepto: {
    id: "zepto",
    name: "Zepto",
    location: "Bangalore, India",
    rating: 4,
    description: "Quick commerce startup specializing in 10-minute grocery deliveries.",
    longDescription:
      "Zepto is revolutionizing quick commerce in India with its innovative 10-minute grocery delivery model. Founded in 2021, the company has rapidly expanded across major Indian cities. Zepto operates a network of dark stores that are strategically located to enable ultra-fast deliveries of groceries, fresh produce, and everyday essentials. Their technology-focused approach and efficient logistics have made them a favorite among urban consumers who value convenience and speed.",
    reviews: [
      {
        id: 1,
        user: "Karan S.",
        rating: 5,
        date: "April 4, 2025",
        comment: "Incredible service! Ordered groceries at 9 PM and received them in just 8 minutes.",
      },
      {
        id: 2,
        user: "Aisha R.",
        rating: 3,
        date: "March 29, 2025",
        comment: "Good selection of products but sometimes items are out of stock.",
      },
      {
        id: 3,
        user: "Nikhil D.",
        rating: 4,
        date: "March 26, 2025",
        comment: "Very convenient for last-minute grocery needs. Delivery is always prompt.",
      },
      {
        id: 4,
        user: "Sneha G.",
        rating: 5,
        date: "March 22, 2025",
        comment: "The app is user-friendly and their delivery staff are always polite and efficient.",
      },
      {
        id: 5,
        user: "Rohan M.",
        rating: 3,
        date: "March 15, 2025",
        comment: "Great concept but prices are slightly higher than regular supermarkets.",
      },
    ],
    logoColor: "bg-purple-500",
  },
  "big-bazaar": {
    id: "big-bazaar",
    name: "Big Bazaar",
    location: "Delhi, India",
    rating: 3,
    description: "Popular hypermarket chain offering a wide range of products at discount prices.",
    longDescription:
      "Big Bazaar is one of India's pioneering hypermarket chains, offering a diverse range of products from groceries and fashion to home furnishings and electronics. Founded in 2001, Big Bazaar introduced the hypermarket concept to Indian consumers and revolutionized retail shopping with its 'Sabse Sasta Din' (Cheapest Day) sales events. With stores across major cities and small towns, Big Bazaar combines the look and feel of Indian bazaars with the convenience of modern retail.",
    reviews: [
      {
        id: 1,
        user: "Amit K.",
        rating: 3,
        date: "April 1, 2025",
        comment: "Good variety of products but store maintenance could be better.",
      },
      {
        id: 2,
        user: "Divya N.",
        rating: 4,
        date: "March 27, 2025",
        comment: "Their sale days offer amazing deals. Got great discounts on kitchen appliances last month.",
      },
      {
        id: 3,
        user: "Sanjay P.",
        rating: 2,
        date: "March 24, 2025",
        comment: "Long checkout lines during weekends, and some sections are disorganized.",
      },
      {
        id: 4,
        user: "Neha T.",
        rating: 4,
        date: "March 21, 2025",
        comment: "Their fashion section has improved a lot. Found some really nice clothes at affordable prices.",
      },
      {
        id: 5,
        user: "Raj S.",
        rating: 3,
        date: "March 17, 2025",
        comment: "Good for monthly shopping, but the online delivery service needs improvement.",
      },
    ],
    logoColor: "bg-orange-500",
  },
  eecu: {
    name: "EECU Credit Union",
    rating: 4.8,
    description:
      "EECU Credit Union is a trusted financial institution dedicated to providing exceptional banking services to our members. With over 85 years of experience, we offer competitive rates on loans, savings accounts, and a range of financial products designed to help our members achieve their financial goals.",
    longDescription:
      "Founded in 1937, EECU Credit Union has grown to become one of the leading credit unions in the region. We're committed to our community and provide personalized financial solutions with a member-first approach. Our mission is to empower our members through financial education, innovative digital banking solutions, and responsive customer service. As a member-owned cooperative, we reinvest our profits back into better rates, lower fees, and enhanced services for our members.",
    reviews: [
      {
        id: 1,
        user: "Michael R.",
        rating: 5,
        date: "April 2, 2025",
        comment:
          "Excellent customer service! The staff was incredibly helpful when I needed assistance with my mortgage application. The entire process was smooth and efficient.",
      },
      {
        id: 2,
        user: "Sarah T.",
        rating: 5,
        date: "March 28, 2025",
        comment:
          "I've been a member for over 10 years and have always had positive experiences. Their online banking platform is user-friendly and their rates are competitive.",
      },
      {
        id: 3,
        user: "David L.",
        rating: 4,
        date: "March 25, 2025",
        comment:
          "Good service overall. The loan application process was straightforward, though it took a bit longer than expected to get approved.",
      },
      {
        id: 4,
        user: "Jennifer W.",
        rating: 5,
        date: "March 20, 2025",
        comment:
          "The mobile app is fantastic! I can deposit checks, transfer money, and pay bills all from my phone. Their customer service team is also very responsive.",
      },
      {
        id: 5,
        user: "Robert K.",
        rating: 3,
        date: "March 15, 2025",
        comment:
          "Decent credit union. Had some issues with account setup, but they were eventually resolved by a helpful manager.",
      },
    ],
    logoColor: "bg-green-500",
  },
}

// Star Rating Component
const StarRating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
    ))}
  </div>
)

// Review Summary Component
const ReviewSummary = ({ reviews }) => {
  const totalReviews = reviews.length

  // Calculate percentage for each rating
  const ratingCounts = Array(5).fill(0)
  reviews.forEach((review) => {
    ratingCounts[5 - review.rating]++
  })

  const ratingPercentages = ratingCounts.map((count) => Math.round((count / totalReviews) * 100))

  // Calculate average rating
  const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Customer Rating</h3>
        <div className="flex items-center">
          <span className="text-3xl font-bold text-green-600 mr-2">{avgRating.toFixed(1)}</span>
          <StarRating rating={Math.round(avgRating)} />
        </div>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star, index) => (
          <div key={star} className="flex items-center">
            <span className="w-16 text-sm text-gray-600">{star} star</span>
            <div className="flex-1 mx-3 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: `${ratingPercentages[index]}%` }} />
            </div>
            <span className="w-12 text-sm text-gray-600">{ratingPercentages[index]}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const CompanyProfileWebsite = () => {
  const [activeSection, setActiveSection] = useState("home")
  const { companyId } = useParams()

  // Determine which company data to display based on the URL parameter
  const currentCompanyId = companyId
  const companyData = companiesData[currentCompanyId] || companiesData["d-mart"]

  // Scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Home Section */}
      <section id="home" className="pt-8 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`${companyData.logoColor || "bg-green-500"} text-white rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold`}
                >
                  {companyData.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{companyData.name}</h1>
                  {companyData.location && <p className="text-gray-500 mt-1">{companyData.location}</p>}
                  <div className="flex items-center mt-1 space-x-2">
                    <div className="text-green-600 text-2xl font-bold">{companyData.rating}</div>
                    <StarRating rating={Math.round(companyData.rating)} />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-lg">{companyData.description}</p>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => scrollToSection("about")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("reviews")}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
                >
                  Read Reviews
                </button>
                <Link
                  to={`/company/${companyId}/write-review`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
                >
                  Write a Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">About {companyData.name}</h2>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-700 leading-relaxed">{companyData.longDescription}</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <Link
              to={`/company/${companyId}/write-review`}
              className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
            >
              Write a review
            </Link>
          </div>

          {/* Rating Summary */}
          <ReviewSummary reviews={companyData.reviews} />

          {/* Individual Reviews */}
          <div className="grid gap-6 md:grid-cols-2">
            {companyData.reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{review.user}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div
              className={`${companyData.logoColor || "bg-green-500"} text-white rounded-full h-10 w-10 flex items-center justify-center text-xl font-bold`}
            >
              {companyData.name.charAt(0)}
            </div>
            <span className="font-bold text-xl">{companyData.name}</span>
          </div>
          <p className="text-gray-300">© 2025 {companyData.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default CompanyProfileWebsite
