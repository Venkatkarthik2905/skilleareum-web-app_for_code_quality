import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

const SkinChangeWeb = ({ onClose }) => {
  const { t } = useTranslation('dashboard');
  const [selectSkin, setSelectSkin] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedVideo") || null
  );
  const [tempSelectedOption, setTempSelectedOption] = useState(
    localStorage.getItem("selectedVideo") || null
  );

  const settings = {
    infinite: true,
    speed: 500,
    dots: false,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    centerMode: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const videoOptions = [
    {
      id: 1,
      title: "Default",
      url: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMEDefaultnew.mp4",
      transition: "../assets/HOMEArabTransition.mp4",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Flag-United-Kingdom.webp",
    },
    {
      id: 2,
      title: "Spain",
      url: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMESpainnew.mp4",
      transition:
        "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMESpainnew.mp4",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Flag-Spain.webp",
    },
    {
      id: 3,
      title: "Russia",
      url: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMERusiianFNl.mp4",
      transition: "../assets/HOMERussianTransition.mp4",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/Flag_of_Russia.svg.png",
    },
    {
      id: 4,
      title: "French",
      url: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMEFrenchFNl.mp4",
      transition: "../assets/HOMEFrenchTransition.mp4",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Flag-France.webp",
    },
    {
      id: 5,
      title: "China",
      url: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMEMchinaFNl.mp4",
      transition: "../assets/HOMEMchinnaTransition.mp4",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/Flag_of_Peoples_Republic_of_China_Flat_Round-1024x1024.webp",
    },
    {
      id: 6,
      title: "India",
      url: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMEIndiaFNl.mp4",
      transition: "../assets/HOMEIndiaTransition.mp4",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/indiaflag.jpg",
    },
    {
      id: 7,
      title: "Nigeria",
      url: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMENigerianew.mp4",
      transition: "../assets/HOMENigeriaTransition.mp4",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/Flag-Nigeria.webp",
    },
    {
      id: 8,
      title: "Portuguese",
      url: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMEPortugeseFNl.mp4",
      transition: "../assets/HOMEPortuguesTransition.mp4",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/portugal.jpg",
    },
    {
      id: 9,
      title: "Arab",
      url: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMEArabFNl.mp4",
      transition: "../assets/HOMEArabTransition.mp4",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/uae.png",
    },
  ];

  const sortedVideoOptions = selectedOption
    ? [
        videoOptions.find((option) => option.url === selectedOption),
        ...videoOptions.filter((option) => option.url !== selectedOption),
      ]
    : videoOptions;

  const handleSelectSkin = () => {
    // playSound();
    setSelectSkin(false);
  };

  const handleOptionSelect = (url) => {
    setTempSelectedOption(url);
    // playSound();
  };

  const handleConfirmSelection = () => {
    // playSound();
    if (tempSelectedOption) {
      const selectedTransition = videoOptions.find(
        (option) => option.url === tempSelectedOption
      )?.transition;

      if (selectedTransition) {
        setSelectedOption(tempSelectedOption);
        localStorage.setItem("selectedVideo", tempSelectedOption);
        localStorage.setItem("selectedTransition", selectedTransition);
        setSelectSkin(true);
        onClose();
      } else {
        toast.error(t('skinChange.errors.transitionNotFound'));
      }
    }
  };

  const handleClose = () => {
    // playSound();
    if (tempSelectedOption !== selectedOption) {
      toast.error(t('skinChange.errors.confirmSelection'));
    } else {
      onClose();
    }
  };

  return (
    <div>
      <div className="relative w-full h-full"></div>
      <div className="fixed bottom-0 left-0 right-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="fixed bottom-0 left-0 max-w-md mx-auto right-0 transition-all ease-in-out duration-500 w-[100%] rounded-tr-3xl rounded-tl-3xl  p-[1px] bg-gradient-to-b from-[#1AE348] to-[#0368C0] ">
          <div className="w-full h-full  bg-[#0a0342] rounded-t-3xl">
            <div
              className="w-full h-full rounded-t-3xl pb-5 "
              style={{
                background:
                  "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)",
              }}
            >
              <div className="pt-5">
                <div className="flex justify-center items-center">
                  <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                    className="w-5/12"
                    alt="mascot"
                  />
                </div>
                {selectSkin ? (
                  <div>
                    <h2 className="font-medium font-zendots w-full text-2xl text-center mt-5">
                      {t('skinChange.titlePrefix')}{" "}
                      <span
                        style={{
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                          backgroundImage:
                            "linear-gradient(to right, #0285FF, #1EEF32)",
                        }}
                      >
                        {t('skinChange.titleSuffix')}
                      </span>
                    </h2>
                    <p className="w-[80%] mx-auto text-center text-sm mt-3">
                      {t('skinChange.description')}
                    </p>
                  </div>
                ) : (
                  <div className="relative flex justify-center items-center overflow-hidden overflow-x-auto">
                    <Slider
                      {...settings}
                      className="w-[95%] mx-auto py-8 flex justify-center items-center"
                    >
                      {sortedVideoOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleOptionSelect(option.url)}
                          className="flex justify-center items-center"
                        >
                          <div
                            className={`${
                              tempSelectedOption === option.url
                                ? "border-green-600 border-2 opacity-100"
                                : "opacity-30"
                            } w-9 h-9 border-2 rounded-full`}
                          >
                            <img
                              src={option.img}
                              alt="flag"
                              className="w-full h-full rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}

                {selectSkin ? (
                  <div className="z-30 w-[90%] mx-auto flex justify-center items-center gap-5 my-5">
                    <div
                      onClick={() => {
                        // playSound();
                        onClose();
                      }}
                      className=" rounded-2xl w-[50%] h-10 relative"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                      }}
                    >
                      <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                      <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                      <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                      <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                        <p
                          className="uppercase text-sm font-medium text-center font-zendots"
                          style={{
                            color: "transparent",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            backgroundImage:
                              "linear-gradient(to right, #0285FF, #1EEF32)",
                          }}
                        >
                          {t('skinChange.buttons.skip')}
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={handleSelectSkin}
                      className=" rounded-2xl w-[50%] h-10 relative"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                      }}
                    >
                      <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                      <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                      <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                      <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                        <p
                          className="uppercase text-sm font-medium text-center font-zendots"
                          style={{
                            color: "transparent",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            backgroundImage:
                              "linear-gradient(to right, #0285FF, #1EEF32)",
                          }}
                        >
                          {t('skinChange.buttons.select')}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="z-30 w-[80%] mx-auto flex justify-center items-center gap-10 my-5">
                    <div
                      onClick={handleClose}
                      className=" rounded-2xl w-[50%] h-10 relative"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                      }}
                    >
                      <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                      <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                      <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                      <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                        <p
                          className="uppercase text-sm font-medium text-center font-zendots"
                          style={{
                            color: "transparent",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            backgroundImage:
                              "linear-gradient(to right, #0285FF, #1EEF32)",
                          }}
                        >
                          {t('skinChange.buttons.back')}
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={handleConfirmSelection}
                      className=" rounded-2xl w-[50%] h-10 relative"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                      }}
                    >
                      <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                      <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                      <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                      <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                        <p
                          className="uppercase text-sm font-medium text-center font-zendots"
                          style={{
                            color: "transparent",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            backgroundImage:
                              "linear-gradient(to right, #0285FF, #1EEF32)",
                          }}
                        >
                          {t('skinChange.buttons.confirm')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinChangeWeb;
