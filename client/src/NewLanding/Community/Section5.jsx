import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Section5 = () => {

  const { t } = useTranslation(['community', 'landing']);
  const navigate = useNavigate();

  return (
    <div className=' py-20 font-gilroy '>
      <div className='w-[95%] mx-auto -translate-y-7 relative overflow-hidden flex justify-between items-center rounded-2xl'>
              <div className='w-full h-full absolute top-0 rounded-2xl'>
                  <div className='w-[80%] mx-auto h-10 absolute top-0 left-0 right-0 opacity-60 bg-[#727272] rounded-full '></div>
                  <div className=' w-20 h-16 absolute top-10 -right-10 bg-[#00BA34] opacity-55 rounded-full '></div>
                  <div className=' w-7 h-24 absolute top-16 -left-3 bg-[#00BA34] opacity-55 rounded-full '></div>
                  {/* <div className='w-44 mx-auto h-10 absolute bottom-0 left-0 right-0 opacity-60 bg-[#3055E3] rounded-full '></div> */}
              
              </div>
               <div className='w-full h-full relative flex flex-col justify-center items-center bg-[#8989890D] border border-white/5 rounded-2xl backdrop-blur-3xl px-5 pt-14 pb-40 '>
               <div>
               <div className=' flex  justify-center'>
                    <h1 className=' leading-10 text-2xl sm:text-3xl lg:text-4xl text-center font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}> {t('section5.title')}</h1>
                </div>
                <div className=' mt-3'>
                  <p className=' text-sm text-center '>{t('section5.description')}{" "}<span style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('landing:section1.title')}</span> </p>
                </div>
                </div>

                <div className='sm:mt-44 mt-14 relative '>
                 
                <div className='sm:mt-0 mb-32 sm:absolute md:top-0 lg:right-20 right-0 flex flex-col h-full sm:gap-14 gap-7 '>
                    <div className=' bg-gradient-to-r from-black to-white/70 rounded-full p-[1px] '>
                       <div className=' bg-black rounded-full py-2 lg:px-5 px-3 flex justify-center '> 
                        <p className=' font-medium text-sm ' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}> {t('section5.features.highGrowth')}</p> </div>
                    </div>
                    <div className=' lg:translate-x-16 bg-gradient-to-r from-black to-white/70 rounded-full p-[1px] '>
                       <div className=' bg-black rounded-full py-2 lg:px-5 px-3 flex justify-center '> 
                        <p className=' font-medium text-sm ' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.features.unlimited')} </p> </div>
                    </div>
                    <div className=' bg-gradient-to-r from-black to-white/70 rounded-full p-[1px] '>
                       <div className=' bg-black rounded-full py-2 lg:px-5 px-3 flex justify-center '> 
                        <p className=' font-medium text-sm ' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.features.impact')} </p> </div>
                    </div>
                  </div>


                <div className=' lg:w-[65%] sm:w-[85%] w-full mx-auto flex flex-col justify-center items-center relative h-full '>
                   <div className=' absolute -top-24 lg:left-20 sm:left-14 left-0 rounded-full lg:w-80 lg:h-80 w-64 h-64 bg-[#111111] flex justify-center items-center  '>
                   <div className=' lg:w-52 lg:h-52 w-40 h-40 rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '></div>

                   </div>
                   <div className='lg:w-[45%] sm:w-[37%] w-[80%] mx-auto z-30 flex flex-col items-center rounded-xl bg-[#FFFFFF] pt-10 pb-5'>
                   <img
            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
            className=" z-30 "
          />
                    <div className=' w-24 h-3 bg-black/60 rounded-full blur-md mx-auto '></div>
                   <button onClick={() => navigate("/Contactus")} className=' md:translate-x-36 md:-translate-y-3 font-semibold flex items-center gap-2 px-5 py-1.5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full '>
                   {t('section5.becomeAffiliate')} <span className=' w-5 h-5 border border-white rounded-full flex justify-center items-center -rotate-45 text-xs lg:text-sm '><FontAwesomeIcon icon={faArrowRight} /></span>
                              </button>
                  
                   <div>

                   </div>
                   
                   </div>
                   <div className=' absolute -bottom-28 right-36 rounded-full lg:w-64 lg:h-64 w-48 h-48 bg-[#111111] flex justify-center items-center  '>
                   <div className=' lg:w-40 lg:h-40 w-28 h-28 rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32] '></div>
                   </div>
                </div>

                  <div className='sm:mt-0 mt-32 sm:absolute lg:-bottom-10 -bottom-20 lg:left-0 flex flex-col justify-end h-full sm:gap-14 gap-7'>
                    <div className=' lg:translate-x-16 bg-gradient-to-r from-black to-white rounded-full p-[1px] '>
                       <div className=' bg-black rounded-full py-2 plg:x-5  px-3flex justify-center '> 
                        <p className=' font-medium text-sm text-center ' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.features.milestone')}</p> </div>
                    </div>
                    <div className=' bg-gradient-to-r from-black to-white rounded-full p-[1px] '>
                       <div className=' bg-black rounded-full py-2 lg:px-5 px-3 flex justify-center '> 
                        <p className=' font-medium text-sm ' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.features.referral')}</p> </div>
                    </div>
                    <div className=' lg:translate-x-16 bg-gradient-to-r from-black to-white rounded-full p-[1px] '>
                       <div className=' bg-black rounded-full py-2 lg:px-5 px-3 flex justify-center '> 
                        <p className=' font-medium text-sm ' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}> {t('section5.features.subscription')} </p> </div>
                    </div>
                  </div>

                
                </div>
              </div> 
      
             
          </div>
    </div>
  )
}

export default Section5