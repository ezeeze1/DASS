import {
  GraduationCap,
  HeartHandshake,
  Users,
  Laptop,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { WHY_CHOOSE_US_CARDS } from '../data/schoolData';

const iconMap = {
  GraduationCap,
  HeartHandshake,
  Users,
  Laptop,
  ShieldCheck,
  Award,
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            Institutional Values
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mt-3">
            Why Choose Divine Group of Schools?
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            We provide a structured, caring environment where academic focus meets character formation and holistic student development.
          </p>
        </div>

        {/* 6 Elegant Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_CARDS.map((card, idx) => {
            const Icon = iconMap[card.iconName as keyof typeof iconMap] || Award;

            return (
              <div
                key={card.id}
                className="group relative p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Subtle top indicator bar */}
                <div className="w-12 h-1 bg-slate-200 group-hover:bg-amber-500 rounded-full transition-colors duration-300 mb-6" />

                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-navy-900 text-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 mb-6">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-navy-900 tracking-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3 font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Pillar {idx + 1} of 6</span>
                  <span className="text-amber-600 group-hover:translate-x-1 transition-transform duration-200">
                    Excellence & Values →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
