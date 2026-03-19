import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import io from "socket.io-client";

import Sidebar from "../components/LiveRoom/Sidebar";
import Header from "../components/LiveRoom/Header";
import EditorContainer from "../components/LiveRoom/EditorContainer";
import ChatContainer from "../components/LiveRoom/ChatContainer";

const LiveRooms = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const editorRef = useRef(null);
  const socketRef = useRef(null);

  const { user, axios, rooms } = useContext(AppContext);

  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const roomData = rooms.find((r) => r.roomId === roomId);
  const isAuthor = user?.username === roomData?.author;

  useEffect(() => {
    if (!user?.username) return;

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.emit("join-room", {
      roomId,
      username: user.username,
    });

    socket.on("code-update", (code) => {
      const current = editorRef.current?.getValue();
      if (current !== code) {
        editorRef.current?.setValue(code);
      }
    });

    socket.on("proposal-received", (proposal) => {
      if (!isAuthor) return;

      setProposals((prev) => {
        const exists = prev.some((p) => p.id === proposal.id);
        return exists ? prev : [...prev, proposal];
      });

      toast.info(`New proposal from ${proposal.username}`);
    });

    socket.on("user-joined", ({ username, id }) => {
      setClients((prev) => {
        const exists = prev.some((c) => c.id === id);
        return exists ? prev : [...prev, { id, name: username }];
      });
    });

    socket.on("user-left", ({ id }) => {
      setClients((prev) => prev.filter((c) => c.id !== id));
    });

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("ai-loading-started", () => setIsAiLoading(true));

    socket.on("ai-analysis-received", (aiMsg) => {
      if (aiMsg) {
        setMessages((prev) => [...prev, aiMsg]);
      }
      setIsAiLoading(false);
    });

    return () => socket.disconnect();
  }, [roomId, user?.username]);

  const handlePropose = () => {
    const code = editorRef.current?.getValue();

    socketRef.current.emit("send-proposal", {
      roomId,
      username: user.username,
      code,
    });

    toast.success("Proposal sent");
  };

  const handleAcceptProposal = (p) => {
    editorRef.current?.setValue(p.code);

    socketRef.current.emit("merge-code", {
      roomId,
      code: p.code,
    });

    setProposals((prev) => prev.filter((prop) => prop.id !== p.id));
    toast.success("Merged");
  };

  const handleRejectProposal = (id) => {
    setProposals((prev) => prev.filter((p) => p.id !== id));
    toast.warn("Rejected");
  };

  const handleClear = () => {
    editorRef.current?.setValue("");

    socketRef.current.emit("clear-editor", { roomId });
    toast.warn("Workspace Cleared");
  };

  const saveWorkspace = async () => {
    try {
      const code = editorRef.current?.getValue();

      await axios.patch("/rooms/update-code", {
        roomId,
        code,
      });

      toast.success("Saved to Cloud");
    } catch {
      toast.error("Save failed");
    }
  };

  const sendMessage = (text) => {
    const msg = {
      id: Date.now(),
      user: user.username,
      text,
    };

    socketRef.current.emit("send-message", {
      roomId,
      message: msg,
    });

    setMessages((prev) => [...prev, msg]);
  };

  const askAI = async () => {
    const code = editorRef.current?.getValue();

    if (!code || isAiLoading) return;

    setIsAiLoading(true);
    socketRef.current.emit("start-ai-analysis", { roomId });

    try {
      const { data } = await axios.post("/ai/analyze", { code });

      if (data.success) {
        const aiMsg = {
          id: Date.now(),
          user: "DevConnect AI",
          text: data.data.analysis,
        };

        socketRef.current.emit("submit-ai-analysis", {
          roomId,
          aiMsg,
        });

        setMessages((prev) => [...prev, aiMsg]);
        toast.success("Analysis complete");
      }
    } catch {
      toast.error("AI failed");
      socketRef.current.emit("stop-ai-loading", { roomId });
    } finally {
      setIsAiLoading(false);
    }
  };

  if (!roomData) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Room not found
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0B0E14] text-zinc-300 fixed inset-0 z-10 overflow-hidden font-sans">

      <div className="hidden md:block">
        <Sidebar
          clients={clients}
          user={user}
          roomId={roomId}
          navigate={navigate}
          isAuthor={isAuthor}
          proposals={proposals}
          onAccept={handleAcceptProposal}
          onReject={handleRejectProposal}
          onPropose={handlePropose}
        />
      </div>

      <main className="flex-1 flex flex-col bg-[#1E1E1E]">
        <Header
          isAiLoading={isAiLoading}
          askAI={askAI}
          saveWorkspace={saveWorkspace}
          isAuthor={isAuthor}
          onClear={handleClear}
        />

        <EditorContainer editorRef={editorRef} broadcastCode={() => {}} />
      </main>

      <div className="md:hidden">
        <ChatContainer
          messages={messages}
          sendMessage={sendMessage}
          currentUser={user?.username}
        />
      </div>

      <div className="hidden md:block">
        <ChatContainer
          messages={messages}
          sendMessage={sendMessage}
          currentUser={user?.username}
        />
      </div>

    </div>
  );
};

export default LiveRooms;