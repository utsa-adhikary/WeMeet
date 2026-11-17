function PersonTile({ name, initial, color, size = "" }) {
  return (
    <div
      className={`relative flex min-h-0 items-center justify-center overflow-hidden rounded-xl ${color} ${size}`}
    >
      <span className="grid size-14 place-items-center rounded-full border-4 border-white/60 bg-white/70 font-[Manrope,ui-sans-serif,system-ui] text-xl font-bold text-ink shadow-sm">
        {initial}
      </span>
      <span className="absolute bottom-2 left-2.5 rounded-full bg-white/80 px-2 py-1 text-[9px] font-semibold text-ink">
        {name}
      </span>
    </div>
  );
}

export default function MeetingArtwork() {
  return (
    <div
      aria-label="Illustration of friends sharing a video call"
      className="relative mx-auto grid h-full max-h-85 min-h-62.5 w-full max-w-107.5 place-items-center max-[700px]:max-h-45 max-[700px]:min-h-37.5"
      role="img"
    >
      <span className="absolute size-77.5 rounded-full border border-emerald-900/10 max-[700px]:size-42.5" />
      <span className="absolute size-61.25 rounded-full border border-emerald-900/10 max-[700px]:size-32.5" />
      <div className="relative z-1 w-[min(100%,360px)] rotate-2 rounded-[22px] border border-white bg-white/90 p-3.5 shadow-[0_24px_70px_rgba(37,71,57,0.14)]">
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-brand text-white">
              <span className="text-sm">✳</span>
            </span>
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-[1.2px] text-brand">
                WE MEET
              </span>
              <span className="block text-[9px] text-slate-500">
                together feels closer
              </span>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-bold text-brand">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            CONNECTED
          </span>
        </div>
        <div className="grid h-37.5 grid-cols-2 grid-rows-2 gap-2 max-[700px]:h-22">
          <PersonTile
            color="bg-gradient-to-br from-[#d7e8d8] to-[#abc7af]"
            initial="M"
            name="Maya"
            size="row-span-2"
          />
          <PersonTile
            color="bg-gradient-to-br from-[#f1deca] to-[#d7aa83]"
            initial="J"
            name="Jules"
          />
          <PersonTile
            color="bg-gradient-to-br from-[#e1dced] to-[#a9a0c8]"
            initial="L"
            name="Lee"
          />
        </div>
        <div className="flex justify-center gap-2 pt-3">
          <span className="grid size-7 place-items-center rounded-full bg-slate-100 text-[10px] text-slate-600">
            ◖
          </span>
          <span className="grid size-7 place-items-center rounded-full bg-slate-100 text-[10px] text-slate-600">
            ◉
          </span>
          <span className="grid size-7 place-items-center rounded-full bg-[#e87668] text-sm text-white">
            ×
          </span>
        </div>
      </div>
      <div className="absolute right-0 bottom-5 z-2 rounded-xl border border-emerald-900/10 bg-white px-3 py-2.5 shadow-lg max-[700px]:right-2 max-[700px]:bottom-0">
        <span className="block text-[9px] font-bold text-ink">
          Your people are one call away
        </span>
        <span className="mt-1 flex items-center gap-1 text-[8px] text-slate-500">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Friends · family · teams
        </span>
      </div>
      <span className="absolute top-5 right-6 text-2xl text-amber-600">✳</span>
      <span className="absolute bottom-9 left-3 text-lg text-emerald-700">✳</span>
    </div>
  );
}
