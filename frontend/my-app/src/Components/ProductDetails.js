import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../Components/productDetail.css";
import { useCart } from "../Components/CartContext";
import { AuthContext } from "../routes/AuthContext"; // Import AuthContext

const ProductDetails = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const { addToCart } = useCart();
  const { token } = useContext(AuthContext); // Get token from AuthContext
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Add state for current image index
  const [quantity, setQuantity] = useState(10); // Initialize quantity state to 10
  const [isCustom, setIsCustom] = useState(false);
  const [size, setSize] = useState("medium"); // Default size
  const [addedToCart, setAddedToCart] = useState(false); // State to track cart addition

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/JOproduct/products/${productId}`
        );
        const data = await response.json();
        setProduct(data.product);
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustom(true);
      setQuantity(1); // Default custom quantity
    } else {
      setIsCustom(false);
      setQuantity(Number(value));
    }
  };

  const handleCustomQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const totalPrice = product ? parseFloat(product.price) * quantity : 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, size); // Pass size to addToCart function
      setAddedToCart(true); // Set addedToCart to true when item is added
      setTimeout(() => {
        setAddedToCart(false); // Reset addedToCart to false after 2000 milliseconds (2 seconds)
      }, 800);
    }
  };

  if (!product) {
    return <div>Oops! We cannot find your product</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="breadcrumbs text-gray-500 text-lg">
            <button
              onClick={() => window.history.back()} // Adjust the history function
              className="flex items-center  "
              style={{ position: "absolute", top: "8%", left: "6%" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 2.293a1 1 0 0 1 1.414 0L13 6.586V4a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 0 0-1 1v14a1 1 0 0 0 2 0V4h10v12a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1H5z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Wholesale
            </button>
            Home / Products / ProductID-{product.product_id}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {product.name}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {product.description}
          </p>

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Quantity:
            </label>
            <select
              value={isCustom ? "custom" : quantity} // Set value based on isCustom state
              onChange={handleQuantityChange}
              className="w-25 p-2 mt-2 text-center border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value="custom">Customize</option>
            </select>
            {isCustom && (
              <input
                type="number"
                value={quantity}
                onChange={handleCustomQuantityChange}
                min="1"
                className="w-20 p-2 mt-2 text-center border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            )}
            <div className="mt-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Size:
              </label>
              <select
                value={size}
                onChange={handleSizeChange}
                className="w-25 p-2 mt-2 text-center border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            {token ? (
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Total Price: ${totalPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Login to see the price
              </p>
            )}

            <button
              onClick={handleAddToCart}
              disabled={!token}
              className={`mt-6 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                token
                  ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
            {addedToCart && (
              <p className="text-green-600 mt-2">Item added to cart!</p>
            )}
          </div>
        </div>
        <div className="relative flex justify-center items-center fixed-size-container">
          {images.length > 0 ? (
            <>
              <div className="relative overflow-hidden fixed-size-container">
                <img
                  key={images[currentImageIndex].image_id}
                  className="fixed-size-image object-cover transition-transform duration-500 ease-in-out"
                  src={
                    images[currentImageIndex].image_url.startsWith("/")
                      ? `http://localhost:3000${images[currentImageIndex].image_url}`
                      : images[currentImageIndex].image_url
                  }
                  alt={product.name}
                />
              </div>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
                style={{ top: "50%" }}
              >
                &lt;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
                style={{ top: "50%" }}
              >
                &gt;
              </button>
            </>
          ) : (
            <img
              className="fixed-size-image rounded-lg"
              src="https://via.placeholder.com/500"
              alt="Placeholder"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
