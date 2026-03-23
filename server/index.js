import "dotenv/config";
import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/logs", async (req, res) => {
  const { date } = req.query;
  const result = await pool.query(
    "SELECT * FROM logs WHERE date = $1 ORDER BY logged_at ASC",
    [date],
  );
  res.json(result.rows);
});

app.listen(PORT, () => {
  console.log(`api on http://localhost:${PORT}`);
});

app.post("/api/logs", async (req, res) => {
  const { date } = req.body;
  const result = await pool.query(
    "INSERT INTO logs (date) VALUES ($1) RETURNING *",
    [date],
  );
  res.status(201).json(result.rows[0]);
});
