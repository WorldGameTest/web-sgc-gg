export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="8"
        stroke="url(#sg-stroke)"
        strokeWidth="1.5"
      />
      {/* a "sector" wedge pointing up-right, suggesting position / growth */}
      <path
        d="M16 16 L16 6 A10 10 0 0 1 24.66 11 Z"
        fill="url(#sg-fill)"
      />
      <path
        d="M16 16 L24.66 11 A10 10 0 0 1 24.66 21 Z"
        fill="url(#sg-fill)"
        opacity="0.55"
      />
      <circle cx="16" cy="16" r="2.4" fill="#fff" />
      <defs>
        <linearGradient id="sg-stroke" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="sg-fill" x1="16" y1="6" x2="26" y2="21">
          <stop stopColor="#6ee7b7" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  );
}
