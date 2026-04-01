import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../../Assessments/Style/style.css";
import ResultPage from "./ResultPage";
import axiosInstance from "../../../../../../config/axiosInstance";
import { useTranslation } from "react-i18next";

const AIToolArena = () => {
  const { t, i18n } = useTranslation("ai_arena");
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const [currentCase, setCurrentCase] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [userAnswers, setUserAnswers] = useState([]);


  const location = useLocation();
  const day = new URLSearchParams(location.search).get("day") || localStorage.getItem("day");
  const source = new URLSearchParams(location.search).get("source");
  

  const hasFetched = useRef(false);
  const navigate = useNavigate();

useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;

  const fetchCases = async () => {
    try {
      const res = await axiosInstance.get("/api/ai-activity/ai-tool-arena-case/questions", {
        params: { day, source, lang: i18n.language || 'en' }
      });

      console.log("res", res.data);

      if (res.data.completed && res.data.redirect) {
        setRedirecting(true);
        toast.success(res.data.message);
        setTimeout(() => navigate(res.data.redirect), 2500);
        return;
      }

      const safeParseJSON = (value) => {
  try {
    if (!value) return [];
    return JSON.parse(value);
  } catch (e) {
    console.error("Invalid JSON:", value);
    return [];
  }
};

    const parsedCases = (res.data.cases || []).map(c => ({
      ...c,
      description: safeParseJSON(c.description),
      options: safeParseJSON(c.options)
    }));

    setCases(parsedCases);


    } catch (err) {
      console.error("Error fetching cases:", err);
      toast.error("Error loading cases");
      setFetchError("Failed to load cases. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchCases();
}, []);

  const totalCases = cases.length;
  const currentCaseData = cases[currentCase] || {};

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  // Auto-submit on timeout (treat as incorrect if no selection)
  useEffect(() => {
    if (timeLeft === 0 && !showFeedback) {
      handleSubmit(true); // forced = incorrect
    }
  }, [timeLeft, showFeedback]);

  const handleOptionSelect = (optionId) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = (forced = false) => {
    if (!forced && !selectedOption) return;

    setShowFeedback(true);

    const answered = forced ? null : selectedOption;
    const isCorr = answered === currentCaseData.correctAnswer;
    if (isCorr) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [...prev, {
      questionId: currentCaseData.id,
      response: answered
    }]);
  };

  const submitAnswers = useCallback(async () => {
    const loadingToast = toast.loading(t("game.submitting"));

    try {
      const res = await axiosInstance.post("/api/ai-activity/ai-tool-arena-case/submit", {
        answers: userAnswers,
        day,
        lang: i18n.language || 'en'
      });

      if (res.data.rewardApplied) {
        toast.success(t("game.reward_credited"));
      }

      toast.success(t("game.submitted"));

    } catch (err) {
      toast.error(err.response?.data?.error || t("game.network_error"));
    } finally {
      toast.dismiss(loadingToast);
    }
  }, [userAnswers, day, i18n.language, t]);

  const handleNext = useCallback(() => {
    if (currentCase < totalCases - 1) {
      setCurrentCase(currentCase + 1);
      setTimeLeft(15);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      submitAnswers();
      setQuizComplete(true);
    }
  }, [currentCase, totalCases, submitAnswers]);

  // Auto-advance on timeout after showing feedback
  useEffect(() => {
    if (showFeedback && timeLeft === 0 && !quizComplete) {
      const timer = setTimeout(() => {
        handleNext();
      }, 5000); // 5 seconds delay for reading feedback
      return () => clearTimeout(timer);
    }
  }, [showFeedback, timeLeft, quizComplete, handleNext]);

  const handleRestart = () => {
    setCurrentCase(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setTimeLeft(15);
    setUserAnswers([]);
    setQuizComplete(false);
    navigate(`/${source}`)
  };

  const isCorrect = selectedOption === currentCaseData.correctAnswer;
  const passPercentage = 60;
  const userPercentage = totalCases > 0 ? (score / totalCases) * 100 : 0;
  const hasPassed = userPercentage >= passPercentage;

  if (loading) {
    return <div className="text-white text-center mt-28">{t("game.loading")}</div>;
  }

  if (fetchError) {
    return <div className="text-white text-center mt-28">{fetchError}</div>;
  }

  if (redirecting) {
    return <div className="text-white text-center mt-28">{t("game.redirecting")}</div>;
  }

  if (cases.length === 0) {
    return <div className="text-white text-center mt-28">{t("game.no_battles")}</div>;
  }

  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      {quizComplete === false ? (
        <div className="mt-28 flex items-center justify-center p-2 relative overflow-hidden font-poppins">
          <div className="relative w-full max-w-4xl">
            <div className="flex items-start justify-center md:justify-end gap-10 mb-4 md:mb-6">
              <div className="mt-5">
                <p className="md:text-lg lg:text-xl tracking-wide font-inter font-medium text-white">
                  {t("game.battle_info", { current: currentCase + 1, total: totalCases })}
                </p>
              </div>

              <div className="w-[30%] hidden md:block">
                <div className="flex gap-2 mt-8">
                  {[...Array(totalCases)].map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 h-1.5 md:h-2 rounded-full overflow-hidden bg-[#D9D9D936]"
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          index <= currentCase ? "bg-[#0285FF]" : "bg-[#D9D9D936]"
                        }`}
                        style={{
                          width: index < currentCase ? "100%" : index === currentCase ? "100%" : "0%",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Timer - fixed to 15 seconds */}
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="30"
                    stroke="#FFFFFF80"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="30"
                    stroke="#0285FF"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    strokeDashoffset={`${2 * Math.PI * 30 * (1 - timeLeft / 15)}`}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-medium font-inter text-white">
                    {String(timeLeft).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Progress */}
            <div className="w-[70%] mx-auto md:hidden block">
              <div className="flex gap-2 mt-3 mb-5">
                {[...Array(totalCases)].map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 h-1.5 md:h-2 rounded-full overflow-hidden bg-[#D9D9D936]"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        index <= currentCase ? "bg-[#0285FF]" : "bg-[#D9D9D936]"
                      }`}
                      style={{
                        width: index < currentCase ? "100%" : index === currentCase ? "100%" : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <p className="text-lg md:text-xl font-medium text-white mb-3 md:mb-5">
              {currentCaseData.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto mb-5 px-4">
              {currentCaseData.options?.map((option) => {
                const isSelected = selectedOption === option.id;
                const isCorrectOption = option.id === currentCaseData.correctAnswer;
                const showCorrect = showFeedback && isCorrectOption;
                const showIncorrect = showFeedback && isSelected && !isCorrectOption;

                return (
                  <div
                    key={option.id}
                    onClick={() => !showFeedback && handleOptionSelect(option.id)}
                    className={`relative rounded-xl p-[0.8px]
                      ${showCorrect ? "bg-[#1EEF32]/10" : showIncorrect ? "bg-[#E41D1D]/10" : "bg-gradient-to-r from-[#0285FF] to-[#1EEF32]"}
                    `}
                  >
                    <button
                      disabled={showFeedback}
                      className={`w-full h-full p-4 md:p-5 rounded-xl text-left transition-all duration-300
                        ${showCorrect ? "bg-[#1EEF32]/10" : showIncorrect ? "bg-[#E41D1D]/10" : isSelected ? "bg-black/30" : "bg-black"}
                        ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center
                            ${showCorrect ? "bg-[#1EEF32]" : showIncorrect ? "bg-[#F00527]" : "bg-[#D9D9D933]"}
                          `}
                        >
                          <i className={`fas ${option.icon} text-xl`}></i>
                        </span>

                        <p
                           className={`text-sm md:text-base flex-1
                             ${showCorrect ? "text-[#1EEF32]" : showIncorrect ? "text-[#F22B2B]" : "text-white"}
                           `}
                         >
                           <span className="text-[#0285FF] uppercase tracking-wide font-medium">
                             {t("game.tool_label", { id: option.id })}
                           </span>
                           <br />
                           <span className="font-light">{option.text}</span>
                         </p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {!showFeedback && (
              <div className="flex justify-center px-4">
                <div
                  onClick={() => handleSubmit()}
                  className={`z-20 cursor-pointer rounded-xl w-[70%] md:w-[40%] h-9 relative ${
                    selectedOption ? "hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
                  }`}
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                  }}
                >
                  <div className="h-9 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
                  <div className="h-9 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
                  <div className="bg-[#070e3a4b] backdrop-blur-sm h-9 rounded-xl w-full border-[0.5px] border-[#1AE348]"></div>
                  <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                    <p
                      className="uppercase font-medium text-center text-sm font-zendots"
                      style={{
                        color: "transparent",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
                      }}
                    >
                      {t("game.submit_answer")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {showFeedback && (
              <div
                className={`bg-gradient-to-b ${
                  isCorrect ? "from-[#1EEF32] to-[#0285FF]" : "from-[#F22B2B] to-[#0285FF]"
                } p-[0.8px] rounded-xl w-full max-w-3xl mx-auto`}
              >
                <div className="bg-[#080B1C] rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    {isCorrect ? (
                      <>
                        <img src="./assets/WebApp/icons/check.svg" className="w-5" alt="correct" />
                        <span className="text-xl text-[#1EEF32]">{t("game.correct_insight")}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-[#F22B2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-2xl font-semibold text-[#F22B2B]">{t("game.incorrect")}</span>
                      </>
                    )}
                    <p className="text-gray-400 text-sm">
                      {t("game.correct_answer")}{" "}
                      <span className="text-white uppercase font-medium">
                        {currentCaseData.correctAnswer}
                      </span>
                    </p>
                  </div>

                  <p className="text-white leading-relaxed text-base">
                    {currentCaseData.explanation}
                  </p>

                  <div className="flex justify-end">
                    <div
                      onClick={handleNext}
                      className="mt-3 cursor-pointer rounded-xl w-48 h-9 relative"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                      }}
                    >
                      <div className="h-9 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
                      <div className="h-9 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
                      <div className="bg-[#070e3a4b] backdrop-blur-sm h-9 rounded-xl w-full border-[0.5px] border-[#1AE348]"></div>
                      <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                        <p
                          className="uppercase font-medium text-center text-sm font-zendots"
                          style={{
                            color: "transparent",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
                          }}
                        >
                          {currentCase < totalCases - 1 ? t("game.next_case") : t("game.view_results")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ResultPage
          hasPassed={hasPassed}
          score={score}
          totalCases={totalCases}
          handleRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default AIToolArena;