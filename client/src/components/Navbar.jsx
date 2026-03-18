import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, LayoutDashboard, Zap, LogOut, Menu, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const NAV_LINKS = [
  { name: 'Explore', path: '/explore', icon: LayoutDashboard },
  { name: 'AI Helper', path: '/ai-helper', icon: Zap },
];

const Navbar = () => {
  const { user, setShowLogin, logout } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B0E14] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Terminal className="text-white w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </div>
            <span className="text-lg md:text-xl font-black tracking-tighter text-white uppercase">
              Dev<span className="text-indigo-500">Connect</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive(item.path) ? 'text-indigo-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon size={16} strokeWidth={2.5} />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="hidden md:flex items-center gap-4">
                <button 
                  onClick={() => setShowLogin(true)}
                  className="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-widest cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-indigo-500 transition-all cursor-pointer"
                >
                  Join
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                  <span className="text-sm font-bold text-white uppercase">{user.username}</span>
                </div>
                <button 
                  onClick={logout}
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}

            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-gray-400 hover:text-white cursor-pointer"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0B0E14] border-b border-white/10 px-4 py-6 space-y-4">
          {NAV_LINKS.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 text-gray-400 font-bold uppercase tracking-widest"
            >
              <item.icon size={20} /> {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/5">
            {!user ? (
              <button 
                onClick={() => { setShowLogin(true); setIsOpen(false); }}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold uppercase tracking-widest"
              >
                Join Now
              </button>
            ) : (
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full bg-red-500/10 text-red-500 py-3 rounded-lg font-bold uppercase tracking-widest"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;