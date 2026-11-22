export const LogoMark = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
    aria-label="Sarai logo"
  >
    <path
      d="M9 27V15.5a7 7 0 0 1 14 0V27"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <circle cx="16" cy="13" r="2.2" fill="currentColor" />
    <path d="M5 27h22" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const Wordmark = ({ className = "" }) => (
  <span className={`font-display font-semibold tracking-[0.22em] ${className}`}>SARAI</span>
);
