import { CheckCircle2, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface AboutSectionProps {
  onLearnMoreClick: () => void;
}

export default function AboutSection({ onLearnMoreClick }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Professional Image of Students / Academic Activity */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background framing */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-amber-500/30 bg-amber-50/50 -z-10" />
              
              <div className="overflow-hidden rounded-2xl shadow-xl border border-slate-200/80 bg-navy-950 aspect-[4/5]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                  alt="Teacher and students engaged in classroom instruction at Divine Group of Schools"
                  title="Dedicated Guidance & Instruction"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Institutional Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-navy-900 text-white p-4 sm:p-5 rounded-xl shadow-xl border border-amber-500/40 max-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-amber-300 font-bold">Location</div>
                    <div className="text-sm font-semibold text-white">Okene, Kogi State</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                  Committed to academic rigor and strong moral foundations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3.5 py-1 rounded-full border border-amber-300/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Institutional Overview</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Welcome to <span className="text-navy-900">Divine Group of Schools</span>
            </h2>

            <div className="w-20 h-1 bg-amber-500 rounded-full" />

            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                Divine Group of Schools is committed to providing quality education, nurturing character, and preparing students for responsible leadership and future opportunities. Located in the heart of Okene, Kogi State, our school serves as an inspiring learning sanctuary where every student is recognized as a unique individual with unlimited potential.
              </p>
              <p>
                We believe that education extends far beyond textbooks and examinations. Our dedicated educators instill foundational knowledge, independent thinking, ethical decision-making, and strong moral values, ensuring that our learners grow into confident, disciplined, and purposeful contributors to society.
              </p>
            </div>

            {/* Core Institutional Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Strong Academic Focus</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Comprehensive curricula designed for conceptual mastery and analytical depth.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Heart className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Character & Moral Integrity</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Nurturing respect, honesty, self-discipline, and compassion in every learner.</p>
                </div>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="pt-4">
              <button
                onClick={onLearnMoreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider rounded shadow-md hover:shadow-lg transition-all duration-200 active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
