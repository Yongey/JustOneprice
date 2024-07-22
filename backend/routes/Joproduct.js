const express = require("express");

const router = express.Router();
const productController = require("../controllers/JOproducts");
const upload = require("../middlewares/upload"); // Assuming you have middleware for file upload

// Route to insert a new product
router.post("/products", productController.insertProduct);

// Route to upload images for a specific product
router.post(
  "/products/:productId/images",
  upload.array("images"),
  productController.uploadImages
);
router.delete("/products/:productId", productController.deleteProduct);
router.post(
  "/products-with-image",
  upload.array("images"),
  productController.insertProduct
);
router.post(
  "/products/:productId/addImageUrl",
  productController.addImageUrlByProductId
);
router.put("/products/:productId", productController.updateProduct);
// Route to get details of a specific product
router.get("/products/:productId", productController.getProductDetails);
router.get("/products", productController.getAllProducts);
router.put("/products/:productId", productController.updateProduct);
router.get(
  "/product/:productId/images",
  productController.getProductImagesByProductId
);
router.delete(
  "/products/:productId/deleteImages",
  productController.deleteImagesByProductId
);
module.exports = router;
