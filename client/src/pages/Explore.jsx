import React, { useState, useEffect, useContext } from "react";
import { Search, Plus, Terminal } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";
import BugCard from "../components/BugCard.jsx";

const Explore = ({ openModal }) => {
  const { rooms, roomsLoading, fetchRooms } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [displayRooms, setDisplayRooms] = useState([]);

  useEffect(() => {
    if (!rooms.length) {
      fetchRooms();
    }
  }, []);

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      setDisplayRooms(rooms);
      return;
    }

    const filtered = rooms.filter((room) => {
      return (
        room.language?.toLowerCase().includes(query) ||
        room.roomTitle?.toLowerCase().includes(query)
      );
    });

    setDisplayRooms(filtered);
  }, [searchTerm, rooms]);

  if (roomsLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 md:py-12 px-4 md:px-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-12 md:mb-16">
        
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
            Current Bugs
          </h2>
          <p className="text-gray-500 font-medium tracking-tight text-sm md:text-base">
            Select a workspace to begin debugging.
          </p>
        </div>

        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
          
          <div className="relative group flex-1 md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors"
              size={18}
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search language or title..."
              className="w-full bg-[#161B22] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all text-sm font-medium"
            />
          </div>

          <button
            onClick={openModal}
            className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            <Plus size={22} />
          </button>
        </div>
      </div>

      {displayRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {displayRooms.map((room) => (
            <BugCard key={room.roomId || room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 md:py-24 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01] text-center">
          
          <Terminal size={48} className="text-gray-800 mb-4" />

          <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs">
            No active sessions
          </p>

          <button
            onClick={openModal}
            className="mt-4 text-indigo-500 hover:text-indigo-400 font-black text-[10px] uppercase tracking-widest cursor-pointer transition-colors"
          >
            Launch New Workspace
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;