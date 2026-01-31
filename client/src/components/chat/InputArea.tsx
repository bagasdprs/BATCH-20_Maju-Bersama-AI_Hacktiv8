import React, { useState, useRef } from "react";
import { Send, Paperclip, Mic, Loader2 } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { useEnterSubmit } from "../../hooks/useEnterSubmit";

function InputArea() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isLoading } = useChatStore();

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const messageToSend = input;
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    await sendMessage(messageToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-background via-background to-transparent pt-12 pb-6 z-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative flex items-end gap-2 p-2 bg-surface border border-border/50 rounded-2xl shadow-2xl shadow-black/50 focus-within:border-primary/50 transition-all">
          <button className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Kirim pesan ke Hacktiv8 AI..."
            className="w-full bg-transparent text-white placeholder-gray-500 text-sm md:text-base resize-none focus:outline-none max-h-32 py-3 custom-scrollbar font-sans leading-relaxed"
            rows={1}
            disabled={isLoading}
            style={{ minHeight: "44px" }}
          />

          <div className="flex items-center gap-1 shrink-0">
            <button className="hidden md:block p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
              <Mic className="w-5 h-5" />
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-primary hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] md:text-xs text-gray-600 mt-3 font-mono">Hacktiv8 AI dapat membuat kesalahan. Cek informasi penting.</p>
      </div>
    </div>
  );
}

export default InputArea;
