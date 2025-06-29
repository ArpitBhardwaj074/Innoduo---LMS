import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const About = () => {
  return (
    <>
        <Navbar />
        <div className='h-screen'>
            <center>
                <h2 className='text-3xl text-pink-500  my-[5%] w-screen'>About Us</h2>
                <p>Innoduo is a Learning Management System with support for a Virtual Lab.</p>
            </center>
        </div>
        <Footer />
    </>
  )
}

export default About