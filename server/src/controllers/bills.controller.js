import { pool } from "../db/connection.js";
import { generateSlug, validateBillsForm } from "../utils/helpers.js";

export const getUserBillsController = async (req, res) => {
  const user = req.token;
  try {
    const sql = `SELECT * FROM bills WHERE user_id = $1`;
    const { rows } = await pool.query(sql, [user.id]);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't fetch bills" });
  }
};

export const addBillController = async (req, res) => {
  const formData = req.body;
  const {
    user_id,
    category_id,
    name,
    amount,
    due_date,
    is_paid = false,
  } = formData;

  const validationResult = validateBillsForm(formData);

  if (!validationResult.formIsValid) {
    return res.status(400).json(validationResult.errors);
  }

  formData.slug = generateSlug(formData.name);

  try {
    const categoryCheck = await pool.query(
      "SELECT 1 FROM categories WHERE id = $1",
      [category_id]
    );

    if (categoryCheck.rows.length === 0) {
      return res.status(400).json({ message: "Category not found" });
    }

    const result = await pool.query(
      `INSERT INTO bills
         (user_id, category_id, name, amount, due_date, is_paid, slug)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, name, amount, due_date, is_paid, slug, created_at`,
      [user_id, category_id, name, amount, due_date, is_paid, formData.slug]
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
};
