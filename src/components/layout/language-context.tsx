"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "pt" | "en";
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void };

const LanguageContext = createContext<LanguageContextValue>({ language: "pt", setLanguage: () => {} });

// Compartilha o idioma escolhido entre os componentes.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  // Atualiza o idioma do documento para os leitores de tela.
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);
  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Permite consultar e trocar o idioma nos componentes.
export function useLanguage() {
  return useContext(LanguageContext);
}