import { useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { SEVEN_LIFE_IMAGES } from '../data/schoolData';
import { SevenLifeImage } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface SevenImageFeatureProps {
  onSelectImage: (image: { title: string; src: string; caption: string }) => void;
}

export default function SevenImageFeature({ onSelectImage }: SevenImageFeatureProps) {
  // Guarantee exact ordering 1 to 7
  const image1 = SEVEN_LIFE_IMAGES[0]; // School Building (large featured)
  const image2 = SEVEN_LIFE_IMAGES[1]; // Modern Classroom
  const image3 = SEVEN_LIFE_IMAGES[2]; // Students Learning
  const image4 = SEVEN_LIFE_IMAGES[3]; // Teachers and Students
  const image5 = SEVEN_LIFE_IMAGES[4]; // Science/Computer Laboratory
  const image6 = SEVEN_LIFE_IMAGES[5]; // Sports and Recreation
  const image7 = SEVEN_LIFE_IMAGES[6]; // School Events/Activities

  return (
    <section id="life-showcase" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Campus Experience & Student Growth</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight">
            LIFE AT DIVINE GROUP OF SCHOOLS
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Learning, growing, discovering and building a brighter future together.
          </p>
        </div>

        {/* 
          Desktop Asymmetric Showcase Layout:
          - Image 1: Large Featured Hero Card (spanning 2 columns / tall aspect ratio)
          - Images 2 & 3: Medium Cards
          - Images 4 & 5: Medium Cards
          - Images 6 & 7: Medium Cards
          Total: Exactly 7 images on homepage.
        */}
        <div className="space-y-6">
          {/* Top Row: Large Featured Image 1 + Pair of Medium Cards 2 & 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Image 1: Large Featured Campus Building */}
            <div className="lg:col-span-7">
              <ShowcaseCard
                image={image1}
                featured
                onClick={() => onSelectImage(image1)}
              />
            </div>

            {/* Images 2 & 3: Modern Classroom + Students Learning */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <ShowcaseCard
                image={image2}
                onClick={() => onSelectImage(image2)}
              />
              <ShowcaseCard
                image={image3}
                onClick={() => onSelectImage(image3)}
              />
            </div>
          </div>

          {/* Middle Row: Pair of Medium Cards 4 & 5 (Teachers and Students + Science Lab) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ShowcaseCard
              image={image4}
              onClick={() => onSelectImage(image4)}
            />
            <ShowcaseCard
              image={image5}
              onClick={() => onSelectImage(image5)}
            />
          </div>

          {/* Bottom Row: Pair of Medium Cards 6 & 7 (Sports & Recreation + School Events) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ShowcaseCard
              image={image6}
              onClick={() => onSelectImage(image6)}
            />
            <ShowcaseCard
              image={image7}
              onClick={() => onSelectImage(image7)}
            />
          </div>
        </div>

        {/* Quality assurance indicator */}
        <div className="mt-8 text-center text-xs text-slate-600">
          Showing all 7 core facets of student life at Divine Group of Schools, Okene.
        </div>
      </div>
    </section>
  );
}

interface ShowcaseCardProps {
  image: SevenLifeImage;
  featured?: boolean;
  onClick: () => void;
}

function ShowcaseCard({ image, featured = false, onClick }: ShowcaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative overflow-hidden rounded-2xl bg-navy-950 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
        featured ? 'min-h-[420px] lg:min-h-[520px] h-full flex flex-col justify-end' : 'min-h-[260px] sm:min-h-[280px] flex flex-col justify-end'
      }`}
    >
      {/* Background Image with Hover Zoom */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={image.src}
          alt={image.alt}
          title={image.title}
          category={image.category}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        {/* Permanent readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent" />
        {/* Subtle accent hover overlay */}
        <div className="absolute inset-0 bg-navy-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Top Badge: Category */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-navy-900/85 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-sm">
          <span>{image.category}</span>
        </span>
      </div>

      {/* Top Right Action: View Icon */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-8 h-8 rounded-full bg-amber-500 text-navy-950 flex items-center justify-center shadow-md">
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Content Card */}
      <div className="relative z-10 p-5 sm:p-6 text-left">
        <h3 className={`font-serif font-bold text-white transition-colors duration-200 ${
          featured ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl'
        }`}>
          {image.title}
        </h3>
        <p className="text-slate-200 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed font-normal">
          {image.caption}
        </p>
      </div>
    </div>
  );
}
