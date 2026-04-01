import React from "react";
import { useTranslation } from "react-i18next";

const Section9 = () => {
  const { t } = useTranslation('landing');
  const profiles = [
    {
      img: "/assets/Landing/Profile/Manju.jpg",
      name: "Manjunath Vijay ",
      job: t('section9.team.manju.job'),
      desc: t('section9.team.manju.desc'),
    },
    {
        img: "/assets/Hudson.png",
        name: "Hudson Daniel ",
        job: t('section9.team.hudson.job'),
        desc: t('section9.team.hudson.desc'),
      },
      {
        img: "/assets/Landing/Profile/Sakthi.jpg",
        name: "Sakthi Visakan Rajaguru ",
        job: t('section9.team.sakthi.job'),
        desc: t('section9.team.sakthi.desc'),
      },
      {
        img: "/assets/Landing/Profile/Anup2.png",
        name: "Anup Kumar",
        job: t('section9.team.anup.job'),
        desc: t('section9.team.anup.desc'),
      },
      {
        img: "/assets/Landing/Profile/Dinesh.jpg",
        name: "Dinesh",
        job: t('section9.team.dinesh.job'),
        desc: t('section9.team.dinesh.desc'),
      },
      {
        img: "/assets/Landing/Profile/Mani.jpg",
        name: "Mani  ",
        job: t('section9.team.mani.job'),
        desc: t('section9.team.mani.desc'),
      },
  ];
  return (
    <div className="font-gilroy py-20">
      <div className="flex flex-col items-center gap-5">
        <h1
          style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage:
              "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}
          className="text-center font-medium text-5xl"
        >
          {t('section9.title')}
        </h1>
        {/* <p className="text-sm text-center">
          Let’s here from other founder, Co-founders
        </p> */}
      </div>

      <div className="mt-10">
        <div className=" grid md:grid-cols-3 grid-cols-1 gap-5 h-full ">
        {profiles.map((data, index) => (
          <div key={index} className="h-full bg-gradient-to-br from-white to-white/0 to-30% p-[1px] rounded-2xl ">
        
              <div  className="bg-[#0a0a0a] h-full hover:backdrop-blur-md hover:bg-[#0a0a0a]/80 cursor-pointer rounded-2xl p-5">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <img src={data.img} className="w-12 h-12 rounded-full object-cover  object-center " />
                    <div>
                      <p className=" font-medium ">{data.name}</p>
                      <p className="text-xs">{data.job}</p>
                    </div>
                  </div>
                  <div className=" scale-150 ">
                  <i class="fa-solid fa-quote-left "></i>
                  </div>
                </div>
                <div className="mt-7">
                  <p className="font-light text-sm">{data.desc}</p>
                </div>
              </div>
          
          </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Section9;
