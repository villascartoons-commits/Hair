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

// ✅ Initialize database
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

  // ✅ Health check
  app.get("/api/health", (_, res) => {
    res.json({ status: "ok" });
  });

  // ✅ Get bookings
  app.get("/api/bookings", (_, res) => {
    try {
      const bookings = db
        .prepare("SELECT * FROM bookings ORDER BY createdAt DESC")
        .all();
      res.json(bookings);
    } catch {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // ✅ Create booking
  app.post("/api/bookings", (req, res) => {
    const { id, name, phone, serviceId, date, time, notes, status, createdAt } =
      req.body;

    try {
      const stmt = db.prepare(`
        INSERT INTO bookings
        (id, name, phone, serviceId, date, time, notes, status, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        id,
        name,
        phone,
        serviceId,
        date,
        time,
        notes,
        status,
        createdAt
      );

      res.status(201).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save booking" });
    }
  });

  // ✅ Update booking
  app.patch("/api/bookings/:id", (req, res) => {
    try {
      db.prepare("UPDATE bookings SET status=? WHERE id=?").run(
        req.body.status,
        req.params.id
      );

      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  // ✅ Delete booking
  app.delete("/api/bookings/:id", (req, res) => {
    try {
      const result = db
        .prepare("DELETE FROM bookings WHERE id=?")
        .run(req.params.id);

      res.json({ success: true, changes: result.changes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });

  // ✅ Detect production
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.RENDER === "true";

  // ===============================
  // ✅ DEVELOPMENT (local)
  // ===============================
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);
  }

  // ===============================
  // ✅ PRODUCTION (Render)
  // ===============================
  else {
    const distPath = path.resolve("dist");

    app.use(express.static(distPath));

    app.get("*", (_, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

startServer();
