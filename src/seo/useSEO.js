import { faqCategories } from "../data/faqData.js";

export function applySEO({ title, description, canonical, robots } = {}) {
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
  setMeta("robots", robots || "index, follow");
}

export const useSEO = applySEO;

export function applyRouteJsonLd(viewKey) {
  const payload = getRouteJsonLd(viewKey);
  setJsonLd("route-jsonld", payload);
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

function setJsonLd(id, payload) {
  const selector = `script[data-seo-id="${id}"]`;
  let el = document.querySelector(selector);
  if (!payload) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(payload);
}

// ── Pre-built SEO configs ─────────────────────────────────────────────────────

export const SEO_CONFIGS = {
  home: {
    title: "Cyvera | Digital Agency for Branding, SEO, Cybersecurity & Software Development",
    description:
      "Cyvera is your end-to-end digital partner — brand identity, SEO, cybersecurity, website development, and custom software under one roof. Book a free 90-day strategy session.",
    canonical: "https://cyvera.com.au/",
    robots: "index, follow",
  },
  "social-media": {
    title: "Social Media Marketing & Branding | Cyvera",
    description:
      "Positioning, content strategy, and performance systems that turn social attention into real revenue. Cyvera's social media experts deliver measurable growth.",
    canonical: "https://cyvera.com.au/services/social-media",
    robots: "index, follow",
  },
  seo: {
    title: "Search Engine Optimisation (SEO) Services | Cyvera",
    description:
      "Technical and content SEO that compounds your organic visibility and fills your pipeline. Data-driven strategies from Cyvera's SEO specialists.",
    canonical: "https://cyvera.com.au/services/seo",
    robots: "index, follow",
  },
  cybersecurity: {
    title: "Cybersecurity & Digital Forensics | Cyvera",
    description:
      "Risk assessments, infrastructure hardening, and 24/7 monitoring for resilient business operations. Protect your digital assets with Cyvera.",
    canonical: "https://cyvera.com.au/services/cybersecurity",
    robots: "index, follow",
  },
  "website-dev": {
    title: "Website Development | Cyvera",
    description:
      "High-performance marketing websites that convert visitors, load fast, and scale with your brand. Built by Cyvera's expert development team.",
    canonical: "https://cyvera.com.au/services/website-dev",
    robots: "index, follow",
  },
  "custom-software": {
    title: "Custom Software Development | Cyvera",
    description:
      "Custom applications and distributed systems engineered for reliability and growth. From MVP to enterprise — Cyvera builds software that scales.",
    canonical: "https://cyvera.com.au/services/custom-software",
    robots: "index, follow",
  },
  faq: {
    title: "FAQ | Cyvera",
    description:
      "Answers to common questions about Cyvera's services, timelines, and engagement process.",
    canonical: "https://cyvera.com.au/faq",
    robots: "index, follow",
  },
  notfound: {
    title: "Page Not Found | Cyvera",
    description: "The requested page could not be found.",
    robots: "noindex, follow",
  },
};

const ORG_ID = "https://cyvera.com.au/#organization";
const SITE_URL = "https://cyvera.com.au";
const SERVICE_VIEW_KEYS = ["social-media", "seo", "cybersecurity", "website-dev", "custom-software"];

const buildBreadcrumb = (name, url) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name, item: url },
  ],
});

const FAQ_MAIN_ENTITY = faqCategories.flatMap((category) =>
  category.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  }))
);

function buildWebPageJsonLd(config) {
  if (!config?.canonical) return null;
  return {
    "@type": "WebPage",
    "@id": `${config.canonical}#webpage`,
    url: config.canonical,
    name: config.title,
    description: config.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": ORG_ID },
  };
}

export function getRouteJsonLd(viewKey) {
  if (viewKey === "faq") return buildFaqJsonLd();
  if (!SERVICE_VIEW_KEYS.includes(viewKey)) return null;
  return buildServiceJsonLd(viewKey);
}

function buildFaqJsonLd() {
  const config = SEO_CONFIGS.faq;
  const webPage = buildWebPageJsonLd(config);
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...(webPage ? [webPage] : []),
      {
        "@type": "FAQPage",
        mainEntity: FAQ_MAIN_ENTITY,
      },
      buildBreadcrumb("FAQ", config.canonical),
    ],
  };
}

function getServiceName(title) {
  return String(title || "").replace(/\s*\|\s*Cyvera\s*$/i, "");
}

function buildServiceJsonLd(serviceId) {
  const config = SEO_CONFIGS[serviceId];
  if (!config?.canonical) return null;
  const name = getServiceName(config.title);
  const webPage = buildWebPageJsonLd(config);
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...(webPage ? [webPage] : []),
      {
        "@type": "Service",
        "@id": `${config.canonical}#service`,
        serviceType: name,
        name: `${name} | Cyvera`,
        description: config.description,
        provider: { "@id": ORG_ID },
        areaServed: "Worldwide",
        url: config.canonical,
      },
      buildBreadcrumb(name, config.canonical),
    ],
  };
}
