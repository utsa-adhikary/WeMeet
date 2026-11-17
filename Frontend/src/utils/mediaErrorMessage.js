export default function mediaErrorMessage(error, device) {
  if (error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError") {
    return `Permission to use your ${device} was denied. Allow access in your browser settings and try again.`;
  }
  if (error?.name === "NotFoundError" || error?.name === "DevicesNotFoundError") {
    return `No ${device} was found on this device.`;
  }
  if (error?.name === "NotReadableError" || error?.name === "TrackStartError") {
    return `Your ${device} could not start. It may be in use by another app.`;
  }
  return `Could not start your ${device} preview. ${error?.message || "Check your device settings and try again."}`;
}
