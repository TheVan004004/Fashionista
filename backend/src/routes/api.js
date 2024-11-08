import express from "express";
import { getAllProducts } from "../controllers/productController.js";
import { signup, login, logout } from "../controllers/authController.js";
import { getProfile, postProfile } from "../controllers/profileController.js";
import { uploadAvatar } from "../middleware/upload.js";

const router = express.Router();

//GET all Products data
router.get("/api/products", getAllProducts);

//Authentication
router.post("/api/signup", signup); // Register
router.post("/api/login", login); // Log in
router.post("/api/logout", logout); // Log out

// Require User's account is logged in
//Profile
router.get("/api/user/account/profile", getProfile) // Get user's profile information
router.post("/api/user/account/profile", uploadAvatar, postProfile) // Modify user's profile information

export { router }