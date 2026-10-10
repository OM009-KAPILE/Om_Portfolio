import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { resolveAssetUrl } from '../utils/assetUrl';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  GraduationCap, 
  Calendar
} from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { 
    data, 
    setIsResumeViewerOpen, 
    showToast 
  } = usePortfolio();

  const { resume, about } = data;

  const handleDownload = () => {
    if (resume.resumeUrl) {
      const a = document.createElement('a');
      a.href = resolveAssetUrl(resume.resumeUrl);
      a.download = resume.fileName || 'Om_Kapile_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('Downloading resume...', 'success');
    } else {
      // Open the in-app resume viewer which has download and print options
      setIsResumeViewerOpen(true);
      showToast('Opening verified portfolio resume view', 'info');
    }
  };

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-400">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>Credentials & Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Curriculum Vitae
          </h2>
          <p className="text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl mx-auto">
            A comprehensive overview of academic coursework, technical abilities, and project implementations.
          </p>
        </div>

        {/* Main Resume Card */}
        <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                  {resume.fileName || 'Om_Kapile_Resume.pdf'}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mt-1">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    Updated: {resume.lastUpdated || 'October 2026'}
                  </span>
                  <span>•</span>
                  <span className="text-teal-400 font-medium">
                    {resume.resumeUrl ? 'Custom PDF uploaded' : 'Interactive document ready'}
                  </span>
                </div>
              </div>
            </div>

            {/* Resume Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsResumeViewerOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 transition-colors"
              >
                <Eye className="w-4 h-4 text-teal-400" />
                <span>View Resume</span>
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 transition-all shadow-md shadow-teal-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Highlights Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
            <div className="p-5 rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Status</span>
              </div>
              <p className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">
                {resume.educationSummary || about.highlights.education}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                Sanjivani College of Engineering, Kopargaon (Sanjivani University)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <CheckCircle className="w-4 h-4" />
                <span>Core Competencies</span>
              </div>
              <p className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">
                Software Engineering, AI/ML & UI/UX Design
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                Python, JavaScript, Node.js, Express.js, REST APIs, YOLO, OpenCV, Figma, UI/UX Research
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
