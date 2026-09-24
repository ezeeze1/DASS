import { useState } from 'react';
import { ArrowRight, CheckCircle2, BookOpen, X, Sparkles } from 'lucide-react';
import { SCHOOL_LEVELS } from '../data/schoolData';
import { SchoolLevel } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface OurSchoolsProps {
  onApplyForAdmission: () => void;
}

export default function OurSchools({ onApplyForAdmission }: OurSchoolsProps) {
  const [selectedLevel, setSelectedLevel] = useState<SchoolLevel | null>(null);

  return (
    <section id="schools" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3.5 py-1 rounded-full border border-amber-300/60">
            Educational Divisions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mt-3">
            Our Schools
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Providing tailored academic and moral development across each essential stage of learning, from foundational early years to senior secondary education.
          </p>
        </div>

        {/* 3 School Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SCHOOL_LEVELS.map((level) => (
            <div
              key={level.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Image */}
              <div className="relative h-60 overflow-hidden bg-navy-950">
                <ImageWithFallback
                  src={level.image}
                  alt={level.name}
                  title={level.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                    {level.ageRange}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                    {level.name}
                  </h3>
                  <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mt-1">
                    {level.subtitle}
                  </div>
                  <p className="text-slate-600 text-sm mt-4 leading-relaxed font-normal">
                    {level.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-5 space-y-2">
                    {level.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learn More Button */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedLevel(level)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-900 hover:text-amber-600 transition-colors focus:outline-none focus-visible:underline"
                  >
                    <span>LEARN MORE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                  </button>

                  <button
                    onClick={onApplyForAdmission}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline decoration-amber-400"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Detail Modal */}
      {selectedLevel && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header with Image */}
            <div className="relative h-48 sm:h-56 bg-navy-950 shrink-0">
              <ImageWithFallback
                src={selectedLevel.image}
                alt={selectedLevel.name}
                title={selectedLevel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
              <button
                onClick={() => setSelectedLevel(null)}
                className="absolute top-4 right-4 p-2 bg-navy-900/80 text-white hover:bg-navy-800 rounded-full border border-white/20 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {selectedLevel.ageRange}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {selectedLevel.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Educational Focus</h4>
                <p className="text-slate-700 text-base leading-relaxed mt-2">
                  {selectedLevel.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                  Program Highlights & Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedLevel.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-800 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                Admissions for {selectedLevel.name} are currently open for prospective scholars in Okene, Kogi State. We welcome visits to our admissions office.
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedLevel(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedLevel(null);
                    onApplyForAdmission();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors"
                >
                  Apply for Admission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
