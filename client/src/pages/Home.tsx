// YRD. Technical Gallery v2: key-driven home page, quiet dot-field hero, and one rotating product word.
import { Link } from "wouter";
import { useEffect, useState, type MouseEvent } from "react";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import PartnerLoop from "@/components/PartnerLoop";
import GradualBlur from "@/components/GradualBlur";

export default function Home() {
  const { copy } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setWordIndex((current) => (current + 1) % copy.hero.words.length), 2200); return () => window.clearInterval(timer); }, [copy.hero.words.length]);
  const moveGrid = (event: MouseEvent<HTMLElement>) => { const box = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--grid-x", `${((event.clientX - box.left) / box.width - 0.5) * 18}px`); event.currentTarget.style.setProperty("--grid-y", `${((event.clientY - box.top) / box.height - 0.5) * 18}px`); };
  return (
    <>
      <section className="hero hero-v2" onMouseMove={moveGrid}>
        <div className="hero-dot-field" aria-hidden="true"></div>
        <div className="container-wide hero-v2-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker"><i className="signal-dot"></i>{copy.hero.kicker}</p>
            <h1 className="hero-title hero-title-v2"><span>{copy.hero.before}</span> <span key={copy.hero.words[wordIndex]} className="rotating-word">{copy.hero.words[wordIndex]}</span> <span>{copy.hero.after}</span></h1>
            <p className="hero-summary">{copy.hero.summary}</p>
            <div className="hero-actions">
              <Link href="/work" className="button">{copy.actions.viewWork} <span>→</span></Link>
              <a className="button button-dark" href="https://t.me/YRDscheduleBOT?start=intake" target="_blank" rel="noreferrer">{copy.actions.talk} <span>↗</span></a>
            </div>
            <p className="hero-availability">{copy.hero.availability}</p>
          </div>
          <span className="hero-index">{copy.hero.index}</span><span className="art-coordinate">{copy.hero.coordinate}</span>
        </div>
        <GradualBlur target="parent" position="bottom" height="4.5rem" strength={2} divCount={5} curve="bezier" exponential opacity={1} />
      </section>

      <PartnerLoop />

      <ScrollReveal><section className="section">
        <div className="container-wide">
          <div className="section-head">
            <p className="eyebrow"><i className="signal-dot"></i>{copy.home.selectedKicker}</p>
            <div>
              <h2 className="section-head-title">{copy.home.selectedTitle}</h2>
              <p className="section-head-copy">{copy.home.selectedCopy}</p>
            </div>
          </div>
          <div className="project-list">
            {copy.projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
          <Link href="/work" className="text-link all-work-link">{copy.actions.seeAllWork} <span>→</span></Link>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="statement-section">
        <div className="container-wide statement-inner">
          <p className="eyebrow"><i className="signal-dot"></i>{copy.home.principleKicker}</p>
          <h2 className="statement">{copy.home.principle}</h2>
          <p className="statement-support">{copy.home.principleCopy}</p>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="section">
        <div className="container-wide">
          <div className="service-intro">
            <h2 className="service-title">{copy.home.serviceTitle}</h2>
            <p className="service-aside">{copy.home.serviceAside}</p>
          </div>
          <div className="services-grid">
            {copy.services.map((service) => (
              <article className="service-card" key={service.id}>
                <span className="service-number">{service.id}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="container-wide about-teaser">
        <p className="eyebrow"><i className="signal-dot"></i>{copy.home.aboutKicker}</p>
        <div>
          <p className="about-teaser-copy">{copy.home.aboutTeaser}</p>
          <Link href="/about" className="text-link">{copy.actions.readMore} <span>→</span></Link>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="cta-section">
        <div className="container-wide cta-content">
          <p className="eyebrow"><i className="signal-dot"></i>{copy.home.ctaKicker}</p>
          <h2 className="cta-title">{copy.home.ctaTitle}</h2>
          <p className="cta-copy">{copy.home.ctaCopy}</p>
          <a className="button button-signal" href="https://t.me/YRDscheduleBOT?start=intake" target="_blank" rel="noreferrer">{copy.actions.startConversation} <span>↗</span></a>
          <p className="cta-note">{copy.home.ctaNote}</p>
        </div>
      </section></ScrollReveal>
    </>
  );
}
