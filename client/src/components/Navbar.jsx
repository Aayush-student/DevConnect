import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, LayoutDashboard, Zap, Github, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleGithubLogin = () => {
    toast.loading("Connecting to GitHub...");
    setTimeout(() => {
      setIsLoggedIn(true);
      toast.dismiss();
      toast.success("Successfully synced with GitHub!");
    }, 1200);
  };

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
        <Link to="/ai-helper" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
          <Zap size={18} /> AI Helper
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <button 
              onClick={handleGithubLogin}
              className="flex items-center gap-2 text-gray-300 hover:text-white font-medium px-4 py-2 transition-colors cursor-pointer"
            >
              <Github size={18} /> Sign In
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20 cursor-pointer">
              Get Started
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-wider">Aayush Kumar</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;