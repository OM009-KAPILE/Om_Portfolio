import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import type { ProjectStatus } from '../types/portfolio';
import { 
  ExternalLink, 
  Eye, 
  Terminal
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const Projects: React.FC = () => {
  const { data, setActiveProject } = usePortfolio();
  const { projects } = data;
  const [filter, setFilter] = useState<'All' | ProjectStatus>('All');

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.status === filter);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-500/15 text-teal-400 border border-teal-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Concept
          </span>
        );
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Engineering Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
              Software Development Projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl">
              Practical applications across AI, computer vision, web engineering, and backend architectures. Accurately tagged by project maturity status.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {(['All', 'In Progress', 'Concept', 'Completed'] as const).map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => setFilter(statusOption)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === statusOption
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200'
              }`}
            >
              {statusOption}
              {statusOption === 'All' 
                ? ` (${projects.length})` 
                : ` (${projects.filter(p => p.status === statusOption).length})`}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between bg-slate-900/70 dark:bg-slate-900/70 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300"
            >
              <div>
                {/* Card Thumbnail / Code Illustration */}
                <div className="relative h-44 bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 overflow-hidden flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-cyan-500/5 opacity-60" />
                      <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                        <Terminal className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-400 light:text-slate-600">
                        {project.technologies.slice(0, 2).join(' • ')}
                      </span>
                    </div>
                  )}

                  {/* Status Badge Positioned at top-right */}
                  <div className="absolute top-3 right-3 z-10 backdrop-blur-md">
                    {getStatusBadge(project.status)}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-semibold text-teal-400 dark:text-teal-400 light:text-teal-600 mt-0.5 line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-lg text-[11px] font-medium text-teal-400 bg-teal-500/10">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-slate-800/40 dark:border-slate-800/40 light:border-slate-100 mt-4 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 bg-slate-800/80 hover:bg-slate-700/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 light:bg-slate-100 light:hover:bg-slate-200 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 transition-colors shadow-sm"
                      title="GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-teal-400" />
                      <span>GitHub Repository</span>
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 transition-colors"
                      title="Live Demo"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
