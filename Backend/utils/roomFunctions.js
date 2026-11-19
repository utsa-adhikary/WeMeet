const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const FILE_PATH = path.join(__dirname, "../data/roomId.json");

// Helper to always read the latest array of rooms from disk
function getRooms() {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }
  const fileData = fs.readFileSync(FILE_PATH, "utf8");
  return fileData ? JSON.parse(fileData) : [];
}

function generateFromUUID() {
  const clean = crypto.randomUUID().replace(/-/g, "").toUpperCase();
  return `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6, 9)}`;
}

function validateRoomId(roomId) {
  const regex = /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/i;
  return regex.test(roomId);
}

function findRoom(roomId) {
  const rooms = getRooms();
  // .some() properly returns true as soon as a match is found
  return rooms.some((room) => room.roomId === roomId);
}

function createmeeting() {
  let roomId;
  do {
    roomId = generateFromUUID();
  } while (findRoom(roomId));

  const newRoom = {
    roomId,
    createdAt: new Date(),
  };

  try {
    const rooms = getRooms();
    rooms.push(newRoom); // Add new room to the existing list

    fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
    fs.writeFileSync(FILE_PATH, JSON.stringify(rooms, null, 2), "utf8");

    return newRoom;
  } catch (error) {
    console.error("Error saving meeting:", error);
    return false;
  }
}

module.exports = { validateRoomId, findRoom, createmeeting };
