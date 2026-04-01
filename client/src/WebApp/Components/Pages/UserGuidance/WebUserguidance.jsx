import React from "react";
import Header from "../Layout/Header";
import "../Assessments/Style/style.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HowSkillEareumWorks() {
  const { t } = useTranslation('guidance');
  const navigate = useNavigate();
  const steps = [
    {
      number: 1,
      icon: (
        <i className="fa-solid fa-arrow-right-to-bracket text-[35px] md:text-[45px]"></i>
      ),
      title: t('steps.1.title'),
      description: t('steps.1.description'),
    },
    {
      number: 2,
      icon: <img src="./assets/WebApp/icons/eye.svg" className="w-16 h-16" alt="VARK" />,
      title: t('steps.2.title'),
      description: t('steps.2.description'),
    },
    {
      number: 3,
      icon: <img src="./assets/WebApp/icons/brain.svg" className="w-16 h-16" alt="CSP" />,
      title: t('steps.3.title'),
      description: t('steps.3.description'),
    },
    {
      number: 4,
      icon: <i className="fa-solid fa-graduation-cap text-[50px]"></i>,
      title: t('steps.4.title'),
      description: t('steps.4.description'),
    },
    {
      number: 5,
      icon: <i className="fa-regular fa-calendar text-[55px]"></i>,
      title: t('steps.5.title'),
      description: t('steps.5.description'),
      list: [t('steps.5.items.pilot'), t('steps.5.items.genesis')],
    },
    {
      number: 6,
      icon: <img src="./assets/WebApp/icons/game.svg" alt="Interactive" />,
      title: t('steps.6.title'),
      description: t('steps.6.description'),
    },
  ];

  return (
    <div>
      <Header />
      <div className="min-h-screen overflow-y-auto bg-black text-white px-4 py-12 md:py-20 font-poppins">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-2xl md:text-4xl font-semibold mb-3 font-inter">
              {t('title')}
            </h1>
            <p className="text-sm md:text-base mb-6 font-inter">
              {t('subtitle')}
            </p>
            <p className="text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              {t('intro')}
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-l from-[#0285FF]/50 to-[#1EEF32]/50 rounded-xl p-[0.7px] "
              >
                <div
                  className={`bg-black rounded-xl p-6 md:p-8 transition-all `}
                >
                  <div className="flex md:flex-row flex-col items-start md:items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center md:justify-center justify-start`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex justify-center items-center mt-2 ">
                        <span
                          className={`text-sm md:text-lg text-center font-medium text-[#0285FF]`}
                        >
                          {t('stepPrefix')} {step.number}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-xl md:text-2xl font-semibold font-inter text-white mb-2">
                        {step.title}
                      </p>
                      <p className="text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                      {step.list && (
                        <ul className="flex items-center mt-2 space-x-2">
                          {step.list.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-[#FAFDFF] rounded-full flex-shrink-0"></div>
                              <span className="text-sm md:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#0285FF] to-[#1EEF32] ">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-2xl mx-auto mt-12">
            <p className="text-xl md:text-3xl mb-5 text-center font-medium font-inter">
              {t('footer.title')}
            </p>
            <p className="text-sm md:text-base text-center">
              {t('footer.description')}
            </p>
            <div className="mt-5 md:mt-8 text-center">
              <button
                onClick={() => navigate("/assessment-intro")}
                className="relative w-full max-w-sm rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[0.8px] "
              >
                <div className="relative bg-black rounded-md px-7 py-2 text-white text-base md:text-lg">
                  {t('footer.button')}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
