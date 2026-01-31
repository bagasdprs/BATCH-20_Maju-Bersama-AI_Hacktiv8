import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface Session {
  id: string;
  title: string;
}

interface ChatState {
  messages: Message[];
  sessions: Session[]; // Daftar History chat
  activeSessionId: string | null; // ID chat yang lagi dibuka
  isLoading: boolean;
  guestId: string; // ID Pengunjung

  // Actions
  initGuest: () => void;
  fetchSessions: () => Promise<void>;
  loadSession: (sessionId: string) => Promise<void>;
  startNewChat: () => void;
  sendMessage: (text: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  sessions: [],
  activeSessionId: null,
  isLoading: false,
  guestId: "",

  initGuest: () => {
    let id = localStorage.getItem("hacktiv8_guest_id");
    if (!id) {
      id = "guest-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("hacktiv8_guest_id", id);
    }
    set({ guestId: id });
  },

  fetchSessions: async () => {
    const { guestId } = get();
    if (!guestId) return;
    try {
      const res = await axios.get(`${API_URL}/sessions?guestId=${guestId}`);
      set({ sessions: res.data });
    } catch (err) {
      console.error("Gagal ambil history", err);
    }
  },

  loadSession: async (sessionId) => {
    set({ isLoading: true, activeSessionId: sessionId, messages: [] });
    try {
      const res = await axios.get(`${API_URL}/sessions/${sessionId}`);
      set({ messages: res.data, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
    }
  },

  startNewChat: () => {
    set({ activeSessionId: null, messages: [] });
  },

  sendMessage: async (text) => {
    const { guestId, activeSessionId, fetchSessions } = get();

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    set((state) => ({ messages: [...state.messages, userMsg], isLoading: true }));

    try {
      const res = await axios.post(`${API_URL}/chat`, {
        message: text,
        guestId,
        sessionId: activeSessionId,
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: res.data.ai_reply,
      };

      set((state) => ({
        messages: [...state.messages, aiMsg],
        activeSessionId: res.data.sessionId,
        isLoading: false,
      }));

      fetchSessions();
    } catch (error) {
      set({ isLoading: false });
      const errorMsg: Message = { id: Date.now().toString(), role: "assistant", content: "⚠️ Maaf, server sedang sibuk atau error." };
      set((state) => ({ messages: [...state.messages, errorMsg] }));
    }
  },
}));
