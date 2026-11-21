import Header from "../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { CallIllustration } from "../icons/HomePageIcons.jsx";
import { useFetch } from "../utils/useFetch.js";
import { useState } from "react";
import toast from "react-hot-toast";
import { validateRoomId } from "../utils/roomFunctions.js";

export default function HomePage() {
  const navigate = useNavigate();

  const [userRoomId, setUserRoomId] = useState("");

  function renderCallPreview() {
    return (
      <div className="relative mx-auto w-full max-w-142.5 px-2 pb-7 sm:px-7">
        <div className="absolute top-5 right-0 z-10 hidden -rotate-2 items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_14px_40px_rgba(27,58,47,0.12)] sm:flex">
          <span className="grid size-10 place-items-center rounded-full bg-[#f7dfc7] text-sm font-bold text-[#8d523d]">
            J
          </span>
          <span>
            <span className="block text-xs font-bold text-ink">
              Jamie joined
            </span>
            <span className="block text-[10px] text-muted">
              just in time ✨
            </span>
          </span>
        </div>
        <div className="overflow-hidden rounded-[30px] border border-white bg-white p-2.5 shadow-[0_28px_90px_rgba(40,70,53,0.16)] sm:p-3">
          <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#4caf7c]" />
              <span className="text-[10px] font-bold tracking-[0.12em] text-slate-500">
                SUNDAY CATCH-UP
              </span>
            </div>
            <span className="rounded-full bg-[#f3f6f0] px-2.5 py-1 text-[10px] font-semibold text-slate-500">
              12:48
            </span>
          </div>
          <div className="relative isolate aspect-[1.14] overflow-hidden rounded-[22px] bg-[#dce4d5] sm:aspect-[1.19]">
            <CallIllustration />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 sm:p-4">
              <span className="rounded-full bg-[#173b32]/75 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                Maya · San Diego
              </span>
              <span className="grid size-9 place-items-center rounded-full bg-white/75 text-ink shadow-sm backdrop-blur">
                <span
                  aria-hidden="true"
                  className="material-icons"
                  style={{ fontSize: "16px" }}
                >
                  more_horiz
                </span>
              </span>
            </div>
            <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between sm:right-4 sm:bottom-4 sm:left-4">
              <span className="flex items-center gap-2 rounded-full bg-[#173b32]/75 px-3 py-2 text-[10px] font-semibold text-white backdrop-blur">
                <span className="size-1.5 rounded-full bg-[#75d39e]" />
                Maya is speaking
              </span>
              <span className="flex -space-x-2">
                <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-[#f2d4ba] text-[9px] font-bold text-[#865440]">
                  A
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-[#d8e6d5] text-[9px] font-bold text-[#416653]">
                  J
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-[#e6d8ed] text-[9px] font-bold text-[#755a83]">
                  +2
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-2 py-3 sm:px-3">
            <div>
              <p className="mb-0 text-[11px] font-bold text-ink">
                The Sunday crew
              </p>
              <p className="mb-0 mt-0.5 text-[10px] text-muted">
                5 people together
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-[#f1f3ed] text-ink">
                <span
                  aria-hidden="true"
                  className="material-icons"
                  style={{ fontSize: "16px" }}
                >
                  videocam
                </span>
              </span>
              <span className="grid size-9 place-items-center rounded-full bg-[#f1f3ed] text-ink">
                <span
                  aria-hidden="true"
                  className="material-icons"
                  style={{ fontSize: "16px" }}
                >
                  mic
                </span>
              </span>
              <span className="grid size-9 place-items-center rounded-full bg-[#e56d61] text-white shadow-sm">
                <span
                  aria-hidden="true"
                  className="material-icons"
                  style={{ fontSize: "16px" }}
                >
                  call_end
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 flex -rotate-2 items-center gap-2 rounded-full border border-white bg-white px-3.5 py-2.5 shadow-[0_10px_30px_rgba(27,58,47,0.12)] sm:left-0">
          <span className="grid size-7 place-items-center rounded-full bg-[#e7f2e8] text-brand">
            <span
              aria-hidden="true"
              className="material-icons"
              style={{ fontSize: "14px" }}
            >
              auto_awesome
            </span>
          </span>
          <span className="text-[10px] font-bold text-ink">
            Feels like being there
          </span>
        </div>
      </div>
    );
  }

  function renderJoinCall() {
    return (
      <section
        aria-labelledby="join-call-title"
        className="mx-auto max-w-6xl px-5 pb-10 sm:px-8 sm:pb-14"
        id="join-call"
      >
        <div className="flex flex-col gap-6 rounded-3xl border border-[#e5e9df] bg-white/90 p-5 shadow-[0_16px_50px_rgba(40,70,53,0.07)] sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#e7f2e8] text-brand">
              <span
                aria-hidden="true"
                className="material-icons"
                style={{ fontSize: "16px" }}
              >
                videocam
              </span>
            </span>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-brand">
                Have a meeting code?
              </span>
              <h2
                className="mb-1 mt-1 text-lg font-bold tracking-tight text-ink"
                id="join-call-title"
              >
                Join your people
              </h2>
              <p className="mb-0 text-xs leading-5 text-muted">
                Enter the code your friend shared with you.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-120">
            <label className="sr-only" htmlFor="meeting-code">
              Meeting code
            </label>
            <input
              autoComplete="off"
              className="page-input meeting-code-field"
              id="meeting-code"
              name="meeting-code"
              placeholder="ABC-123-XYZ"
              type="text"
              maxLength={11}
              onChange={(e) => {
                const raw = e.target.value
                  .toUpperCase()
                  .replace(/[\s-]+/g, "")
                  .slice(0, 9);

                let formatted = raw;
                if (raw.length > 6) {
                  formatted = `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
                } else if (raw.length > 3) {
                  formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
                }

                e.target.value = formatted;
                setUserRoomId(formatted);
              }}
            />
            <button
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              type="button"
              onClick={() => joinRoom(userRoomId)}
            >
              Join call
              <span
                aria-hidden="true"
                className="material-icons"
                style={{ fontSize: "16px" }}
              >
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  function renderFeatures() {
    return (
      <section
        aria-labelledby="features-title"
        className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"
        id="how-it-works"
      >
        <div className="mx-auto mb-10 max-w-xl text-center sm:mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
            A little more together
          </span>
          <h2
            className="mb-3 mt-3 font-[Manrope,ui-sans-serif,system-ui] text-3xl font-semibold leading-tight tracking-tighter text-ink sm:text-4xl"
            id="features-title"
          >
            The best things happen when we show up.
          </h2>
          <p className="mb-0 text-sm leading-6 text-muted">
            WeMeet makes it easy to turn “we should catch up” into your favorite
            part of the day.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-[#e9ebe3] bg-white p-6 sm:p-7">
            <span className="mb-5 grid size-11 place-items-center rounded-2xl bg-[#e7f2e8] text-brand">
              <span
                aria-hidden="true"
                className="material-icons"
                style={{ fontSize: "20px" }}
              >
                videocam
              </span>
            </span>
            <h3 className="mb-2 text-base font-bold tracking-tight text-ink">
              Face-to-face, from anywhere
            </h3>
            <p className="mb-0 text-sm leading-6 text-muted">
              See the smiles, hear the stories, and feel a little closer even
              when you’re miles apart.
            </p>
          </article>
          <article className="rounded-3xl border border-[#e9ebe3] bg-white p-6 sm:p-7">
            <span className="mb-5 grid size-11 place-items-center rounded-2xl bg-[#fbefdd] text-[#b77b35]">
              <span
                aria-hidden="true"
                className="material-icons"
                style={{ fontSize: "20px" }}
              >
                groups
              </span>
            </span>
            <h3 className="mb-2 text-base font-bold tracking-tight text-ink">
              Room for your whole circle
            </h3>
            <p className="mb-0 text-sm leading-6 text-muted">
              Bring your family, your best friends, or the people who make an
              ordinary Tuesday feel special.
            </p>
          </article>
          <article className="rounded-3xl border border-[#e9ebe3] bg-white p-6 sm:p-7">
            <span className="mb-5 grid size-11 place-items-center rounded-2xl bg-[#f2eaf5] text-[#86639a]">
              <span
                aria-hidden="true"
                className="material-icons"
                style={{ fontSize: "20px" }}
              >
                star_outline
              </span>
            </span>
            <h3 className="mb-2 text-base font-bold tracking-tight text-ink">
              Simple, so you can be present
            </h3>
            <p className="mb-0 text-sm leading-6 text-muted">
              Less fiddling with settings. More time for the conversation,
              inside jokes, and happy hellos.
            </p>
          </article>
        </div>
      </section>
    );
  }

  async function startCall() {
    const response = await useFetch("/createmeeting", {
      method: "POST",
    });

    if (!response.success) {
      return console.log("Unable to create meeting. Try again.");
    }

    const roomId = response.roomId;
    navigate(`/meeting/${roomId}`);
  }

  async function joinRoom(userRoomId) {
    if (!validateRoomId(userRoomId)) {
      return toast.error("Invalid room Id");
    }

    const response = await useFetch(`/meeting/${userRoomId}`, {
      method: "POST",
    });

    if (!response.success) {
      return toast.error(response.message);
    }

    navigate(`/meeting/${response.roomId}`);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-190 bg-[radial-gradient(ellipse_at_76%_24%,rgba(228,239,222,0.82),transparent_35%),radial-gradient(ellipse_at_5%_55%,rgba(246,227,201,0.62),transparent_32%)]"
      />
      <Header />
      <main className="relative">
        <section className="mx-auto grid min-h-155 max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:py-20">
          <div className="max-w-xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-brand shadow-sm">
              <span className="size-1.5 rounded-full bg-[#58a987]" />
              Good calls. Good company.
            </span>
            <h1 className="mb-5 font-[Manrope,ui-sans-serif,system-ui] text-[clamp(3.2rem,7vw,5.25rem)] font-semibold leading-[0.99] tracking-[-0.075em] text-ink">
              Good people.
              <br />
              <span className="text-brand">Better together.</span>
            </h1>
            <p className="mb-8 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Catch up with your friends, check in with family, and make the
              distance feel a little smaller — one call at a time.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(21,123,104,0.2)] transition hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                onClick={() => startCall()}
              >
                Start a call
                <span
                  aria-hidden="true"
                  className="material-icons"
                  style={{ fontSize: "16px" }}
                >
                  arrow_forward
                </span>
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-ink transition hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                to="#how-it-works"
              >
                How it works
                <span
                  aria-hidden="true"
                  className="material-icons"
                  style={{ fontSize: "16px" }}
                >
                  keyboard_arrow_down
                </span>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-xs text-muted">
              <span className="flex -space-x-2">
                <span className="grid size-7 place-items-center rounded-full border-2 border-cream bg-[#f2d4ba] text-[9px] font-bold text-[#865440]">
                  M
                </span>
                <span className="grid size-7 place-items-center rounded-full border-2 border-cream bg-[#d8e6d5] text-[9px] font-bold text-[#416653]">
                  A
                </span>
                <span className="grid size-7 place-items-center rounded-full border-2 border-cream bg-[#e6d8ed] text-[9px] font-bold text-[#755a83]">
                  J
                </span>
              </span>
              <span>Make room for your favorite people.</span>
            </div>
            <p className="mb-0 mt-4 text-xs text-muted">
              Have a code?{" "}
              <a
                className="font-bold text-brand underline decoration-brand/30 underline-offset-4 hover:text-brand-dark"
                href="#join-call"
              >
                Join a call
              </a>
            </p>
          </div>
          {renderCallPreview()}
        </section>

        {renderJoinCall()}
        {renderFeatures()}

        <section
          className="mx-5 mb-12 overflow-hidden rounded-4xl bg-[#173b32] sm:mx-8 sm:mb-16"
          id="get-started"
        >
          <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center sm:px-10 sm:py-12 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 right-20 size-72 rounded-full border border-white/10"
            />
            <div className="relative max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a6d8b8]">
                Your people are one call away
              </span>
              <h2 className="mb-0 mt-3 font-[Manrope,ui-sans-serif,system-ui] text-3xl font-semibold leading-tight tracking-tighter text-white sm:text-4xl">
                Make today a little more together.
              </h2>
            </div>
            <Link
              className="relative inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-5 text-sm font-bold text-[#173b32] transition hover:-translate-y-0.5 hover:bg-[#eff5ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              to="/signup"
            >
              Get started
              <span
                aria-hidden="true"
                className="material-icons"
                style={{ fontSize: "16px" }}
              >
                arrow_forward
              </span>
            </Link>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-5 pb-8 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link
          aria-label="WeMeet home"
          className="w-fit font-bold tracking-[-0.06em] text-ink"
          to="/"
        >
          WeMeet
        </Link>
        <span>Good people. Better together.</span>
      </footer>
    </div>
  );
}
