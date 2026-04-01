import React, { useRef, useEffect, useState } from 'react'
import Section1 from './Section1'
import Footer from '../Layout/Footer'
import Section2 from './Section2'
import Section3 from './Section3'
import Section5 from './Section5'
import Section6 from './Section6'
import Section7 from './Section7'
import Section4 from './Section4'
import Section8 from './Section8'
import Section9 from './Section9'
import { useLocation } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import Section10 from './Section10'
import Header from '../../WebApp/Components/Pages/Layout/Header';


AOS.init();

const Landing = () => {

  const futureBenefitsRef = useRef(null);
  const learnEarnRef = useRef(null);
  const featuresRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const sectionMap = {
      "#future-benefits": futureBenefitsRef,
      "#learn-earn": learnEarnRef,
      "#features": featuresRef,
    };

    if (sectionMap[location.hash]) {
      sectionMap[location.hash].current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);


  return (
    <div className='w-full h-full bg-black text-white '>
    <Header/>
    <div className='w-[90%] max-w-7xl mx-auto '>
    <Section1/>
    </div>
    <div ref={learnEarnRef} id="learn-earn"  className='w-[90%] max-w-7xl mx-auto '>
    <Section2/>
    </div>
    <div className='w-[95%] max-w-7xl mx-auto '>
    <Section10/>
    </div>
    <div ref={futureBenefitsRef} id="future-benefits" className='w-[90%] max-w-7xl mx-auto '>
    <Section3/>
    </div>
    <div className='w-full  max-w-7xl py-24 mx-auto'>
    <Section4/>
    </div>
    <div ref={featuresRef} id="features" className='w-[90%] max-w-7xl mx-auto '>
    <Section5/>
    </div>
    <div className='w-[90%] max-w-7xl mx-auto '>
    <Section6/>
    </div>
    <div className=' w-[95%] md:w-[90%] max-w-7xl mx-auto '>
    <Section7/>
    </div>
    <div className='w-[95%] max-w-7xl mx-auto '>
    <Section8/>
    </div>
    <div className='w-[90%] max-w-7xl mx-auto '>
    <Section9/>
    </div>
    <Footer/>
    </div>
  )
}

export default Landing