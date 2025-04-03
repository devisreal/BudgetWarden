import express from "express";
import authorise from "../middleware/auth.middleware.js";
import {
  addBillController,
  deleteBillController,
  editBillController,
  getUserBillsController,
} from "../controllers/bills.controller.js";
const router = express.Router();

router.get("/", authorise, getUserBillsController);

router.post("/", authorise, addBillController);

router.put("/:slug", authorise, editBillController);

router.delete("/:slug", authorise, deleteBillController);

export default router;
