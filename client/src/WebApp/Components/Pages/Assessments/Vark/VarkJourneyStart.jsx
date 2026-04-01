import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Layout/Header';
import { useTranslation } from 'react-i18next';

export default function VarkJourneyStart() {
  const { t } = useTranslation('assessments');
  const navigate = useNavigate();
  const handleStartAssessment = () => {
      navigate("/vark");
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Header/>
    <div className="pt-5 flex items-center justify-center">
     <div className="absolute bottom-0 -left-28 w-48 h-48 md:w-80 md:h-80">
              <img src='./assets/WebApp/crystal-holder.svg'/>
      </div>

      <div className="absolute bottom-0 -right-20 w-36 h-36 md:w-64 md:h-64">
             <img src='./assets/WebApp/crystal-holder.svg'/>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="relative bg-gradient-to-b from-[#0285FF] to-[#1EEF32] rounded-lg p-[1px]">
         
          <div className="bg-black rounded-lg relative p-5 md:p-10 lg:p-12">
            <div className="flex justify-center gap-4 mb-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-14 h-12 md:w-20 md:h-14 bg-[#2b2b2b] rounded-md flex items-center justify-center">
                  <img src="./assets/WebApp/icons/brain.svg" className="w-8 h-8 md:w-9 md:h-9"/>
                </div>
                <div className="w-14 h-12 md:w-20 md:h-14 bg-[#2b2b2b] rounded-md flex items-center justify-center">
                  <img src="./assets/WebApp/icons/openbook.svg" className="w-8 h-8 md:w-9 md:h-9"/>
                </div>
                <div className="w-14 h-12 md:w-20 md:h-14 bg-[#2b2b2b] rounded-md flex items-center justify-center">
                  <img src="./assets/WebApp/icons/light-bulb.svg" className="w-8 h-8 md:w-9 md:h-9"/>
                </div>
                <div className="w-14 h-12 md:w-20 md:h-14 bg-[#2b2b2b] rounded-md flex items-center justify-center">
                  <img src="./assets/WebApp/icons/bullseye.svg" className="w-8 h-8 md:w-9 md:h-9"/>
                </div>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl lg:text-3xl font-normal text-center mb-5">
              {t('journey_start.title')}
            </h1>

            <div className="text-center mb-7 space-y-1">
              <p className="text-xs">
                {t('journey_start.subtitle1')}
              </p>
              <p className="text-xs">
                {t('journey_start.subtitle2')}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleStartAssessment}
                className="relative w-full max-w-md group rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1.5px] "
              >
                <div className="relative bg-black rounded-md px-7 py-3 text-white  text-base md:text-lg">
                  {t('intro.start_button')}
                </div>
              </button>

              <p className="text-xs md:text-sm text-white/70 text-center">
                {t('journey_start.footer_note')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}