/**
 * @file shared/config/site-data.ts
 * Canonical portfolio content — projects, experience, skills, and links.
 */

/** A portfolio project entry. */
export interface Project {
  id: string
  name: string
  description: string
  liveUrl: string
  githubUrl: string
  /** Placeholder gradient id or path to a real screenshot. */
  imageSlot: string
  tags: readonly string[]
  featured: boolean
}

/** A work experience entry. */
export interface Experience {
  id: string
  company: string
  position: string
  dates: string
  location: string
  workType: string
  /** Always-visible bullets. Keep to about six. */
  highlights: readonly string[]
  /** Extra detail, hidden behind a "Show more" toggle. */
  moreHighlights?: readonly string[]
  /** Key technologies, shown as chips under the bullets. */
  stack?: readonly string[]
}

/** Icon keys available to skill groups and services. */
export type SkillIcon = "server" | "cloud" | "brain" | "layers" | "database" | "workflow"

/** A group of related technologies, rendered as chips. */
export interface SkillCategory {
  id: string
  title: string
  icon: SkillIcon
  /** Short technology labels — one chip each. */
  items: readonly string[]
}

/** A high-level area of work shown in the "What I do" section. */
export interface Service {
  id: string
  title: string
  icon: SkillIcon
  /** One or two sentences describing the work. */
  description: string
  /** Up to three headline technologies. */
  tags: readonly string[]
}

/** A headline number shown in the hero stats row. */
export interface Stat {
  value: string
  label: string
}

/** An in-page navigation anchor on the home view. */
export interface NavItem {
  /** Section element id on the home view (without `#`). */
  id: string
  label: string
}

/** An education entry. */
export interface Education {
  id: string
  institution: string
  degree: string
  dates: string
  location: string
  details?: readonly string[]
}

/** A social or navigation link. */
export interface SiteLink {
  id: string
  label: string
  href: string
  external: boolean
}

/** Profile information for the portfolio owner. */
export interface Profile {
  name: string
  role: string
  location: string
  email: string
  phone: string
  /** Full summary, mirrors the CV. */
  bio: string
  /** Two-sentence hero version of the bio. */
  tagline: string
  /** Short availability line shown next to the status dot. */
  availability: string
  /** Current employer and focus areas, shown on the hero photo card. */
  currently: { company: string; focus: string }
  /** Spoken languages with level. */
  spokenLanguages: readonly string[]
  resumeSlot: string
}

export const PROFILE: Profile = {
  name: "Ahmed Elbialy",
  role: "Full-Stack Engineer · Backend-Focused",
  location: "Al Haram, Giza, Egypt",
  email: "ahmedelbialy148@gmail.com",
  phone: "+201150375211",
  bio: "Backend-focused full-stack engineer with 2+ years of experience building scalable web applications, APIs, system integrations, and data pipelines using Next.js, FastAPI, PostgreSQL, AWS, and GCP. I specialize in AI agent engineering — LangGraph and LangChain systems with tool integrations, execution control, and multi-step orchestration — plus business-system integrations, Google Apps Script automation, and secure cloud services.",
  tagline:
    "I design the backend of full-stack products — APIs, data models, integrations and cloud infrastructure — with Next.js, FastAPI, PostgreSQL, AWS and GCP. I also build the LangGraph agents and RAG pipelines that run on them.",
  availability: "Open to full-time roles & freelance",
  currently: { company: "MIS", focus: "Full-stack systems · AI agents" },
  spokenLanguages: ["Arabic (native)", "English (B2)", "German (A1)"],
  resumeSlot: "/Ahmed_Adel_CV.pdf",
}

/** Hero stats — keep every number verifiable from the CV. */
export const STATS: readonly Stat[] = [
  { value: "2+", label: "Years experience" },
  { value: "6", label: "Roles & internships" },
  { value: "2", label: "Clouds — AWS & GCP" },
  { value: "11", label: "Public projects" },
] as const

/** In-page sections linked from the header. */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const

