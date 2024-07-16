import React, { useState } from "react";

const Modal = ({ show, handleClose, handleAddProduct }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState(""); // Add description state
  const [imageType, setImageType] = useState("upload"); // Default to "upload"
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageTypeChange = (type) => {
    setImageType(type);
    setImageUrl(""); // Clear URL input when changing type
  };

  const handleImageUpload = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    const productData = {
      name: productName,
      description,
      category,
      price,
      quantity,
    };

    if (imageType === "url") {
      productData.imageUrl = imageUrl;
    }

    handleAddProduct(productData, selectedFiles);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        show ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSaveProduct}>
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="upload"
                name="imageType"
                value="upload"
                checked={imageType === "upload"}
                onChange={() => handleImageTypeChange("upload")}
                className="mr-2"
              />
              <label htmlFor="upload">Upload</label>
              <input
                type="file"
                className="ml-4 border rounded px-2 py-1"
                onChange={handleImageUpload}
                multiple
                disabled={imageType !== "upload"}
              />
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="url"
                name="imageType"
                value="url"
                checked={imageType === "url"}
                onChange={() => handleImageTypeChange("url")}
                className="mr-2"
              />
              <label htmlFor="url">URL</label>
              <input
                type="text"
                className="ml-4 w-full px-3 py-2 border rounded"
                placeholder="Paste image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={imageType !== "url"}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
