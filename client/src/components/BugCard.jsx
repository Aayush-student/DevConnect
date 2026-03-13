import React from 'react';
import { Terminal, Users, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BugCard = ({ room }) => {
    const navigate = useNavigate();
  return (
    <div className="group relative bg-[#161B22] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.02] hover:border-indigo-500/50 transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <div className="bg-indigo-500/10 p-2.5 rounded-lg border border-indigo-500/20 text-indigo-400">
          <Terminal size={20} />
        </div>
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
          room.difficulty === 'Hard' ? 'text-red-400 bg-red-400/10' : 'text-emerald-400 bg-emerald-400/10'
        }`}>
          {room.difficulty}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
        {room.title}
      </h3>
      <p className="text-gray-500 text-xs font-mono mb-8 uppercase tracking-widest">
        shared by {room.author}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-black uppercase">
            <Flame size={14} className="text-orange-500" /> {room.language}
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-black uppercase">
            <Users size={14} className="text-indigo-400" /> {room.activeUsers}
          </div>
        </div>
        <button className="bg-white text-black text-[10px] font-black uppercase px-4 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition-all cursor-pointer" onClick={()=> navigate(`/rooms/${room.id}`)}>
          Join Now
        </button>
      </div>
    </div>
  );
};

export default BugCard;