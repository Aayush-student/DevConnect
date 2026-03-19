import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; 

import { AppContext } from "./context/AppContext.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateRoomModal from "./components/CreateRoomModal.jsx";
import LoginForm from "./components/Loginform.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import LiveRooms from "./pages/LiveRooms";
import AIHelper from "./pages/AIHelper";

const App = () => {
  const { showLogin, setShowLogin } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const closeAuth = () => {
    setShowLogin(false);
    setIsSignUp(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white font-sans">
      <Navbar setIsModalOpen={setIsModalOpen} />

      {showLogin && (
        isSignUp ? (
          <SignUpForm close={closeAuth} toggle={() => setIsSignUp(false)} />
        ) : (
          <LoginForm close={closeAuth} toggle={() => setIsSignUp(true)} />
        )
      )}

      {isModalOpen && (
        <CreateRoomModal onClose={() => setIsModalOpen(false)} />
      )}

      <main className="max-w-7xl mx-auto pt-24 px-6 pb-12">
        <Routes>
          <Route path="/" element={<Home openModal={() => setIsModalOpen(true)} />} />
          <Route path="/explore" element={<Explore openModal={() => setIsModalOpen(true)} />} />
          <Route path="/rooms/:roomId" element={<ProtectedRoute><LiveRooms /></ProtectedRoute>} />
          <Route path="/ai-helper" element={<ProtectedRoute><AIHelper /></ProtectedRoute>} />
          <Route path="*" element={<Home openModal={() => setIsModalOpen(true)} />} />
        </Routes>
      </main>

      <ToastContainer 
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  theme="dark"
  stacked 
  transition={Bounce}
/>
    </div>
  );
};

export default App;