export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      {/* Swirl body */}
      <path d="M50 100 C20 90 10 70 15 50 C20 30 35 20 50 25 C65 30 72 45 65 60 C58 75 45 78 38 70 C31 62 35 50 44 48 C53 46 58 52 55 58" 
        stroke="url(#logoGrad1)" strokeWidth="8" strokeLinecap="round" fill="none"/>
      {/* Music note */}
      <circle cx="64" cy="22" r="7" fill="url(#logoGrad2)"/>
      <circle cx="80" cy="18" r="7" fill="url(#logoGrad2)"/>
      <line x1="71" y1="22" x2="71" y2="5" stroke="url(#logoGrad2)" strokeWidth="4" strokeLinecap="round"/>
      <line x1="87" y1="18" x2="87" y2="1" stroke="url(#logoGrad2)" strokeWidth="4" strokeLinecap="round"/>
      <line x1="71" y1="5" x2="87" y2="1" stroke="url(#logoGrad2)" strokeWidth="4" strokeLinecap="round"/>
      {/* Sparkles */}
      <path d="M88 45 L90 40 L92 45 L97 47 L92 49 L90 54 L88 49 L83 47 Z" fill="#f472b6" opacity="0.8"/>
      <path d="M8 55 L9.5 51 L11 55 L15 56.5 L11 58 L9.5 62 L8 58 L4 56.5 Z" fill="#a855f7" opacity="0.6"/>
      <path d="M75 90 L76.5 87 L78 90 L81 91.5 L78 93 L76.5 96 L75 93 L72 91.5 Z" fill="#c084fc" opacity="0.7"/>
    </svg>
  );
}
