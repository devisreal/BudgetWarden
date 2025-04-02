import express from "express";
import authorise from "../middleware/auth.middleware.js";
import { pool } from "../db/connection.js";
const router = express.Router();

router.get("/", authorise, async (req, res) => {
  try {
    const sql = `SELECT * FROM categories`;
    const { rows } = await pool.query(sql);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't fetch categories" });
  }
});

export default router;
