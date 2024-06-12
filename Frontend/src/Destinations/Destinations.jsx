/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Destination from '../components/Destination'

function Destinations() {
  return (
    <>
        <Navbar />
        <div 
          className="min-h-screen"
        >
            <Destination />
        </div>
        <Footer />
    </>
  )
}

export default Destinations
