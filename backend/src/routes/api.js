import express from "express";
import { searchProducts, getAllColors } from "../controllers/collectionController.js";
import { signup, login, logout } from "../controllers/authController.js";
import { getProfile, postProfile } from "../controllers/profileController.js";
import { addOrder, apiOrder } from '../controllers/orderController.js';
import { uploadAvatar } from "../middleware/upload.js";
import { orderProductDetail } from "../controllers/productController.js";

const router = express.Router();

//Collection
router.get("/api/collection", searchProducts) // Filter products by query params and Get all products if not have query params
router.get("/api/collection/color", getAllColors) // Get all colors from color table

//Product_detail 
router.get("/api/product/:id", orderProductDetail); // Select color, size to add into the cart

//Authentication
router.post("/api/signup", signup); // Register
router.post("/api/login", login); // Log in
router.post("/api/logout", logout); // Log out

//Tạo mới đơn hàng
router.post("/api/order/:userId", addOrder);
router.patch('/api/order/:userId/update', apiOrder);

// Require User's account is logged in
//Profile
router.get("/api/user/account/profile", getProfile) // Get user's profile information
router.post("/api/user/account/profile", uploadAvatar, postProfile) // Modify user's profile information

export { router }