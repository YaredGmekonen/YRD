// YRD. Technical Gallery: full project archive showcasing all 3 verified case studies.
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectCard from "@/components/ProjectCard";

export default function Work() {
  const { copy } = useLanguage();

  return (
    <>
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <p className="eyebrow">
            <i className="signal-dot"></i>
            {copy.work.kicker}
          </p>
          <div className="page-hero-copy">
            <div>
              <h1 className="page-title">{copy.work.title}</h1>
              <p className="page-intro">{copy.work.intro}</p>
            </div>
            <div className="page-hero-status">
              {copy.work.status.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Work Archive Grid */}
      <ScrollReveal>
        <section className="section">
          <div className="container-wide">
            <div className="project-list-v3">
              {copy.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="all-work-link-wrap">
              <Link href="/contact" className="text-link all-work-link">
                {copy.actions.projectPrompt} <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
