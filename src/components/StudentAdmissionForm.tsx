import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  ClipboardList,
  FileCheck2,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';

const SCHOOL_LEVEL_OPTIONS = [
  'Creche & Toddler Daycare (3 months - 2 years)',
  'Nursery 1 & 2 (3 - 5 years)',
  'Primary School - Basic 1',
  'Primary School - Basic 2',
  'Primary School - Basic 3',
  'Primary School - Basic 4',
  'Primary School - Basic 5',
  'Primary School - Basic 6',
  'Junior Secondary - JSS 1 (Fresh Entry)',
  'Junior Secondary - JSS 2 (Transfer)',
  'Junior Secondary - JSS 3',
  'Senior Secondary - SSS 1 (Science Stream)',
  'Senior Secondary - SSS 1 (Arts & Humanities)',
  'Senior Secondary - SSS 1 (Commercial / Business)',
  'Senior Secondary - SSS 2 (Science Stream)',
  'Senior Secondary - SSS 2 (Arts / Commercial)',
  'Senior Secondary - SSS 3 (Final Year Candidates)',
];

const ENTRY_TERM_OPTIONS = [
  'First Term (September 2026 Resumption)',
  'Second Term (January 2027 Entry)',
  'Third Term (April 2027 Entry)',
  'Immediate Mid-Term Transfer',
];

interface StudentAdmissionFormProps {
  className?: string;
  onSuccessSubmitted?: (refCode: string) => void;
}

