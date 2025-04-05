import express from "express";
import authorise from "../middleware/auth.middleware.js";
import {
  addBillController,
  deleteBillController,
  updateBillController,
  getUserBillsController,
} from "../controllers/bills.controller.js";
const router = express.Router();

router
  .route("/")
  .get(authorise, getUserBillsController)
  .post(authorise, addBillController);

router
  .route("/:slug")
  .put(authorise, updateBillController)
  .delete(authorise, deleteBillController);

export default router;
