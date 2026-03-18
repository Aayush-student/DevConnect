import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Terminal, Sparkles, Send, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';

const AIHelper = () => {
    const { axios } = useContext(AppContext);
    const [code, setCode] = useState('');
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!code.trim()) return toast.error("Please paste some code first");

        setLoading(true);
        try {
            const { data } = await axios.post('/ai/analyze', { code, prompt });
            setResult(data.data.analysis);
        } catch (error) {
            toast.error("AI is currently unavailable");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-6 animate-fadeIn">
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/20">
                    <Sparkles className="text-white" size={24} />
                </div>
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">AI Debugger</h2>
                    <p className="text-gray-500 text-sm font-medium">Paste your broken code and let the AI find the fix.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <form onSubmit={handleAnalyze} className="space-y-4">
                    <div className="bg-[#161B22] border border-white/10 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-3 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <Code size={14} /> Source Code
                        </div>
                        <textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="// Paste your code here..."
                            className="w-full h-80 bg-transparent text-zinc-300 font-mono text-sm outline-none resize-none"
                        />
                    </div>

                    <div className="relative">
                        <input 
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Ask a specific question (optional)..."
                            className="w-full bg-[#161B22] border border-white/10 rounded-xl py-4 pl-5 pr-16 text-white outline-none focus:border-indigo-500 transition-all"
                        />
                        <button 
                            disabled={loading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-lg transition-all disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </form>

                {/* Output Section */}
                <div className="bg-[#0B0E14] border border-white/5 rounded-2xl p-6 min-h-[400px] relative overflow-y-auto">
                    <div className="flex items-center gap-2 mb-6 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                        <Terminal size={14} /> AI Analysis
                    </div>
                    
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-4">
                            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 text-xs font-bold uppercase animate-pulse">Thinking...</p>
                        </div>
                    ) : result ? (
                        <div className="prose prose-invert prose-sm max-w-none text-zinc-400">
                            <ReactMarkdown>{result}</ReactMarkdown>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-700">
                            <Sparkles size={40} className="mb-4 opacity-20" />
                            <p className="text-xs font-bold uppercase tracking-widest">Waiting for input</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIHelper;