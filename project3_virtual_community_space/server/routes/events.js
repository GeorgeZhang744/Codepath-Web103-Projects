import express from "express";
import { pool } from "../config/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const getAllEventsQuery = `
    SELECT * FROM events ORDER BY id ASC
  `;

  try {
    const result = await pool.query(getAllEventsQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

router.get("/:eventID", async (req, res) => {
  const eventID = req.params.eventID;

  const getEventQuery = `
    SELECT * FROM events WHERE id = $1
  `;

  const value = [eventID]

  try {
    const result = await pool.query(getEventQuery, value);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

router.get("/location/:eventLocation", async (req, res) => {
  const eventLocation = req.params.eventLocation;

  const getEventsByLocationQuery = `
    SELECT * FROM events WHERE location = $1
  `;

  const value = [eventLocation];

  try {
    const result = await pool.query(getEventsByLocationQuery, value);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

export default router;
