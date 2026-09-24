import { WebsiteContent } from '../types';
import {
  SCHOOL_INFO,
  HOMEPAGE_FIVE_IMAGES,
  WHY_CHOOSE_US_CARDS,
  SCHOOL_LEVELS,
  ACADEMIC_SUBJECTS,
  FACILITIES_LIST,
  GALLERY_ITEMS,
  TESTIMONIALS_DATA,
  NEWS_ANNOUNCEMENTS,
  ADMISSION_STEPS,
} from './schoolData';

export const DEFAULT_WEBSITE_CONTENT: WebsiteContent = {
  schoolInfo: {
    ...SCHOOL_INFO,
    whatsappNumber: '+2348038924110',
  },
  fiveImages: HOMEPAGE_FIVE_IMAGES,
  about: {
    badge: 'Institutional Overview',
    title: 'Welcome to Divine Group of Schools',
    paragraph1:
      'Divine Group of Schools is committed to providing quality education, nurturing character, and preparing students for responsible leadership and future opportunities. Located in the heart of Okene, Kogi State, our school serves as an inspiring learning sanctuary where every student is recognized as a unique individual with unlimited potential.',
    paragraph2:
      'We believe that education extends far beyond textbooks and examinations. Our dedicated educators instill foundational knowledge, independent thinking, ethical decision-making, and strong moral values, ensuring that our learners grow into confident, disciplined, and purposeful contributors to society.',
    teacherImage: 'https://i.ibb.co/Q3TZZf8H/IMG-8055.jpg',
    teacherBadge: 'Dedicated Teachers',
    locationBadgeTitle: 'Location',
    locationBadgeText: 'Okene, Kogi State',
    locationBadgeDesc: 'Committed to academic rigor and strong moral foundations.',
    commitment1Title: 'Strong Academic Focus',
    commitment1Desc: 'Comprehensive curricula designed for conceptual mastery and analytical depth.',
    commitment2Title: 'Character & Moral Integrity',
    commitment2Desc: 'Nurturing respect, honesty, self-discipline, and compassion in every learner.',
  },
  whyChooseUs: WHY_CHOOSE_US_CARDS,
  schoolLevels: SCHOOL_LEVELS,
  academicSubjects: ACADEMIC_SUBJECTS,
  academicPhilosophy: {
    badge: 'Teaching Philosophy',
    title: 'Holistic Pedagogy',
    description:
      'We cultivate disciplined study habits, verbal eloquence, analytical thinking, and ethical leadership in every subject area.',
    footnote: 'Divine Group of Schools · Okene',
  },
  facilities: FACILITIES_LIST,
  admissions: {
    badge: 'Enrollment Open · Okene, Kogi State',
    headline: "START YOUR CHILD'S JOURNEY WITH US",
    quote: 'Give your child an environment where learning, character and personal development can flourish.',
    description:
      'We welcome prospective families to experience our campus, consult with our educational coordinators, and register their wards for Creche, Primary, and Secondary sections.',
    steps: ADMISSION_STEPS,
  },
  gallery: GALLERY_ITEMS,
  testimonials: TESTIMONIALS_DATA,
  news: NEWS_ANNOUNCEMENTS,
  cta: {
    badge: 'Begin The Journey',
    title: 'Nurturing Academic Distinction & Moral Leadership',
    subtitle:
      'Join a values-driven academic community where your child receives dedicated mentorship, modern instructional support, and an inspiring environment in Okene.',
    primaryButtonText: 'APPLY FOR ADMISSION',
    secondaryButtonText: 'CONTACT OUR ADMISSIONS TEAM',
  },
};
