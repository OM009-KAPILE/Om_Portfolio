import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowDown, Mail, Sparkles, Terminal, Code2, Palette, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { resolveAssetUrl } from '../utils/assetUrl';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { personal } = data;

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-tech-grid overflow-hidden"
    >
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-teal-500/10 dark:bg-teal-500/10 light:bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-[350px] h-[350px] bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Text */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Status Pill */}
            {personal.availableForWork && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-400 dark:text-teal-400 light:text-teal-700 text-xs sm:text-sm font-medium tracking-wide">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Available for Projects & Internships</span>
              </div>
            )}

            {/* Name & Role Subtitles */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 leading-[1.1]">
                <span className="block font-sans">{personal.name}</span>
              </h1>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs sm:text-sm font-semibold tracking-wide text-teal-400 dark:text-teal-400 light:text-teal-600">
                <span>Computer Science Engineering Student</span>
                <span className="text-slate-600 dark:text-slate-600 light:text-slate-400">•</span>
                <span>Software Developer</span>
                <span className="text-slate-600 dark:text-slate-600 light:text-slate-400">•</span>
                <span>AI/ML Enthusiast</span>
                <span className="text-slate-600 dark:text-slate-600 light:text-slate-400">•</span>
                <span>UI/UX Designer</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 leading-snug">
                "{personal.headline}"
              </h2>
            </div>

            {/* Introduction */}
            <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl leading-relaxed">
              {personal.introduction}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('#projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:border-teal-500/40 transition-all duration-200 focus:outline-none"
              >
                <Mail className="w-4 h-4 text-teal-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Quick Social & Location Bar */}
            <div className="flex items-center gap-4 pt-3 text-slate-400 dark:text-slate-400 light:text-slate-500">
              {personal.githubUrl && (
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-teal-400 hover:bg-slate-800/60 transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-teal-400 hover:bg-slate-800/60 transition-colors"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="p-2 rounded-lg hover:text-teal-400 hover:bg-slate-800/60 transition-colors"
                  aria-label="Send Email"
                  title={`Email ${personal.email}`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-500 light:text-slate-400 border-l border-slate-800 dark:border-slate-800 light:border-slate-300 pl-3">
                📍 {personal.location}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Profile & Tech Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-sm">
              
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-teal-500 to-cyan-500 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500" />

              {/* Main Card */}
              <div className="relative bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Profile Image / Tech Monogram Placeholder */}
                {(() => {
                  const defaultPhotoUrl = `${import.meta.env.BASE_URL}profile.jpg`;
                  const profilePhotoSrc = resolveAssetUrl(personal.profileImage) || defaultPhotoUrl;
                  return (
                    <div className="relative group/avatar mx-auto w-48 h-48 sm:w-52 sm:h-52 rounded-2xl overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border-2 border-teal-500/40 flex items-center justify-center shadow-lg shadow-teal-500/10 mb-6">
                      {profilePhotoSrc ? (
                        <img
                          src={profilePhotoSrc}
                          alt={personal.name}
                          onError={(e) => {
                            const target = e.currentTarget;
                            const defaultUrl = `${import.meta.env.BASE_URL}profile.jpg`;
                            const fallbackUrl = `${import.meta.env.BASE_URL}om_profile.jpg`;
                            if (target.src !== defaultUrl && !target.src.endsWith('profile.jpg')) {
                              target.src = defaultUrl;
                            } else if (target.src !== fallbackUrl && !target.src.endsWith('om_profile.jpg')) {
                              target.src = fallbackUrl;
                            }
                          }}
                          className="w-full h-full object-cover object-top scale-125 origin-top transition-transform duration-500 group-hover/avatar:scale-[1.32]"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
                          <div className="w-16 h-16 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                            <Terminal className="w-8 h-8" />
                          </div>
                          <div className="text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                            Profile Photo
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-500 light:text-slate-400">
                            Click below to upload
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Identity snippet */}
                <div className="text-center space-y-1 mb-4">
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {personal.name}
                  </h3>
                  <p className="text-xs text-teal-400 dark:text-teal-400 light:text-teal-600 font-medium">
                    {personal.role}
                  </p>
                </div>

                {/* Mini Focus Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700">
                    <Code2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="truncate">Full-Stack Dev</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700">
                    <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">AI & Vision</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700">
                    <Palette className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="truncate">UI/UX Systems</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">Problem Solver</span>
                  </div>
                </div>

              </div>

              {/* Floating Pill Tag */}
              <div className="absolute -bottom-3 -right-3 bg-slate-900 dark:bg-slate-900 light:bg-white border border-teal-500/40 text-[11px] font-semibold text-teal-300 dark:text-teal-300 light:text-teal-700 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-float-slow">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                <span>Designing & Coding</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
