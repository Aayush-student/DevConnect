import React from 'react'
import Hero from '../components/Hero'

 const Home = ({isModalOpen, setIsModalOpen}) => {
  return (
    <div className='animate-page page-container'>
      <Hero isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  )
}

export default Home
