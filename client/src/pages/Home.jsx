import React from 'react'
import Hero from '../components/Hero.jsx'


const Home = ({ openModal }) => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center animate-in fade-in duration-700">
            <Hero openModal={openModal} />
        </div>
    )
}

export default Home