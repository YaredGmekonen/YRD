// YRD. Technical Gallery: iconic glowing consultation card & structured 3-column footer.
import { Link } from "wouter";
import BrandLogo from "@/components/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  const { copy, language } = useLanguage();
  const footer = copy.footer;

  return (
    <footer className="site-footer">
      {/* 1. Large Glowing Consultation Card */}
      <div className="container-wide footer-card-container">
        <div className="glow-consultation-card">
          <div className="glow-card-ambient" aria-hidden="true"></div>
          <div className="glow-card-content">
            <p className="eyebrow glow-kicker">
              <i className="signal-dot"></i>
              {language === "am" ? "ለተገቢው ስራ ዝግጁ ነኝ" : "AVAILABLE FOR THE RIGHT WORK"}
            </p>

            <h2 className="glow-card-title">
              <span className="accent-h">H</span>ave something <br className="hidden sm:inline" />
              worth building?
            </h2>

            <p className="glow-card-desc">
              {language === "am"
                ? "ምን ላይ እንደምትሰሩ ይንገሩኝ፤ ሀሳቤን እነግራችኋለሁ።"
                : "Tell me what you're working on. I'll tell you what I think."}
            </p>

            <a
              className="glow-card-btn"
              href="https://t.me/YRDscheduleBOT?start=intake"
              target="_blank"
              rel="noreferrer"
            >
              <span className="glow-btn-icon">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </span>
              <span>{footer.ctaButton}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Structured Footer Columns */}
      <div className="container-wide">
        <div className="footer-columns-grid">
          {/* Col 1: Brand & Social */}
          <div className="footer-col-brand">
            <Link href="/" className="brand-link" aria-label="YRD. home">
              <BrandLogo variant="wordmark" className="footer-brand-logo" />
            </Link>
            <p className="footer-tagline">{footer.tagline}</p>

            <div className="footer-social-circles">
              <a
                href="https://t.me/Yada_cve"
                target="_blank"
                rel="noreferrer"
                className="social-circle-btn"
                aria-label="Telegram"
              >
                <Send size={15} />
              </a>
              <a
                href="https://linkedin.com/in/yared-mekonen-5272642ba"
                target="_blank"
                rel="noreferrer"
                className="social-circle-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://www.instagram.com/yared1052/"
                target="_blank"
                rel="noreferrer"
                className="social-circle-btn"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="mailto:yaredmekonen405@gmail.com"
                className="social-circle-btn"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigate */}
          <div className="footer-col-nav">
            <span className="footer-col-title">{language === "am" ? "አሰሳ" : "Navigate"}</span>
            <nav className="footer-nav-list">
              <Link href="/work">{copy.nav.work}</Link>
              <Link href="/about">{copy.nav.about}</Link>
              <Link href="/contact">{copy.nav.contact}</Link>
            </nav>
          </div>

          {/* Col 3: Connect */}
          <div className="footer-col-connect">
            <span className="footer-col-title">{language === "am" ? "ግንኙነት" : "Connect"}</span>
            <div className="footer-connect-list">
              <a href="https://t.me/Yada_cve" target="_blank" rel="noreferrer">
                @yada_cve
              </a>
              <a href="mailto:yaredmekonen405@gmail.com">yaredmekonen405@gmail.com</a>
              <span className="footer-location-text">
                {language === "am" ? "አዲስ አበባ፣ ኢትዮጵያ" : "ADDIS ABABA, ETHIOPIA"}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Bottom Meta Bar */}
        <div className="footer-meta-bar">
          <span>{footer.copyright}</span>
          <span className="footer-meta-loc">{footer.location}</span>
        </div>
      </div>
    </footer>
  );
}
