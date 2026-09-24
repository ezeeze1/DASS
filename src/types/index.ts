export interface SchoolInfo {
  name: string;
  motto: string;
  tagline: string;
  heroSupportingText: string;
  location: string;
  state: string;
  country: string;
  address: string;
  phones: string[];
  emails: string[];
  openingHours: string;
  whatsappNumber?: string;
}

export interface SevenLifeImage {
  id: number;
  title: string;
  category: string;
  caption: string;
  alt: string;
  src: string;
}

export type ShowcaseImage = SevenLifeImage;

export interface SchoolLevel {
  id: string;
  name: string;
  subtitle: string;
  ageRange: string;
  description: string;
  features: string[];
  image: string;
}

export interface AcademicSubject {
  title: string;
  category: string;
  description: string;
  iconName: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'School Life' | 'Academics' | 'Sports' | 'Events' | 'Facilities' | string;
  image: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  role: string;
  quote: string;
  note: string;
}

export interface NewsItem {
  id: string;
  category: 'School Announcement' | 'Academic Activity' | 'Upcoming Event' | string;
  title: string;
  date: string;
  summary: string;
  fullContent: string;
}

export interface WhyChooseUsCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface AboutSectionData {
  badge: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  teacherImage: string;
  teacherBadge: string;
  locationBadgeTitle: string;
  locationBadgeText: string;
  locationBadgeDesc: string;
  commitment1Title: string;
  commitment1Desc: string;
  commitment2Title: string;
  commitment2Desc: string;
}

export interface AcademicPhilosophyData {
  badge: string;
  title: string;
  description: string;
  footnote: string;
}

export interface AdmissionStepItem {
  step: string;
  title: string;
  desc: string;
}

export interface AdmissionSectionData {
  badge: string;
  headline: string;
  quote: string;
  description: string;
  steps: AdmissionStepItem[];
}

export interface CallToActionData {
  badge: string;
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export interface WebsiteContent {
  schoolInfo: SchoolInfo;
  fiveImages: SevenLifeImage[];
  about: AboutSectionData;
  whyChooseUs: WhyChooseUsCard[];
  schoolLevels: SchoolLevel[];
  academicSubjects: AcademicSubject[];
  academicPhilosophy: AcademicPhilosophyData;
  facilities: Facility[];
  admissions: AdmissionSectionData;
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  news: NewsItem[];
  cta: CallToActionData;
}

export interface AdmissionFormData {
  studentFullName: string;
  dateOfBirth: string;
  gender: string;
  levelApplying: string;
  previousSchool: string;
  parentFullName: string;
  parentPhone: string;
  parentEmail: string;
  parentAddress: string;
  notes: string;
}
