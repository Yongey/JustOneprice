import React, { useState, useEffect } from "react";

const Modal = ({
  show,
  handleClose,
  handleAddProduct,
  handleUpdateProduct,
  selectedProduct,
}) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Populate form with selected product data if available
  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.name || "");
      setCategory(selectedProduct.category || "");
      setPrice(selectedProduct.price || 0);
      setQuantity(selectedProduct.quantity || 0);
      setDescription(selectedProduct.description || "");
      setSelectedFiles([]); // Clear previous files
    } else {
      // Reset form fields when adding a new product
      setProductName("");
      setCategory("");
      setPrice(0);
      setQuantity(0);
      setDescription("");
      setSelectedFiles([]);
    }
  }, [selectedProduct]);

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

    if (selectedProduct) {
      // Call update handler if editing an existing product
      handleUpdateProduct({
        ...productData,
        product_id: selectedProduct.product_id,
      });
    } else {
      // Call add handler if creating a new product
      handleAddProduct(productData, selectedFiles);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        show ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">
          {selectedProduct ? "Edit Product" : "Add New Product"}
        </h2>
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
          {!selectedProduct && (
            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                className="w-full border rounded px-2 py-1"
                onChange={handleImageUpload}
                multiple
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              {selectedProduct ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
