import { useState } from 'react';
import { School, ImageOff } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  title?: string;
  category?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  loading = 'lazy',
  title,
  category,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${containerClassName}`}>
      {/* Loading placeholder skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
          <School className="w-8 h-8 text-amber-500/40" />
        </div>
      )}

      {hasError ? (
        <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-navy-900 to-navy-800 flex flex-col items-center justify-center p-6 text-center text-slate-200">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
            <School className="w-6 h-6" />
          </div>
          {category && <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">{category}</span>}
          <h4 className="text-sm font-semibold text-white max-w-xs">{title || alt}</h4>
          <p className="text-xs text-slate-400 mt-1">Divine Group of Schools · Okene</p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
