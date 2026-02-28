import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSEO as applySEO, SEO_CONFIGS } from "./seo/useSEO";
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
  const location = useLocation();
  const navigate = useNavigate();
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  const isDetail = location.pathname !== "/";

  useEffect(() => {
    const path = location.pathname;
    const serviceId = path.startsWith("/services/") ? path.split("/")[2] : null;
    const viewKey = serviceId || (path === "/faq" ? "faq" : "home");
    const config = SEO_CONFIGS[viewKey] || SEO_CONFIGS.home;
    applySEO(config);
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
        isDetail={isDetail}
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
            path="/services/:serviceId"
            element={<ServiceDetailRoute onBack={() => navigate("/")} onSchedule={openScheduler} />}
          />
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
