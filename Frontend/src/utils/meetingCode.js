const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const meetingCodePattern = /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/;

export function generateMeetingCode() {
  const randomBytes = new Uint8Array(16);
  const characters = [];

  while (characters.length < 9) {
    globalThis.crypto.getRandomValues(randomBytes);
    for (const byte of randomBytes) {
      if (byte < 252) {
        characters.push(alphabet[byte % alphabet.length]);
      }
      if (characters.length === 9) {
        break;
      }
    }
  }

  const code = characters.join("");
  return `${code.slice(0, 3)}-${code.slice(3, 6)}-${code.slice(6)}`;
}

export function formatMeetingCode(value) {
  const characters = value.replace(/[^a-z0-9]/gi, "").slice(0, 9).toUpperCase();
  return [
    characters.slice(0, 3),
    characters.slice(3, 6),
    characters.slice(6, 9),
  ]
    .filter(Boolean)
    .join("-");
}

export function isValidMeetingCode(value) {
  return meetingCodePattern.test(value.toUpperCase());
}
