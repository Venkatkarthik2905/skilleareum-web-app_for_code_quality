const express = require("express");
const router = express.Router();
const perfectMatchController = require("../controller/perfectMatch.controller");
const authMiddleware = require("../middleware");

router.get("/",authMiddleware,perfectMatchController.getUnplayedQuestions);
router.get("/userlife",perfectMatchController.getUserLife);
router.post("/",authMiddleware,perfectMatchController.markQuestionAsPlayed);


module.exports = router;
