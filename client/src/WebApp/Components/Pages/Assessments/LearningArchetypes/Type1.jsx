import React from 'react';
import Header from '../../Layout/Header';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Type1() {
  const { t } = useTranslation('archetypes');
  const navigate =useNavigate()

  const archetypes = [
    { id: 'V', label: t('labels.visual'), active: false },
    { id: 'A', label: t('labels.analytical'), active: false },
    { id: 'S', label: t('labels.sequential'), active: false },
    { id: 'AC', label: t('labels.accuracy'), active: true },
    { id: 'T', label: t('labels.task_driven'), active: false }
  ];

  const learningFeatures = [
    t('features.analytical_thinking'),
    t('features.goal_oriented'),
    t('features.accuracy_first'),
    t('features.step_by_step')
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
                  <p className="bg-clip-text text-transparent bg-gradient-to-b from-[#0285FF] to-[#1EEF32]">{archetype.id}</p>
                </div>
                <p className="mt-2 text-sm font-semibold text-center">{archetype.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-left font-inter">
              {t('how_you_learn')}
            </p>
            <p className="text-sm leading-relaxed ">
              {t('descriptions.type1')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 pt-4">
              {learningFeatures.map((feature, index) => (
                <div key={index} className="bg-gradient-to-r from-[#0285FF]/30 to-[#1EEF32]/30 p-[0.8px] rounded-md h-full ">
                <div
                  className="bg-black h-full flex justify-center items-center rounded-md p-2 md:p-3 text-center transition-colors"
                >
                  <p className="text-xs md:text-sm font-medium">{feature}</p>
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

        <div className="text-center space-y-3 md:space-y-4">
          <p className="text-2xl md:text-3xl font-medium font-inter">{t('next_steps.title')}</p>
          <p className="md:text-sm max-w-3xl mx-auto px-4">
            {t('next_steps.description.type1')}
          </p>

          <button onClick={handleNavigate} className="relative w-full max-w-xl rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1.5px] mt-5 z-10" >
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