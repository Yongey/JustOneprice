import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../routes/AuthContext"; // Import AuthContext

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (product.images?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (product.images?.length || 0) - 1 : prevIndex - 1
    );
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const description = product.description || "";
  const truncatedDescription = `${description.slice(0, 100)}`;

  const handleViewDetails = () => {
    if (token) {
      navigate(`/product/${product.product_id}`);
    }
  };

  return (
    <div className="container product-card">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="relative">
          {product.images && product.images.length > 0 ? (
            <>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  className={`p-8 rounded-t-lg product-image ${
                    index === currentImageIndex ? "" : "hidden"
                  }`}
                  src={
                    image?.image_url?.startsWith("http")
                      ? image.image_url
                      : `http://localhost:3000${image.image_url}`
                  }
                  alt={product.name}
                />
              ))}
              {product.images.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-gray-200 to-gray-300 border border-gray-300 rounded-full p-2 shadow-md hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400 hover:shadow-lg transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                    onClick={prevImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-gray-200 to-gray-300 border border-gray-300 rounded-full p-2 shadow-md hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400 hover:shadow-lg transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                    onClick={nextImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No images available
            </div>
          )}
        </div>
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {isExpanded ? description : truncatedDescription}
            {description.length > 70 && (
              <button
                className="text-blue-600 hover:text-blue-200 text-sm ml-1 transition duration-300 ease-in-out"
                onClick={toggleExpand}
              >
                {isExpanded ? "View Less" : "View More"}
              </button>
            )}
          </p>
          {token ? (
            <div className="flex flex-col items-center mt-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">Login to see the price</p>
          )}
          <button
            onClick={handleViewDetails}
            disabled={!token}
            className={`text-center text-white mt-4 font-medium rounded-lg text-sm px-5 py-2.5 ml-4 ${
              token
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
