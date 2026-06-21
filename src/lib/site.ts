import type { Metadata, MetadataRoute } from "next";

// ─── Site config ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "Swapnil Mishra",
  title: "HR Operations & Employee Lifecycle Specialist",
  subhead: "Senior HR Executive · BluPine Energy",
  location: "Gurgaon, Haryana, India",
  locationShort: "Gurgaon",
  openTo: "Delhi NCR · Gurgaon · Noida · Bangalore · Remote",
  phone: "+91 9119725253",
  email: "mishraswapnil035@gmail.com",
  linkedin: "https://www.linkedin.com/in/swapnil-mishra-hr/",
  resumePath: "/resume/Swapnil_Mishra_HR_Resume.pdf",
  resumeMarkdownPath: "/resume/Swapnil_Mishra_HR_Resume.md",
  resumeFilename: "Swapnil_Mishra_HR_Resume.pdf",
  url: "https://swapnilmishra.dev",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
] as const;

export const heroStats = [
  { value: "280+", label: "Employees Supported" },
  { value: "100+", label: "Successful Hires" },
  { value: "100%", label: "Onboarding Compliance" },
  { value: "3+", label: "Years HR Experience" },
] as const;

export const heroContent = {
  badge: "Open to HR Generalist & HR Operations Roles",
  name: "Swapnil Mishra",
  headline: "HR Operations & Employee Lifecycle Specialist",
  tagline: "HR OPERATIONS · EMPLOYEE LIFECYCLE · TALENT ACQUISITION",
  quote:
    "I help organizations streamline HR operations, strengthen employee relations, and create exceptional employee experiences.",
  locationLine: "Gurgaon · Open to Delhi NCR, Noida, Bangalore & Remote",
};

export interface CaseStudy {
  company: string;
  period: string;
  title: string;
  description: string;
  tags: string[];
  impacts: string[];
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    company: "BluPine Energy",
    period: "2025",
    title: "HR Policy Chatbot Initiative",
    description:
      "Supported leadership in rolling out an HR Policy Chatbot to improve employee self-service, policy accessibility, grievance routing, and overall employee experience.",
    tags: ["Employee Experience", "HR Technology", "Process Improvement"],
    impacts: ["Reduced HR Workload", "24/7 Policy Access", "Faster Self-Service"],
    featured: true,
  },
  {
    company: "BluPine Energy",
    period: "2025",
    title: "Onboarding Framework at Scale",
    description:
      "Built repeatable onboarding processes for a ~280-person renewable energy organization — ensuring day-1 readiness, complete documentation, and 100% compliance.",
    tags: ["HR Operations", "Onboarding", "Compliance"],
    impacts: ["100% Onboarding Compliance", "280+ Employees Supported", "Day-1 Readiness"],
  },
  {
    company: "EPC Infracon",
    period: "2024",
    title: "High-Volume Recruitment Drive",
    description:
      "Owned end-to-end recruitment during peak hiring — closing up to 20 positions in a single month across engineering and corporate functions.",
    tags: ["Talent Acquisition", "Recruitment", "Campus Hiring"],
    impacts: ["20 Positions in One Month", "100+ Total Career Hires", "Cross-Functional Hiring"],
  },
  {
    company: "EPC Infracon",
    period: "2024",
    title: "Campus to Corporate Pipeline",
    description:
      "Partnered with colleges and hiring managers to source, assess, and onboard fresh talent into field and corporate roles through campus placement drives.",
    tags: ["Campus Recruitment", "Talent Pipeline", "Onboarding"],
    impacts: ["Campus Partnerships", "Quality Screening", "Compliant Onboarding"],
  },
];

export const coreValues = [
  { title: "Ownership", description: "Taking full responsibility for outcomes, not just tasks.", icon: "target" as const },
  { title: "Process Thinking", description: "Designing systems that solve the root cause, not the symptom.", icon: "workflow" as const },
  { title: "Technology Curiosity", description: "Leveraging tools to eliminate friction and scale impact.", icon: "lightbulb" as const },
  { title: "People First", description: "Building processes that serve humans, not the other way around.", icon: "heart" as const },
];

