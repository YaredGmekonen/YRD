// YRD. Technical Gallery v2: key-driven archive-row card with restrained cursor-responsive depth.
import type { MouseEvent } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

type Project = { id: string; name: string; description: string; role: string; href?: string; image?: string; placeholder?: boolean };

function applyTilt(event: MouseEvent<HTMLElement>) {
  const target = event.currentTarget;
  const bounds = target.getBoundingClientRect();
  const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
  const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
  target.style.setProperty("--tilt-y", `${horizontal * 2.2}deg`);
  target.style.setProperty("--tilt-x", `${vertical * -1.6}deg`);
}

function clearTilt(event: MouseEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
}

export default function ProjectCard({ project }: { project: Project }) {
  const { copy } = useLanguage();
  return (
    <article className={`project-card ${project.placeholder ? "is-placeholder" : ""}`} onMouseMove={applyTilt} onMouseLeave={clearTilt}>
      <div className="project-card-index"><span className="meta-label">{project.id}</span></div>
      <div className="project-card-copy">
        <div>
          <h3 className="project-card-title">{project.name}</h3>
          <p className="project-card-description">{project.description}</p>
          <p className="project-card-role">{project.role}</p>
        </div>
        {project.href ? <Link href={project.href} className="text-link">{copy.actions.viewProject} <span>→</span></Link> : <span className="text-link is-muted">{copy.actions.recordUnavailable}</span>}
      </div>
      <div className="project-visual" aria-hidden="true">
        {project.image ? <img src={project.image} alt="" /> : <div className="visual-placeholder"><span>REC / {project.id}</span><span>{copy.actions.recordUnavailable}</span><i></i></div>}
      </div>
    </article>
  );
}
