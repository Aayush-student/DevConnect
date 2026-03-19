import React, { useState } from 'react';
import { Play, Code2, Sparkles, Terminal, LogIn } from 'lucide-react';
import { codeLines } from '../assets/asset';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Hero = ({ openModal }) => {
  const navigate = useNavigate();
  const [joinId, setJoinId] = useState('');

  const handleJoin = () => {
    if (!joinId.trim()) {
      toast.error("Please paste a Room ID");
      return;
    }
    navigate(`/rooms/${joinId}`);
    toast.success("Joining Room...");
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      handleJoin();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center pt-10 pb-20 text-center px-4">
      <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider mb-10">
        <Sparkles size={14} />
        <span>v1.0 is now live</span>
      </div>

      <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
        CODE LOUD.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          FIX FASTER.
        </span>
      </h1>

      <p className="max-w-xl text-gray-500 text-lg md:text-xl font-medium mb-12">
        Collaborative debugging for modern dev teams.
      </p>

      <div className="flex flex-col items-center gap-6 mb-20">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={openModal} className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white px-8 py-4 rounded-xl font-black uppercase tracking-tight transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-indigo-500/20">
            <Play size={18} fill="currentColor" /> Start a Room
          </button>
          <button onClick={() => navigate('/explore')} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl cursor-pointer font-black uppercase tracking-tight transition-all flex items-center gap-2 active:scale-95">
            <Code2 size={18} /> Browse Bugs
          </button>
        </div>

        <div className="flex items-center bg-[#161B22] border border-white/10 rounded-xl p-1 w-full max-w-md">
          <input 
            type="text"
            placeholder="PASTE ROOM ID..."
            value={joinId}
            onChange={(e) => setJoinId(e.target.value)}
            onKeyUp={handleInputEnter}
            className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-white font-mono"
          />
          <button 
            onClick={handleJoin}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase flex items-center gap-2 transition-all"
          >
            <LogIn size={14} /> Join
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-5xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl rounded-3xl"></div>
        <div className="relative bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[#161b22] px-5 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="text-gray-500 text-[11px] font-mono font-bold flex items-center gap-2 uppercase tracking-widest">
              <Terminal size={12} /> session_id: 882-debug
            </div>
            <div className="w-12"></div>
          </div>
          
          <div className="p-8 text-left font-mono text-sm md:text-base leading-relaxed overflow-x-auto whitespace-nowrap">
            {codeLines.map((line) => (
              <div 
                key={line.id} 
                className={`flex gap-6 items-center ${line.highlighted ? 'bg-indigo-500/10 border-l-2 border-indigo-500 -ml-8 pl-8 py-1.5' : 'py-0.5'}`}
              >
                <span className={`w-6 text-right select-none ${line.highlighted ? 'text-indigo-400 font-bold' : 'text-gray-600'}`}>
                  {line.id}
                </span>
                <p className={`font-medium ${line.highlighted ? 'text-indigo-100' : 'text-gray-400'}`}>
                  {line.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;