import React, { useState } from 'react';
import { Search, Plus, Terminal } from 'lucide-react';
import BugCard from '../components/bugCard';

const Explore = ({ rooms, setIsModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = rooms.filter(room => 
    room.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 animate-page page-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Current Bugs</h2>
          <p className="text-gray-500 font-medium">Find a room and start collaborating.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search language..." 
              className="w-full bg-[#161B22] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all text-sm"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <BugCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
          <Terminal size={48} className="text-gray-700 mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No active rooms found</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-4 text-indigo-400 hover:text-indigo-300 font-bold text-xs uppercase underline cursor-pointer"
          >
            Create the first one
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;