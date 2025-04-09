import { pool } from "../db/connection.js";
import { generateSlug, validateBudgetsForm } from "../utils/helpers.js";

export const getUserBudgetsController = async (req, res) => {
  const user = req.token;
  try {
    const sql = `SELECT * FROM budgets WHERE user_id = $1`;
    const { rows } = await pool.query(sql, [user.id]);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't fetch bills" });
  }
};

export const addBudgetController = async (req, res) => {
  const formData = req.body;
  const userId = req.token.id;
  const { category_id, name, amount } = formData;

  const validationResult = validateBudgetsForm(formData);

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
            budgets (user_id, category_id, name, amount, slug)
        VALUES
            ($1, $2, $3, $4, $5)
        RETURNING
            id,
            name,
            user_id,
            category_id,
            amount,
            slug,
            created_at
    `;

    const result = await pool.query(sql, [
      userId,
      category_id,
      name,
      amount,
      formData.slug,
    ]);

    res.status(201).json({
      success: true,
      budget: result.rows[0],
      message: `Budgets '${result.rows[0].name}' created successfully`,
    });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({
      message: "Failed to create bill",
    });
  }
};
export const updateBudgetController = async (req, res) => {
  const budgetSlug = req.params.slug;
  const userId = req.token.id;
  const formData = req.body;
  const { category_id, name, amount } = formData;
  formData.slug = budgetSlug;
  const validationResult = validateBudgetsForm(req.body);

  if (!validationResult.formIsValid) {
    return res.status(400).json(validationResult.errors);
  }

  try {
    const budgetCheck = await pool.query(
      "SELECT * FROM budgets WHERE slug = $1 AND user_id = $2",
      [budgetSlug, userId]
    );

    if (budgetCheck.rows.length === 0) {
      return res.status(404).json({ error: "Budget not found" });
    }

    if (budgetCheck.rows[0].name !== name) {
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
            UPDATE budgets
            SET
                category_id = $1,
                name = $2,
                amount = $3,              
                slug = $4,
                updated_at = CURRENT_TIMESTAMP
            WHERE
                slug = $5
                AND user_id = $6
            RETURNING
                id,
                name,
                amount,
                slug,
                category_id,
                updated_at`;

    const result = await pool.query(sql, [
      category_id,
      name,
      amount,
      formData.slug,
      budgetSlug,
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json({
      success: true,
      bill: result.rows[0],
      message: `Budget '${result.rows[0].name}' edited !`,
    });
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ error: "Failed to update budget" });
  }
};
export const deleteBudgetController = async (req, res) => {
  const budgetSlug = req.params.slug;
  const userId = req.token.id;

  try {
    const budgetCheck = await pool.query(
      "SELECT * FROM budgets WHERE slug = $1 AND user_id = $2",
      [budgetSlug, userId]
    );

    if (budgetCheck.rows.length === 0) {
      return res.status(404).json({ error: "Budgert not found" });
    }

    const sql = `DELETE FROM budgets WHERE budgets.slug = $1 and user_id = $2`;
    const result = await pool.query(sql, [budgetSlug, userId]);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({ error: "Failed to delete budget" });
  }
};
