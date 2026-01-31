import { eq } from "drizzle-orm";
import { db } from "../db";
import { chats, messages } from "../db/schema";

export const createChatSession = async (title: string) => {
  const result = await db
    .insert(chats)
    .values({
      title: title,
      userId: "user-anonymous",
    })
    .returning();
  return result[0];
};

export const saveMessage = async (chatId: string, role: "user" | "assistant", content: string) => {
  const result = await db
    .insert(messages)
    .values({
      chatId,
      role,
      content,
    })
    .returning();
  return result[0];
};

export const getChatHistory = async (chatId: string) => {
  return await db.select().from(messages).where(eq(messages.chatId, chatId)).orderBy(messages.createdAt);
};
