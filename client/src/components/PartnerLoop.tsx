// YRD. Technical Gallery: static client proof archive grid with 6 verified partner records and central practice panel.
import { useLanguage } from "@/contexts/LanguageContext";

export default function PartnerLoop() {
  const { copy } = useLanguage();
  const proof = copy.clientProof;

  return (
    <section className="client-proof-section" aria-label={proof.kicker}>
      <div className="container-wide">
        {/* Section Header */}
        <div className="client-proof-header">
          <p className="eyebrow">
            <i className="signal-dot"></i>
            {proof.kicker}
          </p>
          <p className="client-proof-note">{proof.note}</p>
        </div>

        {/* Static Archive Grid */}
        <div className="client-proof-grid">
          {/* Central Feature Panel with Verified Practice Statement */}
          <div className="client-feature-panel">
            <span className="meta-label">Practice Standard / 001</span>
            <h3 className="client-feature-statement">{proof.statement}</h3>
            <p className="client-feature-meta">Addis Ababa, ET · High-Scale Architecture</p>
          </div>

          {/* 6 Real Logos in Equal Bordered Cells */}
          <div className="client-cells-wrapper">
            {proof.clients.map((client, index) => {
              const cellContent = (
                <div className="client-cell-inner">
                  <span className="client-cell-index">0{index + 1}</span>
                  <div className="client-logo-box">
                    <img src={client.logo} alt={client.name} className="client-logo-img" />
                  </div>
                  <div className="client-cell-info">
                    <h4 className="client-name">{client.name}</h4>
                    <span className="client-role">{client.role}</span>
                  </div>
                </div>
              );

              return client.href ? (
                <a
                  key={client.name}
                  href={client.href}
                  target={client.href.startsWith("http") ? "_blank" : undefined}
                  rel={client.href.startsWith("http") ? "noreferrer" : undefined}
                  className="client-cell client-cell-link"
                >
                  {cellContent}
                </a>
              ) : (
                <div key={client.name} className="client-cell">
                  {cellContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
