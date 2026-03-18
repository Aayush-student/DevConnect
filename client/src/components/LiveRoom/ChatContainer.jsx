import { useState } from "react";
import { MessageSquare } from "lucide-react";

const ChatContainer = ({ messages, sendMessage, currentUser }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    sendMessage(text);
    setInput("");
  };

  return (
    <section className="w-full md:w-80 h-[40vh] md:h-auto bg-[#0E1217] border-t md:border-t-0 md:border-l border-white/5 flex flex-col shadow-2xl">
      
      <div className="p-4 md:p-6 border-b border-white/5 text-[9px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
        <MessageSquare size={14} /> Room_Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {messages.map((m) => {
          const isMe = m.user === currentUser;
          const isAI = m.user === "DevConnect AI";

          return (
            <div
              key={m.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <span className="text-[8px] md:text-[9px] font-bold text-gray-600 uppercase mb-1">
                {m.user}
              </span>

              <div
                className={`max-w-[90%] px-3 md:px-4 py-2 text-xs md:text-sm rounded-xl ${
                  isMe
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : isAI
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs"
                    : "bg-white/5 text-zinc-300 rounded-tl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-6 bg-black/20 border-t border-white/5"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message group..."
          className="w-full bg-[#0B0E14] border border-white/10 rounded-xl px-4 py-3 text-[11px] md:text-xs text-white outline-none focus:border-indigo-500 transition-all font-bold"
        />
      </form>
    </section>
  );
};

export default ChatContainer;