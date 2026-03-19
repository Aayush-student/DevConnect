import React, { useState, useContext } from "react";
import { X, Terminal, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "c",
  "csharp",
  "go",
  "rust",
  "php",
  "html",
  "css",
  "json",
  "markdown",
  "sql",
  "bash"
];

const CreateRoomModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { axios, fetchRooms, user, accessToken } = useContext(AppContext);

  const [roomData, setRoomData] = useState({
    roomTitle: "",
    language: "javascript",
    difficulty: "Easy"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLaunch = async (e) => {
    e.preventDefault();

    if (!roomData.roomTitle.trim()) {
      return toast.error("Give your room a name ⚡");
    }

    try {
      const generatedRoomId = uuidv4();

      const response = await axios.post(
        "/rooms/create",
        {
          ...roomData,
          roomId: generatedRoomId,
          author: user?.username || "Guest",
          code: ""
        },
        {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
        }
      );

      if (response.data.success) {
        toast.success("Room launched 🚀");
        fetchRooms();
        onClose();
        navigate(`/rooms/${generatedRoomId}`);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Server not responding ⚠️";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-gradient-to-br from-[#161B22] to-[#0B0E14] border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

        <div className="p-8 md:p-10 space-y-6">

          <header className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Terminal className="text-indigo-400" size={22} />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Create Room
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition"
            >
              <X size={22} />
            </button>
          </header>

          <form onSubmit={handleLaunch} className="space-y-5">

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">
                Project Title
              </label>
              <input
                name="roomTitle"
                value={roomData.roomTitle}
                onChange={handleChange}
                placeholder="Debugging Auth Middleware"
                className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">
                  Language
                </label>
                <select
                  name="language"
                  value={roomData.language}
                  onChange={handleChange}
                  className="bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-3 text-white outline-none focus:border-indigo-500"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={roomData.difficulty}
                  onChange={handleChange}
                  className="bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-3 text-white outline-none focus:border-indigo-500"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
            >
              Launch Room
              <Rocket size={18} />
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;