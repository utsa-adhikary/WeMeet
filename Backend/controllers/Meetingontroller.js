const {
  validateRoomId,
  findRoom,
  createmeeting,
} = require("../utils/roomFunctions");

function CreateMeeting(req, res) {
  let createMeetingResult = createmeeting();
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
}

function ValidateMeetCode(req, res) {
  const roomId = req.params.roomId;
  if (!validateRoomId(roomId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid room Id format.",
    });
  } else if (findRoom(roomId)) {
    return res.status(200).json({
      success: true,
      roomId,
      message: "Meeting found",
    });
  }

  return res.status(400).json({
    success: false,
    message: "Meeting does not exists.",
  });
}

module.exports = { CreateMeeting, ValidateMeetCode };
