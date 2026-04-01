import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataSpinners from "../../../../../../Spinner";
import { SERVER_URL } from "../../../../../../config";

const shuffleArray = (items = []) => [...items].sort(() => 0.5 - Math.random());

const normalizeAnswer = (value) =>
  String(value || "")
    .trim()
    .replace(/^([a-d])[.):-]\s*/i, "")
    .replace(/\s+/g, " ")
    .toLowerCase();

const resolveQuestionAnswer = (question) => {
  const rawAnswer = String(question?.answer || "").trim();
  const normalizedRawAnswer = normalizeAnswer(rawAnswer);
  const optionMap = {
    a: question?.option_a,
    b: question?.option_b,
    c: question?.option_c,
    d: question?.option_d,
    option_a: question?.option_a,
    option_b: question?.option_b,
    option_c: question?.option_c,
    option_d: question?.option_d,
  };

  return optionMap[normalizedRawAnswer] || rawAnswer;
};

const AssessmentWeb = ({ day, source }) => {
  const { t , i18n} = useTranslation("assessments");
  // const { playSound } = useSettings();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [droppedWord, setDroppedWord] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    imgSrc: "",
    answer: "",
  });
  const [points, setPoints] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [timeTaken, setTimeTaken] = useState(0);
  const authToken = useSelector((state) => state.token);
  const email = useSelector((state) => state.user_email.id);
  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();

  const courseName = "TelegramLogin";
  const courseId = "3";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/get_questions`, {
          params: { 
            day: day || localStorage.getItem("day"),
            language: i18n.language || 'en',
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        let allQuestions = response.data.questions;
        if (allQuestions.length === 0) {
          throw new Error("No questions found.");
        }

        allQuestions = allQuestions.map((q) => {
          if (q.question_type === "options" || q.question_type === "drag_drop") {
            const opts = [q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean);
            return {
              ...q,
              shuffledOptions: shuffleArray(opts),
            };
          }
          return { ...q };
        });

        allQuestions = shuffleArray(allQuestions);

        // Filter questions by types and ensure no repeats
        const selectedQuestions = selectRandomQuestions(allQuestions);

        setQuestions(selectedQuestions);

        // Set time for the first question
        setTimeLeft(selectedQuestions[0]?.time || 0);
      } catch (error) {
        console.error("Error fetching or processing questions:", error);
      }
    };

    fetchQuestions();
  }, [day]);

  const selectRandomQuestions = (allQuestions) => {
    const trueFalseQuestions = [];
    const yesNoQuestions = [];
    const optionQuestions = [];
    const dragDropQuestions = [];
    const selectedQuestions = [];

    // Categorize questions by type
    allQuestions.forEach((question) => {
      if (question.question_type === "true_false") {
        trueFalseQuestions.push(question);
      } else if (question.question_type === "yes_no") {
        yesNoQuestions.push(question);
      } else if (question.question_type === "options") {
        optionQuestions.push(question);
      } else if (question.question_type === "drag_drop") {
        dragDropQuestions.push(question);
      }
    });

    // Select random questions without repeats
    selectedQuestions.push(...getRandomItems(trueFalseQuestions, 2));
    selectedQuestions.push(...getRandomItems(yesNoQuestions, 1));
    selectedQuestions.push(...getRandomItems(optionQuestions, 1));
    selectedQuestions.push(...getRandomItems(dragDropQuestions, 1));

    if (selectedQuestions.length < 5) {
      const selectedIds = new Set(selectedQuestions.map((question) => question.id));
      const remainingQuestions = allQuestions.filter(
        (question) => !selectedIds.has(question.id)
      );
      selectedQuestions.push(
        ...getRandomItems(remainingQuestions, 5 - selectedQuestions.length)
      );
    }

    return shuffleArray(selectedQuestions);
  };

  const getRandomItems = (array, count) => {
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, count);
  };


  const [popupGif, setPopupGif] = useState(null);

  const handleNextQuestion = useCallback(() => {
    // playSound();
    setIsTimerRunning(false);
    const currentQ = questions[currentQuestion];
    // console.log("currentQ", currentQ);
    const answer = answers.find((a) => a.questionId === currentQ.id);
    const correctAnswer = resolveQuestionAnswer(currentQ);
    // console.log("answer", answer);
    // const isCorrect = answer && answer.response === currentQ.answer;
    const isCorrect =
      answer && normalizeAnswer(answer.response) === normalizeAnswer(correctAnswer);

    if (isCorrect) {
      setCorrectStreak((prev) => prev + 1);
      setWrongStreak(0);
      setPopupGif(
        "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/YES_Icon.gif"
      );
    } else {
      setWrongStreak((prev) => prev + 1);
      setCorrectStreak(0);
      setPopupGif(
        "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/NO_Icon.gif"
      );
    }

    //  showPopup(isCorrect);

    // showPopup(isCorrect, currentQ.answer);

    // Store time taken for the current question
    setTimeTaken((prev) => prev + (questions[currentQuestion]?.time - timeLeft));

    setTimeout(() => {
      setPopupGif(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setDroppedWord(null);
        setSelectedOption(null);
        setTimeLeft(questions[currentQuestion + 1]?.time || 0);
        setIsTimerRunning(true);
      }
    }, 3000);
  }, [questions, currentQuestion, answers, timeLeft]);

  const handleSubmit = useCallback(async () => {
    // playSound();
    setIsTimerRunning(false);
    const lastQuestion = questions[currentQuestion];
    const lastAnswer = answers.find((a) => a.questionId === lastQuestion.id);
    const correctAnswer = resolveQuestionAnswer(lastQuestion);
    const isLastCorrect =
      lastAnswer &&
      normalizeAnswer(lastAnswer.response) === normalizeAnswer(correctAnswer);

    if (isLastCorrect) {
      setCorrectStreak((prev) => prev + 1);
      setWrongStreak(0);
      setPopupGif(
        "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/YES_Icon.gif"
      );
    } else {
      setWrongStreak((prev) => prev + 1);
      setCorrectStreak(0);
      setPopupGif(
        "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/NO_Icon.gif"
      );
    }

    // Wait for the popup to display before submitting
    setTimeout(async () => {
      setPopupGif(null);
      setloading(true);

      const finalAnswers = questions.map((q) => {
        const answer = answers.find((a) => a.questionId === q.id);
        return { questionId: q.id, response: answer ? answer.response : null };
      });

      try {
        const language = i18n.language || "en";
        const response = await axios.post(
          `${SERVER_URL}/api/submit_answers`,
          {
            email,
            course_name: courseName,
            day,
            course_id: courseId,
            answers: finalAnswers,
            timeTaken,
            language: language,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        // const total_points = response.data.correctAnswerCount * 10;
        const total_points = response.data.percentage;
      //  console.log("total_points", total_points);
        // const total_points = 100;
        setPoints(total_points);
        setResultData(response.data);

        // setTimeout(() => {
        setShowResult(true);
        // }, 1000);
      } catch (error) {
        console.error("Error submitting answers:", error);
      } finally {
        setloading(false);
      }
    }, 3000);
  }, [questions, currentQuestion, answers, email, day, authToken, timeTaken]);

  useEffect(() => {
    if (questions.length > 0 && isTimerRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            if (currentQuestion === questions.length - 1) {
              handleSubmit();
            } else {
              handleNextQuestion();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [
    questions.length,
    currentQuestion,
    isTimerRunning,
    handleSubmit,
    handleNextQuestion,
  ]);

  const handleAnswerChange = (questionId, response) => {
    // console.log("questionId:", questionId, "response:", response);

    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = { questionId, response };
      setAnswers(updatedAnswers);
    } else {
      setAnswers([...answers, { questionId, response }]);
    }
  };

  const handleDragStart = (event, option) => {
    event.dataTransfer.setData("text", option);
  };

  const handleTouchStart = (event, option) => {
    event.target.dataset.dragging = option;
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains("dropzone")) {
      element.classList.add("highlight");
    } else {
      const highlighted = document.querySelector(".highlight");
      if (highlighted) {
        highlighted.classList.remove("highlight");
      }
    }
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains("dropzone")) {
      const option = event.target.dataset.dragging;
      setDroppedWord(option);
      element.classList.remove("highlight");
      handleAnswerChange(id, option);
    }
    event.target.dataset.dragging = "";
  };

  const handleDrop = (event, questionId) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");

    // console.log("Dropped data:", data);
    // console.log("Question ID:", questionId);

    if (data) {
      setDroppedWord(data);
      handleAnswerChange(questionId, data);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const [selectedWord, setSelectedWord] = useState("");

  const handleDoubleTap = (id, word) => {
    // console.log("word", word);
    // console.log(selectedWord);

    if (selectedWord === word) {
      setDroppedWord(word);
      handleAnswerChange(id, word);
      setSelectedWord("");
    } else {
      setSelectedWord(word);
    }
  };

  const handleRefresh = async () => {
     // playSound();
    window.location.reload();
  };

  const handleCloseResults = () => {
    // setShowResult(false);
  };

  const [showCoinShower, setShowCoinShower] = useState(true);

  useEffect(() => {
    if (showResult) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      const timer = setTimeout(() => {
        setShowCoinShower(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showResult]);

  if (showResult) {
    return (
      <div
        className="w-full h-[60vh] z-50 text-center text-white "
        // style={{ backgroundImage: 'url("/assets/thumbg.png")' }}
      >
        {showConfetti && (
          <div>
            <div className="fixed inset-0 z-50 w-full">
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/Confeti.gif"
                alt="coin shower"
                className="h-screen w-full max-w-4xl mx-auto object-cover  "
              />
            </div>
          </div>
        )}
        {/* <div className="hidden">
          <GoogleTranslate />
        </div> */}
         {/* {showCoinShower && ( 
          <>
          <div className="z-50 fixed inset-0 bg-black/60">
          <div>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Daily_Streak_New_2.gif" className="w-4/12 ml-auto object-contain" />
          </div>
        </div>
          </>
        )} */}
        <div className="flex justify-end px-5">
          <button
            onClick={() => {
              // playSound();
              source === "ChallengeMapWeb"
                ? navigate("/ChallengeMapWeb")
                : navigate("/DailybonusWeb");
            }}
            className="text-white"
          >
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </div>
        {/* <img
              src="/assets/thumb.png"
              className="mx-auto mb-3 mt-5"
              alt="thumb"
            />
            <p className="text-2xl font-semibold">
              Good job <br /> you are doing well
            </p> */}
        <div className="h-full flex justify-center items-center">
          <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-2xl p-0.5">
            <div className="bg-[#080B1C] rounded-2xl p-7 flex flex-col justify-center items-center gap-5">
              <div className="flex items-center gap-2 ">
                <img
                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                  className="w-14"
                />
                <p className="text-xl font-semibold mt-1">
                  <span className="text-[#FFD600] text-3xl font-bold">
                    +{points}
                  </span>{" "}
                  {t("ui.skill_points")}
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                     // playSound();
                    source === "ChallengeMapWeb"
                      ? navigate("/ChallengeMapWeb")
                      : navigate("/DailybonusWeb");
                  }}
                  className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] px-10 py-1 rounded-full font-semibold text-lg"
                >
                  {t("ui.continue")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult && resultData) {
    return (
      <div className="font-san fixed inset-0 z-30 top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur">
        <div className="md:w-[60%] bg-gradient-to-b from-[#43C5A517] to-[#3AB6FF17]  p-10 border-[3px] border-white/30 rounded-lg text-white">
          <div>
            <img src="../assets/Group 1000015871.png" />
          </div>
          <div className="py-10 flex lg:flex-row flex-col lg:gap-0 gap-10  items-center">
            <div className="lg:w-[40%]">
              <div className="flex flex-col justify-center items-center gap-2 mt-5">
                <p className="font-semibold">{t("ui.attempted_questions")}</p>
                <div className=" rounded-full w-32 h-32 border-2 border-[#2FD790] flex justify-center items-center ">
                  {/* <div className='text-3xl text-[#2FD790]'>{resultData.correctAnswerCount}/{resultData.totalQuestions}</div> */}
                  <div className="text-3xl text-[#2FD790]">
                    {resultData.answeredQuestions}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[60%] flex flex-col gap-3">
              <div className="flex justify-between items-center gap-10">
                <p className="lg:w-[60%] font-semibold">{t("ui.day")} </p>
                <p className="lg:w-[40%] font-semibold text-left">
                  {resultData.day}
                </p>
              </div>
              {/* <div className='flex justify-between items-center gap-10'>
                    <p className='lg:w-[60%]'>Time taken :</p>
                    <p className='lg:w-[40%] text-left'>{resultData.timeTaken}</p>
                </div> */}
              {/* <div className='flex justify-between items-center gap-10'>
                    <p className='lg:w-[60%]'>Questions attempted :</p>
                    <p className='lg:w-[40%] text-left'>{resultData.answeredQuestions}</p>
                </div> */}
              <div className="flex justify-between items-center gap-10">
                <p className="lg:w-[60%] font-semibold">{t("ui.correct_answers")} </p>
                <p className="lg:w-[40%] font-semibold text-left">
                  {resultData.correctAnswerCount}
                </p>
              </div>
              {/* <div className='flex justify-between items-center gap-10'>
                    <p className='lg:w-[60%]'>Wrong answers :</p>
                    <p className='lg:w-[40%] text-left'>4</p>
                </div> */}
              <div className="flex justify-between items-center gap-10">
                <p className="lg:w-[60%] font-semibold">{t("ui.overall_result")} </p>
                <p className="lg:w-[40%] font-semibold text-left">
                  {resultData.percentage}%
                </p>
              </div>
            </div>
          </div>
          <div>
            {/* <p className='text-xl text-center'>
            Amazing 🎉. Absolutely smashed it today 🔥
              </p> */}
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleRefresh}
              className="mt-4 bg-gradient-to-r from-[#43C5A5] to-[#0285FF] hover:from-[#0285FF] hover:to-[#43C5A5] text-white px-4 py-2 rounded-md font-semibold"
            >
              {t("ui.go_to_dashboard")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!questions.length) return <div>{t("ui.loading")}</div>;

  const currentQ = questions[currentQuestion];
  const {
    id,
    question,
    question_type,
    option_a,
    option_b,
    option_c,
    option_d,
  } = currentQ;

  return (
    <div className="">
      {popupGif && (
       <div className="popup w-full h-screen fixed inset-0 z-50 flex justify-center items-center bg-black/60 ">
          <img src={popupGif} alt="Feedback GIF" className=" w-9/12 sm:w-7/12 md:w-5/12  xl:w-4/12 mx-auto object-contain" />
        </div>
      )}
      <div className=" mt-20 md:w-[80%] w-[95%] mx-auto bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-md p-0.5 mt-10">
        <div
          className={`Question-${id} bg-[#080B1C] rounded-md flex flex-col justify-center p-5`}
        >
          {/* {popup.show && (
        <Popup
          message={popup.message}
          imgSrc={popup.imgSrc}
          answer={popup.answer}
          onClose={() => { setPopup({ show: false, message: '', imgSrc: '' }); setIsTimerRunning(true); }}
        />
      )} */}
          {loading && <DataSpinners />}

          <div className="flex flex-col  md:flex-row justify-between text-center"></div>
          {/* <p className="text-center mt-3 text-sm">Answer the following {question_type} question.</p> */}
          <p className="text-sm font-semibold mt-5">{question}</p>

          {question_type === "true_false" && (
            <div className="flex justify-center gap-5 md:gap-10 mt-10">
              <button
                className={` border rounded-full text-sm w-20 h-20 hover:bg-gradient-to-r  p-2 from-[#43C5A5] to-[#0285FF] 
       ${
         selectedOption === "true"
           ? "bg-gradient-to-r rounded-full p-2 from-[#43C5A5] to-[#0285FF] text-white"
           : ""
       }`}
                onClick={() => {
                   // playSound();
                  handleAnswerChange(id, "true");
                  setSelectedOption("true");
                }}
              >
                {/* <span className="mr-2">A.</span> */}
                {t("ui.true")}
              </button>
              <button
                className={`border rounded-full text-sm w-20 h-20 hover:bg-gradient-to-r  p-2 from-[#43C5A5] to-[#0285FF] ${
                  selectedOption === "false"
                    ? "bg-gradient-to-r rounded-full p-2 from-[#43C5A5] to-[#0285FF] text-white"
                    : ""
                }`}
                onClick={() => {
                   // playSound();
                  handleAnswerChange(id, "false");
                  setSelectedOption("false");
                }}
              >
                {/* <span className="mr-2">B.</span> */}
                {t("ui.false")}
              </button>
            </div>
          )}

          {question_type === "yes_no" && (
            <div className="flex justify-center gap-5 md:gap-10 mt-10">
              <button
                className={` border rounded-full text-sm w-20 h-20 hover:bg-gradient-to-r  p-2 from-[#43C5A5] to-[#0285FF] 
              ${
                selectedOption === "yes"
                  ? "bg-gradient-to-r rounded-full p-2 from-[#43C5A5] to-[#0285FF] text-white"
                  : ""
              }`}
                onClick={() => {
                  // playSound();
                  handleAnswerChange(id, "yes");
                  setSelectedOption("yes");
                }}
              >
                {/* <span className="mr-2"></span> */}
                {t("ui.yes")}
              </button>
              <button
                className={`border rounded-full text-sm w-20 h-20 hover:bg-gradient-to-r  p-2 from-[#43C5A5] to-[#0285FF] ${
                  selectedOption === "no"
                    ? "bg-gradient-to-r rounded-full p-2 from-[#43C5A5] to-[#0285FF] text-white"
                    : ""
                }`}
                onClick={() => {
                  // playSound();
                  handleAnswerChange(id, "no");
                  setSelectedOption("no");
                }}
              >
                {/* <span className="mr-2"></span> */}
                {t("ui.no")}
              </button>
            </div>
          )}

          {question_type === "options" && (
            <div className="flex flex-col text-lg mt-5 md:pl-10">
              {(currentQ.shuffledOptions || []).map((opt, idx) => (
                <div key={idx} className="flex gap-3 mt-2">
                  <input
                    type="radio"
                    name={`question-${id}`}
                    onClick={() => {
                      // playSound();
                      handleAnswerChange(id, opt);
                      setSelectedOption(opt);
                    }}
                    checked={selectedOption === opt}
                  />
                  <p className="text-sm">{` ${opt}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* <>
            {question_type === "drag_drop" && (
              <div className="text-sm font-medium text-center mt-10">
                <p className="mt-3 flex md:flex-row flex-col">
                  Options:{" "}
                  {["option_a", "option_b", "option_c", "option_d"].map(
                    (opt, idx) => (
                      <span
                        key={idx}
                        draggable
                        onDragStart={(event) =>
                          handleDragStart(event, currentQ[opt])
                        }
                        onTouchStart={(event) =>
                          handleTouchStart(event, currentQ[opt])
                        }
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className="p-2 border border-gray-300 rounded-md shadow-sm m-2 cursor-move"
                      >
                        {currentQ[opt]}
                      </span>
                    )
                  )}
                </p>
                <div className="flex md:flex-row flex-col gap-5 justify-center items-center mt-10">
                  <p>Answer is:</p>
                  <div
                    onDrop={(event) => handleDrop(event, id)}
                    onDragOver={handleDragOver}
                    className={`dropzone inline-block w-[80%] mx-auto h-10 border border-gray-300 rounded-md px-4 py-2 text-center ${
                      droppedWord
                        ? "bg-gradient-to-r from-[#43C5A5] to-[#0285FF] font-bold"
                        : ""
                    }`}
                  >
                    {droppedWord || "Drop Here"}
                  </div>
                </div>
              </div>
            )}
          </> */}

          <>
            {question_type === "drag_drop" && (
              <div className="text-sm font-medium text-center mt-5">
                <p className="flex md:flex-row flex-col">
                  {(currentQ.shuffledOptions || []).map(
                    (opt, idx) => (
                      <span
                        key={idx}
                        onClick={() => {
                          // playSound();
                          handleDoubleTap(id, opt);
                        }}
                        className={`p-2 border border-gray-300 rounded-md shadow-sm m-2 cursor-pointer ${
                          selectedWord === opt ? "bg-white/15" : ""
                        }`}
                      >
                        {opt}
                      </span>
                    )
                  )}
                </p>
                <div className="flex md:flex-row flex-col gap-3 justify-center items-center mt-3">
                  <p>{t("ui.answer_is")}</p>
                  <div
                    className={`dropzone inline-block w-[80%] mx-auto h-full border border-gray-300 rounded-md px-4 py-2 text-center ${
                      droppedWord
                        ? "bg-gradient-to-r from-[#43C5A5] to-[#0285FF] font-bold"
                        : ""
                    }`}
                  >
                    {droppedWord || t("ui.double_tap")}
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
      <div className="md:w-[80%] w-[90%] mx-auto mt-5 flex items-center justify-between">
        <div>
          <p className=" font-semibold">{`${t("ui.question_label")} ${currentQuestion + 1}`}</p>
        </div>
        <div className=" flex items-center justify-center">
          <p className="font-semibold">{timeLeft}s</p>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        {!loading ? (
          <button
            className="py-2 px-5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-white text-lg font-semibold rounded-full hover:shadow-lg transition-all duration-300"
            onClick={
              currentQuestion === questions.length - 1
                ? handleSubmit
                : handleNextQuestion
            }
            disabled={loading}
          >
            {currentQuestion === questions.length - 1 ? t("ui.submit") : t("ui.next")}
          </button>
        ) : (
          <button className="py-2 px-5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-white text-lg font-semibold rounded-full hover:shadow-lg transition-all duration-300">
            {/* <div className="w-6 h-6 border-4 border-t-4 border-white border-opacity-30 rounded-full cursor-wait animate-spin mx-auto"></div> */}
          </button>
        )}
      </div>

      {/* <div className="flex justify-center mt-10">
  {!loading && currentQuestion === questions.length - 1 && (
    <button
      className="py-2 px-5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-white text-lg font-semibold rounded-full hover:shadow-lg transition-all duration-300"
      onClick={handleSubmit}
      disabled={loading}
    >
      Submit
    </button>
  )}

  {loading && (
    <button className="py-2 px-5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-white text-lg font-semibold rounded-full hover:shadow-lg transition-all duration-300">
      <div className="w-6 h-6 border-4 border-t-4 border-white border-opacity-30 rounded-full cursor-wait animate-spin mx-auto"></div>
    </button>
  )}
</div> */}
    </div>
  );
};

export default AssessmentWeb;
