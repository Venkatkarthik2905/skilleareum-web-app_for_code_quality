import React, { useRef, useEffect } from 'react'
import Section1 from './Section1'
import Footer from '../Layout/Footer';
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'
import Section6 from './Section6';
import { useLocation } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import Header from '../../WebApp/Components/Pages/Layout/Header';
AOS.init();


const Community = () => {

  const exploreRef = useRef(null);
  const partnershipRef = useRef(null);
  const affiliateRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const sectionMap = {
      "#explore-section": exploreRef,
      "#partnership": partnershipRef,
      "#affiliate-program": affiliateRef,
    };

    if (sectionMap[location.hash]) {
      setTimeout(() => {
        sectionMap[location.hash]?.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); 
    }
  }, [location]);


  return (
    <div>
    <div className='w-full h-full bg-black text-white '>
      <Header/>
    <div ref={exploreRef} id="explore-section" className='w-[95%] max-w-7xl mx-auto '>
    <Section1/>
    </div>
    <div className='w-[90%] max-w-7xl mx-auto '>
    <Section2/>
    </div>
    <div ref={partnershipRef} id="partnership"  className='w-[95%] max-w-7xl mx-auto '>
    <Section3/>
    </div>
    <div className='w-[90%] max-w-7xl mx-auto '>
    <Section4/>
    </div>
    <div ref={affiliateRef} id="affiliate-program" className='w-[95%] max-w-7xl mx-auto '>
    <Section5/>
    </div>
    <div className='w-[95%] max-w-7xl mx-auto '>
    <Section6/>
    </div>
    <Footer/>
    </div>
    </div>
  )
}

export default Community