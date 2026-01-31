import React from "react";
import { Plus, MessageSquare, Settings, X } from "lucide-react";
import logo from "../../assets/logo.jpg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
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
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center p-0 shadow-[0_0_15px_rgba(250,124,48,0.3)] border border-white/10">
              <img src={logo} alt="Hacktiv8 Logo" className="w-full h-full object-cover" />{" "}
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
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary hover:bg-orange-600 text-white rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 group">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span className="font-medium">New Protocol</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
          <p className="px-4 text-xs font-semibold text-gray-500 mb-2 font-mono">HISTORY</p>

          <button className="w-full text-left flex items-center gap-3 px-4 py-3 bg-surface/50 border border-border/50 text-white rounded-lg">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm truncate">Belajar React TypeScript</span>
          </button>

          <button className="w-full text-left flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm truncate">Resep Nasi Goreng AI</span>
          </button>
        </div>

        {/* Footer User */}
        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-xs">BG</div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white">Bagas</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
