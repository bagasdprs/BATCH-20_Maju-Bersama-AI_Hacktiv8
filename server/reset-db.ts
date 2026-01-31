import dotenv from "dotenv";
dotenv.config();

import { sql } from "drizzle-orm";
import { db } from "./src/db";

async function reset() {
  console.log("🗑️  Sedang membersihkan database lama...");

  try {
    // 1. Hapus tabel messages (pakai CASCADE biar maksa)
    await db.execute(sql`DROP TABLE IF EXISTS "messages" CASCADE`);
    console.log("✅ Tabel 'messages' terhapus.");

    // 2. Hapus tabel chats (yang bikin error)
    await db.execute(sql`DROP TABLE IF EXISTS "chats" CASCADE`);
    console.log("✅ Tabel 'chats' terhapus.");

    // 3. Hapus tabel sessions (biar bersih sekalian)
    await db.execute(sql`DROP TABLE IF EXISTS "sessions" CASCADE`);
    console.log("✅ Tabel 'sessions' terhapus.");

    console.log("\n✨ Database bersih kinclong! Sekarang jalankan 'npm run db:push'");
    process.exit(0);
  } catch (err) {
    console.error("❌ Gagal reset:", err);
    process.exit(1);
  }
}

reset();
