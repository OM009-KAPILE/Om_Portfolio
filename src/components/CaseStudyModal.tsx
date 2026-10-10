import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  CheckCircle2, 
  Lightbulb, 
  Users, 
  Workflow, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Smartphone, 
  Palette
} from 'lucide-react';
import { FigmaIcon, GithubIcon } from './SocialIcons';

export const CaseStudyModal: React.FC = () => {
  const { activeCaseStudy, setActiveCaseStudy } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'overview' | 'process' | 'design-system'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCaseStudy(null);
      }
    };
    if (activeCaseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCaseStudy, setActiveCaseStudy]);

  if (!activeCaseStudy) return null;

  const { sectionsVisibility: vis } = activeCaseStudy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={() => setActiveCaseStudy(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="p-6 sm:p-8 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-start justify-between gap-4 bg-slate-950/40">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-400 border border-teal-500/30">
                <Palette className="w-3.5 h-3.5" />
                UI/UX Case Study Concept
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
              {activeCaseStudy.title}
            </h3>
            <p className="text-sm sm:text-base font-medium text-teal-400 dark:text-teal-400 light:text-teal-600">
              {activeCaseStudy.subtitle}
            </p>
          </div>

          <button
            onClick={() => setActiveCaseStudy(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 bg-slate-800/50 hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shrink-0 ${
              activeTab === 'overview'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Problem
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shrink-0 ${
              activeTab === 'process'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Research & User Flow
          </button>
          <button
            onClick={() => setActiveTab('design-system')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shrink-0 ${
              activeTab === 'design-system'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            UI Screens & Design System
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
          
          {/* TAB 1: OVERVIEW & PROBLEM */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Challenge Callout */}
              <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/25">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  <Lightbulb className="w-4 h-4" />
                  <span>The Design Challenge</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 dark:text-slate-200 light:text-slate-800 font-medium">
                  "{activeCaseStudy.challenge}"
                </p>
              </div>

              {/* Project Overview */}
              {vis.overview && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                    Project Overview
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {activeCaseStudy.overview}
                  </p>
                </div>
              )}

              {/* Problem Statement */}
              {vis.problemStatement && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                    Problem Statement
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {activeCaseStudy.problemStatement}
                  </p>
                </div>
              )}

              {/* Target Users */}
              {vis.targetUsers && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                    <Users className="w-4 h-4 text-teal-400" />
                    <span>Target Users</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {activeCaseStudy.targetUsers}
                  </p>
                </div>
              )}

              {/* Design Goals */}
              {vis.designGoals && activeCaseStudy.designGoals?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                    Design Goals
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCaseStudy.designGoals.map((goal, gIdx) => (
                      <div
                        key={gIdx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: RESEARCH & USER FLOW */}
          {activeTab === 'process' && (
            <div className="space-y-6">
              
              {/* Research & Insights */}
              {vis.researchInsights && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                    <BookOpen className="w-4 h-4 text-teal-400" />
                    <span>Research & Insights</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {activeCaseStudy.researchInsights}
                  </p>
                </div>
              )}

              {/* User Flow */}
              {vis.userFlow && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                    <Workflow className="w-4 h-4 text-teal-400" />
                    <span>User Flow</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 text-xs sm:text-sm font-mono text-teal-300 leading-relaxed">
                    {activeCaseStudy.userFlow}
                  </div>
                </div>
              )}

              {/* Wireframes */}
              {vis.wireframes && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                    Low-Fidelity Wireframing & Explorations
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {activeCaseStudy.wireframes}
                  </p>
                </div>
              )}

              {/* Lessons Learned */}
              {vis.lessonsLearned && (
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Key Takeaway & Lessons Learned</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {activeCaseStudy.lessonsLearned}
                  </p>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: UI SCREENS & DESIGN SYSTEM */}
          {activeTab === 'design-system' && (
            <div className="space-y-6">
              
              {/* Final UI Screens Breakdown */}
              {vis.finalUiScreens && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                    <Smartphone className="w-4 h-4 text-teal-400" />
                    <span>Final UI Screens Architecture</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {activeCaseStudy.finalUiScreens}
                  </p>
                  
                  {/* Screens Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                    {activeCaseStudy.screens.map((screen, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span>{screen}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Design System & Components */}
              {vis.designSystem && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                    <Layers className="w-4 h-4 text-teal-400" />
                    <span>Design System & Tokens</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {activeCaseStudy.designSystem}
                  </p>
                </div>
              )}

              {/* Final Design */}
              {vis.finalDesign && activeCaseStudy.finalDesign && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                    <Palette className="w-4 h-4 text-teal-400" />
                    <span>Final Design</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {activeCaseStudy.finalDesign}
                  </p>
                </div>
              )}

              {/* Design Focus Tags */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                  Core UI/UX Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeCaseStudy.designFocus.map((focus, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/25"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 sm:p-8 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {activeCaseStudy.id === 'projectx-ux' && (
              <a
                href="https://github.com/OM009-KAPILE/Projectx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/60 transition-colors shadow-sm"
              >
                <GithubIcon className="w-4 h-4 text-teal-400" />
                <span>GitHub Repository</span>
              </a>
            )}
            {vis.figmaLink && activeCaseStudy.figmaUrl && (
              <a
                href={activeCaseStudy.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 transition-colors shadow-sm"
              >
                <FigmaIcon className="w-4 h-4" />
                <span>Open in Figma</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
