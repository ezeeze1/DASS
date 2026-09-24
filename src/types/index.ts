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
}

export interface SevenLifeImage {
  id: number;
  title: string;
  category: string;
  caption: string;
  alt: string;
  src: string;
}

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
  category: 'School Life' | 'Academics' | 'Sports' | 'Events' | 'Facilities';
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
  category: 'School Announcement' | 'Academic Activity' | 'Upcoming Event';
  title: string;
  date: string;
  summary: string;
  fullContent: string;
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
