
 import React, { useState, useEffect } from 'react';
import "../Style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Header from '../../../../../NewLanding/Layout/Header'; // Matches original CSP import path
import { useSelector, useDispatch } from 'react-redux';
import { setUserEmail } from '../../../../../store';
import axiosInstance from '../../../../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const iconMap = {
  1: {
    A: { src: 'checklist.svg', cls: 'w-7 h-7' },
    B: { src: 'light-bulb.svg', cls: 'w-10 h-10' }
  },
  2: {
    A: { src: 'brain.svg', cls: 'w-9 h-9' },
    B: { src: 'eye.svg', cls: 'w-8 h-8' }
  },
  3: {
    A: { src: 'loop.svg', cls: 'w-7 h-7' },
    B: { src: 'shuffle.svg', cls: 'w-8 h-8' }
  },
  4: {
    A: { src: 'footsteps.svg', cls: 'w-8 h-8' },
    B: { src: 'magnify.svg', cls: 'w-6 h-6' }
  },
  5: {
    A: { src: 'openbook.svg', cls: 'w-8 h-8' },
    B: { src: 'spark.svg', cls: 'w-7 h-7' }
  },
  6: {
    A: { src: 'check.svg', cls: 'w-7 h-7' },
    B: { src: 'stopwatch.svg', cls: 'w-7 h-7' }
  },
  7: {
    A: { src: 'bullseye.svg', cls: 'w-7 h-7' },
    B: { src: 'trophy.svg', cls: 'w-7 h-7' }
  },
  8: {
    A: { src: 'flag.svg', cls: 'w-7 h-7' },
    B: { src: 'medal.svg', cls: 'w-8 h-8' }
  }
};

export default function CspAssessment() {
  const { t, i18n } = useTranslation('assessments');
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({}); // { qIndex: selectedOptionObj }
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
    const res = await axiosInstance.get(`/api/ai-assessment/cps/questions?language=${i18n.language}`);
      if (res.data?.redirect) {
            navigate(res.data.redirect);
            return;
          }

        if (isMounted) {
          setQuestions(res.data.questions || res.data); // safety for {questions: [...]}
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || t('common.error_loading'));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (authToken) loadQuestions();

    return () => {
      isMounted = false;
    };
  }, [authToken, t, i18n.language]);

  if (loading) return <div className="text-white text-center mt-10">{t('common.loading')}</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!questions.length) return <div className="text-white text-center mt-10">{t('common.no_questions')}</div>;

  const questionsPerPage = 2;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const pageQuestions = questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage);
  const progress = ((currentPage + 1) / totalPages) * 100;

  const handleOptionSelect = (qIndex, key) => {
    const question = questions[qIndex];
    const selectedOptionObj = question.options.find(o => o.key === key);
    setAnswers({ ...answers, [qIndex]: selectedOptionObj });
  };

  const isPageComplete = () => {
    return pageQuestions.every((_, localIdx) => {
      const qIndex = currentPage * questionsPerPage + localIdx;
      return answers[qIndex] !== undefined;
    });
  };

  const handleNext = async () => {
    if (!isPageComplete()) return;

    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Final submission
      try {
      const res=  await axiosInstance.post("/api/ai-assessment/submit", {
          varkAnswers: [],
          cpsAnswers: Object.values(answers),
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
        setError(err.message || t('common.submission_failed'));
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getIconComponent = (questionId, optionKey) => {
    const iconInfo = iconMap[questionId]?.[optionKey];
    if (!iconInfo) {
      console.warn(`No icon defined for question ${questionId} option ${optionKey}`);
      return null;
    }
    return (
      <img
        src={`./assets/WebApp/icons/${iconInfo.src}`}
        className={iconInfo.cls}
        alt=""
      />
    );
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
              {t('common.question_progress', { current: currentPage * 2 + 1, total: questions.length })}
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

        <div className="space-y-6 md:space-y-8">
          {pageQuestions.map((question, localIndex) => {
            const qIndex = currentPage * questionsPerPage + localIndex;
            return (
              <div key={question.id}>
                <p className="font-inter text-lg lg:text-xl mb-6 text-left">
                  {qIndex + 1}. {question.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {question.options.map((option) => (
                    <div
                      key={option.key}
                      onClick={() => handleOptionSelect(qIndex, option.key)}
                      className={`p-[1.5px] rounded-xl ${
                        answers[qIndex]?.key === option.key
                          ? "bg-gradient-to-r from-[#00E5FFB2] to-[#00FF99CC] outer-shadow"
                          : "bg-gradient-to-r from-[#0285FF] to-[#1EEF32]"
                      }`}
                    >
                      <button
                        className={`w-full group relative px-4 py-4 md:px-4 md:py-6 rounded-xl transition-all duration-300 text-left
                          ${
                            answers[qIndex]?.key === option.key
                              ? 'bg-[#080b12] inner-gradient-shadow'
                              : 'bg-black'
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex-shrink-0 w-12 h-8 sm:w-16 sm:h-12 rounded flex justify-center items-center ${
                              answers[qIndex]?.key === option.key ? "bg-[#21252b]" : "bg-[#2b2b2b]"
                            }`}
                          >
                            {getIconComponent(question.id, option.key)}
                          </div>
                          <p className="text-sm">{option.text}</p>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 md:mt-12 flex justify-center items-center gap-6">
          <div className="bg-gradient-to-r from-[#0285FF]/60 to-[#1EEF32]/60 p-[1px] rounded-lg">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className={`w-40 py-2 bg-[#161616] flex justify-center items-center rounded-lg transition-all duration-300
                ${currentPage === 0 ? 'cursor-not-allowed' : 'text-white'}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
              <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 mr-2" />
              {t('common.previous')}
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#0285FF]/60 to-[#1EEF32]/60 p-[1px] rounded-lg">
            <button
              onClick={handleNext}
              disabled={!isPageComplete()}
              className={`w-40 py-2 bg-[#161616] flex justify-center items-center rounded-lg transition-all duration-300
                ${!isPageComplete() ? 'cursor-not-allowed' : 'text-white'}`}
            >
              {currentPage < totalPages - 1 ? t('common.next') : t('common.complete')}
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 ml-2" />
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}