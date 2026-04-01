import React, { useState } from "react";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Layout/Header";
import toast,{Toaster} from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";

import { SET_TOKEN, setUserEmail } from "../../../../store";
import { SERVER_URL } from "../../../../config";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function SKill_Login() {
  const { t } = useTranslation('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (params) => {
    if (!email || !password) {
      toast.error(t('toasters.enterDetails'));
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${SERVER_URL}/api/telegam/login`, {
        email: email,
        password: password,
      });

      if(response.data.message==="There is No User Registered with This Email"){
        toast.error(t('toasters.noUser'))
        setLoading(false)
        return ;
      }

      if (response.data.status === "success") {
        const user = response.data.user;
        dispatch(setUserEmail(user));
        dispatch(SET_TOKEN(response.data.token));
        toast.success(t('toasters.welcome'), {
          style: {
            borderRadius: "3px",
            fontSize: "14px",
            fontWeight: "700",
            backgroundColor: "#16a34a",
            border: "1px solid #0abf3095",
            color: "#fff",
          },
        });
        
        setLoading(false)
        navigate("/ChallengeMap_7Days");
      } else if(response.data.status === "Bot_User"){
        toast.error(t('toasters.createPassword'), {
          style: {
            borderRadius: "3px",
            fontSize: "14px",
            fontWeight: "700",
            backgroundColor: "#B22222",
            border: "1px solid #B22222",
            color: "#fff",
          },
        });
        setTimeout(()=>{
          navigate("/ForgotPasswordWeb")
        },3000)
      } else if(response.data.status==="Wrong_Password") {
        toast.error(t('toasters.wrongPassword'), {
          style: {
            borderRadius: "3px",
            fontSize: "14px",
            fontWeight: "700",
            backgroundColor: "#B22222",
            border: "1px solid #B22222",
            color: "#fff",
          },
        });
      } else {
        toast.error(t('toasters.invalidUser'), {
          style: {
            borderRadius: "3px",
            fontSize: "14px",
            fontWeight: "700",
            backgroundColor: "#B22222",
            border: "1px solid #B22222",
            color: "#fff",
          },
        });
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error during login:", error);
    }
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
        handleSignUp(data)
      } catch (err) {
        console.error("Signup with Google failed", err);
        toast.error(t('toasters.googleSignupError'));
      }
    },
    onError: (error) => {
      toast.error(t('toasters.googleLoginFailed'));
    },
  });

  const handleSignUp=async(data)=>{
    try {
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
      console.error("Error during Google signup:", error);
    }
  }

  return (
    <div className="bg-black min-h-screen overflow-hidden relative ">
      <Header />
      <div className="flex flex-col lg:flex-row justify-center items-center pt-2 gap-2 mt-3 lg:mt-0">
        <p className="lg:w-[20%] text-center rounded-full border border-white px-3 py-2 font-poppins bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent inline text-sm">
          {t('welcomeTitle')}
        </p>
        <div className=" translate-y-5 ">
          <img
            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
            className="h-32 mx-auto"
            alt="Robot"
          />
        </div>
        <p className="lg:w-[20%] text-center rounded-full border border-white px-3 py-2 mt-5 lg:mt-0 font-poppins bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent inline text-sm">
          {t('loginSubtitle')}
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-">
        <p className="text-center text-white font-poppins font-semibold text-3xl">
          {t('welcomeBack')}
        </p>
        <p className="text-center text-white font-poppins mt-1 text-xs">
          {t('missedYou')}
        </p>
      </div>
      <div className="flex flex-col gap-5 px-3 lg:px-0 mt-5">
        <div className="w-[90%] mx-auto">
          <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-2">
            <p className="z-10 text-white font-poppins text-sm ">{t('username')}</p>
            <div className="z-10 border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
              <img src="/assets/WebApp/Name.svg"></img>
              <input
                type="email"
                className="placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-auto">
          <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-2">
            <div className="z-10  flex flex-col gap-2">
              <p className="z-10 text-white font-poppins text-sm ">{t('password')}</p>
              <div className="z-10 border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
                <img src="/assets/WebApp/Key.svg"></img>
                <input
                  placeholder={t('passwordPlaceholder')}
                  type={showPassword ? "text" : "password"}
                  className="placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="z-10 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="z-10 text-white text-sm "
                  />
                </button>
              </div>
            </div>

            <div className="mt-1 flex justify-between z-10 relative text-sm ">
              <Link to="/UserSignup" className="bg-clip-text text-transparent bg-gradient-to-r from-[#0285FF] to-[#1EEF32] cursor-pointer font-medium">
                {t('newUser')}
              </Link>
              <button onClick={() => navigate("/ForgotPasswordWeb")} className="bg-clip-text text-transparent bg-gradient-to-r from-[#0285FF] to-[#1EEF32] cursor-pointer font-medium">
                {t('forgotPassword')}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-5 ">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="z-10 cursor-pointer w-full max-w-64 font-semibold rounded-xl py-1.5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-white flex items-center justify-center text-lg"
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin className="text-white" />
            ) : (
              t('loginButton')
            )}
          </button>
        </div>
        <div className="flex justify-center">
          <div className="gap-3 flex items-center justify-centerz-10 ">
            <img src="/assets/WebApp/Rectangle 3.svg"></img>
            <p className="text-xs text-white">{t('orContinueWith')}</p>
            <img src="/assets/WebApp/Rectangle 4.svg"></img>
          </div>
        </div>
        <div className="flex justify-center gap-3 mb-3">
          <div
            className="z-10 cursor-pointer grid content-center bg-gradient-to-r from-[#282828] border border-white/40 rounded-lg via-[#191919] to-[#070707] w-10 h-10 flex justify-center items-center"
            onClick={handleGoogleLogin}
          >
            <img src="/assets/WebApp/Google.svg" alt="Login with Google" />
          </div>
          <div className="z-10 cursor-pointer grid content-center bg-gradient-to-r from-[#282828] border border-white/40 rounded-lg via-[#191919] to-[#070707] px-2 py-1">
            <a href="https://t.me/SKLRM_bot" target="_blank" rel="noopener noreferrer">
              <img src="/assets/WebApp/Telegram.svg" alt="Telegram Bot" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-[100%] flex justify-between absolute bottom-[0%] ">
        <img className="w-3/12" src="/assets/WebApp/trophy.svg"></img>
        <img
          className="w-[18%] translate-y-7 "
          src="/assets/WebApp/game-control.svg"
        ></img>
      </div>
    </div>
  );
}
