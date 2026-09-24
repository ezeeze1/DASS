import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  // Clean phone number format for WhatsApp link: 2348038924110
  const whatsappNumber = '2348038924110';
  const message = encodeURIComponent(
    'Hello Divine Group of Schools, I would like to inquire about admissions, enrollment, and school programs.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      {/* Optional contextual teaser tooltip that can be dismissed */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-navy-950 text-white text-xs px-3.5 py-2 rounded-xl shadow-xl border border-navy-700/80 mb-1 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-white">Have questions?</p>
            <p className="text-[11px] text-slate-300">Chat with admissions on WhatsApp</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors ml-1"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Hovering Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Divine Group of Schools on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:shadow-[0_10px_25px_-5px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
      >
        {/* Soft glowing radar pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75 duration-1000" />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 sm:w-9 sm:h-9 fill-current relative z-10 drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Small Online Indicator Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full z-20" />
      </a>
    </div>
  );
}
