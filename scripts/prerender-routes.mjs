import fs from "node:fs/promises";
import path from "node:path";
import { SEO_CONFIGS, getRouteJsonLd } from "../src/seo/useSEO.js";

const DIST_DIR = path.resolve("dist");
const INDEX_PATH = path.join(DIST_DIR, "index.html");

const ROUTES = [
  { routePath: "/faq", viewKey: "faq" },
  { routePath: "/privacy-policy", viewKey: "privacy-policy" },
  { routePath: "/terms-of-service", viewKey: "terms-of-service" },
  { routePath: "/services/social-media", viewKey: "social-media" },
  { routePath: "/services/seo", viewKey: "seo" },
  { routePath: "/services/cybersecurity", viewKey: "cybersecurity" },
  { routePath: "/services/website-dev", viewKey: "website-dev" },
  { routePath: "/services/custom-software", viewKey: "custom-software" },
];

const STATIC_FALLBACK_CONTENT = {
  faq: `
    <main>
      <section>
        <h1>Frequently Asked Questions</h1>
        <p>Answers to common questions about Cyvera services, timelines, and delivery approach.</p>
        <p><a href="/#contact">Contact Cyvera</a></p>
      </section>
    </main>
  `,
  "privacy-policy": `
    <main>
      <section>
        <h1>Privacy Policy</h1>
        <p>Read how Cyvera collects, uses, and protects personal information provided through our website and services.</p>
        <p><a href="/#contact">Contact Cyvera</a></p>
      </section>
    </main>
  `,
  "terms-of-service": `
    <main>
      <section>
        <h1>Terms of Service</h1>
        <p>Read the terms governing your use of Cyvera's website and services.</p>
        <p><a href="/#contact">Contact Cyvera</a></p>
      </section>
    </main>
  `,
  "social-media": `
    <main>
      <section>
        <h1>Social Media Marketing & Branding</h1>
        <p>Positioning, content strategy, and performance systems that turn social attention into revenue.</p>
        <p><a href="/#contact">Book a strategy session</a></p>
      </section>
    </main>
  `,
  seo: `
    <main>
      <section>
        <h1>Search Engine Optimisation (SEO) Services</h1>
        <p>Technical SEO, content strategy, and authority growth built to compound organic visibility.</p>
        <p><a href="/#contact">Request an SEO audit</a></p>
      </section>
    </main>
  `,
  cybersecurity: `
    <main>
      <section>
        <h1>Cybersecurity & Digital Forensics</h1>
        <p>Security assessments, hardening, monitoring, and incident response to protect business operations.</p>
        <p><a href="/#contact">Talk to a security specialist</a></p>
      </section>
    </main>
  `,
  "website-dev": `
    <main>
      <section>
        <h1>Website Development</h1>
        <p>High-performance websites engineered for speed, conversion, and long-term scalability.</p>
        <p><a href="/#contact">Start a website project</a></p>
      </section>
    </main>
  `,
  "custom-software": `
    <main>
      <section>
        <h1>Custom Software Development</h1>
        <p>Custom applications and systems designed for reliability, maintainability, and growth.</p>
        <p><a href="/#contact">Discuss your software requirements</a></p>
      </section>
    </main>
  `,
};

function replaceTagContent(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

function setRouteHead(html, config) {
  let next = html;
  next = replaceTagContent(next, /<title>[\s\S]*?<\/title>/i, `<title>${config.title}</title>`);
  next = replaceTagContent(
    next,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${config.description}" />`
  );
  next = replaceTagContent(
    next,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${config.canonical}" />`
  );
  next = replaceTagContent(
    next,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${config.title}" />`
  );
  next = replaceTagContent(
    next,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${config.description}" />`
  );
  next = replaceTagContent(
    next,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${config.canonical}" />`
  );
  next = replaceTagContent(
    next,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${config.title}" />`
  );
  next = replaceTagContent(
    next,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${config.description}" />`
  );
  return next;
}

function setRouteJsonLd(html, viewKey) {
  const payload = getRouteJsonLd(viewKey);
  const routeJsonLdTag = payload
    ? `\n    <script type="application/ld+json" data-seo-id="route-jsonld">${JSON.stringify(payload)}</script>`
    : "";
  const withoutExisting = html.replace(/\n?\s*<script[^>]*data-seo-id="route-jsonld"[^>]*>[\s\S]*?<\/script>/gi, "");
  if (!routeJsonLdTag) return withoutExisting;
  return withoutExisting.replace("</head>", `${routeJsonLdTag}\n  </head>`);
}

function setRouteStaticFallback(html, viewKey) {
  const fallback = STATIC_FALLBACK_CONTENT[viewKey];
  if (!fallback) return html;
  return replaceTagContent(
    html,
    /<div id="root"><\/div>/i,
    `<div id="root">${fallback}\n    </div>`
  );
}

async function writeRouteHtml(baseHtml, routePath, viewKey) {
  const config = SEO_CONFIGS[viewKey];
  if (!config) return;
  const withHead = setRouteHead(baseHtml, config);
  const withSchema = setRouteJsonLd(withHead, viewKey);
  const withFallback = setRouteStaticFallback(withSchema, viewKey);
  const outputDir = path.join(DIST_DIR, routePath.replace(/^\//, ""));
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, "index.html"), withFallback, "utf8");
}

async function main() {
  const baseHtml = await fs.readFile(INDEX_PATH, "utf8");
  await Promise.all(ROUTES.map((r) => writeRouteHtml(baseHtml, r.routePath, r.viewKey)));
  console.log(`Prerendered ${ROUTES.length} route snapshots.`);
}

main().catch((error) => {
  console.error("Prerender failed:", error);
  process.exit(1);
});
