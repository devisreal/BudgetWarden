import express from "express";
import authorise from "../middleware/auth.middleware.js";
import {
  addBudgetController,
  deleteBudgetController,
  getUserBudgetsController,
  updateBudgetController,
} from "../controllers/budgets.controller.js";

const router = express.Router();

router
  .route("/")
  .get(authorise, getUserBudgetsController)
  .post(authorise, addBudgetController);

router
  .route("/:slug")
  .put(authorise, updateBudgetController)
  .delete(authorise, deleteBudgetController);
export default router;
