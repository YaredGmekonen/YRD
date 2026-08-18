// YRD. Technical Gallery v2: a key-driven archive footer with official mark and direct contact paths.
import { Link } from "wouter";
import BrandLogo from "@/components/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteFooter() {
  const { copy } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-main">
          <div>
            <Link href="/" className="brand-link" aria-label="YRD. home"><BrandLogo /></Link>
            <p className="footer-tagline">{copy.footer.tagline}</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/work">{copy.nav.work}</Link>
            <Link href="/about">{copy.nav.about}</Link>
            <Link href="/contact">{copy.nav.contact}</Link>
          </nav>
          <div className="footer-links" aria-label="Social links">
            <a href="https://t.me/Yada_cve" target="_blank" rel="noreferrer">{copy.footer.social[0]}</a>
            <a href="https://linkedin.com/in/yared-mekonen-5272642ba" target="_blank" rel="noreferrer">{copy.footer.social[1]}</a>
            <a href="https://www.instagram.com/yared1052/" target="_blank" rel="noreferrer">{copy.footer.social[2]}</a>
            <a href="mailto:yaredmekonen405@gmail.com">{copy.footer.social[3]}</a>
          </div>
        </div>
        <div className="footer-meta">
          <span>{copy.footer.location}</span>
          <span>{copy.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
