import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { DesignPortfolio } from './components/DesignPortfolio';
import { Experience } from './components/Experience';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeSection } from './components/ResumeSection';
import { ResumeModal } from './components/ResumeModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EditorModal } from './components/EditorModal';
import { ToastContainer } from './components/Toast';

const PortfolioContent: React.FC = () => {
  const { data, setIsEditorOpen } = usePortfolio();

  // Hidden secret shortcut (Ctrl/Cmd + Shift + E) to open editor if owner needs it
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsEditorOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsEditorOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {data.sections.hero && <Hero />}
        {data.sections.about && <About />}
        {data.sections.skills && <Skills />}
        {data.sections.projects && <Projects />}
        {data.sections.uiux && <DesignPortfolio />}
        {data.sections.experience && <Experience />}
        {data.sections.resume && <ResumeSection />}
        {data.sections.contact && <ContactSection />}
      </main>

      <Footer />

      {/* Interactive Modals */}
      <ProjectModal />
      <CaseStudyModal />
      <ResumeModal />
      <EditorModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}

export default App;
