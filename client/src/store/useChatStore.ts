import { create } from "zustand";
import { sendMessageToGemini } from "../services/api";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,

  sendMessage: async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      isLoading: true,
    }));

    try {
      const data = await sendMessageToGemini(text);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.data.ai_reply,
      };

      set((state) => ({
        messages: [...state.messages, aiMsg],
        isLoading: false,
      }));
    } catch (error) {
      const errorMsg: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Maaf, ada gangguan koneksi ke server.",
      };
      set((state) => ({
        messages: [...state.messages, errorMsg],
        isLoading: false,
      }));
    }
  },
}));
