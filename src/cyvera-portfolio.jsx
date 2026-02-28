import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { applySEO, SEO_CONFIGS, applyRouteJsonLd } from "./seo/useSEO";
import Navbar from "./components/layout/Navbar";
import SchedulerModal from "./components/layout/SchedulerModal";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import MarqueeStrip from "./components/sections/MarqueeStrip";
import Services from "./components/sections/Services";
import StatsStrip from "./components/sections/StatsStrip";
import WhyCyvera from "./components/sections/WhyCyvera";
import Portfolio from "./components/sections/Portfolio";
import Process from "./components/sections/Process";
import Testimonials from "./components/sections/Testimonials";
import FAQPage from "./components/sections/FAQPage";
import PrivacyPolicyPage from "./components/sections/PrivacyPolicyPage";
import TermsOfServicePage from "./components/sections/TermsOfServicePage";
import CTABanner from "./components/sections/CTABanner";
import Contact from "./components/sections/Contact";
import ServiceDetail from "./components/service-pages/ServiceDetail";

const SERVICE_IDS = new Set([
  "social-media",
  "seo",
  "cybersecurity",
  "website-dev",
  "custom-software",
]);

export default function CyveraPortfolio() {
  const location = useLocation();
  const navigate = useNavigate();
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    const serviceId = path.startsWith("/services/") ? path.split("/")[2] : "";
    let viewKey = "home";
    if (path === "/faq") {
      viewKey = "faq";
    } else if (path === "/privacy-policy") {
      viewKey = "privacy-policy";
    } else if (path === "/terms-of-service") {
      viewKey = "terms-of-service";
    } else if (path.startsWith("/services/")) {
      viewKey = SERVICE_IDS.has(serviceId) ? serviceId : "notfound";
    } else if (path !== "/") {
      viewKey = "notfound";
    }
    const baseConfig = SEO_CONFIGS[viewKey] || SEO_CONFIGS.notfound || SEO_CONFIGS.home;
    const config = viewKey === "notfound"
      ? {
        ...baseConfig,
        canonical: `${window.location.origin}${location.pathname}`,
      }
      : baseConfig;
    applySEO(config);
    applyRouteJsonLd(viewKey);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") {
      window.scrollTo(0, 0);
      return;
    }
    if (location.hash) {
      const id = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: "start" });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  const goHome = (hash) => {
    if (hash) {
      navigate({ pathname: "/", hash });
      return;
    }
    navigate("/");
  };

  const openScheduler = () => setSchedulerOpen(true);
  const closeScheduler = () => setSchedulerOpen(false);
  const goService = (serviceId) => navigate(`/services/${serviceId}`);

  return (
    <div>
      <Navbar
        onHome={goHome}
        onSchedule={openScheduler}
        onSelectService={goService}
        onFAQ={() => navigate("/faq")}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <Hero onSchedule={openScheduler} />
                <MarqueeStrip />
                <Services onSelect={goService} />
                <StatsStrip />
                <WhyCyvera />
                <Portfolio />
                <Process />
                <Testimonials />
                <CTABanner onSchedule={openScheduler} />
                <Contact />
              </>
            )}
          />
          <Route
            path="/faq"
            element={<FAQPage onBack={() => navigate("/")} onSchedule={openScheduler} />}
          />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicyPage onBack={() => navigate("/")} />}
          />
          <Route
            path="/terms-of-service"
            element={<TermsOfServicePage onBack={() => navigate("/")} />}
          />
          <Route
            path="/services/:serviceId"
            element={<ServiceDetailRoute onBack={() => navigate("/")} onSchedule={openScheduler} />}
          />
          <Route path="*" element={<NotFoundRoute onHome={() => navigate("/")} />} />
        </Routes>
      </main>
      <SchedulerModal open={schedulerOpen} onClose={closeScheduler} />
      <Footer onNavigate={goHome} onSelectService={goService} onFAQ={() => navigate("/faq")} />
    </div>
  );
}

function ServiceDetailRoute({ onBack, onSchedule }) {
  const location = useLocation();
  const serviceId = location.pathname.split("/")[2];
  if (!serviceId) return null;
  return <ServiceDetail serviceId={serviceId} onBack={onBack} onSchedule={onSchedule} />;
}

function NotFoundRoute({ onHome }) {
  return (
    <section style={{ padding: "140px 5% 100px", background: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", color: "#0A2540", fontSize: "clamp(30px, 5vw, 48px)", marginBottom: 14 }}>
          Page Not Found
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.62)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
          The page you requested does not exist.
        </p>
        <button
          type="button"
          onClick={onHome}
          style={{
            background: "linear-gradient(90deg, #00B4D8, #0077B6)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "14px 22px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </section>
  );
}
