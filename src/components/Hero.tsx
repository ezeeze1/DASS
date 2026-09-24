import { useState, useEffect, useCallback } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  MapPin,
  Award,
  BookCheck,
  Shield,
  Camera,
} from 'lucide-react';
import { SCHOOL_INFO, HOMEPAGE_FIVE_IMAGES } from '../data/schoolData';

interface HeroProps {
  onExploreClick: () => void;
  onAdmissionsClick: () => void;
}

const HERO_AUTOPLAY_DELAY = 5000; // 5 seconds per transitional image

export default function Hero({ onExploreClick, onAdmissionsClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const images = HOMEPAGE_FIVE_IMAGES;
  const totalSlides = images.length; // Exactly 5 images

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Automatic transition every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, HERO_AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-navy-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 
        5 TRANSITIONAL BACKGROUND IMAGES
        Smooth cross-fade and subtle pan/zoom effect across all 5 images
      */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Cinematic Dark Gradient Overlays balanced for clarity and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-900/65 to-navy-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      </div>

      {/* Floating Transition Nav Buttons (Left / Right) */}
      <button
        onClick={prevSlide}
        aria-label="Previous hero image"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-navy-900/70 hover:bg-amber-500 text-white hover:text-navy-950 border border-white/20 hover:border-amber-400 backdrop-blur-md items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next hero image"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-navy-900/70 hover:bg-amber-500 text-white hover:text-navy-950 border border-white/20 hover:border-amber-400 backdrop-blur-md items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 flex flex-col items-center text-center">
        {/* Location badge + Transitional image indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-navy-700 text-white text-xs sm:text-sm font-medium backdrop-blur-sm shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="text-white">Okene, Kogi State, Nigeria</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900/80 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-sm shadow-sm">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Image {currentSlide + 1} of {totalSlides}: {images[currentSlide].title}
            </span>
          </div>
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

        {/* 5-Slide Transitional Control Bar with Thumbnail Indicators */}
        <div className="mt-10 flex items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-full bg-navy-900/80 border border-slate-700/80 backdrop-blur-md">
          {images.map((img, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={img.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Switch to slide ${idx + 1}: ${img.title}`}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none ${
                  isActive
                    ? 'bg-amber-500 text-navy-950 shadow-md scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="text-[11px] font-bold">0{idx + 1}</span>
                {isActive && (
                  <span className="hidden sm:inline text-[11px] truncate max-w-[140px]">
                    {img.title.split('&')[0]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Key Values Quick Strip */}
        <div className="mt-10 pt-8 border-t border-slate-700/60 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-navy-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white text-xs font-bold uppercase tracking-wider">Academic Excellence</div>
              <div className="text-slate-400 text-xs mt-0.5">Foundational and advanced mastery</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-navy-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <BookCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white text-xs font-bold uppercase tracking-wider">Character & Values</div>
              <div className="text-slate-400 text-xs mt-0.5">Discipline, integrity & leadership</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-navy-900/60 border border-slate-800/80 backdrop-blur-sm">
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
