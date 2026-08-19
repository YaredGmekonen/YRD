import { Link, useRoute } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import NumberTicker from "@/components/NumberTicker";
import { useLanguage } from "@/contexts/LanguageContext";
import NotFound from "@/pages/NotFound";

export default function ProjectDetail() {
  const [, params] = useRoute("/work/:slug");
  const { copy } = useLanguage();
  const slug = params?.slug;

  const projectIndex = copy.projects.findIndex((p) => p.slug === slug);
  const project = copy.projects[projectIndex];

  if (!project) {
    return <NotFound />;
  }

  const nextIndex = (projectIndex + 1) % copy.projects.length;
  const nextProject = copy.projects[nextIndex];

  return (
    <div className="project-detail-page">
      {/* Project Hero */}
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <div className="detail-breadcrumb">
            <Link href="/work" className="text-link detail-back-link">
              {copy.actions.backToArchive}
            </Link>
            <p className="eyebrow">
              <i className="signal-dot"></i>
              {project.id} / {project.category}
            </p>
          </div>

          <div className="page-hero-copy">
            <div>
              <h1 className="page-title">{project.name}</h1>
              <p className="page-intro">{project.description}</p>
              {project.externalUrl && (
                <div className="detail-hero-actions">
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-signal"
                  >
                    {copy.actions.launchLive}
                  </a>
                </div>
              )}
            </div>
            <div className="page-hero-status">
              <span>STATUS: {project.status}</span>
              <span>TIMELINE: {project.timeline}</span>
              <span>ROLE: {project.role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Mockup Showcase (70% Desktop / 30% Mobile) */}
      <section className="detail-media-section">
        <div className="container-wide">
          <div className="detail-mockup-stage">
            <div className="detail-desktop-frame">
              <img src={project.desktopImage} alt={`${project.name} Desktop Interface`} />
              <span className="case-study-media-label">Desktop System · 01</span>
            </div>
            {project.mobileImage && (
              <div className="detail-mobile-frame">
                <img src={project.mobileImage} alt={`${project.name} Mobile View`} />
                <span className="case-study-media-label">Mobile UI · 02</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technical Facts & Architecture Breakdown */}
      <section className="section section-rule">
        <div className="container-wide">
          <div className="case-study-grid">
            {/* Metadata Sidebar */}
            <aside className="case-facts">
              <div className="case-fact">
                <span className="meta-label">Role & Scope</span>
                <p>{project.role}</p>
              </div>
              <div className="case-fact">
                <span className="meta-label">Category</span>
                <p>{project.category}</p>
              </div>
              <div className="case-fact">
                <span className="meta-label">Platform Status</span>
                <p>{project.status}</p>
              </div>
              <div className="case-fact">
                <span className="meta-label">Technical Stack</span>
                <div className="detail-stack-tags">
                  {project.stack.map((tech) => (
                    <span key={tech} className="detail-stack-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <div className="case-fact">
                  <span className="meta-label">System Metrics</span>
                  <div className="detail-metrics-grid">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="detail-metric-item">
                        <NumberTicker value={metric.value} className="detail-metric-value" />
                        <span className="detail-metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Case Study Deep-Dive Blocks */}
            <div className="case-body">
              {project.caseBlocks.map((block) => (
                <ScrollReveal key={block.title}>
                  <article className="case-body-block">
                    <h3>{block.title}</h3>
                    <p>{block.content}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="section-rule detail-nav-section">
        <div className="container-wide detail-nav-container">
          <Link href="/work" className="button button-dark">
            {copy.actions.backToArchive}
          </Link>

          <div className="detail-next-link-wrap">
            <span className="eyebrow">{copy.actions.nextProject}</span>
            <Link href={`/work/${nextProject.slug}`} className="detail-next-title">
              {nextProject.name} <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
