import React, { useState, useEffect } from 'react';
import "../Style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faChevronLeft, faChevronRight, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faFileLines, faHand } from '@fortawesome/free-regular-svg-icons';
import Header from '../../Layout/Header'; 
import { useSelector, useDispatch } from 'react-redux';
import { setUserEmail } from '../../../../../store';
import axiosInstance from '../../../../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const STYLE_ICON_MAP = {
  V: <FontAwesomeIcon icon={faChartColumn} className="w-6 h-6" />,
  A: <FontAwesomeIcon icon={faHeadphones} className="w-6 h-6" />,
  R: <FontAwesomeIcon icon={faFileLines} className="w-6 h-6" />,
  K: <FontAwesomeIcon icon={faHand} className="w-6 h-6" />,
};

export default function VarkAssessment() {
  const { t , i18n} = useTranslation('assessments');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const authToken = useSelector((state) => state.token);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const navigate = useNavigate();
const dispatch = useDispatch();


useEffect(() => {
  let isMounted = true;

  const loadQuestions = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/ai-assessment/vark/questions?language=${i18n.language}`
      );
      console.log("VARK Questions Response:", res.data);

      if (res.data?.redirect) {
        navigate(res.data.redirect);
        return;
      }

      if (isMounted) {
        setQuestions(res.data.questions || []);
      }

    } catch (err) {
      if (isMounted) {
        setError(err?.message || t('common.error_loading'));
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  if (authToken) loadQuestions();

  return () => {
    isMounted = false;
  };
}, [authToken, navigate, t, i18n.language]);


  useEffect(() => {
    setSelectedOption(answers[currentQuestion]?.key || null);
  }, [currentQuestion, answers]);

  if (loading) return null;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!questions.length) return null;

  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

const handleNext = async () => {
  if (selectedOption === null) return;

  const selectedOptionObj = currentQuestionData.options.find(
    (o) => o.key === selectedOption
  );

  const updatedAnswers = {
    ...answers,
    [currentQuestion]: selectedOptionObj,
  };

  setAnswers(updatedAnswers);

  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
    return;
  }
  try {
    const res = await axiosInstance.post("/api/ai-assessment/submit", {
      varkAnswers: Object.values(updatedAnswers),
      cpsAnswers: [],
      language: i18n.language
    });

    if (res.data?.user) {
      dispatch(setUserEmail(res.data.user));
    }

    if (res.data?.next) {
      navigate(res.data.next);
      return;
    }
    navigate("/");
  } catch (err) {
    setError(err?.message || t('common.submission_failed'));
  }
};

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-poppins">
      <Header />
      <div className="absolute bottom-0 -left-28 w-48 h-48 md:w-80 md:h-80">
        <img src='./assets/WebApp/crystal-holder.svg' alt="" />
      </div>
      <div className="absolute bottom-0 -right-20 w-36 h-36 md:w-64 md:h-64">
        <img src='./assets/WebApp/crystal-holder.svg' alt="" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="mb-8 md:mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm md:text-base">
              {t('common.question_progress', { current: currentQuestion + 1, total: questions.length })}
            </span>
            <span className="text-sm md:text-base">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] h-full rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <p className="font-inter text-lg lg:text-xl mb-6 md:mb-10 text-center md:text-left">
          {currentQuestionData.question}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {currentQuestionData.options.map((option) => (
            <div
              key={option.key}
              onClick={() => setSelectedOption(option.key)}
              className={`p-[1.5px] rounded-xl ${
                selectedOption === option.key
                  ? "bg-gradient-to-r from-[#00E5FFB2] to-[#00FF99CC] outer-shadow"
                  : "bg-gradient-to-r from-[#0285FF] to-[#1EEF32]"
              }`}
            >
              <button
                className={`w-full group relative px-4 py-6 md:px-6 md:py-8 rounded-xl transition-all duration-300 text-left
                  ${
                    selectedOption === option.key
                      ? 'bg-[#080b12] inner-gradient-shadow'
                      : 'bg-black'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 w-16 h-12 rounded flex justify-center items-center ${
                      selectedOption === option.key ? "bg-[#21252b]" : "bg-[#2b2b2b]"
                    }`}
                  >
                    {STYLE_ICON_MAP[option.value]}
                  </div>
                  <p className="text-sm">{option.text}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 flex justify-center items-center gap-6">
          <div className="bg-gradient-to-r from-[#0285FF]/60 to-[#1EEF32]/60 p-[1px] rounded-lg">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`w-40 py-2 bg-[#161616] flex justify-center items-center rounded-lg transition-all duration-300
                ${currentQuestion === 0 ? 'cursor-not-allowed' : 'text-white'}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
              <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 mr-2" />
              {t('common.previous')}
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#0285FF]/60 to-[#1EEF32]/60 p-[1px] rounded-lg">
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`w-40 py-2 bg-[#161616] flex justify-center items-center rounded-lg transition-all duration-300
                ${selectedOption === null ? 'cursor-not-allowed' : 'text-white'}`}
            >
              {currentQuestion < questions.length - 1 ? t('common.next') : t('common.complete')}
              {currentQuestion < questions.length - 1 && (
                <>
                  <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 ml-2" />
                  <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}