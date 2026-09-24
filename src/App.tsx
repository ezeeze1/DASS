import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FiveImageFeature from './components/FiveImageFeature';
import AboutSection from './components/AboutSection';
import WhyChooseUs from './components/WhyChooseUs';
import OurSchools from './components/OurSchools';
import AcademicsSection from './components/AcademicsSection';
import FacilitiesSection from './components/FacilitiesSection';
import AdmissionsSection from './components/AdmissionsSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import NewsSection from './components/NewsSection';
import CallToAction from './components/CallToAction';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdmissionModal from './components/AdmissionModal';
import LightboxModal from './components/LightboxModal';
import WhatsAppButton from './components/WhatsAppButton';
import { WebsiteProvider, useWebsiteContent } from './context/WebsiteContext';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminBar from './components/admin/AdminBar';
import { Edit3 } from 'lucide-react';

function MainSite() {
  const { isAdmin, isLiveEditMode } = useWebsiteContent();
  const [currentHash, setCurrentHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );
  const [selectedAdminTab, setSelectedAdminTab] = useState<any>('info');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<{
    title: string;
    src: string;
    caption: string;
  } | null>(null);

  const [activeSection, setActiveSection] = useState('home');

  // Track hash changes (e.g. #admin, browser back/forward, manual hash updates)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentHash(hash);
      // Check if hash has a sub-tab like #admin/gallery or #admin?tab=gallery
      if (hash.startsWith('#admin/')) {
        const sub = hash.replace('#admin/', '');
        setSelectedAdminTab(sub);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check on load
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track active section for nav highlight
  useEffect(() => {
    if (currentHash.startsWith('#admin')) return;

    const handleScroll = () => {
      const sections = [
        'home',
        'life-showcase',
        'about',
        'why-choose-us',
        'schools',
        'academics',
        'facilities',
        'admissions',
        'gallery',
        'testimonials',
        'news',
        'contact',
      ];

      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentHash]);

  const scrollToSection = (id: string) => {
    const cleanId = id.replace('#', '');
    const element = document.getElementById(cleanId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToPublicSite = () => {
    window.location.hash = '';
    setCurrentHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = (tab: string = 'info') => {
    setSelectedAdminTab(tab);
    window.location.hash = tab === 'info' ? '#admin' : `#admin/${tab}`;
    setCurrentHash('#admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CHECK IF ADMIN PAGE IS REQUESTED VIA /#admin
  const isAdminView = currentHash === '#admin' || currentHash.startsWith('#admin');

  if (isAdminView) {
    if (!isAdmin) {
      return <AdminLogin onBackToWebsite={navigateToPublicSite} />;
    }
    return (
      <AdminDashboard
        onReturnToWebsite={navigateToPublicSite}
        defaultTab={selectedAdminTab}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-black flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-950">
      {/* Top Floating Admin Status Bar when logged in */}
      <AdminBar onOpenAdmin={() => navigateToAdmin('info')} />

      {/* Sticky Header with Navigation */}
      <Header
        onOpenApplyModal={() => setIsApplyModalOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Full-Width Homepage Hero */}
        <div className="relative group/hero">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('fiveImages')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Hero & 5 Images</span>
            </button>
          )}
          <Hero
            onExploreClick={() => scrollToSection('life-showcase')}
            onAdmissionsClick={() => scrollToSection('admissions')}
          />
        </div>

        {/* 
          FIVE-IMAGE HOMEPAGE FEATURE
          Prominently holds 5 core school images in an interactive transitional display
        */}
        <div className="relative group/five">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('fiveImages')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit 5 Transitional Images</span>
            </button>
          )}
          <FiveImageFeature
            onSelectImage={(img) => setSelectedLightboxImage(img)}
          />
        </div>

        {/* Welcome / About Section */}
        <div className="relative group/about">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('about')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit About & Teachers</span>
            </button>
          )}
          <AboutSection
            onLearnMoreClick={() => scrollToSection('schools')}
          />
        </div>

        {/* Why Choose Us: 6 Elegant Feature Cards */}
        <div className="relative group/why">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('whyChooseUs')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Why Choose Us</span>
            </button>
          )}
          <WhyChooseUs />
        </div>

        {/* Our Schools: Creche/Early Years, Primary, Secondary */}
        <div className="relative group/levels">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('levels')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit School Levels</span>
            </button>
          )}
          <OurSchools
            onApplyForAdmission={() => setIsApplyModalOpen(true)}
          />
        </div>

        {/* Academic Excellence Section */}
        <div className="relative group/academics">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('academics')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Academics & Subjects</span>
            </button>
          )}
          <AcademicsSection />
        </div>

        {/* World-Class Facilities Section */}
        <div className="relative group/facilities">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('facilities')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Facilities</span>
            </button>
          )}
          <FacilitiesSection
            onSelectImage={(img) => setSelectedLightboxImage(img)}
          />
        </div>

        {/* Admissions Section */}
        <div className="relative group/admissions">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('admissions')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Admissions Info & Steps</span>
            </button>
          )}
          <AdmissionsSection
            onOpenApplyModal={() => setIsApplyModalOpen(true)}
            onContactClick={() => scrollToSection('contact')}
          />
        </div>

        {/* Dedicated Campus Gallery with Category Filters */}
        <div className="relative group/gallery">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('gallery')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Gallery Photos</span>
            </button>
          )}
          <GallerySection
            onSelectImage={(img) => setSelectedLightboxImage(img)}
          />
        </div>

        {/* Parent Testimonials & Community Voices */}
        <div className="relative group/testimonials">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('testimonials')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Testimonials</span>
            </button>
          )}
          <TestimonialsSection />
        </div>

        {/* News, Announcements & School Bulletin */}
        <div className="relative group/news">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('news')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit News & Announcements</span>
            </button>
          )}
          <NewsSection />
        </div>

        {/* Bottom Call to Action */}
        <div className="relative group/cta">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('cta')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Call to Action</span>
            </button>
          )}
          <CallToAction
            onContactClick={() => scrollToSection('contact')}
            onAdmissionsClick={() => scrollToSection('admissions')}
          />
        </div>

        {/* Institutional Contact Section & Okene Map Details */}
        <div className="relative group/contact">
          {isAdmin && isLiveEditMode && (
            <button
              onClick={() => navigateToAdmin('info')}
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs shadow-xl hover:bg-amber-400 transition-all border border-navy-950/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Contact & Campus Info</span>
            </button>
          )}
          <ContactSection />
        </div>
      </main>

      {/* Multi-Column Comprehensive Footer */}
      <Footer onNavClick={(href) => scrollToSection(href)} />

      {/* Interactive Admission Inquiry & Application Modal */}
      <AdmissionModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      {/* Full-screen Photo Lightbox Modal */}
      <LightboxModal
        image={selectedLightboxImage}
        onClose={() => setSelectedLightboxImage(null)}
      />

      {/* Floating Hovering WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <WebsiteProvider>
      <MainSite />
    </WebsiteProvider>
  );
}
