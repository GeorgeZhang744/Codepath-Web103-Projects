import express from "express";
import { pool } from "../config/database.js";

const shirtsRouter = express.Router();

shirtsRouter.get("/", async (req, res) => {
  const getAllShirtsQuery = `
    SELECT * 
    FROM "custom-shirts" 
    ORDER BY id ASC
  `;

  try {
    const result = await pool.query(getAllShirtsQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

shirtsRouter.get("/:shirtID", async (req, res) => {
  const { shirtID } = req.params;

  const getShirtQuery = `
    SELECT * FROM "custom-shirts" 
    WHERE id = $1
  `;

  const value = [shirtID];

  try {
    const result = await pool.query(getShirtQuery, value);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

shirtsRouter.post("/", async (req, res) => {
  const { name, size, color, design, material } = req.body;

  const createShirtQuery = `
    INSERT INTO "custom-shirts" (name, size, color, design, material)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [name, size, color, design, material];

  try {
    const result = await pool.query(createShirtQuery, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

shirtsRouter.put("/:shirtID", async (req, res) => {
  const { shirtID } = req.params;
  const { name, size, color, design, material } = req.body;

  const updateShirtQuery = `
    UPDATE "custom-shirts" 
    SET name = $1, size = $2, color = $3, design = $4, material = $5
    WHERE id = $6
  `;

  const values = [name, size, color, design, material, shirtID];

  try {
    const result = await pool.query(updateShirtQuery, values);
    res.status(200).json({ success: "Shirt updates successfully!"});
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

shirtsRouter.delete("/:shirtID", async (req, res) => {
  const { shirtID } = req.params;

  const deleteShirtQuery = `
    DELETE FROM "custom-shirts"
    WHERE id = $1
  `;

  const value = [shirtID];

  try {
    const result = await pool.query(deleteShirtQuery, value);
    res.status(200).json({ success: "Shirt deletes successfully!"});
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

export default shirtsRouter;
