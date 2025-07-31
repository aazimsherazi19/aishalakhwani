import React from 'react'
import Productsfile from './Productsfile'
import Features from './Features'
import Hero from './Slider/Hero'
import NumberCounter from './Counter/NumberCounter'
import Navbar from './Navbar/Navbar'
import Middlesection from './Middlesection'
import Howitworks from './Howitworks'
import Achievements from './Achievements'
import Testimonial from './Testimonial'
import Footer from './Footer'

const Home = () => {
  return (
   <>
   <Navbar/>
   <Hero/>
   <NumberCounter/>
   <Productsfile/>
   <Features/>
   <Middlesection/>
   <Howitworks/>
   <Achievements/>
   <Testimonial/>
   <Footer/>
   </>
  )
}

export default Home
