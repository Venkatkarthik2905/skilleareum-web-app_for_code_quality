const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bp = require("body-parser");
const multer = require("multer");
const bcrypt = require("bcrypt");
const controller = require("./controller");
const telegramController = require("./telegram-controller");
const adminController = require("./admin_controller");
const { executeQuery } = require("./Db");
const farmingRoutes = require("./routes/farming.routes");
const leaderBoardRoutes = require("./routes/leaderBoard.routes");
const aiSpaceRoutes = require("./routes/aiSpace.routes");
const aiVaultRoutes = require("./routes/aiVault.routes");
const tapToSetRoutes = require("./routes/tapToSet.routes");
const authMiddleware = require("./middleware");
const https = require("https");
const jumbleWordRoutes = require("./routes/jumbleWord.routes");
const missingLetterRoutes = require("./routes/missingLetter.routes");
const memoryGameRoutes = require("./routes/memoryGame.routes");
const perfectMatchRoutes = require("./routes/perfectMatch.routes");
const aiLearningRoutes = require("./routes/aiLearning.routes");
const emojiRoutes = require("./routes/emoji.routes");
const blogRoutes = require("./routes/aiBlog.routes");
const varkRoutes = require("./routes/vark.routes");
const aiActivityRoutes = require("./routes/aiActivity.routes");
const merchantController = require("./merchant_controller");
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 3005;

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // 3 requests
  statusCode: 429,
  message: {
    status: "failed",
    message: "Too many OTP requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});


app.use(bp.json());
require("dotenv").config();

console.log("SITE URL",process.env.SITE_URL);
const allowedOrigins = [
  process.env.SITE_URL,
  'https://web.skilleareum.ai',
  'https://staging.skilleareum.ai'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.skilleareum.ai')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);
// app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/Courses"); // Specify the directory where files should be uploaded
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Use the original file name for the uploaded file
  },
});
const upload = multer({ storage });

app.use(bp.urlencoded({ extended: true }));

const generateRandomTicketId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticketId = "";
  for (let i = 0; i < 6; i++) {
    ticketId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ticketId;
};

const Ticketstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ticketId = generateRandomTicketId();
    const ticketFolder = path.join(__dirname, "Ticket");
    fs.mkdirSync(ticketFolder, { recursive: true });
    req.ticketId = ticketId; // Attach the generated ticket ID to the request object
    cb(null, ticketFolder);
  },
  filename: function (req, file, cb) {
    cb(null, `TICKET-${req.ticketId}${path.extname(file.originalname)}`);
  },
});

const TicketUpload = multer({
  storage: Ticketstorage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: File type not supported");
    }
  },
}).single("file");
app.use("/api/farming", farmingRoutes);

