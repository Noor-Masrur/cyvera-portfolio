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
  return null;
}
