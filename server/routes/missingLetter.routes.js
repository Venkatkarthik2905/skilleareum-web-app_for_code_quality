const express = require("express");
const router = express.Router();
const missingLetterController = require("../controller/missingLetter.controller");
const authMiddleware = require("../middleware");

router.get("/",authMiddleware,missingLetterController.getUnplayedQuestions);
router.get("/userlife",authMiddleware,missingLetterController.getUserLife);
router.post("/",authMiddleware,missingLetterController.markQuestionAsPlayed);


module.exports = router;
