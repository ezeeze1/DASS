import { ArrowRight, PhoneCall, FileText, CheckCircle2, Calendar, ClipboardCheck, ArrowDown } from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';
import StudentAdmissionForm from './StudentAdmissionForm';

interface AdmissionsSectionProps {
  onOpenApplyModal: () => void;
  onContactClick: () => void;
}

export default function AdmissionsSection({
  onOpenApplyModal,
  onContactClick,
}: AdmissionsSectionProps) {
  const { content } = useWebsiteContent();
  const { admissions, schoolInfo } = content;

  const scrollToInlineForm = () => {
    const el = document.getElementById('admission-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="admissions" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Block */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100/60 rounded-3xl p-8 sm:p-12 lg:p-16 text-black shadow-xl relative overflow-hidden border border-amber-200">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-950 text-white border border-navy-700 shadow-md mb-4">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span className="text-white">{admissions.badge}</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight uppercase leading-tight">
              {admissions.headline}
            </h2>

            <div className="w-20 h-1 bg-amber-500 my-5 rounded-full" />

            <p className="text-black text-base sm:text-xl font-medium leading-relaxed">
              "{admissions.quote}"
            </p>

            <p className="text-black text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
              {admissions.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={scrollToInlineForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 cursor-pointer"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>FILL APPLICATION FORM BELOW</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenApplyModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-300 shadow-sm active:translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-600" />
                <span>POPUP APPLICATION MODAL</span>
              </button>

              <button
                onClick={onContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-navy-950 hover:bg-navy-900 text-white border border-navy-800 hover:border-amber-500 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>CONTACT ADMISSIONS DESK</span>
              </button>
            </div>
          </div>
        </div>

        {/* EMBEDDED STUDENT ADMISSION FORM DIRECTLY ON THE ADMISSION PAGE */}
        <div id="admission-form" className="mt-14 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Direct Online Enrollment
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight mt-2">
              Apply for Student Admission
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Interested parents and guardians can enroll candidates directly through our digital form below.
            </p>
          </div>

          <StudentAdmissionForm />
        </div>

        {/* 4-Step Admission Procedure */}
        <div className="mt-20">
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
            {admissions.steps.map((step) => (
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
                  Our admissions office in Okene is open {schoolInfo.openingHours}.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={`tel:${(schoolInfo.phones[0] || '').replace(/[^0-9+]/g, '')}`}
                className="w-full md:w-auto text-center px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                Call: {schoolInfo.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
