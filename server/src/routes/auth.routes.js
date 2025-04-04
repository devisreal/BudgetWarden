import express from "express";
const router = express.Router();
import {
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

router.put("/profile/edit", authorise, async (req, res) => {
  const formData = req.body;
  const user = req.token;
  const { first_name, last_name, username, email, currency, income } = formData;
  formData.slug = user.slug;
  const validationResult = validateUserForm(formData);

  if (!validationResult.formIsValid) {
    return res.status(400).json(validationResult.errors);
  }

  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [
      user.id,
    ]);

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userCheck.rows[0].username !== username) {
      formData.slug = generateSlug(username);
      console.log(formData.slug);
    }

    const sql = `
            UPDATE users
            SET
                id = $1,
                first_name = $2,
                last_name = $3,
                username = $4,
                email = $5,
                currency = $6,
                income = $7,
                slug = $8,
                updated_at = CURRENT_TIMESTAMP
            WHERE
              id = $9
            RETURNING
                id,
                first_name,
                last_name,
                email,
                username,
                currency,
                income,
                slug,
                updated_at`;

    const result = await pool.query(sql, [
      user.id,
      first_name,
      last_name,
      username,
      email,
      currency,
      income,
      formData.slug,
      user.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      bill: result.rows[0],
      message: `User '${result.rows[0].username}' edited !`,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

export default router;
