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
  const userId = req.token.id;
  const { category_id, name, amount, due_date, is_paid = false } = formData;

  const validationResult = validateBillsForm(formData);

  if (!validationResult.formIsValid) {
    return res.status(400).json(validationResult.errors);
  }

  formData.slug = generateSlug(formData.name);

  try {
    const categoryCheck = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [category_id]
    );

    if (categoryCheck.rows.length === 0) {
      return res.status(400).json({ message: "Category not found" });
    }

    const sql = `
        INSERT INTO
            bills (user_id, category_id, name, amount, due_date, is_paid, slug)
        VALUES
            ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
            id,
            name,
            amount,
            due_date,
            is_paid,
            slug,
            created_at
    `;

    const result = await pool.query(sql, [
      userId,
      category_id,
      name,
      amount,
      due_date,
      is_paid,
      formData.slug,
    ]);

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

export const updateBillController = async (req, res) => {
  const billSlug = req.params.slug;
  const userId = req.token.id;
  const formData = req.body;
  const { category_id, name, amount, due_date, is_paid } = formData;
  formData.slug = billSlug;
  const validationResult = validateBillsForm(req.body);

  if (!validationResult.formIsValid) {
    return res.status(400).json(validationResult.errors);
  }

  try {
    const billCheck = await pool.query(
      "SELECT * FROM bills WHERE slug = $1 AND user_id = $2",
      [billSlug, userId]
    );

    if (billCheck.rows.length === 0) {
      return res.status(404).json({ error: "Bill not found" });
    }

    if (billCheck.rows[0].name !== name) {
      formData.slug = generateSlug(formData.name);
    }

    const categoryCheck = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [category_id]
    );

    if (categoryCheck.rows.length === 0) {
      return res.status(400).json({ message: "Category not found" });
    }

    const sql = `
            UPDATE bills
            SET
                category_id = $1,
                name = $2,
                amount = $3,
                due_date = $4,
                is_paid = $5,
                slug = $6,
                updated_at = CURRENT_TIMESTAMP
            WHERE
                slug = $7
                AND user_id = $8
            RETURNING
                id,
                name,
                amount,
                due_date,
                is_paid,
                slug,
                category_id,
                updated_at`;

    const result = await pool.query(sql, [
      category_id,
      name,
      amount,
      due_date,
      is_paid,
      formData.slug,
      billSlug,
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bill not found" });
    }

    res.json({
      success: true,
      bill: result.rows[0],
      message: `Bill '${result.rows[0].name}' edited !`,
    });
  } catch (error) {
    console.error("Error updating bill:", error);
    res.status(500).json({ error: "Failed to update bill" });
  }
};

export const deleteBillController = async (req, res) => {
  const billSlug = req.params.slug;
  const userId = req.token.id;

  try {
    const billCheck = await pool.query(
      "SELECT * FROM bills WHERE slug = $1 AND user_id = $2",
      [billSlug, userId]
    );

    if (billCheck.rows.length === 0) {
      return res.status(404).json({ error: "Bill not found" });
    }

    const sql = `DELETE FROM bills WHERE bills.slug = $1 and user_id = $2`;
    const result = await pool.query(sql, [billSlug, userId]);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting bill:", error);
    res.status(500).json({ error: "Failed to delete bill" });
  }
};
