const express = require("express");
const router = express.Router();
const AiLearningController = require("../controller/aiLearning.controller");
const authMiddleware = require("../middleware");

router.post("/video/complete",authMiddleware,AiLearningController.completeVideo)
router.post("/assesmemt/complete",authMiddleware,AiLearningController.completeQuest)
router.get("/",authMiddleware,AiLearningController.getUnlockedVideo)
router.get("/assessment/:day",authMiddleware,AiLearningController.getAssessmentsByDay)

module.exports = router;
