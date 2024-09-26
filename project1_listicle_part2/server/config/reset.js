import { pool } from "./database.js";
import "./dotenv.js";
import bossData from "../data/bosses";

const createBossesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS bosses;
  
    CREATE TABLE IF NOT EXISTS bosses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      health INT NOT NULL,
      location VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      description TEXT NOT NULL
    )
  `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 bosses table created successfully");
  } catch (err) {
    console.error("⚠️ error creating gifts table", err);
  }
};

const seedBossesTable = async () => {
  await createBossesTable();

  bossData.forEach((boss) => {
    const insertQuery = {
      text: 'INSERT INTO bosses (name, health, location, image, description) VALUES ($1, $2, $3, $4, $5)'
    }

    const values = [
      boss.name,
      boss.health,
      boss.location,
      boss.image,
      boss.description
    ]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting boss", err);
        return;
      }

      console.log(`✅ ${boss.name} added successfully`);
    })
  })
};
