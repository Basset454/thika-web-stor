import React from 'react';

interface TrustLogoProps {
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds (black strokes), 'dark' is for dark backgrounds (white strokes)
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const TrustLogo: React.FC<TrustLogoProps> = ({
  variant = 'light',
  size = 'md',
  showText = true,
  className = '',
}) => {
  const isDarkBg = variant === 'dark';
  const mainColor = isDarkBg ? '#FFFFFF' : '#1E1E1E';
  const orangeColor = '#FF551A';

  const sizeClasses = {
    sm: {
      mark: 'w-8 h-8',
      title: 'text-lg',
      sub: 'text-[9px] tracking-widest',
    },
    md: {
      mark: 'w-10 h-10 md:w-11 md:h-11',
      title: 'text-xl md:text-2xl',
      sub: 'text-[10px] md:text-[11px] tracking-widest',
    },
    lg: {
      mark: 'w-14 h-14 md:w-16 md:h-16',
      title: 'text-2xl md:text-3xl',
      sub: 'text-xs tracking-widest',
    },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`} dir="rtl">
      {/* Distinctive Square-Kufi "ثقة" Sofa Mark */}
      <svg
        className={`${sizeClasses.mark} shrink-0`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* === BACKREST & ARMS: Square-Kufi geometric letterforms of "ثقة" in Charcoal / White === */}
        {/* Right armrest (outer frame) */}
        <rect x="8" y="28" width="12" height="42" rx="1.5" fill={mainColor} />
        {/* Left armrest (outer frame) */}
        <rect x="80" y="28" width="12" height="42" rx="1.5" fill={mainColor} />

        {/* Backrest upper horizontal lintel connecting the structure */}
        <rect x="8" y="28" width="84" height="10" rx="1" fill={mainColor} />

        {/* Square-Kufi internal calligraphy stems forming "ث - ق - ة" */}
        {/* Letter "ق" (Qaf loop) */}
        <path
          d="M26 38 H44 V58 H34 V48 H26 Z"
          fill={mainColor}
        />
        {/* Letter "ة" (Teh Marbuta loop) */}
        <path
          d="M56 38 H74 V58 H64 V48 H56 Z"
          fill={mainColor}
        />
        {/* Letter "ث" dots crown in Square-Kufi (centered atop the sofa backrest) */}
        <rect x="44" y="8" width="12" height="8" rx="1" fill={orangeColor} />
        <rect x="34" y="18" width="12" height="8" rx="1" fill={orangeColor} />
        <rect x="54" y="18" width="12" height="8" rx="1" fill={orangeColor} />

        {/* === SOFA SEAT / CUSHION PLINTH: Vibrant Brand Orange #FF551A === */}
        <rect x="14" y="60" width="72" height="14" rx="2" fill={orangeColor} />

        {/* Sofa base separator accent line */}
        <rect x="18" y="70" width="64" height="2" fill={isDarkBg ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)'} />

        {/* Sofa legs in Charcoal / White with Orange accent tips */}
        <rect x="22" y="74" width="8" height="12" rx="1" fill={mainColor} />
        <rect x="70" y="74" width="8" height="12" rx="1" fill={mainColor} />
        <rect x="22" y="83" width="8" height="3" rx="0.5" fill={orangeColor} />
        <rect x="70" y="83" width="8" height="3" rx="0.5" fill={orangeColor} />
      </svg>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-cairo font-bold ${sizeClasses.title} tracking-tight leading-none transition-colors ${
                isDarkBg ? 'text-white' : 'text-[#1E1E1E]'
              }`}
            >
              أثاث الثقة
            </span>
            {/* Vibrant orange accent dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF551A] inline-block mb-1" />
          </div>
          <span
            className={`font-cairo font-semibold ${sizeClasses.sub} leading-none mt-1 uppercase tracking-widest ${
              isDarkBg ? 'text-white/60' : 'text-[#757575]'
            }`}
            style={{ fontFeatureSettings: '"tnum" 1' }}
          >
            JIJEL 18
          </span>
        </div>
      )}
    </div>
  );
};
