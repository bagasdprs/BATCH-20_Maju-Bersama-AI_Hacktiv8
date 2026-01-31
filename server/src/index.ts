import dotenv from "dotenv";
dotenv.config();

// --- (DEBUGGING) ---
const key = process.env.GOOGLE_API_KEY || "";
console.log("\n🕵️‍♂️ DEBUGGING ENV:");
console.log(`1. Mentah: '${key}'`); // Pake petik biar keliatan spasi
console.log(`2. Panjang: ${key.length} karakter`);
console.log(`3. JSON String: ${JSON.stringify(key)}`); // Liat karakter tersembunyi
console.log("-----------------------\n");

import app from "./app";
import { sql } from "drizzle-orm";
import { env } from "./config/env";
import { db } from "./db";

const PORT = env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("⏳ Connecting to Database...");
    await db.execute(sql`SELECT 1`);
    console.log("✅ Database Connected Successfully!");

    const server = app.listen(PORT, () => {
      console.log(`
      ################################################
      🛡️  Server listening on port: ${PORT} 🛡️
      🌍  Environment: ${env.NODE_ENV}
      🗄️  Database: Connected
      🧠  AI Service: Ready
      ################################################
      `);
    });

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.log("Server closed");
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error: Error) => {
      console.error("🔥 Unexpected Error:", error);
      exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);
  } catch (error) {
    console.error("❌ Failed to start server. Error:", error);
    process.exit(1);
  }
};

startServer();
