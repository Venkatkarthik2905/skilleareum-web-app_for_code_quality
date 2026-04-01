import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Section2 = () => {
  return (
    <div className=' font-montserrat py-20 '>
       <div className=' flex  justify-center'>
        <h1 className=' leading-10 text-2xl sm:text-4xl lg:text-5xl text-center font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>
         Invest in the Future by Learning AI 
        </h1>
        </div>
        <div className='md:w-1/2  md:hidden block '>
          <div className=' flex flex-col items-center '>
          <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif"
                        className=" w-5/12 translate-y-20 "
                      />

          <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/tile.png' />
          </div>
          </div>

        <div className='lg:w-[90%] mx-auto flex md:flex-row flex-col justify-center items-center font-poppins '>
          <div  data-aos="fade-right"
     data-aos-duration="2000" className=' md:w-1/2 '>
          <div className=' mt-14 '>
          <p className=' text-[#F1F1F1] '>At Skilleareum, investment starts with learning. To access future SKLRM token rewards, you must first engage in our AI learning journey.<br/> <br/>   By participating in AI-powered challenges, completing quests, and getting validated through our platform, you earn Skill Points and unlock investment opportunities in SKLRM tokens — positioning yourself for future success in the evolving Web3 economy. </p>
        </div>

     

        <div data-aos="fade-right"
     data-aos-duration="3000" className=' mt-10 '>
        <a href="/home" target="_blank"> <button className=' font-medium flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full '>
                    Invest Now<span className=' w-5 h-5 border border-white rounded-full flex justify-center items-center -rotate-45 text-sm '><FontAwesomeIcon icon={faArrowRight} /></span>
                    </button></a>
                </div>
          </div>

          <div data-aos="fade-up"
     data-aos-duration="2000" className=' md:w-1/2  md:block hidden '>
          <div className=' flex flex-col items-center '>
          <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif"
                        className=" w-5/12 translate-y-20 "
                      />

          <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/tile.png' />
          </div>
          </div>
        </div>
       

    </div>
  )
}

export default Section2