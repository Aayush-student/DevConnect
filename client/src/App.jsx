import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LiveRooms from './pages/LiveRooms'; 
import Explore from './pages/Explore';
import AIHelper from './pages/AIHelper'
import Home from './pages/Home';        
import CreateRoomModal from './components/CreateRoomModal';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);

  const addRoom = (newRoom) => {
    setRooms((prev) => [...prev, newRoom]);
  };

  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-[#0B0E14] text-white">
        <Navbar />
        
        <main className="pt-24 px-6">
          <Routes>
            <Route path="/" element={<Home setIsModalOpen={setIsModalOpen}/>} />
            <Route path="/explore" element={<Explore rooms={rooms} setIsModalOpen={setIsModalOpen}/>} />
            <Route path="/rooms/:roomId" element={<LiveRooms rooms={rooms} />} />
            <Route path="/ai-helper" element={<AIHelper />} />
          </Routes>
        </main>

        {isModalOpen && (
          <CreateRoomModal 
            onClose={() => setIsModalOpen(false)} 
            addRoom={addRoom} 
          />
        )}
      </div>
    </Router>
  );
};

export default App;