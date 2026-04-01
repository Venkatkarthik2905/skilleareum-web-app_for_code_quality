import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Section5 = () => {
  const { t } = useTranslation('landing');
  return (
    <div>

    <div className='lg:w-[90%] mx-auto font-gilroy py-20 flex md:flex-row flex-col justify-start gap-5 lg:gap-10 '> 
    <div className='md:w-[40%] mx-auto relative overflow-hidden flex justify-center items-center'>
        <div className='w-full h-full absolute top-0 '>
            <div className='w-44 mx-auto h-10 absolute top-0 left-0 right-0 opacity-60 bg-[#727272] rounded-full '></div>
            <div className=' w-20 h-16 absolute top-10 -right-10 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className=' w-7 h-24 absolute top-16 -left-3 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className='w-44 mx-auto h-10 absolute bottom-0 left-0 right-0 opacity-60 bg-[#3055E3] rounded-full '></div>
        </div>
         <div className='w-full h-full flex justify-center items-center bg-[#8989890D] border border-white/5 rounded-2xl backdrop-blur-3xl p-5 '>
        <img src="../assets/gamecontroller.png" className="md:w-9/12 w-6/12" />
        </div> 
        </div>

        <div className=' md:w-[50%] mx-auto '>
        <div className=' mt-3 flex flex-col justify-start items-start'>
            <p className=' md:text-6xl text-4xl font-medium  ' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF,#FFFFFF)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.tasks.title1')} 
            </p>
            <div className='flex items-end'>
            <p className='mt-2 md:text-6xl text-4xl font-medium '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #FFFFFF,#FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.tasks.title2')}</p>
            
          </div>
          <p className='mt-2 text-2xl font-medium '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF,#FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.tasks.subtitle')}</p>
        </div>

        <div className=' mt-5 w-[90%] '>
            <p className=' leading-7 font-light text-sm '>{t('section5.tasks.desc')} <span className=' font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.tasks.games.spin')}</span>
          <span className=' font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.tasks.games.missing')}</span> <span className=' font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.tasks.games.jumble')}</span> <span className=' font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.tasks.games.match')}</span><span className=' font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}> {t('section5.tasks.games.memory')} </span></p>

             <div className=' mt-5 '>
             <a href="/home" target="_blank">      <button className=' font-semibold text-sm flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full '>
                        {t('section5.tasks.cta')}<span className=' w-5 h-5 border border-white rounded-full flex justify-center items-center -rotate-45 text-sm '><FontAwesomeIcon icon={faArrowRight} size='sm' /></span>
                        </button></a>
                    </div>
        </div>
        </div>
    </div>

    <div className='lg:w-[90%] mx-auto font-gilroy py-20 flex flex-col md:flex-row-reverse justify-start gap-5 lg:gap-10 '> 
    <div data-aos="fade-right" data-aos-duration="2000" className='md:w-[40%] mx-auto relative overflow-hidden flex justify-center items-center'>
        <div className='w-full h-full absolute top-0 '>
            <div className='w-44 mx-auto h-10 absolute top-0 left-0 right-0 opacity-60 bg-[#727272] rounded-full '></div>
            <div className=' w-20 h-16 absolute top-10 -right-10 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className=' w-7 h-24 absolute top-16 -left-3 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className='w-44 mx-auto h-10 absolute bottom-0 left-0 right-0 opacity-60 bg-[#3055E3] rounded-full '></div>
        
        </div>
         <div className='w-full h-full flex justify-center items-center bg-[#8989890D] border border-white/5 rounded-2xl backdrop-blur-3xl p-5 '>
        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/aimage.svg" className="md:w-9/12 w-6/12" />
        </div> 
        </div>

        <div data-aos="fade-up" data-aos-duration="2000" className=' md:w-[50%] mx-auto '>
        <div className=' mt-7 flex flex-col justify-start items-start'>
            <p className=' md:text-6xl text-4xl font-medium  ' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF,#FFFFFF)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.skills.title1')}  
            </p>
            <p className='mt-2 md:text-6xl text-4xl font-medium '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #FFFFFF,#FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.skills.title2')}</p>
        </div>

        <div className=' mt-5 w-[90%] '>
            <p className=' leading-7 font-light text-sm '>{t('section5.skills.desc1')} 
