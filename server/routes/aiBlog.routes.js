const express = require("express");
const router = express.Router();
const BlogController = require("../controller/aiBlog.controller");
const authMiddleware = require("../middleware");


router.get("/",authMiddleware,BlogController.getAiBlog);
router.get("/currentday",authMiddleware,BlogController.getCurrentAiBlogDay);

router.post("/",authMiddleware,BlogController.claimAiBlog);


module.exports = router;
