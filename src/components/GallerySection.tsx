import { useState } from 'react';
import { Eye, Images, Filter } from 'lucide-react';
import { GalleryItem } from '../types';
import ImageWithFallback from './ImageWithFallback';
import { useWebsiteContent } from '../context/WebsiteContext';

interface GallerySectionProps {
  onSelectImage: (image: { title: string; src: string; caption: string }) => void;
}

type CategoryFilter = 'All' | 'School Life' | 'Academics' | 'Sports' | 'Events' | 'Facilities' | string;

export default function GallerySection({ onSelectImage }: GallerySectionProps) {
  const { content } = useWebsiteContent();
  const galleryItems = content.gallery;
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const categories: CategoryFilter[] = [
    'All',
    'School Life',
    'Academics',
    'Sports',
    'Events',
    'Facilities',
  ];

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3.5 py-1 rounded-full border border-amber-300/60">
            School Moments & Highlights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mt-3">
            Campus Gallery
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Explore authentic moments of discovery, sportsmanship, academic engagement, and community spirit across our campus.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isSelected
                    ? 'bg-navy-900 text-amber-400 shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                onSelectImage({
                  title: item.title,
                  src: item.image,
                  caption: item.caption,
                })
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectImage({
                    title: item.title,
                    src: item.image,
                    caption: item.caption,
                  });
                }
              }}
              className="group relative overflow-hidden rounded-2xl bg-navy-950 shadow-sm hover:shadow-xl border border-slate-200 cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 aspect-[4/3]"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                title={item.title}
                category={item.category}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Tag */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-navy-900/80 backdrop-blur-sm text-amber-300 border border-amber-500/30">
                  {item.category}
                </span>
              </div>

              {/* View Icon */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
                <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-300 text-xs mt-1 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Images className="w-4 h-4 text-amber-600" />
          <span>Showing {filteredItems.length} photographs from campus activities and academic life in Okene</span>
        </div>
      </div>
    </section>
  );
}
