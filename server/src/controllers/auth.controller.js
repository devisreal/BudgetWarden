import bcrypt from "bcrypt";
import "dotenv/config";
import { pool } from "../db/connection.js";
import {
  checkExistingUser,
  generateSlug,
  validateUserForm,
} from "../utils/helpers.js";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 8;

export const registerController = async (req, res) => {
  const data = req.body;
  if (!data.username || !data.email || !data.password) {
    return res
      .status(400)
      .json({ message: "You must provide a username, email and password" });
  }
  data.slug = generateSlug(data.username);
  const client = await pool.connect();

  try {
    const userExists = await checkExistingUser(data.username, data.email);
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "Username or email already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    const query = `INSERT INTO users (username, email, password, slug) VALUES ($1, $2, $3, $4) RETURNING *;`;

    const result = await client.query(query, [
      data.username,
      data.email,
      hashedPassword,
      data.slug,
    ]);
    const token = jwt.sign(
      {
        id: result.rows[0].id,
        sub: result.rows[0].email,
        slug: result.rows[0].slug,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.status(201).json({
      success: true,
      authToken: token,
      message: "Account created successfully!, login to continue",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Couldn't create new user: ${error.message}` });
  } finally {
    client.release();
  }
};

export const loginController = async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password) {
    return res
      .status(400)
      .json({ message: "You must provide an email and password" });
  }

  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(query, [req.body.email]);

    if (rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = rows[0];

    const result = await bcrypt.compare(data.password, user.password);
    if (!result) {
      return res
        .status(403)
        .json({ message: "Username/Password combination is incorrect" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        sub: user.email,
        slug: user.slug,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ success: true, message: "Welcome back!", authToken: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const profileController = async (req, res) => {
  try {
    const sql = `SELECT * FROM users WHERE id = $1`;

    const { rows } = await pool.query(sql, [req.token.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, created_at, updated_at, ...user } = rows[0];

    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't fetch user profile" });
  }
};

export const editProfileController = async (req, res) => {
  const formData = req.body;
  const user = req.token;
  const { first_name, last_name, username, email, currency, income } = formData;
  formData.slug = user.slug;
  const validationResult = validateUserForm(formData);

  if (!validationResult.formIsValid) {
    return res.status(400).json(validationResult.errors);
  }

  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [
      user.id,
    ]);

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userCheck.rows[0].username !== username) {
      formData.slug = generateSlug(username);
    }

    const sql = `
            UPDATE users
            SET
                id = $1,
                first_name = $2,
                last_name = $3,
                username = $4,
                email = $5,
                currency = $6,
                income = $7,
                slug = $8,
                updated_at = CURRENT_TIMESTAMP
            WHERE
              id = $9
            RETURNING
                id,
                first_name,
                last_name,
                email,
                username,
                currency,
                income,
                slug,
                updated_at`;

    const result = await pool.query(sql, [
      user.id,
      first_name,
      last_name,
      username,
      email,
      currency,
      income,
      formData.slug,
      user.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      bill: result.rows[0],
      message: `User '${result.rows[0].username}' edited !`,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};
