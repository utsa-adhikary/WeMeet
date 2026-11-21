import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="relative z-10 w-full shrink-0 bg-cream">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-8 max-sm:px-5">
        <Link
          aria-label="WeMeet home"
          className="font-bold tracking-[-0.06em] text-ink text-[22px]"
          to="/"
        >
          WeMeet
        </Link>
        <nav aria-label="Account navigation" className="flex items-center gap-2">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-lg px-3 text-xs font-bold text-slate-600 transition hover:bg-white hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            to="/signin"
          >
            Sign in
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ink px-4 text-xs font-bold text-white transition hover:-translate-y-px hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            to="/signup"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}