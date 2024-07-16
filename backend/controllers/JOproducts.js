/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
// productController.js

const productModel = require("../models/JOproduct");

const productController = {
  insertProduct: async (req, res) => {
    const { name, description, price, quantity, category } = req.body;
    const imageUrl = req.body.imageUrl;
    const imageFiles = req.files;

    try {
      // Insert the product
      const productId = await productModel.insertProduct(
        name,
        description,
        price,
        quantity,
        category
      );

      // Insert the images
      if (imageFiles && imageFiles.length > 0) {
        const imageInserts = imageFiles.map(async (file) => {
          await productModel.insertImage(productId, file);
        });
        await Promise.all(imageInserts);
      }

      if (imageUrl) {
        await productModel.insertImage(productId, imageUrl);
      }

      res.status(201).json({
        product_id: productId,
        message: "Product and images created successfully",
      });
    } catch (error) {
      console.error("Error inserting product and images:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  uploadImages: async (req, res) => {
    const { productId } = req.params;
    const imageUrl = req.body.imageUrl;
    const imageFiles = req.files;

    try {
      if (!imageUrl && (!imageFiles || imageFiles.length === 0)) {
        return res
          .status(400)
          .json({ error: "No valid image or file provided" });
      }

      if (imageFiles && imageFiles.length > 0) {
        const imageInserts = imageFiles.map(async (file) => {
          await productModel.insertImage(productId, file);
        });
        await Promise.all(imageInserts);
      }

      if (imageUrl) {
        await productModel.insertImage(productId, imageUrl);
      }

      res.status(201).json({ message: "Images uploaded successfully" });
    } catch (error) {
      console.error("Error uploading images:", error);
      res.status(500).json({ error: "Error uploading images" });
    }
  },
  addImageUrlByProductId: async (req, res) => {
    const { productId } = req.params;
    const { imageUrl } = req.body;

    try {
      if (!imageUrl) {
        return res.status(400).json({ error: "No image URL provided" });
      }

      await productModel.addImageUrl(productId, imageUrl);

      res.status(201).json({ message: "Image URL added successfully" });
    } catch (error) {
      console.error("Error adding image URL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getProductDetails: async (req, res) => {
    const { productId } = req.params;

    try {
      const productData = await productModel.getProductById(productId);

      if (!productData) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(productData);
    } catch (error) {
      console.error("Error retrieving product details:", error);
      res.status(500).json({ error: "Error retrieving product details" });
    }
  },
  getAllProducts: async (req, res, next) => {
    try {
      const products = await productModel.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error getting all products:", error);
      res.status(500).json({ error: "Internal server error" });
      next(error); // Passing error to error handling middleware
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;

    try {
      // Delete the product
      await productModel.deleteProduct(productId);

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Error deleting product" });
    }
  },
};

module.exports = productController;
