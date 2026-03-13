import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Terminal, ChevronRight, LogOut, X, MessageSquare, Code2, Copy, Check, Send } from 'lucide-react';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';

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
  
  const [isOwner, setIsOwner] = useState(true); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [code, setCode] = useState('// Start debugging here...');
  const [language, setLanguage] = useState('javascript');
  const [proposals, setProposals] = useState([]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleSendProposal = () => {
    toast.success('Fix proposal sent to owner!');
  };

  const acceptMerge = (newCode) => {
    setCode(newCode);
    setProposals([]);
    toast.success('Fix merged successfully!');
  };

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    readOnly: !isOwner,
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
            <button onClick={copyRoomId} className="ml-2 p-1.5 bg-indigo-500/10 text-indigo-400 rounded hover:bg-indigo-500 cursor-pointer">
              <Copy size={14} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 bg-[#0B0E14] border border-white/10 rounded-lg px-2 py-1">
            <Code2 size={14} className="text-indigo-400" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white text-[xs] font-bold uppercase outline-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value} className="bg-[#161B22]">{lang.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          {!isOwner && (
            <button onClick={handleSendProposal} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase flex items-center gap-2">
              <Send size={14} /> Submit Fix
            </button>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 bg-white/5 rounded-lg text-indigo-400">
            {isSidebarOpen ? <X size={18} /> : <MessageSquare size={18} />}
          </button>
          <button onClick={() => navigate('/explore')} className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase transition-colors">
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

        <div className={`fixed inset-y-0 right-0 z-10 w-80 bg-[#161B22] border-l border-white/5 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl shadow-black' : 'translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Users size={14} /> Participants
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-[10px] font-bold text-indigo-300">A</div>
              <p className="text-xs font-bold text-white">Aayush Kumar (Owner)</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/5 text-[10px] font-black uppercase text-gray-500">
              Pending Fixes
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {proposals.length === 0 ? (
                <p className="text-[10px] text-gray-600 text-center uppercase">No proposals yet</p>
              ) : (
                proposals.map((prop) => (
                  <div key={prop.id} className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <p className="text-[10px] font-bold text-indigo-400 mb-2 uppercase">{prop.user}</p>
                    <button onClick={() => acceptMerge(prop.code)} className="w-full bg-white text-black py-2 rounded-lg text-[10px] font-black uppercase flex items-center justify-center gap-2">
                      <Check size={14} /> Accept & Merge
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRooms;