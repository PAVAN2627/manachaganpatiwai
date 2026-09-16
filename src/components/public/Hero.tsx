import { Link } from 'react-router-dom';
import { Camera, ChevronRight } from 'lucide-react';
import { useSettings } from '@/lib/settings-context';
import { GaneshIcon } from '@/components/decorations';

/**
 * Hanging Temple Brass Bell SVG Component
 */
function HangingBell({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`pointer-events-none ${className}`} style={style}>
      <svg width="42" height="110" viewBox="0 0 42 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
        {/* Rope / Chain */}
        <line x1="21" y1="0" x2="21" y2="60" stroke="#b37f28" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Top Hook / Ring */}
        <circle cx="21" cy="62" r="4" stroke="#c88b2c" strokeWidth="2" fill="none" />
        {/* Bell Body */}
        <path
          d="M21 66 C15 67 11 74 10 82 C9 87 6 92 4 95 C14 97 28 97 38 95 C36 92 33 87 32 82 C31 74 27 67 21 66 Z"
          fill="url(#bellGrad)"
          stroke="#996018"
          strokeWidth="1.5"
        />
        {/* Bell Rim Bottom */}
        <ellipse cx="21" cy="95" rx="17" ry="4" fill="url(#bellRim)" stroke="#8c5310" strokeWidth="1.5" />
        {/* Bell Clapper */}
        <circle cx="21" cy="102" r="3.5" fill="#a46d1b" stroke="#774509" strokeWidth="1" />
        <line x1="21" y1="95" x2="21" y2="100" stroke="#774509" strokeWidth="1.5" />
        <defs>
          <linearGradient id="bellGrad" x1="4" y1="66" x2="38" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e9b959" />
            <stop offset="0.45" stopColor="#d19532" />
            <stop offset="1" stopColor="#966114" />
          </linearGradient>
          <linearGradient id="bellRim" x1="4" y1="95" x2="38" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c58a27" />
            <stop offset="0.5" stopColor="#f5ce75" />
            <stop offset="1" stopColor="#966114" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Traditional Brass Samai Lamp + Hibiscus & Modak Illustration
 */
