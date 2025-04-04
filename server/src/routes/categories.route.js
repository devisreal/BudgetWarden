import express from "express";
import authorise from "../middleware/auth.middleware.js";
import { getCategories } from "../controllers/categories.controller.js";
const router = express.Router();

router.get("/", authorise, getCategories);

export default router;
