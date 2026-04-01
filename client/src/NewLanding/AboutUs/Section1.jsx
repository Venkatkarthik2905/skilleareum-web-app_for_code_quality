import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Section1 = () => {
  const { t } = useTranslation('about');
  return (
    <div className=' font-poppins py-20 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-5 h-full '>
        <div data-aos="fade-right"  data-aos-duration="1500" className='  flex flex-col justify-between rounded-lg border border-white p-5 overflow-hidden h-full md:h-[31rem] '>
          <div  className='flex flex-col justify-center items-center'>
            <p className=' text-3xl font-semibold text-center ' style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32)"
              }}>{t('section1.vision.title')}</p>
              <p className='text-[#E0E0E0] mt-5 font-poppins leading-7 '>{t('section1.vision.desc1')}<span className=' font-bold ' style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32)"
              }}>{t('section1.vision.highlight1')}</span>{t('section1.vision.desc2')}<span className='font-bold' style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32)"
              }}>{t('section1.vision.highlight2')}</span>{t('section1.vision.desc3')}</p>
          </div>

          
          <div className=' flex justify-between items-center '>
          <div className=' flex flex-col md:mt-0 mt-24 sm:px-10 justify-center items-center gap-3'>
          <div className=' bg-gradient-to-b from-[#0285FF] to-[#1EEF32] rounded-full w-20 h-20 sm:w-24 sm:h-24 p-0.5 '>
            <div className=' w-full h-full rounded-full bg-black flex justify-center items-center '>
            <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif' className='sm:w-16 w-12 '/>
          </div>
          </div>
          <span className='font-semibold uppercase ' style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32)"
              }}>Skilleareum</span>
          {/* <div className='w-full pb-10 mt-3 '>
            <p className=' font-semibold text-center uppercase   '>Our Digital Fingerprint</p>
          </div> */}
          </div>

          <div className='translate-x-16 md:translate-x-28 md:-translate-y-7 translate-y-7 '>
            <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/fingerprint.svg' className='w-72 ' />
          </div>
        </div>


        </div>

        <div className='  '>
          <div  data-aos="fade-up"  data-aos-duration="2000" className=' flex md:flex-row flex-col rounded-xl bg-white text-black p-5'>
          <div   className='md:w-[60%] '>
            <p className=' font-semibold text-lg uppercase '>{t('section1.mission.title')}</p>
            <p className='   mt-3 leading-6 '>{t('section1.mission.desc')} </p>
            <a href="https://t.me/SKLRM_bot" target="_blank"><p className=' text-xs font-medium mt-2' style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )"
            }}>{t('section1.mission.explore')}<span><FontAwesomeIcon icon={ faChevronRight } className=' text-[#1EEF32] text-xs'/></span></p></a>
            
          </div>
          <div className='md:w-[40%] '>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif" className=' '/>
          </div>
          </div>

         <div  className='mt-5 grid grid-cols-1 md:grid-cols-2  gap-5'>
                    <div data-aos="fade-up"  data-aos-duration="1500" className=' bg-gradient-to-b from-[#0285FF] to-[#1EEF32] flex justify-center items-center h-full rounded-xl w-full  p-10 '>
          <p className=' text-3xl font-semibold text-center '>{t('section1.ecosystem')}</p>
          </div>

          <div data-aos="fade-right"  data-aos-duration="2000" className='w-full mx-auto relative'>
          <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/aboutusglass.png" className='w-full rounded-xl md:w-11/12 ' />
          <div className=" absolute top-5 left-5 ">
            <p className='w-[70%] text-center text-xl font-semibold '>{t('section1.incubating.title')}</p>
            <a href="https://t.me/SKLRM_bot" target="_blank">  <p className='w-[50%] text-sm md:text-xs text-center mt-1'>{t('section1.incubating.explore')} <span><FontAwesomeIcon icon={ faChevronRight } className=' text-[#1EEF32] text-sm md:text-xs'/></span></p></a>
          </div>
          </div>
          </div>


        </div>
    </div>
  )
}

export default Section1