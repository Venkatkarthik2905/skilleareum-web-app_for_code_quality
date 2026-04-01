const express = require("express");
const router = express.Router();
const JumbleWordController = require("../controller/jumbleWord.controller");
const authMiddleware = require("../middleware");

router.get("/",authMiddleware,JumbleWordController.getUnplayedQuestions);
router.get("/userlife",JumbleWordController.getUserLife);
router.post("/",authMiddleware,JumbleWordController.markQuestionAsPlayed);
router.get("/getgameslife",JumbleWordController.getgameslife);


module.exports = router;
