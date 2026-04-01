const express = require("express");
const router = express.Router();
const AiSpaceController = require("../controller/aiSpace.controller");
const authMiddleware = require("../middleware");

router.post("/card-click",authMiddleware,AiSpaceController.handleCardClick)
router.post("/claim",authMiddleware,AiSpaceController.claimClickReward)
router.post("/mission",authMiddleware,AiSpaceController.claimAiMission)
router.get("/",authMiddleware,AiSpaceController.cardDetails)
router.get("/getAiMission",authMiddleware,AiSpaceController.getAiMission)
router.get("/cron-test",AiSpaceController.AIspaceCronTest)

module.exports = router;
