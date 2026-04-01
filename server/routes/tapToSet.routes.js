const express = require("express");
const router = express.Router();
const tapToSetController = require("../controller/tapToSet.controller");

router.get("/", tapToSetController.getWord);
router.get("/sendFinalReminders", tapToSetController.sendFinalReminders);
router.get("/sendMidwayReminders", tapToSetController.sendMidwayReminders);
router.get("/expireFrozenRewards", tapToSetController.expireFrozenRewards);
router.get("/addSpinsForInactiveUsers", tapToSetController.addSpinsForInactiveUsers);
router.get("/addSpinsForActiveUsers", tapToSetController.addSpinsForActiveUsers);
router.post("/markMessageAsRead", tapToSetController.markMessageAsRead);
router.post("/", tapToSetController.addPoint);

module.exports = router;
