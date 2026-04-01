import React, { useState } from "react";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Layout/Header";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { SET_TOKEN, setUserEmail } from "../../../../store";
import toast, { Toaster } from "react-hot-toast";
import { SERVER_URL } from "../../../../config";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t } = useTranslation('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [sendotpLoading, setsendotpLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReferralLocked, setIsReferralLocked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
    referral_code: "",
    source: "",
    referred_by: "",
    evm_wallet_address: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    rePassword: ""
  });
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const fetchReferralCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("ref");
      const referralCodeFromUrl = params.get("referral_code");

      if (referralCodeFromUrl) {
        setFormData((prev) => ({
          ...prev,
          referral_code: referralCodeFromUrl,
        }));
        setIsReferralLocked(true);
      }

      if (token) {
        try {
          const decoded = jwtDecode(token);
          setFormData((prev) => ({
            ...prev,
            referred_by: decoded.referred_by || "",
            source: decoded.src || "",
            evm_wallet_address: decoded.user_wallet_address || null,
          }));

          const response = await axios.get(
            `${SERVER_URL}/api/getReferralCode?email=${decoded.referred_by}`
          );

          if (response.data.status === "success") {
            setFormData((prev) => ({
              ...prev,
              referral_code: response?.data?.user?.referral_code || "",
            }));
            setIsReferralLocked(true);
          }
        } catch (error) {
          console.error("Invalid or expired token:", error);
        }
      }
    };

    fetchReferralCode();
  }, []);

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", rePassword: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('validation.invalidEmail');
      isValid = false;
    }

    const password = formData.password;
    if (password.length < 8) {
      newErrors.password = t('validation.passwordLength');
      isValid = false;
    }

    if (formData.password !== formData.rePassword) {
      newErrors.rePassword = t('validation.passwordMismatch');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const profile = await res.json();
        const { email, given_name: firstName, sub: googleId } = profile;

        const data = {
          firstName,
          email,
          googleId,
        };
        handleSignUp({ email, googleId, firstName, ...formData }, true)
      } catch (err) {
        console.error("Signup with Google failed", err);
        toast.error(t('toasters.googleSignupError'));
      }
    },
    onError: (error) => {
      toast.error(t('toasters.googleLoginFailed'));
    },
  });

  const handleSignUp = async (data, isGoogleLogin = false) => {
    if (!isGoogleLogin) {
      if (!validateInputs()) return;
      if (!emailVerified) {
        toast.error(t('toasters.verifyBeforeSignup'));
        return;
      }
    }
    try {
      setLoading(true);
      const registerUser = await axios.post(
        `${SERVER_URL}/api/SignUpWebGoogleUser`,
        data
      );

      if (registerUser.data.status === "success") {
        dispatch(setUserEmail(registerUser.data.user));
        dispatch(SET_TOKEN(registerUser.data.token));
        navigate("/ChallengeMap_7Days");
      } else {
        toast.error(registerUser.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  }

  const [showOtp, setShowOtp] = useState(false);

  const handleEmailVerify = async (e) => {
    e?.preventDefault?.();
    setLoading(true)

    try {
      setsendotpLoading(true);
      const sendotp = await axios.post(
        `${SERVER_URL}/api/telegram/sendotp?email=${formData.email}`
      );
      if (sendotp.status === 200) {
        setShowOtp(true);
        setOtpSent(true);
        toast.success(t('toasters.otpSent'));
      }
      if (sendotp.status === 201) {
        toast.error(t('toasters.emailExists'));
      }
      setsendotpLoading(false);
    } catch (e) {
      setsendotpLoading(false);
    } finally {
      setLoading(false)
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const verifyotp = await axios.post(
        `${SERVER_URL}/api/telegram/verify-otp?email=${formData.email}&otp=${otp}`
      );
      if (verifyotp.status === 200) {
        toast.success(t('toasters.emailVerified'));
        setEmailVerified(true);
        setShowOtp(false);
      }
    } catch (error) {
      toast.error(t('toasters.invalidOtp'))
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-black min-h-screen overflow-hidden relative">
      <Header />
      <div className="flex flex-col lg:flex-row justify-center items-center gap-2 mt-3 lg:mt-0">
        <p className="lg:w-[20%] text-center rounded-full border border-white px-3 py-2 font-poppins bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent inline text-sm">
          {t('welcomeTitle')}
        </p>
        <Toaster />
        <div className=" translate-y-5 ">
          <img
            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
            className="h-32 mx-auto"
            alt="Robot"
          />
        </div>
        <p className="lg:w-[20%] text-center rounded-full border border-white px-3 py-2 mt-5 lg:mt-0 font-poppins bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent inline text-sm">
          {t('createAccount')}
        </p>
      </div>
      <div className="mt-8 flex flex-col justify-center items-center gap-2">
        <p className="text-center text-white font-poppins font-semibold text-3xl">
          {t('getStarted')}
        </p>
        <p className="text-center bg-clip-text text-transparent bg-gradient-to-r from-[#0285FF] to-[#1EEF32] font-medium font-poppins text-xs">
          {t('motto')}
        </p>
      </div>
      <div className="flex flex-col gap-4 px-3 lg:px-0 mt-5">
        <div className="w-[90%] mx-auto">
          <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-2">
            <p className="z-10 text-white font-poppins text-sm ">{t('emailLabel')}</p>
            <div className="z-10 border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
              <img src="/assets/WebApp/message.svg" />
              <input
                className="placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full"
                placeholder={t('emailPlaceholder')}
                type="email"
                value={formData.email}
                disabled={otpSent || emailVerified}
                onChange={(e) => {
                  const email = e.target.value;
                  setFormData({ ...formData, email });
                  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                  setIsEmailValid(isValid);
                  setEmailVerified(false);
                }}
              />
              {!emailVerified && isEmailValid && (
                <button
                  disabled={loading}
                  onClick={handleEmailVerify}
                  className="ml-2 text-xs bg-blue-600 hover:bg-blue-700 rounded px-2 py-1"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin mr-2 text-white" />
                  ) : null}
                  {loading ? t('otp.verifying') : t('otp.verifyButton')}
                </button>
              )}
              {emailVerified && (
                <span className="ml-2 text-green-500 text-xs">{t('otp.verified')}</span>
              )}
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {showOtp && (
          <div className="w-[90%] mx-auto">
            <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-2">
              <div className="z-10  flex flex-col gap-2">
                <p className="z-10 text-white font-poppins text-sm">{t('otp.label')}</p>
                <div className="z-10 border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
                  <input
                    className="placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full"
                    placeholder={t('otp.placeholder')}
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleOtpSubmit}
                  className={`z-10 cursor-pointer mt-2 w-[80%] mx-auto rounded-lg py-1.5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-white font-medium flex justify-center items-center transition-opacity duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                  {t('otp.verifyButton')}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-[90%] mx-auto">
          <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-2">
            <div className="z-10  flex flex-col gap-2">
              <p className="z-10 text-white font-poppins text-sm ">{t('password')}</p>
              <div className="z-10 border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
                <img src="/assets/WebApp/Key.svg" />
                <input
                  placeholder={t('passwordPlaceholder')}
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="z-10 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="z-10 text-sm text-white"
                  />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[90%] mx-auto">
          <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-2">
            <div className="z-10  flex flex-col gap-2">
              <p className="z-10 text-white font-poppins text-sm ">{t('rePasswordLabel')}</p>
              <div className="z-10 relative border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
                <img src="/assets/WebApp/Key.svg" />
                <input
                  type={showRePassword ? "text" : "password"}
                  value={formData.rePassword}
                  onChange={(e) =>
                    setFormData({ ...formData, rePassword: e.target.value })
                  }
                  className="placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full"
                  placeholder={t('rePasswordPlaceholder')}
                />
                <button
                  type="button"
                  className="absolute right-4 z-10 text-white"
                  onClick={() => setShowRePassword((prev) => !prev)}
                >
                  <FontAwesomeIcon
                    icon={showRePassword ? faEye : faEyeSlash}
                    className="z-10 text-white text-sm "
                  />
                </button>
              </div>
              {errors.rePassword && (
                <p className="text-red-500 text-sm mt-1">{errors.rePassword}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[90%] mx-auto">
          <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-2">
            <div className="z-10  flex flex-col gap-2">
              <p className="z-10 text-white font-poppins text-sm ">{t('referralLabel')}</p>
              <div className="z-10 relative border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
                <img src="/assets/WebApp/Key.svg" />
                <input
                  type="text"
                  value={formData.referral_code}
                  onChange={(e) =>
                    setFormData({ ...formData, referral_code: e.target.value })
                  }
                  disabled={isReferralLocked}
                  className={`placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full ${isReferralLocked ? "cursor-not-allowed opacity-70" : ""
                    }`}
                  placeholder={t('referralPlaceholder')}
                />
              </div>
              {errors.referral_code && (
                <p className="text-red-500 text-sm mt-1">{errors.referral_code}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[90%] mt-1 mb-3 max-w-sm mx-auto  z-10 relative  text-sm ">
          <p className="text-white text-sm">
            {t('alreadyHaveAccount')}{' '}
            <span
              onClick={() => navigate('/UserLogin')}
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#0285FF] to-[#1EEF32] font-medium cursor-pointer"
            >
              {t('loginButton')}
            </span>
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => handleSignUp(formData)}
            disabled={!emailVerified}
            className={`z-10 cursor-pointer w-full max-w-64 font-semibold rounded-xl py-2 
            text-white flex items-center justify-center
            ${
              emailVerified
                ? "bg-gradient-to-r from-[#0285FF] to-[#1EEF32]"
                : "bg-gray-600 cursor-not-allowed opacity-60"
            }`}
          >
            {emailVerified ? t('signUpButton') : t('verifyEmailFirst')}
          </button>
        </div>

        <div className="flex justify-center">
          <div className="gap-3 flex items-center justify-center z-10">
            <img src="/assets/WebApp/Rectangle 3.svg" />
            <p className="text-xs text-white">{t('orSignUpWith')}</p>
            <img src="/assets/WebApp/Rectangle 4.svg" />
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-3">
          <div
            className="z-10 cursor-pointer grid content-center bg-gradient-to-r from-[#282828] border border-white/40 rounded-lg via-[#191919] to-[#070707] w-10 h-10 flex justify-center items-center"
            onClick={handleGoogleLogin}
          >
            <img src="/assets/WebApp/Google.svg" alt="Login with Google" />
          </div>
          <div className="z-10 cursor-pointer grid content-center bg-gradient-to-r from-[#282828] border border-white/40 rounded-lg via-[#191919] to-[#070707] w-10 h-10 flex justify-center items-center">
            <a href="https://t.me/SKLRM_bot" target="_blank" rel="noopener noreferrer">
              <img src="/assets/WebApp/Telegram.svg" alt="Telegram Bot" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-[100%] flex justify-between absolute bottom-[0%] ">
        <img className="w-3/12" src="/assets/WebApp/trophy.svg"></img>
        <img className="w-[18%]" src="/assets/WebApp/game-control.svg"></img>
      </div>
    </div>
  );
}
