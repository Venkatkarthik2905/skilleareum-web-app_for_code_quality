import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import "../Style/style.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserEmail } from "../../../../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../../../config/axiosInstance";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function AiAssessment() {
  const { t , i18n} = useTranslation('assessments');
  const authToken = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Adding navigate for better consistency

  const [pages, setPages] = useState([]);      // dynamic question pages
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /** -----------------------------------------------
   * FETCH QUESTIONS DYNAMICALLY + REDIRECT BASED ON PROGRESS
   * ----------------------------------------------- */
  useEffect(() => {
    let mounted = true;

    const loadQuestions = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(`/api/ai-assessment/AI/questions?language=${i18n.language}`);


        if (!mounted) return;

        if (res.data.redirect) {
          window.location.href = res.data.redirect;
          return;
        }

        if (res.data.questions && res.data.questions.length > 0) {
          const chunked = [];
          const q = res.data.questions;

          for (let i = 0; i < q.length; i += 4) {
            chunked.push({
              questions: q.slice(i, i + 4)
            });
          }

          setPages(chunked);
        }

      } catch (err) {
        if (mounted) setError(err?.response?.data?.error || t('common.error_loading'));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (authToken) loadQuestions();

    return () => {
      mounted = false;
    };
  }, [authToken, t, i18n.language]);


  const handleOptionSelect = (questionId, valueObj) => {
    setAnswers({
      ...answers,
      [questionId]: valueObj
    });
  };


  /** -----------------------------------------------
   * CALCULATE PROGRESS
   * ----------------------------------------------- */
  if (loading) return null;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (pages.length === 0) return null;

  const totalQuestions = pages.reduce((count, pg) => count + pg.questions.length, 0);
  const currentPageData = pages[currentPage];

  const answeredOnCurrentPage = currentPageData.questions.filter(
    (q) => answers[q.id]
  ).length;

  const questionsBefore = currentPage * 4;
  const progress = ((questionsBefore + answeredOnCurrentPage) / totalQuestions) * 100;


  /** -----------------------------------------------
   * NAVIGATION HANDLERS
   * ----------------------------------------------- */
  const isPageComplete = () =>
    currentPageData.questions.every((q) => answers[q.id]);

  const handleNext = async () => {
    if (!isPageComplete()) return;

    // LAST PAGE → SUBMIT ANSWERS
    if (currentPage === pages.length - 1) {
      try {
        const formatted = Object.values(answers);

        const res = await axiosInstance.post("/api/ai-assessment/submit", {
          varkAnswers: [],
          cpsAnswers: [],
          aiAnswers: formatted,
          language: i18n.language
        });

        toast.success(t('common.submission_success'));

        if (res.data?.user) {
          dispatch(setUserEmail(res.data.user));
        }

        if (res.data.next) {
          window.location.href = res.data.next;
        }

      } catch (err) {
        setError(err?.response?.data?.error || t('common.submission_failed'));
      }

      return;
    }

    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage === 0) return;
    setCurrentPage(currentPage - 1);
  };


  /** -----------------------------------------------
   * RENDER UI (UNCHANGED DESIGN)
   * ----------------------------------------------- */
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-black text-white relative overflow-hidden font-poppins">

        <div className="absolute bottom-0 -left-28 w-48 h-48 md:w-80 md:h-80">
          <img src="./assets/WebApp/crystal-holder.svg" alt="" />
        </div>

        <div className="absolute bottom-0 -right-20 w-36 h-36 md:w-64 md:h-64">
          <img src="./assets/WebApp/crystal-holder.svg" alt="" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 pb-10">

          {/* ------------------- Progress Bar ------------------- */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold">
                {t('common.question_progress', { current: questionsBefore + 1, total: totalQuestions })}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] h-full rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* ------------------- Questions ------------------- */}
          <div className="space-y-4 md:space-y-5">
            {currentPageData.questions.map((question, index) => (
              <div key={question.id}>
                <p className="text-base md:text-lg font-normal mb-3 md:mb-4">
                  {questionsBefore + index + 1}. {question.question}
                </p>

                <div className="space-y-2">
                  {question.options.map((option) => (
                    <button
                      key={option.key}
                      onClick={() =>
                        handleOptionSelect(question.id, option)
                      }
                      className="group relative w-full text-left flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center bg-[#2b2b2b]">
                        {answers[question.id]?.key === option.key && (
                          <i className="fa-solid fa-check"></i>
                        )}
                      </div>
                      <p className="text-sm">{option.text}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ------------------- Navigation Buttons ------------------- */}
          <div className="pb-10 mt-5 flex justify-center items-center gap-6">
            <div className="bg-gradient-to-r from-[#0285FF]/60 to-[#1EEF32]/60 p-[1px] rounded-lg ">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className={`w-40 py-2 bg-[#161616] flex justify-center items-center rounded-lg transition-all duration-300
                ${currentPage === 0 ? "cursor-not-allowed" : "text-white"}`}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
                <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 mr-2" />
                {t('common.previous')}
              </button>
            </div>

            <div className="bg-gradient-to-r from-[#0285FF]/60 to-[#1EEF32]/60 p-[1px] rounded-lg ">
              <button
                onClick={handleNext}
                disabled={!isPageComplete()}
                className={`w-40 py-2 bg-[#161616] flex justify-center items-center rounded-lg transition-all duration-300
                ${!isPageComplete() ? "cursor-not-allowed" : "text-white"}`}
              >
                {currentPage === pages.length - 1 ? t('common.complete') : t('common.next')}
                {currentPage < pages.length - 1 && (
                  <>
                    <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 ml-2" />
                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
