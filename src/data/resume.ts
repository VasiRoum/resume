export interface ContactInfo {
  email: string;
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
  email: "vasilis.roumeliotis@example.com",
  linkedin: "linkedin.com/in/vasilis-roumeliotis",
  github: "github.com/vasilis-roumeliotis",
  location: "Germany",
};

export const summary =
  "AI Software Engineer with experience building multi-agent systems, enterprise applications, and developer tools. Passionate about turning complex problems into elegant, production-ready solutions.";

export const techSkills = {
  languages: ["Python", "TypeScript", "Ruby", "Go", "SQL"],
  ai: ["LangChain", "LangGraph", "Claude API", "OpenAI API", "MCP", "RAG", "Fine-tuning"],
  frontend: ["React", "Next.js", "Three.js", "Tailwind CSS"],
  backend: ["Rails", "FastAPI", "Node.js", "PostgreSQL", "Redis"],
  devops: ["Docker", "AWS", "Vercel", "CI/CD", "GitHub Actions"],
  tools: ["Git", "Cursor", "Claude Code", "Figma"],
};

export const workExperience: Record<string, WorkEntry[]> = {
  logistics: [
    {
      company: "Rail Logistics Company",
      role: "Software Engineer",
      period: "2023 – 2024",
      bullets: [
        "Optimized shipment processing pipeline from 30-60 seconds to sub-second response times",
        "Built real-time tracking dashboard serving 500+ daily active users",
        "Designed event-driven architecture handling 10K+ shipment events per day",
        "Implemented automated testing suite with 95% code coverage",
      ],
    },
  ],
  pharma: [
    {
      company: "Pharmaceutical Company",
      role: "Full-Stack Developer",
      period: "2022 – 2023",
      bullets: [
        "Built tariff calculation system handling 13 pay grades and complex union rules",
        "Developed comprehensive test suite with 416+ automated tests",
        "Created admin dashboard for HR managers to configure compensation rules",
        "Reduced payroll processing errors by 87% through automated validation",
      ],
    },
  ],
  ai: [
    {
      company: "AI Startup",
      role: "AI Software Engineer",
      period: "2024 – Present",
      bullets: [
        "Architected 9-agent multi-agent platform for automated business workflows",
        "Built intelligent pricing engine using LLM-powered market analysis",
        "Developed MCP servers for tool integration across agent systems",
        "Implemented RAG pipelines for domain-specific knowledge retrieval",
        "Created evaluation framework for measuring agent performance and reliability",
      ],
    },
  ],
  enterprise: [
    {
      company: "Enterprise Solutions",
      role: "Full-Stack Developer",
      period: "2021 – 2022",
      bullets: [
        "Built offline-capable HVAC management PWA used by 200+ field technicians",
        "Developed pdf2zugferd — automated e-invoice conversion tool",
        "Created AI-powered CRM system with intelligent lead scoring",
        "Implemented real-time sync engine for offline-first mobile applications",
      ],
    },
  ],
};

export const sideProjects: ProjectEntry[] = [
  {
    name: "ParkSpot",
    description: "Smart parking finder app",
    bullets: [
      "Real-time parking availability using computer vision",
      "Mobile-first PWA with offline support",
    ],
  },
  {
    name: "Arc",
    description: "AI-powered code review tool",
    bullets: [
      "Automated code review with contextual suggestions",
      "GitHub integration with PR commenting",
    ],
  },
  {
    name: "ABC",
    description: "Automated business compliance checker",
    bullets: [
      "Document analysis pipeline for regulatory compliance",
      "Multi-jurisdiction rule engine",
    ],
  },
  {
    name: "Deep Research Agent",
    description: "Autonomous research assistant",
    bullets: [
      "Multi-step research with source verification",
      "Structured output with citations",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    institution: "Democritus University of Thrace",
    degree: "Bachelor of Science in Computer Science",
    period: "2017 – 2021",
    details: [
      "Thesis: Jupiter — Distributed computing framework for scientific workloads",
      "Focus: Algorithms, Distributed Systems, Machine Learning",
    ],
  },
];

export const languages = [
  { language: "Greek", level: "Native" },
  { language: "English", level: "Fluent (C2)" },
  { language: "German", level: "Professional (B2)" },
  { language: "French", level: "Basic (A2)" },
];
