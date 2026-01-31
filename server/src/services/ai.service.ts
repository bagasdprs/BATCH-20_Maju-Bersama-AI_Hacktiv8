import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "../config/env";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  maxOutputTokens: 2048,
  apiKey: env.GOOGLE_API_KEY,
  temperature: 0.7,
});

export const generateAIResponse = async (userMessage: string) => {
  try {
    const response = await model.invoke([["human", userMessage]]);

    if (Array.isArray(response.content)) {
      return response.content.map((c: any) => c.text || "").join(" ");
    }

    console.log("✅ Balasan diterima!");
    return response.content;
  } catch (error) {
    console.error("❌ Gemini Error:", error);
    throw new Error("Maaf, AI sedang lelah (Service Error).");
  }
};
