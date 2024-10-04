import pg from "pg";
import "./dotenv.js";

const config = {
  connectionString: process.env.CONNECTION_URL,
};

export const pool = new pg.Pool(config);
