import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowUpRight, 
  Smartphone
} from 'lucide-react';
import { FigmaIcon } from './SocialIcons';

export const DesignPortfolio: React.FC = () => {
  const { data, setActiveCaseStudy } = usePortfolio();
  const { caseStudies } = data;

  return (
    <section id="uiux" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>User Experience & Product Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
              UI/UX Design Portfolio
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl">
              Dedicated design case studies exploring interaction patterns, information architecture, accessibility, and high-fidelity mobile experiences.
            </p>
          </div>
        </div>

        {/* Case Studies Display: Distinct Large Visual Layout */}
        <div className="space-y-12">
          {caseStudies.map((study, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={study.id}
                className="group bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl hover:border-teal-500/40 transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle decorative glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center`}>
                  
                  {/* Visual Preview / Mobile Frame Mockup Column */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative mx-auto max-w-xs sm:max-w-sm rounded-2xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border-2 border-slate-800 dark:border-slate-800 light:border-slate-300 p-4 shadow-2xl overflow-hidden group-hover:border-teal-500/40 transition-colors">
                      
                      {study.coverImage ? (
                        <img
                          src={study.coverImage}
                          alt={study.title}
                          className="w-full h-72 sm:h-80 object-cover rounded-xl"
                        />
                      ) : (
                        /* Modern Mobile UI Blueprint Mockup */
                        <div className="h-72 sm:h-80 bg-slate-900 dark:bg-slate-900 light:bg-slate-50 rounded-xl p-4 flex flex-col justify-between border border-slate-800/80 relative overflow-hidden select-none">
                          {/* Top Mockup Phone Notch / Status */}
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 text-[10px] text-slate-500 font-mono">
                            <span>9:41</span>
                            <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto" />
                            <span>100%</span>
                          </div>

                          {/* Mockup Screen Content Preview */}
                          <div className="space-y-2.5 my-auto">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                              <Smartphone className="w-5 h-5" />
                            </div>
                            <div className="w-3/4 h-3.5 bg-slate-800 rounded-md" />
                            <div className="w-1/2 h-2.5 bg-teal-500/30 rounded-md" />
                            
                            {/* Screen preview chips */}
                            <div className="pt-2 grid grid-cols-2 gap-1.5">
                              {study.screens.slice(0, 4).map((scr, sIdx) => (
                                <div key={sIdx} className="p-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[10px] text-slate-300 truncate">
                                  {scr}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bottom Navigation Mockup */}
                          <div className="pt-3 border-t border-slate-800/60 flex justify-around text-slate-500">
                            <div className="w-5 h-1.5 bg-teal-400 rounded-full" />
                            <div className="w-5 h-1.5 bg-slate-700 rounded-full" />
                            <div className="w-5 h-1.5 bg-slate-700 rounded-full" />
                          </div>
                        </div>
                      )}

                      {/* Mockup Badge */}
                      <div className="absolute top-3 right-3 bg-slate-950/90 text-teal-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-teal-500/30">
                        Concept UI
                      </div>
                    </div>
                  </div>

                  {/* Case Study Details Column */}
                  <div className={`lg:col-span-7 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                          Case Study #{idx + 1}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400">{study.screens.length} Screen Flows</span>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
                        {study.title}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-teal-400 dark:text-teal-400 light:text-teal-600 mt-1">
                        {study.subtitle}
                      </p>
                    </div>

                    {/* Design Challenge Box */}
                    <div className="p-4 rounded-xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-100/80 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500">
                        Design Challenge
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-800 leading-relaxed font-medium">
                        "{study.challenge}"
                      </p>
                    </div>

                    {/* Screens to Showcase */}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 block mb-2">
                        Screens Designed
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {study.screens.map((screen, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 dark:border-slate-800 light:border-slate-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                            {screen}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Design Focus Tags */}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 block mb-2">
                        Design Focus & Methods
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {study.designFocus.map((focus, fIdx) => (
                          <span
                            key={fIdx}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20"
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveCaseStudy(study)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 transition-all shadow-md shadow-teal-500/10 focus:outline-none"
                      >
                        <span>Read Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      {study.figmaUrl && (
                        <a
                          href={study.figmaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors"
                        >
                          <FigmaIcon className="w-4 h-4" />
                          <span>Figma Prototype</span>
                        </a>
                      )}
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
