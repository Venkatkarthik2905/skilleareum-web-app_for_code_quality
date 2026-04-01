
import React, { useState, useEffect } from "react";
import Header from "../../Layout/Header";
import "../Style/style.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../../config/axiosInstance";
import { useTranslation } from "react-i18next";

export default function Roadmap() {
  const { t } = useTranslation('archetypes');
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [learningInfo, setLearningInfo] = useState([]);
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
     
          const res = await axiosInstance.get(
                "/api/ai-assessment/get-varkcsp-roadmap"
              );
      
        setLearningInfo(res.data.learningInfo);
        setRoadmapSteps(res.data.roadmapSteps);
      } catch (err) {
        console.error(err);
        // Optional: fallback to static data if API fails
      }
    };
    fetchRoadmap();
  }, []);

  const toggleTooltip = (index) => {
    setActiveTooltip(activeTooltip === index ? null : index);
  };

  // Show loading state until data is fetched (UI remains unchanged otherwise)
  if (learningInfo.length === 0 || roadmapSteps.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>{t('roadmap.loading')}</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen overflow-y-auto bg-black text-white md:px-4 px-2 pt-8 md:pt-12 font-poppins">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-2xl md:text-3xl font-inter font-semibold mb-3 md:mb-3">
              {t('roadmap.title')}
            </p>
            <p className="text-sm md:text-base">
              {t('roadmap.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-2 md:gap-6 mb-12 md:mb-16">
            {learningInfo.map((info, index) => (
              <div key={index} className="">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-[#2b2b2b] p-2 rounded-md">
                    <img
                      src={`./assets/WebApp/icons/${info.icon}.svg`}
                      className="w-10 h-10"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium">
                      {info.title}
                    </p>
                    <p
                      className={`text-sm md:text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#0285FF] to-[#1EEF32]`}
                    >
                      {info.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full mx-auto relative">
            <div className="w-full max-w-4xl mx-auto">
              <div className="mb-5 md:mb-8">
                <p className="text-xl md:text-2xl font-semibold font-inter mb-4">
                  {t('roadmap.how_it_works.title')}
                </p>
                <p className="text-sm md:text-base leading-relaxed max-w-4xl">
                  {t('roadmap.how_it_works.description')}
                </p>
              </div>
              <p className="text-xl md:text-2xl font-inter font-semibold mb-8 md:mb-10">
                {t('roadmap.learning_journey')}
              </p>
            </div>

            <div className="w-full max-w-4xl mx-auto flex justify-start items-end">
              <div className="w-full grid grid-cols-1 gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <div className="absolute left-3 md:left-5 top-0 bottom-0 w-0.5 bg-white/70 block"></div>
                    <div className="space-y-6 md:space-y-8">
                      {roadmapSteps.map((step, index) => (
                        <div key={index} className="relative flex gap-2 md:gap-6">
                          <div
                            className={`${
                              step.locked === true
                                ? "w-8 h-8 md:w-12 md:h-12"
                                : "md:w-11 md:h-11 w-9 h-9"
                            } md:border-8 border-black rounded-full`}
                          >
                            <div
                              className={`w-full h-full ${
                                step.locked === true
                                  ? "bg-gradient-to-b from-[#0285FF] to-[#1EEF32] border-2 border-white"
                                  : "bg-[#2b2b2b]"
                              } rounded-full flex items-center justify-center z-10`}
                            >
                              <i
                                className={`fa-solid ${
                                  step.locked === true ? "fa-play" : "fa-lock"
                                }`}
                              ></i>
                            </div>
                          </div>

                          <div
                            onClick={() => toggleTooltip(index)}
                            className={`w-full md:w-3/4 bg-gradient-to-r from-[#0285FF]/60 to-[#1EEF32]/60 p-[0.8px] rounded-xl relative`}
                          >
                            <div className="bg-black rounded-xl p-3 md:p-4 transition-all">
                              <div className="md:pl-5">
                                <div className="flex justify-between items-start mb-4">
                                  <p className="text-lg md:text-xl font-semibold font-inter">
                                    {step.title}
                                  </p>
                                  <span className="px-3 md:px-8 py-1 border border-white rounded-full text-xs md:text-sm font-medium">
                                    {t('roadmap.step_label', { step: step.stepNumber })}
                                  </span>
                                </div>

                                <ul className="space-y-2 mb-4 pl-2 md:pl-8">
                                  {step.activities.map((activity, actIndex) => (
                                    <li
                                      key={actIndex}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="w-2 h-2 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] rounded-full"></div>
                                      <span className="text-sm md:text-base font-semibold">
                                        {activity}
                                      </span>
                                    </li>
                                  ))}
                                </ul>

                                <div className="pt-2">
                                  <p
                                    className={`${step.goalColor} text-xs font-semibold md:text-sm`}
                                  >
                                    {t('roadmap.goal_label', { goal: step.goal })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Tooltip */}
                          {activeTooltip === index && (
                            <div className="absolute top-0 -right-44 ml-6 w-80 z-30 animate-fadeIn hidden lg:block">
                              <div className="cursor-pointer bg-black border border-[#291651] rounded-xl p-4 space-y-2">
                                <p className="text-xl font-medium text-white">
                                  {step.stageData.title}
                                </p>

                                <p className="text-sm font-light leading-relaxed">
                                  {step.stageData.description}
                                </p>

                                <div>
                                  <p className="text-base font-semibold text-white mb-2">
                                    {t('roadmap.tooltips.what_you_do')}
                                  </p>
                                  <ul className="space-y-2">
                                    {step.stageData.whatYouDo.map(
                                      (item, itemIndex) => (
                                        <li
                                          key={itemIndex}
                                          className="flex items-start gap-2 text-sm"
                                        >
                                          <div className="w-1.5 h-1.5 bg-[#361D69] rounded-full mt-1.5 flex-shrink-0"></div>
                                          <span>{item}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>

                                <div>
                                  <p className="text-base font-semibold text-white mb-2">
                                    {t('roadmap.tooltips.why_it_matters')}
                                  </p>
                                  <p className="text-sm text-gray-300 leading-relaxed">
                                    {step.stageData.whyMatters}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-base font-semibold text-white mb-3">
                                    {t('roadmap.tooltips.best_for')}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {step.stageData.bestFor.map(
                                      (tag, tagIndex) => (
                                        <span
                                          key={tagIndex}
                                          className="px-3 py-1.5 border border-[#2C1857] rounded-full text-xs transition-colors"
                                        >
                                          {tag}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Mobile Modal Tooltip */}
                          {activeTooltip === index && (
                            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 lg:hidden">
                              <div className="bg-black border border-[#291651] rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-xl font-bold text-white">
                                    {step.stageData.title}
                                  </p>
                                  <button
                                    onClick={() => setActiveTooltip(null)}
                                    className="text-gray-400 hover:text-white"
                                  >
                                    <i className="fas fa-times text-xl"></i>
                                  </button>
                                </div>

                                <p className="text-sm text-gray-300 leading-relaxed">
                                  {step.stageData.description}
                                </p>

                                <div>
                                  <p className="text-base font-semibold text-white mb-2">
                                    {t('roadmap.tooltips.what_you_do')}
                                  </p>
                                  <ul className="space-y-2">
                                    {step.stageData.whatYouDo.map(
                                      (item, itemIndex) => (
                                        <li
                                          key={itemIndex}
                                          className="flex items-start gap-2 text-sm text-gray-300"
                                        >
                                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                          <span>{item}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>

                                <div>
                                  <p className="text-base font-semibold text-white mb-2">
                                    {t('roadmap.tooltips.why_it_matters')}
                                  </p>
                                  <p className="text-sm text-gray-300 leading-relaxed">
                                    {step.stageData.whyMatters}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-base font-semibold text-white mb-3">
                                    {t('roadmap.tooltips.best_for')}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {step.stageData.bestFor.map(
                                      (tag, tagIndex) => (
                                        <span
                                          key={tagIndex}
                                          className="px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-full text-xs text-gray-300"
                                        >
                                          {tag}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/ai-start")}
                    className="z-50 w-full max-w-lg mx-auto flex justify-center items-center mt-14 md:mt-32 mb-14 rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1.5px]"
                  >
                    <div className="w-full bg-black rounded-md px-7 py-2 text-white text-base md:text-lg flex justify-center items-center gap-3 mx-auto font-inter">
                      {t('next_steps.start_journey')}
                      <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <img
              src="./assets/Landing/aimage.svg"
              className="absolute bottom-0 left-0 w-3/12 -translate-x-5"
              alt=""
            />
            <img
              src="./assets/gamecontroller.png"
              className="absolute bottom-0 right-0 w-[20%]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}