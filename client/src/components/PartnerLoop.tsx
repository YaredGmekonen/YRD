/* YRD. Technical Gallery: client and partner names travel as a calm product-record loop. */
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import { useLanguage } from "@/contexts/LanguageContext";

const partnerRecords: Omit<LogoItem, "description">[] = [
  { title: "Kerkeha Tech Solutions", href: "https://kerkehatech.com/", src: "/manus-storage/kerkeha-tech_d3441c90.png" },
  { title: "SiliconLabs", node: "SILICONLABS" },
  { title: "XO Ethiopia", href: "/work#xo-ethiopia", src: "/manus-storage/xo-ethiopia_99b0676c.png" },
  { title: "Makiba Digital", src: "/manus-storage/makiba-digital-official-transparent_07a9fa6a.png" },
  { title: "Hope Photo Studio", src: "/manus-storage/hope-photo-studio_18028aeb.png" },
  { title: "EYEA", href: "https://eyea.et/", src: "/manus-storage/eyea_b865915d.png" },
];

export default function PartnerLoop() {
  const { copy } = useLanguage();
  const partners: LogoItem[] = partnerRecords.map((partner, index) => ({ ...partner, description: copy.partners.entries[index] }));
  return (
    <section className="partner-section partner-section-marquee" aria-label={copy.partners.ariaLabel}>
      <div className="container-wide">
        <p className="eyebrow"><i className="signal-dot"></i>{copy.partners.kicker}</p>
      </div>
      <div className="partner-loop-shell">
        <LogoLoop logos={partners} ariaLabel={copy.partners.ariaLabel} />
      </div>
    </section>
  );
}