<br/><br/>
{t('section5.skills.desc2')}  </p>

             <div className=' mt-5 '>
             <a href="/home" target="_blank">   <button className=' font-semibold text-sm flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full '>
                        {t('section5.skills.cta')}<span className=' w-5 h-5 border border-white rounded-full flex justify-center items-center -rotate-45 text-sm '><FontAwesomeIcon icon={faArrowRight} size='sm' /></span>
                        </button></a>
                    </div>
        </div>
        </div>
    </div>

    <div className='lg:w-[90%] mx-auto font-gilroy py-20 flex md:flex-row flex-col justify-start gap-5 lg:gap-10 '> 
    <div data-aos="fade-right" data-aos-duration="2000" className='md:w-[40%] mx-auto relative overflow-hidden flex justify-center items-center'>
        <div className='w-full h-full absolute top-0 '>
            <div className='w-44 mx-auto h-10 absolute top-0 left-0 right-0 opacity-60 bg-[#727272] rounded-full '></div>
            <div className=' w-20 h-16 absolute top-10 -right-10 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className=' w-7 h-24 absolute top-16 -left-3 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className='w-44 mx-auto h-10 absolute bottom-0 left-0 right-0 opacity-60 bg-[#3055E3] rounded-full '></div>
        
        </div>
         <div className='w-full h-full flex justify-center items-center bg-[#8989890D] border border-white/5 rounded-2xl backdrop-blur-3xl p-5 '>
        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/premiumtrophy.svg" className="" />
        </div> 
        </div>

        <div data-aos="fade-up" data-aos-duration="2000" className=' md:w-[50%] mx-auto '>
        <div className=' mt-3 flex flex-col justify-start items-start'>
            <p className=' md:text-6xl text-4xl font-medium  ' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF,#FFFFFF)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.rewards.title1')}   
            </p>
            <p className='mt-2 md:text-6xl text-4xl font-medium '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #FFFFFF,#FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.rewards.title2')}</p>
        </div>

        <div className=' mt-5 w-[90%] '>
            <p className=' leading-7 font-light text-sm '>{t('section5.rewards.desc1')}   
<br/><br/>
{t('section5.rewards.desc2')}  </p>

             <div className=' mt-5 '>
             <a href="/home" target="_blank">     <button className=' font-semibold text-sm flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full '>
                        {t('section5.rewards.cta')}<span className=' w-5 h-5 border border-white rounded-full flex justify-center items-center -rotate-45 text-sm '><FontAwesomeIcon icon={faArrowRight} size='sm' /></span>
                        </button></a>
                    </div>
        </div>
        </div>
    </div>

    <div className='lg:w-[90%] mx-auto font-gilroy py-20 flex flex-col md:flex-row-reverse justify-start gap-5 lg:gap-10 '> 
    <div data-aos="fade-right" data-aos-duration="2000" className='md:w-[40%] mx-auto relative overflow-hidden flex justify-center items-center'>
        <div className='w-full h-full absolute top-0 '>
            <div className='w-44 mx-auto h-10 absolute top-0 left-0 right-0 opacity-60 bg-[#727272] rounded-full '></div>
            <div className=' w-20 h-16 absolute top-10 -right-10 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className=' w-7 h-24 absolute top-16 -left-3 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className='w-44 mx-auto h-10 absolute bottom-0 left-0 right-0 opacity-60 bg-[#3055E3] rounded-full '></div>
        
        </div>
         <div className='w-full h-full flex justify-center items-center bg-[#8989890D] border border-white/5 rounded-2xl backdrop-blur-3xl '>
        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/handshake.svg" className="" />
        </div> 
        </div>

        <div data-aos="fade-up" data-aos-duration="2000" className=' md:w-[50%] mx-auto '>
        <div className=' mt-3 flex flex-col justify-start items-start'>
            <p className=' text-4xl md:text-6xl font-medium  ' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF,#FFFFFF)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.referral.title1')} </p>
            <p className='mt-2 text-4xl md:text-6xl font-medium '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #FFFFFF,#FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.referral.title2')}</p>
        </div>

        <div className=' mt-5 w-[90%] '>
            <p className=' leading-7 font-light text-sm '>{t('section5.referral.desc1')}  
<br/><br/>
{t('section5.referral.desc2')} </p>

             <div className=' mt-5 '>
             <a href="/home" target="_blank">   <button className=' font-semibold text-sm flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full '>
                        {t('section5.referral.cta')}<span className=' w-5 h-5 border border-white rounded-full flex justify-center items-center -rotate-45 text-sm '><FontAwesomeIcon icon={faArrowRight} size='sm' /></span>
                        </button></a>
                    </div>
        </div>
        </div>
    </div>

    </div>
  )
}

export default Section5