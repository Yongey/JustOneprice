/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  IoIosAddCircle,
  IoMdTrash,
  IoMdCreate,
  IoIosAdd,
} from "react-icons/io";
import Modal from "../Components/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/JOproduct/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleShowUrlInput = () => {
    setShowUrlInput(true);
  };

  const handleAddImageUrl = async (productId) => {
    // Trim whitespace from imageUrl and check if it's empty
    const trimmedUrl = imageUrl.trim();
    if (!trimmedUrl) {
      toast.error("Please enter a valid Image URL.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/JOproduct/products/${productId}/addimageUrl`,
        { imageUrl: trimmedUrl }
      );
      console.log("Image URL added:", response.data);
      toast.success("Image URL added successfully.");
      setImageUrl("");
      fetchProducts();
      setShowUrlInput(false); // Close the URL input form
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error adding image URL:", error);
      toast.error("Failed to add image URL.");
      window.location.reload(); // Refresh the page
    }
  };

  const handleShowModal = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddProduct = async (productData, imageFiles) => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("quantity", productData.quantity);
    formData.append("category", productData.category);
    if (productData.imageUrl) {
      formData.append("imageUrl", productData.imageUrl);
    }
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/JOproduct/products-with-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product created:", response.data);
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDeleteProduct = async (productId, productName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete product "${productName}" (Product_ID: ${productId})?`
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/api/JOproduct/products/${productId}`
        );
        console.log("Product deleted:", productId);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleUpdateProduct = async (updatedProductData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/JOproduct/products/${updatedProductData.product_id}`,
        updatedProductData
      );
      console.log("Product updated:", response.data);
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8 text-blue-600">
        Product Management
      </h1>

      <div className="flex justify-center mb-8">
        <button
          type="button"
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={handleShowModal}
        >
          <IoIosAddCircle className="mr-2" style={{ fontSize: "24px" }} /> Add
          Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Product ID:{" "}
                  <span className="text-gray-900">{product.product_id}</span>
                </h2>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {product.name}
                </h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <p className="text-gray-800 font-semibold text-lg mb-2">
                ${product.price}
              </p>
              <p className="text-gray-600 mb-2">
                Quantity:{" "}
                <span className="font-medium">{product.quantity}</span>
              </p>
              <p className="text-gray-600 mb-4">
                Category:{" "}
                <span className="font-medium">{product.category}</span>
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditProduct(product)}
                >
                  <IoMdCreate style={{ fontSize: "24px" }} />
                </button>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() =>
                    handleDeleteProduct(product.product_id, product.name)
                  }
                >
                  <IoMdTrash style={{ fontSize: "24px" }} />
                </button>
              </div>{" "}
              <div className="flex justify-end space-x-2">
                {/* Icon to add image URL */}
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleShowUrlInput(product.product_id)}
                >
                  <IoIosAdd style={{ fontSize: "24px" }} />
                </button>

                {/* Modal for URL Input */}
                {showUrlInput && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Add Image URL
                      </h2>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="border border-gray-300 p-3 w-full rounded"
                          placeholder="Enter Image URL"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 transition-colors duration-300"
                          onClick={() => handleAddImageUrl(product.product_id)}
                        >
                          Add URL
                        </button>
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded transition-colors duration-300"
                          onClick={() => {
                            setShowUrlInput(false);
                            setImageUrl(""); // Clear input field
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ... */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleAddProduct={handleAddProduct}
        handleUpdateProduct={handleUpdateProduct}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductManagement;
