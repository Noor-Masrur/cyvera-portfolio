import { Cpu, Megaphone, MonitorSmartphone, Search, ShieldCheck } from "lucide-react";

export const services = [
  {
    id: "social-media",
    icon: <Megaphone size={26} strokeWidth={1.6} color="#00B4D8" />,
    name: "Social Media Marketing & Branding",
    desc: "Positioning, content, and performance systems that turn attention into revenue.",
    color: "#00B4D8",
    accent: "rgba(0,180,216,0.15)",
  },
  {
    id: "seo",
    icon: <Search size={26} strokeWidth={1.6} color="#0096C7" />,
    name: "Search Engine Optimization",
    desc: "Technical and content SEO that compounds visibility and pipeline.",
    color: "#0096C7",
    accent: "rgba(0,150,199,0.15)",
  },
  {
    id: "cybersecurity",
    icon: <ShieldCheck size={26} strokeWidth={1.6} color="#0077B6" />,
    name: "Cybersecurity & Digital Forensics",
    desc: "Risk assessments, hardening, and monitoring for resilient operations.",
    color: "#0077B6",
    accent: "rgba(0,119,182,0.15)",
  },
  {
    id: "website-dev",
    icon: <MonitorSmartphone size={26} strokeWidth={1.6} color="#1769FF" />,
    name: "Website Development",
    desc: "High-performance marketing sites that convert, load fast, and scale with your brand.",
    color: "#1769FF",
    accent: "rgba(23,105,255,0.15)",
  },
  {
    id: "custom-software",
    icon: <Cpu size={26} strokeWidth={1.6} color="#023E8A" />,
    name: "Custom Software",
    desc: "Custom apps and distributed systems engineered for reliability and growth.",
    color: "#023E8A",
    accent: "rgba(2,62,138,0.15)",
  },
];

export const stats = [
  { num: "50+", label: "Clients Served", suffix: "" },
  { num: "98%", label: "Client Retention", suffix: "%" },
  { num: "100%", label: "Security-First", suffix: "%" },
  { num: "4x", label: "Avg. ROI Delivered", suffix: "" },
];

export const differentiators = [
  "End-to-end capabilities under one roof — no handoffs, no excuses",
  "Security-first mindset baked into every product and campaign",
  "Transparent reporting and strategy, always",
  "Dedicated team that moves as fast as your ambitions",
];

export const projects = [
  {
    category: "Branding + SEO",
    name: "NovaPay Rebrand",
    metric: "+140% Organic Traffic",
    tags: ["SEO", "Social Media"],
    gradient: "linear-gradient(135deg, #0A2540 0%, #00B4D8 100%)",
    size: "large",
  },
  {
    category: "Cybersecurity",
    name: "ShieldNet Audit",
    metric: "0 Breaches Post-Deploy",
    tags: ["Cybersecurity"],
    gradient: "linear-gradient(135deg, #023E8A 0%, #0096C7 100%)",
    size: "small",
  },
  {
    category: "Software Dev",
    name: "Orion SaaS Platform",
    metric: "3× Faster Load Times",
    tags: ["Software"],
    gradient: "linear-gradient(135deg, #03045E 0%, #48CAE4 100%)",
    size: "small",
  },
];

export const filterTabs = ["All", "Social Media", "SEO", "Cybersecurity", "Software"];

export const steps = [
  { n: "01", title: "Discover", desc: "Deep-dive into your goals, market, and gaps.", icon: "🔭" },
  { n: "02", title: "Strategize", desc: "Build a precision roadmap tailored to your ambition.", icon: "🗺️" },
  { n: "03", title: "Execute", desc: "Deliver with craft, speed, and zero guesswork.", icon: "⚡" },
  { n: "04", title: "Optimize", desc: "Measure, learn, iterate — and keep winning.", icon: "📈" },
];

