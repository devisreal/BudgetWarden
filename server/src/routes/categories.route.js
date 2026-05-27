import express from "express";
import authorise from "../middleware/auth.middleware.js";
import {
  getCategories,
  getCategorySpend,
} from "../controllers/categories.controller.js";
const router = express.Router();

router.get("/", authorise, getCategories);

router.get("/spend-by-category", authorise, getCategorySpend);

export default router;
