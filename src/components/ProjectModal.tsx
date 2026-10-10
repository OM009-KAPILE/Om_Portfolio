import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Terminal
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const ProjectModal: React.FC = () => {
  const { activeProject, setActiveProject } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject, setActiveProject]);

  if (!activeProject) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-400 border border-teal-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Concept
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={() => setActiveProject(null)}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="p-6 sm:p-8 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              {getStatusBadge(activeProject.status)}
              <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                Software Engineering Project
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
              {activeProject.title}
            </h3>
            <p className="text-sm sm:text-base font-medium text-teal-400 dark:text-teal-400 light:text-teal-600">
              {activeProject.subtitle}
            </p>
          </div>

          <button
            onClick={() => setActiveProject(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 bg-slate-800/50 hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Project Preview Image / Visual Canvas */}
          <div className="w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-center relative">
            {activeProject.image ? (
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Terminal className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                    {activeProject.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-500 light:text-slate-400 mt-1 max-w-sm">
                    Interactive engineering architecture & code implementation
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Detailed Overview */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
              Project Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
              {activeProject.longDescription || activeProject.description}
            </p>
          </div>

          {/* Key Features */}
          {activeProject.features && activeProject.features.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                Key Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProject.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
              Technologies & Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeProject.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-teal-300 dark:text-teal-300 light:text-teal-700 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 sm:p-8 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {activeProject.githubUrl ? (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-teal-400" />
                <span>GitHub Repository</span>
              </a>
            ) : (
              <span className="text-xs text-slate-500 italic">Repository available upon request</span>
            )}

            {activeProject.demoUrl && (
              <a
                href={activeProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