export const testimonials = [
  {
    name: "Aria Chen",
    role: "CEO, NovaPay",
    quote: "Cyvera didn't just redesign our brand — they transformed how our customers perceive us. The SEO results alone paid back our investment 10×.",
    initials: "AC",
  },
  {
    name: "Marcus Webb",
    role: "CTO, ShieldNet",
    quote: "The most thorough cybersecurity audit we've had. They found vulnerabilities our previous vendor missed for two years. Trust them completely.",
    initials: "MW",
  },
  {
    name: "Sofia Reyes",
    role: "Founder, Orion Labs",
    quote: "Our SaaS product went from MVP to launch-ready in 90 days. The team's technical depth is unmatched.",
    initials: "SR",
  },
  {
    name: "James Patel",
    role: "CMO, Zenith Digital",
    quote: "The growth we've seen in organic search after working with Cyvera has been nothing short of remarkable. Real results, real fast.",
    initials: "JP",
  },
  {
    name: "Lena Okafor",
    role: "Founder, Bloom Brands",
    quote: "Finally, an agency that treats reporting like a feature — not an afterthought. We always know exactly what our money is doing.",
    initials: "LO",
  },
];

export const clients = [
  "NovaPay",
  "ShieldNet",
  "Orion Labs",
  "Zenith Digital",
  "Bloom Brands",
  "Apex Tech",
  "NovaFlow",
  "Stratos IO",
  "Pulsar Media",
];

export const faqCategories = [
  {
    id: "faq-general",
    title: "Getting Started",
    subtitle: "Engagement basics and timelines",
    items: [
      {
        q: "What does the first week look like?",
        a: "We run a discovery sprint to understand goals, stakeholders, and constraints, then deliver a scoped plan with clear milestones.",
      },
      {
        q: "Do you work with existing teams?",
        a: "Yes. We can lead delivery end-to-end or integrate with your in-house marketing, security, or engineering teams.",
      },
      {
        q: "How do you price engagements?",
        a: "Pricing is based on scope, complexity, and timeline. We offer fixed-scope projects and ongoing retainers.",
      },
    ],
  },
  {
    id: "faq-marketing",
    title: "Marketing & SEO",
    subtitle: "Growth, content, and reporting",
    items: [
      {
        q: "How long does SEO take to show results?",
        a: "Initial traction typically appears in 6–12 weeks, with compounding gains over 3–6 months depending on competition and baseline.",
      },
      {
        q: "What's included in social media and branding?",
        a: "Positioning, content strategy, creative production, and performance measurement aligned to growth objectives.",
      },
      {
        q: "Do you handle analytics and reporting?",
        a: "Yes. We set up dashboards and provide transparent, recurring performance reporting.",
      },
    ],
  },
  {
    id: "faq-cyber",
    title: "Cybersecurity",
    subtitle: "Testing, monitoring, and response",
    items: [
      {
        q: "Do you offer penetration testing and incident response?",
        a: "Yes. We provide advanced penetration testing plus incident response and breach recovery services.",
      },
      {
        q: "Can you run a 24/7 SOC?",
        a: "Yes. Our Managed SOC includes continuous monitoring, alert triage, and threat hunting.",
      },
      {
        q: "Do you support DevSecOps?",
        a: "Yes. We embed security into CI/CD with automated checks, policy-as-code, and secure engineering practices.",
      },
    ],
  },
  {
    id: "faq-dev",
    title: "Web & Software",
    subtitle: "Build, launch, and scale",
    items: [
      {
        q: "What tech stacks do you build on?",
        a: "We choose stacks based on product needs, commonly using modern JS frameworks, cloud-native services, and secure DevOps.",
      },
      {
        q: "How long does a typical website build take?",
        a: "Most marketing sites launch in 3–6 weeks depending on content readiness and scope.",
      },
      {
        q: "Can you maintain and scale after launch?",
        a: "Yes. We offer ongoing optimization, security monitoring, and feature delivery.",
      },
    ],
  },
];
