import express from "express";
import { pool } from "../config/database.js";

const optionsRouter = express.Router();

optionsRouter.get("/", async (req, res) => {
  const getSizesQuery = `
    SELECT size
    FROM "size-options"
  `;

  const getColorsQuery = `
    SELECT color
    FROM "color-options"
  `;

  const getDesignsQuery = `
    SELECT design, price
    FROM "design-options"
    ORDER BY price ASC
  `;

  const getMaterialsQuery = `
    SELECT material, price
    FROM "material-options"
    ORDER BY price ASC
  `;

  try {
    const sizeResult = await pool.query(getSizesQuery);
    const colorResult = await pool.query(getColorsQuery);
    const designResult = await pool.query(getDesignsQuery);
    const materialResult = await pool.query(getMaterialsQuery);
    res.status(200).json({
      sizeOptions: sizeResult.rows,
      colorOptions: colorResult.rows,
      designOptions: designResult.rows,
      materialOptions: materialResult.rows,
    });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

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
