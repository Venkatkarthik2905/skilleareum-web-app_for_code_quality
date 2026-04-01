import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faCheck } from "@fortawesome/free-solid-svg-icons";
import { SERVER_URL } from "../../../../../../config";
import FactVaultSummaryWeb from "./FactVaultSummaryWeb";
import { useNavigate } from "react-router-dom";

const AIFunfactWeb = ({
  authToken,
  updateCanClaim,
  setcanClaim,
  onClaim,
  canClaim,
  source
}) => {
  const { t } = useTranslation("ai_vault");
  const userData = useSelector((state) => state.user_email);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [factvaultopen, setFactVaultOpen] = useState(false);
  const [factvaultData, setFfactvaultData] = useState([]);
  const [userVisitData, setuserVisitData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const navigate = useNavigate();

  // const { playSound } = useSettings();

  const handlefactvault = () => {
    // playSound();
    if (userVisitData.isNew) {
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000); // Show the modal when the user is new
    } else {
      setFactVaultOpen(!factvaultopen); // Toggle the fact vault if not new
    }
  };

  // Close the modal function
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const settings = {
    infinite: factvaultData.length > 1, // Disable infinite scroll if only one slide
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
  };

  const funfactInitial = [
    {
      index: 1,
      time: "05:00",
      name: "AI History",
      status: "notdone",
      fact: " The 1960 film Colossus: The Forbin Project depicts a supercomputer that takes control of the world.",
    },
    {
      index: 2,
      time: "10:00",
      name: "AI Fun Fact",
      status: "notdone",
      fact: " The 1960 film Colossus: The Forbin Project depicts a supercomputer that takes control of the world.",
    },
    {
      index: 3,
      time: "15:00",
      name: "AI Future",
      status: "notdone",
      fact: " The 1960 film Colossus: The Forbin Project depicts a supercomputer that takes control of the world.",
    },
    {
      index: 4,
      time: "20:00",
      name: "AI Current Affair’s",
      status: "notdone",
      fact: " The 1960 film Colossus: The Forbin Project depicts a supercomputer that takes control of the world.",
    },
  ];
  const { i18n } = useTranslation("ai_vault");

  const incrementVisitCount = async (Fact) => {
    try {
      const data = await axios.post(
        `${SERVER_URL}/api/aivault/incrementVisitCount?userId=${userData.id}&Fact=${Fact}&lang=${i18n.language || 'en'}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // console.log(data);
      fetchAIFact();
    } catch (error) {
      // console.log(error);
    }
  };

  const toggleExpand = (index) => {
    // return;
    // console.log(expandedIndex, " Index :", index);
    if (expandedIndex === index) {
      return;
    } else {
      setExpandedIndex(index);
    }
  };
  const [funfact, setFunfact] = useState(funfactInitial);
  
  const categoryKeys = {
    "AI History": "history",
    "AI Fun Fact": "fun_fact",
    "AI Future": "future",
    "AI Current Affair’s": "current_affairs"
  };

  const fetchAIFact = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/aivault?userId=${encodeURIComponent(userData.id)}&lang=${i18n.language || 'en'}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const fetchedFacts = data?.facts[0];
      // console.log("fetchedFacts : ", fetchedFacts);
      const updatedFunfact = funfact.map((fact, index) => {
        let updatedFact = "";
        switch (fact.name) {
          case "AI Fun Fact":
            updatedFact = fetchedFacts.Fun_Fact || fact.fact;
            break;
          case "AI Current Affair’s":
            updatedFact = fetchedFacts.Current_Affair || fact.fact;
            break;
          case "AI History":
            updatedFact = fetchedFacts.Historical_Fact || fact.fact;
            break;
          case "AI Future":
            updatedFact = fetchedFacts.Future_Prediction || fact.fact;
            break;
          default:
            updatedFact = fact.fact; // Keep the original if no match
        }

        // Update the status based on the visitCount
        const updatedStatus = index < data.count ? "done" : "not done";

        return { ...fact, fact: updatedFact, status: updatedStatus };
      });

      // Set the updated funfact array in state
      setFunfact(updatedFunfact);
      setcanClaim(data.UserVisit?.canClaim);
      setFfactvaultData(data.facts);
      // console.log(data);
      setuserVisitData(data.UserVisit);
      // console.log(userVisitData);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    fetchAIFact();

    const timeout = setTimeout(() => {
      fetchAIFact();
    }, 500); // 500ms delay

    // Cleanup function to clear timeout
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <div className=" relative pt-5 z-30 ">
        {factvaultopen ? (
          <div className={`  mt-10 `}>
            <FactVaultSummaryWeb
              authToken={authToken}
              onClose={handlefactvault}
            />
          </div>
        ) : (
          <div
            className={` animate__animated ${
              factvaultopen ? "animate__zoomOut" : "animate__zoomIn"
            }`}
          >
            <div
              onClick={() => {
                if (navigator.vibrate) {
                  navigator.vibrate(100);
                }
                // playSound();
                if(source==="TaskListWeb"){
            navigate("/TaskListWeb")
          }else navigate("/ChallengeMapWeb");
              }}
              className="cursor-pointer "
            >
              <FontAwesomeIcon icon={faArrowLeftLong} className="font-bold" />
            </div>
            <div>
              <Slider
                className="w-full mx-auto flex justify-center items-center mt-3"
                {...settings}
              >
                {expandedIndex === -1 ? (
                  <div className="h-[10rem] max-h-[20rem] p-[0.5px] bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-2xl">
                    <div className="w-full bg-[#0a0342] h-full rounded-2xl ">
                      <div
                        className="w-full h-full rounded-2xl "
                        style={{
                          background:
                            "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                        }}
                      >
                        <div className="bg-[#070E3A]/70 w-full py-1.5 rounded-t-2xl">
                          <p className="w-full font-zendots z-10 text-center uppercase font-medium">
                            {t("categories.history")}
                          </p>
                        </div>
                        <div className=" w-full p-2 z-10 mt-3 text-sm font-medium text-white">
                          {factvaultData[0]?.Historical_Fact}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[10rem] max-h-[20rem] p-[0.5px] bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-2xl">
                    <div className="w-full bg-[#0a0342] h-full rounded-2xl ">
                      {funfact.map((fact, index) =>
                        index === expandedIndex ? (
                          <div
                            className="w-full h-full rounded-2xl "
                            style={{
                              background:
                                "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                            }}
                          >
                            <div className="bg-[#070E3A]/70 w-full py-1.5 rounded-t-2xl">
                              <p
                                key={index}
                                className="w-full font-zendots z-10 text-center uppercase font-medium"
                              >
                                {t(`categories.${categoryKeys[fact.name]}`)}
                              </p>
                            </div>
                            <div className=" w-full text-sm py-2 px-3 z-10 mt-3 font-medium text-white">
                              <div key={index}>{fact.fact}</div>
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                )}
                {/* {factvaultData[0]?.Fun_Fact && 
              <div className="h-[10rem] p-[0.5px] bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-2xl">
              <div className="w-full bg-[#0a0342] h-full rounded-2xl " >
                <div className="w-full h-full rounded-2xl " style={{background: "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)"}}>
                <div className="bg-[#070E3A]/70 w-full py-1.5 rounded-t-2xl">
                <p className="w-full font-zendots z-10 text-center uppercase font-medium">
                  AI Fun Fact
                </p>
                </div>
                <div className=" w-full p-2 z-10 mt-3 font-medium text-white">
                {factvaultData[0]?.Fun_Fact}
                </div>
              </div>
              </div>
              </div>
                } 

             {factvaultData[0]?.Historical_Fact && 
             <div className="h-[10rem] p-[0.5px] bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-2xl">
             <div className="w-full bg-[#0a0342] h-full rounded-2xl " >
               <div className="w-full h-full rounded-2xl " style={{background: "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)"}}>
               <div className="bg-[#070E3A]/70 w-full py-1.5 rounded-t-2xl">
               <p className="w-full font-zendots z-10 text-center uppercase font-medium">
               AI History
               </p>
               </div>
               <div className=" w-full p-2 z-10 mt-3 font-medium text-white">

               {factvaultData[0]?.Historical_Fact}

               </div>
             </div>
             </div>
             </div>
             }

              {factvaultData[0]?.Future_Prediction && 
              <div className="h-[10rem] p-[0.5px] bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-2xl">
              <div className="w-full bg-[#0a0342] h-full rounded-2xl " >
                <div className="w-full h-full rounded-2xl " style={{background: "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)"}}>
                <div className="bg-[#070E3A]/70 w-full py-1.5 rounded-t-2xl">
                <p className="w-full font-zendots z-10 text-center uppercase font-medium">
                  AI Future
                </p>
                </div>
                <div className=" w-full p-2 z-10 mt-3 font-medium text-white">

                {factvaultData[0]?.Future_Prediction 
              }
                </div>
              </div>
              </div>
              </div>
             }
              {factvaultData[0]?.Current_Affair && 
              <div className="h-[10rem] p-[0.5px] bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-2xl">
              <div className="w-full bg-[#0a0342] h-full rounded-2xl " >
                <div className="w-full h-full rounded-2xl " style={{background: "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)"}}>
                <div className="bg-[#070E3A]/70 w-full py-1.5 rounded-t-2xl">
                <p className="w-full font-zendots z-10 text-center uppercase font-medium">
                AI Current Affair
                </p>
                </div>
                <div className=" w-full p-2 z-10 mt-3 font-medium text-white">

                {factvaultData[0]?.Current_Affair }
                </div>
              </div>
              </div>
              </div>
             } */}
              </Slider>
            </div>

            <div className=" z-30 ">
              <div className="w-full flex justify-between items-center mt-10">
                <div>
                  <p className="text-lg font-semibold text-[#DAD6D6]">
                    {t("ui.facts_for_day")}
                  </p>
                  {/* <p className="text-xs">Welcome Skill ID, Day 1</p> */}
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2 z-30 ">
                {funfact.map((data, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      // playSound();
                      incrementVisitCount(data?.name);
                      toggleExpand(index);
                    }}
                    className=" cursor-pointer z-30  w-full rounded-xl px-3 py-2 "
                    style={{
                      background:
                        "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
                    }}
                  >
                    <div className="z-30 flex justify-between items-center">
                      <div
                        className={` flex justify-start items-center gap-4 text-white${
                          data.status === "done"
                            ? "text-gray-500"
                            : "text-white"
                        } `}
                      >
                        <p className="text-sm font-medium">{index + 1}</p>
                        <div className="h-9 w-0.5 rounded-full bg-[#868686]"></div>
                        <p className=" text-sm font-medium">{t(`categories.${categoryKeys[data.name]}`)}</p>
                      </div>
                      {data.status === "done" ? (
                        <div className=" relative ">
                          <img
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                            className=" w-7 h-7 "
                          />
                          <div className=" w-4 h-4 bg-[#1FEA32] opacity-25 blur-sm absolute top-1 left-1.5 "></div>
                          <FontAwesomeIcon
                            icon={faCheck}
                            size="sm"
                            className="text-[#1FEA32] absolute top-1.5 left-2 "
                          />
                        </div>
                      ) : (
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                          className=" w-7 h-7 "
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {canClaim && (
                <div className=" mt-5 relative z-50 ">
                   <div
                     onClick={onClaim}
                    className=" w-[100%] md:w-[65%] mx-auto cursor-pointer mt-5 rounded-2xl h-10 relative "
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                    }}
                  >
                    <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40 "></div>
                    <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                    <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                    <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                      <p
                        className="uppercase font-medium text-center font-zendots text-sm"
                        style={{
                          color: "transparent",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          backgroundImage:
                            "linear-gradient(to right, #0285FF, #1EEF32)",
                        }}
                      >
                        {t("ui.claim_reward")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIFunfactWeb;