function SamaiAndOfferings() {
  return (
    <div className="relative flex items-end justify-center pointer-events-none">
      {/* Traditional Multi-Tier Brass Samai Lamp */}
      <div className="relative -mr-3 z-10">
        <svg width="105" height="155" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Flame Glow */}
          <ellipse cx="50" cy="18" rx="15" ry="20" fill="url(#flameGlow)" className="animate-pulse" />
          {/* Main Flame */}
          <path
            d="M50 4 C48 10 43 16 43 22 C43 28 46 32 50 32 C54 32 57 28 57 22 C57 16 52 10 50 4 Z"
            fill="url(#flameGrad)"
            filter="drop-shadow(0 0 8px #f59e0b)"
          />
          {/* Inner Flame Core */}
          <path
            d="M50 12 C49 15 47 18 47 22 C47 25 48 27 50 27 C52 27 53 25 53 22 C53 18 51 15 50 12 Z"
            fill="#ffffff"
            opacity="0.95"
          />
          {/* Lamp Top Bowl */}
          <ellipse cx="50" cy="34" rx="20" ry="6" fill="#c98a28" stroke="#8c5812" strokeWidth="1.5" />
          <path d="M30 34 C30 42 70 42 70 34 Z" fill="url(#brassGrad)" stroke="#8c5812" strokeWidth="1.5" />
          {/* Center Pillar */}
          <path d="M47 42 L45 88 C40 90 40 98 44 100 L45 125 L43 135 L57 135 L55 125 L56 100 C60 98 60 90 55 88 L53 42 Z" fill="url(#brassGrad)" stroke="#8c5812" strokeWidth="1.5" />
          {/* Middle tier plate */}
          <ellipse cx="50" cy="92" rx="26" ry="6" fill="url(#brassGrad)" stroke="#8c5812" strokeWidth="1.5" />
          {/* Base of Samai */}
          <path d="M32 135 C32 144 20 148 18 150 L82 150 C80 148 68 144 68 135 Z" fill="url(#brassGrad)" stroke="#8c5812" strokeWidth="1.5" />
          <ellipse cx="50" cy="148" rx="34" ry="4" fill="#a46d1a" />
          <defs>
            <radialGradient id="flameGlow" cx="0.5" cy="0.5" r="0.5">
              <stop stopColor="#fde68a" stopOpacity="0.85" />
              <stop offset="0.6" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="flameGrad" x1="50" y1="4" x2="50" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.2" stopColor="#fef08a" />
              <stop offset="0.6" stopColor="#f97316" />
              <stop offset="1" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="brassGrad" x1="18" y1="34" x2="82" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f5ce75" />
              <stop offset="0.3" stopColor="#d99933" />
              <stop offset="0.7" stopColor="#b3761c" />
              <stop offset="1" stopColor="#7a4b08" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Red Hibiscus Flower (जास्वंद) */}
      <div className="relative -ml-2 z-20">
        <svg width="70" height="70" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Green leaves */}
          <path d="M12 48 C6 38 18 28 26 34 C24 44 18 48 12 48 Z" fill="#2d6a36" />
          <path d="M54 52 C64 44 56 30 46 36 C48 46 52 50 54 52 Z" fill="#22542a" />
          {/* 5 Petals */}
          <path d="M34 36 C24 20 44 14 36 28 Z" fill="#b91c1c" />
          <path d="M34 36 C18 28 16 46 28 42 Z" fill="#dc2626" />
          <path d="M34 36 C22 50 40 56 38 44 Z" fill="#991b1b" />
          <path d="M34 36 C48 50 56 36 44 34 Z" fill="#dc2626" />
          <path d="M34 36 C50 24 38 12 34 26 Z" fill="#ef4444" />
          {/* Golden Center & Stamen */}
          <circle cx="34" cy="36" r="4.5" fill="#7f1d1d" />
          <line x1="34" y1="36" x2="44" y2="20" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="44" cy="20" r="2.5" fill="#fbbf24" />
        </svg>
      </div>

      {/* Sweet Golden Modak (मोदक) */}
      <div className="relative -ml-1 z-20">
        <svg width="52" height="56" viewBox="0 0 50 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25 4 C24 10 12 28 10 38 C8 48 18 52 25 52 C32 52 42 48 40 38 C38 28 26 10 25 4 Z"
            fill="url(#modakGrad)"
            stroke="#a16207"
            strokeWidth="1.2"
          />
          {/* Modak ridges */}
          <path d="M25 6 Q18 26 16 48" stroke="#ca8a04" strokeWidth="1" opacity="0.6" fill="none" />
          <path d="M25 6 Q25 28 25 52" stroke="#ca8a04" strokeWidth="1" opacity="0.6" fill="none" />
          <path d="M25 6 Q32 26 34 48" stroke="#ca8a04" strokeWidth="1" opacity="0.6" fill="none" />
          <defs>
            <linearGradient id="modakGrad" x1="10" y1="6" x2="40" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="0.4" stopColor="#fde047" />
              <stop offset="0.8" stopColor="#eab308" />
              <stop offset="1" stopColor="#a16207" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/**
 * Improved Sacred Divine CSS Chakra with Official Logo in Center
 */
