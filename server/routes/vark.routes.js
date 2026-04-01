const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware");
const { getVarkCspQuestions, submitVarkAssessment ,insertVarkQuestion, varkCspRoadmap, getUserAIPath} = require("../controller/vark.controller");



router.get('/:type/questions', authMiddleware, getVarkCspQuestions);


router.post("/submit",authMiddleware, submitVarkAssessment);
router.get("/get-varkcsp-roadmap",authMiddleware,varkCspRoadmap);
router.get("/get-UserAIPath",authMiddleware,getUserAIPath)
router.post('/insertQuestions', insertVarkQuestion);




module.exports = router;


