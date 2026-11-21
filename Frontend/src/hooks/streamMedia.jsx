import toast from "react-hot-toast";

async function toggleCamera(
  cameraEnabled,
  setCameraEnabled,
  setCameraBusy,
  setCameraStatus,
  streamRef,
  mountedRef,
) {
  if (cameraEnabled) {
    streamRef.current?.getVideoTracks().forEach((track) => {
      track.stop();
      streamRef.current.removeTrack(track);
    });
    setCameraEnabled(false);
    setCameraStatus("Camera off");
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    toast.error("Camera access is not available in this browser.");
    return;
  }

  setCameraBusy(true);
  try {
    const deviceStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });
    if (!mountedRef.current) {
      deviceStream.getTracks().forEach((track) => track.stop());
      return;
    }

    const stream = streamRef.current || new MediaStream();
    deviceStream.getVideoTracks().forEach((track) => stream.addTrack(track));
    streamRef.current = stream;
    setCameraEnabled(true);
    setCameraStatus("Camera ready");
  } catch {
    toast.error(
      "Could not access your camera. Check your browser permissions.",
    );
  } finally {
    if (mountedRef.current) setCameraBusy(false);
  }
}

async function toggleMic(
  micEnabled,
  setMicEnabled,
  setMicBusy,
  streamRef,
  mountedRef,
) {
  if (micEnabled) {
    streamRef.current?.getAudioTracks().forEach((track) => {
      track.stop();
      streamRef.current.removeTrack(track);
    });
    setMicEnabled(false);
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    toast.error("Microphone access is not available in this browser.");
    return;
  }

  setMicBusy(true);
  try {
    const deviceStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    if (!mountedRef.current) {
      deviceStream.getTracks().forEach((track) => track.stop());
      return;
    }

    const stream = streamRef.current || new MediaStream();
    deviceStream.getAudioTracks().forEach((track) => stream.addTrack(track));
    streamRef.current = stream;
    setMicEnabled(true);
  } catch {
    toast.error(
      "Could not access your microphone. Check your browser permissions.",
    );
  } finally {
    if (mountedRef.current) setMicBusy(false);
  }
}

export { toggleCamera, toggleMic };
