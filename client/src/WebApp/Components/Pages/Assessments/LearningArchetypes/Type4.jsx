import React from 'react';
import Header from '../../Layout/Header';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Type4() {
  const { t } = useTranslation('archetypes');
  const navigate =useNavigate()


  const archetypes = [
    { icon: "hand", label: t('labels.kinesthetic'), angle: 0 },
    { icon: "trophy", label: t('labels.intuitive'), angle: 72 },
    { icon: "bullseye", label: t('labels.exploratory'), angle: 144 },
    { icon: "arrow", label: t('labels.accuracy'), angle: 216 },
    { icon: "chart", label: t('labels.reward'), angle: 288 }
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
    <div>
     <Header/>
    <div className="min-h-screen bg-black text-white px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <p className="text-2xl md:text-3xl font-semibold text-center mb-12 md:mb-28">
          {t('title')}
        </p>

         <div className="relative w-full max-w-lg mx-auto mb-16 aspect-square flex items-center justify-center">
          <div className="absolute inset-0 rounded-full" style={{
            background: 'conic-gradient(from 0deg, #1EEF32 0%,  #0285FF 100%)',
            padding: '3px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}></div>


          <div className="relative z-10">
            <div className="w-32 h-32 md:w-44 md:h-44 relative">
              <img src='../assets/WebApp/brain1.svg'/>
             </div>
          </div>

          {archetypes.map((archetype, index) => {
            const radius = window.innerWidth < 640 ? 150 : window.innerWidth < 768 ? 200 : 260;
            const x = Math.cos((archetype.angle - 90) * Math.PI / 180) * radius;
            const y = Math.sin((archetype.angle - 90) * Math.PI / 180) * radius;
            
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                }}
              >
                <ArchetypeCard icon={archetype.icon} label={archetype.label} />
              </div>
            );
          })}
        </div>

        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold font-inter mb-6">{t('learning_identity')}</h2>
          <p className="text-sm md:text-base leading-relaxed mb-8">
            {t('descriptions.type4')}
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

        <div className='bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1px] max-w-3xl mx-auto rounded-md '>
        <div className="bg-black rounded-md p-6 md:p-10 flex flex-col justify-center items-center ">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">
            {t('what_happens_next')}
          </h2>
          <p className="text-sm md:text-base text-center mb-6 md:mb-8 leading-relaxed">
            {t('next_steps.description.type4')}
          </p>
          
          <button  onClick={handleNavigate}  className="relative w-full max-w-xl rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1.5px] mt-5 z-10">
          <div className="relative bg-black rounded-md px-7 py-2 text-white text-base md:text-lg flex justify-center items-center gap-3 mx-auto font-inter">
                  {t('next_steps.start_journey')}
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </div>
              </button>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

function ArchetypeCard({ icon, label }) {
  return (
    <div className="flex flex-col justify-between items-center gap-3">
      <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-[0.8px] rounded-md ">
      <div
        className={` w-full h-full rounded-md flex flex-col items-center justify-center bg-[#171717] transition-all`}
      >
        <img src={`../assets/WebApp/icons/${icon}.svg`} className="md:w-16 md:h-16 w-10 h-10"/>
      <p className="text-xs md:text-sm font-medium text-center">{label}</p>
      </div>
      </div>
    </div>
  );
}