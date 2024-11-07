import express from "express";
import { passport } from "../config/passportConfig.js";
import { getAllProducts } from "../controllers/productController.js";
import { signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

//GET all Products data
router.get("/api/products", getAllProducts);

//Authentication
router.post("/api/signup", signup); // Register
router.post("/api/login", login); // Log in
router.post("/api/logout", logout); // Log out

export { router }