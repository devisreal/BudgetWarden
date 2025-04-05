import { pool } from "../db/connection.js";
import { generateSlug, validateSubscriptionsForm } from "../utils/helpers.js";

export const getUserSubscriptionsController = async (req, res) => {
  const user = req.token;
  try {
    const sql = `SELECT * FROM subscriptions WHERE user_id = $1`;
    const { rows } = await pool.query(sql, [user.id]);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't fetch bills" });
  }
};

export const addSubscriptionController = async (req, res) => {
  const formData = req.body;
  const userId = req.token.id;

  const {
    category_id,
    name,
    cost,
    billing_cycle,
    renewal_date,
    is_active = true,
  } = formData;

  const validationResult = validateSubscriptionsForm(formData);
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
            subscriptions (user_id, category_id, name, cost, billing_cycle, renewal_date, is_active, slug)
        VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING
            id,
            name,
            cost,
            category_id,
            user_id,
            billing_cycle,
            renewal_date,
            is_active,
            slug,
            created_at
    `;
    const result = await pool.query(sql, [
      userId,
      category_id,
      name,
      cost,
      billing_cycle,
      renewal_date,
      is_active,
      formData.slug,
    ]);

    res.status(201).json({
      success: true,
      bill: result.rows[0],
      message: `Subscription '${result.rows[0].name}' added successfully`,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({
      message: "Failed to create subscription",
    });
  }
};

export const updateSubscriptionController = async (req, res) => {
  const subscriptionSlug = req.params.slug;
  const userId = req.token.id;
  const formData = req.body;
  const {
    category_id,
    name,
    cost,
    billing_cycle,
    renewal_date,
    is_active = true,
  } = formData;
  formData.slug = subscriptionSlug;
  const validationResult = validateSubscriptionsForm(req.body);

  if (!validationResult.formIsValid) {
    return res.status(400).json(validationResult.errors);
  }

  try {
    const subscriptionCheck = await pool.query(
      "SELECT * FROM subscriptions WHERE slug = $1 AND user_id = $2",
      [subscriptionSlug, userId]
    );

    if (subscriptionCheck.rows.length === 0) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    if (subscriptionCheck.rows[0].name !== name) {
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
              UPDATE subscriptions
              SET
                  category_id = $1,
                  name = $2,
                  cost = $3,
                  billing_cycle = $4,
                  renewal_date = $5,
                  is_active = $6,
                  slug = $7,
                  updated_at = CURRENT_TIMESTAMP
              WHERE
                  slug = $8
                  AND user_id = $9
              RETURNING
                  id,
                  name,
                  cost,
                  category_id,
                  user_id,
                  billing_cycle,
                  renewal_date,
                  is_active,
                  slug,
                  created_at`;

    const result = await pool.query(sql, [
      category_id,
      name,
      cost,
      billing_cycle,
      renewal_date,
      is_active,
      formData.slug,
      subscriptionSlug,
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.json({
      success: true,
      bill: result.rows[0],
      message: `Subscription '${result.rows[0].name}' edited !`,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).json({ error: "Failed to update subscription" });
  }
};

export const deleteSubscriptionController = async (req, res) => {
  const subscriptionSlug = req.params.slug;
  const userId = req.token.id;

  try {
    const billCheck = await pool.query(
      "SELECT * FROM subscriptions WHERE slug = $1 AND user_id = $2",
      [subscriptionSlug, userId]
    );

    if (billCheck.rows.length === 0) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    const sql = `DELETE FROM subscriptions WHERE subscriptions.slug = $1 and user_id = $2`;
    const result = await pool.query(sql, [subscriptionSlug, userId]);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting subscriptions:", error);
    res.status(500).json({ error: "Failed to delete subscriptions" });
  }
};
