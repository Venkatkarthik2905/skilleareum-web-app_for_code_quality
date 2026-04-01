import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Section4 = () => {
  const { t } = useTranslation('community');
  const navigate = useNavigate();


  return (
    <div className=' py-20 font-gilroy '>
       
    <div className=' flex md:flex-row flex-col justify-between items-center md:gap-0 gap-10 '>

     <div className=' md:w-[40%] '>
       <div className=' flex  justify-center'>
       <h1 className=' leading-10 text-2xl sm:text-4xl lg:text-5xl text-left font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}> {t('section4.title')}</h1>
       </div>
       <div className=' mt-10 '>
        <p>{t('section4.q1')} </p>

<p className='mt-5'>{t('section4.p1')} </p>

<p className='mt-5'>{t('section4.p2')} </p>
       </div>

       <div className=' mt-10 '>
         <button onClick={() => navigate("/Contactus")} className=' font-semibold flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full '>
         {t('section4.stayConnected')}<span className=' w-5 h-5 border border-white rounded-full flex justify-center items-center -rotate-45 text-sm '><FontAwesomeIcon icon={faArrowRight} /></span>
        </button>
       </div>
     </div>

     <div className=' md:w-[50%] relative '>
      <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/community.svg" />
     </div>

     </div>
    </div>
  )
}

export default Section4