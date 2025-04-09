import express from "express";
import authorise from "../middleware/auth.middleware.js";
import { getCategories } from "../controllers/categories.controller.js";
import { pool } from "../db/connection.js";
const router = express.Router();

router.get("/", authorise, getCategories);

router.get("/spend-by-category", authorise, async (req, res) => {
  try {
    const userId = req.token.id; // From authentication middleware

    const result = await pool.query(
      `SELECT 
        c.name AS category,
        SUM(b.amount) AS total_amount
       FROM bills b
       JOIN categories c ON b.category_id = c.id
       WHERE b.user_id = $1 AND b.is_paid = true
       GROUP BY c.name
       ORDER BY total_amount DESC`,
      [userId]
    );

    const grandTotal = result.rows.reduce(
      (sum, row) => sum + Number(row.total_amount),
      0
    );

    const response = {
      grandTotal: grandTotal,
      categories: result.rows.map((row) => ({
        name: row.category,
        amount: Number(row.total_amount),
        percentage:
          grandTotal > 0
            ? Math.round((Number(row.total_amount) / grandTotal) * 100)
            : 0,
      })),
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching spending by category:", error);
    res.status(500).json({ error: "Failed to fetch spending data" });
  }
});

export default router;
