import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toggleCamera, toggleMic } from "../hooks/streamMedia";
import toast from "react-hot-toast";

export default function MeetingPreviewPage() {
  const { roomId } = useParams();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mountedRef = useRef(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const mediaReady =
    typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia);
  const [cameraBusy, setCameraBusy] = useState(false);
  const [micBusy, setMicBusy] = useState(false);
  const [cameraStatus, setCameraStatus] = useState(() =>
    typeof navigator !== "undefined" && !navigator.mediaDevices?.getUserMedia
      ? "Camera unavailable"
      : "Camera off",
  );
  const [name, setName] = useState("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (cameraEnabled && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraEnabled]);

  async function copyText(text, successMessage) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success(successMessage);
    }
  }

  function joinMeeting() {
    setJoining(true);
    window.setTimeout(() => {
      setJoining(false);
      toast.success(
        name.trim()
          ? `${name.trim()}, you’re ready to join`
          : "You’re ready to join",
      );
    }, 700);
  }

  const meetingLink =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}/meeting/${roomId}`;
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "YOU";

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_30%,rgba(246,227,201,0.58),transparent_34%),radial-gradient(ellipse_at_88%_18%,rgba(228,239,222,0.82),transparent_38%)]"
      />

      <header className="relative z-10 mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          aria-label="WeMeet home"
          className="text-[22px] font-bold tracking-[-0.06em] text-ink"
          to="/"
        >
          WeMeet
        </Link>
        <Link
          className="inline-flex min-h-10 items-center justify-center rounded-lg px-3 text-xs font-bold text-slate-600 transition hover:bg-white/70 hover:text-brand"
          to="/"
        >
          Leave preview
        </Link>
      </header>

      <main className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl items-center gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)] lg:gap-12 lg:py-12">
        <section aria-labelledby="meeting-preview-title" className="min-w-0">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                <span className="size-1.5 rounded-full bg-[#58a987]" />
                Ready when you are
              </span>
              <h1
                className="mb-0 font-[Manrope,ui-sans-serif,system-ui] text-3xl font-semibold tracking-[-0.06em] text-ink sm:text-4xl"
                id="meeting-preview-title"
              >
                Check your setup
              </h1>
            </div>
            <span className="rounded-full border border-[#dfe6dc] bg-white/70 px-3 py-1.5 text-[10px] font-bold text-muted">
              {cameraStatus}
            </span>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white bg-[#173b32] p-2 shadow-[0_24px_70px_rgba(40,70,53,0.16)] sm:p-3">
            <div className="relative isolate aspect-16/10 overflow-hidden rounded-[21px] bg-[#dce4d5]">
              {cameraEnabled ? (
                <video
                  autoPlay
                  muted
                  playsInline
                  ref={videoRef}
                  className="absolute inset-0 size-full -scale-x-100 object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#dce9dc,#c7d6c5)]">
                  <span className="grid size-24 place-items-center rounded-full border-[5px] border-white/70 bg-[#f2d4ba] text-2xl font-bold text-[#865440] shadow-[0_12px_30px_rgba(52,75,61,0.12)]">
                    {initials}
                  </span>
                </div>
              )}

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 sm:p-4">
                <span className="rounded-full bg-[#173b32]/75 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                  {name.trim() || "Your preview"}
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-white/80 text-ink shadow-sm backdrop-blur">
                  <span
                    aria-hidden="true"
                    className="material-icons"
                    style={{ fontSize: "16px" }}
                  >
                    more_horiz
                  </span>
                </span>
              </div>

              <div className="absolute right-3 bottom-3 left-3 flex justify-center gap-2 sm:bottom-4">
                <button
                  aria-label={
                    cameraEnabled ? "Turn camera off" : "Turn camera on"
                  }
                  aria-pressed={!cameraEnabled}
                  className={`grid size-12 place-items-center rounded-full shadow-lg transition hover:-translate-y-0.5 ${
                    cameraEnabled
                      ? "bg-white text-ink"
                      : "bg-[#e56d61] text-white"
                  } disabled:cursor-wait disabled:opacity-60`}
                  disabled={!mediaReady || cameraBusy}
                  onClick={() =>
                    toggleCamera(
                      cameraEnabled,
                      setCameraEnabled,
                      setCameraBusy,
                      setCameraStatus,
                      streamRef,
                      mountedRef,
                    )
                  }
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className="material-icons"
                    style={{ fontSize: "20px" }}
                  >
                    {cameraEnabled ? "videocam" : "videocam_off"}
                  </span>
                </button>
                <button
                  aria-label={
                    micEnabled ? "Mute microphone" : "Unmute microphone"
                  }
                  aria-pressed={!micEnabled}
                  className={`grid size-12 place-items-center rounded-full shadow-lg transition hover:-translate-y-0.5 ${
                    micEnabled ? "bg-white text-ink" : "bg-[#e56d61] text-white"
                  } disabled:cursor-wait disabled:opacity-60`}
                  disabled={!mediaReady || micBusy}
                  onClick={() =>
                    toggleMic(
                      micEnabled,
                      setMicEnabled,
                      setMicBusy,
                      streamRef,
                      mountedRef,
                    )
                  }
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className="material-icons"
                    style={{ fontSize: "20px" }}
                  >
                    {micEnabled ? "mic" : "mic_off"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside
          aria-label="Meeting join details"
          className="w-full rounded-[28px] border border-[#e5e9df] bg-white/90 p-5 shadow-[0_18px_55px_rgba(40,70,53,0.09)] sm:p-7"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
            Sunday catch-up
          </span>
          <h2 className="mb-2 mt-2 text-2xl font-bold tracking-[-0.04em] text-ink">
            Join the call
          </h2>
          <p className="mb-6 text-sm leading-6 text-muted">
            Make sure your camera and microphone are just how you like them.
          </p>

          <label
            className="mb-2 block text-xs font-bold text-slate-700"
            htmlFor="preview-name"
          >
            Your name
          </label>
          <input
            autoComplete="name"
            className="page-input mb-5 text-sm"
            id="preview-name"
            name="name"
            placeholder="Enter your name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button
            className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(21,123,104,0.18)] transition hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70"
            disabled={joining}
            onClick={joinMeeting}
            type="button"
          >
            {joining ? "Joining..." : "Join now"}
            {!joining && (
              <span
                aria-hidden="true"
                className="material-icons"
                style={{ fontSize: "16px" }}
              >
                arrow_forward
              </span>
            )}
          </button>

          <div className="my-6 h-px bg-[#edf0e8]" />

          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
              Share this meeting
            </span>
            <span className="grid size-7 place-items-center rounded-full bg-[#edf4ea] text-brand">
              <span
                aria-hidden="true"
                className="material-icons"
                style={{ fontSize: "14px" }}
              >
                ios_share
              </span>
            </span>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <div className="min-w-0 flex-1 rounded-xl border border-[#e5e9df] bg-[#fbfcf9] px-3 py-3">
              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Meeting code
              </span>
              <span className="mt-1 block truncate font-mono text-sm font-bold tracking-[0.08em] text-ink">
                {roomId}
              </span>
            </div>
            <button
              aria-label="Copy meeting code"
              className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#e5e9df] bg-white text-brand transition hover:border-brand/30 hover:bg-[#edf4ea]"
              onClick={() => copyText(roomId || "", "Meeting code copied")}
              type="button"
            >
              <span
                aria-hidden="true"
                className="material-icons"
                style={{ fontSize: "18px" }}
              >
                content_copy
              </span>
            </button>
          </div>

          <button
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#e5e9df] bg-white text-xs font-bold text-ink transition hover:border-brand/30 hover:bg-[#f7faf5]"
            onClick={() => copyText(meetingLink, "Meeting link copied")}
            type="button"
          >
            <span
              aria-hidden="true"
              className="material-icons"
              style={{ fontSize: "16px" }}
            >
              link
            </span>
            Copy meeting link
          </button>
        </aside>
      </main>
    </div>
  );
}
