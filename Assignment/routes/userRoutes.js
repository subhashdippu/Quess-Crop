import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createUser) // Create User
  .get(protect, getUsers); // Get All Users

router
  .route("/:id")
  .put(protect, updateUser) // Edit User
  .delete(protect, deleteUser); // Delete User

export default router;
