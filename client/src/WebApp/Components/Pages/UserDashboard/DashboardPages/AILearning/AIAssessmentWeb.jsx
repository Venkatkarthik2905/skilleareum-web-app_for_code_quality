import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResultsWeb from './Results';
import { SERVER_URL } from '../../../../../../config';

const AIAssessmentWeb = ({authToken,source, toast,handleassessment,unlockedData,handleHomeScreen }) => {
  const { t, i18n } = useTranslation("games");
  const [activeButton, setActiveButton] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isWon, setisWon] = useState(false);  

const [correctAnswers, setCorrectAnswers] = useState({});
  const [openResults, setOpenResults] = useState(false);
  // const { playSound } = useSettings();
  const [assessments, setAssessments] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const userId=useSelector((state) => state.user_email.id)
  const navigate=useNavigate()
  const fetchAssessment = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/ailearning/assessment/${unlockedData?.day}?language=${i18n.language || 'en'}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAssessments(response?.data?.assessments || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const correctAnswersMap = {};
    assessments.forEach((question, index) => {
      correctAnswersMap[index] = `option_${question.correct_option.toLowerCase()}`; 
    });
    setCorrectAnswers(correctAnswersMap);
  }, [assessments]);
  useEffect(() => {
    fetchAssessment();
  }, []);

  const handleOptionSelect = (option) => {
    // playSound();
    setActiveButton(option);
  };

  const handleNext = () => {
    if (activeButton === "") return;
    
    const correctOption = correctAnswers[currentQuestionIndex];

    if (activeButton !== correctOption) {
        // Show correct answer outline
        setShowCorrectAnswer(true);
        setTimeout(() => {
            setShowCorrectAnswer(false);
            proceedToNextQuestion();
        }, 1500); // Delay before moving to next question
    } else {
        proceedToNextQuestion();
    }
};

const proceedToNextQuestion = () => {
    setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: activeButton,
    }));

    if (currentQuestionIndex === assessments.length - 1) {
        checkAnswersAndSubmit({ ...answers, [currentQuestionIndex]: activeButton });
    } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        setActiveButton('');
    }
};

const checkAnswersAndSubmit = (updatedAnswers) => {
    const isCorrect = Object.keys(correctAnswers).every(
      (index) => updatedAnswers[index] === correctAnswers[index]
    );

    if (isCorrect) {
      setisWon(true);
    } else {
      setisWon(false);

      
    
    }
    setOpenResults(true); 
};
// console.log(unlockedData)
  const completeQuestAPI = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/ailearning/assesmemt/complete`, {
      
    userId, day: unlockedData?.day, language: i18n.language || 'en',
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      
      // console.log(response)
      if(response.status===200){
      //  console.log("Rewarded")
        toast.success(t("ai_learning.reward_collected"))
        if (source === "ChallengeMap") {
          navigate("/ChallengeMap");
          return;
        }
        else if(source==="TaskList"){
          navigate('/TaskList');
        }else{
                  navigate("/ChallengeMapWeb");

        }
      }
    } catch (error) {
    //  console.log(error)
      toast.error(t("ai_learning.failed_to_complete_try_again"));
    }
  };
 

  return (
    <div>
      <div className="w-[95%] mx-auto max-w-md p-[1px] shadow-lg shadow-black/25 bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-xl">
        <div className="w-full bg-[#0a0342] h-full rounded-xl">
          <div className="w-full h-full rounded-xl p-4"
            style={{ background: "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 30.97%, rgba(48, 62, 138, 0) 100%)" }}>
            
            <div className='bg-[#000A14] rounded-xl px-2 py-5 relative'>
              <div onClick={() => handleassessment()} className='absolute top-3 right-3 z-10'>
                <button><FontAwesomeIcon icon={faXmark} className="text-[#1EEF32] text-lg" /></button>
              </div>
              
              <p className='font-zendots uppercase text-center text-[#1EEF32] opacity-50'>
                {t("ai_learning.day", { day: unlockedData?.day })}
              </p>
              
              <div className='mt-3 rounded-md bg-[#001528] w-[90%] mx-auto py-1'>
                <p className='text-[#1CE740] font-zendots uppercase text-center text-lg'>
                  {t("ai_learning.assessment")}
                </p>
              </div>

              {assessments.length > 0 && (
                <div className="my-5">
                  <p className='font-medium text-sm text-center text-white/85'>{assessments[currentQuestionIndex]?.question}</p>
                </div>
              )}

              <div className="mt-5 flex flex-col text-xs font-medium gap-3">
              {['option_a', 'option_b', 'option_c', 'option_d'].map((option, index) => (
    // <button
    //     key={index}
    //     className={`w-[95%] mx-auto rounded-lg py-1.5 px-1 border transition-opacity 
    //         ${activeButton === option ? "text-white opacity-100" : "text-white opacity-100 border-[#1EEF32]/60"}
    //         ${showCorrectAnswer && option === correctAnswers[currentQuestionIndex] ? "border-green-500" : ""}
    //         ${showCorrectAnswer && option !== correctAnswers[currentQuestionIndex] ? "opacity-50" : ""}`}
    //     style={{
    //         background: "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)"
    //     }}
    //     onClick={() => handleOptionSelect(option)}
    // >
    //     {assessments[currentQuestionIndex]?.[option]}
    // </button>

   <button
  key={index}
  className={`w-[95%] mx-auto rounded-lg py-1.5 px-1 border transition-opacity text-white
    ${!activeButton ? "opacity-100" : activeButton === option ? "opacity-100" : "opacity-50"}
    
    ${showCorrectAnswer && option === correctAnswers[currentQuestionIndex] ? "border-green-500" : ""}
    ${showCorrectAnswer && activeButton === option && option !== correctAnswers[currentQuestionIndex] ? "border-red-500" : ""}
    
    ${!showCorrectAnswer ? "border-[#1EEF32]/60" : ""}
  `}
  style={{
    background: "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)"
  }}
  onClick={() => handleOptionSelect(option)}
>
  {assessments[currentQuestionIndex]?.[option]}
</button>

))}

              </div>

              <hr className='border-0.5 border-white w-[60%] mx-auto mt-5 mb-3' />
              <p className='text-[#1EEF32] opacity-40 font-montserrat tracking-widest text-center'>{currentQuestionIndex + 1}/{assessments.length}</p>
              
              <div className="absolute -bottom-9 left-0 right-0 flex justify-center items-center">
                <button onClick={handleNext} className="rounded-2xl w-[70%] h-10 relative"
                  style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
                  
                  <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
                  <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
                  <div className="bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348]"></div>
                  <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                    <p className="uppercase font-medium text-center font-zendots" 
                      style={{
                        color: "transparent",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"
                      }}>
                      {currentQuestionIndex === assessments.length - 1 ? t("ai_learning.submit") : t("ai_learning.next")}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05091CD9] bg-opacity-60">
          <div className="relative w-full z-50">
            <ResultsWeb handleHomeScreen={handleHomeScreen} isWon={isWon} day={unlockedData?.day} completeQuestAPI={completeQuestAPI} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssessmentWeb;
