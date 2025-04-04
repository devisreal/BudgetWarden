import express from "express";
const router = express.Router();
import {
  editProfileController,
  loginController,
  profileController,
  registerController,
} from "../controllers/auth.controller.js";

import authorise from "../middleware/auth.middleware.js";
import {
  checkExistingUser,
  generateSlug,
  validateUserForm,
} from "../utils/helpers.js";
import { pool } from "../db/connection.js";

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/profile", authorise, profileController);

router.get("/validate", authorise, (req, res) => {
  res.json({ isValid: true }); // Only reaches here if token is valid
});

router.put("/profile/edit", authorise, editProfileController);

export default router;
