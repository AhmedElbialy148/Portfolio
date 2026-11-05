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
  highlights: readonly string[]
}

/** A skill category with bullet points. */
export interface SkillCategory {
  id: string
  title: string
  icon: string
  items: readonly string[]
  /** Optional Lottie animation URL for this category. */
  lottieSrc?: string
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
  bio: string
  resumeSlot: string
}

export const PROFILE: Profile = {
  name: "Ahmed Elbialy",
  role: "Full-Stack Engineer · Backend-Focused",
  location: "Al Haram, Giza, Egypt",
  email: "ahmedelbialy148@gmail.com",
  phone: "+201150375211",
  bio: "Backend-focused full-stack engineer with 2+ years of experience building scalable web applications, APIs, system integrations, and data pipelines using Next.js, FastAPI, PostgreSQL, AWS, and GCP. I specialize in AI agent engineering — LangGraph and LangChain systems with tool integrations, execution control, and multi-step orchestration — plus business-system integrations, Google Apps Script automation, and secure cloud services.",
  resumeSlot: "/Ahmed_Adel_CV.pdf",
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: "backend",
    title: "Backend & APIs",
    icon: "server",
    lottieSrc: "/assets/lotties/frontend-lottie.json",
    items: [
      "Node.js — Express, NestJS, Fastify",
      "Python — FastAPI, Celery, event-driven services",
      "Spring Boot, REST, GraphQL, SSR",
      "System design, distributed systems, OOP, SOLID principles",
    ],
  },
  {
    id: "ai",
    title: "AI & Agent Engineering",
    icon: "brain",
    lottieSrc: "/assets/lotties/ai-lottie.json",
    items: [
      "LangChain, LangGraph, and LLM agents",
      "Hybrid RAG — pgvector, full-text search, reciprocal rank fusion",
      "Tool integration and agent orchestration",
      "Prompt engineering for production automation",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "cloud",
    lottieSrc: "/assets/lotties/cloudlottie.json",
    items: [
      "AWS — ECS, ECR, RDS, S3, Lambda, Cognito, Amplify",
      "GCP — Cloud Run, Cloud SQL, GCS, Memorystore, Secret Manager, Cloud Armor",
      "Docker, Docker Compose, Kubernetes, Nginx",
      "CI/CD, secure networking, load balancing, SSL/TLS",
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Mobile",
    icon: "layers",
    lottieSrc: "/assets/lotties/stackslottie.json",
    items: [
      "React.js, Next.js, TypeScript",
      "React Native (Expo) for cross-platform apps",
      "HTML5, CSS3, JavaScript",
      "Responsive, performance-optimized UIs",
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "database",
    items: [
      "PostgreSQL and pgvector",
      "Supabase — data modeling and RBAC",
      "MongoDB, DynamoDB",
      "Redis",
    ],
  },
  {
    id: "automation",
    title: "Data & Automation",
    icon: "workflow",
    items: [
      "Google Apps Script, clasp, Google Sheets",
      "Pandas, XLWings",
      "Selenium, Playwright",
      "Google Document AI, data pipelines",
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    icon: "wrench",
    items: [
      "Cursor (AI IDE), VS Code, IntelliJ",
      "Postman",
      "Git, GitHub",
    ],
  },
  {
    id: "languages",
    title: "Languages",
    icon: "languages",
    items: [
      "Arabic — Native",
      "English — B2 (Upper Intermediate)",
      "German — A1 (Beginner, currently learning)",
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
      "Architected scalable full-stack applications with Next.js, focusing on backend system design, API architecture, and performance optimization.",
      "Built AI agents with LangGraph and LangChain — tool-integrated systems (e.g., Tavily web search) with controlled execution flows, interrupts, and node-based orchestration loops.",
      "Engineered multi-step agent pipelines capable of dynamic decision-making and task automation across complex workflows.",
      "Engineered a multi-layer agentic RAG system using PostgreSQL/pgvector, full-text search, and reciprocal rank fusion, producing source-cited answers grounded in project documents and reference materials.",
      "Built Python document-ingestion workflows for PDF, DOCX, screenplay, and budget formats, with Google Document AI OCR fallback, Voyage AI embeddings, semantic chunking, and resumable PostgreSQL jobs.",
      "Implemented LangGraph conversation-context handling with token-aware history summarization, prompt caching, and retry logic for long user sessions and unreliable LLM API responses.",
      "Built a Next.js server-sent events (SSE) chat that streams LangGraph agent responses to the browser, persists messages, and surfaces inline citations for source verification.",
      "Deployed production cloud infrastructure for AI agent systems on AWS — containerized services on ECS and ECR, load balancing, SSL/TLS, and RDS PostgreSQL.",
      "Developed services on a GCP staging environment using Cloud Run v2, Cloud SQL (PostgreSQL/pgvector), Memorystore Redis, GCS, Secret Manager, and Cloud Armor-protected HTTPS.",
      "Designed and managed PostgreSQL databases on Supabase with robust data models, secure RBAC, and high-performance API endpoints.",
      "Implemented Firebase authentication for a Next.js app, including TOTP/SMS multi-factor authentication, PostgreSQL-backed sessions, token-revocation checks, and account lockout.",
      "Integrated third-party platforms (Paychex, AxisCare, Relias) with reliable authentication layers and data synchronization pipelines.",
      "Built asynchronous, event-driven backend services with FastAPI and Celery for background jobs and data pipelines.",
      "Developed Python automation (Selenium, Playwright, Pandas, XLWings) to extract, process, and transform large datasets, reducing manual operational overhead.",
      "Designed and built a cross-platform PyQt desktop application with structured UI architecture, local data persistence, and workflow automation.",
      "Developed Google Apps Script solutions that populate Google Sheets and send emails programmatically, using clasp and Git for local development.",
      "Used AI-driven development workflows in Cursor IDE to speed up development and debugging and to raise code quality.",
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
