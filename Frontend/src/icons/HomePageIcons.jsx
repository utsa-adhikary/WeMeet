export function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M4.2 10h11.6m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function DownArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M10 4v12m-5-5 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function CallIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 size-full"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 640 480"
    >
      <defs>
        <linearGradient id="room" x1="320" x2="320" y1="0" y2="480">
          <stop stopColor="#e9eadb" />
          <stop offset="1" stopColor="#c9d8c6" />
        </linearGradient>
        <linearGradient id="window" x1="170" x2="400" y1="55" y2="270">
          <stop stopColor="#f9d99b" />
          <stop offset="1" stopColor="#f4a67d" />
        </linearGradient>
        <linearGradient id="shirt" x1="260" x2="465" y1="295" y2="480">
          <stop stopColor="#347d6b" />
          <stop offset="1" stopColor="#17584f" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#room)" />
      <circle cx="520" cy="93" r="52" fill="#f3d795" opacity=".8" />
      <rect
        x="93"
        y="46"
        width="352"
        height="244"
        rx="12"
        fill="#f6f1e5"
        opacity=".78"
      />
      <rect x="110" y="63" width="318" height="210" rx="4" fill="url(#window)" />
      <path d="M270 63v210M110 168h318" stroke="#f8f3e8" strokeWidth="10" />
      <path
        d="M0 356c115-32 216-22 319 6 99 27 211 19 321-10v128H0V356Z"
        fill="#b9cbb8"
      />
      <path
        d="M0 411c156-30 295-8 423 8 81 10 151 4 217-10v71H0v-69Z"
        fill="#a9c0ad"
      />
      <path
        d="M54 358c2-72 23-116 57-132 31 16 48 62 49 132m-84-83h68m-81 38h93"
        stroke="#668c73"
        strokeLinecap="round"
        strokeWidth="9"
      />
      <path d="M82 358h85l-9 24H92l-10-24Z" fill="#d28c67" />
      <path
        d="M217 480c4-96 35-151 112-162 88-13 144 47 153 162H217Z"
        fill="url(#shirt)"
      />
      <path d="M307 292h54v54h-54z" fill="#c47d56" />
      <path
        d="M280 177c0-63 35-101 82-101 53 0 83 39 83 103v52c0 51-38 89-83 89-47 0-82-38-82-90v-53Z"
        fill="#d99b70"
      />
      <path
        d="M279 198c-14-73 1-137 57-159 44-17 108 7 119 63-17-12-36-17-57-17-32 0-44 23-73 25-16 1-30-3-45-11 7 42 17 61 17 61l-18 38Z"
        fill="#263d39"
      />
      <path
        d="M280 198c-23-8-28 17-17 37 6 10 14 15 23 14m157-51c22-8 27 17 16 37-6 10-13 15-22 14"
        fill="#d99b70"
      />
      <path
        d="M313 212h21m47 0h21"
        stroke="#49362f"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M336 258c13 12 31 12 44 0"
        stroke="#814d41"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M299 194c9-8 20-10 30-7m59 0c10-3 21-1 30 7"
        stroke="#49362f"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M295 318c29 29 101 33 134 0l17 30c-39 44-124 44-167 0l16-30Z"
        fill="#e1ae81"
      />
      <circle cx="296" cy="236" r="7" fill="#e89983" opacity=".55" />
      <circle cx="419" cy="236" r="7" fill="#e89983" opacity=".55" />
    </svg>
  );
}

export function MoreIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 20 20">
      <circle cx="4" cy="10" r="1.4" />
      <circle cx="10" cy="10" r="1.4" />
      <circle cx="16" cy="10" r="1.4" />
    </svg>
  );
}

export function VideoCallIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M4 6.5h8a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H8l-4 2v-9Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="m14 9 3-2v7l-3-2"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function MicrophoneIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M7 6.5v7m6-7v7M4.5 9v2m11-2v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function HangupIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="m6 6 8 8m0-8-8 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function SparkleIcon() {
  return (
    <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 20 20">
      <path
        d="m10 2 2.2 5.2L18 10l-5.8 2.3L10 18l-2.2-5.7L2 10l5.8-2.8L10 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FeatureCameraIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
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

export function PeopleIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.5 19v-1a5.5 5.5 0 0 1 11 0v1h-11Zm12-13a3 3 0 0 1 0 5.8m2 2.4a4.5 4.5 0 0 1 3 4.3v.5h-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function FeatureStarIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3.5 14.6 9l5.9 1-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 10l5.9-1L12 3.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M12 11v3m0 2.5v.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}
