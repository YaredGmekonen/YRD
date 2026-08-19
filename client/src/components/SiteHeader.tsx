// YRD. Technical Gallery v2: official mark, utility controls, and a focused mobile information panel.
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function SiteHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { copy, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigation = [
    { href: "/work", label: copy.nav.work },
    { href: "/about", label: copy.nav.about },
    { href: "/contact", label: copy.nav.contact },
  ];

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className="site-header">
      <div className="container-wide">
        <div className="header-inner">
          <Link href="/" className="brand-link" title="YRD. Home" onClick={closeMenu}>
            <BrandLogo />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${location === item.href ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <div className="utility-controls" role="group" aria-label="Website preferences">
              <button
                className="utility-button utility-language"
                type="button"
                onClick={toggleLanguage}
                title="Switch Language (English / Amharic)"
              >
                EN / <strong>{copy.langToggle}</strong>
              </button>
              <button
                className="utility-button utility-theme"
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
            <a
              className="button header-talk"
              href="https://t.me/YRDscheduleBOT?start=intake"
              target="_blank"
              rel="noreferrer"
            >
              {copy.nav.talk}
            </a>
            <button
              className="menu-button"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span>{menuOpen ? copy.nav.close : copy.nav.menu}</span>
              <span className="menu-lines" aria-hidden="true">
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-menu is-open"
            aria-label="Mobile navigation"
          >
            <div className="mobile-nav-links">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${location === item.href ? "is-active" : ""}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <a
                className="nav-link"
                href="https://t.me/YRDscheduleBOT?start=intake"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
              >
                {copy.nav.talk} ↗
              </a>
            </div>
            <div className="mobile-menu-meta">
              <span className="eyebrow">
                <i className="signal-dot"></i>
                {copy.footer.location}
              </span>
              <a href="tel:+251939484533">+251 93 948 4533</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
