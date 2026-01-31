import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Bot, User, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Message } from "../../store/useChatStore";

interface ChatBubbleProps {
  message: Message;
}

function ChatBubble({ message }: ChatBubbleProps) {
  const isAI = message.role === "assistant";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex w-full gap-4 mb-6", isAI ? "justify-start" : "justify-end")}>
        {isAI && (
          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border shrink-0">
            <Bot className="w-5 h-5 text-primary" />
          </div>
        )}

        <div
          className={cn(
            "relative max-w-[85%] md:max-w-[75%] px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-md",
            isAI ? "bg-ai-bubble border border-border text-gray-100 rounded-tl-none" : "bg-primary text-white font-medium rounded-tr-none",
          )}
        >
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="rounded-md overflow-hidden my-4 border border-border/50">
                    <div className="bg-[#1e1e1e] px-4 py-1 text-xs text-gray-400 flex justify-between items-center border-b border-border/50">
                      <span>{match[1]}</span>
                      <span>Code</span>
                    </div>
                    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="bg-black/20 px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>

          {isAI && (
            <div className="mt-2 flex justify-end gap-2 border-t border-white/5 pt-2">
              <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition-colors">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}
        </div>

        {!isAI && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </motion.div>
    </>
  );
}

export default ChatBubble;
