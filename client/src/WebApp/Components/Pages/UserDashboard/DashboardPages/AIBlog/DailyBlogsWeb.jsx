import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import debounce from "lodash.debounce";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import axios from "axios";
import i18n from "../../../../../../i18n";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../../../../config";
import ReadBlogWeb from "./ReadBlogWeb";
import DashboardLayout from "../../Layout/DashboardLayout";

const DailyBlogsWeb = () => {
  const { t } = useTranslation("ai_blog");
  const { day } = useParams(); // this will be '2' if URL is /DailyBlogs/2

  const [openReadBlog, setOpenReadBlog] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [canClaim, setcanClaim] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user_email.id);
  const authToken = useSelector((state) => state.token);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");

  const handleOpenReadBlog = () => {
    setOpenReadBlog(!openReadBlog);
  };
  const getAiBlog = useCallback(
    debounce(async () => {
      if (!userId) return;
      setisLoading(true);
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/blog?userId=${userId}&language=${i18n.language}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        // console.log(response);
        setBlogData(response.data.blog);
        setcanClaim(response.data.canClaim);
      } catch (error) {
        // console.log(error);
      } finally {
        setisLoading(false);
      }
    }, 1000),
    []
  );
  useEffect(() => {
    getAiBlog();
    return () => {
      getAiBlog.cancel();
    };
  }, []);

  return (
    <DashboardLayout>
        <div className="relative text-white font-poppins mt-24 ">
          <div className="w-full z-10 relative mx-auto max-w-xl ">
            <div>
              <div className="flex justify-center items-center">
                <div
                  onClick={() => {
                    if (navigator.vibrate) {
                      navigator.vibrate(100);
                    }
                    // playSound();
                    if (source === "TaskListWeb") {
                      navigate("/TaskListWeb");
                    } else navigate("/ChallengeMapWeb");
                  }}
                  className="cursor-pointer absolute top-7 -left-14 "
                >
                  <FontAwesomeIcon
                    icon={faArrowLeftLong}
                    className="font-bold text-lg"
                  />
                </div>
              </div>

              <div className=" mt-5 ">
                <ReadBlogWeb
                  source={source}
                  Claimday={day}
                  authToken={authToken}
                  isLoading={isLoading}
                  getAiBlog={getAiBlog}
                  toast={toast}
                  canClaim={canClaim}
                  userId={userId}
                  blogData={blogData}
                  onClose={handleOpenReadBlog}
                  image_url={
                    blogData?.image_url ||
                    "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/BlogDay1.svg"
                  }
                />
              </div>
            </div>
          </div>
        </div>
    </DashboardLayout>
  );
};
export default DailyBlogsWeb;
