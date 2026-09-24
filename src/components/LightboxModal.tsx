import { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface LightboxModalProps {
  image: {
    title: string;
    src: string;
    caption: string;
  } | null;
  onClose: () => void;
}

export default function LightboxModal({ image, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (image) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-navy-900 rounded-2xl overflow-hidden shadow-2xl border border-navy-700 flex flex-col"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 bg-navy-950 border-b border-navy-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <ZoomIn className="w-4 h-4" />
            <span>Divine Group of Schools · Photo Showcase</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-navy-800 rounded-full transition-colors"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Frame */}
        <div className="relative max-h-[68vh] overflow-hidden bg-black flex items-center justify-center">
          <ImageWithFallback
            src={image.src}
            alt={image.title}
            title={image.title}
            className="max-h-[68vh] w-auto object-contain mx-auto"
          />
        </div>

        {/* Bottom Details */}
        <div className="p-5 sm:p-6 bg-navy-900 border-t border-navy-800">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
            {image.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            {image.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
