// YRD. Technical Gallery v2: language selection is a persistent UI preference; content remains key-driven in translations.ts.
import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Language } from "@/content/translations";

type LanguageContextValue = { language: Language; copy: (typeof translations)[Language]; toggleLanguage: () => void };
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem("yrd-language") === "am" ? "am" : "en"));
  useEffect(() => { localStorage.setItem("yrd-language", language); document.documentElement.lang = language === "am" ? "am" : "en"; }, [language]);
  const toggleLanguage = () => setLanguage((current) => (current === "en" ? "am" : "en"));
  return <LanguageContext.Provider value={{ language, copy: translations[language], toggleLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
