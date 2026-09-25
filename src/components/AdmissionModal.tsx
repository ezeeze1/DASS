import { useState } from 'react';
import {
  X,
  ClipboardCheck,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  School,
  FileCheck,
  Printer,
} from 'lucide-react';
import { AdmissionFormData } from '../types';
import { useWebsiteContent } from '../context/WebsiteContext';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionModal({ isOpen, onClose }: AdmissionModalProps) {
  const { content, submitStudentAdmission } = useWebsiteContent();
  const SCHOOL_INFO = content.schoolInfo;
  const [formData, setFormData] = useState<AdmissionFormData>({
    studentFullName: '',
    dateOfBirth: '',
    gender: 'Male',
    levelApplying: 'Primary School (Basic 1 - 6)',
    previousSchool: '',
    parentFullName: '',
    parentPhone: '',
    parentEmail: '',
    parentAddress: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const refCode = submitStudentAdmission({
        studentFullName: formData.studentFullName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as 'Male' | 'Female',
        levelApplying: formData.levelApplying,
        entryTerm: 'First Term (Upcoming Session)',
        previousSchool: formData.previousSchool || 'N/A',
        lastClassCompleted: 'N/A',
        parentFullName: formData.parentFullName,
        parentRelationship: 'Parent / Guardian',
        parentPhone: formData.parentPhone,
        parentWhatsapp: formData.parentPhone,
        parentEmail: formData.parentEmail,
        parentAddress: formData.parentAddress,
        academicInterests: formData.notes,
      });
      setIsSubmitting(false);
      setSubmittedCode(refCode);
    }, 600);
  };

  const resetForm = () => {
    setSubmittedCode(null);
    setFormData({
      studentFullName: '',
      dateOfBirth: '',
      gender: 'Male',
      levelApplying: 'Primary School (Basic 1 - 6)',
      previousSchool: '',
      parentFullName: '',
      parentPhone: '',
      parentEmail: '',
      parentAddress: '',
      notes: '',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="bg-navy-900 text-white p-6 sm:p-7 flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                Application for Admission
              </h3>
              <p className="text-xs text-amber-300 font-medium">
                Divine Group of Schools · Okene, Kogi State
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-navy-800 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submittedCode ? (
            /* Success confirmation screen */
            <div className="text-center py-4 space-y-5 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <FileCheck className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-navy-900">
                  Admission Inquiry Submitted
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Your application reference code has been generated.
                </p>
              </div>

              {/* Reference Code Voucher */}
              <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-left max-w-md mx-auto">
                <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Application Reference
                  </span>
                  <span className="font-mono text-sm font-extrabold text-navy-900 bg-white px-2 py-0.5 rounded border border-amber-200">
                    {submittedCode}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-900">Candidate: </span>
                    {formData.studentFullName}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Level: </span>
                    {formData.levelApplying}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Parent/Guardian: </span>
                    {formData.parentFullName} ({formData.parentPhone})
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                  <strong>Next Step:</strong> Please visit our Admissions Office at Divine Campus, Okene, Kogi State with the candidate's birth certificate and two passport photographs.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                Welcome to Divine Group of Schools, Okene. Please complete this introductory application form. Our admissions board reviews submissions continuously throughout the academic session.
              </div>

              {/* Section 1: Candidate Information */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 pb-2 mb-3 border-b border-slate-200 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>1. Candidate (Student) Details</span>
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Victor Oche Adebayo"
                      value={formData.studentFullName}
                      onChange={(e) => setFormData({ ...formData, studentFullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Gender *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Educational Division *
                      </label>
                      <select
                        value={formData.levelApplying}
                        onChange={(e) => setFormData({ ...formData, levelApplying: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-white"
                      >
                        <option value="Creche / Early Years">Creche / Early Years (Ages 3m - 5y)</option>
                        <option value="Primary School (Basic 1 - 6)">Primary School (Basic 1 - 6)</option>
                        <option value="Junior Secondary School (JSS 1 - 3)">Junior Secondary School (JSS 1 - 3)</option>
                        <option value="Senior Secondary School (Science)">Senior Secondary School (Science)</option>
                        <option value="Senior Secondary School (Arts / Commercial)">Senior Secondary School (Arts / Commercial)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Previous School (if applicable)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Previous Nursery / Primary"
                        value={formData.previousSchool}
                        onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Parent / Guardian Details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 pb-2 mb-3 border-b border-slate-200 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>2. Parent / Guardian Contact Details</span>
                </h4>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Parent / Guardian Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mr. / Mrs. / Dr. Adebayo"
                        value={formData.parentFullName}
                        onChange={(e) => setFormData({ ...formData, parentFullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 803 123 4567"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. parent@example.com"
                        value={formData.parentEmail}
                        onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Residential Address (Town / City) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Okene, Kogi State"
                        value={formData.parentAddress}
                        onChange={(e) => setFormData({ ...formData, parentAddress: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Additional Notes or Special Considerations (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Special learning needs, hobbies, health considerations..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-white resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all active:translate-y-0.5"
                >
                  <span className="text-white">{isSubmitting ? 'Submitting Application...' : 'Submit Application Form'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
