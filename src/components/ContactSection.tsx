import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
} from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';

export default function ContactSection() {
  const { content } = useWebsiteContent();
  const SCHOOL_INFO = content.schoolInfo;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean local submission state
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mt-3">
            Contact Divine Group of Schools
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            We are always delighted to assist prospective parents, alumni, and visitors. Reach out via telephone, email, or visit our campus in Okene.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: School Contact Information Cards & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-navy-900 rounded-2xl p-7 text-white shadow-xl border border-navy-800">
              <h3 className="font-serif text-2xl font-bold uppercase tracking-tight text-white mb-2">
                DIVINE GROUP OF SCHOOLS
              </h3>
              <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
                Okene, Kogi State, Nigeria
              </p>

              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-navy-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Address</div>
                    <div className="text-slate-200 mt-0.5 leading-snug">{SCHOOL_INFO.address}</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-navy-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Phone</div>
                    <div className="mt-0.5 space-y-1">
                      {SCHOOL_INFO.phones.map((phone, idx) => (
                        <div key={idx}>
                          <a
                            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                            className="text-slate-200 hover:text-amber-400 transition-colors block"
                          >
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-navy-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Email</div>
                    <div className="mt-0.5 space-y-1">
                      {SCHOOL_INFO.emails.map((email, idx) => (
                        <div key={idx}>
                          <a
                            href={`mailto:${email}`}
                            className="text-slate-200 hover:text-amber-400 transition-colors block text-xs sm:text-sm"
                          >
                            {email}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-navy-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Opening Hours</div>
                    <div className="text-slate-200 mt-0.5 leading-snug">{SCHOOL_INFO.openingHours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map Representation */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <Building className="w-5 h-5 text-amber-600" />
                <h4 className="font-serif font-bold text-navy-900 text-sm">School Campus Location</h4>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Situated at Former Bamijoko Compound, Inoziomi, Okene, Kogi State, easily accessible for parents and visitors.
              </p>
              {/* Map embed / locator representation */}
              <div className="relative rounded-xl overflow-hidden bg-navy-950 h-44 flex flex-col items-center justify-center text-center p-4 border border-slate-300">
                <MapPin className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
                <span className="font-serif font-bold text-white text-sm">Former Bamijoko Compound, Inoziomi</span>
                <span className="text-[11px] text-slate-300 mt-1">Okene, Kogi State, Nigeria</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Former Bamijoko Compound, Inoziomi, Okene, Kogi State, Nigeria')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider rounded hover:bg-amber-400 transition-colors"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-2xl p-7 sm:p-9 border border-slate-200/90 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-navy-900 tracking-tight">
                Send an Inquiry
              </h3>
              <p className="text-slate-600 text-sm mt-1 mb-6">
                Fill out the form below and our administrative desk will respond to your inquiry promptly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-serif font-bold text-emerald-900 text-lg">Thank You</h4>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-2 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been registered for the Divine Group of Schools administrative office. For urgent admissions matters, you may also reach us directly via telephone at {SCHOOL_INFO.phones[0]}.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-5 px-5 py-2 bg-navy-900 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-navy-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Samuel Adebayo"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 803 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Admission Inquiry for Primary Section"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please write your questions or comments here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm text-slate-900 resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-navy-900 hover:bg-navy-800 disabled:bg-slate-400 text-white font-bold text-xs uppercase tracking-wider rounded shadow-md transition-all active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      {isSubmitting ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-amber-400" />
                          <span>SEND MESSAGE</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
