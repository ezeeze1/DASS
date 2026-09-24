import { MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { useWebsiteContent } from '../context/WebsiteContext';

interface FooterProps {
  onNavClick: (href: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const { content } = useWebsiteContent();
  const SCHOOL_INFO = content.schoolInfo;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-navy-800/80">
          {/* Column 1: School Overview */}
          <div className="space-y-4">
            <Logo variant="light" size="md" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Divine Group of Schools provides a nurturing, disciplined learning environment focused on academic excellence, moral integrity and leadership in Okene, Kogi State, Nigeria.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block">
                Motto
              </span>
              <p className="text-xs italic text-slate-300 mt-0.5">
                "{SCHOOL_INFO.motto}"
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#home');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#about');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#academics"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#academics');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Academics
                </a>
              </li>
              <li>
                <a
                  href="#admissions"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#admissions');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Admissions
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#gallery');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#contact');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: School */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-3">
              School
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#schools"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#schools');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Our Schools
                </a>
              </li>
              <li>
                <a
                  href="#facilities"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#facilities');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Facilities
                </a>
              </li>
              <li>
                <a
                  href="#academics"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#academics');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Academic Programmes
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#news');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  News & Announcements
                </a>
              </li>
              <li>
                <a
                  href="#life-showcase"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#life-showcase');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Life at Divine Group
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-3">
              Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">{SCHOOL_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  {SCHOOL_INFO.phones.map((phone, idx) => (
                    <div key={idx}>
                      <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-amber-400">
                        {phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  {SCHOOL_INFO.emails.map((email, idx) => (
                    <div key={idx}>
                      <a href={`mailto:${email}`} className="hover:text-amber-400 break-all">
                        {email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-slate-400 text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.openingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Divine Group of Schools. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">Okene, Kogi State, Nigeria</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors focus:outline-none"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
