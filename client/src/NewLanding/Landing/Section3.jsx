import React from 'react'
import { useTranslation } from 'react-i18next';

const Section3 = () => {
  const { t } = useTranslation('landing');
  return (
    <div className=' font-gilroy pt-14 '>
        <div data-aos="fade-right" data-aos-duration="1000" className=' flex justify-start '>
        <p className=' text-4xl font-semibold ' 
        style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}
        > {t('section3_title')} </p>
        </div>

        <div data-aos="fade-up" data-aos-duration="1500" className=' relative w-full '>
        <div  className='w-full flex sm:flex-row flex-col justify-center items-center mt-10'>

           <div className=' w-1/2 sm:block hidden'>
            <div className=' h-32 flex justify-center items-center '
          style={{ clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
            background: "radial-gradient(100% 100% at 100% 49.78%, #0285FF 0%, rgba(22, 35, 46, 0) 100%)"
           }}>
            <div style={{  border: "1px solid transparent",
  borderImage: "linear-gradient(to right, #0285FF, #1EEF32) 1",
  borderRadius: "8px"}} className=' flex items-center gap-3 text-sm lg:w-[65%]'>
    <div className='px-2 py-3 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '><p className=' font-semibold'>1.</p></div>
                <p className=' font-semibold pr-3'>{t('section3_benefits.1')}</p>
            </div>
          </div> 
          </div>

          <div className=' w-full sm:hidden block '>
            <div className='  flex justify-center items-center '
          style={{ background: "radial-gradient(100% 100% at 100% 49.78%, #0285FF 0%, rgba(22, 35, 46, 0) 100%)"
           }}>
            <div style={{  border: "1px solid transparent",
  borderImage: "linear-gradient(to right, #0285FF, #1EEF32) 1",
  borderRadius: "8px"}} className=' flex items-center gap-3 text-sm'>
    <div className='px-2 py-5 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '><p className=' font-semibold'>1.</p></div>
                <p className=' font-semibold pr-3'>{t('section3_benefits.1')}</p>
            </div>
          </div> 
          </div>

          <div className='w-1/2 sm:block hidden  '>
          
          <div className=' flex flex-col justify-center items-center h-64 '
          style={{ clipPath: "polygon(0 16%, 100% 16%, 100% 75%, 24% 75%, 0 100%)",
            background: "radial-gradient(100% 100% at 0% 100%, #0285FF 0%, rgba(22, 35, 46, 0) 100%)"
           }}>
             <div style={{  border: "1px solid transparent",
  borderImage: "linear-gradient(to right, #0285FF, #1EEF32) 1",
  borderRadius: "8px"}} className=' w-[80%] flex items-center gap-3 text-sm mb-5'>
    <div className='px-2 py-3 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '><p className=' font-semibold'>2.</p></div>
                <p className=' font-semibold pr-3'>{t('section3_benefits.2')}</p>
            </div>

            <div style={{  border: "1px solid transparent",
  borderImage: "linear-gradient(to right, #0285FF, #1EEF32) 1",
  borderRadius: "8px"}} className=' w-[80%] flex items-center gap-3 text-sm mb-5'>
    <div className='px-2 py-3 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '><p className=' font-semibold'>3.</p></div>
                <p className=' font-semibold pr-3'>{t('section3_benefits.3')}</p>
            </div>
          </div>

          
          <div className='  h-64  flex flex-col justify-center items-center gap-5'
          style={{ clipPath: "polygon(0 0, 26% 20%, 100% 19%, 100% 100%, 0 100%)",
            background: "radial-gradient(100% 100% at 0% 0%, #0285FF 0%, rgba(22, 35, 46, 0) 100%)"}}>
             <div style={{  border: "1px solid transparent",
              borderImage: "linear-gradient(to right, #0285FF, #1EEF32) 1",
              borderRadius: "8px"}} className=' flex items-center gap-3 text-sm  lg:w-[80%]'>
                <div className='px-2 py-3 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '><p className='font-semibold'>4.</p></div>
                <p className=' font-semibold pr-3'>{t('section3_benefits.4')}</p>
            </div>

            <div style={{  border: "1px solid transparent",
            borderImage: "linear-gradient(to right, #0285FF, #1EEF32) 1",
            borderRadius: "8px"}} className=' flex items-center gap-3 text-sm  lg:w-[80%]'>
              <div className='px-2 py-3 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '><p className=' font-semibold'>5.</p></div>
                <p className=' font-semibold pr-3'>{t('section3_benefits.5')}</p>
            </div>
          </div>
          </div>

          <div className=' sm:hidden block mt-5 '>
          
          <div className='  flex justify-center items-center '
          style={{ background: "radial-gradient(100% 100% at 100% 49.78%, #0285FF 0%, rgba(22, 35, 46, 0) 100%)"
           }}>
            <div style={{  border: "1px solid transparent",
  borderImage: "linear-gradient(to right, #0285FF, #1EEF32) 1",
  borderRadius: "8px"}} className=' flex items-center gap-3 text-sm'>
    <div className='px-2 py-5 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '><p className=' font-semibold'>2.</p></div>
                <p className=' font-semibold pr-3'>{t('section3_benefits.2')}</p>
            </div>
          </div> 

          <div className='  flex justify-center items-center mt-5'
          style={{ background: "radial-gradient(100% 100% at 100% 49.78%, #0285FF 0%, rgba(22, 35, 46, 0) 100%)"
           }}>
            <div style={{  border: "1px solid transparent",
  borderImage: "linear-gradient(to right, #0285FF, #1EEF32) 1",
  borderRadius: "8px"}} className=' flex items-center gap-3 text-sm'>
    <div className='px-2 py-5 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '><p className=' font-semibold'>3.</p></div>
                <p className=' font-semibold pr-3'>
                {t('section3_benefits.3')}</p>
            </div>
          </div> 

          <div className='  flex justify-center items-center mt-5'
          style={{ background: "radial-gradient(100% 100% at 100% 49.78%, #0285FF 0%, rgba(22, 35, 46, 0) 100%)"
           }}>
            <div style={{  border: "1px solid transparent",
  borderImage: "linear-gradient(to right, #0285FF, #1EEF32) 1",
  borderRadius: "8px"}} className=' flex items-center gap-3 text-sm'>
    <div className='px-2 py-5 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '><p className=' font-semibold'>4.</p></div>
                <p className=' font-semibold pr-3 text-sm '>{t('section3_benefits.4')}</p>
            </div>
            </div>

            <div className='  flex justify-center items-center mt-5'
          style={{ background: "radial-gradient(100% 100% at 100% 49.78%, #0285FF 0%, rgba(22, 35, 46, 0) 100%)"
           }}>
            <div style={{  border: "1px solid transparent",
  borderImage: "linear-gradient(to right, #0285FF, #1EEF32) 1",
  borderRadius: "8px"}} className=' flex items-center gap-3 text-sm'>
    <div className='px-2 py-5 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] '><p className=' font-semibold'>5.</p></div>
                <p className=' font-semibold pr-3 text-sm '>{t('section3_benefits.5')}</p>
            </div>
            </div>
          </div>

        </div>


        <div className='w-full sm:block hidden absolute top-44 -left-2 right-0'>
          <div className=' relative flex justify-center items-center '>
               <div className='w-[120px] h-[120px] z-0 mx-auto rounded-full absolute top-4 left-0 right-0 bg-[#111B24] '></div>
               <div className='absolute top-7 left-0 right-0 z-40'>
               <img
                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                  className="md:w-24 w-14 mx-auto rounded-full z-40"
                />
               </div>
              {/*<div className='w-44 h-44 mx-auto rounded-full bg-[#0094FF]/30 blur-lg absolute top-0 left-0 right-0 z-0 '></div>
              <div className='w-44 h-44 mx-auto rounded-full bg-[#0094FF]/30 blur-sm absolute top-0 left-0 right-0 z-0 '></div> */}
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Group2.svg' className='w-48 h-48 mx-auto absolute -top-5 left-0 right-0 z-10' />
          </div>
        </div>
        </div>
    </div>
  )
}

export default Section3