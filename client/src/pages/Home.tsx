// YRD. Technical Gallery: Home page with editorial hero, static client proof archive, selected work, and technical services.
import { Link } from "wouter";
import { useEffect, useState, type MouseEvent } from "react";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import PartnerLoop from "@/components/PartnerLoop";

export default function Home() {
  const { copy } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setWordIndex((current) => (current + 1) % copy.hero.words.length),
      2400
    );
    return () => window.clearInterval(timer);
  }, [copy.hero.words.length]);

  const moveGrid = (event: MouseEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--grid-x",
      `${((event.clientX - box.left) / box.width - 0.5) * 18}px`
    );
    event.currentTarget.style.setProperty(
      "--grid-y",
      `${((event.clientY - box.top) / box.height - 0.5) * 18}px`
    );
  };

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero hero-v2" onMouseMove={moveGrid}>
        <div className="hero-dot-field" aria-hidden="true"></div>
        <div className="container-wide hero-v2-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">
              <i className="signal-dot"></i>
              {copy.hero.kicker}
            </p>
            <h1 className="hero-title hero-title-v2">
              <span>{copy.hero.before}</span>{" "}
              <span key={copy.hero.words[wordIndex]} className="rotating-word">
                {copy.hero.words[wordIndex]}
              </span>{" "}
              <span>{copy.hero.after}</span>
            </h1>
            <p className="hero-summary">{copy.hero.summary}</p>
            <div className="hero-actions">
              <Link href="/work" className="button">
                {copy.actions.viewWork} <span>→</span>
              </Link>
              <a
                className="button button-dark"
                href="https://t.me/YRDscheduleBOT?start=intake"
                target="_blank"
                rel="noreferrer"
              >
                {copy.actions.talk} <span>↗</span>
              </a>
            </div>
            <p className="hero-availability">{copy.hero.availability}</p>
          </div>
          <span className="hero-index">{copy.hero.index}</span>
          <span className="art-coordinate">{copy.hero.coordinate}</span>
        </div>
      </section>

      {/* 2. Static Client Proof Archive */}
      <PartnerLoop />

      {/* 3. Selected Work */}
      <ScrollReveal>
        <section className="section">
          <div className="container-wide">
            <div className="section-head">
              <p className="eyebrow">
                <i className="signal-dot"></i>
                {copy.home.selectedKicker}
              </p>
              <div>
                <h2 className="section-head-title">{copy.home.selectedTitle}</h2>
                <p className="section-head-copy">{copy.home.selectedCopy}</p>
              </div>
            </div>
            <div className="project-list-v3">
              {copy.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="all-work-link-wrap">
              <Link href="/work" className="text-link all-work-link">
                {copy.actions.seeAllWork} <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 4. Principle Section */}
      <ScrollReveal>
        <section className="statement-section">
          <div className="container-wide statement-inner">
            <p className="eyebrow">
              <i className="signal-dot"></i>
              {copy.home.principleKicker}
            </p>
            <div>
              <h2 className="statement">{copy.home.principle}</h2>
              <p className="statement-support">{copy.home.principleCopy}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 5. Services Grid */}
      <ScrollReveal>
        <section className="section">
          <div className="container-wide">
            <div className="service-intro">
              <h2 className="service-title">{copy.home.serviceTitle}</h2>
              <p className="service-aside">{copy.home.serviceAside}</p>
            </div>
            <div className="services-grid">
              {copy.services.map((service) => (
                <article className="service-card" key={service.id}>
                  <span className="service-id">{service.id}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 6. Brief About Teaser */}
      <ScrollReveal>
        <section className="container-wide about-teaser">
          <p className="eyebrow">
            <i className="signal-dot"></i>
            {copy.home.aboutKicker}
          </p>
          <div>
            <p className="about-teaser-copy">{copy.home.aboutTeaser}</p>
            <Link href="/about" className="text-link">
              {copy.actions.readMore} <span>→</span>
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
