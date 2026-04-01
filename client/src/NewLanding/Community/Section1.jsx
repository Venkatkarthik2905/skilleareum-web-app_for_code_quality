import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegram, faTelegramPlane, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Section1 = () => {
  const { t } = useTranslation('community');
  return (
    <div className=' py-20 font-gilroy overflow-hidden '>
         <div className=' flex flex-col justify-center'>
         <div className=' flex  justify-center'>
         <h1 className=' leading-10 text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide font-medium '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>
           {t('section1.title')}
        </h1>
        </div>
        <div className=' flex  justify-center items-center mt-4'>
        <p className='mt-1 text-3xl sm:text-4xl lg:text-4xl text-center '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}> {t('section1.subtitle')}</p>
        </div>
            
        <div className=' flex sm:flex-row flex-col justify-center items-center gap-3 mt-4'>
        <p className=' text-3xl  lg:text-4xl text-center'  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF)",
            WebkitBackgroundClip: "text",
          }}> {t('section1.description')}  </p>
        
         <div className='flex items-center relative'>
            <div className=' bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full border-2 border-white p-1 '>
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png' className='w-8 rounded-full' />
                </div>
                <div className=' -translate-x-3 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full border-2 border-white p-1 '>
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_02.png' className='w-8 rounded-full' /> 
                </div>
                <div className=' -translate-x-6 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full border-2 border-white p-1 '>
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_03.png' className='w-8 rounded-full' />
            </div>
            <a href="https://t.me/SKLRM_bot" target="_blank" className='absolute -right-1'>  <div className='  w-11 h-11 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full border-2 border-white p-1 flex justify-center items-center '>
                <FontAwesomeIcon icon={faPlus} />
            </div></a>
         </div>
         <p className=' text-3xl  lg:text-4xl text-center' style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section1.description2')}</p>
          </div>
       
          </div>

         <div className=' flex md:flex-row flex-col justify-center items-center z-20 mt-20 lg:gap-20 md:gap-10 gap-0'>
            <div className='h-full flex flex-col md:justify-between md:items-start items-center justify-center md:gap-20 gap-10'>
            <div data-aos="fade-right"
     data-aos-duration="2000" className=' flex gap-7 relative'>
                <div className=' bg-[#0285FF] border border-white rounded-full z-10 px-7 py-1'>
                    <p className='uppercase font-medium text-sm'>{t('section1.labels.affiliate')}</p>
                </div>
                <hr className=' md:block hidden absolute top-3 w-14 mx-auto right-5 z-0 h-0.5 bg-gradient-to-l from-[#FFFFFF] to-[#0285FF]  '/>
                <div className='md:block hidden'>
                <div className='z-10  bg-[#1EEF32] rounded-full w-7 h-7 p-0.5 flex justify-center items-center '>
                    <div className=' w-full h-full rounded-full border-2 border-white flex justify-center items-center '>
                        <FontAwesomeIcon icon={faPlus} className='text-white text-sm' />
                    </div>
                </div>
                </div>
            </div>

            <div data-aos="fade-right"
     data-aos-duration="3000" className=' flex gap-7 relative'>
                <div className=' bg-[#0285FF] border border-white rounded-full z-10 px-7 py-1'>
                    <p className='uppercase font-medium text-sm'>{t('section1.labels.internship')}</p>
                </div>
                <hr className=' md:block hidden absolute top-3 w-10 mx-auto  right-5 z-0 h-0.5 bg-gradient-to-l from-[#FFFFFF] to-[#0285FF]  '/>
                <div className='md:block hidden'>
                <div className='z-10  bg-[#1EEF32] rounded-full w-7 h-7 p-0.5 flex justify-center items-center '>
                    <div className='  w-full h-full rounded-full border-2 border-white flex justify-center items-center '>
                        <FontAwesomeIcon icon={faPlus} className='text-white text-sm' />
                    </div>
                </div>
                </div>
            </div>
            </div>


         <div className=' flex  justify-center z-20 py-10 md:py-0'>
         <div className=' lg:w-[25rem] w-[12rem] h-[12rem] lg:h-[25rem] flex justify-center  rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] py-5'>
         <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif" className=' '/>
         </div>
         </div>

         <div className='h-full flex flex-col justify-center md:justify-between md:items-start items-center  md:gap-20 gap-10 '>
            <div data-aos="fade-up"
     data-aos-duration="2000" className=' flex gap-7 relative'>
            
               <div className='md:block hidden'>
                <div className=' z-10 bg-[#1EEF32] rounded-full w-7 h-7 p-0.5 flex justify-center items-center '>
                    <div className=' w-full h-full rounded-full border-2 border-white flex justify-center items-center '>
                        <FontAwesomeIcon icon={faPlus} className='text-white text-sm' />
                    </div>
                </div>
                </div>
                <hr className='md:block hidden absolute top-3 w-10 mx-auto  left-5 z-0 h-0.5 bg-gradient-to-r from-[#FFFFFF] to-[#0285FF]  '/>
                <div className=' bg-[#0285FF] border border-white rounded-full z-10 px-7 py-1'>
                    <p className='uppercase font-medium text-sm'>{t('section1.labels.investment')}</p>
                </div>
                
            </div>

            <div data-aos="fade-up"
     data-aos-duration="3000" className=' flex gap-7 relative'>
           
            <div className='md:block hidden'>
                <div className=' z-10 bg-[#1EEF32] rounded-full w-7 h-7 p-0.5 flex justify-center items-center '>
                    <div className=' w-full h-full rounded-full border-2 border-white flex justify-center items-center '>
                        <FontAwesomeIcon icon={faPlus} className='text-white text-sm' />
                    </div>
                </div>
                </div>
                <hr className='md:block hidden  absolute top-3 w-10 mx-auto  left-5 z-0 h-0.5 bg-gradient-to-r from-[#FFFFFF] to-[#0285FF]  '/>
                <div className=' bg-[#0285FF] border border-white rounded-full z-10 px-7 py-1'>
                    <p className='uppercase font-medium text-sm'>{t('section1.labels.career')}</p>
                </div>
                
            </div>
            </div>
         </div>


        
    </div>
  )
}

export default Section1