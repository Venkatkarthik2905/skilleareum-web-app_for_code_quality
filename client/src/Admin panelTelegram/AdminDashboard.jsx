import React, { useState } from "react";
import ReferralDashboard from "./ReferralDashboard";
import Payment from "./Payment";
import User from "./User";
import Dashboard from "./Dashboard";
import AdminHeader from "./AdminHeader";
import Passbook from "./Passbook";
import AIfactVault from "./AIfactVault";
import JumbledWords from "./JumbledWords";
import MissingWords from "./MissingWords";
import PerfectMatch from "./PerfectMatch";
import Subscription from "./Subscription";
import Subscriptionaccess from "./Subscriptionaccess";
import AIlearning from "./AIlearning";
import ContactUs from "./Contactus";

import { setAdminDetails } from "../store";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";


export default function AdminDashboard() {
  const admin = useSelector((state) => state.admin);
  if (admin == '') {
    window.location.href = '/adminlogin';
  }
  console.log(admin)
  const [isOpenNavbar, setOpenNavbar] = useState(false);
  const handleOpenNavbar = () => {
    setOpenNavbar(!isOpenNavbar);
  };

  const [activeTab, setActiveTab] = useState("file");
  const [active, setActive] = useState("div1");

  const handleTabClick = (tab) => {
    setActiveTab(tab === activeTab ? null : tab);
    if (tab === "clock") {
      handleAnchorClick("div3");
    } else {
      switch (tab) {
        case "share":
          handleAnchorClick("div2");
          break;
        case "fire":
          handleAnchorClick("div4");
          break;
        case "bell":
          handleAnchorClick("div5");
          break;
        case "ref":
          handleAnchorClick("div6");
          break;
        case "fact":
          handleAnchorClick("div7");
          break;
        case "hash":
          handleAnchorClick("div8");
          break;

        case "jumble":
          handleAnchorClick("div9");
          break;

        case "missing":
          handleAnchorClick("div10");
          break;
        case "PerfectMatch":
          handleAnchorClick("div11");
          break;
        case "Subscription":
          handleAnchorClick("div12");
          break;
        case "Subscriptionaccess":
          handleAnchorClick("div13");
          break;
        case "AIlearning":
          handleAnchorClick("div14");
          break;
        case "ContactUs":
          handleAnchorClick("div15");
          break;
        default:
          handleAnchorClick("div1");
      }
    }
  };

  const handleAnchorClick = (tab) => {
    setActive(tab);
  };

  const TabButton = ({ label, tab }) => {
    return (
      <button
        className={`flex justify-center w-[80%] mx-auto rounded-xl py-2.5  ${tab === activeTab
            ? "bg-gradient-to-r from-[#3AB6FF] via-[#0085FF36]  to-[#3DBDF1] font-bold"
            : ""
          }`}
        onClick={() => handleTabClick(tab)}
      >
        <span className=" text-start ">{label}</span>
      </button>
    );
  };

  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(setAdminDetails(""));
    toast.success("Logged Successfully...Redirecting to Login Page", {
      style: {
        borderRadius: "3px",
        fontSize: "14px",
        fontWeight: "700",
        backgroundColor: "#16a34a",
        border: "1px solid #0abf3095",
        color: "#fff",
      },
    });
    setTimeout(() => {
      window.location.href = "/adminlogin";
    }, 500);
  };

  return (
    <div className="bg-[#080B1C] bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins">
      <div className="relative">
        <div className="z-0">
          <img src="../assets/Background_Web.png" className="w-full h-screen" />
        </div>
        <div className="w-full z-10 absolute top-0 px-3 py-5 min-h-screen">
          <AdminHeader activeTab={activeTab} />

          <div className="p-5 md:flex">
            <div className="hidden lg:block w-[20%]">
              <div className=" flex flex-col justify-between items-center gap-20">
                <div className="w-full">
                  <nav className="mt-5  ">
                    <div className="">
                      <TabButton label="Dashboard" tab="file" />
                      <TabButton label="Users" tab="clock" />
                      <TabButton label="Transactions" tab="bell" />
                      <TabButton label="AI Fact Vault" tab="fact" />
                      <TabButton label="Referrals" tab="ref" />
                      {/* <TabButton label="Passbook" tab="hash" /> */}
                      <TabButton label="Jumbled Words" tab="jumble" />
                      <TabButton label="Missing Words" tab="missing" />
                      <TabButton label="PerfectMatch" tab="PerfectMatch" />
                      <TabButton label="Subscription" tab="Subscription" />
                      <TabButton label="Subscription Access" tab="Subscriptionaccess" />
                      <TabButton label="AI Learning" tab="AIlearning" />
                      <TabButton label="Contact Us" tab="ContactUs" />

                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="block lg:hidden">
              <button onClick={handleOpenNavbar}>
                <svg
                  class="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h14M1 6h14M1 11h7"
                  />
                </svg>
              </button>
              {isOpenNavbar && (
                <nav
                  className="w-[80%] md:w-[50%] z-10 absolute border rounded-3xl bg-[#05295A] text-white grid content-around "
                  data-aos="fade-right"
                >
                  <div>
                    <div className="py-5">
                      <TabButton label="Dashboard" tab="file" />
                      <TabButton label="Users" tab="clock" />
                      <TabButton label="Transactions" tab="bell" />
                      <TabButton label="AI Fact Vault" tab="fact" />
                      <TabButton label="Referrals" tab="ref" />
                      {/* <TabButton label="Passbook" tab="hash" /> */}
                      <TabButton label="Jumbled Words" tab="jumble" />
                      <TabButton label="Missing Words" tab="missing" />
                      <TabButton label="PerfectMatch" tab="PerfectMatch" />
                      <TabButton label="Subscription" tab="Subscription" />
                      <TabButton label="Subscription Access" tab="Subscriptionaccess" />
                      <TabButton label="AI Learning" tab="AIlearning" />
                      <TabButton label="Contact Us" tab="ContactUs" />

                      <div />
                    </div>
                  </div>
                </nav>
              )}
            </div>

            <div
              id="div1"
              style={{ display: active === "div1" ? "block" : "none" }}
              className="lg:w-[75%] w-full mx-auto"
            >
              <Dashboard />
            </div>

            <div
              id="div3"
              style={{ display: active === "div3" ? "block" : "none" }}
              className="lg:w-[75%] w-full mx-auto"
            >
              <User />
            </div>

            <div
              id="div5"
              style={{ display: active === "div5" ? "block" : "none" }}
              className="lg:w-[75%] w-full mx-auto"
            >
              <Payment />
            </div>

            <div
              id="div7"
              style={{ display: active === "div7" ? "block" : "none" }}
              className="lg:w-[80%] w-full mx-auto"
            >
              <AIfactVault />
            </div>
            <div
              id="div6"
              style={{ display: active === "div6" ? "block" : "none" }}
              className="lg:w-[75%] w-full mx-auto"
            >
              <ReferralDashboard />
            </div>
            <div
              id="div8"
              style={{ display: active === "div8" ? "block" : "none" }}
              className="lg:w-[75%] w-full mx-auto"
            >
              <Passbook />
            </div>

            <div
              id="div9"
              style={{ display: active === "div9" ? "block" : "none" }}
              className="lg:w-[85%] w-full mx-auto"
            >
              <JumbledWords />
            </div>

            <div
              id="div10"
              style={{ display: active === "div10" ? "block" : "none" }}
              className="lg:w-[85%] w-full mx-auto"
            >
              <MissingWords />
            </div>
            <div
              id="div11"
              style={{ display: active === "div11" ? "block" : "none" }}
              className="lg:w-[85%] w-full mx-auto"
            >
              <PerfectMatch />
            </div>
            <div
              id="div12"
              style={{ display: active === "div12" ? "block" : "none" }}
              className="lg:w-[75%] w-full mx-auto"
            >
              <Subscription />
            </div>
            <div
              id="div13"
              style={{ display: active === "div13" ? "block" : "none" }}
              className="lg:w-[75%] w-full mx-auto"
            >
              <Subscriptionaccess/>
            </div>
            <div
              id="div14"
              style={{ display: active === "div14" ? "block" : "none" }}
              className="lg:w-[75%] w-full mx-auto"
            >
              <AIlearning/>
            </div>
            <div
              id="div15"
              style={{ display: active === "div15" ? "block" : "none" }}
              className="lg:w-[75%] w-full mx-auto"
            >
              <ContactUs/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
