export type ProjectStatus = 'Concept' | 'In Progress' | 'Completed';

export interface PersonalInfo {
  name: string;
  role: string;
  subtitles: string[];
  headline: string;
  introduction: string;
  location: string;
  phone: string;
  profileImage: string;
  availableForWork: boolean;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterUrl?: string;
}

export interface AboutHighlights {
  education: string;
  technicalInterests: string;
  currentFocus: string;
  careerGoals: string;
}

export interface AboutData {
  bio: string[];
  highlights: AboutHighlights;
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  skills: string[];
}

export interface SoftwareProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  features: string[];
  technologies: string[];
  status: ProjectStatus;
  image: string;
  githubUrl: string;
  demoUrl: string;
}

export interface CaseStudySectionsVisibility {
  overview: boolean;
  problemStatement: boolean;
  targetUsers: boolean;
  designGoals: boolean;
  researchInsights: boolean;
  userFlow: boolean;
  wireframes: boolean;
  finalUiScreens: boolean;
  designSystem: boolean;
  finalDesign: boolean;
  lessonsLearned: boolean;
  figmaLink: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  challenge: string;
  coverImage: string;
  screens: string[];
  designFocus: string[];
  figmaUrl: string;
  
  // Detailed case study sections
  overview: string;
  problemStatement: string;
  targetUsers: string;
  designGoals: string[];
  researchInsights: string;
  userFlow: string;
  wireframes: string;
  finalUiScreens: string;
  designSystem: string;
  finalDesign?: string;
  lessonsLearned: string;
  
  sectionsVisibility: CaseStudySectionsVisibility;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  location?: string;
  dates: string;
  description: string[];
  highlights: string[];
  tools?: string[];
}

export interface ResumeData {
  resumeUrl: string;
  fileName: string;
  lastUpdated: string;
  educationSummary: string;
  skillsSummary: string;
  isCustomUploaded: boolean;
}

export interface SectionSettings {
  hero: boolean;
  about: boolean;
  skills: boolean;
  projects: boolean;
  uiux: boolean;
  experience: boolean;
  resume: boolean;
  contact: boolean;
}

export interface PortfolioData {
  personal: PersonalInfo;
  about: AboutData;
  skillCategories: SkillCategory[];
  projects: SoftwareProject[];
  caseStudies: CaseStudy[];
  experiences: ExperienceItem[];
  resume: ResumeData;
  sections: SectionSettings;
}
