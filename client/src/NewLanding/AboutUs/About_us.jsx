import React, { useRef, useEffect } from 'react'
import Section1 from './Section1'
import Footer from '../Layout/Footer';
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'
import { useLocation } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import Header from '../../WebApp/Components/Pages/Layout/Header';
AOS.init();


const About_us = () => {

  const visionMissionRef = useRef(null);
  const roadmapRef = useRef(null);
  const tokenomicsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const sectionMap = {
      "#vision-mission": visionMissionRef,
      "#roadmap": roadmapRef,
      "#tokenomics": tokenomicsRef,
    };

    if (sectionMap[location.hash]) {
      sectionMap[location.hash].current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);
  


  return (
    <div className='w-full h-full bg-black text-white '>
    <Header/>
    <div  ref={visionMissionRef} id="vision-mission"  className='w-[90%] max-w-7xl mx-auto '>
    <Section1/>
    </div>
    <div className='w-[100%] max-w-7xl mx-auto '>
    <Section2/>
    </div>
    <div ref={roadmapRef} id="roadmap" className='w-[95%] max-w-7xl mx-auto '>
    <Section3/>
    </div>
    <div className='w-[90%] max-w-7xl mx-auto '>
    <Section4/>
    </div>
    <div ref={tokenomicsRef} id="tokenomics" className='w-[90%] max-w-7xl mx-auto '>
    <Section5/>
    </div>
    <Footer/>
    </div>
   
  )
}

export default About_us