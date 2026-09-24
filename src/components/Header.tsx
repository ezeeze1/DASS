import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { useWebsiteContent } from '../context/WebsiteContext';

interface HeaderProps {
  onOpenApplyModal: () => void;
  activeSection: string;
}

export default function Header({ onOpenApplyModal, activeSection }: HeaderProps) {
  const { content } = useWebsiteContent();
  const SCHOOL_INFO = content.schoolInfo;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT US', href: '#about', id: 'about' },
    { label: 'ACADEMICS', href: '#academics', id: 'academics' },
    { label: 'OUR SCHOOLS', href: '#schools', id: 'schools' },
    { label: 'FACILITIES', href: '#facilities', id: 'facilities' },
    { label: 'ADMISSIONS', href: '#admissions', id: 'admissions' },
    { label: 'GALLERY', href: '#gallery', id: 'gallery' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top institutional utility bar */}
      <div className="bg-navy-950 text-slate-300 text-xs border-b border-navy-800/60 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{SCHOOL_INFO.location}, {SCHOOL_INFO.state}, {SCHOOL_INFO.country}</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{SCHOOL_INFO.openingHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`tel:${SCHOOL_INFO.phones[0].replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{SCHOOL_INFO.phones[0]}</span>
            </a>
            <a
              href={`mailto:${SCHOOL_INFO.emails[0]}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{SCHOOL_INFO.emails[0]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-900/95 backdrop-blur-md shadow-lg shadow-black/20 py-2.5 border-b border-navy-800'
            : 'bg-navy-900 py-3.5 border-b border-navy-800/80'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
          >
            <Logo variant="light" size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-2 text-xs font-semibold tracking-wider transition-colors duration-200 relative group ${
                    isActive ? 'text-amber-400' : 'text-slate-200 hover:text-amber-300'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 transition-all duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Right Action Button (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenApplyModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider rounded shadow-md hover:shadow-amber-500/20 active:translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>APPLY FOR ADMISSION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenApplyModal}
              className="hidden sm:inline-flex md:hidden items-center px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded"
            >
              APPLY
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white hover:bg-navy-800 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-navy-950/98 backdrop-blur-md border-b border-navy-800 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`px-3 py-2.5 text-sm font-semibold rounded-md tracking-wider flex items-center justify-between ${
                      isActive
                        ? 'bg-navy-800 text-amber-400'
                        : 'text-slate-200 hover:bg-navy-800/50 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-navy-800/80 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenApplyModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm uppercase tracking-wider rounded shadow-md"
                >
                  <span>APPLY FOR ADMISSION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-xs text-slate-400 pt-2 space-y-1 text-center">
                  <p className="flex items-center justify-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Okene, Kogi State, Nigeria</span>
                  </p>
                  <p className="flex items-center justify-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>{SCHOOL_INFO.phones[0]}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
