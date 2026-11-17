import Brand from "./Brand.jsx";
import Button from "./Button.jsx";

export default function SiteHeader({
  onHome,
  onSignup,
  signup = false,
  showHomeButton = true,
}) {
  return (
    <header className="relative z-10 w-full shrink-0 bg-cream">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-8 max-sm:px-5">
        <Brand onHome={onHome} />
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-9 text-[13px] font-semibold text-slate-600 max-sm:gap-0"
        >
          {!signup && (
            <a
              className="transition hover:text-brand max-sm:hidden"
              href="#meeting-actions"
            >
              Meetings
            </a>
          )}
          {signup ? (
            showHomeButton && (
            <Button
              className="min-h-10 px-4 text-xs"
              href="/"
              onClick={onHome}
              variant="subtle"
            >
              Back to home
            </Button>
            )
          ) : (
            <Button
              arrow
              className="min-h-11 bg-ink px-4 text-xs hover:bg-slate-700"
              href="/signup"
              onClick={onSignup}
              variant="dark"
            >
              Get started
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
