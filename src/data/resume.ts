export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface WorkEntry {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface ProjectEntry {
  name: string;
  description: string;
  bullets: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  details?: string[];
}

export const contact: ContactInfo = {
  email: "vasiroum@gmail.com",
  phone: "+30 694-762-7878",
  linkedin: "linkedin.com/in/vasilis-roumeliotis",
  github: "github.com/vasiroum",
  location: "Athens, Greece",
};

export const summary =
  "Results-driven AI Software Engineer with 4+ years architecting and shipping AI-powered products, multi-agent systems, and full-stack applications. Pioneered compound engineering workflows with 15+ specialized AI agents. Ships production systems across web (Next.js/React/Supabase), mobile (SwiftUI), and enterprise (OutSystems/Workato). Proven track record delivering for Fortune 500 pharmaceutical, major European logistics, and industrial HVAC enterprises.";

export const techSkills = {
  "AI & Agent Systems": [
    "Claude Agent SDK",
    "MCP Servers",
    "Multi-Agent Orchestration",
    "Prompt Engineering",
    "SSE Streaming",
  ],
  "Web Development": [
    "Next.js 16 (App Router)",
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "shadcn/ui",
    "Bun",
  ],
  "Cloud & DevOps": [
    "AWS (ECS/Fargate, RDS, ECR, CloudWatch, IAM)",
    "Docker",
    "Vercel",
    "CI/CD",
  ],
  "Backend & Databases": [
    "FastAPI",
    "Supabase (Postgres, Auth, RLS, Edge Functions)",
    "PostgreSQL",
  ],
  Mobile: [
    "SwiftUI",
    "SwiftData",
    "WatchConnectivity",
    "AVAudioSession",
    "SFSpeechRecognizer",
  ],
  "SDK & Smart Contracts": ["Ruby (SDK Development)", "Solidity", "Python", "Brownie"],
  "Low-Code Platforms": ["OutSystems 11 & ODC", "Workato", "Oracle Apex"],
};

export const workExperience: Record<string, WorkEntry[]> = {
  ai: [
    {
      company: "Business Automatica GmbH",
      role: "AI Software Engineer",
      period: "01/2022 – Present",
      bullets: [
        "Architected a 9-agent business validation platform using Claude Agent SDK + FastAPI, orchestrating parallel research across market, competitor, financial, and risk domains",
        "Built an adaptive pricing/rules engine with 734+ automated tests and prompt caching achieving 90% cost reduction",
        "Developed an autonomous idea-to-production pipeline from concept through validation, specification, and build with minimal human intervention",
        "Built MCP servers in TypeScript, Python, and Bash for AI tool integration and legacy system migration",
      ],
    },
  ],
  enterprise: [
    {
      company: "Business Automatica GmbH",
      role: "AI Software Engineer",
      period: "01/2022 – Present",
      bullets: [
        "Built an offline-first PWA maintenance report system for an industrial HVAC company — 5 document types, tablet-first, IndexedDB sync",
        "Built pdf2zugferd, an e-invoicing platform converting PDFs to ZUGFeRD/XRechnung v3 compliant electronic invoices — PDF/A-3 embedding, bilingual DE/EN, Zod validation",
        "Architected, developed and deployed a production-grade AI-powered CRM",
      ],
    },
  ],
  logistics: [
    {
      company: "Business Automatica GmbH",
      role: "AI Software Engineer",
      period: "01/2022 – Present",
      bullets: [
        "Optimized a major European rail logistics company's track & trace system, reducing page load from 30-60s to sub-second via SQL query optimization",
      ],
    },
  ],
  pharma: [
    {
      company: "Business Automatica GmbH",
      role: "AI Software Engineer",
      period: "01/2022 – Present",
      bullets: [
        "Designed and shipped a tariff career progression system for a Fortune 500 pharmaceutical company — 13 pay grades, 4 regions, 21-state workflow, 416+ automated tests",
      ],
    },
  ],
};

export const devTooling = [
  "Created 15+ AI development skills, hooks, and agents establishing a compound engineering workflow (plan/work/review/compound) used across all company projects",
  "Built a Slack-Claude bridge for bidirectional team AI interaction via Socket Mode with session discovery and management",
  "Deployed production systems on AWS ECS/Fargate, Vercel, and Supabase with Docker containerization and CI/CD pipelines",
];

export const sideProjects: ProjectEntry[] = [
  {
    name: "ParkSpot",
    description: "Peer-to-Peer Parking Marketplace",
    bullets: [
      "Full-stack marketplace with Next.js web app + SwiftUI iOS app",
      "Stripe payments, Leaflet maps, and Supabase Auth with RLS",
    ],
  },
  {
    name: "Arc",
    description: "iOS/watchOS Workout Timer",
    bullets: [
      "Offline-first timer with voice commands (SFSpeechRecognizer)",
      "Background audio, WatchConnectivity sync, and crash recovery",
    ],
  },
  {
    name: "Athens Boxing Club",
    description: "Marketing Site",
    bullets: [
      "Next.js 16 site with programmatic SEO (12 playbook types)",
      "Bilingual EN/EL, Supabase backend",
    ],
  },
  {
    name: "Deep Research Platform",
    description: "AI Research Assistant",
    bullets: [
      "Recursive SERP analysis with Firecrawl, SSE streaming",
      "Session management and multi-mode business analysis",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    institution: "Democritus University of Thrace",
    degree: "Electrical & Computer Engineering",
    period: "09/2012 – 10/2021",
    details: [
      "Thesis: Charged Particles' Motion Simulation in Jupiter's Magnetosphere using MPI (10/10)",
      "Fortran95, Python, Linux, MPI+OpenMP, HDF5",
    ],
  },
];

export const languages = [
  { language: "Greek", level: "Native" },
  { language: "English", level: "C2 — Full Professional" },
  { language: "German", level: "B2 — Working Proficiency" },
  { language: "French", level: "A1 — Elementary" },
];
