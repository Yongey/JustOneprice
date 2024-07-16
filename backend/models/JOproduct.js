/* eslint-disable no-console */
// productModel.js

const pool = require("../database");

const productModel = {
  insertProduct: async (name, description, price, quantity, category) => {
    try {
      const result = await pool.query(
        "INSERT INTO joproducts (name, description, price, quantity, category, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING product_id",
        [name, description, price, quantity, category]
      );
      return result.rows[0].product_id;
    } catch (error) {
      console.error("Error inserting product:", error);
      throw error;
    }
  },

  insertImage: async (productId, imageUrlOrFile) => {
    try {
      if (
        typeof imageUrlOrFile === "string" &&
        imageUrlOrFile.startsWith("http")
      ) {
        await pool.query(
          "INSERT INTO joimage (product_id, image_url, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP)",
          [productId, imageUrlOrFile]
        );
      } else {
        const imageUrl = `/uploads/${imageUrlOrFile.filename}`;
        await pool.query(
          "INSERT INTO joimage (product_id, image_url, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP)",
          [productId, imageUrl]
        );
      }
    } catch (error) {
      console.error("Error inserting image:", error);
      throw error;
    }
  },
  deleteProduct: async (productId) => {
    try {
      // Delete product images first (assuming a table joimage exists for images associated with products)
      await pool.query("DELETE FROM joimage WHERE product_id = $1", [
        productId,
      ]);

      // Then delete the product itself
      const result = await pool.query(
        "DELETE FROM joproducts WHERE product_id = $1 RETURNING product_id",
        [productId]
      );

      if (result.rows.length === 0) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      return result.rows[0].product_id;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
  getProductById: async (productId) => {
    try {
      const productResult = await pool.query(
        "SELECT * FROM joproducts WHERE product_id = $1",
        [productId]
      );

      if (productResult.rows.length === 0) {
        return null;
      }

      const imagesResult = await pool.query(
        "SELECT * FROM joimage WHERE product_id = $1",
        [productId]
      );

      const product = productResult.rows[0];
      const images = imagesResult.rows;

      return { product, images };
    } catch (error) {
      console.error("Error retrieving product:", error);
      throw error;
    }
  },
  getAllProducts: async () => {
    try {
      const productsResult = await pool.query(`
        SELECT p.*, json_agg(json_build_object('image_id', i.image_id, 'image_url', i.image_url)) AS images
        FROM joproducts p
        LEFT JOIN joimage i ON p.product_id = i.product_id
        GROUP BY p.product_id
      `);
      return productsResult.rows;
    } catch (error) {
      console.error("Error retrieving all products:", error);
      throw error;
    }
  },
  addImageUrl: async (productId, imageUrl) => {
    try {
      await pool.query(
        "INSERT INTO joimage (product_id, image_url, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP)",
        [productId, imageUrl]
      );
    } catch (error) {
      console.error("Error inserting image URL:", error);
      throw error;
    }
  },
};

module.exports = productModel;
