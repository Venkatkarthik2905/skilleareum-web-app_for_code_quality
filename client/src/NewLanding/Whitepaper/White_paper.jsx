import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Footer from '../Layout/Footer';
import { useNavigate } from 'react-router-dom';
import Header from '../../WebApp/Components/Pages/Layout/Header';


export default function White_paper() {
   const { t } = useTranslation('whitepaper');

   const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-black'>
      <Header/>
      <div className='py-10 font-gilroy'>
        <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/whitepaper.svg' className='mx-auto'></img>
        <div className='flex justify-center text-center'>
          <h1 className='text-transparent bg-gradient-to-r from-[#0285FF] via-white to-[#1EEF32] bg-clip-text text-xl md:text-4xl lg:text-6xl'>{t('title')} <br />
            <span className='text-5xl md:text-8xl lg:text-[140px] font-medium '>{t('whitepaper')}</span>
          </h1>
        </div>
        <div className='flex md:flex-row flex-col justify-center gap-3 md:gap-5 lg:gap-7 lg:w-[75%] mx-auto mt-5 text-xl'>
          <div className='flex justify-center text-center'>
            <h1 className='text-transparent bg-gradient-to-r from-[#0285FF] via-white to-[#1EEF32] bg-clip-text'> {t('missionVision')}
            </h1>
          </div>
          <div className='flex justify-center items-center gap-2 text-center'>
            <div className='w-2 h-2 rounded bg-[#0285FF]'></div>
            <h1 className='text-transparent bg-gradient-to-r from-[#0285FF] via-white to-[#1EEF32] bg-clip-text'>
              {t('smartMinting')}
            </h1>
          </div>
          <div className='flex justify-center items-center gap-2 text-center'>
            <div className='w-2 h-2 rounded bg-[#1EEF32]'></div>  
            <h1 className='text-transparent bg-gradient-to-r from-[#0285FF] via-white to-[#1EEF32] bg-clip-text'> {t('tokenomics')}
            </h1>
          </div>
          <div className='flex justify-center items-center gap-2 text-center'>
            <div className='w-2 h-2 rounded bg-[#0285FF]'></div>
            <h1 className='text-transparent bg-gradient-to-r from-[#0285FF] via-white to-[#1EEF32] bg-clip-text'> {t('revenueModel')}
            </h1>
          </div>
        </div>
        <div className='flex justify-center mt-10'>         
          <button onClick={() => navigate("/Whitepaperpdf")} className='px-6 py-2 rounded-full text-white bg-gradient-to-r from-[#0285FF] to-[#1EEF32] flex items-center gap-3 font-semibold'>{t('viewWhitepaper')} <FontAwesomeIcon icon={faArrowRight} className='border text-xs rounded-full p-1'/></button>
        </div>
      
      </div>
  
      <Footer/>
    </div>
  )
}
