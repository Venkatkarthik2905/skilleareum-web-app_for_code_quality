import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import i18n from "../../../../../../i18n";
import { SERVER_URL } from "../../../../../../config";
import { useTranslation } from "react-i18next";

const ReadBlogWeb = ({
  Claimday,
  isLoading,
  authToken,
  source,
  image_url,
  onClose,
  blogData,
  userId,
  canClaim,
  toast,
  getAiBlog,
}) => {
  const { t } = useTranslation("ai_blog");
  // const { playSound } = useSettings();
  const [atBottom, setAtBottom] = useState(false);
  const [Loading, setLoading] = useState(false);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    const element = contentRef.current;
    if (element) {
      const isAtBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 10;
      setAtBottom(isAtBottom);
    }
  };
  const claimReward = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${SERVER_URL}/api/blog/`,
        {
          userId: userId,
          day: Claimday || blogData.day,
          language: i18n.language,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success(t("ui.task_completed"));
        getAiBlog();
        onClose();
        setTimeout(() => {
          if (source === "TaskList") {
            navigate("/TaskList");
          } else navigate("/ChallengeMapWEB");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error(t("ui.error_something_wrong"));
    } finally {
      setLoading(false);
    }
  }, [blogData, userId, t]); // ensure updated values

  // Debounce function to avoid rapid multiple clicks
  const debouncedClaim = useCallback(debounce(claimReward, 1000), [claimReward]);
  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <div className=" mt-7 ">
        {!isLoading && blogData?.title ? (
          <>
          <p className="text-2xl font-semibold text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#00FF18] to-[#0285FF] uppercase">
              {blogData.title.includes(":")
                ? blogData.title.split(":")[0]
                : blogData.title}
              <br />
            </p>
            {blogData.title.includes(":") && blogData.title.split(":")[1] && (
              <p className="text-center text-xs mt-2 underline-offset-8 underline text-[#0285FF] decoration-[#00FF18] uppercase">
                {blogData.title.split(":")[1]}
              </p>
            )}
          </>
        ) : (
          <div className="px-10 mt-2 mb-6 space-y-3">
            <div className="h-6 bg-[#2a2a2a] rounded w-3/4 mx-auto"></div>
            <div className="h-3 bg-[#2a2a2a] rounded w-1/4 mx-auto"></div>
          </div>
        )}

        <>
          <div ref={contentRef} className="px-3 text-[#D6D4D4] mt-7 text-sm max-w-3xl mx-auto">
            <div className="bg-[#0A0A0A] rounded-xl p-6 shadow-lg border border-[#1AE348]/50 ">
            <p className=" uppercase font-semibold text-lg text-[#1EEF32] mb-4">
             {t("ui.introduction")}
            </p>

            {!isLoading && blogData ? (
              <div
                className="mb-4  leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blogData?.explanation }}
              ></div>
            ) : (
             <div className="space-y-2 mb-4 animate-pulse">
              {[100, 90, 80, 70, 60].map((w, i) => (
                <div
                  key={i}
                  className={`h-3 w-[${w}%] bg-[#2a2a2a] rounded`}
                ></div>
              ))}
            </div>
            )}

            {!isLoading && blogData ? (
              <img
                loading="lazy"
                src={image_url}
                alt="Blog Visual"
              className="w-[75%] mx-auto mb-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
            ) : (
              <div className="w-[75%] mx-auto mb-6 h-40 bg-[#2a2a2a] rounded animate-pulse"></div>
            )}

          <p className="text-lg font-semibold text-[#1EEF32] uppercase mb-2">
            {t("ui.real_world_examples")}
          </p>
          {!isLoading && blogData ? (
            <div
              className="mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blogData?.examples }}
            />
          ) : (
            <div className="space-y-2 mb-4 animate-pulse">
              {[100, 90, 80, 70, 60].map((w, i) => (
                <div
                  key={i}
                  className={`h-3 w-[${w}%] bg-[#2a2a2a] rounded`}
                ></div>
              ))}
            </div>
          )}

          <p className="text-lg font-semibold text-[#0285FF] uppercase mb-2">
            {t("ui.fun_fact")}
          </p>
          {!isLoading && blogData ? (
            <div
              className="mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blogData?.fun_fact }}
            />
          ) : (
            <div className="space-y-2 mb-4 animate-pulse">
              {[100, 90, 80, 70, 60].map((w, i) => (
                <div
                  key={i}
                  className={`h-3 w-[${w}%] bg-[#2a2a2a] rounded`}
                ></div>
              ))}
            </div>
          )}
          </div>

          <div className="flex flex-col items-center gap-1 font-medium py-5">
            {canClaim ? (
              <div
                onClick={() => {
                  if (Loading) return;
                  if (!canClaim) return;
                  debouncedClaim();
                }}
                className="rounded-2xl w-52 h-9 mx-auto relative cursor-pointer"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                }}
              >
                <div className="h-full w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
                <div className="h-full w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
                <div className="bg-[#070e3a4b] backdrop-blur-sm h-full rounded-2xl w-full border-[0.5px] border-[#1AE348]"></div>
                <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                  <p
                    className="uppercase font-medium text-center text-sm font-zendots flex items-center justify-center"
                    style={{
                      color: "transparent",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      backgroundImage:
                        "linear-gradient(to right, #0285FF, #1EEF32)",
                    }}
                  >
                    {Loading ? (
                      <span className="loader w-4 h-4 border-2 border-t-transparent border-[#1EEF32] rounded-full animate-spin"></span>
                    ) : (
                        t("ui.claim_points")
                    )}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        
   </>

      

    </div>
    </div>
    
  );
};

export default ReadBlogWeb;
