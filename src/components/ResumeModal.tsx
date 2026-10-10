import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Download, 
  Printer, 
  FileText
} from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { 
    isResumeViewerOpen, 
    setIsResumeViewerOpen, 
    data 
  } = usePortfolio();

  const { personal, resume } = data;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResumeViewerOpen(false);
      }
    };
    if (isResumeViewerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isResumeViewerOpen, setIsResumeViewerOpen]);

  if (!isResumeViewerOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const downloadUrl = resume.resumeUrl || '/Om_Kapile_Resume.pdf';
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = resume.fileName || 'Om_Kapile_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsResumeViewerOpen(false)}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Top Controls Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/80 print:hidden">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100">
                {personal.name} — Resume Document
              </h3>
              <p className="text-xs text-slate-400">
                Official Curriculum Vitae (B.Tech in Artificial Intelligence & Machine Learning)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => setIsResumeViewerOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 bg-slate-800/60 hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Container (Clean paper document matching the authentic resume) */}
        <div className="p-6 sm:p-12 overflow-y-auto flex-1 bg-white text-slate-900 font-serif leading-normal select-text">
          
          {/* Resume Header */}
          <div className="text-center pb-4 mb-3 border-b-0">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-serif">
              Om Kapile
            </h1>
            <p className="text-sm text-slate-800 italic mt-1 font-serif">
              Software Engineering | UI/UX Design | Artificial Intelligence
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700 mt-2 font-sans">
              <a href="tel:+919158557553" className="hover:text-teal-700 transition-colors font-semibold">+91 9158557553</a>
              <span>•</span>
              <a 
                href={personal.linkedinUrl || "https://www.linkedin.com/in/om-kapile-3a6590358"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-teal-700 hover:underline transition-colors font-semibold"
              >
                linkedin.com/in/om-kapile-3a6590358
              </a>
              <span>•</span>
              <a 
                href={personal.githubUrl || "https://github.com/OM009-KAPILE"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-teal-700 hover:underline transition-colors font-semibold"
              >
                github.com/OM009-KAPILE
              </a>
              <span>•</span>
              <a href={`mailto:${personal.email || "Kapileom2006@gmail.com"}`} className="hover:text-teal-700 transition-colors font-semibold">
                {personal.email || "Kapileom2006@gmail.com"}
              </a>
            </div>
          </div>

          {/* 1. PROFESSIONAL SUMMARY */}
          <div className="mb-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-sans">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed font-sans text-justify">
              Technology student with a strong foundation in software engineering and UI/UX design, eager to apply technical expertise to complex development challenges. Possesses hands-on experience in Python, JavaScript, and web development, complemented by a deep understanding of AI/ML integration and user-centric design principles. Demonstrated ability to deliver functional digital products through collaborative team environments and rigorous research methodologies.
            </p>
          </div>

          {/* 2. EXPERIENCE & PROJECTS */}
          <div className="mb-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2.5 font-sans">
              EXPERIENCE & PROJECTS
            </h2>

            {/* Experience 1 */}
            <div className="mb-3.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                <span className="font-bold text-slate-950 font-sans">
                  Ural Federal University, Yekaterinburg, Russia
                </span>
                <span className="font-bold text-slate-950 font-sans text-xs">
                  July 2026 – Present
                </span>
              </div>
              <p className="text-xs italic text-slate-800 font-serif">
                Summer Intern
              </p>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs text-slate-800 font-sans">
                <li>
                  Selected for a competitive international summer internship program, contributing to assigned technical and research tasks within a rigorous and fast-paced academic environment at the university level, using Figma.
                </li>
                <li>
                  Collaborated with an international cohort of students and mentors to enhance technical and analytical skills through intensive coursework and the successful execution of applied research projects.
                </li>
              </ul>
            </div>

            {/* Experience 2 */}
            <div className="mb-3.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                <span className="font-bold text-slate-950 font-sans">
                  Labmentix India
                </span>
                <span className="font-bold text-slate-950 font-sans text-xs">
                  April 2026 – Present
                </span>
              </div>
              <p className="text-xs italic text-slate-800 font-serif">
                UI/UX Designer
              </p>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs text-slate-800 font-sans">
                <li>
                  Designed comprehensive UI/UX concepts for digital products, applying advanced user research methods to translate complex user needs into wireframes and interactive high-fidelity prototypes.
                </li>
                <li>
                  Collaborated with cross-functional teams to iterate design solutions, ensuring consistent visual language, optimal usability, and full accessibility compliance across all critical product touchpoints.
                </li>
              </ul>
            </div>

            {/* Project 1 */}
            <div className="mb-3.5">
              <span className="font-bold text-slate-950 font-sans text-xs sm:text-[13px]">
                ProjectX — AI-Powered Student Collaboration Platform
              </span>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-slate-800 font-sans">
                <li>
                  Built a student collaboration platform with team formation, project applications, and task management.
                </li>
                <li>
                  Integrated AI-based team matching, skill-gap detection, recommendations, and email notifications.
                </li>
                <li>
                  <strong>Tech:</strong> Node.js, Express.js, Python, REST APIs, AI/ML
                </li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="mb-3">
              <span className="font-bold text-slate-950 font-sans text-xs sm:text-[13px]">
                Gun Detection System — Real-Time Threat Monitoring
              </span>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-slate-800 font-sans">
                <li>
                  Developed a computer vision system to detect firearms in video feeds using YOLO and OpenCV.
                </li>
                <li>
                  Implemented detection bounding boxes, confidence scores, and threat alerts.
                </li>
                <li>
                  Developed computer vision solutions using Python, YOLO, OpenCV, and NumPy to detect and track objects in real-time across multiple datasets.
                </li>
              </ul>
            </div>
          </div>

          {/* 3. SKILLS & LANGUAGES */}
          <div className="mb-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-sans">
              SKILLS & LANGUAGES
            </h2>
            <div className="space-y-1 text-xs text-slate-800 font-sans leading-relaxed">
              <p>
                <strong>Technical:</strong> Python, JavaScript, Node.js, Express.js, REST APIs, SQL, HTML5, CSS3, Frontend, Backend, Java, AI Tools, Web & App Development, Database Management, Git, GitHub
              </p>
              <p>
                <strong>Planning & Analysis:</strong> UI/UX Research, Cross-functional Collaboration, Analytical Thinking, Project Management, Figma, Prototyping
              </p>
              <p>
                <strong>Languages:</strong> English, Hindi, Marathi
              </p>
            </div>
          </div>

          {/* 4. EDUCATION */}
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-sans">
              EDUCATION
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
              <span className="font-bold text-slate-950 font-sans">
                Bachelor of Technology, Artificial Intelligence and Machine Learning
              </span>
              <span className="font-bold text-slate-950 font-sans text-xs">
                Expected 2028
              </span>
            </div>
            <p className="text-xs italic text-slate-800 font-serif mt-0.5">
              Sanjivani College of Engineering, Kopargaon (Sanjivani University)
            </p>
          </div>

        </div>

        {/* Modal Bottom Banner */}
        <div className="p-4 px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-center text-xs text-slate-400 print:hidden">
          <span>
            Document matches verified resume for Om Kapile.
          </span>
        </div>

      </div>
    </div>
  );
};
