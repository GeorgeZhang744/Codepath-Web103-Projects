import { pool } from "./database.js";
import "./dotenv.js";
import eventsData from "../data/eventsData.js";

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;
  
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      startTime VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      image TEXT NOT NULL
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 events table created successfully");
  } catch (err) {
    console.error("⚠️ error creating events table", err);
  }
};

const seedEventsTable = async () => {
  await createEventsTable();

  const insertQuery = `
    INSERT INTO events (id, name, date, startTime, location, image)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  try {
    for (const event of eventsData) {
      const values = [event.id, event.name, event.date, event.startTime, event.location, event.image];

      await pool.query(insertQuery, values);
      console.log(`✅ ${event.name} added successfully`);
    }
  } catch (err) {
    console.error(err);
  }
};

seedEventsTable();
