import { ChevronDown, Compass, FileText, MapPin, Award, BookCheck, Shield } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface HeroProps {
  onExploreClick: () => void;
  onAdmissionsClick: () => void;
}

export default function Hero({ onExploreClick, onAdmissionsClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-navy-950"
    >
      {/* Background High-Quality Campus Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85"
          alt="Divine Group of Schools campus building"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-[subtle-zoom_20s_infinite_alternate]"
        />
        {/* Subtle Dark Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-950/90" />
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center">
        {/* Location badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium backdrop-blur-sm mb-6 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Okene, Kogi State, Nigeria</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight sm:leading-tight max-w-5xl">
          WELCOME TO <span className="text-amber-400 underline decoration-amber-500/50 decoration-4 underline-offset-8">DIVINE GROUP OF SCHOOLS</span>
        </h1>

        {/* Tagline / Subtitle */}
        <p className="font-serif italic text-lg sm:text-2xl text-amber-200/90 mt-4 sm:mt-5 max-w-3xl">
          "{SCHOOL_INFO.tagline}"
        </p>

        {/* Supporting text */}
        <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal max-w-3xl mt-6 leading-relaxed text-balance">
          {SCHOOL_INFO.heroSupportingText}
        </p>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wider uppercase rounded shadow-lg shadow-amber-500/20 active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE OUR SCHOOL</span>
          </button>

          <button
            onClick={onAdmissionsClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-navy-800/90 hover:bg-navy-700 text-white border border-amber-500/40 hover:border-amber-400 font-bold text-sm tracking-wider uppercase rounded shadow-lg backdrop-blur-sm active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>ADMISSION INFORMATION</span>
          </button>
        </div>

        {/* Key Values Quick Strip */}
        <div className="mt-14 pt-8 border-t border-slate-700/60 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-navy-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white text-xs font-bold uppercase tracking-wider">Academic Excellence</div>
              <div className="text-slate-400 text-xs mt-0.5">Foundational and advanced mastery</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-navy-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <BookCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white text-xs font-bold uppercase tracking-wider">Character & Values</div>
              <div className="text-slate-400 text-xs mt-0.5">Discipline, integrity & leadership</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-navy-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white text-xs font-bold uppercase tracking-wider">Safe & Nurturing</div>
              <div className="text-slate-400 text-xs mt-0.5">Secure, serene learning grounds</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <button
        onClick={onExploreClick}
        aria-label="Scroll down to explore school"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors focus:outline-none"
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
      </button>
    </section>
  );
}
