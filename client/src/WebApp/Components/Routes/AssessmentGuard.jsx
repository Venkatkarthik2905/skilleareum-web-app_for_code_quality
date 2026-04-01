import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

/**
 * AssessmentGuard
 * Enforces the post-login redirection flow:
 * 1. If any assessment (VARK, CSP, AI) is incomplete -> redirect to /user-guidance (except when already in guidance/assessment flow).
 * 2. Enforce strict order: VARK -> CSP -> AI.
 * 3. If all complete -> Allow access to dashboard, or redirect from assessments/guidance to /ChallengeMap_7Days.
 */
const AssessmentGuard = () => {
  const user = useSelector((state) => state.user_email);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      // If not logged in, let the standard auth logic handle it or redirect to login
      // navigate("/UserLogin");
      return;
    }

    const {
      vark_completed,
      cps_completed,
      ai_completed,
    } = user;
    console.log("user",user);

    const isAllCompleted = !!(vark_completed && cps_completed && ai_completed);
    const currentPath = location.pathname;

    // List of assessment-related paths
    const assessmentPaths = [
      "/user-guidance",
      "/vark",
      "/vark-start",
      "/csp",
      "/csp-start",
      "/ai",
      "/ai-start",
      "/assessment-intro"
    ];

    const isAtAssessmentPath = assessmentPaths.includes(currentPath) || currentPath.startsWith("/res/");

    if (!isAllCompleted) {
      // If NOT completed everything, and trying to access dashboard/main app
      if (!isAtAssessmentPath) {
        navigate("/user-guidance");
        return;
      }

      // Enforce strict order within assessment paths
      if (!vark_completed) {
        if (currentPath === "/csp" || currentPath === "/csp-start" || currentPath === "/ai" || currentPath === "/ai-start") {
          navigate("/vark-start");
        }
      } else if (!cps_completed) {
        if (currentPath === "/ai" || currentPath === "/ai-start") {
          navigate("/csp-start");
        }
      } else if (!ai_completed) {
         // VARK and CSP are done, but AI is not. 
         // If they try to go back to VARK/CSP, it's technically allowed but usually they should proceed to AI.
         // Strict order usually means "don't skip ahead".
      }
    } else {
      // If ALL completed, and trying to access assessment paths, redirect to dashboard
      if (isAtAssessmentPath) {
        navigate("/ChallengeMap_7Days");
      }
    }
  }, [user, location.pathname, navigate]);

  return <Outlet />;
};

export default AssessmentGuard;

