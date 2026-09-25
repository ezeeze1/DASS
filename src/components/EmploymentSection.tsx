import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Mail,
  ChevronDown,
  Building2,
  Users,
  BookOpen,
  ArrowDown,
} from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';
import TeachingApplicationForm from './TeachingApplicationForm';

interface EmploymentSectionProps {
  onContactClick?: () => void;
}

export default function EmploymentSection({ onContactClick }: EmploymentSectionProps) {
  const { content, teachingVacancies } = useWebsiteContent();
  const employmentData = content.employment;
  const schoolInfo = content.schoolInfo;

  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedJobIdForForm, setSelectedJobIdForForm] = useState<string | null>(null);

  const departments = [
    'All',
    'Primary Section',
    'Senior Secondary',
    'Junior & Senior Secondary',
    'Early Years / Nursery',
    'Vocational / ICT',
  ];

  const filteredVacancies =
    selectedDepartment === 'All'
      ? teachingVacancies
      : teachingVacancies.filter((v) =>
          v.department.toLowerCase().includes(selectedDepartment.toLowerCase())
        );

  const scrollToApplicationForm = (jobId?: string) => {
    if (jobId) {
      setSelectedJobIdForForm(jobId);
    }
    const formElement = document.getElementById('teaching-application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="employment" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Banner */}
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden border border-navy-800">
          {/* Subtle gold decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-navy-950 border border-amber-400/40 shadow-md mb-4">
              <Briefcase className="w-3.5 h-3.5 text-navy-950" />
              <span>{employmentData?.badge || 'Teaching Careers · Okene, Kogi State'}</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              {employmentData?.headline || 'JOIN OUR DISTINGUISHED TEACHING FACULTY'}
            </h2>

            <div className="w-20 h-1 bg-amber-500 my-5 rounded-full" />

            <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
              {employmentData?.subtitle ||
                'Inspire young minds, uphold pedagogical excellence, and build an impactful academic career with Divine Group of Schools.'}
            </p>

            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
              We are actively accepting applications from qualified, passionate educators for Creche, Nursery, Primary, and Junior/Senior Secondary classes. Discover our open positions and submit your credentials directly through this online portal.
            </p>

            {/* Banner CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => scrollToApplicationForm()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 active:translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>APPLY FOR A TEACHING JOB</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <a
                href="#current-vacancies"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-navy-800/80 hover:bg-navy-800 text-white border border-slate-700 hover:border-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200"
              >
                <span>EXPLORE {teachingVacancies.length} OPEN VACANCIES</span>
              </a>

              {onContactClick && (
                <button
                  onClick={onContactClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>RECRUITMENT INQUIRY</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4 Benefits of Teaching at Divine Group of Schools */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Why Teach With Us
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight mt-2">
              Why Educators Flourish at Divine Group of Schools
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              We empower our teachers with the tools, respect, and professional support needed to transform learning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(employmentData?.benefits || []).map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-amber-400 flex items-center justify-center mb-4 shadow-sm">
                    {idx === 0 && <Award className="w-6 h-6" />}
                    {idx === 1 && <Building2 className="w-6 h-6" />}
                    {idx === 2 && <BookOpen className="w-6 h-6" />}
                    {idx === 3 && <Users className="w-6 h-6" />}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-navy-950 tracking-tight">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Divine Faculty Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Teaching Vacancies Section */}
        <div id="current-vacancies" className="mt-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
                Available Positions
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight mt-2">
                Open Teaching Job Vacancies
              </h3>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Browse our current openings across early years, primary, and secondary disciplines in Okene, Kogi State.
              </p>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedDepartment === dept
                      ? 'bg-navy-950 text-white shadow'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Vacancies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      {vacancy.department}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {vacancy.employmentType}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-navy-950 group-hover:text-amber-700 transition-colors">
                    {vacancy.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {vacancy.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      {vacancy.level}
                    </span>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {vacancy.description}
                  </p>

                  {/* Requirements List */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-navy-900 block mb-1">
                      Key Qualifications:
                    </span>
                    {vacancy.requirements.slice(0, 3).map((req, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Full-Time Teaching Staff</span>
                  <button
                    onClick={() => scrollToApplicationForm(vacancy.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy-950 hover:bg-amber-500 hover:text-navy-950 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredVacancies.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h5 className="font-serif text-lg font-bold text-slate-800">
                No vacancies found in this department
              </h5>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                You can still submit a general teaching application form below. We frequently review qualified candidates for upcoming roles.
              </p>
              <button
                onClick={() => setSelectedDepartment('All')}
                className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg uppercase"
              >
                View All Departments
              </button>
            </div>
          )}
        </div>

        {/* 4-Step Hiring Procedure */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Selection Process
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight mt-2">
              Four Transparent Steps to Joining Our Faculty
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Our academic board evaluates candidates with fairness, professional respect, and pedagogical integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(employmentData?.hiringSteps || []).map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-950 text-amber-400 font-serif font-extrabold text-lg flex items-center justify-center mb-4 shadow-sm">
                    {step.step}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-navy-950 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Stage {step.step} Requirement</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* THE OFFICIAL TEACHING APPLICATION FORM */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Online Submission Portal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight mt-2">
              Apply for a Teaching Position
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Interested applicants can submit their qualifications, teaching background, and CV directly through this secure form.
            </p>
          </div>

          <TeachingApplicationForm selectedJobId={selectedJobIdForForm} />
        </div>

        {/* Recruitment Support Desk Contact */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-navy-950 flex items-center justify-center shrink-0 shadow-md">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-navy-950">
                Teacher Recruitment & Academic Office
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                For inquiries regarding teaching positions, subject specializations, or interview scheduling:
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-semibold text-navy-900">
                <span>{schoolInfo.address}</span>
                <span>·</span>
                <span>{schoolInfo.emails[0]}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`tel:${(schoolInfo.phones[0] || '').replace(/[^0-9+]/g, '')}`}
              className="w-full sm:w-auto text-center px-5 py-3 bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              Call Recruitment Desk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
