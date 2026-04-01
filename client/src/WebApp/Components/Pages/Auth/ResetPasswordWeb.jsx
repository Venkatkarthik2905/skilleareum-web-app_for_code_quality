import React, { useState, useEffect } from 'react';
import Header from "../Layout/Header";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SERVER_URL } from '../../../../config';
import axios from 'axios';
import { useTranslation } from "react-i18next";

const ResetPasswordWeb = () => {
  const { t } = useTranslation('dashboard');
  const [searchParams] = useSearchParams();
  const navigate=useNavigate()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (!resetToken) {
      toast.error("Invalid or missing token.");
    }
    setToken(resetToken);
  }, [searchParams]);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(`${SERVER_URL}/api/reset-password`, { token, newPassword: password }
      );


      if (res.status===200) {
        toast.success(res.data.message || "Password reset successfully!");
        // Optionally redirect to login
        setPassword('');
        setConfirmPassword('');
        navigate("/UserLogin")
      } else {
        toast.error(res.data.message || "Reset failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full bg-black min-h-screen overflow-hidden relative">
      <Header />
      <div className="flex flex-col lg:flex-row justify-center items-center pt-10 gap-2 mt-3 lg:mt-0">
        <p className="lg:w-[20%] text-center rounded-full border border-white px-3 py-2 font-poppins bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent inline text-sm">
          Welcome To SKILLEAREUM.AI
        </p>
        <div className="translate-y-5">
          <img
            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
            className="h-32 mx-auto"
            alt="Robot"
          />
        </div>
        <p className="lg:w-[20%] text-center rounded-full border border-white px-3 py-2 mt-5 lg:mt-0 font-poppins bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent inline text-sm">
          Forgot Password
        </p>
      </div>

      <div className="w-[90%] mx-auto">
        <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-4 mt-8">
          <div>
            <p className="text-white font-poppins text-sm">{t('auth.newPassword')}</p>
            <div className="border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
              <img src="/assets/WebApp/Key.svg" alt="key icon" />
              <input
                placeholder="......"
                type={showPassword ? "text" : "password"}
                className="placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="text-white text-sm"
                />
              </button>
            </div>
          </div>

          <div>
            <p className="text-white font-poppins text-sm">{t('auth.confirmNewPassword')}</p>
            <div className="border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
              <img src="/assets/WebApp/Key.svg" alt="key icon" />
              <input
                placeholder="......"
                type={showConfirmPassword ? "text" : "password"}
                className="placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button" onClick={() =>  setShowConfirmPassword((prev) => !prev)}>
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEye : faEyeSlash}
                  className="text-white text-sm"
                />
              </button>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-white font-semibold py-2 rounded-xl hover:opacity-90 transition mt-4"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordWeb;