function DivineChakraWithLogo() {
  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] mx-auto aspect-square flex items-center justify-center select-none">

      {/* Layer 1: Radiant Golden Divine Halo (तेजोवलय) */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none blur-2xl opacity-60 animate-glow"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(220, 38, 38, 0.25) 45%, transparent 72%)',
        }}
      />

      {/* Layer 2: Majestic Outer Spinning Chakra (सुदर्शन चक्र / सुवर्ण चक्र) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full animate-spin-slow"
          style={{ animationDuration: '32s' }}
        >
          {/* Outer Sunburst Teeth & Flame Points (24 Flame Rays) */}
          {[...Array(24)].map((_, i) => (
            <g key={`flame-${i}`} transform={`rotate(${i * 15} 250 250)`}>
              {/* Flame Tip */}
              <path
                d="M246 16 C248 8 252 8 254 16 L258 50 C254 48 246 48 242 50 Z"
                fill="url(#chakraGold1)"
                stroke="#b45309"
                strokeWidth="1"
              />
              <circle cx="250" cy="22" r="3" fill="#dc2626" />
            </g>
          ))}

          {/* Outer Ring with Beaded Pearls */}
          <circle cx="250" cy="250" r="204" stroke="#ca8a04" strokeWidth="3" fill="none" />
          <circle cx="250" cy="250" r="196" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 4" fill="none" />

          {/* 16 Sacred Lotus Petal Arc Rim */}
          {[...Array(16)].map((_, i) => (
            <path
              key={`petal-${i}`}
              d="M250 56 C240 76 260 76 250 56 Z"
              fill="#d97706"
              stroke="#92400e"
              strokeWidth="1.5"
              transform={`rotate(${i * 22.5} 250 250)`}
            />
          ))}

          {/* Golden Spokes (आरे) reaching inwards */}
          {[...Array(24)].map((_, i) => (
            <line
              key={`spoke-${i}`}
              x1="250"
              y1="75"
              x2="250"
              y2="148"
              stroke="url(#spokeGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${i * 15} 250 250)`}
            />
          ))}

          <defs>
            <linearGradient id="chakraGold1" x1="242" y1="8" x2="258" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="0.5" stopColor="#eab308" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="spokeGrad" x1="250" y1="75" x2="250" y2="148" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde047" />
              <stop offset="1" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Layer 3: Secondary Counter-Rotating Inner Filigree Ring */}
      <div className="absolute inset-8 sm:inset-10 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full animate-spin-slow opacity-80"
          style={{ animationDuration: '22s', animationDirection: 'reverse' }}
        >
          {/* Inner Dashed Ring */}
          <circle cx="200" cy="200" r="142" stroke="#b45309" strokeWidth="2" strokeDasharray="6 6" fill="none" />
          <circle cx="200" cy="200" r="130" stroke="#ca8a04" strokeWidth="1.5" fill="none" />
          {/* Inner 12 Gems */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={`gem-${i}`}
              cx="200"
              cy="65"
              r="4"
              fill="#b91c1c"
              stroke="#fef08a"
              strokeWidth="1.5"
              transform={`rotate(${i * 30} 200 200)`}
            />
          ))}
        </svg>
      </div>

      {/* Layer 4: Central Golden Sanctum Housing the Official Logo */}
      <div className="relative z-20 w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 rounded-full bg-gradient-to-b from-[#fffef5] via-[#fffdf0] to-[#fbf2da] p-3 sm:p-4 shadow-[0_12px_40px_rgba(126,20,28,0.3)] border-4 border-golden flex items-center justify-center group transition-transform duration-500 hover:scale-105">
        {/* Inner Ornate Golden Ring */}
        <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-golden/60 pointer-events-none" />

        {/* Official Logo Image from Public Folder */}
        <img
          src="/waiganpatilogo.png"
          alt="श्री धुंडिविनायक मानाचा गणपती लोगो"
          className="w-full h-full object-contain rounded-full filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] group-hover:rotate-1 transition-transform duration-500"
          loading="eager"
        />
      </div>
    </div>
  );
}

