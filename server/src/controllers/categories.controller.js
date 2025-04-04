import { pool } from "../db/connection.js";

export const getCategories = async (_req, res) => {
  try {
    const sql = `SELECT * FROM categories`;
    const { rows } = await pool.query(sql);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't fetch categories" });
  }
};
