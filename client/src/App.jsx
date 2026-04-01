import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./App.css";
import AssessmentGuard from "./WebApp/Components/Routes/AssessmentGuard";
import UserGuard from "./WebApp/Components/Routes/UserGuard";
import AdminGuard from "./WebApp/Components/Routes/AdminGuard";
import MerchantGuard from "./WebApp/Components/Routes/MerchantGuard";
// // import "@fortawesome/fontawesome-free/css/all.min.css";
import Landing from "./NewLanding/Landing/Landing";




//WebApp
const Home = React.lazy(() => import("./WebApp/Components/Pages/Home/Home"));
const User_Login = React.lazy(() => import("./WebApp/Components/Pages/Auth/SKill_Login"));
const User_Signup = React.lazy(() => import("./WebApp/Components/Pages/Auth/Signup"));
const Aboutus = React.lazy(() => import("./NewLanding/AboutUs/About_us"));
const Community = React.lazy(() => import("./NewLanding/Community/Community"));
const Contactus = React.lazy(() => import("./NewLanding/Contactus/Contact_us"));
const Whitepaper = React.lazy(() => import("./NewLanding/Whitepaper/White_paper"));
const Whitepaperpdf = React.lazy(() => import("./NewLanding/Whitepaper/Paperpdf"));


//Dashboard
const ChallengeMap_7Days = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/7DayPilot/ChallengeMap_7Days"));
const UserProfile = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/Profile/UserProfile"));
const Leaderboard = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/Profile/Leaderboard"));
const ChallengeMapWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/7DayPilot/ChallengeMapWeb"));
const TaskWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/7DayPilot/TaskWeb"));
const DailyBonusWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/CommonPages/DailyBonus/DailyBonusWeb"));
const DailyRewardWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/CommonPages/DailyBonus/DailyRewardWeb"));
const InvitescreenWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/CommonPages/InviteScreenWeb"));
const FarmingWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/Farming/FarmingWeb"));
const AIFarmingWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/Farming/AIFarmingWeb"));
const MyRewardsWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/CommonPages/MyRewardsWeb"));
const AIGameWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AIGames/AIGameWeb"));
const TaptoLearnWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AIGames/TaptoLearn/TaptoLearnWeb"));
const AILearningWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AILearning/AILearningWeb"));
const SpinWheelWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AIGames/SpinWheel/SpinWheelWeb"));
const DailyBlogsWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AIBlog/DailyBlogsWeb"));
const AIFactVaultWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AIFactVault/AIFactVaultWeb"));
const AIEmojiWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AIGames/AIEmoji/AIEmojiWeb"));
const AISkillQuestWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AISkillQuest/AISkillQuestWeb"));
const AiSpaceWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AISpace/AISpaceWeb"));
const AIExplorerbadgeWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/7DayPilot/AIExplorerbadgeWeb"));
const AccomplishedWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/7DayPilot/AccomplishedWeb"));
const EarnedWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/7DayPilot/EarnedWeb"));
const UnlockAIGenesisWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/7DayPilot/UnlockAIGenesisWeb"));
const ChallengePathWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/7DayPilot/ChallengePathWeb"));
const ChallengeMap_30Days = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/30DayPilot/ChallengeMap_30Days"));
const TaskListWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/30DayPilot/TaskListWeb"));
const UserDashboardWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/UserDashboardWeb"));
const ConfirmSubscribeWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/Components/Subscription/ConfirmSubscribeWeb"));
const PaymentConfirmWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/Components/Subscription/PaymentConfirmWeb"));
const SubPackWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/Components/Subscription/SubPackWeb"));
const SubscriptionWeb = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/Components/Subscription/SubscriptionWeb"));
const ForgotPasswordWeb = React.lazy(() => import("./WebApp/Components/Pages/Auth/ForgotPasswordWeb"));
const ResetPasswordWeb = React.lazy(() => import("./WebApp/Components/Pages/Auth/ResetPasswordWeb"));
const AdminDashboard = React.lazy(() => import("./Admin panelTelegram/AdminDashboard"));
const AdminLogin = React.lazy(() => import("./Admin panelTelegram/AdminLogin"));

         
//Merchant Dashboard
const MerchantLogin = React.lazy(() => import("./MerchantDashboard/Auth/MerchantLogin"));
const MerchantForgotPassword = React.lazy(() => import("./MerchantDashboard/Auth/MerchantForgotPassword"));
const MerchantDashboard = React.lazy(() => import("./MerchantDashboard/Dashboard"));
const UserPerformance = React.lazy(() => import("./MerchantDashboard/UserPerformance"));
const FinancialReports = React.lazy(() => import("./MerchantDashboard/FinancialReports"));
const ReportsAnalytics = React.lazy(() => import("./MerchantDashboard/ReportnAnalytics"));

