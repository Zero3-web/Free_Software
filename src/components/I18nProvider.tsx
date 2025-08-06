import { useState, useEffect, createContext, useContext } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

// Language configuration
export const languages = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    code: 'en'
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    code: 'es'
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    code: 'fr'
  },
  de: {
    name: 'Deutsch',
    flag: '🇩🇪',
    code: 'de'
  },
  pt: {
    name: 'Português',
    flag: '🇧🇷',
    code: 'pt'
  },
  it: {
    name: 'Italiano',
    flag: '🇮🇹',
    code: 'it'
  }
};

// Translation keys type
export type TranslationKey = keyof typeof translations.en;

// Basic translations for now
export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.software': 'Software',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Common
    'common.download': 'Download',
    'common.free': 'Free',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.close': 'Close'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.software': 'Software',
    'nav.blog': 'Blog',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    
    'common.download': 'Descargar',
    'common.free': 'Gratis',
    'common.search': 'Buscar',
    'common.loading': 'Cargando...',
    'common.close': 'Cerrar'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.software': 'Logiciels',
    'nav.blog': 'Blog',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    
    'common.download': 'Télécharger',
    'common.free': 'Gratuit',
    'common.search': 'Rechercher',
    'common.loading': 'Chargement...',
    'common.close': 'Fermer'
  },
  de: {
    'nav.home': 'Startseite',
    'nav.software': 'Software',
    'nav.blog': 'Blog',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    
    'common.download': 'Herunterladen',
    'common.free': 'Kostenlos',
    'common.search': 'Suchen',
    'common.loading': 'Laden...',
    'common.close': 'Schließen'
  },
  pt: {
    'nav.home': 'Início',
    'nav.software': 'Software',
    'nav.blog': 'Blog',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    
    'common.download': 'Baixar',
    'common.free': 'Grátis',
    'common.search': 'Pesquisar',
    'common.loading': 'Carregando...',
    'common.close': 'Fechar'
  },
  it: {
    'nav.home': 'Home',
    'nav.software': 'Software',
    'nav.blog': 'Blog',
    'nav.about': 'Chi siamo',
    'nav.contact': 'Contatto',
    
    'common.download': 'Scarica',
    'common.free': 'Gratuito',
    'common.search': 'Cerca',
    'common.loading': 'Caricamento...',
    'common.close': 'Chiudi'
  }
};

// I18n Context
interface I18nContextType {
  language: keyof typeof languages;
  setLanguage: (lang: keyof typeof languages) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Hook to use I18n
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// I18n Provider Component
interface I18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: keyof typeof languages;
}

export function I18nProvider({ children, defaultLanguage = 'en' }: I18nProviderProps) {
  const [language, setLanguage] = useState<keyof typeof languages>(defaultLanguage);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as keyof typeof languages;
    if (savedLanguage && languages[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// Language Selector Component
interface LanguageSelectorProps {
  showFlag?: boolean;
  showName?: boolean;
  compact?: boolean;
  className?: string;
}

export function LanguageSelector({ 
  showFlag = true, 
  showName = true, 
  compact = false,
  className = ""
}: LanguageSelectorProps) {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages[language];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        {showFlag && <span className="text-sm">{currentLanguage.flag}</span>}
        {showName && !compact && <span className="text-sm font-medium text-gray-700">{currentLanguage.name}</span>}
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-1">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code as keyof typeof languages);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 ${
                  language === code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
                {language === code && (
                  <span className="ml-auto text-blue-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default I18nProvider;
