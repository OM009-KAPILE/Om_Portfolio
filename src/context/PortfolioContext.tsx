import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PortfolioData, SoftwareProject, CaseStudy } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultData';

const STORAGE_KEY = 'om_portfolio_data_v6';
const THEME_KEY = 'om_portfolio_theme';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface PortfolioContextType {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  saveData: (newData?: PortfolioData) => void;
  resetToDefault: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;
  
  // Editor modal controls
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  
  // Project detail modal
  activeProject: SoftwareProject | null;
  setActiveProject: (project: SoftwareProject | null) => void;
  
  // UI/UX Case study detail modal
  activeCaseStudy: CaseStudy | null;
  setActiveCaseStudy: (caseStudy: CaseStudy | null) => void;
  
  // Resume viewer modal
  isResumeViewerOpen: boolean;
  setIsResumeViewerOpen: (open: boolean) => void;
  
  // Quick updater helpers
  updatePersonal: (updates: Partial<PortfolioData['personal']>) => void;
  updateAbout: (updates: Partial<PortfolioData['about']>) => void;
  updateResume: (updates: Partial<PortfolioData['resume']>) => void;
  toggleSectionVisibility: (sectionKey: keyof PortfolioData['sections']) => void;
  
  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: Dark theme default as requested
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Dark theme default
  });

  // Portfolio data state
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const oldSaved = localStorage.getItem('om_portfolio_data_v5') || localStorage.getItem('om_portfolio_data_v4');
        if (oldSaved) {
          try {
            const oldParsed = JSON.parse(oldSaved);
            const migratedProjects = (oldParsed.projects || defaultPortfolioData.projects).map((p: any) => {
              if (p.id === 'project-x') {
                return { ...p, githubUrl: 'https://github.com/OM009-KAPILE/Projectx' };
              }
              if (p.id === 'gun-detection' && p.githubUrl === 'https://github.com/OM009-KAPILE') {
                return { ...p, githubUrl: '' };
              }
              return p;
            });
            oldParsed.projects = migratedProjects;
            if (!oldParsed.personal?.profileImage) {
              oldParsed.personal = { ...oldParsed.personal, profileImage: defaultPortfolioData.personal.profileImage };
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(oldParsed));
            saved = JSON.stringify(oldParsed);
          } catch {
            // fallback to default
          }
        }
      }

      if (saved) {
        const parsed = JSON.parse(saved);
        const finalProjects = (parsed.projects || defaultPortfolioData.projects).map((p: any) => {
          if (p.id === 'project-x') {
            return { ...p, githubUrl: 'https://github.com/OM009-KAPILE/Projectx' };
          }
          if (p.id === 'gun-detection' && p.githubUrl === 'https://github.com/OM009-KAPILE') {
            return { ...p, githubUrl: '' };
          }
          return p;
        });

        const activeProfileImage = parsed.personal?.profileImage || defaultPortfolioData.personal.profileImage || '/om_profile.jpg';

        // Merge with default to guarantee all fields exist in case of schema updates
        return {
          ...defaultPortfolioData,
          ...parsed,
          projects: finalProjects,
          personal: { 
            ...defaultPortfolioData.personal, 
            ...(parsed.personal || {}),
            profileImage: activeProfileImage
          },
          about: {
            ...defaultPortfolioData.about,
            ...(parsed.about || {}),
            highlights: { ...defaultPortfolioData.about.highlights, ...(parsed.about?.highlights || {}) }
          },
          experiences: parsed.experiences || defaultPortfolioData.experiences,
          sections: { ...defaultPortfolioData.sections, ...(parsed.sections || {}) },
          resume: { ...defaultPortfolioData.resume, ...(parsed.resume || {}) }
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved portfolio data from localStorage, using default data', e);
    }
    return defaultPortfolioData;
  });

  // Active modals
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<SoftwareProject | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);

  // Toast system
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync theme with html root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Save to localStorage
  const saveData = (newData?: PortfolioData) => {
    const toSave = newData || data;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      if (newData) setData(newData);
      showToast('Portfolio changes saved successfully to your browser storage!', 'success');
    } catch (e) {
      console.error('Error saving data to localStorage', e);
      showToast('Failed to save changes. Your browser storage might be full.', 'error');
    }
  };

  // Reset to default
  const resetToDefault = () => {
    setData(defaultPortfolioData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPortfolioData));
    showToast('Reset portfolio data back to default template!', 'info');
  };

  // Export JSON file
  const exportJSON = () => {
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 2)
      )}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', 'om-kapile-portfolio-data.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Portfolio backup JSON exported successfully!', 'success');
    } catch (e) {
      console.error('Error exporting data', e);
      showToast('Could not export portfolio data.', 'error');
    }
  };

  // Import JSON file
  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      // Validate minimal structure
      if (!parsed.personal || !parsed.personal.name || !Array.isArray(parsed.projects)) {
        throw new Error('Invalid portfolio backup JSON format. Missing key fields.');
      }

      const mergedData: PortfolioData = {
        ...defaultPortfolioData,
        ...parsed,
        personal: { ...defaultPortfolioData.personal, ...parsed.personal },
        about: {
          ...defaultPortfolioData.about,
          ...parsed.about,
          highlights: { ...defaultPortfolioData.about.highlights, ...(parsed.about?.highlights || {}) }
        },
        skillCategories: parsed.skillCategories || defaultPortfolioData.skillCategories,
        projects: parsed.projects || defaultPortfolioData.projects,
        caseStudies: parsed.caseStudies || defaultPortfolioData.caseStudies,
        experiences: parsed.experiences || defaultPortfolioData.experiences,
        resume: { ...defaultPortfolioData.resume, ...(parsed.resume || {}) },
        sections: { ...defaultPortfolioData.sections, ...(parsed.sections || {}) }
      };

      setData(mergedData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
      showToast('Portfolio data restored successfully from backup!', 'success');
      return true;
    } catch (err: any) {
      console.error('Import failed', err);
      showToast(err.message || 'Failed to import backup file. Check file format.', 'error');
      return false;
    }
  };

  // Helpers
  const updatePersonal = (updates: Partial<PortfolioData['personal']>) => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, ...updates }
    }));
  };

  const updateAbout = (updates: Partial<PortfolioData['about']>) => {
    setData(prev => ({
      ...prev,
      about: { ...prev.about, ...updates }
    }));
  };

  const updateResume = (updates: Partial<PortfolioData['resume']>) => {
    setData(prev => ({
      ...prev,
      resume: { ...prev.resume, ...updates }
    }));
  };

  const toggleSectionVisibility = (sectionKey: keyof PortfolioData['sections']) => {
    setData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: !prev.sections[sectionKey]
      }
    }));
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        setData,
        theme,
        toggleTheme,
        saveData,
        resetToDefault,
        exportJSON,
        importJSON,
        isEditorOpen,
        setIsEditorOpen,
        activeProject,
        setActiveProject,
        activeCaseStudy,
        setActiveCaseStudy,
        isResumeViewerOpen,
        setIsResumeViewerOpen,
        updatePersonal,
        updateAbout,
        updateResume,
        toggleSectionVisibility,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
