import { useState, useEffect, useRef } from "react";
import { useSEO, SEO_CONFIGS } from "./seo/useSEO";
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
import CTABanner from "./components/sections/CTABanner";
import Contact from "./components/sections/Contact";
import ServiceDetail from "./components/service-pages/ServiceDetail";

export default function CyveraPortfolio() {
  const [view, setView] = useState("home");
  const isDetail = view !== "home";
  const pendingHash = useRef("");
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  // ── Dynamic SEO: update <head> meta whenever the view changes ──
  useEffect(() => {
    const config = SEO_CONFIGS[view] || SEO_CONFIGS.home;
    useSEO(config);
  }, [view]);

  useEffect(() => {
    if (view !== "home") {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      window.scrollTo(0, 0);
      return;
    }
    if (pendingHash.current) {
      const nextHash = pendingHash.current;
      pendingHash.current = "";
      requestAnimationFrame(() => { window.location.hash = nextHash; });
      return;
    }
    window.scrollTo(0, 0);
  }, [view]);

  const goHome = (hash) => {
    if (hash) pendingHash.current = hash;
    setView("home");
  };

  const openScheduler = () => setSchedulerOpen(true);
  const closeScheduler = () => setSchedulerOpen(false);
  const goService = (serviceId) => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setView(serviceId);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  return (
      <div>
        <Navbar
          isDetail={isDetail}
          onHome={goHome}
          onSchedule={openScheduler}
          onSelectService={goService}
          onFAQ={() => setView("faq")}
        />
        <main>
          {view === "home" ? (
              <>
                <Hero onSchedule={openScheduler} />
                <MarqueeStrip />
                <Services onSelect={(id) => setView(id)} />
                <StatsStrip />
                <WhyCyvera />
                <Portfolio />
                <Process />
                <Testimonials />
                <CTABanner onSchedule={openScheduler} />
                <Contact />
              </>
          ) : view === "faq" ? (
              <FAQPage onBack={() => setView("home")} onSchedule={openScheduler} />
          ) : (
              <ServiceDetail serviceId={view} onBack={() => setView("home")} onSchedule={openScheduler} />
          )}
        </main>
        <SchedulerModal open={schedulerOpen} onClose={closeScheduler} />
        <Footer onNavigate={goHome} onSelectService={goService} onFAQ={() => setView("faq")} />
      </div>
  );
}
