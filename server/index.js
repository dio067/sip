import "dotenv/config";
import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE"],
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/api/logs/history", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT date, COUNT(*)::int AS glasses
      FROM logs
      WHERE date >= CURRENT_DATE - INTERVAL '6 days'
      GROUP BY date ORDER BY date DESC
    `);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/logs", async (req, res) => {
  try {
    const { date } = req.query;
    const result = await pool.query(
      "SELECT * FROM logs WHERE date = $1 ORDER BY logged_at ASC",
      [date],
    );
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/logs", async (req, res) => {
  try {
    const { date } = req.body;
    const result = await pool.query(
      "INSERT INTO logs (date) VALUES ($1) RETURNING *",
      [date],
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/logs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM logs WHERE id = $1 RETURNING id",
      [id],
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "not found" });
    res.json({ deleted: id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`api on http://localhost:${PORT}`));
