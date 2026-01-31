import React, { useEffect } from "react";
import { Plus, MessageSquare, Settings, X, History } from "lucide-react";
import logo from "../../assets/logo.jpg";
import { useChatStore } from "../../store/useChatStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { sessions, activeSessionId, fetchSessions, loadSession, startNewChat, initGuest } = useChatStore();

  useEffect(() => {
    initGuest();
    fetchSessions();
  }, []);

  const handleNewChat = () => {
    startNewChat();
    onClose();
  };

  const handleLoadSession = (id: string) => {
    loadSession(id);
    onClose();
  };

  return (
    <>
      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity" />}

      <aside
        className={`
          fixed md:relative z-50 top-0 left-0 h-full w-70
          bg-sidebar border-r border-border flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(250,124,48,0.3)] border border-white/10">
              <img src={logo} alt="Hacktiv8 Logo" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-lg font-bold font-display tracking-wide text-white leading-none">HACKTIV8</h1>
              <span className="text-[10px] text-primary font-mono tracking-wider">AI LEARNING ASSISTANT</span>
            </div>
          </div>

          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 mb-6">
          <button onClick={handleNewChat} className="w-full flex items-center gap-3 px-4 py-3 bg-primary hover:bg-orange-600 text-white rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 group">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
          <p className="px-4 text-xs font-semibold text-gray-500 mb-2 font-mono">HISTORY</p>

          {sessions.length === 0 && (
            <div className="px-4 py-4 text-center">
              <p className="text-xs text-gray-600 italic">Belum ada riwayat chat.</p>
            </div>
          )}

          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => handleLoadSession(session.id)}
              className={`
                w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${activeSessionId === session.id ? "bg-surface border border-border/50 text-white shadow-sm" : "text-gray-400 hover:text-white hover:bg-white/5"}
              `}
            >
              <MessageSquare className={`w-4 h-4 ${activeSessionId === session.id ? "text-primary" : ""}`} />
              <span className="text-sm truncate w-full">{session.title}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-400">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-white font-bold text-xs">G</div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white">Guest User</p>
              <p className="text-xs text-gray-500">Auto-Save Enabled</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
