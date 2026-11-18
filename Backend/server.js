const express = require("express");
require("dotenv").config();
const { validateRoomId, findRoom } = require("./utils/roomFunctions");

const PORT = process.env.PORT;

const app = express();

app.post("/createmeeting", (req, res) => {});
app.post("/meeting:roomId", (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`app running on ${PORT} ...`);
});
