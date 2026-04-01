const express = require("express");
const router = express.Router();
const AiVaultController = require("../controller/aiVault.controller");
const authMiddleware = require("../middleware");


router.get("/",authMiddleware,AiVaultController.getTodayFacts);
router.get("/getYesterdayFacts",authMiddleware,AiVaultController.getYesterdayFacts);
router.post("/claimReward",authMiddleware,AiVaultController.claimReward);
router.post("/incrementVisitCount",authMiddleware,AiVaultController.incrementVisitCount);


module.exports = router;
