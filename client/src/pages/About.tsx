// YRD. Technical Gallery: biography, methodology, and direct working process.
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import SplitText from "@/components/SplitText";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { copy } = useLanguage();
  return (
    <>
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <p className="eyebrow">
            <i className="signal-dot"></i>
            {copy.about.kicker}
          </p>
          <div className="page-hero-copy">
            <div>
              <h1 className="page-title">{copy.about.title}</h1>
              <p className="page-intro">{copy.about.intro}</p>
            </div>
            <div className="page-hero-status">
              {copy.about.status.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Context Biography */}
      <section className="container-wide about-layout">
        <p className="eyebrow">
          <i className="signal-dot"></i>
          {copy.about.contextKicker}
        </p>
        <div>
          <ScrollReveal
            baseOpacity={0.4}
            enableBlur={true}
            blurStrength={4}
            textClassName="about-lede"
          >
            {copy.about.lede}
          </ScrollReveal>
          {copy.about.paragraphs.map((paragraph) => (
            <p className="about-intro" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Process list */}
      <section className="section section-rule">
        <div className="container-wide process-block">
          <p className="eyebrow">
            <i className="signal-dot"></i>
            {copy.about.processKicker}
          </p>
          <div className="process-list">
            {copy.about.process.map(([id, title, description]) => (
              <ScrollReveal key={id}>
                <article className="process-item">
                  <span className="meta-label">{id}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Expectations grid */}
      <section className="section section-rule">
        <div className="container-wide process-block">
          <p className="eyebrow">
            <i className="signal-dot"></i>
            {copy.about.expectKicker}
          </p>
          <div className="expect-list">
            {copy.about.expectations.map((expectation, index) => (
              <ScrollReveal key={expectation}>
                <article className="expect-item">
                  <span>0{index + 1}</span>
                  <p>{expectation}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
