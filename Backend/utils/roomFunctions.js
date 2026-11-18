const meetings = require("../data/roomId.json");
const crypto = require("crypto");

function generateFromUUID() {
  const clean = crypto.randomUUID().replace(/-/g, "").toUpperCase();
  return `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6, 9)}`;
}

function validateRoomId(roomId) {
  const regex = /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/i;

  if (!regex.test(roomId)) {
    return false;
  }
  return true;
}

function findRoom(roomId) {
  const rooms = JSON.parse(meetings);

  rooms.forEach((room) => {
    if (room.roomId === roomId) {
      return true;
    }
  });

  return false;
}

function createmeeting() {
  let roomId;
  do {
    roomId = generateFromUUID();
  } while (findRoom(roomId));
  {
    roomId = generateFromUUID();
  }

  
}

module.exports = { validateRoomId, findRoom };
