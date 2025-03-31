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
