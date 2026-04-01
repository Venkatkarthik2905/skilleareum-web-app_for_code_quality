const express = require("express");
const router = express.Router();
const leaderBoardController = require("../controller/leaderBoard.controller");

router.get("/", leaderBoardController.getLeaderboard);

module.exports = router;
