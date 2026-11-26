import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toggleCamera, toggleMic } from "../hooks/streamMedia";
import toast from "react-hot-toast";
import AuthContext from "../contexts/AuthContext.jsx";
import Header from "../components/Header.jsx";

const sampleParticipants = [
  { name: "Maya", initials: "M", background: "bg-[#2f3b3e]" },
  { name: "Jordan", initials: "J", background: "bg-[#2c3847]" },
  { name: "Alex", initials: "A", background: "bg-[#433631]" },
];

export default function MeetingPage() {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);
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
  const [joining, setJoining] = useState(false);
  const [isCallMode, setIsCallMode] = useState(false);
  const name = user?.name?.trim() || "You";

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
      setIsCallMode(true);
      toast.success("Call screen opened");
    }, 700);
  }

  function renderMediaControls() {
    return (
      <div className="flex items-center justify-center gap-2.5 sm:gap-3">
        <button
          aria-label={cameraEnabled ? "Turn camera off" : "Turn camera on"}
          aria-busy={cameraBusy}
          aria-pressed={cameraEnabled}
          className={`grid size-12 place-items-center rounded-full shadow-md ring-1 transition duration-150 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 ${
            isCallMode
              ? cameraEnabled
                ? "bg-[#262e31] text-white ring-white/15 hover:bg-[#313b3f]"
                : "bg-[#c84b44] text-white ring-[#e0655e]/40 hover:bg-[#b53e37]"
              : cameraEnabled
                ? "bg-white text-ink ring-black/10 hover:bg-[#f7faf6]"
                : "bg-[#dc5b4f] text-white ring-[#e56d61]/30 hover:bg-[#ca4d42]"
          }`}
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
          {cameraBusy ? (
            <span
              aria-hidden="true"
              className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          ) : (
            <span
              aria-hidden="true"
              className="material-icons"
              style={{ fontSize: "20px" }}
            >
              {cameraEnabled ? "videocam" : "videocam_off"}
            </span>
          )}
        </button>

        <button
          aria-label={micEnabled ? "Mute microphone" : "Unmute microphone"}
          aria-busy={micBusy}
          aria-pressed={micEnabled}
          className={`grid size-12 place-items-center rounded-full shadow-md ring-1 transition duration-150 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 ${
            isCallMode
              ? micEnabled
                ? "bg-[#262e31] text-white ring-white/15 hover:bg-[#313b3f]"
                : "bg-[#c84b44] text-white ring-[#e0655e]/40 hover:bg-[#b53e37]"
              : micEnabled
                ? "bg-white text-ink ring-black/10 hover:bg-[#f7faf6]"
                : "bg-[#dc5b4f] text-white ring-[#e56d61]/30 hover:bg-[#ca4d42]"
          }`}
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
          {micBusy ? (
            <span
              aria-hidden="true"
              className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          ) : (
            <span
              aria-hidden="true"
              className="material-icons"
              style={{ fontSize: "20px" }}
            >
              {micEnabled ? "mic" : "mic_off"}
            </span>
          )}
        </button>

        {!isCallMode && (
          <Link
            aria-label="Leave preview"
            className="grid size-12 place-items-center rounded-full bg-[#d7463f] text-white shadow-md ring-1 ring-[#e25a53]/30 transition duration-150 hover:-translate-y-0.5 hover:bg-[#bd3530] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7463f]"
            title="Leave preview"
            to="/"
          >
            <span
              aria-hidden="true"
              className="material-icons"
              style={{ fontSize: "20px" }}
            >
              logout
            </span>
          </Link>
        )}

        {isCallMode && (
          <button
            aria-label="End call and return to preview"
            className="grid h-12 w-14 place-items-center rounded-full bg-[#d9463e] text-white shadow-md ring-1 ring-[#f0675f]/30 transition duration-150 hover:-translate-y-0.5 hover:bg-[#be362f]"
            onClick={() => setIsCallMode(false)}
            type="button"
          >
            <span
              aria-hidden="true"
              className="material-icons"
              style={{ fontSize: "20px" }}
            >
              call_end
            </span>
          </button>
        )}
      </div>
    );
  }

  const meetingLink =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}/meeting/${roomId}`;
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={`relative overflow-hidden ${
        isCallMode
          ? "h-dvh bg-[#0e1514] text-white"
          : "min-h-screen bg-cream text-ink"
      }`}
    >
      {!isCallMode && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_25%,rgba(246,227,201,0.65),transparent_36%),radial-gradient(ellipse_at_88%_16%,rgba(220,237,214,0.85),transparent_40%)]"
        />
      )}

      {isCallMode ? (
        <header className="relative z-10 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#121918]/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              aria-label="WeMeet home"
              className="text-[22px] font-bold tracking-[-0.06em] text-white"
              to="/"
            >
              WeMeet
            </Link>
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 sm:inline-flex">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Live room
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5">
            <span
              aria-hidden="true"
              className="material-icons text-white/55"
              style={{ fontSize: "15px" }}
            >
              lock
            </span>
            <span className="hidden text-xs text-white/55 sm:inline">Code</span>
            <span className="font-mono text-xs font-semibold tracking-wider text-white">
              {roomId}
            </span>
            <button
              aria-label="Copy meeting code"
              className="grid size-7 place-items-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"
              onClick={() => copyText(roomId || "", "Meeting code copied")}
              type="button"
            >
              <span
                aria-hidden="true"
                className="material-icons"
                style={{ fontSize: "15px" }}
              >
                content_copy
              </span>
            </button>
          </div>
        </header>
      ) : (
        <Header />
      )}

      <main
        className={
          isCallMode
            ? "relative flex h-[calc(100dvh-64px)] min-h-0 w-full flex-col overflow-hidden"
            : "relative mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl items-center gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)] lg:gap-10 lg:py-12"
        }
      >
        <section
          aria-label={isCallMode ? "Meeting participants" : undefined}
          aria-labelledby={isCallMode ? undefined : "meeting-preview-title"}
          className={
            isCallMode ? "flex h-full min-h-0 w-full flex-col" : "min-w-0"
          }
        >
          {!isCallMode && (
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                  <span className="size-1.5 rounded-full bg-[#58a987]" />
                  Ready when you are
                </span>
                <h1
                  className="mb-0 font-[Manrope,ui-sans-serif,system-ui] text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-4xl"
                  id="meeting-preview-title"
                >
                  Check your setup
                </h1>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dfe6dc] bg-white/85 px-3.5 py-1.5 text-[11px] font-semibold text-muted shadow-2xs">
                <span
                  className={`size-2 rounded-full ${
                    cameraEnabled ? "bg-emerald-500" : "bg-slate-400"
                  }`}
                />
                {cameraStatus}
              </span>
            </div>
          )}

          <div
            className={
              isCallMode
                ? "flex h-full min-h-0 w-full flex-col justify-between gap-3 overflow-hidden bg-[#121918] pt-3 sm:pt-4"
                : "relative overflow-hidden rounded-[30px] border border-white/80 bg-[#173b32] p-2.5 shadow-[0_24px_70px_rgba(23,59,50,0.16)] ring-1 ring-[#173b32]/10 sm:p-3"
            }
          >
            <div
              className={
                isCallMode
                  ? "relative isolate mx-auto aspect-video max-h-[54vh] w-full flex-none overflow-hidden rounded-2xl border border-white/10 bg-[#1c2427] shadow-2xl sm:w-[58%]"
                  : "relative isolate aspect-16/10 overflow-hidden rounded-[22px] bg-[#dce4d5]"
              }
            >
              {cameraEnabled ? (
                <video
                  autoPlay
                  muted
                  playsInline
                  ref={videoRef}
                  className="absolute inset-0 size-full -scale-x-100 object-cover"
                />
              ) : (
                <div
                  className={`absolute inset-0 grid place-items-center ${
                    isCallMode
                      ? "bg-[radial-gradient(circle_at_50%_40%,#2b363a,#181f22_72%)]"
                      : "bg-[radial-gradient(circle_at_50%_38%,#e5f0e4,#c7d8c5_75%)]"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2.5">
                    <span className="grid size-24 place-items-center rounded-full border-4 border-white/80 bg-[#f2d4ba] text-2xl font-bold text-[#865440] shadow-[0_12px_30px_rgba(52,75,61,0.14)]">
                      {initials}
                    </span>
                    {!isCallMode && (
                      <span className="rounded-full bg-white/75 px-3 py-1 text-[11px] font-semibold text-[#2a463c] backdrop-blur-xs">
                        {cameraStatus}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 sm:p-4">
                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111719]/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xs">
                    {isCallMode && (
                      <span
                        className={`size-1.5 rounded-full ${
                          micEnabled ? "bg-emerald-400" : "bg-rose-400"
                        }`}
                      />
                    )}
                    {name}
                  </span>
                  {isCallMode && (
                    <span className="pl-1.5 text-[10px] font-medium text-white/60">
                      {cameraEnabled ? "Camera on" : "Camera off"}
                    </span>
                  )}
                </div>

                {isCallMode ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111719]/80 px-3 py-1.5 text-[10px] font-medium text-white/85 backdrop-blur-xs">
                    <span
                      aria-hidden="true"
                      className="material-icons"
                      style={{ fontSize: "14px" }}
                    >
                      {micEnabled ? "mic" : "mic_off"}
                    </span>
                    {micEnabled ? "Mic on" : "Mic off"}
                  </span>
                ) : (
                  <span className="grid size-9 place-items-center rounded-full bg-white/85 text-ink shadow-xs backdrop-blur-xs">
                    <span
                      aria-hidden="true"
                      className="material-icons"
                      style={{ fontSize: "16px" }}
                    >
                      more_horiz
                    </span>
                  </span>
                )}
              </div>

              {!isCallMode && (
                <div className="absolute inset-x-3 bottom-3 flex justify-center sm:bottom-4">
                  <div className="rounded-full bg-[#102922]/55 px-3 py-2 backdrop-blur-md ring-1 ring-white/15">
                    {renderMediaControls()}
                  </div>
                </div>
              )}
            </div>

            {isCallMode && (
              <div
                role="list"
                aria-label="Other participants"
                className="mx-auto grid w-full max-w-[min(100%,920px)] shrink-0 grid-cols-3 gap-2.5 px-3 sm:gap-3.5 sm:px-6"
              >
                {sampleParticipants.map((participant) => (
                  <div
                    className={`group relative aspect-video min-w-0 overflow-hidden rounded-2xl border border-white/10 shadow-md ${participant.background}`}
                    key={participant.name}
                    role="listitem"
                  >
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid size-12 place-items-center rounded-full bg-white/15 text-base font-bold text-white ring-1 ring-white/15 transition group-hover:scale-105 sm:size-14 sm:text-lg">
                        {participant.initials}
                      </span>
                    </span>
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/35 to-transparent px-2.5 pb-2 pt-5 sm:px-3">
                      <span className="truncate text-[11px] font-semibold text-white sm:text-xs">
                        {participant.name}
                      </span>
                      <span
                        aria-label="Muted"
                        className="grid size-5 shrink-0 place-items-center rounded-full bg-black/45 text-white/80"
                      >
                        <span
                          aria-hidden="true"
                          className="material-icons"
                          style={{ fontSize: "13px" }}
                        >
                          mic_off
                        </span>
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            )}

            {isCallMode && (
              <div className="relative flex h-18 shrink-0 items-center justify-center border-t border-white/10 bg-[#101716] px-4 sm:px-8">
                <div className="absolute left-5 hidden items-center gap-2 text-xs text-white/70 sm:flex">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-medium">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    4 in call
                  </span>
                </div>
                {renderMediaControls()}
              </div>
            )}
          </div>
        </section>

        <aside
          aria-label="Meeting join details"
          className={`w-full rounded-[28px] border border-[#e3e8de] bg-white/95 p-5 shadow-[0_18px_55px_rgba(23,59,50,0.08)] backdrop-blur-xs sm:p-7 ${
            isCallMode ? "hidden" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
              Sunday catch-up
            </span>
            <span className="rounded-full bg-[#eef5ec] px-2.5 py-0.5 text-[10px] font-semibold text-brand">
              Lobby
            </span>
          </div>

          <h2 className="mb-1.5 mt-2 text-2xl font-bold tracking-[-0.04em] text-ink">
            Join the call
          </h2>
          <p className="mb-6 text-sm leading-6 text-muted">
            Check your framing and audio before stepping into the room.
          </p>

          <div
            aria-label={`Joining as ${name}`}
            className="mb-5 flex items-center gap-3.5 rounded-2xl border border-[#e6ebe1] bg-[#f9fbf7] px-4 py-3"
          >
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e3f0e4] text-xs font-bold text-brand ring-1 ring-brand/15"
            >
              {initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Joining as
              </span>
              <span className="block truncate text-sm font-bold text-ink">
                {name}
              </span>
            </span>
          </div>

          <button
            className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(21,123,104,0.22)] transition duration-150 hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70"
            aria-busy={joining}
            aria-label={joining ? "Joining call" : undefined}
            disabled={joining}
            onClick={joinMeeting}
            type="button"
          >
            {joining ? (
              <span
                aria-hidden="true"
                className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent"
              />
            ) : (
              <>
                Join now
                <span
                  aria-hidden="true"
                  className="material-icons"
                  style={{ fontSize: "17px" }}
                >
                  arrow_forward
                </span>
              </>
            )}
          </button>

          <div className="my-6 h-px bg-[#edf0e8]" />

          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
              Invite others
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

          <div className="mb-2.5 flex items-center gap-2">
            <div className="min-w-0 flex-1 rounded-xl border border-[#e5e9df] bg-[#f9fbf7] px-3.5 py-2.5">
              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Meeting code
              </span>
              <span className="mt-0.5 block truncate font-mono text-sm font-bold tracking-[0.08em] text-ink">
                {roomId}
              </span>
            </div>
            <button
              aria-label="Copy meeting code"
              className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#e5e9df] bg-white text-brand transition hover:-translate-y-0.5 hover:border-brand/35 hover:bg-[#edf4ea]"
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
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#e5e9df] bg-white text-xs font-bold text-ink transition hover:border-brand/35 hover:bg-[#f7faf5]"
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