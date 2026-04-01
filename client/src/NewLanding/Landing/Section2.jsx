import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Section2 = () => {
  const { t } = useTranslation('landing');

  const cards = [
    {
      icon: 'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/section22.svg',
      title: t('section2_cards.play.title'),
      desc: t('section2_cards.play.desc'),
    },
    {
      icon: 'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/section23.svg',
      title: t('section2_cards.learn.title'),
      desc: t('section2_cards.learn.desc'),
    },
    {
      icon: 'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/section24.svg',
      title: t('section2_cards.earn.title'),
      desc: t('section2_cards.earn.desc'),
    },
    {
      icon: 'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/section25.svg',
      title: t('section2_cards.grow.title'),
      desc: t('section2_cards.grow.desc'),
    },
    {
      icon: 'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/section26.svg',
      title: t('section2_cards.repeat.title'),
      desc: t('section2_cards.repeat.desc'),
    },
    {
      icon: 'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/section21.svg',
      title: t('section2_cards.whatsNext.title'),
      desc: t('section2_cards.whatsNext.desc'),
    },
  ];
  return (
    <div className='pt-10 '>
      <div className=' relative overflow-hidden flex justify-center items-center'>
       <div className='w-full h-full absolute top-0 '>
            <div className='w-[80%] mx-auto h-10 absolute top-0 left-0 right-0 opacity-60 bg-[#727272] rounded-full '></div>
            <div className=' w-32 h-16 absolute top-20 -right-10 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className=' w-8 h-24 absolute top-16 -left-5 bg-[#00BA34] opacity-55 rounded-full '></div>
            {/* <div className='w-44 mx-auto h-10 absolute bottom-0 left-0 right-0 opacity-60 bg-[#3055E3] rounded-full '></div> */}
        </div>
      <div className='w-[100%] mx-auto py-20 px-3 font-gilroy bg-[#8989890D] border border-white/5 backdrop-blur-3xl rounded-2xl '>
        <div>
          <p className=' font-bold text-3xl text-center leading-10 '>{t('section2_title1')}<span style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>Skilleareum</span> {t('section2_title2')} <br/>
          {t('section2_title3')}</p>
        </div>

        <div className="w-full mt-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-content-center content-center gap-10   ">

         {cards.map((card, index) => (
          <div key={index} className='w-[100%] mx-auto flex flex-col items-center justify-center '>
            <div className='w-16 h-16 bg-gradient-to-r from-[#0285FF] to-[#1EEF32]  rounded-full p-1.5 '>
              <div className='w-full h-full flex justify-center items-center bg-black rounded-full relative '>
                  <div className='w-14 h-14 flex justify-center items-center rounded-full overflow-hidden'>
                    <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/AbstractDesign.svg" className=' w-14 h-14 mx-auto '/>
                  </div>
                  <img src={card.icon} className=' absolute top-3.5 w-6 h-6 animate-zoomMove  '/>
                </div>
            </div>

            <div className='mt-5'>
              <p className=' font-bold text-white text-center'>{card.title}</p>
              <p className='w-[90%] mx-auto text-sm text-[#8C8C8C] text-center mt-4'>{card.desc}</p>
            </div>

            <div className='mt-7'>
            <a href="/home" target="_blank">   <div className='flex justify-center items-center gap-7 border border-[#1F1F1F] rounded-full py-3 px-5 '>
                <p className=' font-semibold text-sm '>{t('getStarted')}</p>
                <button className='w-12 h-8 bg-[#1A1A1A] rounded-full ml-2 '>
                  <FontAwesomeIcon icon={faArrowRight} className=' text-white ' />
                </button>
               </div></a>
            </div>
          </div>
       ))}

        </div>

      </div>
      </div>
    </div>
  )
}

export default Section2