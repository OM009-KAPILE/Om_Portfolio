import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Code, Target, Compass, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { about } = data;

  const highlightItems = [
    {
      title: 'Education',
      content: about.highlights.education,
      icon: <GraduationCap className="w-5 h-5 text-teal-400" />,
      color: 'border-teal-500/20 bg-teal-500/5',
      badge: 'Academic'
    },
    {
      title: 'Technical Interests',
      content: about.highlights.technicalInterests,
      icon: <Code className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/20 bg-cyan-500/5',
      badge: 'Domain'
    },
    {
      title: 'Current Focus',
      content: about.highlights.currentFocus,
      icon: <Target className="w-5 h-5 text-teal-400" />,
      color: 'border-teal-500/20 bg-teal-500/5',
      badge: 'Active'
    },
    {
      title: 'Career Goals',
      content: about.highlights.careerGoals,
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/20 bg-cyan-500/5',
      badge: 'Vision'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Background & Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
              About Me
            </h2>
          </div>
        </div>

        {/* Narrative Bio */}
        <div className="bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 sm:p-8 mb-12 shadow-sm backdrop-blur-sm">
          <div className="space-y-4 text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
            {about.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* 4 Editable Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlightItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.color} bg-slate-900/70 dark:bg-slate-900/70 light:bg-slate-50/90 border-slate-800/80 dark:border-slate-800/80 light:border-slate-200`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600">
                  {item.badge}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-normal">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        {/* Connected Profiles Banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
              Professional Profiles
            </span>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
              Explore open-source projects and connect directly on professional platforms
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={data.personal.githubUrl || "https://github.com/OM009-KAPILE"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 hover:border-teal-500/40 transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-teal-400" />
              <span>GitHub (OM009-KAPILE)</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={data.personal.linkedinUrl || "https://www.linkedin.com/in/om-kapile-3a6590358"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 hover:border-teal-500/40 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-teal-400" />
              <span>LinkedIn Network</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
