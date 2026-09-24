import { ArrowRight, PhoneCall, FileText, CheckCircle2, Calendar, ClipboardCheck } from 'lucide-react';
import { ADMISSION_STEPS, SCHOOL_INFO } from '../data/schoolData';

interface AdmissionsSectionProps {
  onOpenApplyModal: () => void;
  onContactClick: () => void;
}

export default function AdmissionsSection({
  onOpenApplyModal,
  onContactClick,
}: AdmissionsSectionProps) {
  return (
    <section id="admissions" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Block */}
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden border border-navy-800">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>Enrollment Open · Okene, Kogi State</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              START YOUR CHILD'S JOURNEY WITH US
            </h2>

            <div className="w-20 h-1 bg-amber-500 my-5 rounded-full" />

            <p className="text-slate-200 text-base sm:text-xl font-normal leading-relaxed">
              "Give your child an environment where learning, character and personal development can flourish."
            </p>

            <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
              We welcome prospective families to experience our campus, consult with our educational coordinators, and register their wards for Creche, Primary, and Secondary sections.
            </p>

            {/* Required Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenApplyModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded shadow-lg shadow-amber-500/20 active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>ADMISSION INFORMATION</span>
              </button>

              <button
                onClick={onContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-navy-800 hover:bg-navy-700 text-white border border-slate-600 hover:border-amber-400 font-bold text-xs uppercase tracking-wider rounded shadow-md active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>CONTACT THE SCHOOL</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Step Admission Procedure */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Admission Process
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight mt-2">
              Four Straightforward Steps to Enrollment
            </h3>
            <p className="text-slate-600 text-sm mt-2 font-normal">
              A transparent, supportive process designed to welcome new scholars warmly into our community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADMISSION_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-amber-400 font-serif font-extrabold text-lg flex items-center justify-center shadow-sm mb-4">
                    {step.step}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-navy-900 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Step {step.step} Procedure</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Help Card */}
          <div className="mt-10 p-6 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-950">Have Admissions Questions?</h4>
                <p className="text-xs text-slate-700 mt-0.5">
                  Our admissions office in Okene is open Monday through Friday, 7:30 AM – 4:00 PM.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={`tel:${SCHOOL_INFO.phones[0].replace(/[^0-9+]/g, '')}`}
                className="w-full md:w-auto text-center px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                Call: {SCHOOL_INFO.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
