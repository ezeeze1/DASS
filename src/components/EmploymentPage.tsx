import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  Send,
  Building,
  ArrowRight,
  ShieldCheck,
  Printer,
  ChevronRight,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  Calendar,
} from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';
import { TeachingJobOpening } from '../types';

interface EmploymentPageProps {
  onReturnHome?: () => void;
  isStandalonePage?: boolean;
}

export default function EmploymentPage({ onReturnHome, isStandalonePage = false }: EmploymentPageProps) {
  const { content, teachingVacancies, submitTeachingApplication } = useWebsiteContent();
  const SCHOOL_INFO = content.schoolInfo;

  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<TeachingJobOpening | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    residentialAddress: '',
    stateOfOrigin: 'Kogi State',
    positionAppliedFor: teachingVacancies[0]?.title || 'Primary Class Teacher (Basic 1 - 6)',
    highestQualification: 'B.Ed (Bachelor of Education)',
    institutionGraduated: '',
    yearGraduated: '2022',
    courseOfStudy: '',
    yearsOfExperience: '3 - 5 Years',
    previousSchoolOrEmployer: '',
    trcnCertified: 'Yes' as 'Yes' | 'No' | 'In Progress',
    primarySubjects: '',
    secondarySubjects: '',
    availability: 'Immediately / 2 Weeks Notice',
    expectedSalaryRange: 'Standard Divine Group Scale',
    cvResumeText: '',
    coverLetter: '',
    agreeToTruthfulDeclaration: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submissionDate, setSubmissionDate] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const departments = ['All', 'Primary Section', 'Junior Secondary', 'Senior Secondary', 'Early Years / Nursery', 'Vocational / ICT'];

  const filteredVacancies = selectedDepartment === 'All'
    ? teachingVacancies
    : teachingVacancies.filter((v) => v.department.toLowerCase().includes(selectedDepartment.toLowerCase()) || v.level.toLowerCase().includes(selectedDepartment.toLowerCase()));

  const handleSelectJobToApply = (job: TeachingJobOpening) => {
    setSelectedJob(job);
    setFormData((prev) => ({
      ...prev,
      positionAppliedFor: job.title,
    }));
    const el = document.getElementById('teaching-application-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }
    if (!formData.institutionGraduated.trim()) {
      setErrorMsg('Please state the college or university you graduated from.');
      return;
    }
    if (!formData.courseOfStudy.trim()) {
      setErrorMsg('Please enter your course of study / discipline.');
      return;
    }
    if (!formData.primarySubjects.trim()) {
      setErrorMsg('Please list the primary subject(s) you are qualified and passionate to teach.');
      return;
    }
    if (!formData.cvResumeText.trim()) {
      setErrorMsg('Please provide a brief resume / summary of your teaching background.');
      return;
    }
    if (!formData.agreeToTruthfulDeclaration) {
      setErrorMsg('Please check the declaration box confirming the veracity of your credentials.');
      return;
    }

    setIsSubmitting(true);

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
        institutionGraduated: formData.institutionGraduated.trim(),
        yearGraduated: formData.yearGraduated,
        courseOfStudy: formData.courseOfStudy.trim(),
        yearsOfExperience: formData.yearsOfExperience,
        previousSchoolOrEmployer: formData.previousSchoolOrEmployer.trim() || 'N/A',
        trcnCertified: formData.trcnCertified,
        primarySubjects: formData.primarySubjects.trim(),
        secondarySubjects: formData.secondarySubjects.trim(),
        availability: formData.availability,
        expectedSalaryRange: formData.expectedSalaryRange,
        cvResumeText: formData.cvResumeText.trim(),
        coverLetter: formData.coverLetter.trim(),
      });

      setSubmittedRef(ref);
      setSubmissionDate(
        new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      );
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to submit application. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForAnother = () => {
    setSubmittedRef(null);
    setSelectedJob(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      whatsapp: '',
      residentialAddress: '',
      stateOfOrigin: 'Kogi State',
      positionAppliedFor: teachingVacancies[0]?.title || 'Primary Class Teacher (Basic 1 - 6)',
      highestQualification: 'B.Ed (Bachelor of Education)',
      institutionGraduated: '',
      yearGraduated: '2022',
      courseOfStudy: '',
      yearsOfExperience: '3 - 5 Years',
      previousSchoolOrEmployer: '',
      trcnCertified: 'Yes',
      primarySubjects: '',
      secondarySubjects: '',
      availability: 'Immediately / 2 Weeks Notice',
      expectedSalaryRange: 'Standard Divine Group Scale',
      cvResumeText: '',
      coverLetter: '',
      agreeToTruthfulDeclaration: false,
    });
  };

  return (
    <section id="employment" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden border border-navy-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            {isStandalonePage && onReturnHome && (
              <button
                onClick={onReturnHome}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-navy-800/90 text-amber-400 hover:text-white border border-navy-700 text-xs font-semibold uppercase tracking-wider mb-2 transition-colors cursor-pointer"
              >
                <span>← Back to Website Homepage</span>
              </button>
            )}

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>Teaching Careers · Okene, Kogi State</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              JOIN OUR EXCEPTIONAL TEACHING FACULTY
            </h1>

            <div className="w-20 h-1 bg-amber-500 rounded-full" />

            <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed">
              "Building Excellence, Character and Leadership Starts with Passionate, Disciplined Educators."
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              At Divine Group of Schools, we believe teachers are the architects of the future. We provide a disciplined, well-resourced academic environment where passionate educators are valued, professionally developed, and empowered to inspire scholars in Okene, Kogi State.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
              <a
                href="#teaching-application-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('teaching-application-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-950" />
                <span>APPLY FOR A TEACHING JOB</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </a>

              <a
                href="#current-vacancies"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('current-vacancies')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-navy-800/80 hover:bg-navy-800 text-white border border-navy-700 hover:border-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                <span>EXPLORE OPEN TEACHING POSITIONS</span>
              </a>
            </div>
          </div>
        </div>

        {/* Why Teach At Divine Group of Schools */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Faculty Welfare & Growth
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight mt-2">
              Why Build Your Teaching Career With Us?
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              We offer educators an enriching professional home grounded in mutual respect, continuous learning, and pedagogical distinction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Competitive Remuneration',
                desc: 'Prompt monthly salary disbursement, performance recognitions, and educational welfare incentives.',
                icon: Award,
              },
              {
                title: 'Modern Instructional Aids',
                desc: 'Access to spacious classrooms, science laboratories, digital projectors, and computer facilities.',
                icon: Building,
              },
              {
                title: 'Teacher Training Workshops',
                desc: 'Continuous capacity building in phonics, STEM pedagogy, digital grading, and classroom management.',
                icon: BookOpen,
              },
              {
                title: 'Leadership & Advancement',
                desc: 'Clear merit-driven pathways to Head of Department, Year Coordinator, and School Administrative roles.',
                icon: GraduationCap,
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-navy-950">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Faculty Benefit</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Vacancies Directory */}
        <div id="current-vacancies" className="scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
                Current Faculty Vacancies
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight mt-2">
                Open Teaching Positions in Okene
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Select a subject area below or fill out the general teaching application form directly.
              </p>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-slate-200/70 p-1.5 rounded-xl border border-slate-300">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDepartment === dept
                      ? 'bg-navy-950 text-white shadow-sm'
                      : 'text-slate-700 hover:text-navy-950 hover:bg-white/60'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                      {vacancy.department}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{vacancy.employmentType}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-navy-950 group-hover:text-amber-700 transition-colors">
                    {vacancy.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{vacancy.location}</span>
                    </span>
                    <span>·</span>
                    <span className="text-slate-700 font-medium">{vacancy.level}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {vacancy.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide block">
                      Core Requirements:
                    </span>
                    <ul className="text-[11px] text-slate-600 space-y-1">
                      {vacancy.requirements.slice(0, 3).map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleSelectJobToApply(vacancy)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer group-hover:bg-amber-500 group-hover:text-slate-950"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* APPLICATION FORM SECTION */}
        <div id="teaching-application-form" className="scroll-mt-28">
          {submittedRef ? (
            /* SUBMITTED SUCCESS SLIP */
            <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-12 shadow-2xl">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-200 pb-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 inline-block mb-1">
                      Application Submitted Successfully
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                      Teaching Candidate Acknowledgement Slip
                    </h3>
                    <p className="text-xs text-slate-700">
                      Divine Group of Schools · Okene, Kogi State, Nigeria
                    </p>
                  </div>
                </div>

                {/* Reference Box */}
                <div className="bg-gradient-to-br from-amber-50/90 via-white to-amber-100/50 rounded-2xl p-6 border-2 border-amber-300 relative shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                        Official Application Reference Code
                      </span>
                      <span className="font-mono text-xl sm:text-2xl font-extrabold text-navy-950 tracking-wider">
                        {submittedRef}
                      </span>
                    </div>
                    <div className="text-xs text-slate-800 sm:text-right">
                      <span className="font-semibold text-slate-900 block">Date of Application:</span>
                      <span>{submissionDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs text-slate-800">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Applicant Name:</span>
                      <p className="font-bold text-sm text-slate-950">{formData.fullName}</p>
                      <p className="text-slate-700 font-medium">{formData.email} · {formData.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Position Applied For:</span>
                      <p className="font-bold text-sm text-amber-900">{formData.positionAppliedFor}</p>
                      <p className="text-slate-700 font-medium">{formData.highestQualification} ({formData.courseOfStudy})</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Teaching Experience:</span>
                      <p className="font-semibold text-slate-900">{formData.yearsOfExperience} · TRCN: {formData.trcnCertified}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Subjects Specified:</span>
                      <p className="font-semibold text-slate-900">{formData.primarySubjects}</p>
                    </div>
                  </div>
                </div>

                {/* Instructions for Applicant */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Hiring Process Next Steps:</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                    <li>
                      <strong className="text-slate-900">Application Screening:</strong> Our Academic Directorate reviews candidate qualifications within 3–5 working days.
                    </li>
                    <li>
                      <strong className="text-slate-900">Interview & Micro-Lesson:</strong> Shortlisted candidates will be contacted via WhatsApp/Phone for a scheduled 15-minute micro-teaching demonstration and interview at our Okene campus.
                    </li>
                    <li>
                      <strong className="text-slate-900">Physical Verification:</strong> Please bring your original academic certificates, NCE/Degree statement of result, NYSC discharge certificate (where applicable), and TRCN license.
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 print:hidden">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Print Application Slip</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForAnother}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all border border-slate-300 cursor-pointer"
                  >
                    <span>Submit Another Application</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE TEACHING JOB APPLICATION FORM */
            <div className="bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 p-6 sm:p-10 text-white border-b border-navy-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Official Faculty Application Portal</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Teaching Employment Application Form
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                      Complete this verified online application form to be considered for our teaching faculty. All submissions are stored directly with the school administration.
                    </p>
                  </div>

                  {selectedJob && (
                    <div className="bg-navy-800/90 border border-amber-500/40 rounded-xl p-3 text-right">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Applying For:</span>
                      <span className="text-xs font-bold text-white">{selectedJob.title}</span>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. POSITION SELECTION */}
                <div>
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <h3 className="font-serif text-base font-bold text-navy-950 uppercase tracking-wide">
                      Target Teaching Position & Role
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Position Applying For <span className="text-rose-600">*</span>
                      </label>
                      <select
                        name="positionAppliedFor"
                        value={formData.positionAppliedFor}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
                      >
                        {teachingVacancies.map((v) => (
                          <option key={v.id} value={v.title}>
                            {v.title} ({v.department})
                          </option>
                        ))}
                        <option value="General Primary Teaching">General Primary Class Teacher</option>
                        <option value="General Secondary Teaching">General Secondary Subject Teacher</option>
                        <option value="Early Childhood / Montessori">Early Childhood & Montessori Educator</option>
                        <option value="Other Subject Specialist">Other Subject Specialist</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Earliest Availability to Start <span className="text-rose-600">*</span>
                      </label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
                      >
                        <option value="Immediately / 2 Weeks Notice">Immediately / Within 2 Weeks</option>
                        <option value="Start of Upcoming Academic Term">Start of Upcoming Academic Session / Term</option>
                        <option value="1 Month Notice">1 Month Notice Required</option>
                        <option value="Mid-Term Resumption">Mid-Term Resumption</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. PERSONAL INFORMATION */}
                <div>
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-navy-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <h3 className="font-serif text-base font-bold text-navy-950 uppercase tracking-wide">
                      Personal & Contact Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Full Name (Title, First Name, Surname) <span className="text-rose-600">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Mr. Emmanuel Sunday Adebayo"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Email Address <span className="text-rose-600">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. adebayo@example.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Primary Phone Number <span className="text-rose-600">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 0802 345 6789"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        WhatsApp Number (For Direct Contact)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-emerald-600" />
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="e.g. 0802 345 6789"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        State of Origin / Nationality
                      </label>
                      <input
                        type="text"
                        name="stateOfOrigin"
                        value={formData.stateOfOrigin}
                        onChange={handleInputChange}
                        placeholder="e.g. Kogi State / Nigerian"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
                      />
                    </div>

                    <div className="lg:col-span-3 space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Current Residential Address (City / Town) <span className="text-rose-600">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          name="residentialAddress"
                          required
                          value={formData.residentialAddress}
                          onChange={handleInputChange}
                          placeholder="e.g. Zone 4, Okengwe Road, Okene, Kogi State"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. QUALIFICATIONS & TEACHING BACKGROUND */}
                <div>
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <h3 className="font-serif text-base font-bold text-navy-950 uppercase tracking-wide">
                      Academic Credentials & Teaching Background
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Highest Educational Qualification <span className="text-rose-600">*</span>
                      </label>
                      <select
                        name="highestQualification"
                        value={formData.highestQualification}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
                      >
                        <option value="B.Ed (Bachelor of Education)">B.Ed (Bachelor of Education)</option>
                        <option value="B.Sc (Ed) / B.A (Ed)">B.Sc (Ed) / B.A (Ed)</option>
                        <option value="B.Sc / B.A with PGDE">B.Sc / B.A with PGDE</option>
                        <option value="N.C.E (Nigeria Certificate in Education)">N.C.E (Nigeria Certificate in Education)</option>
                        <option value="M.Ed / M.Sc (Masters Degree)">M.Ed / M.Sc (Masters Degree)</option>
                        <option value="HND with PGDE">HND with PGDE</option>
                        <option value="Other Degree">Other Recognized Degree</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Course of Study / Major Discipline <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="courseOfStudy"
                        required
                        value={formData.courseOfStudy}
                        onChange={handleInputChange}
                        placeholder="e.g. Mathematics Education, English Studies, Chemistry..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Institution Graduated From <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="institutionGraduated"
                        required
                        value={formData.institutionGraduated}
                        onChange={handleInputChange}
                        placeholder="e.g. Federal University Lokoja / KSCOE"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Year of Graduation
                      </label>
                      <input
                        type="text"
                        name="yearGraduated"
                        value={formData.yearGraduated}
                        onChange={handleInputChange}
                        placeholder="e.g. 2021"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Years of Classroom Teaching Experience <span className="text-rose-600">*</span>
                      </label>
                      <select
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
                      >
                        <option value="Entry Level / Fresh Graduate (0 - 1 Year)">Entry Level / Fresh Graduate (0 - 1 Year)</option>
                        <option value="1 - 2 Years">1 - 2 Years</option>
                        <option value="3 - 5 Years">3 - 5 Years</option>
                        <option value="6 - 9 Years">6 - 9 Years</option>
                        <option value="10+ Years">10+ Years Senior Educator</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        TRCN Registration Status <span className="text-rose-600">*</span>
                      </label>
                      <select
                        name="trcnCertified"
                        value={formData.trcnCertified}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
                      >
                        <option value="Yes">Yes (Certified & Licensed)</option>
                        <option value="In Progress">In Progress / Application Pending</option>
                        <option value="No">Not Yet Registered</option>
                      </select>
                    </div>

                    <div className="lg:col-span-3 space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Current or Previous School / Employer (If any)
                      </label>
                      <input
                        type="text"
                        name="previousSchoolOrEmployer"
                        value={formData.previousSchoolOrEmployer}
                        onChange={handleInputChange}
                        placeholder="e.g. Standard Model Secondary School, Okene"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. SUBJECT COMPETENCIES & TEACHING STATEMENT */}
                <div>
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-navy-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                      4
                    </div>
                    <h3 className="font-serif text-base font-bold text-navy-950 uppercase tracking-wide">
                      Teaching Competencies, Resume & Statement
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Primary Subject(s) to Teach <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="primarySubjects"
                          required
                          value={formData.primarySubjects}
                          onChange={handleInputChange}
                          placeholder="e.g. General Mathematics, Further Mathematics"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Secondary Subject(s) / Co-Curricular Competencies
                        </label>
                        <input
                          type="text"
                          name="secondarySubjects"
                          value={formData.secondarySubjects}
                          onChange={handleInputChange}
                          placeholder="e.g. Basic Science, Physics, Debate Coach, Sports Master"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Resume / CV Summary & Key Achievements <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        name="cvResumeText"
                        required
                        rows={4}
                        value={formData.cvResumeText}
                        onChange={handleInputChange}
                        placeholder="Summarize your teaching history, schools worked, WAEC/NECO pass track record, classroom achievements, or paste a link to your Google Drive / LinkedIn CV..."
                        className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Statement of Purpose & Teaching Philosophy
                      </label>
                      <textarea
                        name="coverLetter"
                        rows={3}
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Why do you wish to join Divine Group of Schools? How do you motivate students to excel academically and uphold moral integrity?"
                        className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Declaration Checkbox */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeToTruthfulDeclaration"
                    name="agreeToTruthfulDeclaration"
                    checked={formData.agreeToTruthfulDeclaration}
                    onChange={handleInputChange}
                    className="mt-0.5 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="agreeToTruthfulDeclaration" className="text-xs text-slate-800 font-medium cursor-pointer leading-relaxed">
                    I solemnly declare that all educational certificates, personal particulars, and teaching experience stated herein are genuine and verifiable. I understand that falsification will lead to immediate disqualification.
                  </label>
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Official portal submission · No application fee required</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/25 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT TEACHING APPLICATION</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* 4-Step Hiring Process */}
        <div className="bg-slate-100/80 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Transparent Recruitment
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 tracking-tight mt-2">
              Our 4-Stage Faculty Selection Process
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Ensuring merit, moral integrity, and pedagogical excellence for our scholars.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Online Application',
                desc: 'Complete the verified teaching application form with academic credentials and subject specialties.',
              },
              {
                step: '02',
                title: 'Credential Screening',
                desc: 'Academic committee reviews degrees, TRCN status, and past student examination records.',
              },
              {
                step: '03',
                title: 'Micro-Teaching Demo',
                desc: 'Shortlisted candidates present a live 15-minute micro-lesson in their subject before a specialist panel.',
              },
              {
                step: '04',
                title: 'Appointment & Induction',
                desc: 'Successful teachers receive official employment contracts and commence orientation.',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-navy-950 text-amber-400 font-serif font-extrabold text-base flex items-center justify-center mb-3">
                    {st.step}
                  </div>
                  <h4 className="font-serif text-base font-bold text-navy-950">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-amber-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Stage {st.step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
