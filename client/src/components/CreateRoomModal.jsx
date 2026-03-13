import React, { useState } from 'react';
import { X, Terminal, Rocket, Github } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateRoomModal = ({ onClose, addRoom }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    roomTitle: '',
    language: 'JavaScript',
    difficulty: 'Easy',
    source: 'manual',
    githubRepos: []
  });

  const updateForm = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleFetchGithub = () => {
    toast.loading("Syncing GitHub...");
    setTimeout(() => {
      setFormData({
        ...formData,
        source: 'github',
        roomTitle: '',
        githubRepos: ['ecommerce-backend', 'react-dashboard', 'python-scraper']
      });
      toast.dismiss();
      toast.success("GitHub Connected!");
    }, 800);
  };

  const handleLaunch = (e) => {
    e.preventDefault();
    if (!formData.roomTitle) return toast.error("Title is required!");

    const id = uuidv4();
    addRoom({ 
      id, 
      ...formData, 
      author: 'Aayush Kumar', 
      activeUsers: 1 
    });
    
    onClose();
    navigate(`/rooms/${id}`);
    toast.success("Launching Room...");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#161B22] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-pink-500" />
        
        <div className="p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
                <Terminal size={20} />
              </div>
              <h2 className="text-xl font-bold uppercase text-white tracking-tight">Setup Room</h2>
            </div>
            <X size={24} className="text-gray-500 hover:text-white cursor-pointer" onClick={onClose} />
          </header>

          <div className="flex gap-2 mb-6 bg-[#0B0E14] p-1 rounded-2xl">
            <button 
              type="button"
              onClick={() => updateForm('source', 'manual')}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all ${formData.source === 'manual' ? 'bg-white text-black' : 'text-gray-500'}`}
            >
              Manual
            </button>
            <button 
              type="button"
              onClick={handleFetchGithub}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase flex items-center justify-center gap-2 transition-all ${formData.source === 'github' ? 'bg-[#24292e] text-white' : 'text-gray-500'}`}
            >
              <Github size={14} /> GitHub
            </button>
          </div>

          <form onSubmit={handleLaunch} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">
                {formData.source === 'manual' ? 'Bug Title' : 'Repository Name'}
              </label>
              
              {formData.source === 'manual' ? (
                <input 
                  value={formData.roomTitle}
                  onChange={(e) => updateForm('roomTitle', e.target.value)}
                  placeholder="e.g. Server crash on login"
                  className="w-full bg-[#0B0E14] border border-white/5 rounded-xl py-4 px-4 text-white outline-none focus:border-indigo-500/50"
                />
              ) : (
                <select 
                  value={formData.roomTitle}
                  onChange={(e) => updateForm('roomTitle', e.target.value)}
                  className="w-full bg-[#0B0E14] border border-white/5 rounded-xl py-4 px-4 text-white outline-none cursor-pointer"
                >
                  <option value="">Select Project...</option>
                  {formData.githubRepos.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">Language</label>
                <select value={formData.language} onChange={(e) => updateForm('language', e.target.value)} className="w-full bg-[#0B0E14] border border-white/5 rounded-xl py-4 px-4 text-white outline-none">
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Node.js">Node.js</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">Difficulty</label>
                <select value={formData.difficulty} onChange={(e) => updateForm('difficulty', e.target.value)} className="w-full bg-[#0B0E14] border border-white/5 rounded-xl py-4 px-4 text-white outline-none">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all transform active:scale-95 shadow-lg shadow-indigo-500/10">
              Launch Room <Rocket size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;