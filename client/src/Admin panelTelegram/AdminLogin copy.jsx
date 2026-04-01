import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../config";
import { setAdminDetails } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);

  if (admin != "") {
    window.location.href = "/AdminDashboard";
  }
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlepassword = () => {
    setVisible(!visible);
  };

  const handleLogin = async () => {
    if (email && password) {
      const response = await axios.post(`${SERVER_URL}/api/admin_login`, {
        email: email,
        password: password,
      });
      if (response.data.status === "success") {
        const user = response.data.user;
        dispatch(setAdminDetails(user));
        toast.success("Login successful!",
          {
            style: {
              borderRadius: '3px',
              fontSize: '14px',
              fontWeight: '700',
              backgroundColor:'#16a34a',
              border: '1px solid #0abf3095',
              color: '#fff',
            },
          }
        );
        navigate("/AdminDashboard");
      } else {
        toast.error(response.data.message,
          {
              style: {
                borderRadius: '3px',
                fontSize: '14px',
                fontWeight: '700',
                backgroundColor:'#B22222',
                border: '1px solid #B22222',
                color: '#fff',
              },
            }
        );
      }
    } else {
      toast.error("Please provide valid details",
        {
              style: {
                borderRadius: '3px',
                fontSize: '14px',
                fontWeight: '700',
                backgroundColor:'#B22222',
                border: '1px solid #B22222',
                color: '#fff',
              },
            }
      );
    }
  };

  return (
    <div>
      <div
        className="font-san min-h-screen bg-black relative bg-cover"
        style={{ backgroundImage: "url('assets/7.png')" }}
      >
        <Toaster />

        <div className='md:w-[90%] w-[95%] mx-auto pb-5 pt-20 md:pt-10'>
         <p className='font-bold text-white xl:text-2xl text-xl text-center'>The World's First-Ever AI Powered Socio-EduFi DeX Community Incentivizing Learners and Validators</p>
                        </div>

     <div className="lg:w-[80%] w-[90%] mx-auto text-white font-san flex md:flex-row flex-col  justify-center items-center md:gap-20 gap-10 mt-7">

          <div className="md:w-1/2 ">
            <div className=" flex flex-col justify-center items-center ">
              <div className=" flex justify-center">
                <img src="assets/LOGINnsignup.png" className=" " />
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-[80%] mx-auto flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col justify-center ">
              <div>
                <p className="font-bold xl:text-2xl text-xl">Hello Admin!</p>
              </div>

              <div className="">
                <div className="mt-10">
                  <div className="">
                    <label className="text-white/75 font-semibold">
                      Email or User Name
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleChangeEmail}
                      className="w-full mt-2 focus:outline-none px-3 py-1 bg-transparent border-b border-[#BDBDBD]/75 "
                      placeholder="Enter Email or User Name"
                    />
                  </div>
                  <div className=" mt-5 relative">
                    <label className="text-white/75 font-semibold">
                      Password
                    </label>
                    <input
                      type={visible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full mt-2 outline-none px-3 py-1 bg-transparent border-b border-[#BDBDBD]/75 "
                      placeholder="Enter Password"
                    />
                    <button
                      onClick={handlepassword}
                      className="absolute top-4 right-0 flex justify-center items-center h-[100%] w-[50px] "
                    >
                      {visible ? (
                        <FontAwesomeIcon icon={faEye} size="sm"
                        className="text-gray-400" />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} size="sm"
                        className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className=" mt-5 flex justify-end items-center">
                  <button
                    className="bg-gradient-to-r from-[#17C969] hover:from-[#005DBB] to-[#005DBB] hover:to-[#17C969] px-7 py-1.5 font-bold rounded-full"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>

                {/* <div className=' flex justify-center mt-10'>
                       <p className=' text-white/70'>Need Help?<a href='/Signup'><span className='text-[#0285FF] font-bold'>Contact</span></a></p>
                        </div> */}

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
