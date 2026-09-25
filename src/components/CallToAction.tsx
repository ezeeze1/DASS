import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';

interface CallToActionProps {
  onContactClick: () => void;
  onAdmissionsClick: () => void;
}

export default function CallToAction({
  onContactClick,
  onAdmissionsClick,
}: CallToActionProps) {
  const { content } = useWebsiteContent();
  const { cta, schoolInfo } = content;

  return (
    <section className="relative py-20 lg:py-24 bg-navy-950 text-white overflow-hidden">
      {/* Background Graphic Effects */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-navy-700/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{cta.badge}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
          {cta.title}
        </h2>

        <div className="w-20 h-1 bg-amber-500 mx-auto my-5 rounded-full" />

        <p className="text-slate-300 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
          "{cta.subtitle}"
        </p>

        {/* Required Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded shadow-lg shadow-amber-500/20 active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Phone className="w-4 h-4" />
            <span>CONTACT US</span>
          </button>

          <button
            onClick={onAdmissionsClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-navy-900 hover:bg-navy-850 text-white border border-amber-500/40 hover:border-amber-400 font-bold text-xs uppercase tracking-wider rounded shadow-md active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>{cta.primaryButtonText || 'ADMISSION INFORMATION'}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="text-slate-400">Passionate educator seeking an impactful teaching role?</span>
          <a
            href="#employment"
            className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4 decoration-amber-500/50"
          >
            <span>Explore Faculty Openings & Apply Online</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-slate-400 text-xs mt-4">
          {schoolInfo.name} · {schoolInfo.location}, {schoolInfo.state}, Nigeria
        </p>
      </div>
    </section>
  );
}
