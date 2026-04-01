import React, { useState, useEffect } from "react";
import Header from "../../Layout/Header";
import "../Style/style.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../../../config/axiosInstance";
import { useSelector } from "react-redux";

export default function AILearningRoadmap() {
  const { t } = useTranslation('archetypes');
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.token);
  
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  const [aiLevel, setAiLevel] = useState("foundational");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/ai-assessment/get-varkcsp-roadmap`);
        
        if (response.data) {
          setRoadmapSteps(response.data.roadmapSteps || []);
          // Find AI Level in learningInfo
          const levelInfo = response.data.learningInfo.find(info => info.title === "AI Level");
          if (levelInfo) {
            setAiLevel(levelInfo.value.toLowerCase());
          }
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchRoadmap();
    }
  }, [authToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-poppins">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1EEF32] mx-auto mb-4"></div>
          <p className="text-xl">{t('roadmap.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className=" min-h-screen overflow-y-auto bg-black text-white md:px-4 px-2 pt-8 md:pt-12 font-poppins ">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-2xl md:text-3xl font-inter font-semibold mb-3 md:mb-3">
              {t('roadmap.ai_assessment_result')}
            </p>
          </div>
          <div className=" z-50 w-full max-w-sm mx-auto flex justify-center items-center mt-3 mb-8 rounded-xl bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1px]">
            <div className="w-full bg-black rounded-xl px-7 py-2 text-white text-base md:text-2xl flex justify-center items-center gap-3 mx-auto font-inter">
              <div>
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.1257 5.83337L16.7715 13.8542L24.7923 17.5L16.7715 21.1459L13.1257 29.1667L9.47982 21.1459L1.45898 17.5L9.47982 13.8542L13.1257 5.83337ZM13.1257 12.8771L11.6673 16.0417L8.50273 17.5L11.6673 18.9584L13.1257 22.123L14.584 18.9584L17.7486 17.5L14.584 16.0417L13.1257 12.8771ZM27.709 13.125L25.8715 9.12921L21.8757 7.29171L25.8715 5.46879L27.709 1.45837L29.5319 5.46879L33.5423 7.29171L29.5319 9.12921L27.709 13.125ZM27.709 33.5417L25.8715 29.5459L21.8757 27.7084L25.8715 25.8855L27.709 21.875L29.5319 25.8855L33.5423 27.7084L29.5319 29.5459L27.709 33.5417Z"
                    fill="url(#paint0_linear_202_1187)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_202_1187"
                      x1="17.5007"
                      y1="1.45837"
                      x2="17.5007"
                      y2="33.5417"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#0285FF" />
                      <stop offset="1" stop-color="#1EEF32" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              {t(`roadmap.${aiLevel}`)}
            </div>
          </div>
          <div className="w-full max-w-2xl mx-auto mb-10">
            <p className="text-center text-sm">
              {t(`roadmap.${aiLevel}_desc`)}
            </p>
          </div>
          <div className="w-full mx-auto relative">
            <div className="w-full max-w-4xl mx-auto">
              <div className="mb-5 md:mb-8">
                <p className="text-xl md:text-2xl font-medium mb-4 font-inter">
                  {t('roadmap.what_this_means.title')}
                </p>
                <p className="text-sm leading-relaxed max-w-4xl">
                  {t('roadmap.what_this_means.description')}
                </p>
              </div>
              <div className=" mb-5 md:mb-10">
                <p className="text-[#2C6AA4] font-semibold text-lg ">
                  {t('roadmap.typically')}
                </p>
                <ul className="text-sm font-medium pl-10 mt-3">
                  {t('roadmap.typically_points', { returnObjects: true }).map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 mt-2 first:mt-0">
                      <span>
                        <img
                          src="./assets/WebApp/icons/check.svg"
                          className="w-4"
                          alt=""
                        />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xl md:text-2xl font-inter font-semibold mb-8 md:mb-10">
                {t('roadmap.duration_roadmap', { days: 37 })}
              </p>
            </div>

            <div className="w-full max-w-xl mx-auto flex justify-center items-end  ">
              <div className="w-full grid grid-cols-1 gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <div className="absolute left-3 md:left-5 top-0 bottom-0 w-0.5 bg-white/70 block"></div>
                    <div className="space-y-6 md:space-y-8">
                      {roadmapSteps.map((step, index) => (
                        <div
                          key={index}
                          className="relative flex gap-2 md:gap-6"
                        >
                          <div
                            className={`${
                              step.locked === true
                                ? "w-7 h-7 md:w-12 md:h-12"
                                : " md:w-10 md:h-10 w-7 h-7 "
                            } md:border-8 border-black rounded-full`}
                          >
                            <div
                              className={`w-full h-full  ${
                                step.locked === true
                                  ? "bg-gradient-to-b from-[#01457a] to-[#0d6f2a] border border-[#FDF9F9] "
                                  : "bg-[#2b2b2b] "
                              } rounded-full flex items-center justify-center  z-10 `}
                            >
                              {!step.locked === true ? (
                                <i className="fa-solid fa-lock "></i>
                              ) : (
                                <p className="text-sm md:text-base font-semibold">
                                  {step.stepNumber}
                                </p>
                              )}
                            </div>
                          </div>

                          <div
                            className={`w-[90%] bg-gradient-to-l from-[#0285FF]/40 to-[#1EEF32]/40 p-[0.8px] rounded-lg relative `}
                          >
                            <div className=" bg-black rounded-lg p-3 md:p-4 ransition-all">
                              <div className="md:pl-5">
                                <div className="mb-1">
                                  <p className=" md:text-xl font-semibold font-inter">
                                    <span>{t('roadmap.phase_label', { step: step.stepNumber })}</span>
                                    {step.title}
                                  </p>
                                </div>
                                <div className="pt-2">
                                  <p className={`text-xs md:text-sm`}>
                                    {t('roadmap.goal_label', { goal: step.goal })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/ChallengeMap_7Days")}
          className=" w-full max-w-lg mx-auto flex justify-center items-center mt-14 md:mt-20 mb-14 rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1px]"
        >
          <div className="w-full bg-black rounded-md px-5 py-2 text-white text-base flex justify-center items-center gap-3 mx-auto font-inter">
            {t('roadmap.start_ai_journey')}
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </div>
        </button>
      </div>
    </div>
  );
}
