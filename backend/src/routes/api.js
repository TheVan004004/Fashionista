import express from "express";
import { searchProducts, getAllColors } from "../controllers/collectionController.js";
import { signup, login, logout } from "../controllers/authController.js";
import { getProfile, postProfile } from "../controllers/profileController.js";
import { uploadAvatar } from "../middleware/upload.js";
import { searchProductDetail } from "../controllers/productController.js";
import { addCartItem, getAllCartItems, updateCartItem, deleteCartItem } from "../controllers/cartController.js";
import { apiOrder } from "../controllers/orderController.js";

const router = express.Router();

//Collection
router.get("/api/collection", searchProducts) // Filter products by query params and Get all products if not have query params
router.get("/api/collection/color", getAllColors) // Get all colors from color table

//Product_detail 
router.get("/api/product/:id", searchProductDetail); // Select color, size to add into the cart

//Cart
router.post("/api/cart/:user_id/addProduct", addCartItem); // Add products into the cart
router.get("/api/cart/:user_id", getAllCartItems) // Show all cart item in cart
router.patch("/api/cart/:item_id/updateCartItem", updateCartItem) // Update item in the cart
router.delete("/api/cart/:item_id", deleteCartItem) // Delete item in the cart 


//Authentication
router.post("/api/signup", signup); // Register
router.post("/api/login", login); // Log in
router.post("/api/logout", logout); // Log out

//Order
router.post("/api/order/:user_id", apiOrder);

// Require User's account is logged in
//Profile
router.get("/api/user/account/profile", getProfile) // Get user's profile information
router.post("/api/user/account/profile", uploadAvatar, postProfile) // Modify user's profile information

export { router }