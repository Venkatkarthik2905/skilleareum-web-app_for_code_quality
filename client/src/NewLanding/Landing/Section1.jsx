import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { useTranslation } from 'react-i18next';
import "../../App.css"

const Section1 = () => {
  const { t } = useTranslation('landing');
  return (
    <div className='pt-20  px-4 sm:px-6 lg:px-16 font-gilroy relative'>
       <div className='w-[100%] mx-auto flex justify-between items-center absolute -top-20 left-0 right-0'>
          <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/p1.svg' className=' lg:block hidden scale-x-[-1] w-4/12 -translate-x-16 '/>
          <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/p1.svg' className='  lg:block hidden w-4/12 translate-x-16 '  />
        </div>
      <div className='flex flex-col items-center  pt-20 '>
     
        <div className=''>
        <h1 className=' leading-8 text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide font-medium '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>
            {t('title')}
            <br/>
            <span className=' text-2xl sm:text-3xl lg:text-2xl'  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('subtitle')}</span> 
        </h1>
        <p className=' mt-3 text-center '>{t('description')}  </p>
         </div>
      

        <div className=' mt-10 '>
        <a href="/home" target="_blank">  <button className=' font-semibold flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full '>
            {t('getStarted')}<span className=' w-5 h-5 border border-white rounded-full flex justify-center items-center -rotate-45 text-sm '><FontAwesomeIcon icon={faArrowRight} /></span>
            </button></a>
        </div>

        <div  data-aos="fade-up" className=' relative mt-10 '>
           <div className=' flex sm:flex-row flex-col justify-around grp '>
           <div  className=' flex flex-row lg:justify-t justify-center translate-x-5 '>
            {/* learn */}
            <div data-aos="fade-right" data-aos-duration="1000" className="w-40 h-48  relative ">
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/learn.svg' alt='Learn' className="w-full h-full object-cover" />
                </div>
                {/* earn */}
                <div data-aos="fade-right" data-aos-duration="2000" className="w-40 h-48  relative sm:mt-16">
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/earn.svg' alt='Earn' className="w-full h-full object-cover" />
                </div>
                </div>
                <div className='flex flex-col items-center justify-center mt-14 '>
                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif" className=" sm:w-12/12 z-20 "/>
                <div className='w-full sm:hidden block -translate-y-16 '>
                   <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Group.svg" className='sm:w-1/2 mx-auto z-0' />
                </div>
               </div>
                <div className=' flex flex-row lg:justify-t justify-center -translate-x-5'>
               {/* grow */}
                <div data-aos="fade-up" data-aos-duration="1000"  className="w-40 h-48  relative sm:mt-16">
  <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/grow.svg" alt="Repeat" className="w-full h-full object-cover" />

  <div className="w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  {/* <div className="flex items-end gap-1">
      <div className="w-1.5 h-3 bg-white animate-signal-1"></div>
      <div className="w-1.5 h-5 bg-white animate-signal-2"></div>
      <div className="w-1.5 h-7 bg-white animate-signal-3"></div>
    </div> */}
  <svg width="30" height="30" viewBox="0 0 47 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 50V31.25H9.375V50H0ZM18.75 50V15.625H28.125V50H18.75ZM37.5 50V0H46.875V50H37.5Z" fill="white"/>
</svg>
  </div>
                 </div>
             {/* repeat */}
                <div data-aos="fade-up" data-aos-duration="2000"  className="w-40 h-48  relative ">
  <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/repeat.svg" alt="Repeat" className="w-full h-full object-cover" />
  <img 
    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/section26.svg" 
    alt="Overlay" 
    className="w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  />
              </div>
</div>
           </div>
           <div className='w-full sm:block hidden -translate-y-40'>
           {/* <div className='concircle'>
                    <span className=''></span>
                  </div> */}

             <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Group.svg" className='w-[70%] mx-auto z-0' />  
                </div>
        </div>
      </div>
    </div>
  )
}

export default Section1