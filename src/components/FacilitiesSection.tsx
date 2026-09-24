import { CheckCircle2, Building2 } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { useWebsiteContent } from '../context/WebsiteContext';

interface FacilitiesSectionProps {
  onSelectImage: (image: { title: string; src: string; caption: string }) => void;
}

export default function FacilitiesSection({ onSelectImage }: FacilitiesSectionProps) {
  const { content } = useWebsiteContent();
  const facilitiesList = content.facilities;
  return (
    <section id="facilities" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3.5 py-1 rounded-full border border-amber-300/60">
            Campus Infrastructure
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mt-3">
            World-Class Learning Facilities
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Designed to stimulate curiosity, ensure safety, and support balanced intellectual and physical development.
          </p>
        </div>

        {/* 6 Facilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilitiesList.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col group"
            >
              {/* Facility Image with subtle hover zoom */}
              <div
                onClick={() =>
                  onSelectImage({
                    title: facility.title,
                    src: facility.image,
                    caption: facility.description,
                  })
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectImage({
                      title: facility.title,
                      src: facility.image,
                      caption: facility.description,
                    });
                  }
                }}
                className="relative h-56 overflow-hidden bg-navy-950 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <ImageWithFallback
                  src={facility.image}
                  alt={facility.title}
                  title={facility.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-navy-900/80 backdrop-blur-sm text-amber-300 text-xs font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Campus Facility</span>
                  </span>
                </div>
              </div>

              {/* Facility Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy-900 tracking-tight">
                    {facility.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed font-normal">
                    {facility.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-5 space-y-2">
                    {facility.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Okene Campus</span>
                  <span className="text-navy-900 font-semibold group-hover:text-amber-600 transition-colors">
                    Click photo to enlarge
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
