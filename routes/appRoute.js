const express = require("express");
const appController = require("../controller/appController");
const { auth } = require("../middleware/auth");
const router = express.Router();
router.post("/", auth, appController.addApp);

router.get("/", appController.listApp);
router.get("/user", auth, appController.listAppByUser);
router.put("/:id/:goalId", auth, appController.updateApp);
router.put("/update/:id/:goalId", auth, appController.updateApp2);
router.get("/:id", auth, appController.listAppById);
router.delete("/:id", auth, appController.deleteApp);
module.exports = router;
