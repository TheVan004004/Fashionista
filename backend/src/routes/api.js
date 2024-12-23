import express from "express";
import uploadImage from "../middleware/upload.js";
import productController from "../controllers/productController.js";
import authController from "../controllers/authController.js";
import profileController from "../controllers/profileController.js";
import productDetailController from "../controllers/productDetailController.js";
import cartController from "../controllers/cartController.js";
import orderController from "../controllers/orderController.js";
import adminController from "../controllers/adminController.js";

const router = express.Router();

//Collection
router.get("/api/collection", productController.apiFilteredProducts); // Filter products by query params and Get all products if not have query params
router.get("/api/collection/color", productController.apiGetAllColors); // Get all colors from color table
router.get("/api/collection/category", productController.apiGetAllCategories); // Get all categories from categories table

//Product_detail 
router.get("/api/product/:id", productDetailController.apiSearchProductDetail); // Select color, size to add into the cart

//Cart
router.post("/api/cart/addProduct", cartController.apiAddCartItem); // Add products into the cart
router.get("/api/cart/", cartController.apiGetAllCartItems); // Show all cart item in cart
router.patch("/api/cart/:item_id/updateCartItem", cartController.apiUpdateCartItem); // Update item in the cart
router.delete("/api/cart/:item_id", cartController.apiDeleteCartItem); // Delete item in the cart 


//Authentication
router.post("/api/signup", authController.apiSignup); // Register
router.post("/api/login", authController.apiLogin); // Log in
router.post("/api/logout", authController.apiLogout); // Log out

//Order
router.post("/api/order", orderController.apiOrder);
router.patch("/api/order/:order_id", orderController.apiUpdateOrder);
router.get("/api/getOrders", orderController.apiGetOrders);
router.get("/api/getOrderInfo/:order_id", orderController.apiGetOrderInfo);

// Require User's account is logged in
//Profile
router.get("/api/user/account/profile", profileController.apiGetProfile); // Get user's profile information
router.post("/api/user/account/profile", profileController.apiPostProfile); // Modify user's profile information

//Admin
router.post("/api/admin/addNewProductDetail", uploadImage, adminController.apiAddNewProductDetail);
router.patch("/api/admin/updateProduct/:product_id", adminController.apiUpdateProduct);
router.patch("/api/admin/updateQuantityProductDetail/:product_details_id", adminController.apiUpdateQuantityProductDetail);
router.get("/api/admin/getInfoBuyTurnUser", adminController.apiGetInfoBuyTurnUser);
router.get("/api/admin/getProductsByMonth", adminController.apiGetProductsByMonth);
router.get("/api/admin/getTotalSalesByMonth", adminController.apiGetTotalSalesByMonth);
router.get("/api/admin/getBuyTurnByMonthOfProduct/:product_id", adminController.apiGetBuyTurnByMonthOfProduct);
router.get("/api/admin/getInfoProduct/:product_id", adminController.apiGetInfoProduct);
router.get("/api/admin/getOrders", adminController.apiGetAllOrders);
router.patch("/api/admin/updateOrderAdmin/:order_id", adminController.apiUpdateOrderAdmin);
router.get("/api/admin/getOrderQuantityByStatus", adminController.apiGetOrderQuantityByStatus);
router.get("/api/admin/getTotalBenefitsByMonth", adminController.apiGetTotalBenefitsByMonth);
router.get("/api/admin/getTotalSoldProductsByCategory", adminController.apiGetTotalSoldProductsByCategory);


export { router }