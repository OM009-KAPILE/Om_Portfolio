import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Navbar: React.FC = () => {
  const { data, theme, toggleTheme } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'uiux', 'experience', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', show: data.sections.hero },
    { name: 'About', href: '#about', show: data.sections.about },
    { name: 'Skills', href: '#skills', show: data.sections.skills },
    { name: 'Software Projects', href: '#projects', show: data.sections.projects },
    { name: 'UI/UX Design', href: '#uiux', show: data.sections.uiux },
    { name: 'Experience', href: '#experience', show: data.sections.experience },
    { name: 'Resume', href: '#resume', show: data.sections.resume },
    { name: 'Contact', href: '#contact', show: data.sections.contact },
  ].filter(item => item.show);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 dark:bg-slate-950/90 light:bg-white/90 backdrop-blur-md border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#home');
          }}
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-sm">
            <div className="w-full h-full bg-slate-950 dark:bg-slate-950 light:bg-white rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                OK
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-wider text-base uppercase text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-teal-400 transition-colors">
              {data.personal.name || 'OM KAPILE'}
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-teal-400/80 dark:text-teal-400/80 light:text-teal-600">
              Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'text-teal-400 dark:text-teal-400 light:text-teal-600 bg-teal-500/10'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-slate-100'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-teal-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Social Profiles */}
          <div className="hidden lg:flex items-center gap-1 border-r border-slate-800 dark:border-slate-800 light:border-slate-200 pr-2 mr-0.5">
            <a
              href={data.personal.githubUrl || "https://github.com/OM009-KAPILE"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-teal-400 hover:bg-slate-800/60 dark:hover:bg-slate-800/60 light:hover:bg-slate-100 transition-colors"
              aria-label="GitHub Profile"
              title="GitHub Profile (OM009-KAPILE)"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={data.personal.linkedinUrl || "https://www.linkedin.com/in/om-kapile-3a6590358"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-teal-400 hover:bg-slate-800/60 dark:hover:bg-slate-800/60 light:hover:bg-slate-100 transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile (om-kapile-3a6590358)"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-teal-400 hover:bg-slate-800/60 dark:hover:bg-slate-800/60 light:hover:bg-slate-100 transition-all focus:outline-none"
            aria-label="Toggle dark/light theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800/60 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/95 dark:bg-slate-950/95 light:bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'text-teal-400 bg-teal-500/10 font-semibold'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-850 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-2 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <a
                href={data.personal.githubUrl || "https://github.com/OM009-KAPILE"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:text-teal-400"
              >
                <GithubIcon className="w-4 h-4 text-teal-400" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={data.personal.linkedinUrl || "https://www.linkedin.com/in/om-kapile-3a6590358"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:text-teal-400"
              >
                <LinkedinIcon className="w-4 h-4 text-teal-400" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
