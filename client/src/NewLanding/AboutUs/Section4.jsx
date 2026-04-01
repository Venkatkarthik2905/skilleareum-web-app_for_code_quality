import React from 'react'
import { useTranslation } from 'react-i18next';

const Section4 = () => {
  const { t } = useTranslation('about');
  return (
    <div className=' font-gilroy py-14 '> 
    <div>
         <div  data-aos="fade-down"  data-aos-duration="2000" className=' flex justify-center'>
      <h1 className='text-4xl lg:text-5xl text-center font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section4.title')}</h1>
          </div>
          {/* <div className='mt-7'>
            <p className='md:w-[80%] w-[95%] mx-auto text-center
             text-[#808080] text-sm '>Witness the brilliance of our previous projects. Our portfolio showcases the successful collaborations we've had with diverse clients across various industries. Let our work speak for itself.</p>
          </div> */}
          </div>


        <div  data-aos="fade-up"  data-aos-duration="2000" className=' h-full relative '>
         <div className=' mt-16 '>
          <div className='flex sm:flex-row flex-col items-start gap-10 sm:gap-16  '>
            <p className=' text-6xl font-bold text-[#0285FF] '>001</p>
            <div>
                <div className=' flex justify-start '>
                <div className=' flex justify-center '>
                <p className=' text-lg font-semibold' style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )"
            }}>{t('section4.m1.title')}</p>
            </div>
            </div>

            <div className='mt-5 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F] py-10 px-6 '>
               <p>{t('section4.descriptionLabel')}</p>
               <p className='mt-3 text-[#8C8C8C] '>{t('section4.m1.desc')}</p>
            </div>
            </div>
          </div>
          </div>

          <div className=' mt-16 '>
          <div className='flex sm:flex-row flex-col items-start  gap-10 sm:gap-16  '>
            <p className=' text-6xl font-bold text-[#1EEF32] '>002</p>
            <div>
                <div className=' flex justify-start '>
                <div className=' flex justify-center '>
                <p className=' text-lg font-semibold' style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )"
            }}>{t('section4.m2.title')}</p>
            </div>
            </div>

            <div className='mt-5 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F] py-10 px-6 '>
               <p>{t('section4.descriptionLabel')}</p>
               <p className='mt-3 text-[#8C8C8C] '>{t('section4.m2.desc')}</p>
            </div>
            </div>
          </div>
          </div>

          <div className=' mt-16 '>
          <div className=' flex sm:flex-row flex-col items-start gap-10 sm:gap-16 '>
            <p className=' text-6xl font-bold text-[#0285FF] '>003</p>
            <div>
                <div className=' flex justify-start '>
                <div className=' flex justify-center '>
                <p className=' text-lg font-semibold' style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )"
            }}>{t('section4.m3.title')}</p>
            </div>
            </div>

            <div className='mt-5 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F] py-10 px-6 '>
               <p>{t('section4.descriptionLabel')}</p>
               <p className='mt-3 text-[#8C8C8C] '>{t('section4.m3.desc')}</p>
            </div>
            </div>
          </div>
          </div>

          <div className=' mt-16 '>
          <div className=' flex sm:flex-row flex-col items-start gap-10 sm:gap-16 '>
            <p className=' text-6xl font-bold text-[#1EEF32] '>004</p>
            <div>
                <div className=' flex justify-start '>
                <div className=' flex justify-center '>
                <p className=' text-lg font-semibold' style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )"
            }}>{t('section4.m4.title')}</p>
            </div>
            </div>

            <div className='mt-5 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F] py-10 px-6 '>
               <p>{t('section4.descriptionLabel')}</p>
               <p className='mt-3 text-[#8C8C8C] '>{t('section4.m4.desc')}</p>
            </div>
            </div>
          </div>
          </div>

          {/* <div className=' mt-16 '>
          <div className='flex sm:flex-row flex-col items-start gap-10 sm:gap-16  '>
            <p className=' text-6xl font-bold text-[#0285FF] '>005</p>
            <div>
                <div className=' flex justify-start '>
                <div className=' flex justify-center '>
                <p className=' text-lg font-semibold' style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )"
            }}>500 Satisfied Clients</p>
            </div>
            </div>

            <div className='mt-5 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F] py-10 px-6 '>
               <p>Description</p>
               <p className='mt-3 text-[#8C8C8C] '>We celebrated reaching a milestone of serving 500 satisfied clients, further strengthening our reputation for customer-centric services and successful project outcomes.</p>
            </div>
            </div>
          </div> */}
          {/* </div> */}

          <div className=' absolute lg:-top-5 -top-5 sm:block hidden '>
            <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Container.png' className='lg:w-8/12 w-9/12 -translate-x-10 ' />
          </div>

          </div>

    </div>
  )
}

export default Section4