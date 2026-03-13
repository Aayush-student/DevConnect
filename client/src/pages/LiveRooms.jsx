import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Terminal, ChevronRight, LogOut, X, MessageSquare, Code2 } from 'lucide-react';
import Editor from '@monaco-editor/react';

const LANGUAGES = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'C++', value: 'cpp' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' }
];

const LiveRooms = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [code, setCode] = useState('// Start debugging here...');
  const [language, setLanguage] = useState('javascript');

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
    wordWrap: 'on',
    lineNumbersMinChars: 3,
    padding: { top: 16 }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-[#0B0E14] overflow-hidden page-container">
      <div className="bg-[#161B22] border-b border-white/5 px-4 md:px-6 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
            <Terminal size={14} />
            <span>Project</span>
            <ChevronRight size={12} />
            <span className="text-white">Room_{roomId}</span>
          </div>
          
          <div className="flex items-center gap-2 bg-[#0B0E14] border border-white/10 rounded-lg px-2 py-1">
            <Code2 size={14} className="text-indigo-400" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white text-[10px] md:text-xs font-bold uppercase outline-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value} className="bg-[#161B22]">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 bg-white/5 rounded-lg text-indigo-400"
          >
            {isSidebarOpen ? <X size={18} /> : <MessageSquare size={18} />}
          </button>
          <button 
            onClick={() => navigate('/explore')}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-[10px] md:text-xs font-bold uppercase transition-colors"
          >
            <LogOut size={16} /> <span className="hidden sm:block">Leave</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 bg-[#1e1e1e] relative">
           <Editor
             height="100%"
             theme="vs-dark"
             language={language}
             value={code}
             onChange={(value) => setCode(value)}
             options={editorOptions}
           />
        </div>

        <div className={`
          fixed inset-y-0 right-0 z-10 w-80 bg-[#161B22] border-l border-white/5 flex flex-col transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl shadow-black' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Users size={14} /> Participants
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-[10px] font-bold text-indigo-300">A</div>
              <p className="text-xs font-bold text-white">Aayush Kumar</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              Live Chat
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] font-black text-indigo-400 mb-1 uppercase">System</p>
                <p className="text-xs text-gray-400">Switched to {language} mode.</p>
              </div>
            </div>
            <div className="p-4">
              <input 
                type="text" 
                placeholder="Message..." 
                className="w-full bg-[#0B0E14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 lg:hidden z-0"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LiveRooms;