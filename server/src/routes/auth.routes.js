import express from "express";
const router = express.Router();
import {
  editProfileController,
  loginController,
  profileController,
  registerController,
} from "../controllers/auth.controller.js";

import authorise from "../middleware/auth.middleware.js";

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/profile", authorise, profileController);

router.get("/validate", authorise, (req, res) => {
  res.json({ isValid: true });
});

router.put("/profile/edit", authorise, editProfileController);

export default router;
