import VideoIcon from "./VideoIcon.jsx";

export default function Brand({ onHome, footer = false }) {
  return (
    <a
      aria-label="WeMeet home"
      className={`inline-flex items-center gap-2.5 font-bold tracking-[-0.06em] text-ink ${
        footer ? "text-lg" : "text-[22px]"
      }`}
      href="/"
      onClick={onHome}
    >
      <span
        className={`grid place-items-center rounded-xl bg-brand text-white ${
          footer ? "size-7 rounded-lg" : "size-8.5"
        }`}
      >
        <VideoIcon className={footer ? "size-4.5" : "size-5.25"} />
      </span>
      <span>
        we<span className="text-brand">meet</span>
      </span>
    </a>
  );
}
