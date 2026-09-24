import { Quote } from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';

export default function TestimonialsSection() {
  const { content } = useWebsiteContent();
  const testimonials = content.testimonials;

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            Parent Feedback & Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mt-3">
            Voices from Our Community
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Reflecting on the supportive academic environment, character discipline, and caring teacher mentorship at {content.schoolInfo.name}.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-amber-400 hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6" />
                </div>

                {/* Quote text */}
                <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="mt-8 pt-5 border-t border-slate-200/80">
                <div className="font-serif font-bold text-navy-900 text-sm">
                  {t.role}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {t.note}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Notice Note */}
        <div className="mt-10 text-center text-xs text-slate-500 max-w-lg mx-auto">
          Testimonials representing parent perspectives on school environment and character development.
        </div>
      </div>
    </section>
  );
}
