import express from "express";
import authorise from "../middleware/auth.middleware.js";
import {
  addSubscriptionController,
  deleteSubscriptionController,
  getUserSubscriptionsController,
  updateSubscriptionController,
} from "../controllers/subscriptions.controller.js";

const router = express.Router();

router
  .route("/")
  .get(authorise, getUserSubscriptionsController)
  .post(authorise, addSubscriptionController);

router
  .route("/:slug")
  .put(authorise, updateSubscriptionController)
  .delete(authorise, deleteSubscriptionController);

export default router;
