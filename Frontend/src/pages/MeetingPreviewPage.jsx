import { useEffect, useRef, useState } from "react";
import Button from "../components/Button.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import mediaErrorMessage from "../utils/mediaErrorMessage.js";

function DeviceIcon({ kind }) {
  if (kind === "camera") {
    return (
      <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
        <rect
          height="13"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
          width="13"
          x="3"
          y="5.5"
        />
        <path
          d="m16 10 5-3v10l-5-3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <rect
        height="12"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.8"
        width="8"
        x="8"
        y="3"
      />
      <path
        d="M5 11a7 7 0 0 0 14 0m-7 7v3m-4 0h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function DeviceButton({ active, disabled, kind, onClick }) {
  const label = kind === "camera" ? "Camera" : "Microphone";
  const action = active ? "Turn off" : "Turn on";

  return (
    <button
      aria-pressed={active}
      className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-60 ${
        active
          ? "bg-brand text-white hover:bg-brand-dark"
          : "bg-white text-ink ring-1 ring-slate-200 hover:bg-slate-50"
      }`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <DeviceIcon kind={kind} />
      {action} {label.toLowerCase()}
    </button>
  );
}

export default function MeetingPreviewPage({ meetingCode, onHome }) {
  const [cameraStream, setCameraStream] = useState(null);
  const [microphoneStream, setMicrophoneStream] = useState(null);
  const [pendingDevice, setPendingDevice] = useState("");
  const [deviceError, setDeviceError] = useState("");
  const [joinMessage, setJoinMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }
    return () => cameraStream?.getTracks().forEach((track) => track.stop());
  }, [cameraStream]);

  useEffect(
    () => () => microphoneStream?.getTracks().forEach((track) => track.stop()),
    [microphoneStream],
  );

  async function toggleDevice(device) {
    const activeStream = device === "camera" ? cameraStream : microphoneStream;
    const setStream = device === "camera" ? setCameraStream : setMicrophoneStream;

    setDeviceError("");
    if (activeStream) {
      setStream(null);
      return;
    }

    if (!window.navigator.mediaDevices?.getUserMedia) {
      setDeviceError(`Your browser does not support ${device} preview.`);
      return;
    }

    setPendingDevice(device);
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia(
        device === "camera"
          ? { audio: false, video: true }
          : { audio: true, video: false },
      );
      setStream(stream);
    } catch (error) {
      setDeviceError(mediaErrorMessage(error, device));
    } finally {
      setPendingDevice("");
    }
  }

  async function copyText(text, successMessage) {
    try {
      await window.navigator.clipboard.writeText(text);
      setShareMessage(successMessage);
    } catch {
      setShareMessage("Copy failed. Select the meeting code to copy it.");
    }
  }

  async function shareMeeting() {
    const inviteUrl = window.location.href;
    const shareData = {
      title: "WeMeet invitation",
      text: `Join my WeMeet call with code ${meetingCode}.`,
      url: inviteUrl,
    };

    if (window.navigator.share) {
      try {
        await window.navigator.share(shareData);
        setShareMessage("Meeting invitation shared.");
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
      }
    }

    await copyText(
      `${shareData.text}\n${inviteUrl}`,
      "Meeting invite link copied.",
    );
  }

  function joinMeeting() {
    setJoinMessage(
      "Live meeting connections aren’t available until the video backend is connected.",
    );
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f7f8f3]">
      <SiteHeader onHome={onHome} showHomeButton={false} signup />
      <main className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-[minmax(0,1.25fr)_minmax(290px,0.75fr)] gap-5 px-8 py-5 max-[800px]:grid-cols-1 max-[800px]:gap-4 max-sm:px-5 max-sm:py-3">
        <section className="flex min-h-0 flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[1.4px] text-brand">
                PREVIEW YOUR SETUP
              </span>
              <h1 className="mb-0 mt-1 font-[Manrope,ui-sans-serif,system-ui] text-2xl font-bold tracking-tight text-ink">
                Ready when you are
              </h1>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-semibold text-brand-dark">
              Preview only
            </span>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-[#172329] shadow-[0_16px_45px_rgba(23,42,50,0.16)]">
            {cameraStream ? (
              <video
                autoPlay
                className="size-full object-cover"
                muted
                playsInline
                ref={videoRef}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_50%_35%,rgba(59,129,106,0.45),transparent_55%),#172329] px-6 text-center">
                <span className="mb-3 grid size-18 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl font-bold text-white">
                  You
                </span>
                <p className="mb-1 text-sm font-semibold text-white">
                  Your camera preview will appear here
                </p>
                <p className="mb-0 text-[11px] text-white/65">
                  Turn on your camera when you’re ready.
                </p>
              </div>
            )}
            <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-lg bg-black/45 px-3 py-2 text-[10px] text-white backdrop-blur">
              <span>You</span>
              <span className="flex items-center gap-2">
                <span
                  className={`size-1.5 rounded-full ${
                    microphoneStream ? "bg-emerald-400" : "bg-slate-400"
                  }`}
                />
                Microphone {microphoneStream ? "on" : "off"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DeviceButton
              active={Boolean(cameraStream)}
              disabled={Boolean(pendingDevice)}
              kind="camera"
              onClick={() => toggleDevice("camera")}
            />
            <DeviceButton
              active={Boolean(microphoneStream)}
              disabled={Boolean(pendingDevice)}
              kind="microphone"
              onClick={() => toggleDevice("microphone")}
            />
            <Button
              className="min-h-11 px-4 text-xs"
              onClick={joinMeeting}
            >
              Join meeting
            </Button>
            <Button
              className="min-h-11 px-4 text-xs"
              onClick={onHome}
              variant="danger"
            >
              End meeting
            </Button>
          </div>
          <p className="mb-0 text-[9px] text-slate-500">
            Camera and microphone stay on this device in preview.
          </p>
          {joinMessage && (
            <p aria-live="polite" className="mb-0 text-xs text-slate-600" role="status">
              {joinMessage}
            </p>
          )}
          {deviceError && (
            <p aria-live="polite" className="mb-0 text-xs text-red-700" role="alert">
              {deviceError}
            </p>
          )}
        </section>

        <aside className="flex min-h-0 flex-col justify-center gap-3">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <span className="text-[9px] font-bold uppercase tracking-[1.4px] text-brand">
              YOUR MEETING
            </span>
            <h2 className="mb-2 mt-2 font-[Manrope,ui-sans-serif,system-ui] text-xl font-bold tracking-tight text-ink">
              Share the invite
            </h2>
            <p className="mb-4 text-xs leading-relaxed text-muted">
              Send this code to the people you want to meet with.
            </p>
            <div className="flex items-center justify-between gap-3 rounded-xl bg-[#f4f7f1] px-4 py-3">
              <code className="font-mono text-lg font-bold tracking-[0.15em] text-ink">
                {meetingCode}
              </code>
              <button
                className="text-[10px] font-bold text-brand underline decoration-brand/40 underline-offset-4 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                onClick={() =>
                  copyText(meetingCode, "Meeting code copied.")
                }
                type="button"
              >
                Copy code
              </button>
            </div>
            <Button
              className="mt-3 w-full"
              onClick={shareMeeting}
              type="button"
              variant="dark"
            >
              Share invite
            </Button>
            {shareMessage && (
              <p aria-live="polite" className="mb-0 mt-2 text-[10px] text-brand-dark" role="status">
                {shareMessage}
              </p>
            )}
          </section>

        </aside>
      </main>
    </div>
  );
}