export const SERVICES: readonly Service[] = [
  {
    id: "backend",
    title: "Backend & APIs",
    icon: "server",
    description:
      "Scalable REST and GraphQL APIs and event-driven services in Node.js and Python, built for clean contracts and production load.",
    tags: ["NestJS", "FastAPI", "Celery"],
  },
  {
    id: "ai",
    title: "AI Agent Engineering",
    icon: "brain",
    description:
      "LangGraph agents, hybrid RAG and streaming chat with tool integrations, context management and source-cited answers.",
    tags: ["LangGraph", "pgvector", "RAG"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "cloud",
    description:
      "Containerised deployments on AWS and GCP with CI/CD, secret management, load balancing and secure networking.",
    tags: ["AWS", "GCP", "Docker"],
  },
  {
    id: "fullstack",
    title: "Full-Stack & Integrations",
    icon: "layers",
    description:
      "Next.js front ends wired end-to-end to the backend, plus business-system integrations and Apps Script automation.",
    tags: ["Next.js", "React", "TypeScript"],
  },
] as const

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: "backend",
    title: "Backend & APIs",
    icon: "server",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "Fastify",
      "Python",
      "FastAPI",
      "Celery",
      "Spring Boot",
      "REST",
      "GraphQL",
      "System design",
      "SOLID / OOP",
    ],
  },
  {
    id: "ai",
    title: "AI & Agents",
    icon: "brain",
    items: [
      "LangChain",
      "LangGraph",
      "LLM agents",
      "Hybrid RAG",
      "Reciprocal rank fusion",
      "Tool orchestration",
      "Prompt engineering",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "cloud",
    items: [
      "AWS ECS / ECR",
      "RDS",
      "S3",
      "Lambda",
      "Cognito",
      "GCP Cloud Run",
      "Cloud SQL",
      "Memorystore",
      "Cloud Armor",
      "Docker",
      "Kubernetes",
      "Nginx",
      "CI/CD",
      "Git",
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Mobile",
    icon: "layers",
    items: ["React", "Next.js", "TypeScript", "React Native (Expo)", "JavaScript", "HTML / CSS"],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "database",
    items: ["PostgreSQL", "pgvector", "Supabase", "MongoDB", "DynamoDB", "Redis"],
  },
  {
    id: "automation",
    title: "Data & Automation",
    icon: "workflow",
    items: [
      "Apps Script",
      "clasp",
      "Google Sheets",
      "Pandas",
      "XLWings",
      "Selenium",
      "Playwright",
      "Document AI",
    ],
  },
] as const

export const EXPERIENCES: readonly Experience[] = [
  {
    id: "mis",
    company: "Modern Intelligence Solutions (MIS)",
    position: "Full-Stack Software Engineer (Backend-Focused)",
    dates: "July 2025 – Present",
    location: "Al Shorouk City, Cairo",
    workType: "On-Site",
    highlights: [
      "Lead backend and system design for Next.js full-stack products — API architecture, PostgreSQL and Supabase data models with RBAC, and performance tuning.",
      "Build event-driven Python services with FastAPI and Celery, and integrate third-party platforms (Paychex, AxisCare, Relias) through reliable auth layers and data-sync pipelines.",
      "Implemented Firebase authentication with TOTP/SMS multi-factor auth, PostgreSQL-backed sessions, token revocation and account lockout.",
      "Engineer LangGraph and LangChain agents and a multi-layer agentic RAG system (pgvector, full-text search, reciprocal rank fusion) with source-cited answers, streamed to a Next.js chat over SSE.",
      "Built Python document-ingestion pipelines for PDF, DOCX, screenplay and budget files — Document AI OCR fallback, Voyage AI embeddings, semantic chunking and resumable jobs.",
      "Run production infrastructure on AWS (ECS, ECR, RDS, load balancing, SSL/TLS) and a GCP staging environment (Cloud Run, Cloud SQL, Memorystore, Secret Manager, Cloud Armor).",
    ],
    moreHighlights: [
      "Agents use tool integrations (e.g. Tavily web search), interrupts and node-based orchestration loops for multi-step decision-making and task automation.",
      "LangGraph conversation-context handling with token-aware history summarization, prompt caching and retry logic for long sessions and unreliable LLM APIs.",
      "Python automation with Selenium, Playwright, Pandas and XLWings to extract and transform large datasets, reducing manual operational work.",
      "Google Apps Script solutions that populate Google Sheets and send emails programmatically, developed locally with clasp and Git.",
      "A cross-platform PyQt desktop application with structured UI architecture, local data persistence and workflow automation.",
      "AI-assisted development in Cursor to speed up development and debugging and raise code quality.",
    ],
    stack: [
      "Next.js",
      "FastAPI",
      "Celery",
      "PostgreSQL",
      "Supabase",
      "Firebase",
      "LangGraph",
      "pgvector",
      "AWS",
      "GCP",
    ],
  },
  {
    id: "anyware",
    company: "Anyware Software",
    position: "Cloud Full-Stack Software Engineer",
    dates: "Aug 2024 – June 2025",
    location: "Maadi, Cairo",
    workType: "On-Site",
    highlights: [
      "Built and deployed cloud-native, serverless applications using AWS Amplify, Lambda, Cognito, S3, DynamoDB, and GraphQL APIs.",
      "Designed and developed responsive web and mobile apps with React and React Native (Expo) for consistent cross-platform experiences.",
      "Delivered scalable frontend-backend integrations in production with optimized performance and maintainability.",
    ],
  },
  {
    id: "digital-car",
    company: "Digital Car",
    position: "Backend Node.js Developer",
    dates: "Aug 2024 – Oct 2025",
    location: "Cairo",
    workType: "Remote · Part-Time",
    highlights: [
      "Developed and maintained scalable NestJS + MongoDB backend services, optimizing database schemas and performance under production workloads.",
      "Integrated Stripe, Twilio, SendGrid, and AWS S3 for financial and transactional workflows.",
      "Delivered production-ready systems in a Scrum-based team.",
    ],
  },
  {
    id: "vultara",
    company: "Vultara, Inc.",
    position: "Software Engineer",
    dates: "May 2024 – July 2024",
    location: "Troy, Michigan, USA",
    workType: "Remote · Freelance",
    highlights: [
      "Contributed to large-scale MEAN stack apps — Angular frontend and Node.js/Express backend.",
      "Improved performance and scalability while resolving complex full-stack issues in production.",
      "Collaborated with distributed teams to deliver stable, maintainable, high-quality software.",
    ],
  },
  {
    id: "freelance",
    company: "Freelancing",
    position: "Backend Engineer",
    dates: "Sep 2023 – May 2024",
    location: "Remote",
    workType: "Remote",
    highlights: [
      "Developed full-stack applications, including social platforms, with GraphQL APIs and React.js, focusing on scalable backend architecture.",
      "Applied best practices in version control, CI workflows, and collaborative development with Git and GitHub.",
    ],
  },
  {
    id: "valleysoft",
    company: "ValleySoft",
    position: "Integration Engineer Intern",
    dates: "June 2024 – July 2024",
    location: "Heliopolis, Cairo",
    workType: "On-Site",
    highlights: [
      "Built integration solutions with IBM Cloud Pak tools (App Connect, MQ Explorer) connecting distributed enterprise systems.",
      "Designed and implemented message transformation pipelines and middleware logic for system interoperability.",
      "Developed SOAP and REST APIs handling XML and JSON for enterprise-level integrations.",
    ],
  },
] as const

export const EDUCATION: readonly Education[] = [
  {
    id: "cairo-university",
    institution: "Cairo University",
    degree: "Bachelor of Electrical Power Engineering (GPA: Very Good)",
    dates: "Sep 2018 – May 2023",
    location: "Giza",
  },
  {
    id: "nti",
    institution: "National Telecommunication Institute (NTI)",
    degree: "SOA and Microservices Internship",
    dates: "Feb 2024 – June 2024",
    location: "Nasr City, Cairo",
    details: [
      "Hands-on SOA, microservices, and BPM with Java, Spring Boot, IBM BAW, and IBM integration tools (App Connect, MQ Explorer, API Connect).",
      "Exposure to DevOps (Docker, Kubernetes, Jenkins, Terraform, Ansible) and RPA with IBM tools.",
    ],
  },
] as const

export const PROJECTS: readonly Project[] = [
  {
    id: "facar",
    name: "Facar",
    description: "A social network website made with React.js and GraphQL API.",
    liveUrl: "https://facar-adel.netlify.app/",
    githubUrl: "https://github.com/AhmedElbialy148/Facar_v2",
    imageSlot: "gradient-1",
    tags: ["React", "GraphQL"],
    featured: true,
  },
  {
    id: "shopify",
    name: "Shopify",
    description:
      "An ecommerce online shop built as a server-side rendering server using RESTful API and EJS templates.",
    liveUrl: "https://shopify-cnnv.onrender.com",
    githubUrl: "https://github.com/AhmedElbialy148/Shopify",
    imageSlot: "gradient-2",
    tags: ["Node.js", "SSR", "EJS"],
    featured: true,
  },
  {
    id: "todo",
    name: "To-Do App",
    description:
      "A fullstack website for creating, reading, editing and deleting user todos, built with HTML5, CSS3 and REST API.",
    liveUrl: "https://todo-list-adel.netlify.app/app",
    githubUrl: "https://github.com/AhmedElbialy148/Todo-List-App",
    imageSlot: "gradient-3",
    tags: ["REST API", "Fullstack"],
    featured: true,
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Personal portfolio built with React.js and Vite.",
    liveUrl: "https://portfolio-two-puce-19.vercel.app",
    githubUrl: "https://github.com/AhmedElbialy148/Portfolio",
    imageSlot: "gradient-4",
    tags: ["React", "Vite"],
    featured: false,
  },
  {
    id: "forkify",
    name: "Forkify App",
    description:
      "A frontend website for searching food recipes, built with HTML5, CSS3 and Firebase database.",
    liveUrl: "https://forkify-adel159.netlify.app",
    githubUrl: "https://github.com/AhmedElbialy148/Forkify",
    imageSlot: "gradient-5",
    tags: ["Firebase", "Frontend"],
    featured: false,
  },
  {
    id: "mapty",
    name: "Mapty App",
    description:
      "A frontend website for pinning marks for walking and running activities on a map.",
    liveUrl: "https://mapty-adel.netlify.app",
    githubUrl: "https://github.com/AhmedElbialy148/Mapty",
    imageSlot: "gradient-6",
    tags: ["Maps", "Frontend"],
    featured: false,
  },
  {
    id: "bankist-app",
    name: "Bankist App",
    description:
      "A frontend website for bank financial transactions, built with HTML5 and CSS3.",
    liveUrl: "https://bankist2-adel.netlify.app",
    githubUrl: "https://github.com/AhmedElbialy148/Bankist-2",
    imageSlot: "gradient-7",
    tags: ["JavaScript", "UI"],
    featured: false,
  },
  {
    id: "calculator",
    name: "Calculator",
    description:
      "A simple online calculator with keyboard support, built with HTML5 and CSS3.",
    liveUrl: "https://calculator-adel.netlify.app",
    githubUrl: "https://github.com/AhmedElbialy148/Calculator",
    imageSlot: "gradient-8",
    tags: ["JavaScript"],
    featured: false,
  },
  {
    id: "bankist-landing",
    name: "Bankist Landing Page",
    description: "A frontend landing page for a bank, built with HTML5 and CSS3.",
    liveUrl: "https://bankist1-adel.netlify.app",
    githubUrl: "https://github.com/AhmedElbialy148/Bankist-1",
    imageSlot: "gradient-1",
    tags: ["CSS", "Landing"],
    featured: false,
  },
  {
    id: "appie",
    name: "Appie",
    description:
      "A frontend landing page for a mobile application, built with HTML5 and CSS3.",
    liveUrl: "https://appie-adel.netlify.app",
    githubUrl: "https://github.com/AhmedElbialy148/APPIE.",
    imageSlot: "gradient-2",
    tags: ["Landing", "CSS"],
    featured: false,
  },
  {
    id: "omnifood",
    name: "Omnifood",
    description:
      "A frontend landing page for a food restaurant, built with HTML5 and CSS3.",
    liveUrl: "https://omnifood-adel.netlify.app",
    githubUrl: "https://github.com/AhmedElbialy148/Omnifood",
    imageSlot: "gradient-3",
    tags: ["Landing", "CSS"],
    featured: false,
  },
] as const

export const SITE_LINKS: readonly SiteLink[] = [
  { id: "codes", label: "Projects", href: "/codes", external: false },
  { id: "email", label: "Email", href: "mailto:ahmedelbialy148@gmail.com", external: true },
  { id: "github", label: "GitHub", href: "https://github.com/AhmedElbialy148", external: true },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-adel",
    external: true,
  },
] as const

/** Returns featured projects for the home page. */
export function getFeaturedProjects(): readonly Project[] {
  return PROJECTS.filter((p) => p.featured)
}
