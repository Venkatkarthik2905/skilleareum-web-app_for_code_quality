import React from "react";
import "../../../../../../../App.css";

const SpinSkeleton = () => {
  return (
    <div
      translate="no"
      className="bg-[#080B1C] relative bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins"
    >
      <div
        className="bg-cover bg-center h-screen overflow-hidden overflow-y-auto"
        style={{
          backgroundImage:
            "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/subscribebg.png)",
        }}
      >
        <div
          className="h-screen w-full overflow-hidden overflow-y-auto"
          style={{
            background:
              "radial-gradient(378.88% 129.46% at 50% -1.69%, rgba(19, 36, 128, 0) 5.86%, rgba(10, 18, 64, 0.626421) 11.28%, #04071A 24.38%, rgba(4, 8, 29, 0.974934) 60.44%, rgba(4, 7, 26, 0.85) 68.06%, rgba(10, 18, 64, 0.626421) 80.94%, rgba(19, 36, 128, 0) 89.04%)",
          }}
        >
          <div className="relative">
            <div className="w-full z-10 absolute top-0 py-5 min-h-screen">
              {/* Header Section */}
              <div className="w-[95%] mx-auto flex justify-center items-center">
                <div className="w-[20%] pl-3">
                  <div className="h-6 w-6 bg-gray-700 rounded-full animate-pulse"></div>
                </div>
                <div className="w-[80%] pr-10">
                  <div className="h-6 w-40 bg-gray-700 rounded animate-pulse mx-auto"></div>
                </div>
              </div>

              {/* Spins Remaining and Sound Button */}
              <div className="w-[95%] mx-auto flex justify-between items-center mt-4">
                <div></div>
                <div className="mr-3">
                  <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Spin Wheel Section */}
              <div className="relative flex justify-center items-center mt-10">
                <div className="relative rounded-full overflow-hidden">
                  <div className="w-80 h-80 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="absolute top-4 z-30">
                    <div className="w-16 h-16 bg-gray-600 rounded-full animate-pulse mx-auto"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 bg-gray-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Spins Left Section */}
              <div className="mt-3 flex justify-center">
                <div className="w-52 h-10 bg-gray-700 rounded-full animate-pulse"></div>
              </div>

              {/* Spin Button */}
              <div className="w-full flex justify-center items-center mt-5">
                <div className="w-[90%] h-10 bg-gray-700 rounded-2xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinSkeleton;