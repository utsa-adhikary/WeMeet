const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    leftAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false },
);

const meetingSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Sunday catch-up",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // isActive: {
    //   type: Boolean,
    //   default: true,
    //   index: true,
    // },
    // participants: {
    //   type: [participantSchema],
    //   default: [],
    // },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    // endedAt: {
    //   type: Date,
    //   default: null,
    // },
  },
  {
    timestamps: true,
  },
);

meetingSchema.index({ hostId: 1, isActive: 1 });

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
