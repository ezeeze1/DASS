import {
  SchoolInfo,
  SevenLifeImage,
  SchoolLevel,
  AcademicSubject,
  Facility,
  GalleryItem,
  Testimonial,
  NewsItem,
} from '../types';

export const SCHOOL_INFO: SchoolInfo = {
  name: 'DIVINE GROUP OF SCHOOLS',
  motto: 'Building Excellence, Character and Leadership',
  tagline: 'Where Excellence, Character and Leadership Begin',
  heroSupportingText:
    'Providing quality education in a nurturing environment designed to develop confident, responsible and future-ready learners.',
  location: 'Okene',
  state: 'Kogi State',
  country: 'Nigeria',
  address: 'Divine Campus Boulevard, Along Okene-Ajaokuta Expressway, Okene, Kogi State, Nigeria',
  phones: ['+234 (0) 803 892 4110', '+234 (0) 815 440 2933'],
  emails: ['admissions@divinegroupofschools.edu.ng', 'info@divinegroupofschools.edu.ng'],
  openingHours: 'Monday – Friday: 7:30 AM – 4:00 PM (Office closes 4:30 PM)',
};

/**
 * EXACT SEVEN PRIMARY IMAGES REQUIRED ON THE HOMEPAGE:
 * 1. School Building
 * 2. Modern Classroom
 * 3. Students Learning
 * 4. Teachers and Students
 * 5. Science/Computer Laboratory
 * 6. Sports and Recreation
 * 7. School Events/Activities
 */
export const SEVEN_LIFE_IMAGES: SevenLifeImage[] = [
  {
    id: 1,
    title: 'School Campus & Administrative Complex',
    category: '1. School Building',
    caption: 'Modern multi-storey administrative and academic wings with serene, secure grounds.',
    alt: 'Divine Group of Schools campus building with landscaped grounds',
    src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Modern Classrooms & Audio-Visual Learning',
    category: '2. Modern Classroom',
    caption: 'Bright, well-ventilated learning spaces equipped with ergonomic desks and digital whiteboards.',
    alt: 'Spacious modern classroom with students engaged in study',
    src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Students Learning in Active Collaboration',
    category: '3. Students Learning',
    caption: 'Encouraging peer problem-solving, reading culture, and deep conceptual understanding.',
    alt: 'African students actively participating and collaborating in class',
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Dedicated Teachers & Individual Mentorship',
    category: '4. Teachers and Students',
    caption: 'Caring educators providing personalized academic attention and ethical moral guidance.',
    alt: 'Supportive teacher mentoring a student warmly during lessons',
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Practical Science & ICT Innovation Lab',
    category: '5. Science/Computer Laboratory',
    caption: 'Hands-on laboratory stations and computing suites for empirical experimentation and digital literacy.',
    alt: 'Students conducting science experiments and technology practicals in laboratory',
    src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Sports, Track & Physical Development',
    category: '6. Sports and Recreation',
    caption: 'Football field, basketball court, track athletics, and team-building games for physical fitness.',
    alt: 'School students participating in outdoor athletic sports and games',
    src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'School Events, Cultural Festivals & Assemblies',
    category: '7. School Events/Activities',
    caption: 'Debate championships, cultural exhibitions, choir performances, and annual speech ceremonies.',
    alt: 'Students celebrating a school assembly and cultural event together',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  },
];

export const WHY_CHOOSE_US_CARDS = [
  {
    id: 'quality-education',
    title: 'Quality Education',
    description: 'A learning environment focused on strong academic foundations, critical thinking, and structured curriculum mastery.',
    iconName: 'GraduationCap',
  },
  {
    id: 'character-development',
    title: 'Character Development',
    description: 'Helping students develop discipline, integrity, respect, empathy, and personal responsibility in all spheres of life.',
    iconName: 'HeartHandshake',
  },
  {
    id: 'experienced-teachers',
    title: 'Experienced Teachers',
    description: 'A supportive teaching environment of qualified educators deeply committed to individual student development.',
    iconName: 'Users',
  },
  {
    id: 'modern-learning',
    title: 'Modern Learning',
    description: 'Encouraging creativity, technology adoption, digital literacy, and practical hands-on problem solving.',
    iconName: 'Laptop',
  },
  {
    id: 'safe-environment',
    title: 'Safe Environment',
    description: 'A serene, perimeter-secured, and well-monitored environment where young learners can thrive without disruption.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'leadership-development',
    title: 'Leadership Development',
    description: 'Preparing young minds to become responsible future leaders through public speaking, teamwork, and civic awareness.',
    iconName: 'Award',
  },
];

