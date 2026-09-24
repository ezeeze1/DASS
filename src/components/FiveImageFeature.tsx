import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Maximize2,
  Sparkles,
  Camera,
  Layers,
} from 'lucide-react';
import { SevenLifeImage } from '../types';
import ImageWithFallback from './ImageWithFallback';
import { useWebsiteContent } from '../context/WebsiteContext';

interface FiveImageFeatureProps {
  onSelectImage: (image: { title: string; src: string; caption: string }) => void;
}

const AUTOPLAY_DURATION = 5000; // 5 seconds per image

export default function FiveImageFeature({ onSelectImage }: FiveImageFeatureProps) {
  const { content } = useWebsiteContent();
  const images = content.fiveImages;
  const total = images.length; // 5 images
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const activeImage = images[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Timer and progress tick for transitional display
  useEffect(() => {
    if (!isPlaying) return;

    const intervalStep = 50; // update progress every 50ms
    const stepIncrement = (intervalStep / AUTOPLAY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPlaying, goToNext]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section id="life-showcase" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200/80 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Campus Experience · 5 Core Pillars</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight">
            LIFE AT DIVINE GROUP OF SCHOOLS
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Explore 5 defining perspectives of learning, character building, academic excellence, and student community in Okene.
          </p>
        </div>

        {/* 
          TRANSITIONAL DISPLAY CONTAINER
          Holds 5 high-resolution images with smooth cross-fade, progress timer, and interactive controls
        */}
        <div
          className="relative bg-navy-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Visual Stage (holds all 5 images with smooth transition) */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden select-none">
            {images.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={img.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    isActive
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  <ImageWithFallback
                    src={img.src}
                    alt={img.alt}
                    title={img.title}
                    category={img.category}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Gradient overlays for contrast and readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-navy-950/40" />
                </div>
              );
            })}

            {/* Top Bar on Stage: Counter, Category, and Action Buttons */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex items-center justify-between pointer-events-auto">
              {/* Category Pill */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-900/90 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-lg">
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeImage.category}</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/20">
                  Image {currentIndex + 1} of {total}
                </span>
              </div>

              {/* Action Buttons: Play/Pause, Fullscreen Lightbox */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-medium"
                  title={isPlaying ? 'Pause automatic transition' : 'Start automatic transition'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden md:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="hidden md:inline">Play</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onSelectImage(activeImage)}
                  aria-label="View enlarged photo"
                  className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1.5 shadow-lg shadow-amber-500/30"
                  title="Open in full-screen Lightbox"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Enlarge</span>
                </button>
              </div>
            </div>

            {/* Left / Right Navigational Arrows */}
            <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-4 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                aria-label="Previous slide"
                className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-navy-950/70 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/20 hover:border-amber-400 backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next slide"
                className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-navy-950/70 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/20 hover:border-amber-400 backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 z-20 p-5 sm:p-8 text-left bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent pointer-events-auto">
              <div className="max-w-3xl">
                <div className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                  <span>Image 0{currentIndex + 1} / 0{total}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-slate-300 font-normal">Transitional Display</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                  {activeImage.title}
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm lg:text-base mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl font-normal">
                  {activeImage.caption}
                </p>
              </div>
            </div>

            {/* Smooth Countdown Progress Bar */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 
            5-THUMBNAIL INTERACTIVE SELECTOR DOCK
            Shows all 5 images simultaneously so visitors can switch or preview with ease
          */}
          <div className="p-4 sm:p-6 bg-navy-900 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-medium">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>5 Featured Campus Perspectives (Click to transition)</span>
              </div>
              <span className="hidden sm:inline text-slate-400">
                Auto-advances every 5s · Hover to pause
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {images.map((img, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={img.id}
                    onClick={() => goToIndex(idx)}
                    className={`group relative flex flex-col text-left rounded-xl overflow-hidden transition-all duration-300 p-1 sm:p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isSelected
                        ? 'bg-navy-800 ring-2 ring-amber-400 shadow-lg scale-102 sm:scale-105'
                        : 'bg-navy-950/60 hover:bg-navy-800/80 border border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-navy-950">
                      <ImageWithFallback
                        src={img.src}
                        alt={img.alt}
                        title={img.title}
                        category={img.category}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Active Indicator Overlay */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/20 ring-1 ring-inset ring-amber-400/50" />
                      )}
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-navy-950/80 text-white backdrop-blur-sm">
                        0{idx + 1}
                      </div>
                    </div>

                    {/* Short Caption Label */}
                    <div className="mt-1 sm:mt-1.5 px-0.5 hidden sm:block">
                      <div
                        className={`text-[11px] font-bold line-clamp-1 transition-colors ${
                          isSelected ? 'text-amber-400' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {img.title}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {img.category}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quality assurance indicator */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            Holding 5 primary photographic perspectives of Divine Group of Schools, Okene.
          </div>
          <div className="flex items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-amber-500'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
