import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Award,
  FileText,
  Printer,
  Sparkles,
  AlertCircle,
  Clock,
  Send,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';
import { TeachingJobOpening } from '../types';

interface TeachingApplicationFormProps {
  selectedJobId?: string | null;
  onSuccess?: (refCode: string) => void;
  className?: string;
}

export default function TeachingApplicationForm({
  selectedJobId,
  onSuccess,
  className = '',
}: TeachingApplicationFormProps) {
  const { content, teachingVacancies, submitTeachingApplication } = useWebsiteContent();
  const SCHOOL_INFO = content.schoolInfo;

  // Find job title if preselected
  const preselectedTitle =
    teachingVacancies.find((j) => j.id === selectedJobId)?.title ||
    'Primary Class Teacher (Basic 1 - 6)';

  const [formData, setFormData] = useState({
    positionAppliedFor: preselectedTitle,
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    residentialAddress: '',
    stateOfOrigin: '',
    highestQualification: 'B.Ed (Bachelor of Education)',
    institutionGraduated: '',
    yearGraduated: '',
    courseOfStudy: '',
    yearsOfExperience: '2 - 3 Years',
    previousSchoolOrEmployer: '',
    trcnCertified: 'Yes' as 'Yes' | 'No' | 'In Progress',
    primarySubjects: '',
    secondarySubjects: '',
    availability: 'Immediate (within 2 weeks)',
    expectedSalaryRange: 'Standard School Scale / Negotiable',
    cvResumeText: '',
    coverLetter: '',
    agreedToTerms: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync if selectedJobId changes externally
  React.useEffect(() => {
    if (selectedJobId) {
      const match = teachingVacancies.find((j) => j.id === selectedJobId);
      if (match) {
        setFormData((prev) => ({ ...prev, positionAppliedFor: match.title }));
      }
    }
  }, [selectedJobId, teachingVacancies]);

  const qualificationOptions = [
    'B.Ed (Bachelor of Education)',
    'B.Sc / B.A with PGDE (Postgraduate Diploma in Education)',
    'N.C.E (Nigeria Certificate in Education)',
    'M.Ed / M.Sc / M.A in Education or Subject Area',
    'B.Sc / B.A / HND (Currently pursuing PGDE / Teaching qualification)',
    'Ph.D / Doctorate in Education or Subject Area',
    'Other Recognized Educational Certificate',
  ];

  const experienceOptions = [
    'Entry Level / Fresh Graduate (0 - 1 Year)',
    '1 - 2 Years Teaching Experience',
    '3 - 5 Years Teaching Experience',
    '6 - 10 Years Teaching Experience',
    'Over 10 Years Veteran Educator',
  ];

  const availabilityOptions = [
    'Immediate (within 2 weeks)',
    'Beginning of Next Academic Term',
    '1 Month Notice to Current Employer',
    'Negotiable',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full legal name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter an active telephone contact number.');
      return;
    }
    if (!formData.courseOfStudy.trim()) {
      setErrorMessage('Please specify your Course of Study / Major.');
      return;
    }
    if (!formData.primarySubjects.trim()) {
      setErrorMessage('Please enter the primary subject(s) you are qualified to teach.');
      return;
    }
    if (!formData.agreedToTerms) {
      setErrorMessage('Please accept the declaration checkbox.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const ref = submitTeachingApplication({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
          residentialAddress: formData.residentialAddress.trim() || 'Okene, Kogi State',
          stateOfOrigin: formData.stateOfOrigin.trim(),
          positionAppliedFor: formData.positionAppliedFor,
          highestQualification: formData.highestQualification,
          institutionGraduated: formData.institutionGraduated.trim() || 'N/A',
          yearGraduated: formData.yearGraduated.trim(),
          courseOfStudy: formData.courseOfStudy.trim(),
          yearsOfExperience: formData.yearsOfExperience,
          previousSchoolOrEmployer: formData.previousSchoolOrEmployer.trim() || 'N/A',
          trcnCertified: formData.trcnCertified,
          primarySubjects: formData.primarySubjects.trim(),
          secondarySubjects: formData.secondarySubjects.trim(),
          availability: formData.availability,
          expectedSalaryRange: formData.expectedSalaryRange,
          cvResumeText:
            formData.cvResumeText.trim() ||
            'Summary: Qualified teacher ready for demonstration and interview.',
          coverLetter: formData.coverLetter.trim(),
        });

        setIsSubmitting(false);
        setSubmittedRef(ref);
        if (onSuccess) onSuccess(ref);
      } catch (err) {
        setIsSubmitting(false);
        setErrorMessage('Failed to submit application. Please try again.');
      }
    }, 700);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFormData({
      positionAppliedFor: preselectedTitle,
      fullName: '',
      email: '',
      phone: '',
      whatsapp: '',
      residentialAddress: '',
      stateOfOrigin: '',
      highestQualification: 'B.Ed (Bachelor of Education)',
      institutionGraduated: '',
      yearGraduated: '',
      courseOfStudy: '',
      yearsOfExperience: '2 - 3 Years',
      previousSchoolOrEmployer: '',
      trcnCertified: 'Yes',
      primarySubjects: '',
      secondarySubjects: '',
      availability: 'Immediate (within 2 weeks)',
      expectedSalaryRange: 'Standard School Scale / Negotiable',
      cvResumeText: '',
      coverLetter: '',
      agreedToTerms: true,
    });
    setErrorMessage(null);
  };

  return (
    <div
      id="teaching-application-form"
      className={`bg-white rounded-3xl border border-amber-200/90 shadow-xl overflow-hidden ${className}`}
    >
      {/* Form Top Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 text-white p-6 sm:p-8 border-b border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-navy-950 flex items-center justify-center font-black shadow-md shrink-0 mt-0.5">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                Teacher Recruitment Portal
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Teaching Job Application Form
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-normal">
                Join Divine Group of Schools in Okene, Kogi State. We welcome dedicated educators passionate about pupil mentorship, pedagogical rigor, and moral excellence.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right shrink-0">
            <span className="text-xs font-semibold text-amber-400">Campus: Okene, Kogi State</span>
            <span className="text-[11px] text-slate-400">Nursery · Primary · Secondary</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        {submittedRef ? (
          /* Application Success Receipt */
          <div className="max-w-2xl mx-auto py-4 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Application Successfully Submitted
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 mt-2">
                Teacher Application Registered
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
                Your application for the teaching position has been securely logged in our academic recruitment system.
              </p>
            </div>

            {/* Official Teacher Candidate Slip */}
            <div className="bg-gradient-to-br from-amber-50/90 via-white to-amber-50/50 rounded-2xl border-2 border-amber-300 p-6 sm:p-7 text-left shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-amber-200/80 pb-4 gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                    Candidate Dossier Slip
                  </span>
                  <span className="text-sm font-bold text-navy-950">
                    Divine Group of Schools · Faculty Recruitment
                  </span>
                </div>
                <div className="bg-navy-950 text-amber-400 px-3.5 py-1.5 rounded-lg border border-amber-400/30 text-center">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-300">
                    Application Reference
                  </span>
                  <span className="font-mono text-sm sm:text-base font-extrabold tracking-wide">
                    {submittedRef}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-xs text-slate-800">
                <div>
                  <span className="text-slate-500 block text-[11px]">Applicant Full Name:</span>
                  <span className="font-bold text-navy-950 text-sm">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Position Applied For:</span>
                  <span className="font-bold text-navy-950 text-sm">{formData.positionAppliedFor}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Qualification & Discipline:</span>
                  <span className="font-semibold text-slate-900">
                    {formData.highestQualification} ({formData.courseOfStudy})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Classroom Experience:</span>
                  <span className="font-semibold text-slate-900">{formData.yearsOfExperience}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Contact Telephone:</span>
                  <span className="font-semibold text-slate-900">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Email Address:</span>
                  <span className="font-semibold text-slate-900">{formData.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">TRCN Certified:</span>
                  <span className="font-semibold text-slate-900">{formData.trcnCertified}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Primary Subject(s):</span>
                  <span className="font-semibold text-slate-900">{formData.primarySubjects}</span>
                </div>
              </div>

              {/* Next Steps Information */}
              <div className="pt-4 border-t border-amber-200/80 bg-amber-100/50 -mx-6 -mb-6 p-5 rounded-b-xl text-xs text-amber-950 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-navy-950">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Recruitment Process & Next Stages:</span>
                </div>
                <p className="leading-relaxed">
                  1. Keep this Reference Code: <strong className="font-mono">{submittedRef}</strong>.
                </p>
                <p className="leading-relaxed">
                  2. Our Academic Screening Committee will review your credentials and contact you via phone ({formData.phone}) or email for the live 15-minute micro-teaching demonstration in Okene.
                </p>
                <p className="leading-relaxed">
                  3. Please prepare physical copies of your degree certificates, NYSC discharge/exemption certificate, and valid identification.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Application Slip</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Application</span>
              </button>

              <a
                href={`mailto:${SCHOOL_INFO.emails[0]}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Academic Registry</span>
              </a>
            </div>
          </div>
        ) : (
          /* Teacher Application Form */
          <form onSubmit={handleSubmit} className="space-y-8">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* BLOCK 1: POSITION OF INTEREST */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-navy-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-navy-950">
                  Target Teaching Role & Availability
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Position Applied For */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Position Applied For <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      name="positionAppliedFor"
                      value={formData.positionAppliedFor}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                    >
                      {teachingVacancies.map((vac) => (
                        <option key={vac.id} value={vac.title}>
                          {vac.title} ({vac.department})
                        </option>
                      ))}
                      <option value="General Primary Teaching Specialist">General Primary Teaching Specialist</option>
                      <option value="General Secondary Subject Teacher">General Secondary Subject Teacher</option>
                      <option value="Vocational / Creative Arts / Music Instructor">Vocational / Creative Arts / Music Instructor</option>
                      <option value="Special Needs & Counseling Educator">Special Needs & Counseling Educator</option>
                    </select>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Availability to Start <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                    >
                      {availabilityOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* BLOCK 2: PERSONAL & CONTACT INFORMATION */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-navy-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-navy-950">
                  Personal & Contact Details
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Full Legal Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Full Legal Name (Surname First) <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Adeyemi David Oluwaseun"
                      required
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                    />
                  </div>
                </div>

                {/* State of Origin */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    State of Origin
                  </label>
                  <input
                    type="text"
                    name="stateOfOrigin"
                    value={formData.stateOfOrigin}
                    onChange={handleChange}
                    placeholder="e.g. Kogi State"
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="teacher@example.com"
                      required
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Phone Number <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +234 803 000 0000"
                      required
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="e.g. +234 803 000 0000"
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                    />
                  </div>
                </div>

                {/* Residential Address */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Residential Location / Address (Town & State) <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="residentialAddress"
                      value={formData.residentialAddress}
                      onChange={handleChange}
                      placeholder="e.g. Inoziomi / Obehira / GRA, Okene, Kogi State (or resident elsewhere willing to relocate)"
                      required
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BLOCK 3: ACADEMIC QUALIFICATIONS & EXPERIENCE */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-navy-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-navy-950">
                  Qualifications, TRCN & Classroom Experience
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Highest Qualification */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Highest Educational Qualification <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      name="highestQualification"
                      value={formData.highestQualification}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                    >
                      {qualificationOptions.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* TRCN Status */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    TRCN Certified? <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      name="trcnCertified"
                      value={formData.trcnCertified}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                    >
                      <option value="Yes">Yes (Certified TRCN Member)</option>
                      <option value="In Progress">In Progress (Registered / Awaiting)</option>
                      <option value="No">No (Willing to Register)</option>
                    </select>
                  </div>
                </div>

                {/* Course of Study / Major */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Course of Study / Discipline <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="courseOfStudy"
                    value={formData.courseOfStudy}
                    onChange={handleChange}
                    placeholder="e.g. Mathematics Education, English, Physics"
                    required
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                  />
                </div>

                {/* Institution & Year */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Institution Graduated From
                  </label>
                  <input
                    type="text"
                    name="institutionGraduated"
                    value={formData.institutionGraduated}
                    onChange={handleChange}
                    placeholder="e.g. Federal University Lokoja / KSCOE"
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                  />
                </div>

                {/* Year of Graduation */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Year of Graduation
                  </label>
                  <input
                    type="text"
                    name="yearGraduated"
                    value={formData.yearGraduated}
                    onChange={handleChange}
                    placeholder="e.g. 2021"
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                  />
                </div>

                {/* Years of Teaching Experience */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Years of Teaching Experience <span className="text-amber-600">*</span>
                  </label>
                  <select
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                  >
                    {experienceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Previous School */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Previous or Current School / Organization
                  </label>
                  <input
                    type="text"
                    name="previousSchoolOrEmployer"
                    value={formData.previousSchoolOrEmployer}
                    onChange={handleChange}
                    placeholder="e.g. Grace International Academy, Okene (or Fresh Graduate)"
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                  />
                </div>

                {/* Core Subject(s) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Core Subject(s) Qualified to Teach <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="primarySubjects"
                      value={formData.primarySubjects}
                      onChange={handleChange}
                      placeholder="e.g. Mathematics, Further Mathematics, Physics (or All Primary Subjects)"
                      required
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                    />
                  </div>
                </div>

                {/* Subsidiary Subject(s) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Subsidiary Subjects (Optional)
                  </label>
                  <input
                    type="text"
                    name="secondarySubjects"
                    value={formData.secondarySubjects}
                    onChange={handleChange}
                    placeholder="e.g. Basic Science, ICT, Diction"
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* BLOCK 4: COVER LETTER & CV SUMMARY */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-navy-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-navy-950">
                  Teaching Philosophy & CV / Resume Summary
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Statement of Teaching Philosophy & Cover Note
                  </label>
                  <textarea
                    name="coverLetter"
                    rows={3}
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Briefly state your passion for teaching, student mentoring style, and why you are excited to contribute to Divine Group of Schools, Okene."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    CV / Resume Summary & Career Highlights (Paste text or link)
                  </label>
                  <textarea
                    name="cvResumeText"
                    rows={4}
                    value={formData.cvResumeText}
                    onChange={handleChange}
                    placeholder="Paste a concise summary of your previous schools taught, achievements (e.g. WAEC pass rate, clubs coordinated), or paste a link to your online CV / LinkedIn."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 text-slate-900 transition-colors"
                  />
                </div>

                {/* Agreement Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700 select-none">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 rounded text-navy-900 border-slate-300 focus:ring-amber-500"
                    />
                    <span>
                      I certify that all information submitted in this application is accurate and verifiable. I understand that shortlisted candidates will be invited for physical credential verification and a live micro-teaching demonstration at Divine Group of Schools, Okene.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submission Action Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant confirmation reference code generated on submit</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 active:translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Teaching Job Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
