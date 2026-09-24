import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SevenImageFeature from './components/SevenImageFeature';
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

export default function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<{
    title: string;
    src: string;
    caption: string;
  } | null>(null);

  const [activeSection, setActiveSection] = useState('home');

  // Track active section for nav highlight
  useEffect(() => {
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
  }, []);

  const scrollToSection = (id: string) => {
    const cleanId = id.replace('#', '');
    const element = document.getElementById(cleanId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-950">
      {/* Sticky Header with Navigation */}
      <Header
        onOpenApplyModal={() => setIsApplyModalOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Full-Width Homepage Hero */}
        <Hero
          onExploreClick={() => scrollToSection('life-showcase')}
          onAdmissionsClick={() => scrollToSection('admissions')}
        />

        {/* 
          SEVEN-IMAGE HOMEPAGE FEATURE
          Prominently displays the 7 required primary images directly on the homepage
        */}
        <SevenImageFeature
          onSelectImage={(img) => setSelectedLightboxImage(img)}
        />

        {/* Welcome / About Section */}
        <AboutSection
          onLearnMoreClick={() => scrollToSection('schools')}
        />

        {/* Why Choose Us: 6 Elegant Feature Cards */}
        <WhyChooseUs />

        {/* Our Schools: Creche/Early Years, Primary, Secondary */}
        <OurSchools
          onApplyForAdmission={() => setIsApplyModalOpen(true)}
        />

        {/* Academic Excellence Section */}
        <AcademicsSection />

        {/* World-Class Facilities Section */}
        <FacilitiesSection
          onSelectImage={(img) => setSelectedLightboxImage(img)}
        />

        {/* Admissions Section */}
        <AdmissionsSection
          onOpenApplyModal={() => setIsApplyModalOpen(true)}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* Dedicated Campus Gallery with Category Filters */}
        <GallerySection
          onSelectImage={(img) => setSelectedLightboxImage(img)}
        />

        {/* Parent Testimonials & Community Voices */}
        <TestimonialsSection />

        {/* News, Announcements & School Bulletin */}
        <NewsSection />

        {/* Bottom Call to Action */}
        <CallToAction
          onContactClick={() => scrollToSection('contact')}
          onAdmissionsClick={() => scrollToSection('admissions')}
        />

        {/* Institutional Contact Section & Okene Map Details */}
        <ContactSection />
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
    </div>
  );
}
