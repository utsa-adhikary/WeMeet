import Brand from "../components/Brand.jsx";
import Button from "../components/Button.jsx";
import MeetingLauncher from "../components/MeetingLauncher.jsx";
import MeetingArtwork from "../components/MeetingArtwork.jsx";
import SiteHeader from "../components/SiteHeader.jsx";

export default function HomePage({
  onHome,
  onSignup,
  onStartMeeting,
  onJoinMeeting,
}) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-cream">
      <SiteHeader onHome={onHome} onSignup={onSignup} />
      <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-3 px-8 py-4 max-sm:px-5 max-sm:py-2">
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-8 max-[700px]:grid-cols-1 max-[700px]:gap-2">
          <section
            aria-labelledby="home-title"
            className="relative flex flex-col justify-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.65px] text-brand max-sm:text-[8px] max-sm:tracking-[1.2px]">
              <span className="size-1.75 rounded-full bg-[#58a987]" />
              A little closer, wherever you are
            </div>
            <h1
              className="mb-4 font-[Manrope,ui-sans-serif,system-ui] text-[clamp(42px,5vw,64px)] font-semibold leading-[1.05] tracking-[-3.5px] text-ink max-sm:text-[32px] max-sm:tracking-[-2px]"
              id="home-title"
            >
              Good people.
              <br />
              <span className="text-brand">Better together.</span>
            </h1>
            <p className="mb-6 max-w-110 text-sm leading-[1.7] text-muted max-sm:mb-3 max-sm:text-xs">
              Catch up with friends and family or bring your team together. Make
              every conversation feel closer.
            </p>
            <Button
              arrow
              className="min-h-11 w-fit px-4 text-xs"
              onClick={onStartMeeting}
            >
              Start meeting
            </Button>
          </section>
          <MeetingArtwork />
        </div>
        <MeetingLauncher onJoinMeeting={onJoinMeeting} />
      </main>
      <footer className="hidden shrink-0 border-t border-slate-200 sm:block">
        <div className="mx-auto flex h-10 w-full max-w-6xl items-center justify-between px-8 text-[9px] text-slate-500 max-sm:px-5">
          <Brand footer onHome={onHome} />
          <span>Good people. Better together.</span>
        </div>
      </footer>
    </div>
  );
}
