export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export interface APIResponse {
  status: string;
  data: {
    chat_id: string;
    title: string;
    user_message: string;
    ai_reply: string;
  };
}