export const skillTiers = {
  expert: ["HR Operations", "Employee Relations", "Talent Acquisition"],
  proficient: ["Payroll Coordination", "Onboarding & Offboarding", "HRMS Management", "Compliance"],
  familiar: ["HRBP Activities", "Campus Recruitment", "Employee Self-Service"],
};

export const hrPhilosophy =
  "Technology should remove friction from HR — not add complexity. I focus on tools and processes that help employees get answers faster and help HR teams operate with precision at scale.";

export const lookingFor = {
  title: "What I'm Looking For",
  body: "An HR Generalist, Senior HR Executive, or HR Operations role at a growth-stage company (100–500 employees) where I can own the employee lifecycle — from hiring through onboarding, operations, and employee relations.",
  note: "Open to HRBP support roles where I can partner with managers while owning core HR operations.",
};

// ─── Content types ───────────────────────────────────────────────────────────

export interface Metric {
  value: string;
  label: string;
  footnote: string;
  emphasis?: boolean;
  warm?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  industry: string;
  bullets: string[];
  current?: boolean;
}

export interface RoleGroup {
  title: string;
  roles: string[];
}

export interface DashboardPanel {
  value: string;
  label: string;
  footnote: string;
}

export interface RecognitionItem {
  title: string;
  body: string;
}

export interface SuccessStory {
  title: string;
  context: string;
  outcome: string;
  tag: string;
}

export interface ToolCategory {
  category: string;
  tools: string[];
}

export interface Certification {
  name: string;
  provider: string;
}

// ─── Content ─────────────────────────────────────────────────────────────────


export const metrics: Metric[] = [
  { value: "3+", label: "Years Experience", footnote: "IT, EPC & renewable energy" },
  { value: "100+", label: "Successful Hires", footnote: "End-to-end recruitment ownership" },
  { value: "20", label: "Positions / Month", footnote: "Peak month, EPC Infracon", warm: true },
  { value: "280+", label: "Employees Supported", footnote: "BluPine Energy scale" },
  { value: "100%", label: "Onboarding & Day-1 Ready", footnote: "Compliance & documentation", emphasis: true },
];

export const aboutContent = {
  label: "WHO I AM",
  title: "About",
  paragraphs: [
    "I'm an HR professional focused on the full employee lifecycle — making sure people are hired well, onboarded compliantly, supported fairly, and transitioned smoothly when needed.",
    "Over 3+ years at CodeGenIT, EPC Infracon, and BluPine Energy, I've supported 280+ employees, closed 100+ positions, and maintained 100% onboarding compliance. I partner with managers on employee relations, payroll coordination, and HR operations — not just recruitment.",
    "My goal is simple: streamline HR operations, strengthen employee relations, and create employee experiences people trust.",
  ],
  credential: "MBA · Banasthali Vidyapith",
};

export const expertiseContent = {
  label: "CAPABILITIES",
  title: "Core Expertise",
  description:
    "Hands-on generalist with depth in operations and employee lifecycle — recruitment as a proven secondary strength.",
  primary: ["HR Operations", "Employee Relations", "HRBP Activities"],
  secondary: [
    "Talent Acquisition", "Payroll Coordination", "Compliance",
    "Onboarding", "Offboarding", "HRMS Management",
  ],
};

