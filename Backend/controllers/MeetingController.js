const Meeting = require("../models/MeetingModel");
const crypto = require("node:crypto");

function generateFromUUID() {
  const clean = crypto.randomUUID().replace(/-/g, "").toUpperCase();
  return `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6, 9)}`;
}

function validateRoomId(roomId) {
  const regex = /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/i;
  return regex.test(roomId);
}

async function CreateMeeting(req, res) {
  try {
    const roomIds = await Meeting.distinct("roomId");

    let roomId;
    do {
      roomId = generateFromUUID();
    } while (roomIds.includes(roomId));

    const newMeeting = new Meeting({
      roomId,
      title: "newRoom",
      hostId: req.userId,
    });

    const createMeetingResult = await newMeeting.save();

    if (!createMeetingResult) {
      return res.status(400).json({
        success: false,
        message: "Unable to create meeting, try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "meeting created successfully",
      roomId: createMeetingResult.roomId,
      createdAt: createMeetingResult.createdAt,
    });
  } catch (error) {
    console.error("CreateMeeting error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create meeting, try again.",
    });
  }
}

async function ValidateMeetCode(req, res) {
  try {
    const normalizedRoomId = req.params.roomId.toUpperCase();

    if (!validateRoomId(normalizedRoomId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room Id format.",
      });
    }

    const meeting = await Meeting.findOne({ roomId: normalizedRoomId }).lean();

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting does not exist.",
      });
    }

    return res.status(200).json({
      success: true,
      roomId: meeting.roomId,
      message: "Meeting found",
    });
  } catch (error) {
    console.error("ValidateMeetCode error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to validate meeting code.",
    });
  }
}

module.exports = { CreateMeeting, ValidateMeetCode };
