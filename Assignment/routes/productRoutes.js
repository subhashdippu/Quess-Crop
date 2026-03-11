import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createProduct) // Create product
  .get(protect, getProducts); // Get all products

router
  .route("/:id")
  .put(protect, updateProduct) // Edit product
  .delete(protect, deleteProduct); // Delete product

export default router;
