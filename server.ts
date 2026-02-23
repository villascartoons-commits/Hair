import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("bookings.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    serviceId TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    createdAt TEXT NOT NULL
  )
`);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Routes
  app.get("/api/bookings", (req, res) => {
    try {
      const bookings = db.prepare("SELECT * FROM bookings ORDER BY createdAt DESC").all();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", (req, res) => {
    const { id, name, phone, serviceId, date, time, notes, status, createdAt } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO bookings (id, name, phone, serviceId, date, time, notes, status, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(id, name, phone, serviceId, date, time, notes, status, createdAt);
      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save booking" });
    }
  });

  app.patch("/api/bookings/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const stmt = db.prepare("UPDATE bookings SET status = ? WHERE id = ?");
      stmt.run(status, id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  app.delete("/api/bookings/:id", (req, res) => {
    const { id } = req.params;
    console.log(`Attempting to delete booking with ID: ${id}`);
    try {
      const stmt = db.prepare("DELETE FROM bookings WHERE id = ?");
      const result = stmt.run(id);
      console.log(`Delete result:`, result);
      res.json({ success: true, changes: result.changes });
    } catch (error) {
      console.error(`Delete error:`, error);
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });

  // Vite middleware for development
  const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER === "true";

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = __dirname;
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      console.warn("Warning: 'dist' folder not found. Please run 'npm run build' first.");
      app.get("*", (req, res) => {
        res.status(500).send("Application not built. Please run 'npm run build' first.");
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
