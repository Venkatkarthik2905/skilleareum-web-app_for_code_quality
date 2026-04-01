import React, { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import "../../../Assessments/Style/style.css";
import ResultPage from "./ResultPage";
import axiosInstance from "../../../../../../config/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AIMythBreaker = () => {
  const { t, i18n } = useTranslation("ai_myth");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const navigate  = useNavigate()

  const location = useLocation();
  const day = new URLSearchParams(location.search).get("day") || localStorage.getItem("day");
  const source = new URLSearchParams(location.search).get("source");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0); // Fixed: start from 0
  const [userAnswers, setUserAnswers] = useState([]);




const hasFetched = useRef(false);
const [redirecting, setRedirecting] = useState(false);

useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;

  const fetchQuestions = async () => {
    try {
      const res = await axiosInstance.get("/api/ai-activity/ai-myth/questions", {
        params: { day, source, lang: i18n.language || 'en' }
      });

      console.log("fetchQuestions", res.data);

      if (res.data.completed  && res.data.redirect) {
        setRedirecting(true);
        toast.success(res.data.message);

        setTimeout(() => {
          navigate(res.data.redirect);
        }, 2500);

        return; 
      }

      setQuestions(res.data.questions);

    } catch (err) {
      console.error("Error fetching questions:", err);
      toast.error(t("game.error_loading"));
      setFetchError(t("game.error_loading"));
    } finally {
      setLoading(false);
    }
  };

  fetchQuestions();
}, [day, source]);



  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestion] || {};

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  // Auto-handle timeout as incorrect
  useEffect(() => {
    if (timeLeft === 0 && !showFeedback && selectedAnswer === null) {
      handleAnswer(null);
    }
  }, [timeLeft, showFeedback, selectedAnswer]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorr = answer !== null && String(answer) === String(currentQ.correctAnswer);
    if (isCorr) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [...prev, {
      questionId: currentQ.id,
      response: answer
    }]);
  };

  const submitAnswers = useCallback(async () => {
    const loadingToast = toast.loading(t("game.submitting"));

    try {
      const res = await axiosInstance.post("/api/ai-activity/ai-myth/submit", {
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
  }, [userAnswers, day, i18n.language, t]);


  const handleNext = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      submitAnswers();
      setQuizComplete(true);
    }
  }, [currentQuestion, totalQuestions, submitAnswers]);

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
    setCurrentQuestion(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setUserAnswers([]);
    setQuizComplete(false);
    navigate(`/${source}`);
  };

  const isCorrect = selectedAnswer !== null && String(selectedAnswer) === String(currentQ.correctAnswer);
  const passPercentage = 60;
  const userPercentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const hasPassed = userPercentage >= passPercentage;

  if (redirecting) {
  return <div className="text-center">{t("game.claimed_redirect")}</div>;
}

  if (loading) {
    return <div className="text-white text-center mt-28">{t("game.loading")}</div>;
  }

  if (fetchError) {
    return <div className="text-white text-center mt-28">{fetchError}</div>;
  }

  if (questions.length === 0) {
    return <div className="text-white text-center mt-28">{t("game.no_questions")}</div>;
  }

  return (
    <div>
      {quizComplete === false ? (
        <div className="mt-28 flex items-center justify-center p-4 relative overflow-hidden font-poppins">
          <div className="relative w-full max-w-4xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div>
                <p className="md:text-xl lg:text-2xl font-inter font-light text-white mb-2">
                  {t("game.title")}
                </p>
                <p className="text-[#0285FF] text-base md:text-lg font-medium">
                  {t("game.myth_info", { current: currentQuestion + 1, total: totalQuestions })}
                </p>
              </div>
              <div className="w-[30%] hidden md:block">
                <div className="flex gap-2 mt-3">
                  {[...Array(totalQuestions)].map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 h-1.5 md:h-2 rounded-full overflow-hidden bg-[#D9D9D936]"
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          index <= currentQuestion ? "bg-[#0285FF]" : "bg-[#D9D9D936]"
                        }`}
                        style={{
                          width: index < currentQuestion ? "100%" : index === currentQuestion ? "100%" : "0%",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Timer - Fixed calculation to use 15 seconds correctly */}
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

            {/* Mobile Progress Bar */}
            <div className="w-[70%] mx-auto md:hidden block">
              <div className="flex gap-2 mt-3 mb-5">
                {[...Array(totalQuestions)].map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 h-1.5 md:h-2 rounded-full overflow-hidden bg-[#D9D9D936]"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        index <= currentQuestion ? "bg-[#0285FF]" : "bg-[#D9D9D936]"
                      }`}
                      style={{
                        width: index < currentQuestion ? "100%" : index === currentQuestion ? "100%" : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-[1px] rounded-2xl mb-8 md:mb-12 w-full max-w-3xl mx-auto">
              <div className="bg-[#080B1C] rounded-2xl p-5 md:p-7">
                <p className="text-xl md:text-2xl font-semibold font-inter text-white mb-3 md:mb-4">
                  {t("game.question", { number: currentQuestion + 1 })}
                </p>
                <p className="text-base md:text-base lg:text-lg text-white leading-relaxed">
                  "{currentQ.text}"
                </p>
              </div>
            </div>

            {/* Answer Buttons */}
            {!showFeedback && (
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center max-w-xl mx-auto">
                <button
                  onClick={() => handleAnswer("true")}
                  disabled={selectedAnswer !== null}
                  className={`px-8 md:px-10 py-1.5 md:py-2 rounded-lg text-lg md:text-xl transition-all duration-300 hover:outer-shadow ${
                    selectedAnswer === "true"
                      ? "bg-[#10b981] border-4 border-[#1EEF3280] text-white scale-105"
                      : "bg-transparent hover:border-4 border-2 border-[#1EEF3280] text-white hover:bg-[#10b981]/10 hover:scale-105"
                  } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/30`}
                >
                  {t("game.true")}
                </button>
                <button
                  onClick={() => handleAnswer("false")}
                  disabled={selectedAnswer !== null}
                  className={`px-5 md:px-10 py-1.5 md:py-2 rounded-lg text-lg md:text-xl transition-all duration-300 ${
                    selectedAnswer === "false"
                      ? "bg-[#ef4444] border-[#F22B2B80] text-white scale-105"
                      : "bg-transparent hover:border-4 border-2 border-[#F22B2B80] text-white hover:bg-[#F22B2B80]/10 hover:scale-105"
                  } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/30`}
                >
                  {t("game.false")}
                </button>
              </div>
            )}

            {/* Feedback Card */}
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
                        <span className="text-xl text-[#1EEF32]">{t("game.correct")}</span>
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
                      {t("game.correct_answer")} <span className="text-white uppercase font-medium">{currentQ.correctAnswer}</span>
                    </p>
                  </div>
                  <p className="text-white leading-relaxed text-base">{currentQ.explanation}</p>
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
                          {t("game.next")}
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
          totalQuestions={totalQuestions}
          handleRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default AIMythBreaker;