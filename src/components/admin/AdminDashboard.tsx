import React, { useState } from 'react';
import {
  School,
  LogOut,
  Save,
  RotateCcw,
  Download,
  Upload,
  Layers,
  Info,
  BookOpen,
  Award,
  GraduationCap,
  Building2,
  FileCheck,
  Image as ImageIcon,
  MessageSquareQuote,
  Newspaper,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useWebsiteContent } from '../../context/WebsiteContext';
import {
  SevenLifeImage,
  SchoolLevel,
  Facility,
  GalleryItem,
  Testimonial,
  NewsItem,
  WhyChooseUsCard,
  AcademicSubject,
} from '../../types';

interface AdminDashboardProps {
  onReturnToWebsite: () => void;
  defaultTab?: TabType;
}

type TabType =
  | 'info'
  | 'fiveImages'
  | 'about'
  | 'whyChooseUs'
  | 'levels'
  | 'academics'
  | 'facilities'
  | 'admissions'
  | 'gallery'
  | 'testimonials'
  | 'news'
  | 'cta'
  | 'backup';

export default function AdminDashboard({ onReturnToWebsite, defaultTab = 'info' }: AdminDashboardProps) {
  const {
    content,
    saveStatus,
    adminEmail,
    logout,
    resetToDefaults,
    updateSchoolInfo,
    updateFiveImages,
    updateAbout,
    updateWhyChooseUs,
    updateSchoolLevels,
    updateAcademicPhilosophy,
    updateSubjects,
    updateFacilities,
    updateAdmissions,
    updateGallery,
    updateTestimonials,
    updateNews,
    updateCta,
    updateEntireContent,
  } = useWebsiteContent();

  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Export JSON configuration
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `divine_schools_website_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('Website backup JSON exported successfully.');
  };

  // Import JSON configuration
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported && imported.schoolInfo && imported.fiveImages) {
          updateEntireContent(imported);
          triggerToast('Website content restored successfully from backup!');
        } else {
          alert('Invalid backup file structure.');
        }
      } catch {
        alert('Could not read JSON backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all website content back to initial defaults?')) {
      resetToDefaults();
      triggerToast('All content has been reset to default values.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-navy-950 border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold shadow-md ring-2 ring-amber-400/30">
              <School className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-extrabold text-white tracking-tight">
                  {content.schoolInfo.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Admin CMS
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>Authenticated as:</span>
                <span className="text-amber-300 font-medium">{adminEmail || 'Administrator'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live Save Status Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-xs">
              {saveStatus === 'saving' ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-amber-300">Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Changes Saved Live</span>
                </>
              )}
            </div>

            {/* View Live Website */}
            <button
              onClick={onReturnToWebsite}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-white border border-slate-700 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>View Public Site</span>
            </button>

            {/* Log Out */}
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/80 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body: Sidebar Tabs + Content Panel */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation Sidebar */}
        <nav className="lg:col-span-3 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            Website Sections
          </div>

          {[
            { id: 'info', label: 'School Info & Contacts', icon: Info },
            { id: 'fiveImages', label: '5 Homepage Images', icon: Layers, highlight: true },
            { id: 'about', label: 'About & Teachers', icon: BookOpen },
            { id: 'whyChooseUs', label: 'Why Choose Us (6)', icon: Award },
            { id: 'levels', label: 'School Levels (3)', icon: GraduationCap },
            { id: 'academics', label: 'Academics & Subjects', icon: Sparkles },
            { id: 'facilities', label: 'Facilities & Campus', icon: Building2 },
            { id: 'admissions', label: 'Admissions Section', icon: FileCheck },
            { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
            { id: 'testimonials', label: 'Parent Testimonials', icon: MessageSquareQuote },
            { id: 'news', label: 'News & Bulletins', icon: Newspaper },
            { id: 'cta', label: 'Bottom Banner (CTA)', icon: Layers },
            { id: 'backup', label: 'Backup & Factory Reset', icon: Download },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}

          <div className="pt-6 px-3">
            <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Storage</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                All modifications are automatically saved to your browser storage and instantly update the public site.
              </p>
            </div>
          </div>
        </nav>

        {/* Right Content Editor Area */}
        <main className="lg:col-span-9 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* TAB 1: SCHOOL INFO & CONTACTS */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">General Information & Contacts</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Updates school name, institutional motto, contact phone numbers, email addresses, and location details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    School Name
                  </label>
                  <input
                    type="text"
                    value={content.schoolInfo.name}
                    onChange={(e) => updateSchoolInfo({ name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Motto
                  </label>
                  <input
                    type="text"
                    value={content.schoolInfo.motto}
                    onChange={(e) => updateSchoolInfo({ motto: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={content.schoolInfo.tagline}
                    onChange={(e) => updateSchoolInfo({ tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Hero Supporting Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={content.schoolInfo.heroSupportingText}
                    onChange={(e) => updateSchoolInfo({ heroSupportingText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Campus Physical Address
                  </label>
                  <input
                    type="text"
                    value={content.schoolInfo.address}
                    onChange={(e) => updateSchoolInfo({ address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={content.schoolInfo.phones[0] || ''}
                    onChange={(e) => {
                      const newPhones = [...content.schoolInfo.phones];
                      newPhones[0] = e.target.value;
                      updateSchoolInfo({ phones: newPhones });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Secondary Phone Number
                  </label>
                  <input
                    type="text"
                    value={content.schoolInfo.phones[1] || ''}
                    onChange={(e) => {
                      const newPhones = [...content.schoolInfo.phones];
                      newPhones[1] = e.target.value;
                      updateSchoolInfo({ phones: newPhones });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Admissions Email
                  </label>
                  <input
                    type="email"
                    value={content.schoolInfo.emails[0] || ''}
                    onChange={(e) => {
                      const newEmails = [...content.schoolInfo.emails];
                      newEmails[0] = e.target.value;
                      updateSchoolInfo({ emails: newEmails });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    General Inquiries Email
                  </label>
                  <input
                    type="email"
                    value={content.schoolInfo.emails[1] || ''}
                    onChange={(e) => {
                      const newEmails = [...content.schoolInfo.emails];
                      newEmails[1] = e.target.value;
                      updateSchoolInfo({ emails: newEmails });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    WhatsApp Hotline
                  </label>
                  <input
                    type="text"
                    value={content.schoolInfo.whatsappNumber || '+2348038924110'}
                    onChange={(e) => updateSchoolInfo({ whatsappNumber: e.target.value })}
                    placeholder="+234..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Office Hours
                  </label>
                  <input
                    type="text"
                    value={content.schoolInfo.openingHours}
                    onChange={(e) => updateSchoolInfo({ openingHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 5 HOMEPAGE IMAGES (TRANSITIONAL) */}
          {activeTab === 'fiveImages' && (
            <div className="space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">
                  5 Core Homepage Showcase Images (Transitional)
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Manage the 5 core images displayed in both the top Hero slideshow and the transitional Showcase section.
                </p>
              </div>

              <div className="space-y-6">
                {content.fiveImages.map((img: SevenLifeImage, idx: number) => (
                  <div
                    key={img.id || idx}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-4 shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">
                          0{idx + 1}
                        </span>
                        <span className="font-bold text-sm text-white">{img.title}</span>
                      </div>
                      <span className="text-xs text-amber-400 font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                        {img.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Live Image Preview */}
                      <div className="md:col-span-4">
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-700 relative">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                          Live image preview
                        </p>
                      </div>

                      {/* Fields */}
                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Image Direct URL
                          </label>
                          <input
                            type="url"
                            value={img.src}
                            onChange={(e) => {
                              const updated = [...content.fiveImages];
                              updated[idx] = { ...updated[idx], src: e.target.value };
                              updateFiveImages(updated);
                            }}
                            placeholder="https://..."
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={img.title}
                              onChange={(e) => {
                                const updated = [...content.fiveImages];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                updateFiveImages(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                              Category Badge
                            </label>
                            <input
                              type="text"
                              value={img.category}
                              onChange={(e) => {
                                const updated = [...content.fiveImages];
                                updated[idx] = { ...updated[idx], category: e.target.value };
                                updateFiveImages(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Caption & Narrative
                          </label>
                          <textarea
                            rows={2}
                            value={img.caption}
                            onChange={(e) => {
                              const updated = [...content.fiveImages];
                              updated[idx] = { ...updated[idx], caption: e.target.value };
                              updateFiveImages(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Alt Text (SEO & Accessibility)
                          </label>
                          <input
                            type="text"
                            value={img.alt}
                            onChange={(e) => {
                              const updated = [...content.fiveImages];
                              updated[idx] = { ...updated[idx], alt: e.target.value };
                              updateFiveImages(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT & DEDICATED TEACHERS */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">About & Institutional Overview</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Modify welcome narrative, dedicated teachers photo, and core institutional commitments.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Eyebrow Badge
                  </label>
                  <input
                    type="text"
                    value={content.about.badge}
                    onChange={(e) => updateAbout({ badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={content.about.title}
                    onChange={(e) => updateAbout({ title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Overview Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={content.about.paragraph1}
                    onChange={(e) => updateAbout({ paragraph1: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Overview Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={content.about.paragraph2}
                    onChange={(e) => updateAbout({ paragraph2: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {/* Dedicated Teachers Photo Spotlight */}
                <div className="sm:col-span-2 p-5 rounded-2xl bg-navy-950 border border-amber-500/40 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Dedicated Teachers Showcase Image & Badge</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-3">
                      <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
                        <img
                          src={content.about.teacherImage}
                          alt="Dedicated teachers preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-9 space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Teacher Image URL
                        </label>
                        <input
                          type="url"
                          value={content.about.teacherImage}
                          onChange={(e) => updateAbout({ teacherImage: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          value={content.about.teacherBadge}
                          onChange={(e) => updateAbout({ teacherBadge: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Commitment 1 Title
                  </label>
                  <input
                    type="text"
                    value={content.about.commitment1Title}
                    onChange={(e) => updateAbout({ commitment1Title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={content.about.commitment1Desc}
                    onChange={(e) => updateAbout({ commitment1Desc: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Commitment 2 Title
                  </label>
                  <input
                    type="text"
                    value={content.about.commitment2Title}
                    onChange={(e) => updateAbout({ commitment2Title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={content.about.commitment2Desc}
                    onChange={(e) => updateAbout({ commitment2Desc: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHY CHOOSE US (6 PILLARS) */}
          {activeTab === 'whyChooseUs' && (
            <div className="space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">Why Choose Us (6 Institutional Pillars)</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Customize the 6 core pillars that define the school's advantage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.whyChooseUs.map((card: WhyChooseUsCard, idx: number) => (
                  <div key={card.id || idx} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-amber-400">Pillar 0{idx + 1}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{card.iconName}</span>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const updated = [...content.whyChooseUs];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateWhyChooseUs(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={card.description}
                        onChange={(e) => {
                          const updated = [...content.whyChooseUs];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          updateWhyChooseUs(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SCHOOL LEVELS (3 SECTIONS) */}
          {activeTab === 'levels' && (
            <div className="space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">School Levels (Academic Wings)</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Manage details for Creche / Early Years, Primary School, and Secondary School.
                </p>
              </div>

              <div className="space-y-6">
                {content.schoolLevels.map((lvl: SchoolLevel, idx: number) => (
                  <div key={lvl.id || idx} className="p-5 rounded-xl bg-slate-900 border border-slate-700 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-amber-400 text-sm">{lvl.name}</span>
                      <span className="text-xs text-slate-400">{lvl.ageRange}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Level Name</label>
                        <input
                          type="text"
                          value={lvl.name}
                          onChange={(e) => {
                            const updated = [...content.schoolLevels];
                            updated[idx] = { ...updated[idx], name: e.target.value };
                            updateSchoolLevels(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Subtitle</label>
                        <input
                          type="text"
                          value={lvl.subtitle}
                          onChange={(e) => {
                            const updated = [...content.schoolLevels];
                            updated[idx] = { ...updated[idx], subtitle: e.target.value };
                            updateSchoolLevels(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Age Range</label>
                        <input
                          type="text"
                          value={lvl.ageRange}
                          onChange={(e) => {
                            const updated = [...content.schoolLevels];
                            updated[idx] = { ...updated[idx], ageRange: e.target.value };
                            updateSchoolLevels(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Image URL</label>
                        <input
                          type="url"
                          value={lvl.image}
                          onChange={(e) => {
                            const updated = [...content.schoolLevels];
                            updated[idx] = { ...updated[idx], image: e.target.value };
                            updateSchoolLevels(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={lvl.description}
                          onChange={(e) => {
                            const updated = [...content.schoolLevels];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            updateSchoolLevels(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          Key Features (One item per line)
                        </label>
                        <textarea
                          rows={4}
                          value={lvl.features.join('\n')}
                          onChange={(e) => {
                            const updated = [...content.schoolLevels];
                            updated[idx] = {
                              ...updated[idx],
                              features: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                            };
                            updateSchoolLevels(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ACADEMICS & PHILOSOPHY */}
          {activeTab === 'academics' && (
            <div className="space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">Academics & Teaching Philosophy</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Edit the teaching philosophy statement and core academic subject details.
                </p>
              </div>

              {/* Teaching Philosophy Block */}
              <div className="p-5 rounded-xl bg-navy-950 border border-amber-500/40 space-y-4">
                <h3 className="font-bold text-amber-400 text-sm">Teaching Philosophy Card</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Eyebrow Badge</label>
                    <input
                      type="text"
                      value={content.academicPhilosophy.badge}
                      onChange={(e) => updateAcademicPhilosophy({ badge: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Title</label>
                    <input
                      type="text"
                      value={content.academicPhilosophy.title}
                      onChange={(e) => updateAcademicPhilosophy({ title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Philosophy Statement</label>
                    <textarea
                      rows={3}
                      value={content.academicPhilosophy.description}
                      onChange={(e) => updateAcademicPhilosophy({ description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Card Footnote</label>
                    <input
                      type="text"
                      value={content.academicPhilosophy.footnote}
                      onChange={(e) => updateAcademicPhilosophy({ footnote: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Subject Areas */}
              <div className="space-y-4">
                <h3 className="font-bold text-white text-sm">Curriculum Subject Areas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.academicSubjects.map((sub: AcademicSubject, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400 text-xs">{sub.title}</span>
                        <span className="text-[10px] text-slate-400">{sub.category}</span>
                      </div>
                      <input
                        type="text"
                        value={sub.title}
                        onChange={(e) => {
                          const updated = [...content.academicSubjects];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateSubjects(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:outline-none"
                      />
                      <textarea
                        rows={2}
                        value={sub.description}
                        onChange={(e) => {
                          const updated = [...content.academicSubjects];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          updateSubjects(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FACILITIES */}
          {activeTab === 'facilities' && (
            <div className="space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">Campus Facilities & Infrastructure</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Manage the 6 facility profiles displayed in the Facilities section.
                </p>
              </div>

              <div className="space-y-5">
                {content.facilities.map((fac: Facility, idx: number) => (
                  <div key={fac.id || idx} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-white text-sm">{fac.title}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Facility Name</label>
                        <input
                          type="text"
                          value={fac.title}
                          onChange={(e) => {
                            const updated = [...content.facilities];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            updateFacilities(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Image URL</label>
                        <input
                          type="url"
                          value={fac.image}
                          onChange={(e) => {
                            const updated = [...content.facilities];
                            updated[idx] = { ...updated[idx], image: e.target.value };
                            updateFacilities(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={fac.description}
                          onChange={(e) => {
                            const updated = [...content.facilities];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            updateFacilities(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: ADMISSIONS */}
          {activeTab === 'admissions' && (
            <div className="space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">Admissions & Enrollment Process</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Update the banner headline, inspiring quote, description, and the 4 steps of the admissions process.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Banner Eyebrow Badge
                  </label>
                  <input
                    type="text"
                    value={content.admissions.badge}
                    onChange={(e) => updateAdmissions({ badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Banner Headline
                  </label>
                  <input
                    type="text"
                    value={content.admissions.headline}
                    onChange={(e) => updateAdmissions({ headline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Inspiring Quote
                  </label>
                  <textarea
                    rows={2}
                    value={content.admissions.quote}
                    onChange={(e) => updateAdmissions({ quote: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Admissions Description
                  </label>
                  <textarea
                    rows={3}
                    value={content.admissions.description}
                    onChange={(e) => updateAdmissions({ description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none"
                  />
                </div>

                {/* 4 Steps */}
                <div className="pt-4 border-t border-slate-700">
                  <h3 className="font-bold text-amber-400 text-sm mb-3">4 Admission Steps</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {content.admissions.steps.map((st, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                            {st.step}
                          </span>
                          <input
                            type="text"
                            value={st.title}
                            onChange={(e) => {
                              const newSteps = [...content.admissions.steps];
                              newSteps[idx] = { ...newSteps[idx], title: e.target.value };
                              updateAdmissions({ steps: newSteps });
                            }}
                            className="flex-1 px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:outline-none"
                          />
                        </div>
                        <textarea
                          rows={3}
                          value={st.desc}
                          onChange={(e) => {
                            const newSteps = [...content.admissions.steps];
                            newSteps[idx] = { ...newSteps[idx], desc: e.target.value };
                            updateAdmissions({ steps: newSteps });
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">Campus Photo Gallery</h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Manage the image collection visible in the School Gallery section.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newItem: GalleryItem = {
                      id: `gal-${Date.now()}`,
                      title: 'New Campus Photograph',
                      category: 'School Life',
                      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
                      caption: 'Scholars at Divine Group of Schools, Okene.',
                    };
                    updateGallery([newItem, ...content.gallery]);
                    triggerToast('New photo item added to gallery.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.gallery.map((item: GalleryItem, idx: number) => (
                  <div key={item.id || idx} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">Photo {idx + 1}</span>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this photo from gallery?')) {
                            const updated = content.gallery.filter((_, i) => i !== idx);
                            updateGallery(updated);
                            triggerToast('Photo removed.');
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-1 transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    </div>

                    <div className="space-y-2">
                      <input
                        type="url"
                        value={item.image}
                        placeholder="Image URL"
                        onChange={(e) => {
                          const updated = [...content.gallery];
                          updated[idx] = { ...updated[idx], image: e.target.value };
                          updateGallery(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none"
                      />
                      <input
                        type="text"
                        value={item.title}
                        placeholder="Title"
                        onChange={(e) => {
                          const updated = [...content.gallery];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateGallery(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:outline-none"
                      />
                      <input
                        type="text"
                        value={item.caption}
                        placeholder="Caption"
                        onChange={(e) => {
                          const updated = [...content.gallery];
                          updated[idx] = { ...updated[idx], caption: e.target.value };
                          updateGallery(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">Parent Testimonials</h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Manage testimonials and community feedback.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newTest: Testimonial = {
                      id: `test-${Date.now()}`,
                      role: 'Parent Testimonial',
                      quote: 'Divine Group of Schools has provided wonderful support for our child.',
                      note: 'Parent of Scholar, Okene',
                    };
                    updateTestimonials([newTest, ...content.testimonials]);
                    triggerToast('New testimonial added.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="space-y-4">
                {content.testimonials.map((test: Testimonial, idx: number) => (
                  <div key={test.id || idx} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">Testimonial 0{idx + 1}</span>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this testimonial?')) {
                            const updated = content.testimonials.filter((_, i) => i !== idx);
                            updateTestimonials(updated);
                            triggerToast('Testimonial removed.');
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={3}
                      value={test.quote}
                      placeholder="Quote"
                      onChange={(e) => {
                        const updated = [...content.testimonials];
                        updated[idx] = { ...updated[idx], quote: e.target.value };
                        updateTestimonials(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={test.role}
                        placeholder="Role (e.g. Parent Testimonial)"
                        onChange={(e) => {
                          const updated = [...content.testimonials];
                          updated[idx] = { ...updated[idx], role: e.target.value };
                          updateTestimonials(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                      />
                      <input
                        type="text"
                        value={test.note}
                        placeholder="Parent of Student, Okene"
                        onChange={(e) => {
                          const updated = [...content.testimonials];
                          updated[idx] = { ...updated[idx], note: e.target.value };
                          updateTestimonials(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: NEWS & BULLETINS */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">News & School Bulletins</h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Publish and update school calendar notices, achievements, and events.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newNotice: NewsItem = {
                      id: `news-${Date.now()}`,
                      category: 'School Announcement',
                      title: 'New Announcement Notice',
                      date: 'Upcoming Academic Session',
                      summary: 'Brief summary of the announcement for parents and students.',
                      fullContent: 'Complete announcement body and instructions.',
                    };
                    updateNews([newNotice, ...content.news]);
                    triggerToast('New announcement created.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Notice</span>
                </button>
              </div>

              <div className="space-y-4">
                {content.news.map((item: NewsItem, idx: number) => (
                  <div key={item.id || idx} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">{item.category}</span>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this announcement?')) {
                            const updated = content.news.filter((_, i) => i !== idx);
                            updateNews(updated);
                            triggerToast('Announcement removed.');
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...content.news];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            updateNews(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Date / Term</label>
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) => {
                            const updated = [...content.news];
                            updated[idx] = { ...updated[idx], date: e.target.value };
                            updateNews(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Short Summary</label>
                        <textarea
                          rows={2}
                          value={item.summary}
                          onChange={(e) => {
                            const updated = [...content.news];
                            updated[idx] = { ...updated[idx], summary: e.target.value };
                            updateNews(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Full Article / Modal Text</label>
                        <textarea
                          rows={3}
                          value={item.fullContent}
                          onChange={(e) => {
                            const updated = [...content.news];
                            updated[idx] = { ...updated[idx], fullContent: e.target.value };
                            updateNews(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: CALL TO ACTION */}
          {activeTab === 'cta' && (
            <div className="space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">Bottom Call to Action Banner</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Edit the bottom full-width conversion banner text.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Eyebrow Badge
                  </label>
                  <input
                    type="text"
                    value={content.cta.badge}
                    onChange={(e) => updateCta({ badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={content.cta.title}
                    onChange={(e) => updateCta({ title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Subtitle / Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={content.cta.subtitle}
                    onChange={(e) => updateCta({ subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: BACKUP & FACTORY RESET */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">Backup & Factory Reset</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Export complete website configuration to a JSON backup, restore from file, or revert back to factory defaults.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Export JSON */}
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Download Content Backup</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Saves all current website text, image URLs, and settings into a JSON backup file.
                  </p>
                  <button
                    onClick={handleExportJSON}
                    className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Export JSON Backup
                  </button>
                </div>

                {/* Import JSON */}
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Restore from Backup</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Upload a previously exported JSON backup file to instantly restore website content.
                  </p>
                  <label className="block w-full py-2.5 px-4 rounded-lg bg-navy-900 hover:bg-navy-800 text-white border border-slate-600 font-bold text-xs uppercase tracking-wider text-center cursor-pointer transition-colors">
                    <span>Select Backup File</span>
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>
                </div>

                {/* Reset to Factory Defaults */}
                <div className="sm:col-span-2 p-5 rounded-xl bg-red-950/40 border border-red-900/60 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Factory Reset Website Content</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Reverts all text, images, and sections back to the original built-in content, including the verified school campus and dedicated teacher photos.
                  </p>
                  <button
                    onClick={handleReset}
                    className="py-2.5 px-5 rounded-lg bg-red-900/80 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Revert All Content to Default
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-navy-950 border border-amber-500/80 text-white shadow-2xl flex items-center gap-3 animate-fadeIn">
          <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
