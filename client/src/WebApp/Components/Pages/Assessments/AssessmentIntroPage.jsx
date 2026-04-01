import React from 'react';
import Header from '../Layout/Header';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AssessmentIntroPage() {
  const { t } = useTranslation('assessments');
  const navigate = useNavigate();
  const assessmentTypes = [
    {
      icon: <img src='./assets/WebApp/graduationcap.svg' className='scale-110 -rotate-45' alt="" />,
      title: t('intro.types.vark.title'),
      description: t('intro.types.vark.description'),
    },
    {
      icon: <img src='./assets/WebApp/brain1.svg' alt="" />,
      title: t('intro.types.cps.title'),
      description: t('intro.types.cps.description'),
    },
    {
      icon:  <img
              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/exploreraibadge.png"
              className=" scale-75 "
              alt=""
            />,
      title: t('intro.types.ai_knowledge.title'),
      description: t('intro.types.ai_knowledge.description'),
    }
  ];

  const howItWorks = [
    t('intro.how_it_works.step1'),
    t('intro.how_it_works.step2'),
    t('intro.how_it_works.step3')
  ];

  return (
    <div className='min-h-screen overflow-y-auto bg-black'>
      <Header/>
    <div className=" text-white px-4 py-12 md:py-20 font-poppins">

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-2xl md:text-3xl font-inter font-medium mb-3 md:mb-5">
            {t('intro.title')}
          </p>
          <p className="text-sm md:text-base max-w-xl font-light mx-auto mb-8">
            {t('intro.description')}
          </p>
          <button
          onClick={() => navigate("/vark-start")}
          className=" w-full max-w-48 mx-auto flex justify-center items-center mb-14 rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1px]"
        >
          <div className="w-full bg-black rounded-full px-5 py-2 text-white text-sm flex justify-center items-center gap-3 mx-auto font-inter">
            {t('intro.start_button')}
            <i className="fas fa-arrow-right "></i>
          </div>
        </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
          {assessmentTypes.map((assessment, index) => (
            <div
              key={index}
              className="group p-3 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="relative w-full max-w-[300px] max-h-[300px] aspect-square mb-6 rounded overflow-hidden bg-[#D9D9D90D] flex items-center justify-center">                
                  <div className="relative z-10">
                    {assessment.icon}
                  </div>
                
              </div>

              <p className="text-xl md:text-2xl font-inter mb-3 bg-clip-text text-transparent bg-gradient-to-b from-[#0285FF] to-[#1EEF32] ">
                {assessment.title}
              </p>
              <p className="text-sm text-justify leading-relaxed">
                {assessment.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-16 md:mb-24">
          <p className="text-2xl md:text-3xl font-inter font-medium mb-6 md:mb-8">{t('intro.how_it_works.title')}</p>
          <div className="space-y-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="flex gap-4 items-center md:pl-10">
                <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] rounded-full flex items-center justify-center">
                </div>
                <p className="text-sm md:text-base leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
          <div>
            <p className="font-inter text-2xl md:text-3xl lg:pl-10 font-normal mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#0285FF] to-[#1EEF32] ">
              {t('intro.why_matters.title')}
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              {t('intro.why_matters.description')}
            </p>
          </div>
        
          <div className="flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">              
              <div className="relative w-full h-full flex items-center justify-center">
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/aigenesis.svg' alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-32">
           <div className="md:order-1 order-2 flex justify-center">
            <div className="relative w-56 h-56 md:w-80 md:h-80">              
              <div className="relative w-full h-full flex items-center justify-center">
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/handshake.svg' alt="" />
              </div>
            </div>
          </div>

          <div className='md:order-2 order-1'>
            <p className="font-inter text-2xl md:text-3xl lg:pl-10 font-normal mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#0285FF] to-[#1EEF32] ">
              {t('intro.better_engagement.title')}
            </p>
            <p className="text-sm md:text-base leading-relaxed">
             {t('intro.better_engagement.description')}
            </p>
          </div>         
        </div>

        <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 items-center">
          <div className=' w-full flex flex-col md:items-start items-center '>
            <p className="w-full font-inter text-2xl md:text-3xl lg:pl-10 font-normal mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#0285FF] to-[#1EEF32] ">
              {t('intro.faster_progress.title')}
            </p>
            <p className="w-full text-sm md:text-base leading-relaxed">
              {t('intro.faster_progress.description')}
            </p>
          </div>
        
          <div className="flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">              
              <div className="relative w-full h-full flex items-center justify-center">
                <img src='./assets/WebApp/grow-graph.svg' alt="" />
              </div>
            </div>
          </div>
        </div>
        
      </div>

    </div>

    <div className=' border-t border-white py-10'>
        <p className='bg-clip-text text-transparent bg-gradient-to-b from-[#0285FF] to-[#1EEF32] text-center text-2xl md:text-3xl'>{t('intro.ready_to_start')}</p>
        <p className='mt-3 w-full max-w-sm mx-auto text-justify text-center text-white text-lg'>{t('intro.ready_subtitle')}</p>
        <button
          onClick={() => navigate("/vark-start")}
          className=" w-full max-w-48 mx-auto flex justify-center items-center rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1px] mt-7"
        >
         <div className="w-full bg-black rounded-full px-5 py-2 text-white text-sm flex justify-center items-center gap-3 mx-auto font-inter ">
            {t('intro.start_button')}
            <i className="fas fa-arrow-right "></i>
          </div>
        </button>
    </div>
    </div>
  );
}