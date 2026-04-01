const express = require("express");
const router = express.Router();

const {
  getAIMythQuestions,
  submitMythAnswers,
  getAIFailureCases,
  submitFailureAnswers,
  getAIToolArenaCases,
  submitToolArenaAnswers,
} = require("../controller/aiActivity.controller");
const authMiddleware = require("../middleware");

router.get("/ai-myth/questions", authMiddleware, getAIMythQuestions);
router.post("/ai-myth/submit", authMiddleware, submitMythAnswers);
router.get("/ai-failure-case/questions", authMiddleware, getAIFailureCases);
router.post("/ai-failure-case/submit", authMiddleware, submitFailureAnswers);
router.get("/ai-tool-arena-case/questions", authMiddleware, getAIToolArenaCases);
router.post("/ai-tool-arena-case/submit", authMiddleware, submitToolArenaAnswers);



module.exports = router;