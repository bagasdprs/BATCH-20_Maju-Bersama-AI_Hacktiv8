import React, { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import InputArea from "./components/chat/InputArea";
import ChatBubble from "./components/chat/ChatBubble";
import { Sparkles, Menu } from "lucide-react";
import { useChatStore } from "./store/useChatStore";
import { useAutoScroll } from "./hooks/useAutoScroll";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { messages, isLoading } = useChatStore();
  const bottomRef = useAutoScroll(messages);

  return (
    <div className="flex h-screen bg-background text-white overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 relative flex flex-col w-full">
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-border/40 bg-background/50 backdrop-blur-md z-30 sticky top-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <span className="bg-surface px-2 py-1 rounded text-xs font-mono border border-border text-gray-400">GEMINI-2.5-FLASH</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-40 custom-scrollbar scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50 -mt-10">
              <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-4 border border-border animate-bounce">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white">Hacktiv8 Learning AI</h2>
              <p className="text-gray-400 max-w-md text-sm md:text-base px-4">Siap membantu proses belajar coding kamu. Tanya apa saja!</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto w-full pt-4 space-y-6">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}

              {isLoading && (
                <div className="flex justify-start w-full gap-4 animate-pulse">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-surface/50 border border-border/50 px-4 py-3 rounded-2xl rounded-tl-none">
                    <span className="text-gray-400 text-sm">Sedang mengetik...</span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <InputArea />
      </main>
    </div>
  );
}

export default App;
