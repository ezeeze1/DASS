interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function Logo({
  variant = 'light',
  size = 'md',
  showSubtitle = true,
}: LogoProps) {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-sm font-bold tracking-tight',
    md: 'text-base sm:text-lg font-bold tracking-tight',
    lg: 'text-xl sm:text-2xl font-bold tracking-tight',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Institutional Crest SVG */}
      <div className={`relative ${iconSizes[size]} shrink-0 transition-transform hover:scale-105 duration-200`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield Outer with Golden Border */}
          <path
            d="M50 8 C68 8 88 16 88 32 C88 64 50 92 50 92 C50 92 12 64 12 32 C12 16 32 8 50 8 Z"
            fill={isLight ? '#0F2942' : '#071727'}
            stroke="#D97706"
            strokeWidth="3.5"
          />
          {/* Inner Golden Shield Outline */}
          <path
            d="M50 15 C64 15 80 22 80 34 C80 58 50 82 50 82 C50 82 20 58 20 34 C20 22 36 15 50 15 Z"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          {/* Open Book of Knowledge */}
          <path
            d="M32 46 C38 43 45 43 50 46 C55 43 62 43 68 46 L68 62 C62 59 55 59 50 62 C45 59 38 59 32 62 Z"
            fill="#FEF3C7"
          />
          <path
            d="M50 46 L50 62"
            stroke="#0F2942"
            strokeWidth="1.5"
          />
          <path
            d="M36 50 C41 48 46 48 48 50"
            stroke="#0F2942"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M52 50 C54 48 59 48 64 50"
            stroke="#0F2942"
            strokeWidth="1"
            strokeLinecap="round"
          />
          {/* Flaming Torch of Excellence at the Top */}
          <path
            d="M50 22 C52 26 55 28 50 34 C45 28 48 26 50 22 Z"
            fill="#F59E0B"
          />
          <path
            d="M48 34 L52 34 L51 40 L49 40 Z"
            fill="#D97706"
          />
          {/* Star Accents */}
          <circle cx="34" cy="33" r="2" fill="#F59E0B" />
          <circle cx="66" cy="33" r="2" fill="#F59E0B" />
        </svg>
      </div>

      {/* Institutional Typography */}
      <div className="flex flex-col text-left leading-tight">
        <span
          className={`font-serif uppercase ${titleSizes[size]} ${
            isLight ? 'text-white' : 'text-slate-900'
          }`}
        >
          DIVINE GROUP <span className="text-amber-500">OF SCHOOLS</span>
        </span>
        {showSubtitle && (
          <span
            className={`text-xs tracking-wider uppercase font-medium ${
              isLight ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Okene · Kogi State · Nigeria
          </span>
        )}
      </div>
    </div>
  );
}