export default function StudentAdmissionForm({ className = '', onSuccessSubmitted }: StudentAdmissionFormProps) {
  const { submitStudentAdmission, content } = useWebsiteContent();
  const SCHOOL_INFO = content.schoolInfo;

  const [formData, setFormData] = useState({
    studentFullName: '',
    dateOfBirth: '',
    gender: 'Male' as 'Male' | 'Female',
    levelApplying: SCHOOL_LEVEL_OPTIONS[2],
    entryTerm: ENTRY_TERM_OPTIONS[0],
    previousSchool: '',
    lastClassCompleted: '',
    parentFullName: '',
    parentRelationship: 'Father',
    parentPhone: '',
    parentWhatsapp: '',
    parentEmail: '',
    parentAddress: '',
    academicInterests: '',
    medicalOrSpecialNeeds: '',
    agreementConfirmed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submissionDate, setSubmissionDate] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    // Basic Validations
    if (!formData.studentFullName.trim()) {
      setErrorMsg('Please provide the full name of the prospective student.');
      return;
    }
    if (!formData.dateOfBirth) {
      setErrorMsg("Please select the student's date of birth.");
      return;
    }
    if (!formData.parentFullName.trim()) {
      setErrorMsg("Please provide the parent or guardian's full name.");
      return;
    }
    if (!formData.parentPhone.trim()) {
      setErrorMsg('Please enter a valid phone number for the parent/guardian.');
      return;
    }
    if (!formData.agreementConfirmed) {
      setErrorMsg('Please check the confirmation box to verify the accuracy of information provided.');
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedRef = submitStudentAdmission({
        studentFullName: formData.studentFullName.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        levelApplying: formData.levelApplying,
        entryTerm: formData.entryTerm,
        previousSchool: formData.previousSchool.trim() || 'First School Enrollment',
        lastClassCompleted: formData.lastClassCompleted.trim() || 'N/A',
        parentFullName: formData.parentFullName.trim(),
        parentRelationship: formData.parentRelationship,
        parentPhone: formData.parentPhone.trim(),
        parentWhatsapp: formData.parentWhatsapp.trim() || formData.parentPhone.trim(),
        parentEmail: formData.parentEmail.trim() || 'not-provided@divinegroup.edu.ng',
        parentAddress: formData.parentAddress.trim() || 'Okene, Kogi State',
        academicInterests: formData.academicInterests.trim(),
        medicalOrSpecialNeeds: formData.medicalOrSpecialNeeds.trim(),
      });

      setSubmittedRef(generatedRef);
      setSubmissionDate(new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }));
      if (onSuccessSubmitted) {
        onSuccessSubmitted(generatedRef);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An error occurred while saving your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForAnother = () => {
    setSubmittedRef(null);
    setFormData({
      studentFullName: '',
      dateOfBirth: '',
      gender: 'Male',
      levelApplying: SCHOOL_LEVEL_OPTIONS[2],
      entryTerm: ENTRY_TERM_OPTIONS[0],
      previousSchool: '',
      lastClassCompleted: '',
      parentFullName: '',
      parentRelationship: 'Father',
      parentPhone: '',
      parentWhatsapp: '',
      parentEmail: '',
      parentAddress: '',
      academicInterests: '',
      medicalOrSpecialNeeds: '',
      agreementConfirmed: false,
    });
  };

  // SUCCESS CONFIRMATION RECEIPT VIEW
  if (submittedRef) {
    return (
      <div className={`bg-white rounded-2xl border-2 border-emerald-500/40 p-6 sm:p-10 shadow-xl print:shadow-none print:border-none ${className}`}>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 inline-block mb-1">
                Application Successfully Received
              </span>
              <h3 className="font-serif text-2xl font-bold text-navy-950">
                Official Admission Inquiry Slip
              </h3>
              <p className="text-xs text-slate-700">
                Divine Group of Schools · Former Bamijoko Compound, Inoziomi, Okene, Kogi State
              </p>
            </div>
          </div>

          {/* Reference Card Voucher */}
          <div className="bg-gradient-to-br from-amber-50/90 via-white to-amber-100/50 rounded-2xl p-6 border-2 border-amber-300 relative shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                  Application Reference Number
                </span>
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-navy-950 tracking-wider">
                  {submittedRef}
                </span>
              </div>
              <div className="text-xs text-slate-800 sm:text-right">
                <span className="font-semibold text-slate-900 block">Date of Submission:</span>
                <span>{submissionDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs text-slate-800">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Candidate Name:</span>
                <p className="font-bold text-sm text-slate-950">{formData.studentFullName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Level & Term Applied:</span>
                <p className="font-bold text-sm text-slate-950">{formData.levelApplying}</p>
                <p className="text-[11px] text-amber-900">{formData.entryTerm}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Gender / DOB:</span>
                <p className="font-medium text-slate-900">{formData.gender} · Born {formData.dateOfBirth}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Parent / Contact:</span>
                <p className="font-bold text-slate-950">{formData.parentFullName} ({formData.parentRelationship})</p>
                <p className="text-slate-800 font-medium">{formData.parentPhone}</p>
              </div>
            </div>
          </div>

          {/* Next Steps & Physical Checklist */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-amber-600" />
              <span>Next Steps for Final Admission:</span>
            </h4>
            <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-slate-900">Visit Campus:</strong> Bring this reference slip to the Admissions Office at <span className="text-slate-900">{SCHOOL_INFO.address}</span>.
              </li>
              <li>
                <strong className="text-slate-900">Required Documents:</strong> Please come with the student's Birth Certificate, 2 recent passport photographs, and previous term report card.
              </li>
              <li>
                <strong className="text-slate-900">Diagnostic Placement Test:</strong> A brief diagnostic evaluation in English, Mathematics, and General Knowledge will be administered.
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
              <span>Print Application Voucher</span>
            </button>

            <button
              type="button"
              onClick={handleResetForAnother}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all border border-slate-300 cursor-pointer"
            >
              <span>Submit Another Admission</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE ENROLLMENT APPLICATION FORM
  return (
    <div className={`bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden ${className}`}>
      {/* Form Top Ribbon */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 p-6 sm:p-8 text-white border-b border-navy-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Student Enrollment Form</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Online Admission Application
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Complete the verified form below to begin your child's enrollment into Creche, Primary, or Secondary sections.
            </p>
          </div>

          <div className="shrink-0 bg-navy-800/80 border border-navy-700 rounded-xl p-3 text-right hidden sm:block">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Academic Session</span>
            <span className="text-sm font-extrabold text-white">2026 / 2027 Admissions Open</span>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* SECTION 1: CANDIDATE INFORMATION */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 mb-5">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h4 className="font-serif text-base font-bold text-navy-950 uppercase tracking-wide">
              Student / Candidate Details
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Full Name */}
            <div className="lg:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Student Full Name <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="studentFullName"
                  required
                  value={formData.studentFullName}
                  onChange={handleChange}
                  placeholder="e.g. Samuel Ohiare Ibrahim"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                />
              </div>
              <span className="text-[11px] text-slate-600">Please provide full surname, first name, and middle name.</span>
            </div>

            {/* Date of Birth */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Date of Birth <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Gender <span className="text-rose-600">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Level Applying For */}
            <div className="lg:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Class / Educational Level Applying For <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <select
                  name="levelApplying"
                  value={formData.levelApplying}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
                >
                  {SCHOOL_LEVEL_OPTIONS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Entry Term */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Intended Entry Term <span className="text-rose-600">*</span>
              </label>
              <select
                name="entryTerm"
                value={formData.entryTerm}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
              >
                {ENTRY_TERM_OPTIONS.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>

            {/* Previous School */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Previous School Attended (If any)
              </label>
              <input
                type="text"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
                placeholder="e.g. Standard Nursery / Primary School"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
              />
            </div>

            {/* Last Class Completed */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Last Class Completed
              </label>
              <input
                type="text"
                name="lastClassCompleted"
                value={formData.lastClassCompleted}
                onChange={handleChange}
                placeholder="e.g. Basic 3 or JSS 1"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: PARENT / GUARDIAN DETAILS */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 mb-5">
            <div className="w-7 h-7 rounded-lg bg-navy-900 text-amber-400 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h4 className="font-serif text-base font-bold text-navy-950 uppercase tracking-wide">
              Parent or Legal Guardian Information
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Parent Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Parent / Guardian Name <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="parentFullName"
                  required
                  value={formData.parentFullName}
                  onChange={handleChange}
                  placeholder="e.g. Mr. / Mrs. / Alhaji Ibrahim"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Relationship */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Relationship to Student <span className="text-rose-600">*</span>
              </label>
              <select
                name="parentRelationship"
                value={formData.parentRelationship}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 bg-white"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Legal Guardian / Sponsor</option>
                <option value="Relative">Other Relative</option>
              </select>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Primary Phone Number <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  name="parentPhone"
                  required
                  value={formData.parentPhone}
                  onChange={handleChange}
                  placeholder="e.g. 0803 123 4567"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                WhatsApp Number (For Updates)
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-emerald-500" />
                <input
                  type="tel"
                  name="parentWhatsapp"
                  value={formData.parentWhatsapp}
                  onChange={handleChange}
                  placeholder="e.g. 0803 123 4567"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Parent Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  placeholder="e.g. ibrahim@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Residential Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Residential Address in Okene / Kogi
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="parentAddress"
                  value={formData.parentAddress}
                  onChange={handleChange}
                  placeholder="e.g. Inoziomi, Okene, Kogi State"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: PASTORAL, INTERESTS & SPECIAL NOTES */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 mb-5">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h4 className="font-serif text-base font-bold text-navy-950 uppercase tracking-wide">
              Academic Interests & Pastoral Support
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Student's Talents & Academic Interests
              </label>
              <textarea
                name="academicInterests"
                rows={2}
                value={formData.academicInterests}
                onChange={handleChange}
                placeholder="e.g. Loves science projects, mathematics, debate club, football, choir, or visual arts..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Medical Considerations / Special Needs (Optional)
              </label>
              <textarea
                name="medicalOrSpecialNeeds"
                rows={2}
                value={formData.medicalOrSpecialNeeds}
                onChange={handleChange}
                placeholder="e.g. Allergies, asthma, eyeglasses, dietary requirements or specific learning assistance..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
          <input
            type="checkbox"
            id="agreementConfirmed"
            name="agreementConfirmed"
            checked={formData.agreementConfirmed}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
          />
          <label htmlFor="agreementConfirmed" className="text-xs text-slate-800 font-medium cursor-pointer leading-relaxed">
            I hereby confirm that the information provided in this admission application is accurate and true to the best of my knowledge. I understand that submitting this form initiates the admissions review process with Divine Group of Schools, Okene.
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure official submission · No online fee required to submit initial application</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/25 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Processing Application...</span>
              </>
            ) : (
              <>
                <FileCheck2 className="w-4 h-4" />
                <span>SUBMIT ADMISSION APPLICATION</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
