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
import { useDispatch } from "react-redux";
import { setMerchantDetails } from "../../store";


export default function MerchantLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/merchant/adminLogin`,
        { email, password }
      );

      if (data.status === "failed") {
        toast.error(data.message || "Login failed");
        return;
      }

      if (data.status === "Wrong_Password") {
        toast.error("Wrong password");
        return;
      }

      if (data.status === "success") {
        dispatch(
          setMerchantDetails({
            name: data.user.name,
            email: data.user.email,
            token: data.token,
            role: data.user.role,
            id: data.user.id,
            merchantId: data.user.merchantId
          })
        );

        toast.success("Welcome to Skilleareum 😊");

        navigate("/merchant-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <div className="bg-black min-h-screen overflow-hidden relative ">
        {/* <Header /> */}
        <Toaster
          reverseOrder={false}
        />
        <div className="flex flex-col lg:flex-row justify-center items-center pt-2 gap-2 mt-3 lg:mt-0">
          <p className="lg:w-[20%] text-center rounded-full border border-white px-3 py-2 font-poppins bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent inline text-sm">
            Welcome To SKILLEAREUM.AI
          </p>
          <div className=" translate-y-5 ">
            <img
              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
              className="h-32 mx-auto"
              alt="Robot"
            />
          </div>
          <p className="lg:w-[20%] text-center rounded-full border border-white px-3 py-2 mt-5 lg:mt-0 font-poppins bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent inline text-sm">
            Login to Your Account
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-">
          <p className="text-center text-white font-poppins font-semibold text-3xl">
            Welcome Back!
          </p>
          <p className="text-center text-white font-poppins mt-1 text-xs">
            We missed you
          </p>
        </div>

        <div className="flex flex-col gap-5 px-3 lg:px-0 mt-5">
          <div className="w-[90%] mx-auto">
            <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-2">
              <p className="z-10 text-white font-poppins text-sm ">Username</p>
              <div className="z-10 border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
                <img src="/assets/WebApp/Name.svg" alt="Name icon" />
                <input
                  type="email"
                  className="placeholder:text-white/40 placeholder:text-sm px-3 text-white outline-none bg-transparent w-full"
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="w-[90%] mx-auto">
            <div className="z-10 w-full mx-auto max-w-sm flex flex-col gap-2">
              <div className="z-10  flex flex-col gap-2">
                <p className="z-10 text-white font-poppins text-sm ">Password</p>
                <div className="z-10 border-[0.2px] border-white/20 py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
                  <img src="/assets/WebApp/Key.svg" alt="Key icon" />
                  <input
                    placeholder="Enter Password"
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
                <button
                  onClick={() => navigate("/merchant-forgotpassword")}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-[#0285FF] to-[#1EEF32] cursor-pointer font-medium"
                >
                  Forgot Password
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
                "Login"
              )}
            </button>
          </div>


        </div>

        <div className="w-[100%] flex justify-between absolute bottom-[0%] ">
          <img className="w-3/12" src="/assets/WebApp/trophy.svg" alt="Trophy" />
          <img
            className="w-[18%] translate-y-7 "
            src="/assets/WebApp/game-control.svg"
            alt="Game control"
          />
        </div>
      </div>
    </div>
  );
}