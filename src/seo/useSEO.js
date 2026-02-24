/**
 * useSEO — lightweight dynamic meta tag manager (no extra dependencies)
 *
 * Directly updates <head> tags at runtime so crawlers like Googlebot
 * (which fully renders JS) see correct per-page metadata.
 *
 * Usage:
 *   useSEO({ title, description, canonical })
 */
export function useSEO({ title, description, canonical } = {}) {
  if (title) {
    document.title = title;
    setMeta("og:title", title, "property");
    setMeta("twitter:title", title);
  }
  if (description) {
    setMeta("description", description);
    setMeta("og:description", description, "property");
    setMeta("twitter:description", description);
  }
  if (canonical) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
    setMeta("og:url", canonical, "property");
  }
}

function setMeta(nameOrProp, content, attrType = "name") {
  let el = document.querySelector(`meta[${attrType}="${nameOrProp}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrType, nameOrProp);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// ── Pre-built SEO configs ─────────────────────────────────────────────────────

export const SEO_CONFIGS = {
  home: {
    title: "Cyvera | Digital Agency for Branding, SEO, Cybersecurity & Software Development",
    description:
      "Cyvera is your end-to-end digital partner — brand identity, SEO, cybersecurity, website development, and custom software under one roof. Book a free 90-day strategy session.",
    canonical: "https://cyvera.com.au/",
  },
  "social-media": {
    title: "Social Media Marketing & Branding | Cyvera",
    description:
      "Positioning, content strategy, and performance systems that turn social attention into real revenue. Cyvera's social media experts deliver measurable growth.",
    canonical: "https://cyvera.com.au/#social-media",
  },
  seo: {
    title: "Search Engine Optimisation (SEO) Services | Cyvera",
    description:
      "Technical and content SEO that compounds your organic visibility and fills your pipeline. Data-driven strategies from Cyvera's SEO specialists.",
    canonical: "https://cyvera.com.au/#seo",
  },
  cybersecurity: {
    title: "Cybersecurity & Digital Forensics | Cyvera",
    description:
      "Risk assessments, infrastructure hardening, and 24/7 monitoring for resilient business operations. Protect your digital assets with Cyvera.",
    canonical: "https://cyvera.com.au/#cybersecurity",
  },
  "website-dev": {
    title: "Website Development | Cyvera",
    description:
      "High-performance marketing websites that convert visitors, load fast, and scale with your brand. Built by Cyvera's expert development team.",
    canonical: "https://cyvera.com.au/#website-dev",
  },
  "custom-software": {
    title: "Custom Software Development | Cyvera",
    description:
      "Custom applications and distributed systems engineered for reliability and growth. From MVP to enterprise — Cyvera builds software that scales.",
    canonical: "https://cyvera.com.au/#custom-software",
  },
};
