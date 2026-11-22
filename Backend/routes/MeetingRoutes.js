const express = require("express");
const MeetingController = require("../controllers/Meetingontroller");

const router = express.Router();

router.post("/create", MeetingController.CreateMeeting);
router.post("/id/:roomId", MeetingController.ValidateMeetCode);

module.exports = router;
