import React, { useState } from "react";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Layout/Header";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { SERVER_URL } from "../../config";
import axios from "axios";

export default function MerchantForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [otp, setOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();


const handleConfirm = async () => {
  if (!email) return toast.error("Enter email");

  setLoading(true);

  try {
    const { data } = await axios.post(
      `${SERVER_URL}/api/merchant/send-otp`,
      { email }
    );

    if (data.status === "success") {
      toast.success("OTP sent to email");
      setShowOtpPopup(true);
    } else {
      toast.error(data.message);
    }

  } catch (error) {  
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Server error");
    }
  } finally {
    setLoading(false);
  }
};



  const handleReset = async () => {
    if (!otpVerified) return toast.error("Verify OTP first");

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    setResetLoading(true);

    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/merchant/reset-password`,
        { email, newPassword }
      );

      if (data.status === "success") {
        toast.success("Password reset successful");
        setShowResetPopup(false);
        setEmail("");
        navigate("/merchant-login");
      }
    } catch {
      toast.error("Reset failed");
    } finally {
      setResetLoading(false);
    }
  };



  return (
    <div>
      <div className="bg-black min-h-screen overflow-hidden relative ">
        {/* <Header /> */}
        <Toaster />
        <div className="flex flex-col lg:flex-row justify-center items-center pt-2 gap-2 mt-3 lg:mt-0">
          <div className=" translate-y-5 ">
            <img
              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
              className="h-40 mx-auto"
              alt="Robot"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-">
          <p className="text-center text-white font-poppins font-medium text-2xl">
            Forgot Password
          </p>
        </div>

        <div className="w-full max-w-80 mx-auto flex flex-col gap-5 px-3 lg:px-0 mt-10">
          <div className="w-full mx-auto">
            <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-2">
              <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1px] rounded-lg">
                <div className="z-10 py-3 px-4 rounded-lg text-white flex gap-3 items-center bg-black">
                  <input
                    type="email"
                    className="placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="z-10 cursor-pointer w-full font-semibold rounded-lg py-2.5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-white flex items-center justify-center text-lg"
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin className="text-white" />
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>

        {/* Reset Password Popup */}
        {showResetPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
            <div className="w-full max-w-md">
              <div className="bg-gradient-to-b from-[#147E3C] via-[#113B49] to-[#0D234C] rounded-xl p-8 relative">
                <div className="">
                  <p className="text-white font-zendots text-xl text-center mb-8 tracking-wider uppercase">
                    Reset Password
                  </p>

                  {/* New Password Input */}
                  <div className="mb-6">
                    <div className="bg-[#000A14] rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center gap-2">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="flex-1 bg-transparent text-white placeholder:text-gray-400 outline-none text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="text-gray-400 hover:text-white"
                        >
                          <FontAwesomeIcon
                            icon={showNewPassword ? faEye : faEyeSlash}
                            className="text-sm"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="bg-[#000A14] rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center gap-2">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="flex-1 bg-transparent text-white placeholder:text-gray-400 outline-none text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-400 hover:text-white"
                        >
                          <FontAwesomeIcon
                            icon={showConfirmPassword ? faEye : faEyeSlash}
                            className="text-sm"
                          />
                        </button>
                      </div>
                    </div>
                  </div>


                  <button
                    onClick={handleReset}
                    disabled={resetLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-white font-bold text-xl transition-all duration-200 shadow-lg"
                  >
                    {resetLoading ? (
                      <FontAwesomeIcon icon={faSpinner} spin className="text-white" />
                    ) : (
                      "Reset"
                    )}
                  </button>

                  <button
                    onClick={() => setShowResetPopup(false)}
                    className="absolute top-4 right-5 text-white text-xl hover:text-white"
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-[100%] flex justify-between absolute bottom-[0%] ">
          <img className="w-3/12" src="/assets/WebApp/trophy.svg" alt="Trophy" />
          <img
            className="w-[18%] translate-y-7 "
            src="/assets/WebApp/game-control.svg"
            alt="Game control"
          />
        </div>

        {showOtpPopup && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#0B1220] p-6 rounded-xl w-80">
              <h2 className="text-white text-center mb-4">Enter OTP</h2>

              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6 digit OTP"
                className="w-full px-3 py-2 mb-4 rounded bg-black text-white"
              />

              <button
                className="w-full bg-green-500 py-2 rounded text-white"
                onClick={async () => {
                  const { data } = await axios.post(
                    `${SERVER_URL}/api/merchant/verify-otp`,
                    { email, otp }
                  );

                  if (data.status === "success") {
                    toast.success("OTP verified");
                    setShowOtpPopup(false);
                    setShowResetPopup(true);
                    setOtpVerified(true);
                  } else {
                    toast.error(data.message);
                  }
                }}
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}