export function Hero() {
  const { settings } = useSettings();

  return (
    <section className="relative min-h-screen bg-[#fbf7ee] overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col justify-between">

      {/* Decorative Botanical Branch at Bottom Left */}
      <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 opacity-25 pointer-events-none select-none z-0">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-golden">
          <path d="M-20 220 Q40 160 80 110 Q110 70 140 20" stroke="#c58a27" strokeWidth="2" fill="none" />
          <path d="M140 20 Q160 10 170 30 Q150 40 140 20 Z" fill="#d99933" />
          <path d="M110 70 Q140 60 145 80 Q120 90 110 70 Z" fill="#d99933" />
          <path d="M80 110 Q110 110 110 135 Q85 130 80 110 Z" fill="#d99933" />
          <path d="M50 145 Q80 155 75 180 Q50 170 50 145 Z" fill="#d99933" />
        </svg>
      </div>

      {/* Hanging Temple Brass Bells (घंटा) */}
      <HangingBell className="absolute top-20 left-4 sm:left-10 z-20 animate-float-slow hidden sm:block" />
      <HangingBell
        className="absolute top-20 left-1/2 -translate-x-12 z-20 animate-float hidden lg:block"
        style={{ animationDelay: '1.2s' }}
      />
      <HangingBell
        className="absolute top-24 left-1/2 translate-x-16 z-20 animate-float-slow hidden lg:block"
        style={{ animationDelay: '2.5s' }}
      />
      <HangingBell
        className="absolute top-20 right-6 sm:right-16 z-20 animate-float hidden sm:block"
        style={{ animationDelay: '0.8s' }}
      />

      {/* Main Two-Column Hero Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* Left Column: Brand Titles & Action CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 text-center lg:text-left space-y-4 sm:space-y-5">

            {/* Top Ornamental Ribbon: "— • ।। वाईचे ग्रामदैवत ।। • —" */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-golden font-devanagari-serif text-sm sm:text-base font-bold">
              <span className="text-golden/60 text-lg leading-none">—— •</span>
              <span className="tracking-widest uppercase text-golden">।। {settings.gram_daivata} ।।</span>
              <span className="text-golden/60 text-lg leading-none">• ——</span>
            </div>

            {/* Two-Tone Grand Heading: "श्री धुंडिविनायक" / "मानाचा गणपती" */}
            <div className="space-y-1">
              <h1 className="font-devanagari-serif font-black text-4xl sm:text-5xl md:text-6xl text-[#7e141c] tracking-tight leading-normal py-1">
                श्री धुंडिविनायक
              </h1>
              <h2 className="font-devanagari-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#b8761a] tracking-tight leading-normal py-1">
                मानाचा गणपती
              </h2>
            </div>

            {/* Subheading */}
            <p className="font-devanagari-serif font-bold text-lg sm:text-2xl text-dark-maroon/90 tracking-wide leading-normal">
              {settings.tagline}
            </p>

            {/* Establishment Pill Badge with Decorative Wings */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="text-golden/70 hidden sm:inline text-xl">❧</span>
              <div className="inline-flex items-center gap-2 px-6 sm:px-7 py-2 rounded-full bg-[#7e141c] text-cream font-devanagari-sans font-bold text-sm sm:text-base shadow-md border-2 border-golden/50">
                <span>स्थापना : {settings.establishment_year}</span>
              </div>
              <span className="text-golden/70 hidden sm:inline text-xl">☙</span>
            </div>

            {/* Devotional Motto */}
            <p className="font-devanagari-sans text-dark-maroon/80 text-sm sm:text-base font-medium pt-1">
              परंपरा, श्रद्धा आणि संस्कृतीचा अखंड वारसा
            </p>

            {/* 2 CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-3">
              <a
                href="#ganeshotsav"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('ganeshotsav')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#7e141c] hover:bg-[#600f15] text-cream font-devanagari-sans font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2.5 group"
              >
                {/* Mandir Icon */}
                <svg className="w-5 h-5 text-golden" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 6H9L12 2ZM12 6L17 11H7L12 6ZM5 11H19V13H5V11ZM6 13H8V21H6V13ZM11 13H13V16H11V13ZM11 18H13V21H11V18ZM16 13H18V21H16V13ZM4 21H20V23H4V21Z" />
                </svg>
                <span>गणपती बाप्पांचे दर्शन</span>
                <ChevronRight className="w-4 h-4 text-golden group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                to="/gallery"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#fbf7ee] hover:bg-golden/15 text-[#7e141c] border-2 border-golden font-devanagari-sans font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2.5 group"
              >
                <Camera className="w-4 h-4 text-golden" />
                <span>छायाचित्र दालन</span>
                <ChevronRight className="w-4 h-4 text-golden group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Divine Golden Chakra with Logo + Samai + Calligraphy */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center">

            {/* Calligraphic Right Header: "गणपती बाप्पा मोरया" */}
            <div className="absolute top-2 right-2 sm:right-6 text-right select-none pointer-events-none z-20">
              <div className="font-devanagari-serif font-extrabold text-2xl sm:text-3xl text-[#7e141c] leading-tight drop-shadow-sm">
                गणपती
              </div>
              <div className="font-devanagari-serif font-extrabold text-2xl sm:text-3xl text-[#7e141c] leading-tight drop-shadow-sm">
                बाप्पा
              </div>
              <div className="font-devanagari-serif font-extrabold text-2xl sm:text-3xl text-[#b8761a] leading-tight drop-shadow-sm">
                मोरया
              </div>
            </div>

            {/* Center: Divine Sacred Chakra Housing Official Logo */}
            <div className="relative w-full flex items-center justify-center">
              <DivineChakraWithLogo />
            </div>

            {/* Base: Samai Lamp + Hibiscus + Modak */}
            <div className="relative -mt-12 sm:-mt-16 z-20 flex justify-center w-full">
              <SamaiAndOfferings />
            </div>

            {/* Devotional Quote on Bottom Right */}
            <div className="mt-3 text-center sm:text-right w-full sm:pr-8">
              <p className="text-xs sm:text-sm font-devanagari-serif italic text-dark-maroon/80 font-medium leading-relaxed">
                “भक्तीचा दीप,<br />
                सद्भावाचा मार्ग,<br />
                एकतेची परंपरा...”
              </p>
              <div className="inline-flex items-center gap-1 text-golden text-xs mt-1">
                <span>—</span>
                <span>❖</span>
                <span>—</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards Row (4 Cards Matching Reference) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Card 1: स्थापना 1894 */}
          <div className="bg-[#fffef8] rounded-2xl p-4 sm:p-5 card-shadow border border-golden/30 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-golden/15 border border-golden/30 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-golden" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15 6H9L12 2ZM12 6L17 11H7L12 6ZM5 11H19V13H5V11ZM6 13H8V21H6V13ZM11 13H13V16H11V13ZM11 18H13V21H11V18ZM16 13H18V21H16V13ZM4 21H20V23H4V21Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-xs text-dark-maroon/60 font-devanagari-sans block">स्थापना</span>
              <span className="text-lg sm:text-xl font-devanagari-serif font-extrabold text-[#7e141c] block">
                {settings.establishment_year}
              </span>
              <div className="w-8 h-0.5 bg-golden/40 mt-1" />
            </div>
          </div>

          {/* Card 2: स्थान ब्राह्मणशाही, वाई */}
          <div className="bg-[#fffef8] rounded-2xl p-4 sm:p-5 card-shadow border border-golden/30 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-golden/15 border border-golden/30 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-golden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-xs text-dark-maroon/60 font-devanagari-sans block">स्थान</span>
              <span className="text-base sm:text-lg font-devanagari-serif font-extrabold text-[#7e141c] truncate block">
                {settings.location}
              </span>
              <div className="w-8 h-0.5 bg-golden/40 mt-1" />
            </div>
          </div>

          {/* Card 3: ओळख वाईचे ग्रामदैवत */}
          <div className="bg-[#fffef8] rounded-2xl p-4 sm:p-5 card-shadow border border-golden/30 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-golden/15 border border-golden/30 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-golden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-xs text-dark-maroon/60 font-devanagari-sans block">ओळख</span>
              <span className="text-base sm:text-lg font-devanagari-serif font-extrabold text-[#7e141c] truncate block">
                {settings.gram_daivata}
              </span>
              <div className="w-8 h-0.5 bg-golden/40 mt-1" />
            </div>
          </div>

          {/* Card 4: परंपरा मानाचा गणपती */}
          <div className="bg-[#fffef8] rounded-2xl p-4 sm:p-5 card-shadow border border-golden/30 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-golden/15 border border-golden/30 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-golden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22C12 22 7 18 7 12C7 8 12 4 12 4C12 4 17 8 17 12C17 18 12 22 12 22Z" />
                <path d="M12 22C12 22 4 18 2 12C0 7 5 7 7 10C9 13 12 22 12 22Z" />
                <path d="M12 22C12 22 20 18 22 12C24 7 19 7 17 10C15 13 12 22 12 22Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-xs text-dark-maroon/60 font-devanagari-sans block">परंपरा</span>
              <span className="text-base sm:text-lg font-devanagari-serif font-extrabold text-[#7e141c] truncate block">
                मानाचा गणपती
              </span>
              <div className="w-8 h-0.5 bg-golden/40 mt-1" />
            </div>
          </div>
        </div>

        {/* Bottom Ribbon */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3 text-xs sm:text-sm font-devanagari-serif text-golden font-bold">
          <span className="h-px w-12 sm:w-20 bg-golden/40" />
          <span className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            <span>।। श्रद्धा</span>
            <span>।। संस्कृती</span>
            <GaneshIcon className="w-4 h-4 text-[#7e141c] inline-block -mt-0.5" />
            <span>सेवा</span>
            <span>।। एकता ।।</span>
          </span>
          <span className="h-px w-12 sm:w-20 bg-golden/40" />
        </div>
      </div>
    </section>
  );
}
