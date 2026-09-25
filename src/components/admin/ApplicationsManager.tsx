import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Printer,
  Trash2,
  Edit3,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Save,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { StudentAdmissionApplication, TeachingApplication } from '../../types';

// ==========================================
// 1. STUDENT ADMISSIONS MANAGEMENT TAB
// ==========================================
interface StudentApplicationsTabProps {
  applications: StudentAdmissionApplication[];
  onUpdateStatus: (id: string, status: StudentAdmissionApplication['status'], notes?: string) => void;
  onDelete: (id: string) => void;
  triggerToast: (msg: string) => void;
}

export function StudentApplicationsTab({
  applications,
  onUpdateStatus,
  onDelete,
  triggerToast,
}: StudentApplicationsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<string>('');

  const statusOptions: StudentAdmissionApplication['status'][] = [
    'Pending Review',
    'Assessment Scheduled',
    'Accepted',
    'Declined',
  ];

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.studentFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parentFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.levelApplying.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parentPhone.includes(searchTerm);

    const matchesStatus = selectedStatus === 'All' || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: StudentAdmissionApplication['status']) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Assessment Scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Declined':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default:
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    }
  };

  const handleStartEditNotes = (app: StudentAdmissionApplication) => {
    setEditingNotesId(app.id);
    setNotesDraft(app.adminNotes || '');
  };

  const handleSaveNotes = (id: string, currentStatus: StudentAdmissionApplication['status']) => {
    onUpdateStatus(id, currentStatus, notesDraft);
    setEditingNotesId(null);
    triggerToast('Administrative note updated.');
  };

  const handleDeletePrompt = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the admission record for ${name}?`)) {
      onDelete(id);
      triggerToast('Student admission application deleted.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-amber-400" />
            <span>Student Admission Applications</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage incoming student enrollments, schedule placement assessments, and record admissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-700 text-xs font-bold text-amber-400">
            Total Applications: {applications.length}
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: 'Pending Review',
            count: applications.filter((a) => a.status === 'Pending Review').length,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10 border-amber-500/20',
          },
          {
            label: 'Test Scheduled',
            count: applications.filter((a) => a.status === 'Assessment Scheduled').length,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/20',
          },
          {
            label: 'Admitted / Accepted',
            count: applications.filter((a) => a.status === 'Accepted').length,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10 border-emerald-500/20',
          },
          {
            label: 'Total Registered',
            count: applications.length,
            color: 'text-slate-200',
            bg: 'bg-slate-800 border-slate-700',
          },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl border ${stat.bg} space-y-1`}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {stat.label}
            </span>
            <span className={`text-2xl font-black ${stat.color}`}>{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, parent phone, or reference code..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700">
          {['All', 'Pending Review', 'Assessment Scheduled', 'Accepted', 'Declined'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <GraduationCap className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-slate-400 text-sm font-medium">No admission applications match your filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => {
            const cleanPhone = app.parentPhone.replace(/[^0-9+]/g, '');
            const whatsappNumber = (app.parentWhatsapp || app.parentPhone).replace(/[^0-9]/g, '');

            return (
              <div
                key={app.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-700/80 p-5 sm:p-6 space-y-4 hover:border-slate-600 transition-all shadow-lg"
              >
                {/* Card Top: Reference + Status + Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                      {app.referenceNumber}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Submitted: {new Date(app.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status Dropdown */}
                    <select
                      value={app.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as StudentAdmissionApplication['status'];
                        onUpdateStatus(app.id, newStatus, app.adminNotes);
                        triggerToast(`Status changed to "${newStatus}"`);
                      }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${getStatusBadgeClass(app.status)} bg-slate-900`}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleDeletePrompt(app.id, app.studentFullName)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Candidate & Parent Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {/* Candidate */}
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Candidate</span>
                    </span>
                    <p className="font-bold text-sm text-white">{app.studentFullName}</p>
                    <p className="text-slate-300">
                      {app.gender} · DOB: {app.dateOfBirth}
                    </p>
                    <p className="text-amber-300 font-semibold">{app.levelApplying}</p>
                    <p className="text-slate-400 text-[11px]">{app.entryTerm}</p>
                  </div>

                  {/* Previous Education */}
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Academic Background</span>
                    </span>
                    <p className="text-slate-300">
                      <strong className="text-white">Previous School:</strong> {app.previousSchool || 'N/A'}
                    </p>
                    <p className="text-slate-300">
                      <strong className="text-white">Last Class:</strong> {app.lastClassCompleted || 'N/A'}
                    </p>
                    {app.academicInterests && (
                      <p className="text-slate-300 text-[11px] pt-1">
                        <strong className="text-amber-400">Interests:</strong> {app.academicInterests}
                      </p>
                    )}
                    {app.medicalOrSpecialNeeds && (
                      <p className="text-amber-300 text-[11px]">
                        <strong>Special Needs:</strong> {app.medicalOrSpecialNeeds}
                      </p>
                    )}
                  </div>

                  {/* Parent / Guardian */}
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Parent / Guardian</span>
                    </span>
                    <p className="font-bold text-white">
                      {app.parentFullName} ({app.parentRelationship})
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-semibold transition-colors"
                      >
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span>Call: {app.parentPhone}</span>
                      </a>
                      {whatsappNumber && (
                        <a
                          href={`https://wa.me/${whatsappNumber}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-semibold transition-colors"
                          title="Message on WhatsApp"
                        >
                          <MessageSquare className="w-3 h-3 text-white" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                    {app.parentEmail && (
                      <p className="text-slate-400 text-[11px] pt-0.5 truncate">
                        {app.parentEmail}
                      </p>
                    )}
                    <p className="text-slate-400 text-[11px] flex items-start gap-1">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                      <span>{app.parentAddress}</span>
                    </p>
                  </div>
                </div>

                {/* Admin Notes Section */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex-1">
                    {editingNotesId === app.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={notesDraft}
                          onChange={(e) => setNotesDraft(e.target.value)}
                          placeholder="Add administrative follow-up note (e.g. Assessment test scheduled for Saturday 10am)..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-amber-400/50 text-white text-xs focus:outline-none"
                        />
                        <button
                          onClick={() => handleSaveNotes(app.id, app.status)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs uppercase cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="font-semibold text-slate-300">Office Note:</span>
                        <span className="italic text-slate-300">
                          {app.adminNotes || 'No notes added yet.'}
                        </span>
                        <button
                          onClick={() => handleStartEditNotes(app)}
                          className="p-1 text-slate-400 hover:text-amber-400 rounded cursor-pointer"
                          title="Edit Note"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Print Record</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. TEACHER APPLICATIONS MANAGEMENT TAB
// ==========================================
interface TeacherApplicationsTabProps {
  applications: TeachingApplication[];
  onUpdateStatus: (id: string, status: TeachingApplication['status'], notes?: string) => void;
  onDelete: (id: string) => void;
  triggerToast: (msg: string) => void;
}

export function TeacherApplicationsTab({
  applications,
  onUpdateStatus,
  onDelete,
  triggerToast,
}: TeacherApplicationsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<string>('');

  const statusOptions: TeachingApplication['status'][] = [
    'Pending',
    'Shortlisted',
    'Interview Scheduled',
    'Employed',
    'Archived',
  ];

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.positionAppliedFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.primarySubjects.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.highestQualification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm);

    const matchesStatus = selectedStatus === 'All' || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: TeachingApplication['status']) => {
    switch (status) {
      case 'Employed':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Interview Scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Shortlisted':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Archived':
        return 'bg-slate-700 text-slate-400 border-slate-600';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const handleStartEditNotes = (app: TeachingApplication) => {
    setEditingNotesId(app.id);
    setNotesDraft(app.adminNotes || '');
  };

  const handleSaveNotes = (id: string, currentStatus: TeachingApplication['status']) => {
    onUpdateStatus(id, currentStatus, notesDraft);
    setEditingNotesId(null);
    triggerToast('Teacher candidate note updated.');
  };

  const handleDeletePrompt = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the job application for ${name}?`)) {
      onDelete(id);
      triggerToast('Teaching job application deleted.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-amber-400" />
            <span>Teaching Faculty Job Applications</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review educator credentials, schedule micro-teaching demos, and manage teacher appointments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-700 text-xs font-bold text-amber-400">
            Total Applicants: {applications.length}
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: 'Pending Review',
            count: applications.filter((a) => a.status === 'Pending').length,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10 border-amber-500/20',
          },
          {
            label: 'Shortlisted',
            count: applications.filter((a) => a.status === 'Shortlisted').length,
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10 border-yellow-500/20',
          },
          {
            label: 'Interview Scheduled',
            count: applications.filter((a) => a.status === 'Interview Scheduled').length,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/20',
          },
          {
            label: 'Faculty Employed',
            count: applications.filter((a) => a.status === 'Employed').length,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10 border-emerald-500/20',
          },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl border ${stat.bg} space-y-1`}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {stat.label}
            </span>
            <span className={`text-2xl font-black ${stat.color}`}>{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by teacher name, subjects, qualification, or reference..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700">
          {['All', 'Pending', 'Shortlisted', 'Interview Scheduled', 'Employed', 'Archived'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applicant Cards List */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-slate-400 text-sm font-medium">No teaching applications match your filter.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredApps.map((app) => {
            const cleanPhone = app.phone.replace(/[^0-9+]/g, '');
            const whatsappNumber = (app.whatsapp || app.phone).replace(/[^0-9]/g, '');

            return (
              <div
                key={app.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-700/80 p-5 sm:p-6 space-y-5 hover:border-slate-600 transition-all shadow-lg"
              >
                {/* Header: Reference, Position, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                        {app.referenceNumber}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {app.positionAppliedFor}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Applied on: {new Date(app.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} · Availability: {app.availability}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={app.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as TeachingApplication['status'];
                        onUpdateStatus(app.id, newStatus, app.adminNotes);
                        triggerToast(`Applicant status changed to "${newStatus}"`);
                      }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${getStatusBadgeClass(app.status)} bg-slate-900`}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleDeletePrompt(app.id, app.fullName)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Candidate Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {/* Personal Contact */}
                  <div className="space-y-2 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Applicant Contact</span>
                    </span>
                    <p className="font-bold text-sm text-white">{app.fullName}</p>
                    <p className="text-slate-300 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <a href={`mailto:${app.email}`} className="hover:text-amber-400 truncate">
                        {app.email}
                      </a>
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-semibold transition-colors"
                      >
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span>Call: {app.phone}</span>
                      </a>
                      {whatsappNumber && (
                        <a
                          href={`https://wa.me/${whatsappNumber}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-semibold transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageSquare className="w-3 h-3 text-white" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                    <p className="text-slate-400 text-[11px] flex items-start gap-1 pt-1">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                      <span>{app.residentialAddress} {app.stateOfOrigin && `(${app.stateOfOrigin})`}</span>
                    </p>
                  </div>

                  {/* Academic Credentials */}
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Degree & TRCN</span>
                    </span>
                    <p className="font-bold text-white">{app.highestQualification}</p>
                    <p className="text-slate-300">
                      <strong>Course:</strong> {app.courseOfStudy}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {app.institutionGraduated} ({app.yearGraduated})
                    </p>
                    <div className="pt-2 flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-300">TRCN Status:</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          app.trcnCertified === 'Yes'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : app.trcnCertified === 'In Progress'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            : 'bg-slate-700 text-slate-300 border-slate-600'
                        }`}
                      >
                        {app.trcnCertified === 'Yes' ? 'Licensed & Registered' : app.trcnCertified}
                      </span>
                    </div>
                  </div>

                  {/* Teaching Specialties */}
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Subjects & Track Record</span>
                    </span>
                    <p className="text-slate-200">
                      <strong className="text-amber-400">Primary:</strong> {app.primarySubjects}
                    </p>
                    {app.secondarySubjects && (
                      <p className="text-slate-300">
                        <strong className="text-slate-400">Secondary:</strong> {app.secondarySubjects}
                      </p>
                    )}
                    <p className="text-slate-300 pt-1">
                      <strong className="text-white">Experience:</strong> {app.yearsOfExperience}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      <strong>Previous School:</strong> {app.previousSchoolOrEmployer || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Resume Summary & Teaching Statement */}
                <div className="space-y-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide block mb-1">
                      Resume & Teaching Experience Profile:
                    </span>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      {app.cvResumeText}
                    </p>
                  </div>

                  {app.coverLetter && (
                    <div>
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide block mb-1">
                        Teaching Philosophy & Statement of Purpose:
                      </span>
                      <p className="text-slate-400 italic leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                        "{app.coverLetter}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Admin Recruitment Notes Row */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex-1">
                    {editingNotesId === app.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={notesDraft}
                          onChange={(e) => setNotesDraft(e.target.value)}
                          placeholder="Add recruitment note (e.g. Micro-teaching demonstration scheduled on Tuesday 10am)..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-amber-400/50 text-white text-xs focus:outline-none"
                        />
                        <button
                          onClick={() => handleSaveNotes(app.id, app.status)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs uppercase cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="font-semibold text-slate-300">Recruitment Note:</span>
                        <span className="italic text-slate-300">
                          {app.adminNotes || 'No recruitment notes added yet.'}
                        </span>
                        <button
                          onClick={() => handleStartEditNotes(app)}
                          className="p-1 text-slate-400 hover:text-amber-400 rounded cursor-pointer"
                          title="Edit Recruitment Note"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Print Candidate Slip</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
