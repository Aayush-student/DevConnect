import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [editorReady, setEditorReady] = useState(false);

  const editorRef = useRef(null);
  const socketRef = useRef(null);

  const { user, axios, rooms } = useContext(AppContext);

  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [proposals, setProposals] = useState([]);

  const roomData = rooms.find((r) => r.roomId === roomId);
  const isAuthor = user?.username === roomData?.author;

  useEffect(() => {
    if (!editorReady || !editorRef.current) return;

    const incomingCode = location.state?.code || roomData?.code;
    if (!incomingCode) return;

    const current = editorRef.current.getValue();
    if (!current || current === "// Loading workspace...") {
      editorRef.current.setValue(incomingCode);
    }
  }, [editorReady, roomData, location.state]);

  useEffect(() => {
    if (!user?.username || socketRef.current) return;

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

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, user?.username, isAuthor]);

  const handlePropose = () => {
    const code = editorRef.current?.getValue();
    socketRef.current?.emit("send-proposal", {
      roomId,
      username: user.username,
      code,
    });
    toast.success("Proposal sent");
  };

  const handleAcceptProposal = (p) => {
    editorRef.current?.setValue(p.code);
    socketRef.current?.emit("merge-code", {
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
    socketRef.current?.emit("clear-editor", { roomId });
    toast.warn("Workspace Cleared");
  };

  const saveWorkspace = async () => {
    try {
      const code = editorRef.current?.getValue();
      await axios.patch("/rooms/update-code", { roomId, code });
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
    socketRef.current?.emit("send-message", { roomId, message: msg });
    setMessages((prev) => [...prev, msg]);
  };

  if (!roomData) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Room not found
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0B0E14] text-zinc-300 overflow-hidden font-sans">
      <div className="hidden md:block h-full">
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

      <main className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden min-h-0">
        <Header
          askAI={() => {}}
          saveWorkspace={saveWorkspace}
          isAuthor={isAuthor}
          onClear={handleClear}
        />

       <EditorContainer
  editorRef={editorRef}
  language={roomData?.language}
  onReady={() => setEditorReady(true)}
/>
      </main>

      <div className="hidden md:flex flex-col h-full w-[320px] min-h-0">
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