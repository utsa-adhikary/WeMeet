export default function VideoIcon({ className = "size-5" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect
        height="13"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
        width="13"
        x="3"
        y="5.5"
      />
      <path
        d="m16 10 5-3v10l-5-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
