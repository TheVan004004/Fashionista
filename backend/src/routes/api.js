import express from "express";
import { getAllProducts } from "../controllers/productController.js";

const router = express.Router();

//GET all Products data
router.get("/api/products", getAllProducts);

export { router }