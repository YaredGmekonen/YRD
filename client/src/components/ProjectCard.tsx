// YRD. Technical Gallery: project card with 70% desktop and 30% mobile mockup composition, monochrome at rest.
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export type ProjectItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  role: string;
  timeline: string;
  status: string;
  description: string;
  desktopImage: string;
  mobileImage?: string;
  stack: readonly string[];
  externalUrl?: string;
};

export default function ProjectCard({ project }: { project: ProjectItem }) {
  const { copy } = useLanguage();

  return (
    <article className="project-card-v3">
      {/* Left Info Column */}
      <div className="project-card-info">
        <div className="project-card-header">
          <span className="project-card-num">INDEX / {project.id}</span>
          <span className="project-card-badge">{project.status}</span>
        </div>

        <div className="project-card-body">
          <span className="project-card-category">{project.category}</span>
          <h3 className="project-card-title">
            <Link href={`/work/${project.slug}`}>{project.name}</Link>
          </h3>
          <p className="project-card-desc">{project.description}</p>

          <div className="project-card-stack">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="stack-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="project-card-footer">
          <Link href={`/work/${project.slug}`} className="text-link project-cta-link">
            {copy.actions.viewProject} <span>→</span>
          </Link>
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="text-link is-muted"
            >
              {copy.actions.launchLive}
            </a>
          )}
        </div>
      </div>

      {/* Right Dual Mockup Stage: 70% Desktop / 30% Mobile */}
      <Link href={`/work/${project.slug}`} className="project-mockup-stage" aria-label={`View ${project.name} case study`}>
        <div className="desktop-mockup-wrapper">
          <img
            src={project.desktopImage}
            alt={`${project.name} Desktop Interface`}
            className="mockup-img desktop-img"
          />
          <span className="mockup-label">Desktop View</span>
        </div>
        {project.mobileImage && (
          <div className="mobile-mockup-wrapper">
            <img
              src={project.mobileImage}
              alt={`${project.name} Mobile Interface`}
              className="mockup-img mobile-img"
            />
            <span className="mockup-label">Mobile UI</span>
          </div>
        )}
      </Link>
    </article>
  );
}
