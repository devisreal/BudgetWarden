import express from "express";
import authorise from "../middleware/auth.middleware.js";
import { pool } from "../db/connection.js";
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

export default router;
