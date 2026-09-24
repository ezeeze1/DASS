import { useState, useEffect, useCallback } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  Award,
  BookCheck,
  Shield,
} from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';

interface HeroProps {
  onExploreClick: () => void;
  onAdmissionsClick: () => void;
}

const HERO_AUTOPLAY_DELAY = 5000; // 5 seconds per transitional image

export default function Hero({ onExploreClick, onAdmissionsClick }: HeroProps) {
  const { content } = useWebsiteContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const images = content.fiveImages;
  const schoolInfo = content.schoolInfo;
  const totalSlides = images.length;

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
        {/* Address bar and Image bar hidden on the home page screen as requested */}

        {/* Hero Title: Entire heading is pure white */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight sm:leading-tight max-w-5xl drop-shadow-md">
          WELCOME TO <span className="text-white underline decoration-white/60 decoration-4 underline-offset-8">{schoolInfo.name}</span>
        </h1>

        {/* Tagline & Supporting Narrative with solid black text in elegant high-contrast panel */}
        <div className="mt-8 max-w-3xl bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-2xl border border-white/80">
          <p className="font-serif italic text-lg sm:text-2xl text-black font-bold">
            "{schoolInfo.tagline}"
          </p>
          <p className="text-black text-base sm:text-lg font-medium mt-3 leading-relaxed text-balance">
            {schoolInfo.heroSupportingText}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white hover:bg-slate-100 text-black font-bold text-sm tracking-wider uppercase rounded shadow-lg active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white border border-slate-200"
          >
            <Compass className="w-4 h-4 text-black" />
            <span className="text-black">EXPLORE OUR SCHOOL</span>
          </button>

          <button
            onClick={onAdmissionsClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm tracking-wider uppercase rounded shadow-lg active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <FileText className="w-4 h-4 text-white" />
            <span className="text-white">APPLY FOR ADMISSION</span>
          </button>
        </div>

        {/* Image bar hidden as requested */}

        {/* Key Values Quick Strip with crisp black text on high-contrast cards */}
        <div className="mt-10 pt-4 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/95 border border-white shadow-lg backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-black flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="text-black text-xs font-bold uppercase tracking-wider">Academic Excellence</div>
              <div className="text-black text-xs mt-0.5 font-medium">Foundational and advanced mastery</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/95 border border-white shadow-lg backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-black flex items-center justify-center shrink-0">
              <BookCheck className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="text-black text-xs font-bold uppercase tracking-wider">Character & Values</div>
              <div className="text-black text-xs mt-0.5 font-medium">Discipline, integrity & leadership</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/95 border border-white shadow-lg backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-black flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="text-black text-xs font-bold uppercase tracking-wider">Safe & Nurturing</div>
              <div className="text-black text-xs mt-0.5 font-medium">Secure, serene learning grounds</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <button
        onClick={onExploreClick}
        aria-label="Scroll down to explore school"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-black bg-white/90 px-3 py-1 rounded-full shadow-md hover:bg-white transition-colors focus:outline-none"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold text-black">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-black" />
      </button>
    </section>
  );
}
