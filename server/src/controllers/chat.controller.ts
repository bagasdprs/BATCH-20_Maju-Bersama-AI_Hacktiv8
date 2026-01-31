import { Request, Response } from "express";
import { z } from "zod";
import { generateAIResponse } from "../services/ai.service";
import { createChatSession, saveMessage } from "../services/chat.service";

const chatSchema = z.object({
  message: z.string().min(1, "Pesan gak boleh kosong dong!"),
});

export const chatWithGemini = async (req: Request, res: Response) => {
  try {
    const { message } = chatSchema.parse(req.body);

    const chatTitle = message.substring(0, 30) + "...";

    const newChat = await createChatSession(chatTitle);

    await saveMessage(newChat.id, "user", message);

    const aiReply = await generateAIResponse(message);

    await saveMessage(newChat.id, "assistant", aiReply as string);

    res.status(200).json({
      status: "success",
      data: {
        chat_id: newChat.id,
        title: newChat.title,
        user_message: message,
        ai_reply: aiReply,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ status: "error", errors: error.issues });
    }

    console.error("Controller Error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
