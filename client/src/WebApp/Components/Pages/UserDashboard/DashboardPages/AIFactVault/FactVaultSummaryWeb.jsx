import { faArrowLeft, faCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../../../../config";
import axiosInstance from "../../../../../../config/axiosInstance";

const FactVaultSummaryWeb = ({ authToken, onClose, updateCanClaim }) => {
  const { t } = useTranslation("ai_vault");
  // const { playSound } = useSettings();
  const userData = useSelector((state) => state.user_email);

  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [factdata, setdata] = useState([]);
  const [funfact, setFunfact] = useState([
    {
      time: "00:00",
      name: "AI History",
      status: "done",
      fact: " The 1960 film Colossus: The Forbin Project depicts a supercomputer that takes control of the world.",
    },
    {
      time: "10:00",
      name: "AI Fun Fact",
      status: "done",
      fact: " The 1960 film Colossus: The Forbin Project depicts a supercomputer that takes control of the world.",
    },

    {
      time: "15:00",
      name: "AI Future",
      status: "done",
      fact: " The 1960 film Colossus: The Forbin Project depicts a supercomputer that takes control of the world.",
    },
    {
      time: "20:00",
      name: "AI Current Affair’s",
      status: "done",
      fact: " The 1960 film Colossus: The Forbin Project depicts a supercomputer that takes control of the world.",
    },
  ]);

  const incrementVisitCount = async (Fact) => {
    try {
      const data = await axios.post(
        `${SERVER_URL}/api/aivault/incrementVisitCount?userId=${userData.id}&Fact=${Fact}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // console.log(data);
      fetchAIFact();
      updateCanClaim();
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchAIFact = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${SERVER_URL}/api/aivault/getYesterdayFacts?userId=${encodeURIComponent(
          userData.id
        )}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log(data);

      const fetchedFacts = data.facts[0]; // Assuming there's one object in 'facts' array
      const fetchedVisits = data.previousDayVisits[0]; // Assuming there's one object in 'previousDayVisits' array

      const visitCount = fetchedVisits?.visitCount || 0; // Default to 0 if undefined

      // Update the funfact array with new 'fact' values and 'status'
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
        const updatedStatus = index < visitCount ? "done" : "not done";

        return { ...fact, fact: updatedFact, status: updatedStatus };
      });

      // Set the updated funfact array in state
      setFunfact(updatedFunfact);
    } catch (error) {
      console.error("Error fetching AI facts:", error);
    }
  };

  const categoryKeys = {
    "AI History": "history",
    "AI Fun Fact": "fun_fact",
    "AI Future": "future",
    "AI Current Affair’s": "current_affairs"
  };

  useEffect(() => {
    fetchAIFact();
  }, [userData.id]); // Re-run the effect when userData.id changes

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="w-[97%] mx-auto relative ">
      <div className="flex justify-between items-center px-3">
        <button
          className=" absolute top-0 left-3 "
          onClick={() => {
            // playSound();
            onClose();
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} />{" "}
        </button>
        <div className="w-[95%] mx-auto ">
          <p className=" w-full text-center text-xl font-semibold">
            {t("ui.fact_vault_title")}
          </p>
          <p className=" w-full text-sm text-center">{t("ui.summary")}</p>
        </div>
      </div>

      <div className="mt-5 px-5 w-full max-w-lg mx-auto ">
        <p className="font-semibold">{t("ui.yesterday")}</p>

        <div className="mt-3 flex flex-col gap-3 pb-28 overflow-hidden overflow-y-auto">
          {funfact.map((data, index) => (
            <div
              key={index}
              onClick={() => {
                // playSound();
                incrementVisitCount(data?.name);
                toggleExpand(index);
              }}
              className="  w-full rounded-xl px-3 py-2 "
              style={{
                background:
                  "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
              }}
            >
              <div className="flex justify-between items-center">
                <div
                  className={` flex justify-start items-center gap-4 text-white${
                    data.status === "done" ? "text-gray-500" : "text-white"
                  } `}
                >
                  <p className="text-sm font-medium">{data.time}</p>
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
              <div
                className={`duration-300 ease-in-out overflow-hidden ${
                  expandedIndex === index
                    ? "py-3 max-h-[300px] rounded-b-md"
                    : "max-h-0"
                }`}
              >
                <p
                  className={`${
                    data.status === "done" ? "text-gray-500" : "text-white"
                  } text-sm  duration-500 text-white/90`}
                >
                  {data.fact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FactVaultSummaryWeb;
