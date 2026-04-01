import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../../Assessments/Style/style.css";
import ResultPage from "./ResultPage";
import axiosInstance from "../../../../../../config/axiosInstance";
import { useTranslation } from "react-i18next";

const AIFailureFiles = () => {
  const { t, i18n } = useTranslation("ai_failure");
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const [currentCase, setCurrentCase] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const day = new URLSearchParams(location.search).get("day") || localStorage.getItem("day");
  const source = new URLSearchParams(location.search).get("source");

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchCases = async () => {
      try {
        const res = await axiosInstance.get("/api/ai-activity/ai-failure-case/questions", {
          params: { day, source, lang: i18n.language || 'en' }
        });

        if (res.data.completed && res.data.redirect) {
          setRedirecting(true);
          toast.success(res.data.message);
          setTimeout(() => navigate(res.data.redirect), 2500);
          return;
        }

        const parsedCases = (res.data.cases || []).map(c => ({
          ...c,
          description: JSON.parse(c.description),
          options: JSON.parse(c.options)
        }));

        setCases(parsedCases);

      } catch (err) {
        console.error("Error fetching cases:", err);
        toast.error(t("game.loading_error") || "Error loading cases");
        setFetchError(t("game.loading_error") || "Failed to load cases. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [day, source, navigate, t]);

  const totalCases = cases.length;
  const currentCaseData = cases[currentCase] || {};

  const handleOptionSelect = (optionId) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    setShowFeedback(true);

    const isCorr = selectedOption === currentCaseData.correctAnswer;
    if (isCorr) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [...prev, {
      questionId: currentCaseData.id,
      response: selectedOption
    }]);
  };

  const submitAnswers = async () => {
    const loadingToast = toast.loading(t("game.submitting"));

    try {
      const res = await axiosInstance.post("/api/ai-activity/ai-failure-case/submit", {
        answers: userAnswers,
        day,
        lang: i18n.language || 'en'
      });

      toast.success(t("game.submitted"));
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data?.error || t("game.submission_failed"));
      } else {
        toast.error(t("game.network_error"));
      }
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleNext = () => {
    if (currentCase < totalCases - 1) {
      setCurrentCase(currentCase + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      submitAnswers();
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentCase(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setUserAnswers([]);
    setQuizComplete(false);
    navigate(`/${source}`)
  };

  const isCorrect = selectedOption === currentCaseData.correctAnswer;

  if (loading) {
    return <div className="text-white text-center mt-28">{t("game.loading")}</div>;
  }

  if (fetchError) {
    return <div className="text-white text-center mt-28">{fetchError}</div>;
  }

  if (redirecting) {
    return <div className="text-center">{t("game.claimed_redirect")}</div>;
  }

  if (cases.length === 0) {
    return <div className="text-white text-center mt-28">{t("game.no_cases")}</div>;
  }

  return (
    <div>
      {quizComplete === false ? (
        <div className="mt-28 flex items-center justify-center p-2 relative overflow-hidden font-poppins">
          <div className="relative w-full max-w-4xl">
            <div className="flex items-start justify-start mb-3 md:mb-5">
              <div className="w-[25%] hidden md:block">
                <div className="flex gap-2 mt-3">
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
              <div className="w-full text-center">
                <p className="md:text-xl lg:text-2xl font-inter font-light text-white mb-2 uppercase">
                  {t("game.title")}
                </p>
                <p className="text-[#0285FF] text-base md:text-lg font-medium">
                  {t("game.failure_info", { current: currentCase + 1, total: totalCases })}
                </p>
              </div>
            </div>

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

            <div className="mb-5 md:mb-7 w-full max-w-3xl mx-auto">
              <div className="mb-4">
                <p className="text-2xl md:text-3xl font-semibold font-inter text-white mb-3 md:mb-5">
                  {t("game.question_header", { number: currentCase + 1 })}
                </p>
                <p className="text-xl md:text-2xl font-medium text-[#1EEF32] mb-4">
                  {currentCaseData.title}
                </p>
              </div>
              <div className="text-base md:text-lg text-white leading-relaxed font-light mb-8">
                {currentCaseData.description?.map((para, index) => (
                  <p key={index} className="mb-4 text-justify">
                    {para}
                  </p>
                ))}
              </div>
              
              <p className="text-lg md:text-2xl font-medium text-white text-center mb-6">
                {currentCaseData.question}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto mb-8 px-4">
              {currentCaseData.options?.map((option) => {
                const isSelected = selectedOption === option.id;
                const isCorrectOption = option.id === currentCaseData.correctAnswer;
                const showCorrect = showFeedback && isCorrectOption;
                const showIncorrect = showFeedback && isSelected && !isCorrectOption;

                return (
                  <div
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`relative rounded-xl p-[0.8px] ${
                      showCorrect
                        ? "bg-[#1EEF32]/10"
                        : showIncorrect
                        ? "bg-[#F00527]/10"
                        : "bg-gradient-to-r from-[#0285FF] to-[#1EEF32]"
                    }`}
                  >
                    <button
                      disabled={showFeedback}
                      className={`w-full h-full p-4 md:p-5 rounded-xl text-left transition-all duration-300 ${
                        showCorrect
                          ? "bg-[#1EEF32]/10"
                          : showIncorrect
                          ? "bg-[#F00527]/10"
                          : isSelected
                          ? "bg-black/50"
                          : "bg-black"
                      } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base uppercase font-semibold ${
                            showCorrect
                              ? "bg-[#1EEF32] text-white"
                              : showIncorrect
                              ? "bg-[#F00527] text-white"
                              : "bg-[#D9D9D933] text-white"
                          }`}
                        >
                          {option.id}
                        </span>
                        <span
                          className={`text-sm md:text-base font-medium flex-1 ${
                            showCorrect
                              ? "text-[#1EEF32]"
                              : showIncorrect
                              ? "text-[#F22B2B]"
                              : "text-white"
                          }`}
                        >
                          {option.text}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {!showFeedback && (
              <div className="flex justify-center px-4">
                <div
                  onClick={handleSubmit}
                  className={`z-20 cursor-pointer rounded-xl w-[40%] h-9 relative ${
                    selectedOption ? "opacity-100" : "opacity-50 cursor-not-allowed"
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
                        <span className="text-xl text-[#1EEF32]">{t("game.correct_analysis")}</span>
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

                  <p className="text-white leading-relaxed text-base mb-6">
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
          score={score}
          totalCases={totalCases}
          handleRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default AIFailureFiles;