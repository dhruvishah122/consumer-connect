// CompanyList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const companies = [
  {
    id: "d-mart",
    name: "D-Mart",
    location: "Mumbai, India",
    rating: 5,
    reviews: 1200,
    description: "Leading retail chain offering competitive prices on groceries and household items."
  },
  {
    id: "zepto",
    name: "Zepto",
    location: "Bangalore, India",
    rating: 4,
    reviews: 820,
    description: "Quick commerce startup specializing in 10-minute grocery deliveries."
  },
  {
    id: "big-bazaar",
    name: "Big Bazaar",
    location: "Delhi, India",
    rating: 3,
    reviews: 3500,
    description: "Popular hypermarket chain offering a wide range of products at discount prices."
  },
];

const StarRating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        fill={i < rating ? "currentColor" : "none"}
        className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
      />
    ))}
  </div>
);

const CompanyAvatar = ({ name }) => {
  // Get first letter of company name for avatar
  const initial = name.charAt(0);
  
  // Generate a deterministic background color based on company name
  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-orange-500"];
  const colorIndex = name.length % colors.length;
  
  return (
    <div className={`${colors[colorIndex]} text-white font-bold rounded-lg w-12 h-12 flex items-center justify-center text-xl`}>
      {initial}
    </div>
  );
};

const CompanyList = () => {
  const navigate = useNavigate();

  const handleCompanyClick = (companyId) => {
    navigate(`/company/${companyId}`);
  };

  return (
    <div className="container mx-auto mt-16"> {/* Space at top for navbar */}
      <div className="flex flex-col space-y-4 max-w-3xl mx-auto p-4">
        {companies.map((company) => (
          <div
            key={company.id}
            onClick={() => handleCompanyClick(company.id)}
            className="cursor-pointer w-full"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <CompanyAvatar name={company.name} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-gray-800">{company.name}</h2>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 mr-1">{company.rating.toFixed(1)}</span>
                        <StarRating rating={company.rating} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{company.location}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-600">{company.description}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{company.reviews.toLocaleString()}</span> reviews
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;