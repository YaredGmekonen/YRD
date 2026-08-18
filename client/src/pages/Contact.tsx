// YRD. Technical Gallery v2: key-driven direct contact page, prioritising Telegram while keeping every verified channel visible.
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { copy } = useLanguage();
  return (
    <section className="container-wide contact-layout">
      <p className="eyebrow"><i className="signal-dot"></i>{copy.contact.kicker}</p>
      <div className="contact-content">
        <div className="contact-catalogue">{copy.contact.catalogue.map((item) => <span key={item}>{item}</span>)}</div>
        <h1 className="contact-title">{copy.contact.title}</h1>
        <p className="contact-copy">{copy.contact.copy}</p>
        <div className="contact-primary"><a className="button button-signal" href="https://t.me/YRDscheduleBOT?start=intake" target="_blank" rel="noreferrer">{copy.contact.primary} <span>↗</span></a></div>
        <p className="contact-direct-note">{copy.contact.directPrefix} <a href="https://t.me/Yada_cve" target="_blank" rel="noreferrer">{copy.contact.directLink} ↗</a></p>
        <div className="contact-list">
          <div className="contact-row"><span className="meta-label">{copy.contact.labels[0]}</span><a href="tel:+251939484533">+251 93 948 4533</a></div>
          <div className="contact-row"><span className="meta-label">{copy.contact.labels[1]}</span><a href="mailto:yaredmekonen405@gmail.com">yaredmekonen405@gmail.com</a></div>
          <div className="contact-row"><span className="meta-label">{copy.contact.labels[2]}</span><a href="https://linkedin.com/in/yared-mekonen-5272642ba" target="_blank" rel="noreferrer">Yared Mekonen ↗</a></div>
          <div className="contact-row"><span className="meta-label">{copy.contact.labels[3]}</span><a href="https://www.instagram.com/yared1052/" target="_blank" rel="noreferrer">@yared1052 ↗</a></div>
        </div>
        <p className="contact-status"><i className="signal-dot"></i>{copy.contact.status}</p>
      </div>
    </section>
  );
}
