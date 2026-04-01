const express = require("express");
const router = express.Router();
const EmojiController = require("../controller/emoji.controller");
const authMiddleware = require("../middleware");


router.get("/",authMiddleware,EmojiController.getEmojiGames);

router.post("/",authMiddleware,EmojiController.submitEmojiGame);


module.exports = router;
