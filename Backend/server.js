const express = require("express");
require("dotenv").config();
const cors = require("cors");
const createJWT = require("../utils/createJWT");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/user");
const {
  validateRoomId,
  findRoom,
  createmeeting,
} = require("./utils/roomFunctions");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.post("/createmeeting", (req, res) => {
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
});
app.post("/meeting/:roomId", (req, res) => {
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

app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Mongoose automatically validates, trims, checks uniqueness, and hashes password
    const user = await User.create({ name, email, password });

    const token = createJWT(
      {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN,
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    // 1. Catch Mongoose validation errors (missing fields, short password, bad email)
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)[0].message;
      return res.status(400).json({
        success: false,
        message,
      });
    }

    // 2. Catch duplicate email error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    console.log(error);
    res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
});

app.post("auth/login", (req, res) => {});

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

startServer();