app.use("/api/aispace", aiSpaceRoutes);
app.use("/api/leaderboard", leaderBoardRoutes);
app.use("/api/aivault", aiVaultRoutes);
app.use("/api/taptoset", tapToSetRoutes);
app.use("/api/memorygame", memoryGameRoutes);
app.use("/api/jumbleWord", jumbleWordRoutes);
app.use("/api/missingLetter", missingLetterRoutes);
app.use("/api/perfectMatch", perfectMatchRoutes);
app.use("/api/ailearning", aiLearningRoutes);
app.use("/api/emoji", emojiRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/ai-assessment", varkRoutes);
app.use("/api/ai-activity",aiActivityRoutes );

app.post("/api/SignUpUser", (req, res) => controller.SignUpUser(req, res));
app.post("/api/GoogleEmail_Registercheck_User", (req, res) =>
  controller.GoogleEmail_Registercheck_User(req, res)
);
app.post("/api/SignUpGoogleUser", (req, res) =>
  controller.SignUpGoogleUser(req, res)
);

app.post("/api/userLogin", (req, res) => controller.userLogin(req, res));
app.post("/api/GitHubLogin", (req, res) => controller.GitHubLogin(req, res));
app.post("/api/SignUpGitHubUser", (req, res) =>
  controller.SignUpGitHubUser(req, res)
);
app.post("/api/GitHub_Registercheck_User", (req, res) =>
  controller.GitHub_Registercheck_User(req, res)
);
app.post("/api/LinkedInLogin", (req, res) =>
  controller.LinkedInLogin(req, res)
);
app.post("/api/SignUpWalletUser", (req, res) =>
  controller.SignUpWalletUser(req, res)
);
app.post("/api/userWalletLogin", (req, res) =>
  controller.userWalletLogin(req, res)
);
app.get("/api/get_user_profiles_data", (req, res) =>
  controller.get_user_profiles_data(req, res)
);
app.get("/api/addSpinsEvery8Hours", (req, res) =>
  controller.addSpinsEvery8Hours(req, res)
);
app.post("/api/update_user_profiles_data", (req, res) =>
  controller.update_user_profiles_data(req, res)
);
app.post("/api/getChatGPTResponse", (req, res) =>
  controller.getChatGPTResponse(req, res)
);
app.post("/api/getUserDetails", authMiddleware, (req, res) =>
  controller.getUserDetails(req, res)
);
app.post("/api/addCourse", upload.single("image"), (req, res) =>
  controller.addCourses(req, res)
);
app.get("/api/get_course_details", authMiddleware, (req, res) =>
  controller.get_course_details(req, res)
);
app.post("/api/trigger_email_verify", (req, res) =>
  controller.trigger_email_verify(req, res)
);
app.post("/api/verify_email", (req, res) => controller.verify_email(req, res));
app.post("/api/register_community_user", (req, res) =>
  controller.register_community_user(req, res)
);

app.get("/api/allDailyChallenges", (req, res) =>
  controller.allDailyChallenges(req, res)
);
app.get("/api/user_daily_challenges", authMiddleware, (req, res) =>
  controller.user_daily_challenges(req, res)
);
app.post("/api/users_action", (req, res) => controller.users_action(req, res));
app.get("/api/check_user_action_status", (req, res) =>
  controller.check_user_action_status(req, res)
);
app.get("/api/get_last_access", authMiddleware, (req, res) =>
  controller.get_last_access(req, res)
);
app.post("/api/send_message_to_slack", (req, res) =>
  controller.sendMessageToSlack(req, res)
);

//Ticket

app.post("/api/add-tickets", TicketUpload, async (req, res) => {
  controller.AddTicket(req, res);
});
app.post("/api/get-user-tickets", (req, res) =>
  controller.UserTickets(req, res)
);
app.get("/api/get-tickets", (req, res) => controller.All_Tickets(req, res));
app.get("/api/get-image-path", (req, res) =>
  controller.get_image_path(req, res)
);
app.post("/api/admin/update-tickets", (req, res) =>
  adminController.updateTicket(req, res)
);
app.post("/api/admin/makePayments", (req, res) =>
  adminController.makePayment(req, res)
);

app.get("/api/get_users_details", (req, res) => controller.get_users_details(req, res));
app.post("/api/checkUser", (req, res) => controller.checkUser(req, res));
app.post("/api/resetPassword", (req, res) =>
  controller.resetPassword(req, res)
);
app.post("/api/sendOTP", (req, res) => controller.sendOTP(req, res));
app.post("/api/contactUs", (req, res) => telegramController.contactUs(req, res));
app.post("/api/subscribe", (req, res) => telegramController.subscribe(req, res));
// app.post("/api/video_duration", (req, res) => controller.video_duration(req, res));
app.post("/api/User_verifyOTP", (req, res) =>
  controller.User_verifyOTP(req, res)
);
app.post("/api/User_UpdatePassword", (req, res) =>
  controller.User_UpdatePassword(req, res)
);
app.post("/api/User_UpdatePassword", (req, res) =>
  controller.User_UpdatePassword(req, res)
);
app.get("/api/get_referral_count", (req, res) =>
  controller.get_referral_count(req, res)
);
app.get("/api/getReferralInformation", authMiddleware, (req, res) =>
  controller.getReferralInformation(req, res)
);
app.post("/api/submit_answers", authMiddleware, (req, res) =>
  controller.submit_answers(req, res)
);
app.get("/api/get_questions",authMiddleware, (req, res) => controller.get_questions(req, res));
app.post("/api/video_duration", (req, res) =>
  controller.video_duration(req, res)
);
app.post("/api/user_result", (req, res) => controller.user_result(req, res));
app.post("/api/get_last_assessment", authMiddleware, (req, res) =>
  controller.get_last_assessment(req, res)
);
app.post("/api/subscripe_email", (req, res) =>
  controller.subscripe_email(req, res)
);
app.post("/api/getrewards", authMiddleware, (req, res) =>
  controller.getrewards(req, res)
);
app.post("/api/updateRewards", authMiddleware, (req, res) =>
  controller.updateRewards(req, res)
);
app.post("/api/update_transaction_data", authMiddleware, (req, res) =>
  controller.update_transaction_data(req, res)
);

//Payment Functionalities
app.post("/api/updatePaymentStatus", authMiddleware, (req, res) =>
  controller.updatePaymentStatus(req, res)
);
app.get("/api/updateTokenPrice", (req, res) =>
  controller.updateTokenPrice(req, res)
);
app.post("/api/update_payment_data", authMiddleware, (req, res) =>
  controller.update_payment_data(req, res)
);
app.post("/api/transaction_details", (req, res) =>
  controller.transaction_details(req, res)
);
app.get("/api/transaction_specificActions", (req, res) =>
  controller.transaction_specificActions(req, res)
);

//Admin Functionalities
app.post("/api/admin_login", (req, res) =>
  adminController.admin_login(req, res)
);
app.post("/api/dailychallenges", (req, res) =>
  adminController.dailychallenges(req, res)
);
app.get("/api/admin/user_stats", (req, res) =>
  adminController.user_stats(req, res)
);
app.get("/api/admin/transaction_history", (req, res) =>
  adminController.transaction_history(req, res)
);

app.get("/api/users/count", (req, res) =>
  adminController.usercount(req, res)
);

app.get("/api/tokens/total", (req, res) =>
  adminController.tokentotal(req, res)
);

app.get("/api/coins/total", (req, res) =>
  adminController.cointotal(req, res)
);

app.get("/api/alluser_data", (req, res) => {
  adminController.alluser_data(req, res);
});

app.get("/api/payments", (req, res) => {
  adminController.getAllPayments(req, res);
});


app.get("/api/getAIFacts", (req, res) => {
  adminController.getAIFacts(req, res);
});
app.put("/api/updateAIFact", (req, res) => {
  adminController.updateAIFact(req, res);
});
app.delete("/api/deleteAIFact", (req, res) => {
  adminController.deleteAIFact(req, res);
});
app.get("/api/getAiLearning", (req, res) => {
  adminController.getAiLearning(req, res);
});
app.post("/api/createAiLearning", (req, res) => {
  adminController.createAiLearning(req, res);
});
app.put("/api/updateAiLearning", (req, res) => {
  adminController.updateAiLearning(req, res);
});
app.delete("/api/deleteAiLearning", (req, res) => {
  adminController.deleteAiLearning(req, res);
});
app.post("/api/addAIFact", (req, res) => {
  adminController.addAIFact(req, res);
});

app.get("/api/air_drop_streak", (req, res) =>
  controller.AirDropStreak(req, res)
);
app.get("/api/isexist", (req, res) => controller.isUserExist(req, res));
app.post("/api/addUserName", (req, res) => controller.addTwitterName(req, res));
app.get("/api/getSkillCount", (req, res) =>
  controller.getSkillCountToday(req, res)
);
app.get("/api/getTotalUserData", (req, res) =>
  controller.getTotalUserData(req, res)
);
app.get("/api/getReferralCount", (req, res) =>
  controller.getReferralCount(req, res)
);
app.post("/api/telegramAndTwitterBonus", (req, res) =>
  controller.telegramAndTwitterBonus(req, res)
);

app.get("/api/getAllNotification", (req, res) =>
  controller.getAllNotification(req, res)
);
app.get("/api/getMissionStatus", (req, res) =>
  telegramController.getMissionStatus(req, res)
);
app.get("/api/getUserDailyProgress",authMiddleware, (req, res) =>
  controller.getUserDailyProgress(req, res)
);
app.get("/api/getUserCurrentDay",authMiddleware, (req, res) =>
  controller.getUserCurrentDay(req, res)
);
app.get("/api/getUserOverallProgress", authMiddleware, (req, res) =>
  controller.getUserOverallProgress(req, res)
);
app.get("/api/getAllAssessmentDaysController",authMiddleware, (req, res) =>
  telegramController.getAllAssessmentDaysController(req, res)
);
app.get("/api/getTwitterPost", (req, res) =>
  controller.getTwitterPost(req, res)
);
app.get("/api/getAllData", (req, res) =>
  telegramController.getAllData(req, res)
);
app.get("/api/checkSponsorExists", (req, res) =>
  telegramController.checkSponsorExists(req, res)
);
app.post("/api/telegam/login", (req, res) =>
  telegramController.userLogin(req, res)
);
app.get("/api/telegam/checkUserMembership", (req, res) =>
  telegramController.checkUserMembership(req, res)
);
app.post("/api/telegram/signup", (req, res) =>
  telegramController.SignUpUser(req, res)
);
app.post("/api/app/signup", (req, res) =>
  telegramController.SignUpAppUser(req, res)
);

app.get("/api/telegram/addEmail", (req, res) =>
  telegramController.addEmail(req, res)
);
app.get("/api/telegram/isExist", (req, res) =>
  telegramController.isUserExist(req, res)
);
app.get("/api/getReferralCode", (req, res) =>
  telegramController.getReferralCode(req, res)
);
app.get("/api/telegram/getAllNotificationCount", (req, res) =>
  telegramController.getAllNotificationCount(req, res)
);

app.get("/api/check_twitter_reward", (req, res) =>
  telegramController.check_twitter_reward(req, res)
);
app.get("/api/check_assessment_reward", (req, res) =>
  telegramController.check_assessment_reward(req, res)
);
app.get("/api/user_data", (req, res) => {
  telegramController.user_data(req, res);
});
app.post("/api/markAsReaded", (req, res) => controller.markAsReaded(req, res));
app.get("/api/isFollowedX", (req, res) => controller.isFollowedX(req, res));

app.post("/api/check_user_assessment", (req, res) =>
  telegramController.check_user_assessment(req, res)
);

app.post("/api/update-user-avatar", (req, res) =>
  telegramController.update_user_avatar(req, res)
);
app.get("/api/fetch-user-data", (req, res) =>
  telegramController.fetch_user_data(req, res)
);
app.post("/api/update-user-xid", (req, res) =>
  telegramController.update_user_xid(req, res)
);
app.post("/api/telegram/sendVeficationEmail", (req, res) =>
  telegramController.sendVeficationEmail(req, res)
);
app.post("/api/telegram/sendotp", (req, res) =>
  telegramController.sendOTP(req, res)
);
app.post("/api/telegram/verify-otp", (req, res) =>
  telegramController.verifyOTP(req, res)
);
app.get("/api/telegram/verify_email", (req, res) =>
  telegramController.verify_email(req, res)
);
app.get("/api/get-next-assessment-day", (req, res) =>
  telegramController.getNextDayAssessment(req, res)
);
app.post("/api/telegram/saveEmail", (req, res) =>
  telegramController.saveEmail(req, res)
);
app.get("/api/admin/getSubscriptionData", (req, res) =>
  adminController.getSubscriptionData(req, res)
);
app.get("/api/markReadedNotifications", (req, res) =>
  controller.markReadedNotifications(req, res)
);

app.get("/api/user-spins", async (req, res) =>
  telegramController.user_spin(req, res)
);

app.get("/api/wheel-spin/:userId", async (req, res) =>
  telegramController.wheel_spin(req, res)
);
app.post("/api/telegram/updateWallet", (req,res) => {
  telegramController.updateWallet(req,res)
});
app.get('/api/getJumbledWords', (req, res) =>
  adminController.getJumbledWords(req, res)
);

app.put('/api/updateJumbledWord', (req, res) =>
  adminController.updateJumbledWord(req, res)
);

app.delete('/api/deleteJumbledWord', (req, res) =>
  adminController.deleteJumbledWord(req, res)
);

app.post('/api/addJumbledWord', (req, res) =>
  adminController.addJumbledWord(req, res)
);
app.get('/api/getMissingWords', (req, res) =>
  adminController.getMissingWords(req, res)
);


app.put('/api/updateMissingWord', (req, res) =>
  adminController.updateMissingWord(req, res)
);

app.delete('/api/deleteMissingWord', (req, res) =>
  adminController.deleteMissingWord(req, res)
);


app.post('/api/addMissingWord', (req, res) =>
  adminController.addMissingWord(req, res)
);

app.get('/api/getPerfectMatch', (req, res) =>
  adminController.getPerfectMatch(req, res)
);


app.post('/api/updatePerfectMatch', (req, res) =>
  adminController.updatePerfectMatch(req, res)
);


app.post('/api/deletePerfectMatch', (req, res) =>
  adminController.deletePerfectMatch(req, res)
);


app.post('/api/addPerfectMatch', (req, res) =>
  adminController.addPerfectMatch(req, res)
);

app.post('/api/checkSponsorExists', (req, res) =>
  controller.checkSponsorExists(req, res)
);

app.get('/api/getWalletAddress', (req, res) =>
  controller.getWalletAddress(req, res)
);

app.post('/api/storeSubscription', (req, res) =>
  controller.storeSubscription(req, res)
);

app.post('/api/storeWithdraw', (req, res) =>
  controller.storeWithdraw(req, res)
);

app.get('/api/getWalletAddressByID', (req, res) =>
  controller.getWalletAddressByID(req, res)
);

app.get('/api/getFreezedAmount', (req, res) =>
  controller.getFreezedAmount(req, res)
);

app.get('/api/getReferrerAddress', (req, res) =>
  controller.getReferrerAddress(req, res)
);

app.get('/api/getUserWalletAddress', (req, res) =>
  controller.getUserWalletAddress(req, res)
);

app.get('/api/updateFreezedAmountStatus', (req, res) =>
  controller.updateFreezedAmountStatus(req, res)
);

app.get('/api/getPlatform', (req, res) =>
  controller.getPlatform(req, res)
);

app.get('/api/CheckAddress', (req, res) =>
  controller.CheckAddress(req, res)
);

app.post('/api/unfreeze', (req, res) =>
  controller.Unfreez(req, res)
);

app.get('/api/getClaimHistory', (req, res) =>
  controller.getClaimHistory(req, res)
);

app.put('/api/updatesubscriptionstatus', (req, res) =>
  adminController.updatesubscriptionstatus(req, res)
);
app.post("/api/SignUpWebGoogleUser", (req, res) =>
  telegramController.SignUpWebGoogleUser(req, res)
);
app.post("/api/reset-password", (req, res) =>
  telegramController.resetPassword(req, res)
);
app.post("/api/sendResetPasswordLink", (req, res) =>
  telegramController.sendResetPasswordLink(req, res)
);
app.post("/api/sendResetPasswordLink/v1", (req, res) =>
  telegramController.sendResetPasswordLink(req, res)
);
app.post("/api/fixDuplicateReferralCodes", (req, res) =>
  telegramController.fixDuplicateReferralCodes(req, res)
);

// merchant api's
app.post("/api/merchant/adminLogin", (req, res) =>
  merchantController.merchant_login(req, res)
);

app.post("/api/merchant/send-otp",otpLimiter, (req, res) =>
  merchantController.sendMerchantOtp(req, res)
);
app.post("/api/merchant/verify-otp", (req, res) =>
  merchantController.verifyMerchantOtp(req, res)
);
app.post("/api/merchant/reset-password", (req, res) =>
  merchantController.resetMerchantPassword(req, res)
);

app.get("/api/merchant/get-user-day", (req, res) =>
  merchantController.getUserDay(req, res)
);

app.get("/api/merchant/get-token-balance", (req, res) =>
  merchantController.tokenBalance(req, res)
);

app.get("/api/merchant/get-recent-activity", (req, res) =>
  merchantController.recentActivities(req, res)
);

app.get("/api/merchant/get-user-data", (req, res) =>
  merchantController.getUserData(req, res)
);

app.get("/api/merchant/get-subscription-history", (req, res) =>
  merchantController.subscription_history(req, res)
);

app.get("/api/merchant/get-sequence-data", (req, res) =>
  merchantController.sequenceData(req, res)
);


app.listen(PORT, () => {

  console.log("Server is running on port", PORT);
});
