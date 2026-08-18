// YRD. Technical Gallery v2: translation-key project archive for a single verified case study and reserved future records.
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Work() {
  const { copy } = useLanguage();
  return (
    <>
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <p className="eyebrow"><i className="signal-dot"></i>{copy.work.kicker}</p>
          <div className="page-hero-copy">
            <div><h1 className="page-title">{copy.work.title}</h1><p className="page-intro">{copy.work.intro}</p></div>
            <div className="page-hero-status">{copy.work.status.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </div>
      </section>

      <ScrollReveal><section id="xo-ethiopia" className="case-study">
        <div className="container-wide">
          <div className="case-study-header">
            <p className="eyebrow"><i className="signal-dot"></i>{copy.work.featuredKicker}</p>
            <h2 className="case-study-name">{copy.work.caseTitle}</h2>
          </div>
          <div className="case-study-media">
            <img src="/manus-storage/yrd-xo-project-visual_d08df681.png" alt={copy.work.mediaLabel} />
            <span className="case-study-media-label">{copy.work.mediaLabel}</span>
          </div>
          <div className="case-grid">
            <div className="case-facts">
              {copy.work.facts.map(([label, value]) => <div className="case-fact" key={label}><span className="meta-label">{label}</span><p>{value}</p></div>)}
            </div>
            <div className="case-body">
              {copy.work.caseBlocks.map(([title, content]) => <article className="case-body-block" key={title}><h3>{title}</h3><p>{content}</p></article>)}
            </div>
          </div>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="section section-rule">
        <div className="container-wide">
          <div className="section-head">
            <p className="eyebrow"><i className="signal-dot"></i>{copy.work.nextKicker}</p>
            <div><h2 className="section-head-title">{copy.work.nextTitle}</h2><p className="section-head-copy">{copy.work.nextCopy}</p></div>
          </div>
          <div className="placeholder-grid">
            {copy.projects.slice(1).map((project) => (
              <article className="case-placeholder" key={project.id}>
                <span className="meta-label">{project.id} / {copy.work.reservation}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
          <Link href="/contact" className="text-link all-work-link">{copy.actions.projectPrompt} <span>→</span></Link>
        </div>
      </section></ScrollReveal>
    </>
  );
}
