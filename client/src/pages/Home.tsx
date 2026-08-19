// YRD. Technical Gallery: Home page with editorial hero, static client proof archive, selected work, and technical services.
import { Link } from "wouter";
import { useEffect, useState, type MouseEvent } from "react";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import SplitText from "@/components/SplitText";
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
      <section className="section">
        <div className="container-wide">
          <div className="section-head">
            <p className="eyebrow">
              <i className="signal-dot"></i>
              {copy.home.selectedKicker}
            </p>
            <div>
              <SplitText
                tag="h2"
                text={copy.home.selectedTitle}
                className="section-head-title"
                splitType="words"
                delay={30}
              />
              <p className="section-head-copy">{copy.home.selectedCopy}</p>
            </div>
          </div>
          <div className="project-list-v3">
            {copy.projects.map((project) => (
              <ScrollReveal key={project.id}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
          <div className="all-work-link-wrap">
            <Link href="/work" className="text-link all-work-link">
              {copy.actions.seeAllWork} <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Engineering Principle (ScrollReveal word-blur & reveal) */}
      <section className="statement-section">
        <div className="container-wide statement-inner">
          <p className="eyebrow">
            <i className="signal-dot"></i>
            {copy.home.principleKicker}
          </p>
          <div>
            <ScrollReveal
              baseOpacity={0.4}
              enableBlur={true}
              blurStrength={4}
              containerClassName="statement-scroll-wrap"
              textClassName="statement"
            >
              {copy.home.principle}
            </ScrollReveal>
            <p className="statement-support">{copy.home.principleCopy}</p>
          </div>
        </div>
      </section>

      {/* 5. Services Grid */}
      <section className="section">
        <div className="container-wide">
          <div className="service-intro">
            <SplitText
              tag="h2"
              text={copy.home.serviceTitle}
              className="service-title"
              splitType="words"
              delay={30}
            />
            <p className="service-aside">{copy.home.serviceAside}</p>
          </div>
          <div className="services-grid">
            {copy.services.map((service) => (
              <ScrollReveal key={service.id}>
                <article className="service-card">
                  <span className="service-id">{service.id}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brief About Teaser (ScrollReveal word blur) */}
      <section className="container-wide about-teaser">
        <p className="eyebrow">
          <i className="signal-dot"></i>
          {copy.home.aboutKicker}
        </p>
        <div>
          <ScrollReveal
            baseOpacity={0.4}
            enableBlur={true}
            blurStrength={4}
            textClassName="about-teaser-copy"
          >
            {copy.home.aboutTeaser}
          </ScrollReveal>
          <Link href="/about" className="text-link">
            {copy.actions.readMore} <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
