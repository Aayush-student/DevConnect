import React from "react";
import { Zap, Users, Check, Send, X } from "lucide-react";
import { toast } from "react-toastify";

const Sidebar = ({
  clients,
  user,
  roomId,
  navigate,
  isAuthor,
  proposals,
  onAccept,
  onReject,
  onPropose,
  onPreview
}) => {
  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <aside className="w-64 md:w-72 bg-[#0E1217] border-r border-white/5 flex flex-col p-4 md:p-8 overflow-y-auto">
      
      <div
        className="flex items-center gap-3 mb-8 md:mb-12 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="bg-indigo-600 p-2 rounded-xl">
          <Zap size={16} fill="white" />
        </div>
        <span className="text-lg md:text-xl font-black text-white uppercase italic tracking-tighter">
          DevConnect
        </span>
      </div>

      <div className="flex-1 space-y-6 md:space-y-8 overflow-y-auto pr-1 md:pr-2">
        
        <div>
          <p className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
            <Users size={12} /> Online_Peers
          </p>

          <div className="space-y-2">
            <div className="p-2 md:p-3 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-[10px] md:text-xs font-bold text-white uppercase">
              {user?.username} (YOU)
            </div>

            {clients.map((c) => (
              <div
                key={c.id}
                className="p-2 md:p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] md:text-xs font-bold uppercase text-zinc-400"
              >
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div>
          {!isAuthor && (
            <button
              onClick={onPropose}
              className="w-full py-3 md:py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Send size={12} /> Propose
            </button>
          )}

          {isAuthor && proposals.length > 0 && (
            <div className="space-y-3 md:space-y-4">
              <p className="text-[9px] md:text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                Pending Proposals
              </p>

              {proposals.map((p) => (
                <div
                  key={p.id}
                  className="p-3 md:p-4 bg-white/[0.02] border border-white/5 rounded-xl"
                >
                  <p className="text-[8px] md:text-[9px] font-black text-zinc-400 uppercase mb-2 md:mb-3">
                    {p.username}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onPreview(p)}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[8px] md:text-[9px] font-black uppercase"
                    >
                      Preview
                    </button>

                    <button
                      onClick={() => onAccept(p)}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[8px] md:text-[9px] font-black uppercase flex items-center justify-center gap-1"
                    >
                      <Check size={10} /> Merge
                    </button>

                    <button
                      onClick={() => onReject(p.id)}
                      className="px-2 md:px-3 py-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-lg flex items-center justify-center"
                    >
                      <X size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 md:pt-6 border-t border-white/5 space-y-2 md:space-y-3">
        <button
          onClick={copyRoomId}
          className="w-full py-3 md:py-4 bg-white text-black rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
        >
          Copy Room ID
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full py-3 md:py-4 text-gray-600 hover:text-red-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all"
        >
          Exit Workspace
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;