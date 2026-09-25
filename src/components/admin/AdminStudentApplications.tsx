import React, { useState } from 'react';
import {
  ClipboardCheck,
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
  MessageSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useWebsiteContent } from '../../context/WebsiteContext';
import { StudentAdmissionApplication } from '../../types';

interface AdminStudentApplicationsProps {
  onToast: (msg: string) => void;
}

export default function AdminStudentApplications({ onToast }: AdminStudentApplicationsProps) {
  const {
    studentApplications,
    updateStudentApplicationStatus,
    deleteStudentApplication,
  } = useWebsiteContent();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<StudentAdmissionApplication | null>(null);

  // Filtered applications
  const filteredApps = studentApplications.filter((app) => {
    const matchesSearch =
      app.studentFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parentFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parentPhone.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'All' ? true : app.status === statusFilter;

    const matchesLevel =
      levelFilter === 'All'
        ? true
        : app.levelApplying.toLowerCase().includes(levelFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesLevel;
  });

  const countPending = studentApplications.filter((a) => a.status === 'Pending Review').length;
  const countScheduled = studentApplications.filter((a) => a.status === 'Assessment Scheduled').length;
  const countAccepted = studentApplications.filter((a) => a.status === 'Accepted').length;

  const handleStatusChange = (
    id: string,
    newStatus: StudentAdmissionApplication['status']
  ) => {
    updateStudentApplicationStatus(id, newStatus);
    onToast(`Application status updated to "${newStatus}".`);
  };

  const handleNotesChange = (id: string, notes: string) => {
    const current = studentApplications.find((a) => a.id === id);
    if (current) {
      updateStudentApplicationStatus(id, current.status, notes);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete application for ${name}?`)) {
      deleteStudentApplication(id);
      onToast(`Application for ${name} deleted.`);
    }
  };

  const exportToCSV = () => {
    if (studentApplications.length === 0) {
      alert('No student applications to export.');
      return;
    }

    const headers = [
      'Reference Number',
      'Date Submitted',
      'Student Name',
      'Date of Birth',
      'Gender',
      'Level Applying',
      'Term',
      'Previous School',
      'Parent Name',
      'Relationship',
      'Phone',
      'WhatsApp',
      'Email',
      'Address',
      'Status',
      'Admin Notes',
    ];

    const rows = studentApplications.map((app) => [
      `"${app.referenceNumber}"`,
      `"${new Date(app.createdAt).toLocaleDateString()}"`,
      `"${app.studentFullName.replace(/"/g, '""')}"`,
      `"${app.dateOfBirth}"`,
      `"${app.gender}"`,
      `"${app.levelApplying.replace(/"/g, '""')}"`,
      `"${app.entryTerm}"`,
      `"${app.previousSchool.replace(/"/g, '""')}"`,
      `"${app.parentFullName.replace(/"/g, '""')}"`,
      `"${app.parentRelationship}"`,
      `"${app.parentPhone}"`,
      `"${app.parentWhatsapp || ''}"`,
      `"${app.parentEmail}"`,
      `"${app.parentAddress.replace(/"/g, '""')}"`,
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
      `divine_schools_student_admissions_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    onToast('Student applications CSV downloaded.');
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-white">
              Student Admission Inquiries
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-xs font-bold">
              {studentApplications.length}
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Review, evaluate, and schedule entrance assessments for students applying through the website.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-700 transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Inquiries
          </span>
          <span className="text-2xl font-extrabold text-white mt-1 block">
            {studentApplications.length}
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
            Assessment Set
          </span>
          <span className="text-2xl font-extrabold text-blue-300 mt-1 block">
            {countScheduled}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
            Admitted / Enrolled
          </span>
          <span className="text-2xl font-extrabold text-emerald-300 mt-1 block">
            {countAccepted}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, parent phone, or reference code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="All">All Statuses</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Assessment Scheduled">Assessment Scheduled</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
          </select>

          {/* Level Filter */}
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="All">All Levels</option>
            <option value="Creche">Creche / Nursery</option>
            <option value="Primary">Primary School</option>
            <option value="Junior">Junior Secondary</option>
            <option value="Senior">Senior Secondary</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700 text-slate-400">
            <ClipboardCheck className="w-8 h-8 mx-auto mb-2 text-slate-500" />
            <p className="text-sm">No student applications match the specified criteria.</p>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 hover:border-slate-600 transition-all space-y-4"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700 pb-3 gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                    {app.referenceNumber}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(app.createdAt).toLocaleDateString()} at{' '}
                    {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status Dropdown */}
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(
                        app.id,
                        e.target.value as StudentAdmissionApplication['status']
                      )
                    }
                    className={`text-xs font-bold px-3 py-1 rounded-lg border focus:outline-none ${
                      app.status === 'Accepted'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                        : app.status === 'Assessment Scheduled'
                        ? 'bg-blue-950/80 text-blue-300 border-blue-700'
                        : app.status === 'Declined'
                        ? 'bg-red-950/80 text-red-300 border-red-700'
                        : 'bg-amber-950/80 text-amber-300 border-amber-700'
                    }`}
                  >
                    <option value="Pending Review">Pending Review</option>
                    <option value="Assessment Scheduled">Assessment Scheduled</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                  </select>

                  <button
                    onClick={() => handleDelete(app.id, app.studentFullName)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700/60 rounded-lg transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Col 1: Student info */}
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Student Candidate
                  </span>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{app.studentFullName}</span>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Class: </span>
                    <strong className="text-amber-300">{app.levelApplying}</strong>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Gender / DOB: </span>
                    {app.gender} · {app.dateOfBirth}
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Previous School: </span>
                    {app.previousSchool || 'None / First Enrollment'}
                  </div>
                </div>

                {/* Col 2: Parent Contacts */}
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Parent / Guardian Contact
                  </span>
                  <div className="text-sm font-bold text-white">
                    {app.parentFullName}{' '}
                    <span className="text-xs font-normal text-slate-400">
                      ({app.parentRelationship})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:${app.parentPhone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-1 text-amber-400 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{app.parentPhone}</span>
                    </a>
                  </div>
                  {app.parentWhatsapp && (
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${app.parentWhatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-400 hover:underline text-[11px]"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp Parent</span>
                      </a>
                    </div>
                  )}
                  {app.parentEmail && app.parentEmail !== 'N/A' && (
                    <div className="text-slate-400 truncate">
                      <Mail className="w-3 h-3 inline mr-1 text-slate-500" />
                      {app.parentEmail}
                    </div>
                  )}
                  <div className="text-slate-400 truncate">
                    <MapPin className="w-3 h-3 inline mr-1 text-slate-500" />
                    {app.parentAddress}
                  </div>
                </div>

                {/* Col 3: Academic & Administrative Notes */}
                <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                      Academic & Registrar Notes
                    </span>
                    {app.academicInterests && (
                      <p className="text-slate-300 text-[11px] mb-1">
                        <span className="text-slate-500">Interests:</span> {app.academicInterests}
                      </p>
                    )}
                    {app.medicalOrSpecialNeeds && (
                      <p className="text-amber-200/90 text-[11px] mb-1">
                        <span className="text-amber-400 font-semibold">Special Notes:</span>{' '}
                        {app.medicalOrSpecialNeeds}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Internal Registrar Comment:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Test set for 10am Sat; Birth cert verified..."
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
    </div>
  );
}
