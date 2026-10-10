import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import type { PortfolioData, SoftwareProject, CaseStudy, ProjectStatus, ExperienceItem } from '../types/portfolio';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  User, 
  FileText, 
  Code2, 
  Layers, 
  Palette, 
  Briefcase,
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Info, 
  Sliders
} from 'lucide-react';

type EditorTab = 
  | 'personal' 
  | 'about' 
  | 'skills' 
  | 'projects' 
  | 'caseStudies' 
  | 'experience'
  | 'resume' 
  | 'sections' 
  | 'backup';

export const EditorModal: React.FC = () => {
  const { 
    isEditorOpen, 
    setIsEditorOpen, 
    data, 
    saveData, 
    resetToDefault, 
    exportJSON, 
    importJSON,
    showToast 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<EditorTab>('personal');
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingCaseStudyId, setEditingCaseStudyId] = useState<string | null>(null);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);

  // Sync draft when editor opens
  useEffect(() => {
    if (isEditorOpen) {
      setDraft(JSON.parse(JSON.stringify(data)));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isEditorOpen, data]);

  if (!isEditorOpen) return null;

  // Save handler
  const handleSave = () => {
    saveData(draft);
    setIsEditorOpen(false);
  };

  // Cancel handler
  const handleCancel = () => {
    setDraft(JSON.parse(JSON.stringify(data)));
    setIsEditorOpen(false);
    showToast('Unsaved changes discarded', 'info');
  };

  // Image / File upload to base64 Data URL with size constraint
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (dataUrl: string, fileName?: string) => void,
    maxSizeMB: number = 3
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      showToast(`File too large! Max size is ${maxSizeMB}MB for localStorage compatibility.`, 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onComplete(reader.result, file.name);
        showToast(`Uploaded ${file.name} successfully!`, 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  // JSON Import trigger
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const success = importJSON(reader.result);
        if (success) {
          setIsEditorOpen(false);
        }
      }
    };
    reader.readAsText(file);
  };

  // Project helpers
  const handleAddProject = () => {
    const newProj: SoftwareProject = {
      id: `project-${Date.now()}`,
      title: 'New Software Project',
      subtitle: 'Project Tagline or Domain',
      description: 'Short overview describing what this application accomplishes and what problem it solves.',
      longDescription: 'Extended explanation detailing the architecture, components, and results.',
      features: ['Core functionality 1', 'User workflow 2'],
      technologies: ['React', 'TypeScript', 'Node.js'],
      status: 'In Progress',
      image: '',
      githubUrl: 'https://github.com/OM009-KAPILE',
      demoUrl: ''
    };
    setDraft(prev => ({ ...prev, projects: [newProj, ...prev.projects] }));
    setEditingProjectId(newProj.id);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setDraft(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
      if (editingProjectId === id) setEditingProjectId(null);
    }
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const newProjects = [...draft.projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newProjects.length) return;
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;
    setDraft(prev => ({ ...prev, projects: newProjects }));
  };

  // Case Study helpers
  const handleAddCaseStudy = () => {
    const newStudy: CaseStudy = {
      id: `case-study-${Date.now()}`,
      title: 'New UI/UX Case Study',
      subtitle: 'Mobile App / Web Dashboard Experience',
      challenge: 'Describe the core design challenge you aimed to solve.',
      coverImage: '',
      screens: ['Onboarding', 'Main Dashboard', 'User Settings'],
      designFocus: ['User Research', 'Information Architecture', 'Accessibility'],
      figmaUrl: 'https://www.figma.com',
      overview: 'Overview of the project goals and context.',
      problemStatement: 'The specific pain points users faced.',
      targetUsers: 'Target demographic and user personas.',
      designGoals: ['Improve task completion rate', 'Reduce visual clutter'],
      researchInsights: 'Key insights from interviews or competitive benchmarks.',
      userFlow: 'Auth -> Dashboard -> Action -> Completion',
      wireframes: 'Initial low-fidelity layout concepts.',
      finalUiScreens: 'High-fidelity polished screens.',
      designSystem: 'Color palette, typography scale, and components.',
      finalDesign: 'Complete cohesive design system and UI flows.',
      lessonsLearned: 'Key retrospective takeaways.',
      sectionsVisibility: {
        overview: true,
        problemStatement: true,
        targetUsers: true,
        designGoals: true,
        researchInsights: true,
        userFlow: true,
        wireframes: true,
        finalUiScreens: true,
        designSystem: true,
        finalDesign: true,
        lessonsLearned: true,
        figmaLink: true
      }
    };
    setDraft(prev => ({ ...prev, caseStudies: [newStudy, ...prev.caseStudies] }));
    setEditingCaseStudyId(newStudy.id);
  };

  const handleDeleteCaseStudy = (id: string) => {
    if (confirm('Are you sure you want to delete this UI/UX case study?')) {
      setDraft(prev => ({
        ...prev,
        caseStudies: prev.caseStudies.filter(cs => cs.id !== id)
      }));
      if (editingCaseStudyId === id) setEditingCaseStudyId(null);
    }
  };

  // Experience helpers
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      organization: 'New Organization',
      role: 'Role Title',
      location: 'Location',
      dates: 'Date Range – Present',
      description: ['Detailed description of work performed and responsibilities.'],
      highlights: ['Key achievement or highlight'],
      tools: ['Figma', 'UI/UX']
    };
    setDraft(prev => ({ ...prev, experiences: [newExp, ...(prev.experiences || [])] }));
    setEditingExperienceId(newExp.id);
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      setDraft(prev => ({
        ...prev,
        experiences: (prev.experiences || []).filter(e => e.id !== id)
      }));
      if (editingExperienceId === id) setEditingExperienceId(null);
    }
  };

  const handleMoveExperience = (index: number, direction: 'up' | 'down') => {
    const newExps = [...(draft.experiences || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newExps.length) return;
    const temp = newExps[index];
    newExps[index] = newExps[targetIndex];
    newExps[targetIndex] = temp;
    setDraft(prev => ({ ...prev, experiences: newExps }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={handleCancel}
      />

      {/* Editor Main Window */}
      <div className="relative w-full max-w-5xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-3xl shadow-2xl overflow-hidden z-10 my-4 flex flex-col h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                Portfolio Content Dashboard
              </h2>
              <p className="text-xs text-slate-400">
                Edit personal details, projects, skills, UI/UX case studies, and resume
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>

            <button
              onClick={handleCancel}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 bg-slate-800/60 hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Body: Tabs Sidebar + Tab Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          
          {/* Navigation Sidebar */}
          <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/40 p-3 space-y-1 overflow-x-auto md:overflow-y-auto shrink-0 flex md:flex-col gap-1 md:gap-0">
            <button
              onClick={() => setActiveTab('personal')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'personal'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Personal & Hero</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'about'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Info className="w-4 h-4 shrink-0" />
              <span>About & Highlights</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'skills'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Code2 className="w-4 h-4 shrink-0" />
              <span>Technical Skills</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>Software Projects ({draft.projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('caseStudies')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'caseStudies'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Palette className="w-4 h-4 shrink-0" />
              <span>UI/UX Case Studies ({draft.caseStudies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'experience'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Experience ({draft.experiences?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'resume'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Resume PDF / Link</span>
            </button>

            <button
              onClick={() => setActiveTab('sections')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'sections'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Eye className="w-4 h-4 shrink-0" />
              <span>Section Visibility</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'backup'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Backup & Restore</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50">
            
            {/* TAB: PERSONAL & HERO */}
            {activeTab === 'personal' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    Personal Information & Hero Section
                  </h3>
                  <p className="text-xs text-slate-400">
                    Update your display name, headline, location, and profile photo
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={draft.personal.name}
                      onChange={(e) => setDraft({
                        ...draft,
                        personal: { ...draft.personal, name: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                      Primary Role
                    </label>
                    <input
                      type="text"
                      value={draft.personal.role}
                      onChange={(e) => setDraft({
                        ...draft,
                        personal: { ...draft.personal, role: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={draft.personal.headline}
                    onChange={(e) => setDraft({
                      ...draft,
                      personal: { ...draft.personal, headline: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                    Hero Introduction Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={draft.personal.introduction}
                    onChange={(e) => setDraft({
                      ...draft,
                      personal: { ...draft.personal, introduction: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-400 resize-none"
                  />
                </div>

                {/* Profile Photo Uploader / URL */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                    Profile Photo
                  </span>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                      {draft.personal.profileImage ? (
                        <img 
                          src={draft.personal.profileImage} 
                          alt="Profile Preview" 
                          className="w-full h-full object-cover object-top scale-125 origin-top" 
                        />
                      ) : (
                        <span className="text-xs text-slate-500">No Image</span>
                      )}
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          id="avatar-upload"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => {
                            setDraft({
                              ...draft,
                              personal: { ...draft.personal, profileImage: dataUrl }
                            });
                          })}
                        />
                        <label
                          htmlFor="avatar-upload"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 cursor-pointer transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5 text-teal-400" />
                          <span>Upload Image File</span>
                        </label>

                        {draft.personal.profileImage && (
                          <button
                            onClick={() => setDraft({
                              ...draft,
                              personal: { ...draft.personal, profileImage: '' }
                            })}
                            className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">or URL:</span>
                        <input
                          type="text"
                          placeholder="https://example.com/photo.jpg"
                          value={draft.personal.profileImage}
                          onChange={(e) => setDraft({
                            ...draft,
                            personal: { ...draft.personal, profileImage: e.target.value }
                          })}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={draft.personal.location}
                      onChange={(e) => setDraft({
                        ...draft,
                        personal: { ...draft.personal, location: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draft.personal.availableForWork}
                        onChange={(e) => setDraft({
                          ...draft,
                          personal: { ...draft.personal, availableForWork: e.target.checked }
                        })}
                        className="w-4 h-4 rounded text-teal-400 focus:ring-0 bg-slate-950 border-slate-800"
                      />
                      <span className="text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                        Display "Available for Work & Internships" Pill
                      </span>
                    </label>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200 dark:text-slate-200 light:text-slate-900">
                    Contact & Social Profile Links
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                        Professional Email
                      </label>
                      <input
                        type="email"
                        value={draft.personal.email}
                        onChange={(e) => setDraft({
                          ...draft,
                          personal: { ...draft.personal, email: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 9158557553"
                        value={draft.personal.phone || ''}
                        onChange={(e) => setDraft({
                          ...draft,
                          personal: { ...draft.personal, phone: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://www.linkedin.com/in/om-kapile-3a6590358"
                        value={draft.personal.linkedinUrl}
                        onChange={(e) => setDraft({
                          ...draft,
                          personal: { ...draft.personal, linkedinUrl: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/OM009-KAPILE"
                        value={draft.personal.githubUrl}
                        onChange={(e) => setDraft({
                          ...draft,
                          personal: { ...draft.personal, githubUrl: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: ABOUT & HIGHLIGHTS */}
            {activeTab === 'about' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    About Me & Highlights
                  </h3>
                  <p className="text-xs text-slate-400">
                    Modify bio paragraphs and the 4 highlight cards
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                    Bio Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={draft.about.bio[0] || ''}
                    onChange={(e) => {
                      const newBio = [...draft.about.bio];
                      newBio[0] = e.target.value;
                      setDraft({ ...draft, about: { ...draft.about, bio: newBio } });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400 resize-none"
                  />

                  <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 pt-2">
                    Bio Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={draft.about.bio[1] || ''}
                    onChange={(e) => {
                      const newBio = [...draft.about.bio];
                      newBio[1] = e.target.value;
                      setDraft({ ...draft, about: { ...draft.about, bio: newBio } });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400 resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">
                    Highlights Cards
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Education
                      </label>
                      <input
                        type="text"
                        value={draft.about.highlights.education}
                        onChange={(e) => setDraft({
                          ...draft,
                          about: {
                            ...draft.about,
                            highlights: { ...draft.about.highlights, education: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Technical Interests
                      </label>
                      <input
                        type="text"
                        value={draft.about.highlights.technicalInterests}
                        onChange={(e) => setDraft({
                          ...draft,
                          about: {
                            ...draft.about,
                            highlights: { ...draft.about.highlights, technicalInterests: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Current Focus
                      </label>
                      <input
                        type="text"
                        value={draft.about.highlights.currentFocus}
                        onChange={(e) => setDraft({
                          ...draft,
                          about: {
                            ...draft.about,
                            highlights: { ...draft.about.highlights, currentFocus: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Career Goals
                      </label>
                      <input
                        type="text"
                        value={draft.about.highlights.careerGoals}
                        onChange={(e) => setDraft({
                          ...draft,
                          about: {
                            ...draft.about,
                            highlights: { ...draft.about.highlights, careerGoals: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: TECHNICAL SKILLS */}
            {activeTab === 'skills' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    Technical Skills Manager
                  </h3>
                  <p className="text-xs text-slate-400">
                    Add or remove skills in each verified category
                  </p>
                </div>

                <div className="space-y-6">
                  {draft.skillCategories.map((cat, catIdx) => (
                    <div
                      key={cat.id}
                      className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <input
                            type="text"
                            value={cat.name}
                            onChange={(e) => {
                              const newCats = [...draft.skillCategories];
                              newCats[catIdx].name = e.target.value;
                              setDraft({ ...draft, skillCategories: newCats });
                            }}
                            className="font-bold text-base bg-transparent border-b border-transparent hover:border-slate-700 focus:border-teal-400 text-slate-100 focus:outline-none px-1"
                          />
                          <p className="text-xs text-slate-400 px-1 mt-0.5">
                            {cat.description}
                          </p>
                        </div>

                        <span className="text-xs text-teal-400 font-semibold px-2 py-0.5 rounded bg-teal-500/10">
                          {cat.skills.length} items
                        </span>
                      </div>

                      {/* Skills Chips */}
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-200"
                          >
                            <span>{skill}</span>
                            <button
                              onClick={() => {
                                const newCats = [...draft.skillCategories];
                                newCats[catIdx].skills = newCats[catIdx].skills.filter((_, i) => i !== sIdx);
                                setDraft({ ...draft, skillCategories: newCats });
                              }}
                              className="text-slate-500 hover:text-rose-400 transition-colors"
                              title="Delete skill"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add Skill to Category */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          id={`new-skill-${cat.id}`}
                          placeholder="Type new skill & press Add..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = (e.target as HTMLInputElement).value.trim();
                              if (val) {
                                const newCats = [...draft.skillCategories];
                                if (!newCats[catIdx].skills.includes(val)) {
                                  newCats[catIdx].skills.push(val);
                                  setDraft({ ...draft, skillCategories: newCats });
                                }
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById(`new-skill-${cat.id}`) as HTMLInputElement;
                            if (input && input.value.trim()) {
                              const val = input.value.trim();
                              const newCats = [...draft.skillCategories];
                              if (!newCats[catIdx].skills.includes(val)) {
                                newCats[catIdx].skills.push(val);
                                setDraft({ ...draft, skillCategories: newCats });
                              }
                              input.value = '';
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors"
                        >
                          Add Skill
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB: SOFTWARE PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      Software Projects Manager
                    </h3>
                    <p className="text-xs text-slate-400">
                      Add, reorder, update status, and manage project code repositories
                    </p>
                  </div>

                  <button
                    onClick={handleAddProject}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {draft.projects.map((proj, pIdx) => {
                    const isExpanded = editingProjectId === proj.id;

                    return (
                      <div
                        key={proj.id}
                        className="rounded-2xl border border-slate-800 bg-slate-950/70 overflow-hidden"
                      >
                        {/* Summary Header */}
                        <div className="p-4 flex items-center justify-between gap-3 bg-slate-900/40">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-slate-500 w-5">
                              #{pIdx + 1}
                            </span>
                            <div>
                              <h4 className="font-bold text-sm text-slate-100">
                                {proj.title}
                              </h4>
                              <p className="text-xs text-teal-400">
                                {proj.subtitle} • <span className="font-semibold">{proj.status}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Reorder Up/Down */}
                            <button
                              onClick={() => handleMoveProject(pIdx, 'up')}
                              disabled={pIdx === 0}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 disabled:opacity-30"
                              title="Move up"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMoveProject(pIdx, 'down')}
                              disabled={pIdx === draft.projects.length - 1}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 disabled:opacity-30"
                              title="Move down"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setEditingProjectId(isExpanded ? null : proj.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 ml-2"
                            >
                              {isExpanded ? 'Collapse' : 'Edit Details'}
                            </button>

                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 ml-1"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Form Fields */}
                        {isExpanded && (
                          <div className="p-5 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-150">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Project Title
                                </label>
                                <input
                                  type="text"
                                  value={proj.title}
                                  onChange={(e) => {
                                    const updated = [...draft.projects];
                                    updated[pIdx].title = e.target.value;
                                    setDraft({ ...draft, projects: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Subtitle / Category
                                </label>
                                <input
                                  type="text"
                                  value={proj.subtitle}
                                  onChange={(e) => {
                                    const updated = [...draft.projects];
                                    updated[pIdx].subtitle = e.target.value;
                                    setDraft({ ...draft, projects: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Status (Concept / In Progress / Completed)
                                </label>
                                <select
                                  value={proj.status}
                                  onChange={(e) => {
                                    const updated = [...draft.projects];
                                    updated[pIdx].status = e.target.value as ProjectStatus;
                                    setDraft({ ...draft, projects: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                >
                                  <option value="Concept">Concept</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Short Description
                              </label>
                              <textarea
                                rows={2}
                                value={proj.description}
                                onChange={(e) => {
                                  const updated = [...draft.projects];
                                  updated[pIdx].description = e.target.value;
                                  setDraft({ ...draft, projects: updated });
                                }}
                                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Detailed Architecture & Long Description
                              </label>
                              <textarea
                                rows={3}
                                value={proj.longDescription || ''}
                                onChange={(e) => {
                                  const updated = [...draft.projects];
                                  updated[pIdx].longDescription = e.target.value;
                                  setDraft({ ...draft, projects: updated });
                                }}
                                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Technologies (comma-separated)
                                </label>
                                <input
                                  type="text"
                                  value={proj.technologies.join(', ')}
                                  onChange={(e) => {
                                    const updated = [...draft.projects];
                                    updated[pIdx].technologies = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                    setDraft({ ...draft, projects: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Features (comma-separated)
                                </label>
                                <input
                                  type="text"
                                  value={proj.features.join(', ')}
                                  onChange={(e) => {
                                    const updated = [...draft.projects];
                                    updated[pIdx].features = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                    setDraft({ ...draft, projects: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  GitHub URL
                                </label>
                                <input
                                  type="url"
                                  value={proj.githubUrl}
                                  onChange={(e) => {
                                    const updated = [...draft.projects];
                                    updated[pIdx].githubUrl = e.target.value;
                                    setDraft({ ...draft, projects: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Live Demo URL
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://..."
                                  value={proj.demoUrl}
                                  onChange={(e) => {
                                    const updated = [...draft.projects];
                                    updated[pIdx].demoUrl = e.target.value;
                                    setDraft({ ...draft, projects: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>
                            </div>

                            {/* Project Thumbnail Image */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Thumbnail Image (File or URL)
                              </label>
                              <div className="flex items-center gap-3">
                                <input
                                  type="file"
                                  accept="image/*"
                                  id={`proj-img-${proj.id}`}
                                  className="hidden"
                                  onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                    const updated = [...draft.projects];
                                    updated[pIdx].image = dataUrl;
                                    setDraft({ ...draft, projects: updated });
                                  })}
                                />
                                <label
                                  htmlFor={`proj-img-${proj.id}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-850 hover:bg-slate-800 border border-slate-700 cursor-pointer"
                                >
                                  <Upload className="w-3.5 h-3.5 text-teal-400" />
                                  <span>Upload Image</span>
                                </label>

                                <input
                                  type="text"
                                  placeholder="or Image URL..."
                                  value={proj.image}
                                  onChange={(e) => {
                                    const updated = [...draft.projects];
                                    updated[pIdx].image = e.target.value;
                                    setDraft({ ...draft, projects: updated });
                                  }}
                                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />

                                {proj.image && (
                                  <button
                                    onClick={() => {
                                      const updated = [...draft.projects];
                                      updated[pIdx].image = '';
                                      setDraft({ ...draft, projects: updated });
                                    }}
                                    className="text-xs text-rose-400 hover:underline"
                                  >
                                    Clear
                                  </button>
                                )}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* TAB: UI/UX CASE STUDIES */}
            {activeTab === 'caseStudies' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      UI/UX Case Studies Manager
                    </h3>
                    <p className="text-xs text-slate-400">
                      Edit design challenges, screens, research, and toggle section visibility
                    </p>
                  </div>

                  <button
                    onClick={handleAddCaseStudy}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Case Study</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {draft.caseStudies.map((cs, cIdx) => {
                    const isExpanded = editingCaseStudyId === cs.id;

                    return (
                      <div
                        key={cs.id}
                        className="rounded-2xl border border-slate-800 bg-slate-950/70 overflow-hidden"
                      >
                        {/* Summary Header */}
                        <div className="p-4 flex items-center justify-between gap-3 bg-slate-900/40">
                          <div>
                            <h4 className="font-bold text-sm text-slate-100">
                              {cs.title}
                            </h4>
                            <p className="text-xs text-teal-400">
                              {cs.subtitle}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingCaseStudyId(isExpanded ? null : cs.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700"
                            >
                              {isExpanded ? 'Collapse' : 'Edit Case Study'}
                            </button>

                            <button
                              onClick={() => handleDeleteCaseStudy(cs.id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                              title="Delete case study"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Form */}
                        {isExpanded && (
                          <div className="p-5 border-t border-slate-800/80 space-y-5 animate-in fade-in duration-150">
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Case Study Title
                                </label>
                                <input
                                  type="text"
                                  value={cs.title}
                                  onChange={(e) => {
                                    const updated = [...draft.caseStudies];
                                    updated[cIdx].title = e.target.value;
                                    setDraft({ ...draft, caseStudies: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Subtitle / Tagline
                                </label>
                                <input
                                  type="text"
                                  value={cs.subtitle}
                                  onChange={(e) => {
                                    const updated = [...draft.caseStudies];
                                    updated[cIdx].subtitle = e.target.value;
                                    setDraft({ ...draft, caseStudies: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1">
                                The Design Challenge
                              </label>
                              <textarea
                                rows={2}
                                value={cs.challenge}
                                onChange={(e) => {
                                  const updated = [...draft.caseStudies];
                                  updated[cIdx].challenge = e.target.value;
                                  setDraft({ ...draft, caseStudies: updated });
                                }}
                                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Screens to Showcase (comma-separated)
                                </label>
                                <input
                                  type="text"
                                  value={cs.screens.join(', ')}
                                  onChange={(e) => {
                                    const updated = [...draft.caseStudies];
                                    updated[cIdx].screens = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                    setDraft({ ...draft, caseStudies: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Design Focus Areas (comma-separated)
                                </label>
                                <input
                                  type="text"
                                  value={cs.designFocus.join(', ')}
                                  onChange={(e) => {
                                    const updated = [...draft.caseStudies];
                                    updated[cIdx].designFocus = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                    setDraft({ ...draft, caseStudies: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>
                            </div>

                            {/* Cover Image Upload / URL */}
                            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                                Case Study Cover / Hero Image
                              </span>
                              <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-24 h-16 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                                  {cs.coverImage ? (
                                    <img src={cs.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="text-[10px] text-slate-500">No Image</span>
                                  )}
                                </div>
                                <div className="flex-1 space-y-2 w-full">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id={`cover-upload-${cs.id}`}
                                      className="hidden"
                                      onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                        const updated = [...draft.caseStudies];
                                        updated[cIdx].coverImage = dataUrl;
                                        setDraft({ ...draft, caseStudies: updated });
                                      })}
                                    />
                                    <label
                                      htmlFor={`cover-upload-${cs.id}`}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 cursor-pointer transition-colors"
                                    >
                                      <Upload className="w-3.5 h-3.5 text-teal-400" />
                                      <span>Upload Cover File</span>
                                    </label>
                                    {cs.coverImage && (
                                      <button
                                        onClick={() => {
                                          const updated = [...draft.caseStudies];
                                          updated[cIdx].coverImage = '';
                                          setDraft({ ...draft, caseStudies: updated });
                                        }}
                                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-colors"
                                      >
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">or URL:</span>
                                    <input
                                      type="text"
                                      placeholder="https://images.unsplash.com/..."
                                      value={cs.coverImage}
                                      onChange={(e) => {
                                        const updated = [...draft.caseStudies];
                                        updated[cIdx].coverImage = e.target.value;
                                        setDraft({ ...draft, caseStudies: updated });
                                      }}
                                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Narrative Case Study Sections */}
                            <div className="space-y-4 pt-2 border-t border-slate-800/80">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                                Detailed Case Study Content & Narratives
                              </h5>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  1. Project Overview
                                </label>
                                <textarea
                                  rows={2}
                                  value={cs.overview}
                                  onChange={(e) => {
                                    const updated = [...draft.caseStudies];
                                    updated[cIdx].overview = e.target.value;
                                    setDraft({ ...draft, caseStudies: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    2. Problem Statement
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={cs.problemStatement}
                                    onChange={(e) => {
                                      const updated = [...draft.caseStudies];
                                      updated[cIdx].problemStatement = e.target.value;
                                      setDraft({ ...draft, caseStudies: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    3. Target Users
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={cs.targetUsers}
                                    onChange={(e) => {
                                      const updated = [...draft.caseStudies];
                                      updated[cIdx].targetUsers = e.target.value;
                                      setDraft({ ...draft, caseStudies: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  4. Design Goals (one per line)
                                </label>
                                <textarea
                                  rows={3}
                                  value={cs.designGoals.join('\n')}
                                  onChange={(e) => {
                                    const updated = [...draft.caseStudies];
                                    updated[cIdx].designGoals = e.target.value.split('\n').filter(Boolean);
                                    setDraft({ ...draft, caseStudies: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Research Insights
                                </label>
                                <textarea
                                  rows={2}
                                  value={cs.researchInsights}
                                  onChange={(e) => {
                                    const updated = [...draft.caseStudies];
                                    updated[cIdx].researchInsights = e.target.value;
                                    setDraft({ ...draft, caseStudies: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    5. User Flow Architecture
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={cs.userFlow}
                                    onChange={(e) => {
                                      const updated = [...draft.caseStudies];
                                      updated[cIdx].userFlow = e.target.value;
                                      setDraft({ ...draft, caseStudies: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    6. Wireframes & Exploration
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={cs.wireframes}
                                    onChange={(e) => {
                                      const updated = [...draft.caseStudies];
                                      updated[cIdx].wireframes = e.target.value;
                                      setDraft({ ...draft, caseStudies: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    7. High-Fidelity UI Screens
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={cs.finalUiScreens}
                                    onChange={(e) => {
                                      const updated = [...draft.caseStudies];
                                      updated[cIdx].finalUiScreens = e.target.value;
                                      setDraft({ ...draft, caseStudies: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    8. Design System Tokens
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={cs.designSystem}
                                    onChange={(e) => {
                                      const updated = [...draft.caseStudies];
                                      updated[cIdx].designSystem = e.target.value;
                                      setDraft({ ...draft, caseStudies: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    9. Final Design
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={cs.finalDesign || ''}
                                    onChange={(e) => {
                                      const updated = [...draft.caseStudies];
                                      updated[cIdx].finalDesign = e.target.value;
                                      setDraft({ ...draft, caseStudies: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    10. Key Learnings & Takeaways
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={cs.lessonsLearned}
                                    onChange={(e) => {
                                      const updated = [...draft.caseStudies];
                                      updated[cIdx].lessonsLearned = e.target.value;
                                      setDraft({ ...draft, caseStudies: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Figma Prototype URL (can be added later)
                              </label>
                              <input
                                type="url"
                                placeholder="https://www.figma.com/proto/..."
                                value={cs.figmaUrl}
                                onChange={(e) => {
                                  const updated = [...draft.caseStudies];
                                  updated[cIdx].figmaUrl = e.target.value;
                                  setDraft({ ...draft, caseStudies: updated });
                                }}
                                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                              />
                            </div>

                            {/* Section Visibilities Toggles */}
                            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                                Section Visibility Toggles (Hide any uncompleted parts)
                              </span>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                {Object.keys(cs.sectionsVisibility).map((key) => {
                                  const secKey = key as keyof typeof cs.sectionsVisibility;
                                  const isVisible = cs.sectionsVisibility[secKey];
                                  return (
                                    <label key={key} className="flex items-center gap-1.5 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={isVisible}
                                        onChange={(e) => {
                                          const updated = [...draft.caseStudies];
                                          updated[cIdx].sectionsVisibility[secKey] = e.target.checked;
                                          setDraft({ ...draft, caseStudies: updated });
                                        }}
                                        className="w-3.5 h-3.5 rounded text-teal-400"
                                      />
                                      <span className="capitalize text-slate-300">
                                        {key.replace(/([A-Z])/g, ' $1')}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* TAB: WORK EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      Professional Experience Manager
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manage internships, job roles, highlights, and organizations (ordered newest first)
                    </p>
                  </div>

                  <button
                    onClick={handleAddExperience}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Experience</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(draft.experiences || []).map((exp, eIdx) => {
                    const isExpanded = editingExperienceId === exp.id;

                    return (
                      <div
                        key={exp.id}
                        className="rounded-2xl border border-slate-800 bg-slate-950/70 overflow-hidden"
                      >
                        {/* Summary Header */}
                        <div className="p-4 flex items-center justify-between gap-3 bg-slate-900/40">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-slate-500 w-5">
                              #{eIdx + 1}
                            </span>
                            <div>
                              <h4 className="font-bold text-sm text-slate-100">
                                {exp.role} <span className="text-slate-400 font-normal">at</span> {exp.organization}
                              </h4>
                              <p className="text-xs text-teal-400">
                                {exp.dates} {exp.location ? `• ${exp.location}` : ''}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Reorder Up/Down */}
                            <button
                              onClick={() => handleMoveExperience(eIdx, 'up')}
                              disabled={eIdx === 0}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 disabled:opacity-30"
                              title="Move up"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMoveExperience(eIdx, 'down')}
                              disabled={eIdx === (draft.experiences?.length || 0) - 1}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 disabled:opacity-30"
                              title="Move down"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setEditingExperienceId(isExpanded ? null : exp.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 ml-2"
                            >
                              {isExpanded ? 'Collapse' : 'Edit Details'}
                            </button>

                            <button
                              onClick={() => handleDeleteExperience(exp.id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 ml-1"
                              title="Delete experience"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Form */}
                        {isExpanded && (
                          <div className="p-5 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-150">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Organization Name
                                </label>
                                <input
                                  type="text"
                                  value={exp.organization}
                                  onChange={(e) => {
                                    const updated = [...(draft.experiences || [])];
                                    updated[eIdx].organization = e.target.value;
                                    setDraft({ ...draft, experiences: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Role / Job Title
                                </label>
                                <input
                                  type="text"
                                  value={exp.role}
                                  onChange={(e) => {
                                    const updated = [...(draft.experiences || [])];
                                    updated[eIdx].role = e.target.value;
                                    setDraft({ ...draft, experiences: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Dates / Tenure (e.g. July 2026 – Present)
                                </label>
                                <input
                                  type="text"
                                  value={exp.dates}
                                  onChange={(e) => {
                                    const updated = [...(draft.experiences || [])];
                                    updated[eIdx].dates = e.target.value;
                                    setDraft({ ...draft, experiences: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                  Location (City, Country or Remote)
                                </label>
                                <input
                                  type="text"
                                  value={exp.location || ''}
                                  onChange={(e) => {
                                    const updated = [...(draft.experiences || [])];
                                    updated[eIdx].location = e.target.value;
                                    setDraft({ ...draft, experiences: updated });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Description Paragraphs (separate paragraphs with an empty line)
                              </label>
                              <textarea
                                rows={4}
                                value={exp.description.join('\n\n')}
                                onChange={(e) => {
                                  const updated = [...(draft.experiences || [])];
                                  updated[eIdx].description = e.target.value.split('\n\n').filter(Boolean);
                                  setDraft({ ...draft, experiences: updated });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none font-sans"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Key Highlights (one highlight per line)
                              </label>
                              <textarea
                                rows={4}
                                value={exp.highlights.join('\n')}
                                onChange={(e) => {
                                  const updated = [...(draft.experiences || [])];
                                  updated[eIdx].highlights = e.target.value.split('\n').filter(Boolean);
                                  setDraft({ ...draft, experiences: updated });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400 resize-none font-sans"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Technologies & Tools Used (comma-separated, e.g. Figma, Wireframing, Python)
                              </label>
                              <input
                                type="text"
                                value={(exp.tools || []).join(', ')}
                                onChange={(e) => {
                                  const updated = [...(draft.experiences || [])];
                                  updated[eIdx].tools = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                  setDraft({ ...draft, experiences: updated });
                                }}
                                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                              />
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* TAB: RESUME SETTINGS */}
            {activeTab === 'resume' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    Resume Settings & Upload
                  </h3>
                  <p className="text-xs text-slate-400">
                    Manage your resume file, update timestamp, and credentials summary
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                        Resume Document Status
                      </span>
                      <p className="text-sm font-semibold text-slate-200 mt-0.5">
                        {draft.resume.fileName || 'Om_Kapile_Resume.pdf'}
                      </p>
                    </div>

                    <span className="text-xs text-slate-400">
                      {draft.resume.resumeUrl ? 'Custom PDF Loaded' : 'Interactive Document Ready'}
                    </span>
                  </div>

                  {/* Upload PDF */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      id="resume-file-upload"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (dataUrl, fileName) => {
                        setDraft({
                          ...draft,
                          resume: {
                            ...draft.resume,
                            resumeUrl: dataUrl,
                            fileName: fileName || 'Om_Kapile_Resume.pdf',
                            lastUpdated: 'Recently Uploaded',
                            isCustomUploaded: true
                          }
                        });
                      }, 4)}
                    />
                    <label
                      htmlFor="resume-file-upload"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 cursor-pointer transition-colors shadow-sm"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload New PDF Resume</span>
                    </label>

                    {draft.resume.resumeUrl && (
                      <button
                        onClick={() => setDraft({
                          ...draft,
                          resume: {
                            ...draft.resume,
                            resumeUrl: '',
                            fileName: 'Om_Kapile_Resume.pdf',
                            isCustomUploaded: false
                          }
                        })}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-colors"
                      >
                        Reset to Default Profile Resume
                      </button>
                    )}
                  </div>

                  {/* Or Custom URL */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Or link external PDF URL (e.g. Google Drive / Dropbox link)
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={draft.resume.resumeUrl}
                      onChange={(e) => setDraft({
                        ...draft,
                        resume: { ...draft.resume, resumeUrl: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Resume File Name
                    </label>
                    <input
                      type="text"
                      value={draft.resume.fileName}
                      onChange={(e) => setDraft({
                        ...draft,
                        resume: { ...draft.resume, fileName: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Last Updated String
                    </label>
                    <input
                      type="text"
                      value={draft.resume.lastUpdated}
                      onChange={(e) => setDraft({
                        ...draft,
                        resume: { ...draft.resume, lastUpdated: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* TAB: SECTION VISIBILITY */}
            {activeTab === 'sections' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    Section Visibility Controls
                  </h3>
                  <p className="text-xs text-slate-400">
                    Hide or show specific sections on the live website anytime
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  {Object.keys(draft.sections).map((key) => {
                    const secKey = key as keyof typeof draft.sections;
                    const isVisible = draft.sections[secKey];

                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isVisible ? 'bg-teal-500/10 text-teal-400' : 'bg-slate-800 text-slate-500'}`}>
                            {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-slate-200 capitalize">
                              {key === 'uiux' ? 'UI/UX Design Portfolio' : key === 'projects' ? 'Software Projects' : key === 'experience' ? 'Work & Internship Experience' : key} Section
                            </span>
                            <p className="text-[11px] text-slate-500">
                              {isVisible ? 'Currently visible on public site' : 'Hidden from public navigation and body'}
                            </p>
                          </div>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => setDraft({
                              ...draft,
                              sections: { ...draft.sections, [secKey]: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500" />
                        </label>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* TAB: BACKUP & RESTORE */}
            {activeTab === 'backup' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    Backup, Export & Persistence
                  </h3>
                  <p className="text-xs text-slate-400">
                    Save your updates, export JSON backups, and transfer data across machines
                  </p>
                </div>

                {/* LocalStorage Notice Card */}
                <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/25 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
                    <Info className="w-4 h-4" />
                    <span>Browser LocalStorage Persistence</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Your portfolio content is securely saved in your browser's <code className="text-teal-300 bg-slate-950/80 px-1 py-0.5 rounded">localStorage</code>. This means your edits stay permanently on this device and browser.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Important note:</strong> Browser localStorage is specific to this machine and does not sync to other computers automatically. Use the <strong>Export JSON Backup</strong> feature below whenever you wish to transfer your latest edits to another device or back them up!
                  </p>
                </div>

                {/* Backup Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">
                        Export JSON Backup
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Download your entire portfolio configuration (projects, skills, case studies, personal details) as a standalone JSON file.
                      </p>
                    </div>

                    <button
                      onClick={exportJSON}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JSON Backup</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">
                        Import JSON Backup
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Restore from a previously saved backup file. Safely validates structure before applying.
                      </p>
                    </div>

                    <div>
                      <input
                        type="file"
                        accept=".json"
                        id="json-import-input"
                        className="hidden"
                        onChange={handleImportFile}
                      />
                      <label
                        htmlFor="json-import-input"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 cursor-pointer transition-colors"
                      >
                        <Upload className="w-4 h-4 text-teal-400" />
                        <span>Select JSON File to Restore</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Reset to Default */}
                <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-rose-300">
                        Reset to Factory Template
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Restores initial portfolio content for Om Kapile, clearing custom overrides.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all portfolio data back to the original default template?')) {
                          resetToDefault();
                          setIsEditorOpen(false);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Portfolio</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>Changes will be stored in your browser storage upon saving</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 transition-all shadow-md shadow-teal-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
