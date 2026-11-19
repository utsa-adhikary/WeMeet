import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_35%,rgba(246,227,201,0.64),transparent_35%),radial-gradient(ellipse_at_82%_20%,rgba(228,239,222,0.82),transparent_38%)]"
      />
      <header className="relative z-10 mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          aria-label="WeMeet home"
          className="font-bold tracking-[-0.06em] text-ink text-[22px]"
          to="/"
        >
          WeMeet
        </Link>
        <Link
          className="text-xs font-bold text-slate-600 transition hover:text-brand"
          to="/"
        >
          Back to home
        </Link>
      </header>

      <main className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:py-14">
        <section className="mx-auto w-full max-w-xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-brand shadow-sm">
            <span className="size-1.5 rounded-full bg-[#58a987]" />
            Good calls start here
          </span>
          <h1 className="mb-4 font-[Manrope,ui-sans-serif,system-ui] text-[clamp(2.8rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.075em] text-ink">
            Make room for
            <br />
            <span className="text-brand">your people.</span>
          </h1>
          <p className="mb-8 max-w-md text-sm leading-7 text-muted sm:text-base">
            Create an account and bring your friends and family a little closer,
            wherever life takes you.
          </p>

          <div className="hidden max-w-md rounded-3xl border border-white bg-white/80 p-5 shadow-[0_18px_50px_rgba(40,70,53,0.08)] sm:block">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                YOUR PEOPLE, TOGETHER
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-[#e7f2e8] px-2.5 py-1 text-[9px] font-bold text-brand">
                <span className="size-1.5 rounded-full bg-[#58a987]" />
                READY WHEN YOU ARE
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-[#f5f7f1] p-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                <span
                  aria-hidden="true"
                  className="material-icons"
                  style={{ fontSize: "20px" }}
                >
                  videocam
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-sm font-bold text-ink">
                  Sunday catch-up
                </p>
                <p className="mb-0 text-xs text-muted">
                  A little closer, one call at a time.
                </p>
              </div>
              <span className="flex -space-x-2">
                <span className="grid size-8 place-items-center rounded-full border-2 border-[#f5f7f1] bg-[#f2d4ba] text-[9px] font-bold text-[#865440]">
                  M
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-[#f5f7f1] bg-[#d8e6d5] text-[9px] font-bold text-[#416653]">
                  A
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-[#f5f7f1] bg-[#e6d8ed] text-[9px] font-bold text-[#755a83]">
                  J
                </span>
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted">
              <span className="text-brand">
                <span
                  aria-hidden="true"
                  className="material-icons"
                  style={{ fontSize: "20px" }}
                >
                  groups
                </span>
              </span>
              Good people. Better together.
            </div>
          </div>
        </section>

        <section
          aria-labelledby="signup-title"
          className="mx-auto w-full max-w-md rounded-[28px] border border-[#e9ebe3] bg-white p-6 shadow-[0_24px_70px_rgba(40,70,53,0.1)] sm:p-9"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand">
            YOUR NEXT CALL IS CLOSER
          </span>
          <h2
            className="mb-2 mt-3 font-[Manrope,ui-sans-serif,system-ui] text-3xl font-semibold tracking-[-0.06em] text-ink"
            id="signup-title"
          >
            Create your account
          </h2>
          <p className="mb-7 text-sm leading-6 text-muted">
            A few details and you’re ready to catch up.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label
                className="mb-2 block text-xs font-bold text-slate-700"
                htmlFor="signup-name"
              >
                Your name
              </label>
              <input
                autoComplete="name"
                className="page-input text-sm"
                id="signup-name"
                name="name"
                placeholder="e.g. Alex Morgan"
                type="text"
              />
            </div>
            <div>
              <label
                className="mb-2 block text-xs font-bold text-slate-700"
                htmlFor="signup-email"
              >
                Email address
              </label>
              <input
                autoComplete="email"
                className="page-input text-sm"
                id="signup-email"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
            </div>
            <div>
              <label
                className="mb-2 block text-xs font-bold text-slate-700"
                htmlFor="signup-password"
              >
                Create a password
              </label>
              <input
                autoComplete="new-password"
                className="page-input text-sm"
                id="signup-password"
                name="password"
                placeholder="Choose a password"
                type="password"
              />
            </div>
          </div>

          <button
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(21,123,104,0.18)] transition hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            type="button"
          >
            Create account
            <span
              aria-hidden="true"
              className="material-icons"
              style={{ fontSize: "16px" }}
            >
              arrow_forward
            </span>
          </button>
          <p className="mb-0 mt-4 text-center text-[11px] leading-5 text-muted">
            Signup is a preview; account creation isn’t connected yet.
          </p>
        </section>
      </main>
      <footer className="relative mx-auto max-w-6xl px-5 pb-6 text-center text-[10px] text-muted sm:px-8">
        Good people. Better together.
      </footer>
    </div>
  );
}
