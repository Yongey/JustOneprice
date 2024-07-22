/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  IoIosAddCircle,
  IoMdTrash,
  IoMdCreate,
  IoIosAdd,
  IoIosImage,
} from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";
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
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [productImages, setProductImages] = useState({});
  const [currentProductId, setCurrentProductId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
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

  const handleAddImageUrl = async () => {
    if (!selectedProductId) {
      toast.error("No product selected.");
      return;
    }

    const trimmedUrl = imageUrl.trim();
    if (!trimmedUrl) {
      toast.error("Please enter a valid Image URL.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/JOproduct/products/${selectedProductId}/addimageUrl`,
        { imageUrl: trimmedUrl }
      );
      console.log("Image URL added:", response.data);
      toast.success("Image URL added successfully.");
      setImageUrl("");
      fetchProducts(); // Refresh the product list
      setShowUrlInput(false); // Close the URL input form
    } catch (error) {
      console.error("Error adding image URL:", error);
      toast.error("Failed to add image URL.");
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
  const handleViewImages = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/JOproduct/product/${productId}/images`
      );
      setProductImages((prevImages) => ({
        ...prevImages,
        [productId]: response.data, // Set the images directly
      }));
      setCurrentProductId(productId);
      setShowImageModal(true); // Show the modal
    } catch (error) {
      console.error("Error fetching product images:", error);
      toast.error("Failed to fetch product images.");
    }
  };
  const handleSelectImage = (image) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(image.image_id)
        ? prevSelected.filter((id) => id !== image.image_id)
        : [...prevSelected, image.image_id]
    );
  };

  const handleDeleteImages = async () => {
    if (selectedImages.length === 0) {
      toast.error("No images selected for deletion.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/JOproduct/products/${currentProductId}/deleteImages`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: { imageIds: selectedImages },
        }
      );
      toast.success("Selected images deleted successfully.");
      setSelectedImages([]);
      fetchProducts();
      closeImageModal();
    } catch (error) {
      console.error("Error deleting images:", error);
      toast.error("Failed to delete selected images.");
    }
  };
  const handleShowUrlInput = (productId) => {
    setSelectedProductId(productId);
    setShowUrlInput(true);
  };
  const closeImageModal = () => {
    setShowImageModal(false);
    setCurrentProductId(null);
    setSelectedImages([]);
  };
  const handleUploadImage = (productId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true; // Allow multiple file selection
    input.onchange = async (e) => {
      const files = e.target.files; // Get all selected files
      if (files.length > 0) {
        try {
          const formData = new FormData();

          // Append all selected files to FormData
          Array.from(files).forEach((file) => formData.append("images", file));

          const url = `http://localhost:3000/api/JOproduct/products/${productId}/images`;
          console.log("Upload URL:", url);

          const response = await axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          console.log("Upload Response:", response.data);
          toast.success("Images uploaded successfully.");
          fetchProducts(); // Refresh the product list or perform any other necessary action
        } catch (error) {
          console.error("Error uploading images:", error);
          toast.error("Failed to upload images.");
        }
      }
    };
    input.click();
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
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="text-blue-500 hover:text-white-700 hover:bg-blue-700 "
                  onClick={() => handleEditProduct(product)}
                >
                  <IoMdCreate style={{ fontSize: "24px" }} />
                </button>
                <button
                  type="button"
                  className="text-red-500 hover:bg-red-700 hover:text-white-700"
                  onClick={() =>
                    handleDeleteProduct(product.product_id, product.name)
                  }
                >
                  <IoMdTrash style={{ fontSize: "24px" }} />
                </button>
                <button
                  type="button"
                  className="text-violet-700 hover:bg-violet-700"
                  onClick={() => handleShowUrlInput(product.product_id)}
                >
                  <IoIosAdd style={{ fontSize: "24px" }} />
                </button>
                {showUrlInput && selectedProductId === product.product_id && (
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
                          onClick={handleAddImageUrl}
                        >
                          Add URL
                        </button>
                        <button
                          type="button"
                          className="text-red px-4 py-2 rounded transition-colors duration-300 hover:bg-red-700"
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
                <button
                  type="button"
                  className="text-green-700 hover:bg-green-700"
                  onClick={() => handleViewImages(product.product_id)}
                >
                  <IoIosImage style={{ fontSize: "24px" }} />
                </button>
                <button
                  type="button"
                  className="text-yellow-700 hover:bg-yellow-700"
                  onClick={() => handleUploadImage(product.product_id)}
                >
                  <RiImageAddLine style={{ fontSize: "24px" }} />
                </button>
              </div>{" "}
              {/* ... */}
            </div>
          </div>
        ))}{" "}
        {showImageModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
            onClick={closeImageModal}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Product Images
              </h2>
              {productImages[currentProductId] &&
                productImages[currentProductId].length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {productImages[currentProductId].map((image, index) => (
                      <div key={index} className="relative text-center">
                        <input
                          type="checkbox"
                          className="absolute top-0 right-0 m-2 z-10"
                          checked={selectedImages.includes(image.image_id)}
                          onChange={() => handleSelectImage(image)}
                        />
                        <img
                          className="w-24 h-24 object-cover rounded-md mb-2"
                          src={
                            image?.image_url?.startsWith("http")
                              ? image.image_url
                              : `http://localhost:3000${image.image_url}`
                          }
                          alt={`Product ${currentProductId}`}
                        />
                        <div className="text-gray-600 text-xs">
                          {image.image_id}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={handleDeleteImages}
                >
                  Delete Selected
                </button>
                <button
                  type="button"
                  className="mt-4 bg-red-300 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={closeImageModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
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
