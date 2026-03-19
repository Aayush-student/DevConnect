import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { Trash2, ChevronRight, Code } from "lucide-react";
import { toast } from "react-toastify";

const BugCard = ({ room }) => {
  const navigate = useNavigate();
  const { user, axios, fetchRooms } = useContext(AppContext);

  const isAuthor =
    user?._id === room.author || user?.username === room.author;

  const handleDelete = async (e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Delete this workspace permanently?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(
        `/rooms/delete/${room.roomId}`
      );

      if (data.success) {
        toast.success("Workspace Terminated");
        fetchRooms();
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Delete failed";
      toast.error(message);
    }
  };

  const handleNavigate = () => {
    navigate(`/rooms/${room.roomId}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group bg-[#161B22] border border-white/5 p-5 md:p-6 rounded-2xl hover:border-indigo-500/50 transition-all cursor-pointer relative overflow-hidden"
    >
      
      <div className="flex justify-between items-start mb-4">
        <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
          <Code size={18} />
        </div>

        {isAuthor && (
          <button
            onClick={handleDelete}
            className="text-gray-600 hover:text-red-500 p-2 transition-colors cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter mb-1 truncate">
        {room.roomTitle}
      </h3>

      <div className="flex flex-wrap items-center gap-2 mb-5 md:mb-6">
        <span className="text-[9px] md:text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-gray-400 uppercase tracking-widest border border-white/5">
          {room.language}
        </span>

        <span className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase break-all">
          ID: {room.roomId}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/5">
        <span className="text-[9px] md:text-[10px] font-black text-indigo-500 uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Enter Room <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );
};

export default BugCard;