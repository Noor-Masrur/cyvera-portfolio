import SocialMediaMarketing from "./SocialMediaMarketing";
import SEOService from "./SEOService";
import CybersecurityService from "./CybersecurityService";
import WebsiteDevService from "./WebsiteDevService";
import CustomSoftwareService from "./CustomSoftwareService";

export default function ServiceDetail({ serviceId, onBack, onSchedule }) {
  if (serviceId === "social-media") return <SocialMediaMarketing onBack={onBack} onSchedule={onSchedule} />;
  if (serviceId === "seo") return <SEOService onBack={onBack} onSchedule={onSchedule} />;
  if (serviceId === "cybersecurity") return <CybersecurityService onBack={onBack} onSchedule={onSchedule} />;
  if (serviceId === "website-dev") return <WebsiteDevService onBack={onBack} onSchedule={onSchedule} />;
  if (serviceId === "custom-software") return <CustomSoftwareService onBack={onBack} onSchedule={onSchedule} />;
  return (
    <section style={{ padding: "140px 5% 100px", background: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", color: "#0A2540", fontSize: "clamp(30px, 5vw, 48px)", marginBottom: 14 }}>
          Service Not Found
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.62)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
          The requested service page does not exist. Return home to browse available services.
        </p>
        <button
          type="button"
          onClick={onBack}
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