// Admin Dashboard
const AdminDashboard2 = React.lazy(() => import("./AdminDashboard/Dashboard"));
const UserManagement = React.lazy(() => import("./AdminDashboard/UserManagement"));
const SubscriptionTracking = React.lazy(() => import("./AdminDashboard/Subscription/SubscriptionTracking"));
const Activity = React.lazy(() => import("./AdminDashboard/Activity"));
const Sponsor = React.lazy(() => import("./AdminDashboard/Sponsor"));

// User Dashboard
const ProfileInfo = React.lazy(() => import("./UserDashboard/ProfileInfo"));
const Dashboard = React.lazy(() => import("./UserDashboard/Dashboard"));
const Progress = React.lazy(() => import("./UserDashboard/Progress"));
const CurrentProgram = React.lazy(() => import("./UserDashboard/CurrentProgram"));
const ReferralInformation = React.lazy(() => import("./UserDashboard/ReferralInformation"));
const ReferralSubcription = React.lazy(() => import("./UserDashboard/ReferralSubcription"));
const SupportTicket = React.lazy(() => import("./UserDashboard/SupportTicket"));

//VARK
const VarkAssessment = React.lazy(() => import("./WebApp/Components/Pages/Assessments/Vark/VarkAssessment"));
const VarkJourneyStart = React.lazy(() => import("./WebApp/Components/Pages/Assessments/Vark/VarkJourneyStart"));
const Type1 = React.lazy(() => import("./WebApp/Components/Pages/Assessments/LearningArchetypes/Type1"));
const Type2 = React.lazy(() => import("./WebApp/Components/Pages/Assessments/LearningArchetypes/Type2"));
const Type3 = React.lazy(() => import("./WebApp/Components/Pages/Assessments/LearningArchetypes/Type3"));
const Type4 = React.lazy(() => import("./WebApp/Components/Pages/Assessments/LearningArchetypes/Type4"));
const AILearningRoadmap = React.lazy(() => import("./WebApp/Components/Pages/Assessments/LearningArchetypes/AILearningRoadmap"));
const Roadmap = React.lazy(() => import("./WebApp/Components/Pages/Assessments/LearningArchetypes/Roadmap"));
const AssessmentIntroPage = React.lazy(() => import("./WebApp/Components/Pages/Assessments/AssessmentIntroPage"));


//CSP
const CspAssessment = React.lazy(() => import("./WebApp/Components/Pages/Assessments/Csp/CspAssessment"));
const CspJourneyStart = React.lazy(() => import("./WebApp/Components/Pages/Assessments/Csp/CspJourneyStart"));

//AI
const AIJourneyStart = React.lazy(() => import("./WebApp/Components/Pages/Assessments/AIKnowledge/AIJourneyStart"));
const AIAssessment = React.lazy(() => import("./WebApp/Components/Pages/Assessments/AIKnowledge/AIAssessment"));

//USERGUIDANCE
const WebUserguidance = React.lazy(() => import("./WebApp/Components/Pages/UserGuidance/WebUserguidance"));

// New Activities
const AIMythBreakerRules = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AIMythBreaker/AIMythBreakerRules"));
const AIFailureFilesRules = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AIFailureFiles/AIFailureFilesRules"));
const AIToolArenaRules = React.lazy(() => import("./WebApp/Components/Pages/UserDashboard/DashboardPages/AIToolArena/AIToolArenaRules"));





