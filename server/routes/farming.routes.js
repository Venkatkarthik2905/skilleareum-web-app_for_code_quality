const express = require("express");
const router = express.Router();
const FarmingController = require("../controller/farmingController");
const authMiddleware = require("../middleware");

router.post("/start", authMiddleware, FarmingController.startFarming);
router.post("/claim", authMiddleware, FarmingController.claimSkillPoints);
router.post("/booster", authMiddleware, FarmingController.applyBooster);
router.post(
  "/upgrade-burn",
  authMiddleware,
  FarmingController.applyUpgradeBurn
);
router.get(
  "/getUserEarnings",
  authMiddleware,
  FarmingController.getUserEarnings
);
router.get(
  "/getFarmingStatus",
  authMiddleware,
  FarmingController.getFarmingStatus
);
router.get(
  "/getRandomQuestion",
  // authMiddleware,
  FarmingController.getRandomQuestion
);
router.get(
  "/getBoostExpiration",
  authMiddleware,
  FarmingController.getBoostExpiration
);

module.exports = router;
