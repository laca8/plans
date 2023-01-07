const express = require("express");
const appController = require("../controller/activitiesController");
const { auth } = require("../middleware/auth");
const router = express.Router();
router.post("/", appController.addActivities);
module.exports = router;
