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
  location: "Giza, Egypt",
  email: "ahmedelbialy148@gmail.com",
  phone: "+201150375211",
  bio: "Backend-focused full-stack engineer specializing in scalable systems, APIs, and data pipelines with Next.js, FastAPI, PostgreSQL, and AWS. I build production-grade AI agent systems with LangGraph and LangChain — tool integrations, execution control, and multi-step orchestration for intelligent automation.",
  resumeSlot: "/Ahmed_Adel_CV.pdf",
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: "backend",
    title: "Backend & APIs",
    icon: "server",
    lottieSrc: "/assets/lotties/stackslottie.json",
    items: [
      "Node.js — Express, NestJS, Fastify",
      "Python — FastAPI, Celery, event-driven services",
      "Spring Boot, REST, GraphQL, SSR",
      "System design, distributed systems, SOLID principles",
    ],
  },
  {
    id: "ai",
    title: "AI & Agent Engineering",
    icon: "brain",
    lottieSrc: "/assets/lotties/ai-lottie.json",
    items: [
      "LangChain & LangGraph agent systems",
      "Tool integration, interrupts, node-based orchestration",
      "Multi-step pipelines with dynamic decision-making",
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
      "Docker, Docker Compose, Kubernetes, Nginx, CI/CD",
      "PostgreSQL, Supabase, MongoDB, DynamoDB",
      "Secure networking, load balancing, SSL/TLS",
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Mobile",
    icon: "layers",
    lottieSrc: "/assets/lotties/frontend-lottie.json",
    items: [
      "React.js, Next.js, TypeScript",
      "React Native (Expo) for cross-platform apps",
      "HTML5, CSS3, JavaScript",
      "Responsive, performance-optimized UIs",
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
      "Architected scalable full-stack apps with Next.js, focusing on backend system design and API architecture.",
      "Built AI agents with LangGraph and LangChain — Tavily search tools, interrupts, and node-based orchestration.",
      "Deployed production AI infrastructure on AWS (ECS, ECR, RDS PostgreSQL) with SSL/TLS and load balancing.",
      "Integrated third-party platforms (Paychex, AxisCare, Relias) with secure auth and data sync pipelines.",
      "Developed FastAPI + Celery async services and Python automation (Selenium, Playwright, Pandas).",
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
      "Built serverless apps on AWS Amplify, Lambda, Cognito, S3, DynamoDB, and GraphQL APIs.",
      "Developed responsive web and mobile apps with React and React Native (Expo).",
      "Delivered scalable frontend-backend integrations in production environments.",
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
      "Maintained scalable NestJS + MongoDB backend services under production workloads.",
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
      "Improved performance and scalability while resolving complex production issues.",
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
      "Built full-stack social platforms with GraphQL APIs and React.js.",
      "Implemented CI workflows and collaborative development with Git and GitHub.",
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
      "Built integrations with IBM Cloud Pack (App Connect, MQ Explorer).",
      "Developed SOAP and REST APIs handling XML and JSON for enterprise systems.",
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
      "Hands-on SOA, microservices, and BPM with Java, Spring Boot, IBM BAW, and IBM integration tools.",
      "DevOps exposure: Docker, Kubernetes, Jenkins, Terraform, Ansible.",
    ],
  },
] as const

export const PROJECTS: readonly Project[] = [
  {
    id: "facar",
    name: "Facar",
    description: "A social network website made with React.js and GraphQL API.",
    liveUrl: "https://facar-adel.netlify.app/",
    githubUrl: "https://github.com/AhmedElbailey/Facar_v2",
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
    githubUrl: "https://github.com/AhmedElbailey/Shopify",
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
    githubUrl: "https://github.com/AhmedElbailey/Todo-List-App",
    imageSlot: "gradient-3",
    tags: ["REST API", "Fullstack"],
    featured: true,
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Personal portfolio built with React.js and Vite.",
    liveUrl: "https://portfolio-adel.netlify.app",
    githubUrl: "https://github.com/AhmedElbailey/Portfolio",
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
    githubUrl: "https://github.com/AhmedElbailey/Forkify",
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
    githubUrl: "https://github.com/AhmedElbailey/Mapty",
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
    githubUrl: "https://github.com/AhmedElbailey/Bankist-2",
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
    githubUrl: "https://github.com/AhmedElbailey/Calculator",
    imageSlot: "gradient-8",
    tags: ["JavaScript"],
    featured: false,
  },
  {
    id: "bankist-landing",
    name: "Bankist Landing Page",
    description: "A frontend landing page for a bank, built with HTML5 and CSS3.",
    liveUrl: "https://bankist1-adel.netlify.app",
    githubUrl: "https://github.com/AhmedElbailey/Bankist-1",
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
    githubUrl: "https://github.com/AhmedElbailey/APPIE.",
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
    githubUrl: "https://github.com/AhmedElbailey/Omnifood",
    imageSlot: "gradient-3",
    tags: ["Landing", "CSS"],
    featured: false,
  },
] as const

export const SITE_LINKS: readonly SiteLink[] = [
  { id: "codes", label: "Projects", href: "/codes", external: false },
  { id: "email", label: "Email", href: "mailto:ahmedelbialy148@gmail.com", external: true },
  { id: "github", label: "GitHub", href: "https://github.com/AhmedElbailey", external: true },
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
