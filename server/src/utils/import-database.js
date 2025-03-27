import { pool } from "../db/connection.js";
import fs from "fs";

try {
  const sql = fs.readFileSync("./sql/database.sql", "utf8");
  await pool.query(sql);

  console.log("Database imported successfully");
} catch (error) {
  console.error(`Database import failed: ${error}`);
} finally {
  await pool.end();
}

process.exit();
