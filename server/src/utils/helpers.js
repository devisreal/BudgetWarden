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
    errors["name"] = "Bill name is required";
  }
  if (!data.category_id) {
    formIsValid = false;
    errors["category_id"] = "Category is required";
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

export function validateUserForm(data) {
  let formIsValid = true;
  const errors = {};

  if (!data.first_name) {
    formIsValid = false;
    errors["first_name"] = "First name is required";
  }
  if (!data.last_name) {
    formIsValid = false;
    errors["last_name"] = "Last name is required";
  }
  if (!data.username) {
    formIsValid = false;
    errors["username"] = "Username is required";
  }
  if (!data.email) {
    formIsValid = false;
    errors["email"] = "Email address is required";
  }
  if (!data.currency) {
    formIsValid = false;
    errors["currency"] = "Currency is required";
  }
  if (!data.income) {
    formIsValid = false;
    errors["income"] = "Income is required";
  }

  return { formIsValid, data, errors };
}

export function validateSubscriptionsForm(data) {
  let formIsValid = true;
  const errors = {};

  if (!data.name) {
    formIsValid = false;
    errors["name"] = "Subscription name is required";
  }
  if (!data.category_id) {
    formIsValid = false;
    errors["category_id"] = "Category is required";
  }
  if (!data.cost) {
    formIsValid = false;
    errors["cost"] = "Cost is required";
  }
  if (!data.billing_cycle) {
    formIsValid = false;
    errors["billing_cycle"] = "Cost is required";
  }
  if (!data.renewal_date) {
    formIsValid = false;
    errors["renewal_date"] = "Renewal Date is required";
  } else {
    const date = new Date(data.renewal_date);
    if (isNaN(date.getTime())) {
      formIsValid = false;
      errors["renewal_date"] = "Please enter a valid date";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        formIsValid = false;
        errors["renewal_date"] = "Renewal date cannot be in the past";
      }
    }
  }

  return { formIsValid, data, errors };
}

export function validateBudgetsForm(data) {
  let formIsValid = true;
  const errors = {};

  if (!data.name) {
    formIsValid = false;
    errors["name"] = "Budget name is required";
  }
  if (!data.category_id) {
    formIsValid = false;
    errors["category_id"] = "Category is required";
  }
  if (!data.amount) {
    formIsValid = false;
    errors["amount"] = "Amount is required";
  }

  return { formIsValid, data, errors };
}
