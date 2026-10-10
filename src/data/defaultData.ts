import type { PortfolioData } from '../types/portfolio';

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: "Om Kapile",
    role: "Computer Science Engineering Student",
    subtitles: [
      "Computer Science Engineering Student",
      "Software Developer",
      "AI/ML Enthusiast",
      "UI/UX Designer"
    ],
    headline: "Building Intelligent Solutions. Designing Better Experiences.",
    introduction: "I'm a Computer Science Engineering student passionate about software development, artificial intelligence, and user-centered design. I enjoy transforming ideas into practical digital solutions through coding, experimentation, and creative problem-solving.",
    location: "India",
    phone: "+91 9158557553",
    profileImage: `${import.meta.env.BASE_URL}profile.jpg`,
    availableForWork: true,
    email: "kapileom2006@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/om-kapile-3a6590358",
    githubUrl: "https://github.com/OM009-KAPILE",
    twitterUrl: ""
  },
  about: {
    bio: [
      "I'm a Computer Science Engineering student exploring the intersection of software engineering, artificial intelligence, and UI/UX design. I enjoy building applications that solve real-world problems, experimenting with emerging technologies, and designing intuitive user experiences.",
      "Through academic projects, hackathons, and personal experiments, I'm continuously improving my technical skills and learning how to turn ideas into useful products."
    ],
    highlights: {
      education: "Bachelor of Technology in Artificial Intelligence and Machine Learning (Expected 2028), Sanjivani College of Engineering",
      technicalInterests: "Software Development, AI/ML, UI/UX Design, Computer Vision",
      currentFocus: "Architecting scalable web applications, experimenting with computer vision models, and building clean design systems",
      careerGoals: "Seeking software development and AI engineering opportunities where I can solve real challenges and build user-centric digital products"
    }
  },
  skillCategories: [
    {
      id: "programming",
      name: "Programming",
      description: "Core languages for algorithmic problem-solving and software engineering",
      skills: ["Python", "Java", "JavaScript", "SQL"]
    },
    {
      id: "web-dev",
      name: "Web Development",
      description: "Frontend & backend frameworks for building responsive web apps",
      skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "REST APIs"]
    },
    {
      id: "ai-cv",
      name: "AI and Computer Vision",
      description: "Machine learning architectures and computer vision pipelines",
      skills: ["Machine Learning", "Computer Vision", "YOLO", "OpenCV", "NumPy", "AI Integration"]
    },
    {
      id: "databases-tools",
      name: "Databases and Tools",
      description: "Storage systems, version control, design software, and automation tools",
      skills: ["MySQL", "PostgreSQL", "Git", "GitHub", "VS Code", "Figma", "n8n"]
    }
  ],
  projects: [
    {
      id: "project-x",
      title: "ProjectX — AI-Powered Student Collaboration Platform",
      subtitle: "AI-Powered Student Collaboration Platform",
      description: "An AI-powered student collaboration platform designed to help students discover collaborators, form teams, showcase skills, and work together on projects. It supports student profiles, skill-based matching, team formation, project collaboration, and AI-assisted recommendations.",
      longDescription: "ProjectX addresses the fragmentation in student project teams. By pairing a robust profiles database with intelligent matching algorithms, it suggests optimal teammate combinations based on project tech stacks, complementary skill sets, and working preferences.",
      features: [
        "Student registration and profiles",
        "Skill-based student matching",
        "Team formation and collaboration",
        "Project and application management",
        "AI-powered recommendations",
        "Skill-gap identification",
        "Email verification and notifications"
      ],
      technologies: ["Node.js", "Express.js", "REST APIs", "Python AI service", "Database Integration", "Brevo Email API"],
      status: "In Progress",
      image: "",
      githubUrl: "https://github.com/OM009-KAPILE/Projectx",
      demoUrl: ""
    },
    {
      id: "gun-detection",
      title: "Gun Detection System — Real-Time Threat Monitoring Using Computer Vision",
      subtitle: "Real-Time Threat Monitoring Using Computer Vision",
      description: "A computer vision project designed to detect potential firearms in video streams and highlight detections for security monitoring.",
      longDescription: "Utilizes deep learning object detection pipelines to scan live CCTV or camera video streams, providing high-precision bounding boxes, confidence metrics, and immediate alert signals to enhance physical security.",
      features: [
        "Webcam or video-based object detection",
        "Detection bounding boxes",
        "Confidence scores",
        "Potential threat alerts",
        "Visual monitoring interface"
      ],
      technologies: ["Python", "YOLO", "OpenCV", "NumPy"],
      status: "In Progress",
      image: "",
      githubUrl: "",
      demoUrl: ""
    }
  ],
  caseStudies: [
    {
      id: "projectx-ux",
      title: "ProjectX — Student Collaboration Platform UI/UX Design",
      subtitle: "Student Collaboration Platform UI/UX Design",
      challenge: "Create a clean, intuitive, accessible, and visually consistent user experience that simplifies student collaboration and makes important information easy to discover.",
      coverImage: "",
      screens: [
        "Landing Page",
        "Sign Up and Login",
        "Student Dashboard",
        "Student Profile and Skills",
        "Team Formation",
        "Project Discovery",
        "Project Details",
        "AI-Based Student Matching",
        "Application Management"
      ],
      designFocus: [
        "User Research",
        "Information Architecture",
        "Mobile & Web UI",
        "Accessibility (WCAG)",
        "Design Systems"
      ],
      figmaUrl: "",
      overview: "A student-focused collaboration platform designed to make it easier for students to showcase their skills, discover teammates, join projects, and collaborate with other students.",
      problemStatement: "Students often struggle to find motivated collaborators with complementary skill sets across academic departments. Existing communication tools are fragmented, lacking unified skill verification and team formation workflows.",
      targetUsers: "Undergraduate & graduate STEM students, hackathon competitors, student researchers, and project leads looking for verified collaborators.",
      designGoals: [
        "Design intuitive student profiles with clear skill evidence",
        "Streamline the team formation and discovery flow",
        "Ensure WCAG AA accessible contrast, responsive spacing, and readable typography",
        "Create a cohesive design system for rapid multi-platform scaling"
      ],
      researchInsights: "Exploratory surveys showed that 84% of students find it challenging to connect with peers beyond their immediate classroom cohorts, with 70% desiring an AI-assisted skill matching mechanism.",
      userFlow: "Landing Page -> Sign Up / Login -> Student Dashboard -> Profile & Skills Setup -> Project Discovery -> Team Formation & Applications",
      wireframes: "Iterated across low-fidelity paper and digital wireframes, focusing on clear grid layouts for discovery cards and low-cognitive-load application modals.",
      finalUiScreens: "High-fidelity screens developed using dark navy slate backgrounds, high-contrast typography, and purposeful teal visual anchors for interactive actions.",
      designSystem: "Built an atomic design system featuring responsive typography tokens, an 8px spatial grid, reusable card components, and accessible form inputs.",
      finalDesign: "An end-to-end user experience that harmonizes student profiles, matchmaking suggestions, and project workspace coordination into one cohesive interface.",
      lessonsLearned: "User-centered design in student productivity software demands aggressive simplicity: reducing steps between finding a project and submitting a collaboration application creates significantly higher engagement.",
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
    }
  ],
  experiences: [
    {
      id: "ural-federal-university",
      organization: "Ural Federal University",
      location: "Yekaterinburg, Russia",
      role: "Summer Intern",
      dates: "July 2026 – Present",
      description: [
        "Selected for a competitive international summer internship program, contributing to assigned technical and research tasks within a rigorous and fast-paced academic environment at the university level, using Figma.",
        "Collaborated with an international cohort of students and mentors to enhance technical and analytical skills through intensive coursework and the successful execution of applied research projects."
      ],
      highlights: [
        "International academic internship experience",
        "Technical and research-oriented assignments",
        "UI/UX design work using Figma",
        "Collaboration with international students and mentors",
        "Applied research and intensive coursework"
      ],
      tools: ["Figma", "UI/UX Design", "Applied Research", "Academic Collaboration"]
    },
    {
      id: "labmentix-india",
      organization: "Labmentix India",
      location: "India",
      role: "UI/UX Designer",
      dates: "April 2026 – Present",
      description: [
        "Designed comprehensive UI/UX concepts for digital products, applying advanced user research methods to translate complex user needs into wireframes and interactive high-fidelity prototypes.",
        "Collaborated with cross-functional teams to iterate design solutions, ensuring consistent visual language, optimal usability, and full accessibility compliance across all critical product touchpoints."
      ],
      highlights: [
        "User research and understanding user needs",
        "Wireframing and high-fidelity prototyping",
        "UI/UX concepts for digital products",
        "Collaboration with cross-functional teams",
        "Visual consistency and usability",
        "Accessibility-focused design"
      ],
      tools: ["Figma", "Wireframing", "Prototyping", "User Research", "UI Design", "Accessibility"]
    }
  ],
  resume: {
    resumeUrl: `${import.meta.env.BASE_URL}Om_Kapile_Resume.pdf`,
    fileName: "Om_Kapile_Resume.pdf",
    lastUpdated: "July 2026",
    educationSummary: "B.Tech in Artificial Intelligence & Machine Learning (Expected 2028), Sanjivani College of Engineering",
    skillsSummary: "Python, JavaScript, Node.js, Express.js, REST APIs, YOLO, OpenCV, UI/UX Research, Figma",
    isCustomUploaded: true
  },
  sections: {
    hero: true,
    about: true,
    skills: true,
    projects: true,
    uiux: true,
    experience: true,
    resume: true,
    contact: true
  }
};
