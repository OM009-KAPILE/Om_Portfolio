import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Mail, 
  MapPin, 
  Phone,
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Copy
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const ContactSection: React.FC = () => {
  const { data, showToast } = usePortfolio();
  const { personal } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submittedMessage, setSubmittedMessage] = useState<typeof formData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in your name, email, and message.', 'warning');
      return;
    }

    setSubmittedMessage({ ...formData });
    showToast('Inquiry drafted! Choose an option to transmit.', 'success');
  };

  const handleOpenMailto = () => {
    if (!submittedMessage) return;
    const mailtoSubject = encodeURIComponent(
      submittedMessage.subject || `Portfolio Inquiry from ${submittedMessage.name}`
    );
    const mailtoBody = encodeURIComponent(
      `Hello Om,\n\n${submittedMessage.message}\n\nFrom: ${submittedMessage.name} (${submittedMessage.email})`
    );
    window.location.href = `mailto:${personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const handleCopyMessage = () => {
    if (!submittedMessage) return;
    const textToCopy = `To: ${personal.email}\nSubject: ${submittedMessage.subject || 'Portfolio Inquiry'}\nFrom: ${submittedMessage.name} (${submittedMessage.email})\n\n${submittedMessage.message}`;
    navigator.clipboard.writeText(textToCopy);
    showToast('Message details copied to clipboard!', 'success');
  };

  const cleanPhone = personal.phone ? personal.phone.replace(/\s+/g, '') : '+919158557553';

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-400">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl mx-auto">
            Have a question, an internship opportunity, or want to discuss a project? Reach out directly via email or phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm">
                {/* Name & Role */}
                <div className="flex items-start gap-3 text-slate-300 dark:text-slate-300 light:text-slate-700">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
                    <span className="font-bold text-xs">OK</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Name & Role</span>
                    <span className="font-semibold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {personal.name}
                    </span>
                    <p className="text-xs text-teal-400 dark:text-teal-400 light:text-teal-600">
                      {personal.role}
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3 text-slate-300 dark:text-slate-300 light:text-slate-700">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Email Address</span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="font-semibold text-teal-400 hover:text-teal-300 transition-colors break-all"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-start gap-3 text-slate-300 dark:text-slate-300 light:text-slate-700">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Phone Number</span>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      {personal.phone || '+91 9158557553'}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 text-slate-300 dark:text-slate-300 light:text-slate-700">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Location</span>
                    <span className="font-semibold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {personal.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Professional Profiles
                </span>
                
                <div className="flex flex-col gap-2.5">
                  {personal.githubUrl && (
                    <a
                      href={personal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-teal-500/50 hover:text-teal-300 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <GithubIcon className="w-4 h-4 text-teal-400" />
                        <span className="text-xs font-medium">GitHub Repository Profile</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  )}

                  {personal.linkedinUrl && (
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-teal-500/50 hover:text-teal-300 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <LinkedinIcon className="w-4 h-4 text-teal-400" />
                        <span className="text-xs font-medium">LinkedIn Network</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mb-6">
                Fill out the form below to draft an email directly to Om Kapile.
              </p>

              {submittedMessage ? (
                /* Post-Submission Transparent State */
                <div className="p-6 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-400 shrink-0" />
                    <div>
                      <h4 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                        Inquiry Ready to Transmit!
                      </h4>
                      <p className="text-xs text-teal-300 dark:text-teal-300 light:text-teal-700">
                        Draft created for {submittedMessage.name}.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                    You can transmit it directly through your default mail application or copy the pre-formatted text:
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                    <div><span className="text-slate-500">To:</span> {personal.email}</div>
                    <div><span className="text-slate-500">Subject:</span> {submittedMessage.subject || 'Portfolio Inquiry'}</div>
                    <div className="text-slate-400 italic pt-1 truncate">"{submittedMessage.message}"</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={handleOpenMailto}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Launch in Email Client</span>
                    </button>

                    <button
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Formatted Message</span>
                    </button>

                    <button
                      onClick={() => {
                        setSubmittedMessage(null);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="text-xs text-slate-400 hover:text-slate-200 underline ml-auto"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Sharma"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Collaboration / Internship Opportunity"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your note, feedback, or opportunity details..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-400 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-500">
                      * Direct transmission via email
                    </span>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 transition-all shadow-md shadow-teal-500/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
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
};
