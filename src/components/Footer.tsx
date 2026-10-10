import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const { personal } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100/60 text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-wider uppercase text-slate-200 dark:text-slate-200 light:text-slate-900">
              {personal.name}
            </span>
            <span className="text-teal-400 text-xs">• Portfolio</span>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-3">
          {personal.githubUrl && (
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-teal-400 hover:bg-slate-900 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {personal.linkedinUrl && (
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-teal-400 hover:bg-slate-900 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
          {personal.email && (
            <a
              href={`mailto:${personal.email}`}
              className="p-2 rounded-xl text-slate-400 hover:text-teal-400 hover:bg-slate-900 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Right: Back To Top */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 transition-colors border border-slate-800"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
