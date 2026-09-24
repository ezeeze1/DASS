import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  WebsiteContent,
  SchoolInfo,
  SevenLifeImage,
  AboutSectionData,
  WhyChooseUsCard,
  SchoolLevel,
  AcademicSubject,
  AcademicPhilosophyData,
  Facility,
  AdmissionSectionData,
  GalleryItem,
  Testimonial,
  NewsItem,
  CallToActionData,
} from '../types';
import { DEFAULT_WEBSITE_CONTENT } from '../data/defaultWebsiteContent';
import {
  checkIsAdminAuthenticated,
  verifyAdminCredentials,
  logoutAdmin,
  getAdminSessionInfo,
} from '../utils/auth';

const STORAGE_KEY = 'divine_school_website_content_v1';

interface WebsiteContextType {
  content: WebsiteContent;
  isAdmin: boolean;
  adminEmail: string | null;
  isLiveEditMode: boolean;
  setIsLiveEditMode: (val: boolean) => void;
  saveStatus: 'idle' | 'saving' | 'saved';
  
  // Update actions for all sections
  updateSchoolInfo: (data: Partial<SchoolInfo>) => void;
  updateFiveImages: (images: SevenLifeImage[]) => void;
  updateSingleFiveImage: (index: number, updated: Partial<SevenLifeImage>) => void;
  updateAbout: (data: Partial<AboutSectionData>) => void;
  updateWhyChooseUs: (cards: WhyChooseUsCard[]) => void;
  updateSchoolLevels: (levels: SchoolLevel[]) => void;
  updateAcademicPhilosophy: (data: Partial<AcademicPhilosophyData>) => void;
  updateSubjects: (subjects: AcademicSubject[]) => void;
  updateFacilities: (facilities: Facility[]) => void;
  updateAdmissions: (data: Partial<AdmissionSectionData>) => void;
  updateGallery: (items: GalleryItem[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateNews: (news: NewsItem[]) => void;
  updateCta: (data: Partial<CallToActionData>) => void;
  
  // Global actions
  saveContentNow: () => void;
  updateEntireContent: (newContent: WebsiteContent) => void;
  resetToDefaults: () => void;
  
  // Auth actions
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<WebsiteContent>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Merge with defaults to ensure all required fields exist
          return {
            ...DEFAULT_WEBSITE_CONTENT,
            ...parsed,
            schoolInfo: { ...DEFAULT_WEBSITE_CONTENT.schoolInfo, ...parsed.schoolInfo },
            about: { ...DEFAULT_WEBSITE_CONTENT.about, ...parsed.about },
            academicPhilosophy: { ...DEFAULT_WEBSITE_CONTENT.academicPhilosophy, ...parsed.academicPhilosophy },
            admissions: { ...DEFAULT_WEBSITE_CONTENT.admissions, ...parsed.admissions },
            cta: { ...DEFAULT_WEBSITE_CONTENT.cta, ...parsed.cta },
          };
        }
      } catch (e) {
        console.error('Failed to parse saved website content', e);
      }
    }
    return DEFAULT_WEBSITE_CONTENT;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => checkIsAdminAuthenticated());
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    const session = getAdminSessionInfo();
    return session ? session.email : null;
  });
  const [isLiveEditMode, setIsLiveEditMode] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Sync to localStorage whenever content changes
  const persistContent = useCallback((newContent: WebsiteContent) => {
    if (typeof window !== 'undefined') {
      try {
        setSaveStatus('saving');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        setTimeout(() => {
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2500);
        }, 150);
      } catch (err) {
        console.error('Failed to save to localStorage', err);
        setSaveStatus('idle');
      }
    }
  }, []);

  // Update School Info
  const updateSchoolInfo = useCallback((data: Partial<SchoolInfo>) => {
    setContent((prev) => {
      const next: WebsiteContent = {
        ...prev,
        schoolInfo: { ...prev.schoolInfo, ...data },
      };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update 5 Transitional Images
  const updateFiveImages = useCallback((images: SevenLifeImage[]) => {
    setContent((prev) => {
      const next: WebsiteContent = { ...prev, fiveImages: images };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update Single Image in the 5 Images
  const updateSingleFiveImage = useCallback((index: number, updated: Partial<SevenLifeImage>) => {
    setContent((prev) => {
      const newImages = [...prev.fiveImages];
      if (newImages[index]) {
        newImages[index] = { ...newImages[index], ...updated };
      }
      const next: WebsiteContent = { ...prev, fiveImages: newImages };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update About
  const updateAbout = useCallback((data: Partial<AboutSectionData>) => {
    setContent((prev) => {
      const next: WebsiteContent = {
        ...prev,
        about: { ...prev.about, ...data },
      };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update Why Choose Us
  const updateWhyChooseUs = useCallback((cards: WhyChooseUsCard[]) => {
    setContent((prev) => {
      const next: WebsiteContent = { ...prev, whyChooseUs: cards };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update School Levels
  const updateSchoolLevels = useCallback((levels: SchoolLevel[]) => {
    setContent((prev) => {
      const next: WebsiteContent = { ...prev, schoolLevels: levels };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update Academic Philosophy
  const updateAcademicPhilosophy = useCallback((data: Partial<AcademicPhilosophyData>) => {
    setContent((prev) => {
      const next: WebsiteContent = {
        ...prev,
        academicPhilosophy: { ...prev.academicPhilosophy, ...data },
      };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update Subjects
  const updateSubjects = useCallback((subjects: AcademicSubject[]) => {
    setContent((prev) => {
      const next: WebsiteContent = { ...prev, academicSubjects: subjects };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update Facilities
  const updateFacilities = useCallback((facilities: Facility[]) => {
    setContent((prev) => {
      const next: WebsiteContent = { ...prev, facilities };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update Admissions
  const updateAdmissions = useCallback((data: Partial<AdmissionSectionData>) => {
    setContent((prev) => {
      const next: WebsiteContent = {
        ...prev,
        admissions: { ...prev.admissions, ...data },
      };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update Gallery
  const updateGallery = useCallback((items: GalleryItem[]) => {
    setContent((prev) => {
      const next: WebsiteContent = { ...prev, gallery: items };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update Testimonials
  const updateTestimonials = useCallback((testimonials: Testimonial[]) => {
    setContent((prev) => {
      const next: WebsiteContent = { ...prev, testimonials };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update News
  const updateNews = useCallback((news: NewsItem[]) => {
    setContent((prev) => {
      const next: WebsiteContent = { ...prev, news };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Update Call to Action
  const updateCta = useCallback((data: Partial<CallToActionData>) => {
    setContent((prev) => {
      const next: WebsiteContent = {
        ...prev,
        cta: { ...prev.cta, ...data },
      };
      persistContent(next);
      return next;
    });
  }, [persistContent]);

  // Force manual save now
  const saveContentNow = useCallback(() => {
    persistContent(content);
  }, [content, persistContent]);

  // Overwrite entire content (e.g. from JSON import)
  const updateEntireContent = useCallback((newContent: WebsiteContent) => {
    setContent(newContent);
    persistContent(newContent);
  }, [persistContent]);

  // Reset to initial factory defaults
  const resetToDefaults = useCallback(() => {
    setContent(DEFAULT_WEBSITE_CONTENT);
    persistContent(DEFAULT_WEBSITE_CONTENT);
  }, [persistContent]);

  // Login
  const login = async (email: string, pass: string) => {
    const result = await verifyAdminCredentials(email, pass);
    if (result.success) {
      setIsAdmin(true);
      setAdminEmail(email.trim().toLowerCase());
    }
    return result;
  };

  // Logout
  const logout = () => {
    logoutAdmin();
    setIsAdmin(false);
    setAdminEmail(null);
    setIsLiveEditMode(false);
  };

  // Keep admin status synced across tabs or session changes
  useEffect(() => {
    const checkAuth = () => {
      const authed = checkIsAdminAuthenticated();
      setIsAdmin(authed);
      if (authed) {
        const info = getAdminSessionInfo();
        if (info) setAdminEmail(info.email);
      } else {
        setAdminEmail(null);
      }
    };

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <WebsiteContext.Provider
      value={{
        content,
        isAdmin,
        adminEmail,
        isLiveEditMode,
        setIsLiveEditMode,
        saveStatus,
        updateSchoolInfo,
        updateFiveImages,
        updateSingleFiveImage,
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
        saveContentNow,
        updateEntireContent,
        resetToDefaults,
        login,
        logout,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export function useWebsiteContent(): WebsiteContextType {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsiteContent must be used within a WebsiteProvider');
  }
  return context;
}
