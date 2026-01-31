import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq, desc } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { db } from "./db";
import { sessions, messages } from "./db/schema";

const PORT = process.env.PORT || 3000;

// 1. Setup Express
const app = express();

// 2. Setup Middleware
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// --- API ROUTES ---
app.get("/api/sessions", async (req, res) => {
  const { guestId } = req.query;

  if (!guestId) {
    return res.status(400).json({ error: "Guest ID required" });
  }

  try {
    const userSessions = await db
      .select()
      .from(sessions)
      .where(eq(sessions.guestId, guestId as string))
      .orderBy(desc(sessions.createdAt));

    res.json(userSessions);
  } catch (error) {
    console.error("Error Get Sessions:", error);
    res.status(500).json({ error: "Gagal ambil history" });
  }
});

app.get("/api/sessions/:sessionId", async (req, res) => {
  const { sessionId } = req.params;

  try {
    const chatHistory = await db.select().from(messages).where(eq(messages.sessionId, sessionId)).orderBy(messages.createdAt);

    res.json(chatHistory);
  } catch (error) {
    console.error("Error Get Messages:", error);
    res.status(500).json({ error: "Gagal ambil pesan" });
  }
});

app.post("/api/chat", async (req, res) => {
  const { message, guestId, sessionId } = req.body;

  if (!message || !guestId) {
    return res.status(400).json({ error: "Data tidak lengkap" });
  }

  try {
    let currentSessionId = sessionId;

    if (!currentSessionId) {
      const title = message.substring(0, 30) + "...";
      const [newSession] = await db.insert(sessions).values({ guestId, title }).returning();
      currentSessionId = newSession.id;
    }

    await db.insert(messages).values({
      sessionId: currentSessionId,
      role: "user",
      content: message,
    });

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);
    const aiResponse = result.response.text();

    await db.insert(messages).values({
      sessionId: currentSessionId,
      role: "assistant",
      content: aiResponse,
    });

    res.json({
      sessionId: currentSessionId,
      ai_reply: aiResponse,
    });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI Error" });
  }
});

// --- SERVER START ---
const startServer = async () => {
  try {
    console.log("⏳ Connecting to Database...");
    await db.execute(sql`SELECT 1`);
    console.log("✅ Database Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`
      ################################################
      🚀  SERVER IS RUNNING
      🛡️  URL: http://localhost:${PORT}
      ################################################
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