export const experienceItems: ExperienceItem[] = [
  {
    company: "BluPine Energy Pvt Ltd.",
    role: "Senior Executive HR",
    location: "Gurugram",
    startDate: "Jan 2025",
    endDate: "Present",
    industry: "Renewable Energy",
    current: true,
    bullets: [
      "Spearheaded onboarding tracker with 100% compliance on verification & joining forms within T+7 days.",
      "Created Day-1 readiness kits; HRMS for 280+ employees (attendance, leave, payroll inputs).",
      "Configured SAP workflows for HR processes; supported GMC, GPA, GTL data preparation.",
      "Facilitated induction programs with HODs; employee grievance resolution & policy compliance.",
      "Managed offboarding, F&F settlements, promotions, transfers, and performance appraisal support.",
    ],
  },
  {
    company: "EPC Infracon Pvt Ltd.",
    role: "HR Executive",
    location: "Noida",
    startDate: "Mar 2024",
    endDate: "Jan 2025",
    industry: "EPC & Construction",
    bullets: [
      "Oversaw full employee lifecycle: workforce planning, TA, onboarding, engagement, and offboarding.",
      "Processed payroll for 100+ employees with PF & ESIC statutory compliance.",
      "Mediated disputes and fostered positive employee relations.",
      "Developed and updated HR policies and procedures.",
    ],
  },
  {
    company: "CodeGenIT Pvt Ltd.",
    role: "HR Executive",
    location: "Noida",
    startDate: "Apr 2023",
    endDate: "Mar 2024",
    industry: "IT Services",
    bullets: [
      "Led end-to-end recruitment for IT and non-IT roles across international clients.",
      "Sourced candidates via Seek, Indeed, Hays, and Boolean search techniques.",
      "Facilitated onboarding and maintained employee records per legal requirements.",
      "Created and revised HR policies; coordinated interviews across time zones.",
    ],
  },
];

export const recruitmentContent = {
  label: "HIRING IMPACT",
  title: "Recruitment Impact Dashboard",
  description:
    "End-to-end recruitment across tech, engineering, and corporate functions — not just one industry or role type.",
};

export const dashboardPanels: DashboardPanel[] = [
  { value: "100+", label: "Total Hires", footnote: "Across 3 employers · 2023–Present" },
  { value: "20", label: "Peak Month", footnote: "Positions closed · EPC Infracon" },
  { value: "4", label: "Role Categories", footnote: "Tech · Engineering · Corporate · HR" },
  { value: "3", label: "Industries Served", footnote: "IT · EPC · Renewable Energy" },
];

export const roleGroups: RoleGroup[] = [
  { title: "Technology", roles: ["Software Engineers", "React Developers", "QA Engineers"] },
  { title: "Engineering & Field", roles: ["Site Engineers", "Solar Engineers", "Project Managers"] },
  { title: "Corporate", roles: ["Operations Executives", "Procurement Executives", "Finance Executives"] },
  { title: "HR & Support", roles: ["HR Executives"] },
];

export const chatbotContent = {
  label: "INNOVATION",
  title: "HR Policy Chatbot Initiative",
  subtitle: "Improving policy access and employee self-service",
  challenge:
    "Employees struggled to find HR policy answers quickly — leading to repeated queries, delays, and unnecessary HR tickets.",
  role: "Supported my manager in defining requirements, shaping use cases, and rolling out an HR Policy Chatbot for employee self-service, policy guidance, and grievance routing.",
  outcomes: [
    "Faster access to HR policy information without waiting on HR.",
    "Reduced friction in grievance handling with clearer first-step guidance.",
    "Improved employee experience through 24/7 self-service availability.",
  ],
  tags: ["Employee Experience", "Process Improvement", "HR Technology"],
  flowSteps: ["Employee", "Chatbot", "Policy Answer", "HR Escalation"],
  chatExample: {
    question: "What is our leave policy?",
    answer:
      "Based on company policy, annual leave is accrued monthly. For extended leave, submit a request through HRMS at least 5 days in advance.",
  },
};

export const successStories: SuccessStory[] = [
  {
    title: "20 Hires in One Month",
    context: "EPC Infracon — high-volume hiring across engineering and corporate roles.",
    outcome: "Owned full-cycle recruitment during peak demand, maintaining quality screening and compliant onboarding for every hire.",
    tag: "Talent Acquisition",
  },
  {
    title: "100% Onboarding Compliance",
    context: "BluPine Energy — scaling HR operations for a growing workforce.",
    outcome: "Built repeatable onboarding checklists ensuring day-1 readiness, complete documentation, and zero compliance gaps.",
    tag: "HR Operations",
  },
  {
    title: "Campus to Corporate Pipeline",
    context: "EPC Infracon — campus placement drives across colleges.",
    outcome: "Partnered with colleges and hiring managers to source, assess, and onboard fresh talent into field and corporate roles.",
    tag: "Recruitment",
  },
];

