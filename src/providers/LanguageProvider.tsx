// [Frontend Admin] src/providers/LanguageProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { apiFetch, API_BASE_URL } from "@/lib/api-client"; 

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isLoaded, setIsLoaded] = useState(false); // Prevents text flashing

  useEffect(() => {
    // GET /settings is public, so we use standard fetch to avoid redirect loops on the login page!
    fetch(`${API_BASE_URL}/settings`)
      .then((res) => res.json())
      .then((settings) => {
        if (settings && (settings.adminLanguage === "ro" || settings.adminLanguage === "en")) {
          setLanguageState(settings.adminLanguage);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoaded(true));
  }, []);

  const setLanguage = (lang: Language) => {
    // 1. Update the screen instantly
    setLanguageState(lang);
    
    // 2. Save it globally to the database! (Requires admin login, so we use apiFetch)
    apiFetch("/settings", {
      method: "PATCH",
      body: JSON.stringify({ adminLanguage: lang }),
    }).catch(console.error);
  };

  const t = translations[language];

  // Don't show the app until we know which language the database wants!
  if (!isLoaded) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
