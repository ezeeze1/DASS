import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  GraduationCap,
  Clock,
  Printer,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Award,
  BookOpen,
  Plus,
  Edit,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useWebsiteContent } from '../../context/WebsiteContext';
import { TeachingApplication, TeachingJobOpening } from '../../types';

interface AdminTeacherApplicationsProps {
  onToast: (msg: string) => void;
}

export default function AdminTeacherApplications({ onToast }: AdminTeacherApplicationsProps) {
  const {
    teachingApplications,
    teachingVacancies,
    updateTeachingApplicationStatus,
    deleteTeachingApplication,
    updateTeachingVacancies,
  } = useWebsiteContent();

  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'vacancies'>('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [positionFilter, setPositionFilter] = useState<string>('All');

  // New vacancy modal state
  const [isAddingVacancy, setIsAddingVacancy] = useState(false);
  const [newVacancy, setNewVacancy] = useState<Partial<TeachingJobOpening>>({
    title: '',
    department: 'Primary Section',
    level: 'Basic 1 - 6',
    employmentType: 'Full-Time',
    location: 'Okene, Kogi State',
    description: '',
    requirements: [''],
    responsibilities: [''],
  });

  // Filtered applicants
  const filteredApps = teachingApplications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.positionAppliedFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.primarySubjects.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ? true : app.status === statusFilter;

    const matchesPos =
      positionFilter === 'All'
        ? true
        : app.positionAppliedFor.toLowerCase().includes(positionFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesPos;
  });

  const countPending = teachingApplications.filter((a) => a.status === 'Pending').length;
  const countShortlisted = teachingApplications.filter((a) => a.status === 'Shortlisted').length;
  const countInterview = teachingApplications.filter(
    (a) => a.status === 'Interview Scheduled'
  ).length;
  const countEmployed = teachingApplications.filter((a) => a.status === 'Employed').length;

  const handleStatusChange = (
    id: string,
    newStatus: TeachingApplication['status']
  ) => {
    updateTeachingApplicationStatus(id, newStatus);
    onToast(`Teacher applicant status updated to "${newStatus}".`);
  };

  const handleNotesChange = (id: string, notes: string) => {
    const current = teachingApplications.find((a) => a.id === id);
    if (current) {
      updateTeachingApplicationStatus(id, current.status, notes);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete teaching application for ${name}?`)) {
      deleteTeachingApplication(id);
      onToast(`Application for ${name} removed.`);
    }
  };

  const handleDeleteVacancy = (vacancyId: string, title: string) => {
    if (window.confirm(`Remove teaching vacancy "${title}" from the website?`)) {
      const updated = teachingVacancies.filter((v) => v.id !== vacancyId);
      updateTeachingVacancies(updated);
      onToast(`Vacancy "${title}" removed.`);
    }
  };

  const handleSaveNewVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVacancy.title?.trim()) {
      alert('Please enter a vacancy job title.');
      return;
    }

    const created: TeachingJobOpening = {
      id: `vac-${Date.now()}`,
      title: newVacancy.title.trim(),
      department: newVacancy.department || 'General Faculty',
      level: newVacancy.level || 'All Levels',
      employmentType: (newVacancy.employmentType as any) || 'Full-Time',
      location: 'Okene, Kogi State',
      description:
        newVacancy.description?.trim() ||
        'Educator role at Divine Group of Schools, Okene.',
      requirements: (newVacancy.requirements || []).filter((r) => r.trim() !== ''),
      responsibilities: (newVacancy.responsibilities || []).filter((r) => r.trim() !== ''),
    };

    updateTeachingVacancies([created, ...teachingVacancies]);
    setIsAddingVacancy(false);
    setNewVacancy({
      title: '',
      department: 'Primary Section',
      level: 'Basic 1 - 6',
      employmentType: 'Full-Time',
      location: 'Okene, Kogi State',
      description: '',
      requirements: [''],
      responsibilities: [''],
    });
    onToast(`New vacancy "${created.title}" published!`);
  };

  const exportToCSV = () => {
    if (teachingApplications.length === 0) {
      alert('No teacher applications to export.');
      return;
    }

    const headers = [
      'Reference Number',
      'Date Applied',
      'Full Name',
      'Email',
      'Phone',
      'WhatsApp',
      'Address',
      'Position Applied',
      'Qualification',
      'Course of Study',
      'Institution',
      'Graduation Year',
      'TRCN Status',
      'Teaching Experience',
      'Previous Employer',
      'Primary Subjects',
      'Availability',
      'Status',
      'Admin Notes',
    ];

    const rows = teachingApplications.map((app) => [
      `"${app.referenceNumber}"`,
      `"${new Date(app.createdAt).toLocaleDateString()}"`,
      `"${app.fullName.replace(/"/g, '""')}"`,
      `"${app.email}"`,
      `"${app.phone}"`,
      `"${app.whatsapp || ''}"`,
      `"${app.residentialAddress.replace(/"/g, '""')}"`,
      `"${app.positionAppliedFor.replace(/"/g, '""')}"`,
      `"${app.highestQualification}"`,
      `"${app.courseOfStudy.replace(/"/g, '""')}"`,
      `"${app.institutionGraduated.replace(/"/g, '""')}"`,
      `"${app.yearGraduated || ''}"`,
      `"${app.trcnCertified}"`,
      `"${app.yearsOfExperience}"`,
      `"${app.previousSchoolOrEmployer.replace(/"/g, '""')}"`,
      `"${app.primarySubjects.replace(/"/g, '""')}"`,
      `"${app.availability}"`,
      `"${app.status}"`,
      `"${(app.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `divine_schools_teacher_applications_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    onToast('Teacher applications CSV exported.');
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-white">
              Faculty Recruitment & Teaching Applications
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-xs font-bold">
              {teachingApplications.length}
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Manage teacher job applications submitted through the website, schedule micro-teaching demos, and manage vacancies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Subtabs switcher */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveSubTab('applications')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'applications'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Applicants ({teachingApplications.length})
            </button>
            <button
              onClick={() => setActiveSubTab('vacancies')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'vacancies'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Vacancies ({teachingVacancies.length})
            </button>
          </div>

          {activeSubTab === 'applications' && (
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-700 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>CSV</span>
            </button>
          )}

          {activeSubTab === 'vacancies' && (
            <button
              onClick={() => setIsAddingVacancy(true)}
              className="inline-flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow"
            >
              <Plus className="w-4 h-4" />
              <span>New Vacancy</span>
            </button>
          )}
        </div>
      </div>

      {/* APPLICANTS TAB */}
      {activeSubTab === 'applications' && (
        <>
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Total Applicants
              </span>
              <span className="text-2xl font-extrabold text-white mt-1 block">
                {teachingApplications.length}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                Pending Review
              </span>
              <span className="text-2xl font-extrabold text-amber-300 mt-1 block">
                {countPending}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block">
                Demo / Interview
              </span>
              <span className="text-2xl font-extrabold text-blue-300 mt-1 block">
                {countInterview}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                Shortlisted / Hired
              </span>
              <span className="text-2xl font-extrabold text-emerald-300 mt-1 block">
                {countShortlisted + countEmployed}
              </span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search teacher applicants by name, subject, email, or reference code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Employed">Employed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          {/* List of Applications */}
          <div className="space-y-4">
            {filteredApps.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700 text-slate-400">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-slate-500" />
                <p className="text-sm">No teacher applications match this query.</p>
              </div>
            ) : (
              filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 hover:border-slate-600 transition-all space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700 pb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                        {app.referenceNumber}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-slate-300 font-semibold bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700">
                        {app.positionAppliedFor}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(
                            app.id,
                            e.target.value as TeachingApplication['status']
                          )
                        }
                        className={`text-xs font-bold px-3 py-1 rounded-lg border focus:outline-none ${
                          app.status === 'Employed'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                            : app.status === 'Shortlisted'
                            ? 'bg-teal-950/80 text-teal-300 border-teal-700'
                            : app.status === 'Interview Scheduled'
                            ? 'bg-blue-950/80 text-blue-300 border-blue-700'
                            : app.status === 'Archived'
                            ? 'bg-slate-900 text-slate-400 border-slate-700'
                            : 'bg-amber-950/80 text-amber-300 border-amber-700'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Employed">Employed</option>
                        <option value="Archived">Archived</option>
                      </select>

                      <button
                        onClick={() => handleDelete(app.id, app.fullName)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700/60 rounded-lg transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 3-Column Detailed View */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Col 1: Identity & Credentials */}
                    <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        Candidate Credentials
                      </span>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{app.fullName}</span>
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">Degree: </span>
                        <strong>{app.highestQualification}</strong>
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">Major: </span>
                        {app.courseOfStudy}{' '}
                        {app.institutionGraduated && `(${app.institutionGraduated})`}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">TRCN Certified: </span>
                        <span
                          className={`font-semibold ${
                            app.trcnCertified === 'Yes'
                              ? 'text-emerald-400'
                              : app.trcnCertified === 'In Progress'
                              ? 'text-amber-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {app.trcnCertified}
                        </span>
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">Experience: </span>
                        {app.yearsOfExperience}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">Previous School: </span>
                        {app.previousSchoolOrEmployer || 'N/A'}
                      </div>
                    </div>

                    {/* Col 2: Subjects & Contacts */}
                    <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        Teaching Subjects & Contact
                      </span>
                      <div className="text-slate-200">
                        <span className="text-slate-500">Primary: </span>
                        <strong className="text-amber-300">{app.primarySubjects}</strong>
                      </div>
                      {app.secondarySubjects && (
                        <div className="text-slate-300">
                          <span className="text-slate-500">Subsidiary: </span>
                          {app.secondarySubjects}
                        </div>
                      )}
                      <div className="text-slate-300">
                        <span className="text-slate-500">Availability: </span>
                        {app.availability}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`tel:${app.phone.replace(/[^0-9+]/g, '')}`}
                          className="inline-flex items-center gap-1 text-amber-400 hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{app.phone}</span>
                        </a>
                      </div>
                      {app.whatsapp && (
                        <div>
                          <a
                            href={`https://wa.me/${app.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:underline text-[11px]"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp Candidate</span>
                          </a>
                        </div>
                      )}
                      <div className="text-slate-400 truncate">
                        <Mail className="w-3 h-3 inline mr-1 text-slate-500" />
                        {app.email}
                      </div>
                      <div className="text-slate-400 truncate">
                        <MapPin className="w-3 h-3 inline mr-1 text-slate-500" />
                        {app.residentialAddress}
                      </div>
                    </div>

                    {/* Col 3: Statement & Admin Notes */}
                    <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                          Statement & CV Summary
                        </span>
                        {app.coverLetter && (
                          <p className="text-slate-300 text-[11px] mb-1 italic line-clamp-2">
                            "{app.coverLetter}"
                          </p>
                        )}
                        {app.cvResumeText && (
                          <p className="text-slate-400 text-[11px] line-clamp-2">
                            {app.cvResumeText}
                          </p>
                        )}
                      </div>

                      <div className="pt-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Registrar / Interview Note:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Demo set for Friday 11am; Good communication..."
                          value={app.adminNotes || ''}
                          onChange={(e) => handleNotesChange(app.id, e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* VACANCIES TAB */}
      {activeSubTab === 'vacancies' && (
        <div className="space-y-6">
          {/* Add Vacancy Modal */}
          {isAddingVacancy && (
            <div className="bg-slate-800 rounded-2xl border-2 border-amber-500/50 p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <span>Create New Teaching Vacancy</span>
              </h3>

              <form onSubmit={handleSaveNewVacancy} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-bold mb-1">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Physics & Further Mathematics Teacher"
                      value={newVacancy.title}
                      onChange={(e) =>
                        setNewVacancy((prev) => ({ ...prev, title: e.target.value }))
                      }
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Department</label>
                    <select
                      value={newVacancy.department}
                      onChange={(e) =>
                        setNewVacancy((prev) => ({ ...prev, department: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    >
                      <option value="Early Years / Nursery">Early Years / Nursery</option>
                      <option value="Primary Section">Primary Section</option>
                      <option value="Junior Secondary">Junior Secondary</option>
                      <option value="Senior Secondary">Senior Secondary</option>
                      <option value="Vocational / ICT">Vocational / ICT</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Target Level
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. JSS 1 - SSS 3 or Basic 1 - 6"
                      value={newVacancy.level}
                      onChange={(e) =>
                        setNewVacancy((prev) => ({ ...prev, level: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Employment Type
                    </label>
                    <select
                      value={newVacancy.employmentType}
                      onChange={(e) =>
                        setNewVacancy((prev) => ({ ...prev, employmentType: e.target.value as any }))
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Role Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short summary of role expectations..."
                    value={newVacancy.description}
                    onChange={(e) =>
                      setNewVacancy((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingVacancy(false)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                  >
                    Publish Vacancy
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List of Vacancies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teachingVacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {vacancy.department}
                    </span>
                    <h4 className="font-serif text-base font-bold text-white mt-1">
                      {vacancy.title}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {vacancy.level} · {vacancy.employmentType}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteVacancy(vacancy.id, vacancy.title)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Remove vacancy"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {vacancy.description}
                </p>

                <div className="pt-2 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Location: {vacancy.location}</span>
                  <span className="text-emerald-400 font-semibold">Active On Website</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
