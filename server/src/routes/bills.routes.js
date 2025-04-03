import express from "express";
import authorise from "../middleware/auth.middleware.js";
import {
  addBillController,
  getUserBillsController,
} from "../controllers/bills.controller.js";
const router = express.Router();

router.get("/", authorise, getUserBillsController);

router.post("/", authorise, addBillController);

export default router;
