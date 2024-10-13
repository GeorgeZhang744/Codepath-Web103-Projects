import express from "express";
import { pool } from "../config/database.js";

const optionsRouter = express.Router();

optionsRouter.get("/sizes", async (req, res) => {
  const getSizesQuery = `
    SELECT size
    FROM "size-options"
  `;

  try {
    const result = await pool.query(getSizesQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

optionsRouter.get("/colors", async (req, res) => {
  const getColorsQuery = `
    SELECT color
    FROM "color-options"
  `;

  try {
    const result = await pool.query(getColorsQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

optionsRouter.get("/designs", async (req, res) => {
  const getDesignsQuery = `
    SELECT design, price
    FROM "design-options"
  `;

  try {
    const result = await pool.query(getDesignsQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

optionsRouter.get("/materials", async (req, res) => {
  const getMaterialsQuery = `
    SELECT material, price
    FROM "material-options"
  `;

  try {
    const result = await pool.query(getMaterialsQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

export default optionsRouter;
