import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type Translations } from "./translations/en";
import { fr } from "./translations/fr";
import { zh } from "./translations/zh";

export type Locale = "en" | "fr" | "zh";

const STORAGE_KEY = "oe-locale";

const HTML_LANG: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  zh: "zh-CN",
};

// Locale dictionaries.
const DICTIONARIES: Record<Locale, Translations> = {
  en,
  fr,
  zh,
};

/** localStorage value, else navigator.language prefix match, else en. */
function resolveInitialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "fr" || stored === "zh") return stored;
  } catch {
    /* storage unavailable; ignore */
  }
  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("zh")) return "zh";
  return "en";
}

function applyDocumentSideEffects(locale: Locale, t: Translations) {
  document.documentElement.lang = HTML_LANG[locale];
  document.title = t.meta.title;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable; ignore */
    }
  }, []);

  const t = DICTIONARIES[locale];

  useEffect(() => {
    applyDocumentSideEffects(locale, t);
  }, [locale, t]);

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Translation dictionary for the active locale. */
export function useT(): Translations {
  return useI18n().t;
}

/** Current locale plus a setter that persists and updates the document. */
export function useLocale(): { locale: Locale; setLocale: (locale: Locale) => void } {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}
