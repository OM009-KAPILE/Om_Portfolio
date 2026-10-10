import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const { experiences } = data;

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Career Journey & Internships</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
              Professional Experience
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl">
              Competitive international internships and product design roles focusing on user experience, academic research, and interface prototyping.
            </p>
          </div>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-9 shadow-lg hover:border-teal-500/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 opacity-80" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-400 border border-teal-500/30">
                      <Briefcase className="w-3.5 h-3.5" />
                      {exp.role}
                    </span>
                    {exp.location && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-teal-400" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
                    {exp.organization}
                  </h3>
                </div>

                {/* Date range badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs font-mono font-medium text-teal-300 dark:text-teal-300 light:text-teal-700 self-start lg:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  <span>{exp.dates}</span>
                </div>
              </div>

              {/* Description Paragraphs */}
              <div className="py-6 space-y-3 text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                {exp.description.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Key Highlights Grid */}
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500">
                    Key Highlights & Contributions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {exp.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-800 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies and Tools Used */}
              {exp.tools && exp.tools.length > 0 && (
                <div className="pt-6 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-100 mt-6 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 mr-2">
                    Tools & Technologies:
                  </span>
                  {exp.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-teal-500/10 text-teal-300 dark:text-teal-300 light:text-teal-700 border border-teal-500/25"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
