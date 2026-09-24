import {
  Calculator,
  BookOpen,
  FlaskConical,
  Cpu,
  Globe,
  Palette,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';

const iconMap = {
  Calculator,
  BookOpen,
  FlaskConical,
  Cpu,
  Globe,
  Palette,
  Activity,
};

export default function AcademicsSection() {
  const { content } = useWebsiteContent();
  const subjects = content.academicSubjects;
  const philosophy = content.academicPhilosophy;

  return (
    <section id="academics" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            Curriculum & Subjects
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mt-3">
            Academic Excellence
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Our instructional framework balances foundational literacy and numeracy with creative expression, scientific inquiry, and technological capability.
          </p>
        </div>

        {/* Academic Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subject) => {
            const Icon = iconMap[subject.iconName as keyof typeof iconMap] || BookOpen;

            return (
              <div
                key={subject.title}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-amber-400 hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-amber-400 flex items-center justify-center shadow-sm mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                    {subject.category}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-navy-900 tracking-tight mt-1">
                    {subject.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed font-normal">
                    {subject.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-navy-900 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Foundational & Practical Mastery</span>
                </div>
              </div>
            );
          })}

          {/* Academic Philosophy Feature Block */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/90 border-2 border-amber-300 text-black shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-black uppercase tracking-wider">
                {philosophy.badge}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-black tracking-tight mt-1">
                {philosophy.title}
              </h3>
              <p className="text-black text-xs sm:text-sm mt-3 leading-relaxed">
                {philosophy.description}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-amber-300/80 text-xs text-black font-semibold">
              {philosophy.footnote || `${content.schoolInfo.name} · Okene`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
