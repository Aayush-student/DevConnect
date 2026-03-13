import React from 'react';
import { X, Terminal, Rocket } from 'lucide-react';

const CreateRoomModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-lg bg-[#161B22] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
                <Terminal size={20} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white">Create New Room</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Bug Title</label>
              <input 
                type="text" 
                placeholder="e.g. My Express server is crashing" 
                className="w-full bg-[#0B0E14] border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Language</label>
                <select className="w-full bg-[#0B0E14] border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer">
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>Node.js</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Difficulty</label>
                <select className="w-full bg-[#0B0E14] border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-tighter flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-all mt-4 group">
              Launch Debug Room <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;