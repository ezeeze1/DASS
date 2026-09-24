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
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-sm font-bold tracking-tight',
    md: 'text-base sm:text-lg font-bold tracking-tight',
    lg: 'text-xl sm:text-2xl font-bold tracking-tight',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Official School Crest / Logo Image */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 transition-transform hover:scale-105 duration-200 rounded-full overflow-hidden bg-white shadow-md ring-2 ring-amber-500/80 flex items-center justify-center p-0.5`}
      >
        <img
          src="https://i.ibb.co/BKvXd7jG/logo2.jpg"
          alt="Divine Group of Schools Logo"
          className="w-full h-full object-contain rounded-full"
          loading="eager"
        />
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
