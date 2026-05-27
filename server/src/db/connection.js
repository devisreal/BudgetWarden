import "dotenv/config";
import pg from "pg";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, DATABASE_URL } = process.env;

const pool = new pg.Pool({
  // host: PGHOST,
  // database: PGDATABASE,
  // user: PGUSER,
  // password: PGPASSWORD,
  // port: 5432,
  connectionString: DATABASE_URL,
});

export { pool };
