import { faArrowRight, faBoltLightning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Section6 = () => {
  const { t } = useTranslation('landing');
  return (
    <div className=' font-gilroy relative py-20'>
      <div data-aos="fade-down" data-aos-duration="1500" className='flex flex-col items-center'>
        <h1 className=' leading-10 text-2xl sm:text-4xl lg:text-5xl text-center tracking-wide font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>
           {t('section6.title')}</h1>
            {/* <p className='mt-3 text-2xl text-center font-semibold'  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>Life Time Returns & Upgrade Plan Any Time</p> */}
        
         </div>

         <div className=' lg:block hidden absolute left-0 bottom-56 backdrop-blur-lg bg-[#0285FF] h-[10rem] rounded-full w-1/2 blur-[200px] z-0 '></div>
         <div className=' lg:block hidden absolute right-0 bottom-56 backdrop-blur-lg bg-[#1EEF32] h-[10rem] rounded-full w-1/2 blur-[200px] z-0 '></div>

         <div  data-aos="fade-up" data-aos-duration="2000" className='mt-10 flex justify-center items-center z-20'>
            <div className='w-full max-w-lg bg-black rounded-3xl border-4 border-white z-20'>
              <div className='relative h-[70%]'>
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Maskgroup1.png' className=' rounded-3xl '/>
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/aigenesis.svg' className=' absolute top-0 w-10/12 mx-auto left-0 right-0 rounded-3xl '/>

              </div>

             <div className='flex flex-col justify-center items-center gap-5 -translate-y-10 '>
              <div className='flex justify-center'>
                <p  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }} className=' text-5xl font-semibold text-center '>{t('section6.genesisTitle')}</p>
              </div>

              <div>
                <div className=' w-12 h-12 border-2 border-white rounded-full flex justify-center items-center '>
                  <FontAwesomeIcon icon={faBoltLightning} className=' text-[#1EEF32] text-xl' />
                </div>
              </div>

               <div className=' '>
               <a href="/home" target="_blank">    <button className='text-sm font-semibold flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full '>
                          {t('section6.subscriptionPrice')}<span className=' w-5 h-5 border border-white rounded-full flex justify-center items-center -rotate-45 text-sm '><FontAwesomeIcon icon={faArrowRight} className='text-sm' /></span>
                          </button></a>
                      </div>
              </div>
            </div>
         </div>
      
    </div>
  )
}

export default Section6