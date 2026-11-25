const express = require("express");
const MeetingController = require("../controllers/Meetingontroller");
const { requireAuth } = require("../middlewares/Authorization");

const router = express.Router();

router.post("/create", requireAuth, MeetingController.CreateMeeting);
router.post("/id/:roomId", requireAuth, MeetingController.ValidateMeetCode);

module.exports = router;
