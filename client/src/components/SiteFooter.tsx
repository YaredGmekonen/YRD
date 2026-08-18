// YRD. Technical Gallery: persistent footer with primary site-wide consultation banner and direct contact channels.
import { Link } from "wouter";
import BrandLogo from "@/components/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteFooter() {
  const { copy } = useLanguage();
  const footer = copy.footer;

  return (
    <footer className="site-footer">
      {/* Primary Site-Wide Consultation Banner */}
      <section className="footer-consultation-banner">
        <div className="container-wide footer-consultation-inner">
          <div className="footer-consultation-copy">
            <p className="eyebrow">
              <i className="signal-dot"></i>
              Project Intake & Advisory
            </p>
            <h2 className="footer-consultation-title">{footer.consultationTitle}</h2>
            <p className="footer-consultation-desc">{footer.consultationCopy}</p>
          </div>
          <div className="footer-consultation-action">
            <a
              className="button button-signal consultation-btn"
              href="https://t.me/YRDscheduleBOT?start=intake"
              target="_blank"
              rel="noreferrer"
            >
              {footer.ctaButton} <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Global Footer Links & Meta */}
      <div className="container-wide">
        <div className="footer-main">
          <div>
            <Link href="/" className="brand-link" aria-label="YRD. home">
              <BrandLogo />
            </Link>
            <p className="footer-tagline">{footer.tagline}</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/work">{copy.nav.work}</Link>
            <Link href="/about">{copy.nav.about}</Link>
            <Link href="/contact">{copy.nav.contact}</Link>
          </nav>
          <div className="footer-links" aria-label="Social links">
            <a href="https://t.me/Yada_cve" target="_blank" rel="noreferrer">
              {footer.social[0]}
            </a>
            <a
              href="https://linkedin.com/in/yared-mekonen-5272642ba"
              target="_blank"
              rel="noreferrer"
            >
              {footer.social[1]}
            </a>
            <a href="https://www.instagram.com/yared1052/" target="_blank" rel="noreferrer">
              {footer.social[2]}
            </a>
            <a href="mailto:yaredmekonen405@gmail.com">{footer.social[3]}</a>
          </div>
        </div>
        <div className="footer-meta">
          <span>{footer.location}</span>
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