export const recognitionContent = {
  label: "SOCIAL PROOF",
  title: "Recognition & Appreciation",
  description: "Acknowledged by leaders, managers, and stakeholders across my roles.",
};

export const recognitionItems: RecognitionItem[] = [
  { title: "Leadership Recognition", body: "Acknowledged for reliability and ownership in HR operations at scale." },
  { title: "Manager Appreciation", body: "Recognized by hiring managers for responsive recruitment and onboarding support." },
  { title: "Client Appreciation", body: "Appreciated for professional coordination and stakeholder communication." },
];

export const toolsContent = {
  label: "TECH STACK",
  title: "Tools & Platforms",
  description: "Systems and platforms used across HR operations, recruitment, and employee lifecycle management.",
};

export const toolCategories: ToolCategory[] = [
  { category: "HRMS & Core HR", tools: ["Employee Records Management", "Policy Documentation", "Leave & Attendance"] },
  { category: "Recruitment & ATS", tools: ["Sourcing & Screening", "Interview Coordination", "Offer Management"] },
  { category: "Payroll & Compliance", tools: ["Salary Processing", "Statutory Deductions", "Overtime Calculation"] },
  { category: "Employee Experience", tools: ["Onboarding Workflows", "Grievance Tracking", "HR Self-Service"] },
];

export const educationContent = {
  label: "CREDENTIALS",
  title: "Education & Certifications",
  degree: "MBA · Banasthali Vidyapith",
  period: "2022 – 2024",
};

export const certifications: Certification[] = [
  { name: "Customer Relationship Management in Business", provider: "Alison" },
  { name: "Digital Marketing and Advertisement Training", provider: "MyCaptain" },
  { name: "Entrepreneurship Training", provider: "MyCaptain" },
  { name: "Introduction to FinOps Training", provider: "MyCaptain" },
  { name: "Stock Exchange and Finance Training", provider: "MyCaptain" },
];

export const contactContent = {
  label: "GET IN TOUCH",
  title: "Let's Connect",
  body: "Open to HR Generalist, Senior HR Executive, HR Operations, and HRBP support roles.",
  locations: "Delhi NCR · Gurgaon · Noida · Bangalore · Remote",
};

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | HR Operations & Employee Lifecycle Specialist`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Senior HR Executive with 3+ years across renewable energy, EPC, and IT. 100+ hires, 280+ employees supported, 100% onboarding compliance. Based in Gurgaon, open to NCR, Bangalore & remote.",
  keywords: [
    "HR operations", "employee lifecycle", "HR generalist", "Gurgaon HR",
    "senior HR executive", "talent acquisition", "onboarding compliance",
    "employee relations", "HRBP", "payroll coordination", "renewable energy HR",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — HR Operations & Lifecycle`,
    description: "Premium HR portfolio: operations, employee relations, recruitment, and HR innovation. Download resume.",
    images: [{ url: "/images/og-image.svg", width: 1200, height: 630, alt: `${SITE.name} — HR Operations & Employee Lifecycle Specialist` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — HR Operations & Lifecycle`,
    description: "Senior HR Executive with 3+ years across renewable energy, EPC, and IT.",
    images: ["/images/og-image.svg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: "Senior Executive HR",
    worksFor: { "@type": "Organization", name: "BluPine Energy" },
    address: { "@type": "PostalAddress", addressLocality: "Gurgaon", addressRegion: "Haryana", addressCountry: "IN" },
    url: SITE.url,
    sameAs: [SITE.linkedin],
    knowsAbout: ["Human Resources Operations", "Employee Relations", "Talent Acquisition", "Onboarding", "Payroll Coordination"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Banasthali Vidyapith" },
  };
}

export const APP_ROUTES = ["/", "/experience", "/skills", "/about", "/case-studies"] as const;

export function buildSitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return APP_ROUTES.map((path) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}
