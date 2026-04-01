import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Layout/Header';
import "../Style/style.css";
import { useTranslation } from 'react-i18next';

export default function CspJourneyStart() {
  const { t } = useTranslation('assessments');
  const navigate = useNavigate();
  const handleStartAssessment = () => {
      navigate("/csp");
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Header/>
    <div className="pt-10 flex items-center justify-center">
     <div className="absolute bottom-0 -left-28 w-48 h-48 md:w-80 md:h-80">
              <img src='./assets/WebApp/crystal-holder.svg' alt="" />
      </div>

      <div className="absolute bottom-0 -right-20 w-36 h-36 md:w-64 md:h-64">
             <img src='./assets/WebApp/crystal-holder.svg' alt="" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="relative bg-gradient-to-b from-[#0285FF] to-[#1EEF32] rounded-lg p-[1px]">
         
          <div className="bg-black flex flex-col justify-center items-center rounded-lg relative p-5 md:p-10 lg:p-12">
            <div
                className="rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[2px] "
              >
                <div className="relative bg-black rounded-md px-5 py-2 text-white text-sm text-center">
                  {t('intro.vark_completed')} <i className="fa-regular fa-circle-check"></i>
                </div>
              </div>

            <h1 className="text-xl md:text-2xl lg:text-3xl font-normal text-center mb-5 mt-6">
              {t('journey_start.cps_title')}
            </h1>

            <div className="text-center mb-7 space-y-1">
              <p className="text-xs">
                {t('journey_start.cps_subtitle')}
              </p>
            </div>

            <div className="w-full flex flex-col items-center gap-3">
              <button
                onClick={handleStartAssessment}
                className="relative w-full max-w-md rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1.5px] "
              >
                <div className="relative bg-black rounded-md px-7 py-2 text-white text-base md:text-lg">
                  {t('intro.start_button')}
                </div>
              </button>

              <p className="text-xs md:text-sm text-white/70 text-center">
                {t('journey_start.choose_most_like_you')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}