function App() {

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer); // Cleanup timeout on unmount
  // }, []);

  // if (isLoading) {
  //   return <DataSpinners />;
  // }
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === '...') {
          return '';
        } else {
          return prevDots + '.';
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);


  const Loading = () => {
    const { t } = useTranslation('common');
    return (
      <div className='flex items-center justify-center h-screen bg-black/90'>
        <div>
          <div className='h-[8rem] w-[12.5rem]'>
            <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif' className='w-[75%] mx-auto' alt="loading mascot"></img>
          </div>
          <p className='text-center text-sky-300 mt-5'>
            {t('loading')} {dots}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
         <Suspense fallback={<Loading />}>
        <Routes>
         {/* Web App */}
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/UserLogin" element={<User_Login />} />
          <Route path="/UserSignup" element={<User_Signup />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/Whitepaper" element={<Whitepaper />} />
          <Route path="/Whitepaperpdf" element={<Whitepaperpdf />} />
         
          <Route path="/ForgotPasswordWeb" element={<ForgotPasswordWeb />} />
          <Route path="/reset-password" element={<ResetPasswordWeb />} />

          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          
           {/* Merchant dashboard */}
          <Route path="/merchant-login" element={<MerchantLogin />} />
          <Route path="/merchant-forgotpassword" element={<MerchantForgotPassword />} />

          <Route element={<UserGuard />}>
            <Route element={<AssessmentGuard />}>
              <Route path="/ChallengeMap_7Days" element={<ChallengeMap_7Days />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/Leaderboard" element={<Leaderboard />} />
              <Route path="/ChallengeMapWeb" element={<ChallengeMapWeb />} />
              <Route path="/TaskWeb" element={<TaskWeb />} />
              <Route path="/DailyBonusWeb" element={<DailyBonusWeb />} />
              <Route path="/DailyRewardWeb" element={<DailyRewardWeb />} />
              <Route path="/InvitescreenWeb" element={<InvitescreenWeb />} />
              <Route path="/FarmingWeb" element={<FarmingWeb />} />
              <Route path="/MyRewardsWeb" element={<MyRewardsWeb />} />
              <Route path="/AIGameWeb" element={<AIGameWeb />} />
              {/* <Route path="/TaptoLearnWeb" element={<TaptoLearnWeb />} /> */}
              <Route path="/games/:gameType" element={<TaptoLearnWeb />} />
              <Route path="/AILearningWeb" element={<AILearningWeb />} />
              <Route path="/SpinWheelWeb" element={<SpinWheelWeb />} />
              <Route path="/DailyBlogsWeb/:day" element={<DailyBlogsWeb />} />
              <Route path="/AIFactVaultWeb" element={<AIFactVaultWeb />} />
              <Route path="/AIEmojiWeb" element={<AIEmojiWeb />} />
              <Route path="/AISkillQuestWeb" element={<AISkillQuestWeb />} />
              <Route path="/AiSpaceWeb" element={<AiSpaceWeb />} />
              <Route path="/AIExplorerbadgeWeb" element={<AIExplorerbadgeWeb />} />
              <Route path="/AccomplishedWeb" element={<AccomplishedWeb />} />
              <Route path="/EarnedWeb" element={<EarnedWeb />} />
              <Route path="/UnlockAIGenesisWeb" element={<UnlockAIGenesisWeb />} />
              <Route path="/ChallengePathWeb" element={<ChallengePathWeb />} />
              <Route path="/ChallengeMap_30Days" element={<ChallengeMap_30Days />} />
              <Route path="/TaskListWeb" element={<TaskListWeb />} />
              <Route path="/UserDashboardWeb" element={<UserDashboardWeb />} />
              <Route path="/AIFarmingWeb" element={<AIFarmingWeb />} />
              <Route path="/ConfirmSubscribeWeb" element={<ConfirmSubscribeWeb />} />
              <Route path="/SubPackWeb" element={<SubPackWeb />} />
              <Route path="/PaymentConfirmWeb" element={<PaymentConfirmWeb />} />
              <Route path="/SubscriptionWeb" element={<SubscriptionWeb />} />

              {/* User Dashboard */}
              <Route path="/profileInfo" element={<ProfileInfo />} />
              <Route path="/user-progress" element={<Progress />} />          
              <Route path="/user-dashboard" element={<Dashboard />} />
              <Route path="/currentProgram" element={<CurrentProgram />} />
              <Route path="/referralInformation" element={<ReferralInformation />} />
              <Route path="/referralSubcription" element={<ReferralSubcription />} />
              <Route path="/supportTicket" element={<SupportTicket />} />

              {/* New Activities */}
              <Route path="/ai-mythbreaker-rules" element={<AIMythBreakerRules />} />
              <Route path="/ai-failurefiles-rules" element={<AIFailureFilesRules />} />
              <Route path="/ai-toolarena-rules" element={<AIToolArenaRules />} />
            </Route>
          </Route>

          {/* Merchant dashboard */}
          <Route element={<MerchantGuard />}>
            <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
            <Route path="/user-performance" element={<UserPerformance />} />
            <Route path="/financial-report" element={<FinancialReports />} />
            <Route path="/report-analytics" element={<ReportsAnalytics />} />
          </Route>

          {/* Admin Dashboard */}
          <Route element={<AdminGuard />}>
            <Route path="/admin-dashboard" element={<AdminDashboard2 />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/subscription-tracking" element={<SubscriptionTracking />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/sponsor" element={<Sponsor />} />
          </Route>

          <Route path="/assessment-intro" element={<AssessmentIntroPage />} />
          
          {/* VARK */}
          <Route path="/vark" element={<VarkAssessment />} />
          <Route path="/vark-start" element={<VarkJourneyStart />} />
          <Route path="/res/seq-a" element={<Type1 />} />
          <Route path="/res/seq-d" element={<Type2 />} />
          <Route path="/res/seq-b" element={<Type3 />} />
          <Route path="/res/seq-c" element={<Type4 />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/ai-roadmap" element={<AILearningRoadmap />} />


          {/* CSP */}
          <Route path="/csp" element={<CspAssessment />} />
          <Route path="/csp-start" element={<CspJourneyStart />} />

          {/* AI */}
          <Route path="/ai" element={<AIAssessment />} />
          <Route path="/ai-start" element={<AIJourneyStart />} />
 
          {/* userguidance page */}
          <Route path="/user-guidance" element={<WebUserguidance />} />

          {/* New Activities */}
          <Route path="/ai-mythbreaker-rules" element={<AIMythBreakerRules />} />
          <Route path="/ai-failurefiles-rules" element={<AIFailureFilesRules />} />
          <Route path="/ai-toolarena-rules" element={<AIToolArenaRules />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
