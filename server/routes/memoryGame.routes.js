const express = require("express");
const router = express.Router();
const MemeoryGameController = require("../controller/memoryGame.controller");
const authMiddleware = require("../middleware");

router.get("/",authMiddleware,MemeoryGameController.getUnplayedQuestions);
router.get("/userlife",MemeoryGameController.getUserLife);
router.post("/",authMiddleware,MemeoryGameController.markQuestionAsPlayed);


module.exports = router;
