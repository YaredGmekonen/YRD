// YRD. Technical Gallery v2: key-driven individual-builder biography with an ordered product-led working process.
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { copy } = useLanguage();
  return (
    <>
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <p className="eyebrow"><i className="signal-dot"></i>{copy.about.kicker}</p>
          <div className="page-hero-copy"><div><h1 className="page-title">{copy.about.title}</h1><p className="page-intro">{copy.about.intro}</p></div><div className="page-hero-status">{copy.about.status.map((item) => <span key={item}>{item}</span>)}</div></div>
        </div>
      </section>

      <ScrollReveal><section className="container-wide about-layout">
        <p className="eyebrow"><i className="signal-dot"></i>{copy.about.contextKicker}</p>
        <div>
          <p className="about-lede">{copy.about.lede}</p>
          {copy.about.paragraphs.map((paragraph) => <p className="about-intro" key={paragraph}>{paragraph}</p>)}
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="section section-rule">
        <div className="container-wide process-block">
          <p className="eyebrow"><i className="signal-dot"></i>{copy.about.processKicker}</p>
          <div className="process-list">
            {copy.about.process.map(([id, title, description]) => <article className="process-item" key={id}><span className="meta-label">{id}</span><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="section section-rule">
        <div className="container-wide process-block">
          <p className="eyebrow"><i className="signal-dot"></i>{copy.about.expectKicker}</p>
          <div className="expect-list">
            {copy.about.expectations.map((expectation, index) => <article className="expect-item" key={expectation}><span>0{index + 1}</span><p>{expectation}</p></article>)}
          </div>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="cta-section">
        <div className="container-wide cta-content">
          <p className="eyebrow"><i className="signal-dot"></i>{copy.about.ctaKicker}</p>
          <h2 className="cta-title">{copy.about.ctaTitle}</h2>
          <Link href="/contact" className="button button-signal">{copy.actions.getInTouch} <span>→</span></Link>
        </div>
      </section></ScrollReveal>
    </>
  );
}
