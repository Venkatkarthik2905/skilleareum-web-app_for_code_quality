import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const DoYouKnowWeb = ({ handleClaim, randomQuestion }) => {
  const { t } = useTranslation('dashboard');
  // const { playSound } = useSettings();

  return (
    <div className=" fixed inset-0 bg-black/60 flex justify-center items-center ">
      <div className="w-full z-10 absolute top-0 px-3 py-5 min-h-screen flex justify-center items-center h-screen">
        <div className="w-[90%] mx-auto max-w-md  bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-0.5 rounded-xl font-poppins ">
          <div className="bg-[#080B1C] text-white p-5 rounded-xl shadow-lg ">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">{t('farming.aiTrivia')}</h2>
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-4 text-center font-semibold">
                {randomQuestion?.question}
              </p>
            </div>
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={() => {
                  if (navigator.vibrate) {
                    navigator.vibrate(100);
                  }
                  // playSound();
                  handleClaim("Yes");
                }}
                className="bg-gradient-to-r from-[#17C969] to-[#0285FF] hover:from-[#0285FF] hover:to-[#17C969] cursor-pointer font-semibold text-white py-2 px-4 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  if (navigator.vibrate) {
                    navigator.vibrate(100);
                  }
                  // playSound();
                  handleClaim("No");
                }}
                className="bg-gradient-to-r from-[#17C969] to-[#0285FF] hover:from-[#0285FF] hover:to-[#17C969] cursor-pointer font-semibold  text-white py-2 px-4 rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoYouKnowWeb;
