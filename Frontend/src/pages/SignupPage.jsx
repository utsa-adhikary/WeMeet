import { useState } from "react";
import Button from "../components/Button.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import VideoIcon from "../components/VideoIcon.jsx";

export default function SignupPage({ onHome }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <SiteHeader onHome={onHome} signup />
      <main className="relative grid min-h-[calc(100vh-88px)] place-items-center overflow-hidden bg-[#f7f8f3] px-5 py-9 max-sm:min-h-[calc(100vh-72px)] max-sm:px-3.5 max-sm:py-6.5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_30%,rgba(223,239,223,0.8),transparent_30%),radial-gradient(ellipse_at_88%_75%,rgba(239,229,209,0.75),transparent_32%)]" />
        <span
          aria-hidden="true"
          className="absolute top-[13%] left-[14%] text-[43px] text-emerald-700/50 max-sm:top-[6%] max-sm:left-[5%] max-sm:text-[30px]"
        >
          ✳
        </span>
        <span
          aria-hidden="true"
          className="absolute right-[15%] bottom-[13%] text-[29px] text-amber-700/50 max-sm:right-[5%] max-sm:bottom-[7%]"
        >
          ✦
        </span>
        <section
          aria-labelledby="signup-title"
          className="relative z-1 w-full max-w-112.5 rounded-2xl border border-slate-200/80 bg-white/95 px-10.5 py-7 shadow-[0_22px_65px_rgba(44,64,51,0.08)] max-sm:px-6 max-sm:py-5.5"
        >
          <a
            className="mb-5.5 inline-flex items-center gap-2 text-[11px] font-semibold text-slate-600 hover:text-brand max-sm:mb-4.25"
            href="/"
            onClick={onHome}
          >
            <span aria-hidden="true" className="text-base">
              ←
            </span>
            Back
          </a>
          {submitted ? (
            <div
              aria-live="polite"
              className="flex min-h-104.5 flex-col items-center justify-center text-center"
            >
              <span className="mb-5 grid size-13 place-items-center rounded-full bg-emerald-50 text-[23px] text-brand">
                ✓
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[1.35px] text-brand">
                NICE TO MEET YOU
              </span>
              <h1
                className="mb-2 mt-3 font-[Manrope,ui-sans-serif,system-ui] text-[34px] font-semibold tracking-[-1.7px] text-ink"
                id="signup-title"
              >
                You’re on your way.
              </h1>
              <p className="mb-6 max-w-75 text-xs leading-relaxed text-muted">
                Thanks for signing up. Account creation isn’t connected yet, so
                your details have not been sent anywhere.
              </p>
              <Button arrow onClick={onHome}>
                Back to WeMeet
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center text-center">
                <span className="mb-4.25 grid size-10.75 place-items-center rounded-[13px] bg-brand text-white">
                  <VideoIcon className="size-6.25" />
                </span>
                <span className="text-[8px] font-bold uppercase tracking-[1.35px] text-brand">
                  LET’S MAKE A CONNECTION
                </span>
                <h1
                  className="mb-2 mt-2 font-[Manrope,ui-sans-serif,system-ui] text-[34px] font-semibold tracking-[-1.7px] text-ink"
                  id="signup-title"
                >
                  Join WeMeet.
                </h1>
                <p className="mb-5.5 max-w-75 text-xs leading-relaxed text-muted">
                  Create your account and bring your people a little closer.
                </p>
              </div>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <label
                  className="mb-1.75 mt-3.25 text-[11px] font-bold text-slate-700"
                  htmlFor="full-name"
                >
                  Your name
                </label>
                <input
                  autoComplete="name"
                  className="form-input signup-input"
                  id="full-name"
                  name="name"
                  placeholder="e.g. Alex Morgan"
                  required
                />
                <label
                  className="mb-1.75 mt-3.25 text-[11px] font-bold text-slate-700"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  autoComplete="email"
                  className="form-input signup-input"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
                <label
                  className="mb-1.75 mt-3.25 text-[11px] font-bold text-slate-700"
                  htmlFor="password"
                >
                  Create a password
                </label>
                <input
                  autoComplete="new-password"
                  className="form-input signup-input"
                  id="password"
                  minLength="8"
                  name="password"
                  placeholder="At least 8 characters"
                  required
                  type="password"
                />
                <Button
                  arrow
                  className="mt-4.5 w-full"
                  type="submit"
                >
                  Create account
                </Button>
                <p className="mb-0 mt-3 text-center text-[9px] leading-relaxed text-slate-500">
                  Demo form: your information stays in this browser and isn’t
                  submitted to a server.
                </p>
              </form>
            </>
          )}
        </section>
        <p className="absolute bottom-4.25 m-0 font-[Manrope,ui-sans-serif,system-ui] text-[10px] font-semibold text-slate-500">
          Good people. Better together.
        </p>
      </main>
    </>
  );
}
