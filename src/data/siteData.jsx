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

export { faqCategories } from "./faqData.js";