export const SCHOOL_LEVELS: SchoolLevel[] = [
  {
    id: 'early-years',
    name: 'CRECHE / EARLY YEARS',
    subtitle: 'Nurturing Early Foundations',
    ageRange: 'Ages 3 Months – 5 Years',
    description: 'A nurturing foundation for early childhood development, structured play, foundational phonics, and sensory exploration.',
    features: [
      'Warm, child-safe, hygienic care spaces',
      'Early phonics and numeracy immersion',
      'Social etiquette and creative play',
      'Dedicated early childhood specialists',
    ],
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'primary-school',
    name: 'PRIMARY SCHOOL',
    subtitle: 'Building Academic & Social Strength',
    ageRange: 'Ages 5 – 11 Years (Basic 1 – 6)',
    description: 'Building strong academic, social and personal foundations through rigorous core subjects, creative arts, and moral education.',
    features: [
      'Comprehensive literacy & quantitative reasoning',
      'Basic science, computer, and environmental studies',
      'Character grooming and leadership responsibilities',
      'Active physical sports and cultural expressions',
    ],
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'secondary-school',
    name: 'SECONDARY SCHOOL',
    subtitle: 'Preparing Confident Future Achievers',
    ageRange: 'Ages 11 – 17 Years (JSS 1 – SSS 3)',
    description: 'Preparing students for higher education, leadership and future careers with specialized science, arts, and commercial pathways.',
    features: [
      'Thorough preparation for national & regional examinations',
      'Equipped physics, chemistry, biology, and ICT laboratories',
      'Debating society, press club, STEM and robotics clubs',
      'Comprehensive career counseling and mentorship',
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
];

export const ACADEMIC_SUBJECTS: AcademicSubject[] = [
  {
    title: 'Mathematics',
    category: 'STEM Foundation',
    description: 'Developing quantitative logic, algebraic reasoning, geometric spatial skills, and real-world problem-solving.',
    iconName: 'Calculator',
  },
  {
    title: 'English Language',
    category: 'Communication & Literature',
    description: 'Cultivating eloquence, written composition, comprehension, phonetic clarity, and literary appreciation.',
    iconName: 'BookOpen',
  },
  {
    title: 'Sciences',
    category: 'Inquiry & Practical Labs',
    description: 'Physics, Chemistry, Biology, and Basic Science taught through empirical experiments and guided discovery.',
    iconName: 'FlaskConical',
  },
  {
    title: 'Technology & ICT',
    category: 'Digital Literacy',
    description: 'Hands-on computer literacy, digital productivity tools, coding fundamentals, and responsible technology usage.',
    iconName: 'Cpu',
  },
  {
    title: 'Humanities & Social Studies',
    category: 'Civic & Cultural Heritage',
    description: 'Government, History, Geography, Civic Education, and Social Studies fostering responsible community citizenship.',
    iconName: 'Globe',
  },
  {
    title: 'Creative Arts',
    category: 'Aesthetic Expression',
    description: 'Fine arts, music, crafts, drama, and cultural designs celebrating Nigerian heritage and self-expression.',
    iconName: 'Palette',
  },
  {
    title: 'Physical Education',
    category: 'Health & Wellness',
    description: 'Building cardiovascular endurance, teamwork, sportsmanship, and lifelong healthy physical habits.',
    iconName: 'Activity',
  },
];

export const FACILITIES_LIST: Facility[] = [
  {
    id: 'modern-classrooms',
    title: 'Modern Classrooms',
    description: 'Spacious, well-ventilated, naturally lit learning environments with ergonomic student seating and audio-visual instructional boards.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Natural airflow & lighting', 'Ergonomic seating', 'Display boards', 'Tidy student lockers'],
  },
  {
    id: 'science-lab',
    title: 'Science Laboratory',
    description: 'Fully equipped multi-discipline laboratory providing safety gear, chemical reagents, microscopes, and test benches for practical learning.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    highlights: ['Safety eye-wash & fire blankets', 'Compound optical microscopes', 'Physics optical benches', 'Chemical fume extraction'],
  },
  {
    id: 'computer-ict',
    title: 'Computer/ICT Facilities',
    description: 'High-speed networked workstation laboratory giving students practical experience in software applications, typing, and digital research.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    highlights: ['Individual student workstations', 'Filtered educational internet', 'Uninterrupted power support', 'Digital multimedia projector'],
  },
  {
    id: 'school-library',
    title: 'School Library',
    description: 'A serene sanctuary housing extensive collections of reference texts, African literature, fiction, encyclopedias, and quiet study alcoves.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    highlights: ['Catalogued curriculum texts', 'Quiet reading corners', 'Reference & periodical desk', 'Librarian-assisted research'],
  },
  {
    id: 'sports-facilities',
    title: 'Sports Facilities',
    description: 'Spacious outdoor playing fields for football, basketball, volleyball, badminton, and track athletics to promote physical health.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    highlights: ['Standard football pitch', 'Multi-purpose court', 'Running track tracks', 'Indoor table tennis'],
  },
  {
    id: 'school-environment',
    title: 'School Environment',
    description: 'Perimeter-walled campus with manicured green lawns, 24/7 gated security control, and clean sanitary facilities.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    highlights: ['Gated access security', 'Clean treated water systems', 'Landscaped recreational areas', 'First-aid clinic on site'],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Main Academic Campus View',
    category: 'Facilities',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
    caption: 'Front facade of Divine Group of Schools campus in Okene, Kogi State.',
  },
  {
    id: 'gal-2',
    title: 'Interactive Classroom Discussion',
    category: 'Academics',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    caption: 'Students engaged in intellectual debate and analytical exercises.',
  },
  {
    id: 'gal-3',
    title: 'Inter-House Sports Athletics Day',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80',
    caption: 'Students demonstrating athletic agility and team camaraderie.',
  },
  {
    id: 'gal-4',
    title: 'Annual Speech and Cultural Assembly',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
    caption: 'Celebration of artistic talent, academic awards, and cultural heritage.',
  },
  {
    id: 'gal-5',
    title: 'Practical Biology & Chemistry Laboratory',
    category: 'Academics',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80',
    caption: 'Hands-on titration and microscopic analysis in the science wing.',
  },
  {
    id: 'gal-6',
    title: 'Peer Reading & Library Sessions',
    category: 'School Life',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
    caption: 'Cultivating strong reading habits in the peaceful library reading room.',
  },
  {
    id: 'gal-7',
    title: 'Teacher Mentorship and Counseling',
    category: 'School Life',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80',
    caption: 'One-on-one academic consultation and character guidance.',
  },
  {
    id: 'gal-8',
    title: 'Computer Lab Practical Class',
    category: 'Facilities',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
    caption: 'Young scholars practicing computational thinking and digital design.',
  },
  {
    id: 'gal-9',
    title: 'Morning Assembly & Devotion',
    category: 'School Life',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    caption: 'Inspiring assembly fostering discipline, hymns, and moral values.',
  },
];

/**
 * Placeholder parent testimonials clearly marked per requirements.
 * Editable from this data structure.
 */
export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    role: 'Parent Testimonial',
    quote: 'Divine Group of Schools provides a supportive environment where students can develop academically and personally.',
    note: 'Parent of Primary & Secondary Scholars, Okene',
  },
  {
    id: 'test-2',
    role: 'Parent Testimonial',
    quote: 'The emphasis on moral discipline and dedicated teacher attention has given our children the confidence to excel both in their studies and in their daily conduct.',
    note: 'Parent of Early Years & Basic Scholar, Kogi State',
  },
  {
    id: 'test-3',
    role: 'Parent Testimonial',
    quote: 'We appreciate the balanced academic curriculum and the safe, peaceful environment where every child feels valued and motivated to achieve their best.',
    note: 'Parent of Senior Secondary Student, Okene',
  },
];

