import React from 'react';
import Header from '../../Layout/Header';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Type2() {
  const { t } = useTranslation('archetypes');
  const navigate =useNavigate()
  const archetypes = [
    { id: 'V', img: <img src="../assets/WebApp/icons/eye.svg"/>, label: 'Visual', active: false },
    { id: 'I', img: <img src="../assets/WebApp/icons/light-bulb.svg"/>, label: 'Intuitive', active: false },
    { id: 'S', img: <img src="../assets/WebApp/icons/stack.svg"/>, label: 'Sequential', active: false },
    { id: 'SF', img: <img src="../assets/WebApp/icons/spark2.svg"/>, label: 'Speed-Focused', active: true },
    { id: 'R', img: <img src="../assets/WebApp/icons/trophy2.svg"/>, label: 'Reward-Driven', active: false }
  ];

 const handleNavigate =()=>{
    navigate('/roadmap')
  }
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-poppins">
    <Header/>      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="z-10 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1px] rounded-md  mb-6 md:mb-8 ">
          <div className="flex justify-end mb-4 absolute -right-14 sm:-right-10 -top-12 md:-right-24 ">
            <img src="../assets/WebApp/graduationcap.svg" className=" w-44 md:w-60"/>
            </div>
        <div className="bg-black rounded-md p-4 md:p-6 font-inter ">
          <p className="text-xl md:text-3xl font-medium text-center mb-4 md:mb-5">
            {t('title')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-5  font-inter ">
            {archetypes.map((archetype) => (
              <div key={archetype.id} className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl md:text-3xl font-bold transition-all bg-[#D9D9D966]  `}
                >
                  {archetype.img}
                </div>
                <p className="mt-2 text-xl font-semibold">{archetype.id}</p>
                <p className="mt-1 text-sm font-semibold text-center">{archetype.label}</p>
              </div>
            ))}
          </div>
        </div>
        </div>

           <div className="w-full flex flex-col gap-4 mb-8 max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl font-medium font-inter">{t('behavior_breakdown')}</p>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                <div className="flex items-center gap-3 text-sm lg:text-base">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#1EEF32] to-[#0285FF] flex-shrink-0"></div>
                  <div>
                    <p className="text-xl font-medium">{t('behaviors.see.title')}</p>
                    <p className="text-xs">{t('behaviors.see.desc')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm lg:text-base">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#1EEF32] to-[#0285FF] flex-shrink-0"></div>
                  <div>
                    <p className="text-xl font-medium">{t('behaviors.follow.title')}</p>
                    <p className="text-xs">{t('behaviors.follow.desc')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm lg:text-base">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#1EEF32] to-[#0285FF] flex-shrink-0"></div>
                  <div>
                    <p className="text-xl font-medium">{t('behaviors.act_fast.title')}</p>
                    <p className="text-xs">{t('behaviors.act_fast.desc')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm lg:text-base">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#1EEF32] to-[#0285FF] flex-shrink-0"></div>
                  <div>
                    <p className="text-xl font-medium">{t('behaviors.get_rewarded.title')}</p>
                    <p className="text-xs">{t('behaviors.get_rewarded.desc')}</p>
                  </div>
                </div>
              </div>
            </div>

        <div className="text-center space-y-3 md:space-y-4 mt-10 ">
          <p className="text-2xl md:text-3xl font-medium font-inter">{t('next_steps.title')}</p>
          <p className="md:text-sm max-w-3xl mx-auto px-4">
            {t('next_steps.description.type2')}
          </p>

          <button onClick={handleNavigate} className="relative w-full max-w-xl rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1.5px] mt-5 z-10">
          <div className="relative bg-black rounded-md px-7 py-2 text-white text-base md:text-lg flex justify-center items-center gap-3 mx-auto font-inter">
                  {t('next_steps.start_journey')}
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </div>
              </button>
        </div>
      </div>

       <div className="absolute bottom-0 -left-4 z-0 ">
        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/aimage.svg" className="md:block hidden md:w-8/12 lg:w-10/12" alt="" />
       </div>
      
       <div className="z-0 absolute bottom-0 -right-20 w-36 h-36 md:w-56 md:h-56 lg:w-72 lg:h-72">
             <img src='../assets/WebApp/crystal-holder.svg'/>
      </div>

      
    </div>
  );
}