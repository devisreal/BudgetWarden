import express from "express";
const router = express.Router();
import {
  loginController,
  profileController,
  registerController,
} from "../controllers/auth.controller.js";

import authorise from "../middleware/auth.middleware.js";

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/profile", authorise, profileController);

export default router;