export const NEWS_ANNOUNCEMENTS: NewsItem[] = [
  {
    id: 'news-1',
    category: 'School Announcement',
    title: 'Academic Term Resumption & Student Orientation Schedule',
    date: 'Upcoming Academic Session',
    summary: 'Details regarding boarders resumption, day students arrival time, uniform checks, and initial week assembly guidelines.',
    fullContent: 'We welcome all returning and new scholars to Divine Group of Schools for the upcoming academic session. Students are expected in full school uniform by 7:30 AM prompt. Orientation meetings for new parents and students will be held in the school auditorium.',
  },
  {
    id: 'news-2',
    category: 'Academic Activity',
    title: 'Inter-House Academic Challenge & Science Exhibition',
    date: 'Mid-Term Calendar',
    summary: 'Scholars showcase creative STEM projects, mathematical problem-solving displays, and inter-class debates.',
    fullContent: 'Our annual Academic Challenge will bring together student houses competing across mathematics quizzes, scientific models, English diction, and creative art showcases. Parents and guardians are cordially invited to observe the exhibition.',
  },
  {
    id: 'news-3',
    category: 'Upcoming Event',
    title: 'Annual Speech & Prize Giving Day Celebration',
    date: 'End of Session Event',
    summary: 'A day of celebration recognizing outstanding academic performance, exemplary character, and leadership excellence.',
    fullContent: 'Join us as we honor diligence, perseverance, and ethical leadership among our scholars across Creche, Primary, and Secondary sections. The ceremony will feature choir renditions, drama presentations, and special recognitions.',
  },
];

export const ADMISSION_STEPS = [
  {
    step: '01',
    title: 'Inquiry & Prospectus',
    desc: 'Obtain admission information online, review school requirements for your child’s educational level, or visit our admissions office in Okene.',
  },
  {
    step: '02',
    title: 'Application Form Submission',
    desc: 'Complete the student application form with recent passport photographs, previous academic reports, and birth verification.',
  },
  {
    step: '03',
    title: 'Placement Assessment & Interaction',
    desc: 'A friendly diagnostic evaluation in literacy, numeracy, and general reasoning to understand the child’s learning readiness and class placement.',
  },
  {
    step: '04',
    title: 'Enrollment & Welcome Pack',
    desc: 'Upon review, an official admission letter is issued alongside school uniform fitting, booklists, and resumption orientation guidelines.',
  },
];
