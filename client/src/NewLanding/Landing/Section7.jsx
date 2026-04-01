import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Section7 = () => {
  const { t } = useTranslation('landing');
  return (
    <div className=' font-poppins relative py-20'>
      <div className='flex lg:flex-row flex-col items-center gap-20'>
        <div data-aos="fade-right" data-aos-duration="1500" className=' lg:w-1/2 flex gap-5 md:gap-10'>
        <div data-aos="fade-right" data-aos-duration="2500" className='w-1/2 flex flex-col gap-5'>
          <div className=' flex flex-col justify-center items-center'>
          <img
                loading="lazy"
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif"
                className="w-14 h-14 z-30 mx-auto "
              />
              <p style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32)"
              }} className=' font-zendots font-medium uppercase '>Skilleareum.ai</p>
          </div>

          <div className=' mx-auto mt-5 relative rounded-2xl overflow-hidden flex justify-center items-center'>
        <div className='w-full h-full absolute top-0 rounded-2xl'>
            <div className='w-44 mx-auto h-10 absolute top-0 left-0 right-0 opacity-60 bg-[#727272] rounded-full '></div>
            <div className=' w-20 h-16 absolute top-10 -right-10 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className=' w-7 h-24 absolute top-16 -left-3 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className='w-44 mx-auto h-10 absolute bottom-0 left-0 right-0 opacity-60 bg-[#3055E3] rounded-full '></div>
        
        </div>
         <div className='w-full h-full flex justify-center items-center bg-[#8989890D] border border-white/5 rounded-2xl backdrop-blur-2xl md:p-5 p-2 '>
         <img
            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
            className=" w-8/12 z-30 "
          />
        </div> 
        </div>

        <div className=' flex justify-end '>
            <div className=' border border-white rounded-xl py-3 sm:px-5 px-2'>
              <div className='flex flex-col justify-start text-sm sm:text-base '>
                <p  style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32)"
              }} className='text-lg font-bold text-left'>{t('section7.incentivizedGaming')} </p>

              </div>
              <div className='flex items-center gap-3 mt-5 overflow-hidden overflow-x-auto'>
              <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/ton_symbol.png" className=' w-5 '/>
              <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/HamsterCoin1.png" className=' w-5 '/>
              <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/dogs1.png" className=' w-5 '/>
              <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/images(1)-Photoroom1.png" className=' w-5 '/>
              <p style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32)"
              }} className='sm:text-xs text-[10px] font-semibold'>{t('section7.more')}</p>
              </div>
            </div>
        </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="3000" className=' w-1/2 '>
          <div className='sm:w-[85%] w-[100%] rounded-lg border border-white pb-3 pt-5 sm:px-4 px-2 '>
            <div className=' w-full flex items-center justify-between '>
            <p className=' sm:text-3xl text-lg font-bold ' style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32)"
              }}>2,000+</p>
            <FontAwesomeIcon icon={faArrowTrendUp} className='text-[#1EEF32]' />
            </div>
            <p className='text-xs font-medium text-[#97918B] '>{t('section7.earlyAdopters')}</p>
            <div className=' py-4 border-b border-[#1EEF32] '>
              <p className='text-xs font-medium text-[#97918B] '>{t('section7.adoptersDesc')}</p>
            </div>
            <div className='mt-2'>
              <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/profiles.png" className='w-full' />
            </div>
          </div>

          <div className=' bg-gradient-to-b from-[#0285FF] to-[#1EEF32] py-3 px-10 rounded-xl flex justify-center mt-5 '>
            <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/dashboard.png' />
          </div>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="1500" className='lg:w-1/2'>
            <div>
              <h2  style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32)"
              }} className=' font-semibold uppercase'>{t('section7.telegramApp')}</h2>
              <h1  style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32)"
              }} className=' md:text-5xl text-4xl font-semibold mt-2 '>SKILLEAREUM.AI</h1>
            </div>

            <div className='py-10'>
              <p className=' text-[#97918B] font-poppins sm:text-base text-sm '>{t('section7.telegramDesc')} </p>
            </div>
            <div>
            <a href="/home" target="_blank">  <button className=' uppercase font-semibold text-center bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full py-2 px-5 text-sm '>{t('section7.experienceNow')} </button></a>
              <p className=' text-[#97918B] font-poppins text-xs italic mt-3'>{t('section7.telegramFooter')}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Section7