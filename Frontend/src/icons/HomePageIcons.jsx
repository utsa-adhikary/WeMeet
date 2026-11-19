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
