import slugify from "slugify";
import { pool } from "../db/connection.js";

export function generateSlug(text) {
  return (
    slugify(text, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    }) +
    "-" +
    Math.random().toString(36).substring(2, 4)
  );
}

export async function checkExistingUser(username, email) {
  try {
    const query = `
        SELECT EXISTS(
          SELECT 1 FROM users 
          WHERE username = $1 OR email = $2
        ) AS "exists";
      `;
    const result = await pool.query(query, [username, email]);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw error;
  }
}

export function validateBillsForm(data) {
  let formIsValid = true;
  const errors = {};

  if (!data.name) {
    formIsValid = false;
    errors["name"] = "Name is required";
  }
  if (!data.category_id) {
    formIsValid = false;
    errors["category_id"] = "Category ID is required";
  }
  if (!data.amount) {
    formIsValid = false;
    errors["amount"] = "Amount is required";
  }
  if (!data.due_date) {
    formIsValid = false;
    errors["due_date"] = "Due Date is required";
  } else {
    const date = new Date(data.due_date);
    if (isNaN(date.getTime())) {
      formIsValid = false;
      errors["due_date"] = "Please enter a valid date";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        formIsValid = false;
        errors["due_date"] = "Due date cannot be in the past";
      }
    }
  }

  return { formIsValid, data, errors };
}
