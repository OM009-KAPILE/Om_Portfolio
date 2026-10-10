# Om Kapile — Personal Portfolio Website

A modern, professional personal portfolio website for **Om Kapile**, Computer Science Engineering student interested in **Software Development**, **AI/ML**, **Full-Stack Development**, and **UI/UX Design**.

Built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. Features a built-in **interactive visual content editor**, **dark/light theme toggle**, **in-app printable resume viewer**, and **browser persistence with JSON backup/restore**.

---

## ✨ Features & Architecture

### 1. Visual Design & Theme
- **Dark Theme by Default**: Sleek dark navy, deep blacks, crisp whites, and glowing teal accents (`#14b8a6`, `#2dd4bf`).
- **Light Theme Toggle**: 1-click toggle between dark and light themes with smooth transitions.
- **Modern Typography**: Inter and Plus Jakarta Sans with clear hierarchy.
- **Micro-Animations & Cards**: Glassmorphism backdrops, subtle hover glows, and rounded cards.
- **Fully Responsive**: Optimized for mobile phones, tablets, and wide desktop displays.

### 2. Website Navigation
- **Sticky Navbar** with brand monogram (`OK - Om Kapile`), active section spy, and mobile drawer.
- **Navigation Links**: Home, About, Skills, Projects, UI/UX Design, Resume, Contact.
- **Instant Controls**: Theme switch button and dedicated **"Edit Portfolio"** dashboard button.

### 3. Home / Hero Section
- **Title**: Om Kapile — Computer Science Engineering Student | Software Developer | AI/ML Enthusiast | UI/UX Designer.
- **Headline**: *"Building Intelligent Solutions. Designing Better Experiences."*
- **Action Buttons**: Quick jump to "Explore My Work" and "Contact Me".
- **Profile Image & Avatar**: Tech-forward developer monogram avatar with instant image upload / custom URL input.
- **Status Indicator**: "Available for Projects & Internships".

### 4. About Me
- Narrative overview covering academics, hackathons, and product focus.
- 4 Editable Highlight Cards:
  - **Education**: B.E. in Computer Science Engineering (Undergraduate).
  - **Technical Interests**: Software Engineering, AI/ML, Computer Vision, Full-Stack Web Development, UI/UX Design.
  - **Current Focus**: Architecting scalable web applications, experimenting with computer vision models, and building clean design systems.
  - **Career Goals**: Contributing to engineering teams building user-centric digital products.

### 5. Technical Skills
- Categorized badges with icons:
  - **Programming**: Python, Java, JavaScript, SQL
  - **Web Development**: HTML, CSS, JavaScript, Node.js, Express.js, REST APIs
  - **AI and Computer Vision**: Machine Learning, Computer Vision, YOLO, OpenCV, NumPy, AI Integration
  - **Databases and Tools**: MySQL, PostgreSQL, Git, GitHub, VS Code, Figma, n8n
- **No fake percentage bars or proficiency meters**.
- Category filtering and easy addition/removal via the editor.

### 6. Software Development Projects
Includes the 5 starter projects accurately tagged with status:
1. **ProjectX**: AI-Powered Student Collaboration Platform (*In Progress*)
2. **Gun Detection System**: Real-Time Threat Monitoring Using Computer Vision (*In Progress*)
3. **SkillPassport**: Verifiable Digital Skill Profile (*In Progress*)
4. **QueueSense**: Smart Appointment and Waiting-Time Tracker (*Concept*)
5. **Sarathi**: Digital Mental Wellness Support System (*Concept*)

Each project features:
- Status badge (*Concept*, *In Progress*, or *Completed*)
- Feature bullet points
- Technology stack tags
- **"View Details" Modal**: Complete architecture breakdown, key features, and live links.
- **GitHub & Live Demo** triggers.

### 7. UI/UX Design Portfolio
Visually distinct from software projects, showcasing dedicated product design case studies with mobile blueprints:
1. **SkillPassport Mobile App**: Verifiable Skill Showcase & Digital Portfolio for Students
2. **QueueSense Appointment App**: Calm, Transparent Waiting-Time & Queue Management
3. **AI Mental Wellness App — Sarathi**: Empathetic, Calm Digital Support & Mood Companion

Each case study supports:
- Design Challenge & Focus Areas
- Screen Flow Architectures
- **Case Study Modal** with tabs for:
  - *Overview & Problem Statement*
  - *Research, Target Users & User Flows*
  - *Wireframes, Final UI Screens & Design System*
  - *Lessons Learned & Figma Prototype Link*
- Individual **section visibility toggles** so uncompleted sections can be hidden cleanly.

### 8. Resume Section & Printable Viewer
- **Download Resume** button.
- **View Resume** button: Opens an in-app, print-ready document viewer displaying academic status, skills, and projects with a 1-click `Print / Save as PDF` trigger.
- Option to upload a custom PDF file or link to Google Drive/Dropbox.

### 9. Contact Section
- Displays verified contact information (Name, Role, Location: India).
- Clickable `mailto:` email, LinkedIn, and GitHub links.
- Interactive contact form with transparent client-side dispatch and pre-formatted mail client integration.

### 10. Editable Portfolio Admin / Editor
Click the **"Edit Portfolio"** button in the navbar or bottom-left floating pill to access the live dashboard:
- 👤 **Personal & Hero**: Name, role, headlines, bio, location, profile image upload.
- ℹ️ **About & Highlights**: Modify paragraphs and highlight cards.
- 🛠️ **Technical Skills**: Add/remove skills inside each category.
- 💻 **Software Projects**: Add new projects, edit text/technologies/status/images, reorder, or delete.
- 🎨 **UI/UX Case Studies**: Add case studies, edit research/flows/mockups, and toggle section visibilities.
- 📄 **Resume Settings**: Upload new PDF resume or enter document URL.
- 👁️ **Section Visibility**: Show or hide any section from the public site.
- 💾 **Backup & Persistence**:
  - **Save Changes**: Persists immediately to browser `localStorage`.
  - **Export JSON Backup**: Downloads `om-kapile-portfolio-data.json`.
  - **Import JSON Backup**: Restores your settings on any device.
  - **Reset to Template**: Restores factory defaults anytime.

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```
The compiled, production-ready static files will be generated in the `dist/` directory.

---

## 🌐 Deploying to the Web (Free & Easy)

### Option A: Vercel (Recommended)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Om Kapile Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/om-portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **Add New Project**, select `om-portfolio`.
4. Framework preset will automatically detect **Vite**. Click **Deploy**!

### Option B: Netlify
1. Drag and drop the `dist` folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect your GitHub repository for automatic builds with build command `npm run build` and publish directory `dist`.

---

## 🔒 Persistence & Security Notice
- Edits made through the in-app editor are saved to your browser's `localStorage`.
- `localStorage` is local to your current browser and machine.
- To transfer your changes to another computer or deploy them permanently, use the **Export JSON Backup** button in the editor. You can also edit `src/data/defaultData.ts` directly for permanent code-level defaults.
