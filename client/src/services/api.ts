import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessageToGemini = async (message: string) => {
  try {
    const response = await API.post("/chat", { message });
    return response.data;
  } catch (error) {
    console.error("Gagal kirim pesan:", error);
    throw error;
  }
};
