import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, LayoutDashboard, MessageSquare, Zap } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B0E14]/80 backdrop-blur-md px-6 py-3 flex items-center justify-between">
      
      <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
          <Terminal className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Dev<span className="text-indigo-500">Connect</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-gray-400 font-medium">
        <Link to="/explore" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
          <LayoutDashboard size={18} /> Explore
        </Link>
        <Link to="/rooms/:roomId" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
          <MessageSquare size={18} /> Live Rooms
        </Link>
        <Link to="/ai-helper" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
          <Zap size={18} /> AI Helper
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-300 hover:text-white font-medium px-4 py-2">
          Sign In
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;