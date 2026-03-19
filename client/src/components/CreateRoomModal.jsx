import React, { useState, useContext } from "react";
import { X, Terminal, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const CreateRoomModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { axios, fetchRooms, user, accessToken } = useContext(AppContext);

  const [roomData, setRoomData] = useState({
    roomTitle: "",
    language: "JavaScript",
    difficulty: "Easy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLaunch = async (e) => {
    e.preventDefault();

    if (!roomData.roomTitle.trim()) {
      return toast.error("Please give your room a title!");
    }

    try {
     
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const fullUrl = `${baseUrl}/rooms/create`;

      const generatedRoomId = uuidv4();

      const response = await axios.post(fullUrl, 
        {
          ...roomData,
          roomId: generatedRoomId,
          author: user?.username || "Guest"
        },
        {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {} 
        }
      );

      if (response.data.success) {
        toast.success("ROOM IS LIVE!");
        fetchRooms();
        onClose();
        
        
        navigate(`/rooms/${generatedRoomId}`);
      }
    } catch (error) {
      console.error("Room Creation Error:", error);
      const errorMsg = error.response?.data?.message || "Connection lost. Is the server running?";
      toast.error(errorMsg);
    }
  };

  const inputStyle = "w-full bg-[#0B0E14] border border-white/5 rounded-xl py-4 px-4 text-white outline-none focus:border-indigo-500/50 transition-all duration-200";
  const labelStyle = "text-[10px] font-bold uppercase text-gray-500 ml-1 tracking-widest";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#161B22] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500" />
        
        <div className="p-8 md:p-10">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Terminal className="text-indigo-400" size={22} />
              <h2 className="text-xl font-bold uppercase text-white tracking-tight">Create Room</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer text-gray-500 hover:text-white">
              <X size={24} />
            </button>
          </header>

          <form onSubmit={handleLaunch} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className={labelStyle}>Project or Bug Title</label>
              <input 
                name="roomTitle" 
                value={roomData.roomTitle} 
                onChange={handleChange} 
                placeholder="e.g. Debugging Auth Middleware" 
                className={inputStyle} 
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Language</label>
                <select name="language" value={roomData.language} onChange={handleChange} className={inputStyle}>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Node.js">Node.js</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Difficulty</label>
                <select name="difficulty" value={roomData.difficulty} onChange={handleChange} className={inputStyle}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-black uppercase flex items-center justify-center gap-3 hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-2xl cursor-pointer mt-4">
              Launch Room <Rocket size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;