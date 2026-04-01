import { faArrowLeftLong, faCheck, faCheckCircle, faPlus, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import debounce from 'lodash.debounce';
import { useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../../../../../config';
import DashboardLayout from '../../../Layout/DashboardLayout';
import { useTranslation } from 'react-i18next';

const AIEmojiWeb = ({ onClose }) => { 
  const { t, i18n } = useTranslation('dashboard');
  const [gameData, setGameData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
    const [AIgameData, setAIGameData] = useState(null);
    const [day, setDay] = useState(() => new URLSearchParams(window.location.search).get("day") || localStorage.getItem("day") || 1);
    const location = useLocation();
    const navigate = useNavigate();
      const authToken = useSelector((state) => state.token);

    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get("source");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const userData = useSelector((state) => state.user_email);

  const fetchGameData = async () => {
    try {
      const language = i18n.language || 'en';
      const response = await axios.get(`${SERVER_URL}/api/emoji?userId=${userData?.id}&language=${language}&day=${day}`,{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      const fetchedGameData = response.data.games[0];
      if(response.status===201){
        toast.success(t('aiGames.emoji.taskCompleted'));
        if (source === "ChallengeMapWeb") {
          setTimeout(()=>{
            return navigate("/ChallengeMapWeb");
          },2000)
        }else{
          setTimeout(()=>{
            return navigate("/TaskListWeb");
          },2000)
        }
      }
      if(fetchedGameData){
        setAnswers([
          {
            option: 1,
            name: fetchedGameData.option_a,
            explanation: fetchedGameData.detail,
            example: fetchedGameData.example
          },
          {
            option: 2,
            name: fetchedGameData.option_b,
            explanation: fetchedGameData.detail,
            example: fetchedGameData.example
          },
          {
            option: 3,
            name: fetchedGameData.option_c,
            explanation: fetchedGameData.detail,
            example: fetchedGameData.example
          },
          {
            option: 4,
            name: fetchedGameData.option_d,
            explanation: fetchedGameData.detail,
            example: fetchedGameData.example
          }
        ]);
    
        // Convert correct_option (e.g., 'c') to number (3)
        const optionMap = { a: 1, b: 2, c: 3, d: 4 };
        setCorrectOption(optionMap[fetchedGameData.correct_option]);
    
        // Store entire game data for UI rendering
        setGameData(fetchedGameData);
      }
      
    } catch (error) {
      console.error("Error fetching emoji game data:", error);
    }
  };
  const debouncedFetchGameData = debounce(fetchGameData, 300); 

  useEffect(() => {
    debouncedFetchGameData();
  
    // Optional: cancel debounce on unmount to avoid memory leaks
    return () => debouncedFetchGameData.cancel();
 
  }, [i18n.language, day]);
  const submitAnswer = async (gameId) => {
    try {
      if (!selectedOption) return toast.error(t('aiGames.emoji.selectOption'))
      let tosend;
      if (selectedOption === 1) {
        tosend = "a"
      } else if (selectedOption === 2) {
        tosend = "b"

      }
      else if (selectedOption === 3) {
        tosend = "c"

      }
      else if (selectedOption === 4) {
        tosend = "d"

      }
      const response = await axios.post(
        `${SERVER_URL}/api/emoji`,
        {
          userId: userData.id,
          gameId: gameId,
          selectedOption: tosend,
          language: i18n.language || 'en',
          day: day,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // console.log(response)
      if (response.status === 200) {
        setIsSubmitted(true);
        // console.log(response.data.correct)
        setIsCorrect(response.data.correct); // Assuming API returns isCorrect
      } else {
        console.error('Failed:', tosend);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const selectedAnswer = answers.find((ans) => ans.option === selectedOption);
  const handleClose=()=>{

    // console.log("handleClose : ",source)
    if (source === 'TaskList') {
      navigate('/TaskList');
    } else if(source==="ChallengeMap"){
      navigate('/ChallengeMap');
    }else{
      // onClose();
       navigate(-1);
    }
  }
  return (
   
    <DashboardLayout>
    <div
      translate="no"
      className=" relative text-white font-poppins mt-28 "
    >
            <div className="w-full max-w-lg mx-auto py-5 ">
              <div className="flex justify-center items-center gap-2 relative">
                <button className="absolute top-0 left-3" onClick={handleClose}>
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </button>              
               </div>

              <div className="">
                <h1
                  style={{ textShadow: "2px 2px 8px #1EEF32" }}
                  className="text-center uppercase font-zendots text-[#1EEF32]"
                >
                  {t('aiGames.emoji.gameTitle')}
                </h1>
              </div>

              {gameData ? (
                <div className="mt-10 flex items-center justify-center ">
                 {[gameData.svg1, gameData.svg2, gameData.svg3].map((emoji, idx, arr) => (
  <React.Fragment key={idx}>
    <div className="relative flex justify-center items-center">
      <img
        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/newuserbg.svg"
        className="w-20 h-20 rounded-xl"
      />
      <div className="absolute top-4 left-0 right-0 text-center text-3xl">
        {emoji}
      </div>
    </div>
    {idx < arr.length - 1 && (
      <FontAwesomeIcon icon={faPlus} className="mx-1" />
    )}
  </React.Fragment>
))}

                </div>
              ) :
                (
                  <div className="mt-10 flex items-center justify-center ">
                    {[...Array(3)].map((_, idx) => (
                      <div key={idx} className="relative flex justify-center items-center animate-pulse">
                        <div className="w-20 h-20 rounded-xl bg-[#2b2b2b]"></div>
                        <div className="absolute top-4 left-0 right-0 text-center">
                          <div className="w-6 h-6 bg-[#3a3a3a] rounded-full mx-auto" />
                        </div>
                        {idx > -1 && idx < 2 && (
                          <FontAwesomeIcon icon={faPlus} className="text-[#444] mx-1 " />
                        )}
                      </div>
                    ))}
                  </div>
                )
              }


              {isSubmitted ? (
                <div className="mt-6 text-center">

                  <div
                    className={` w-[90%] mx-auto px-6 py-2 rounded-xl text-white flex justify-between items-center font-semibold text-lg `}
                    style={{
                      background:
                        isCorrect
                          ? "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)"
                          : "rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <p className={`text-sm ${isCorrect ? "text-white font-bold" : "text-[#868686] font-medium"}`}>
                        #{selectedAnswer?.option}
                      </p>
                      <div className="h-9 w-0.5 rounded-full bg-[#868686]"></div>
                      <p className={`text-sm ${isCorrect ? "text-[#1EEF32] font-bold" : "text-[#868686] font-medium"}`}>
                        {selectedAnswer?.name}
                      </p>
                    </div>
                    <div className="relative">
                      {!isCorrect ?
                        <FontAwesomeIcon icon={faXmarkCircle} className='text-[#ff0000]' />
                        : <FontAwesomeIcon icon={faCheckCircle} className='text-[#00ff3d]' />
                      }
                    </div>
                    {/* You selected: <span className="text-white">#{selectedAnswer?.option} - {selectedAnswer?.name}</span> */}
                  </div>
                  <div>
                    <div className="mt-4 ">
                      {!isCorrect ?
                        <div>

                          <p className="text-[#1EEF32] ">{t('aiGames.emoji.correctAnswer')} </p>
                          <div className={` w-[90%] mt-2 mx-auto px-6 py-2 rounded-xl text-white flex justify-between items-center font-semibold text-lg `} style={{
                            background:
                              "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)"
                          }}>
                            <div className="flex items-center gap-5">
                              <p className={`text-sm text-white font-bold`}> #{correctOption}</p>
                              <div className="h-9 w-0.5 rounded-full bg-[#868686]"></div>
                              <p className={`text-sm text-[#1EEF32] font-bold`}>{answers.find(ans => ans.option === correctOption)?.name}</p>
                            </div>
                            <FontAwesomeIcon icon={faCheckCircle} className='text-[#00ff3d]' />
                          </div>
                        </div>
                        :
                        <div></div>
                      }

                      <div className=' mt-2 w-[90%] mx-auto bg-gradient-to-r from-[#0C1E91] to-[#1EEF32] rounded-xl p-[1px] '>
                        <div className=' bg-[#111226] rounded-xl px-4 py-2'>
                          <p className=" text-sm text-[#1EEF32] ">
                            {answers.find(ans => ans.option === correctOption)?.explanation}
                          </p>
                        </div>
                      </div>

                      <div className=' mt-2 w-[90%] mx-auto bg-gradient-to-r from-[#0C1E91] to-[#1EEF32] rounded-xl p-[1px] '>
                        <div className=' bg-[#111226] rounded-xl px-4 py-2'>
                          <p className=" text-sm  ">
                            <span className=' text-[#1EEF32] '>{t('aiGames.emoji.aiExample')}</span>{answers.find(ans => ans.option === correctOption)?.explanation}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center justify-center">
                        <div
                          onClick={() => {
                            debouncedFetchGameData();
                            setIsSubmitted(false);
                            setSelectedOption(null)

                          }}
                          className="cursor-pointer rounded-2xl w-32 h-8 relative"
                          style={{
                            backgroundImage:
                              "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                          }}
                        >
                          <div className="h-full w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
                          <div className="h-full w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
                          <div className="bg-[#070e3a4b] backdrop-blur-sm h-full rounded-2xl w-full border-[0.5px] border-[#1AE348]/70"></div>
                          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                            <p
                              className="uppercase font-medium z-10 text-center text-sm font-zendots"
                              style={{
                                color: "transparent",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
                              }}
                            >
                              {isCorrect ? t('aiGames.emoji.next') : t('aiGames.emoji.retry')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <>
                  {answers.length === 0 ? (
                    <div className="w-[90%] mt-7 mx-auto flex flex-col gap-2">
                      {[...Array(4)].map((_, index) => (
                        <div
                          key={index}
                          className="w-full backdrop-blur rounded-xl p-3 flex justify-between items-center bg-[rgba(255,255,255,0.05)] animate-pulse"
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-8 h-4 rounded bg-[#3a3a3a]" />
                            <div className="h-9 w-0.5 rounded-full bg-[#3a3a3a]"></div>
                            <div className="w-24 h-4 rounded bg-[#3a3a3a]" />
                          </div>
                          <div className="w-7 h-7 bg-[#3a3a3a] rounded-full" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-[90%] mt-7 mx-auto flex flex-col gap-2">
                      {answers.map((data, index) => (
                        <div key={index}>
                          <div
                            onClick={() => setSelectedOption(data.option)}
                            className="w-full backdrop-blur rounded-xl p-3 flex justify-between items-center cursor-pointer"
                            style={{
                              background:
                                selectedOption === data.option
                                  ? "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)"
                                  : "rgba(255, 255, 255, 0.05)",
                            }}
                          >
                            <div className="flex items-center gap-5">
                              <p className={`${selectedOption === data.option ? "text-white font-bold" : "text-[#868686] font-medium"}`}>
                                #{data.option}
                              </p>
                              <div className="h-9 w-0.5 rounded-full bg-[#868686]"></div>
                              <p className={`${selectedOption === data.option ? "text-[#1EEF32] font-bold" : "text-[#868686] font-medium"}`}>
                                {data.name}
                              </p>
                            </div>
                            <div className="relative">
                              <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg" className="w-7 h-7" />
                              <div className={`bg-[#1FEA32] ${selectedOption === data.option ? "block" : "hidden"} w-4 h-4 rounded-full absolute top-1.5 left-1.5`} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>)
                  }

                  <div className="mt-10 z-20 flex items-center justify-center">
                    <div
                      onClick={() => submitAnswer(gameData?.id)}
                      className=" z-20  cursor-pointer rounded-2xl w-32 h-8 relative"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                      }}
                    >
                      <div className="h-full w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
                      <div className="h-full w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
                      <div className="bg-[#070e3a4b] backdrop-blur-sm h-full rounded-2xl w-full border-[0.5px] border-[#1AE348]/70"></div>
                      <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                        <p
                          className="uppercase font-medium z-10 text-center text-sm font-zendots"
                          style={{
                            color: "transparent",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
                          }}
                        >
                          {t('aiGames.emoji.submit')}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </DashboardLayout>
  
  );
};

export default AIEmojiWeb;
