function validateRoomId(roomId) {
  const regex = /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/i;
  return regex.test(roomId);
}

export { validateRoomId };
