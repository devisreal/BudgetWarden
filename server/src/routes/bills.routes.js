import express from "express";
import authorise from "../middleware/auth.middleware.js";
import { pool } from "../db/connection.js";
import { validateBillsForm } from "../utils/helpers.js";
const router = express.Router();

router.get("/", authorise, async (req, res) => {
  const user = req.token;
  try {
    const sql = `SELECT * FROM bills WHERE user_id = $1`;
    const { rows } = await pool.query(sql, [user.id]);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't fetch bills" });
  }
});

router.post("/", authorise, async (req, res) => {
  const {
    user_id,
    category_id,
    name,
    amount,
    due_date,
    is_paid = false,
  } = req.body;

  const validationResult = validateBillsForm(req.body);

  if (!validationResult.formIsValid) {
    return res.status(400).json(validationResult.errors);
  }

  try {
    // Check category exists
    const categoryCheck = await pool.query(
      "SELECT 1 FROM categories WHERE id = $1",
      [category_id]
    );

    if (categoryCheck.rows.length === 0) {
      return res.status(400).json({ message: "Category not found" });
    }

    const result = await pool.query(
      `INSERT INTO bills
       (user_id, category_id, name, amount, due_date, is_paid)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, amount, due_date, is_paid, created_at`,
      [user_id, category_id, name, amount, due_date, is_paid]
    );

    res.status(201).json({
      success: true,
      bill: result.rows[0],
      message: `Bill '${result.rows[0].name}' created successfully`,
    });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({
      message: "Failed to create bill",
    });
  }
});

export default router;
