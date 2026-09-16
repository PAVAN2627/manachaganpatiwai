export function GaneshIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 15 C60 15 68 20 72 28 C76 36 76 45 72 52 C70 55 68 58 68 62 L68 68 C68 72 65 75 60 75 L40 75 C35 75 32 72 32 68 L32 62 C32 58 30 55 28 52 C24 45 24 36 28 28 C32 20 40 15 50 15 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <ellipse cx="42" cy="40" rx="4" ry="5" fill="currentColor" opacity="0.6" />
      <ellipse cx="58" cy="40" rx="4" ry="5" fill="currentColor" opacity="0.6" />
      <path d="M45 52 Q50 56 55 52" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M40 18 Q35 10 30 8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M60 18 Q65 10 70 8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="28" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function LotusIcon({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 Q55 35 50 50 Q45 35 50 20 Z" fill="currentColor" opacity="0.8" />
      <path d="M50 25 Q65 35 60 55 Q50 45 50 25 Z" fill="currentColor" opacity="0.6" />
      <path d="M50 25 Q35 35 40 55 Q50 45 50 25 Z" fill="currentColor" opacity="0.6" />
      <path d="M50 30 Q72 40 68 58 Q50 48 50 30 Z" fill="currentColor" opacity="0.4" />
      <path d="M50 30 Q28 40 32 58 Q50 48 50 30 Z" fill="currentColor" opacity="0.4" />
      <path d="M20 60 Q35 55 50 58 Q65 55 80 60 Q70 72 50 72 Q30 72 20 60 Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function DiyaIcon({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 65 Q50 55 75 65 Q70 80 50 80 Q30 80 25 65 Z" fill="currentColor" opacity="0.7" />
      <ellipse cx="50" cy="65" rx="25" ry="6" fill="currentColor" opacity="0.3" />
      <path d="M50 35 Q45 45 48 55 Q50 50 52 55 Q55 45 50 35 Z" fill="currentColor" opacity="0.9" />
      <ellipse cx="50" cy="42" rx="3" ry="8" fill="currentColor" opacity="0.6" />
      <circle cx="50" cy="38" r="4" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function OmIcon({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 55 Q15 40 30 35 Q40 32 45 42 Q48 50 40 55 Q35 58 32 52 M30 60 Q40 68 50 60 Q55 55 50 48 M45 65 Q50 75 60 70 Q68 65 65 55 M55 30 Q62 25 65 32 Q67 38 60 42 M70 25 Q72 20 75 25 Q77 30 72 32"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="73" cy="20" r="3" fill="currentColor" />
      <path d="M68 28 Q73 18 80 22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MandalaPattern({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.15">
        <circle cx="100" cy="100" r="95" />
        <circle cx="100" cy="100" r="75" />
        <circle cx="100" cy="100" r="55" />
        <circle cx="100" cy="100" r="35" />
        <circle cx="100" cy="100" r="15" />
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x1 = 100 + Math.cos(angle) * 15;
          const y1 = 100 + Math.sin(angle) * 15;
          const x2 = 100 + Math.cos(angle) * 95;
          const y2 = 100 + Math.sin(angle) * 95;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 100 + Math.cos(angle) * 55;
          const cy = 100 + Math.sin(angle) * 55;
          return <circle key={i} cx={cx} cy={cy} r="12" />;
        })}
      </g>
    </svg>
  );
}

export function TempleArch({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 100 L0 30 Q100 -20 200 30 L200 100 Z" fill="currentColor" opacity="0.05" />
      <path d="M10 100 L10 35 Q100 -10 190 35 L190 100" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" />
      <path d="M20 100 L20 40 Q100 0 180 40 L180 100" stroke="currentColor" strokeWidth="0.5" opacity="0.15" fill="none" />
    </svg>
  );
}

export function KalashIcon({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="20" rx="8" ry="4" fill="currentColor" opacity="0.6" />
      <path d="M42 22 Q38 30 40 38 L60 38 Q62 30 58 22 Z" fill="currentColor" opacity="0.5" />
      <path d="M38 40 Q30 50 32 65 Q35 80 50 82 Q65 80 68 65 Q70 50 62 40 Z" fill="currentColor" opacity="0.7" />
      <ellipse cx="50" cy="40" rx="15" ry="3" fill="currentColor" opacity="0.4" />
      <path d="M50 15 Q48 8 52 5 Q55 2 50 0" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
}

export function SwastikaPattern({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.2">
        <path d="M35 20 L35 80 M35 35 L65 35 L65 55 M65 45 L80 45 M35 55 L20 55 M50 35 L50 20 M65 55 L65 80" />
      </g>
    </svg>
  );
}

export function DecorativeBorder({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 10 L150 10 M250 10 L400 10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M150 10 Q170 2 200 10 Q230 18 250 10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="200" cy="10" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="150" cy="10" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="250" cy="10" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
