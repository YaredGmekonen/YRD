/* YRD. Technical Gallery: a pause-on-hover serial logo ticker for verified partners and clients. */
import type { ReactNode } from "react";

export type LogoItem = { title: string; description: string; href?: string; src?: string; node?: ReactNode };
type LogoLoopProps = { logos: LogoItem[]; ariaLabel: string; className?: string };

function LogoItemView({ item }: { item: LogoItem }) {
  const mark = item.src ? <img src={item.src} alt={item.title} loading="lazy" decoding="async" /> : <span className="logo-loop-wordmark">{item.node ?? item.title}</span>;
  const isExternal = item.href?.startsWith("http");
  const content = <span className="logo-loop-mark">{mark}</span>;
  return <li className="logo-loop-item">{item.href ? <a href={item.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer noopener" : undefined} aria-label={item.title}>{content}</a> : <span className="logo-loop-static" tabIndex={0} aria-label={item.title}>{content}</span>}</li>;
}

export default function LogoLoop({ logos, ariaLabel, className = "" }: LogoLoopProps) {
  return (
    <div className={`logo-loop ${className}`} role="region" aria-label={ariaLabel}>
      <div className="logo-loop-track">
        {[0, 1].map((copyIndex) => <ul className="logo-loop-list" key={copyIndex} aria-hidden={copyIndex === 1}>{logos.map((item, index) => <LogoItemView item={item} key={`${copyIndex}-${index}`} />)}</ul>)}
      </div>
    </div>
  );
}
