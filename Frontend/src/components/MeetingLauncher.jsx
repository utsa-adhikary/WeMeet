import { useState } from "react";
import Button from "./Button.jsx";
import VideoIcon from "./VideoIcon.jsx";
import { formatMeetingCode, isValidMeetingCode } from "../utils/meetingCode.js";

export default function MeetingLauncher({ onJoinMeeting }) {
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");

  function joinMeeting(event) {
    event.preventDefault();

    if (!isValidMeetingCode(joinCode)) {
      setError("Enter a 9-character meeting code.");
      return;
    }

    onJoinMeeting(joinCode);
  }

  return (
    <section
      aria-label="Join a meeting"
      className="shrink-0 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-[0_16px_45px_rgba(44,64,51,0.07)] max-[700px]:px-4 max-[700px]:py-3"
      id="meeting-actions"
    >
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-8 max-[700px]:grid-cols-1 max-[700px]:gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-brand">
            <VideoIcon />
          </span>
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-[1.3px] text-brand">
              GOOD TO SEE YOU
            </span>
            <p className="mb-0 mt-1 text-[11px] text-slate-600">
              Bring everyone into the same room.
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <label
            className="mb-1.5 block text-[9px] font-bold uppercase tracking-[1.3px] text-slate-500"
            htmlFor="meeting-code"
          >
            Join with a code
          </label>
          <form className="flex max-w-sm gap-2" onSubmit={joinMeeting}>
            <input
              autoCapitalize="characters"
              autoComplete="off"
              className="form-input meeting-code-input"
              id="meeting-code"
              maxLength={11}
              name="meetingCode"
              onChange={(event) => {
                setJoinCode(formatMeetingCode(event.target.value));
                setError("");
              }}
              placeholder="XXX-XXX-XXX"
              required
              spellCheck="false"
              value={joinCode}
            />
            <Button className="min-h-11 px-4 text-xs" type="submit" variant="dark">
              Join Meeting
            </Button>
          </form>
          {error ? (
            <p aria-live="polite" className="mb-0 mt-1.5 text-[10px] text-red-700" role="alert">
              {error}
            </p>
          ) : (
            <p className="mb-0 mt-1.5 text-[9px] text-slate-500">
              Meeting lookup is a preview until the backend is connected.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
