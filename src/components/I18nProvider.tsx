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
  },
  ja: {
    name: '日本語',
    flag: '🇯🇵',
    code: 'ja'
  },
  ko: {
    name: '한국어',
    flag: '🇰🇷',
    code: 'ko'
  },
  zh: {
    name: '中文',
    flag: '🇨🇳',
    code: 'zh'
  },
  ru: {
    name: 'Русский',
    flag: '🇷🇺',
    code: 'ru'
  }
};

// Translation keys type
export type TranslationKey = keyof typeof translations.en;

// Translations object
export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.software': 'Software',
    'nav.productivity': 'Productivity',
    'nav.tools': 'Tools',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Common
    'common.download': 'Download',
    'common.read_more': 'Read more',
    'common.learn_more': 'Learn more',
    'common.free': 'Free',
    'common.open_source': 'Open Source',
    'common.rating': 'Rating',
    'common.reviews': 'Reviews',
    'common.favorites': 'Favorites',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.category': 'Category',
    'common.all_categories': 'All Categories',
    'common.featured': 'Featured',
    'common.popular': 'Popular',
    'common.new': 'New',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.try_again': 'Try again',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    
    // Hero section
    'hero.title': 'Discover the Best Free Software',
    'hero.subtitle': 'Professional alternatives to expensive software. Open source, secure, and completely free.',
    'hero.cta_primary': 'Explore Software',
    'hero.cta_secondary': 'Learn More',
    
    // Features
    'features.title': 'Why Choose Free Software?',
    'features.subtitle': 'Discover the benefits of using open source alternatives',
    'features.cost_effective.title': 'Cost Effective',
    'features.cost_effective.description': 'Save money with professional-grade software that costs nothing',
    'features.security.title': 'Secure & Transparent',
    'features.security.description': 'Open source code means better security and transparency',
    'features.community.title': 'Community Support',
    'features.community.description': 'Large communities provide support and continuous development',
    'features.customizable.title': 'Customizable',
    'features.customizable.description': 'Modify and adapt software to your specific needs',
    
    // Software categories
    'categories.design': 'Design',
    'categories.development': 'Development',
    'categories.productivity': 'Productivity',
    'categories.multimedia': 'Multimedia',
    'categories.security': 'Security',
    'categories.utilities': 'Utilities',
    'categories.education': 'Education',
    'categories.business': 'Business',
    'categories.gaming': 'Gaming',
    'categories.communication': 'Communication',
    
    // Product details
    'product.details': 'Details',
    'product.description': 'Description',
    'product.features': 'Features',
    'product.requirements': 'System Requirements',
    'product.screenshots': 'Screenshots',
    'product.related': 'Related Software',
    'product.alternatives': 'Alternatives',
    'product.license': 'License',
    'product.website': 'Official Website',
    'product.documentation': 'Documentation',
    'product.support': 'Support',
    'product.platforms': 'Platforms',
    'product.languages': 'Languages',
    'product.file_size': 'File Size',
    'product.version': 'Version',
    'product.last_updated': 'Last Updated',
    'product.developer': 'Developer',
    
    // Blog
    'blog.title': 'Our Blog',
    'blog.subtitle': 'Guides, tutorials and the latest news about free software',
    'blog.read_time': 'min read',
    'blog.published_on': 'Published on',
    'blog.author': 'By',
    'blog.tags': 'Tags',
    'blog.related_articles': 'Related Articles',
    'blog.search_placeholder': 'Search articles...',
    'blog.no_results': 'No articles found',
    'blog.featured_article': 'Featured Article',
    
    // Newsletter
    'newsletter.title': 'Stay up to date with the latest news!',
    'newsletter.description': 'Receive exclusive articles, tips and the best free software alternatives directly to your email.',
    'newsletter.email_placeholder': 'Your email address',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.success': 'Thank you for subscribing!',
    'newsletter.error': 'There was an error. Please try again.',
    'newsletter.already_subscribed': 'You are already subscribed!',
    
    // Footer
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.sitemap': 'Sitemap',
    'footer.rss': 'RSS Feed',
    'footer.social': 'Follow Us',
    'footer.copyright': 'All rights reserved',
    'footer.description': 'Opensoftware is your trusted source for discovering the best free and open source software alternatives.',
    
    // Search
    'search.placeholder': 'Search for software...',
    'search.results': 'Search Results',
    'search.no_results': 'No software found matching your search',
    'search.filters': 'Filters',
    'search.sort_by': 'Sort by',
    'search.sort_relevance': 'Relevance',
    'search.sort_name': 'Name',
    'search.sort_rating': 'Rating',
    'search.sort_downloads': 'Downloads',
    'search.sort_date': 'Date Added',
    
    // Reviews
    'reviews.title': 'User Reviews',
    'reviews.write_review': 'Write a Review',
    'reviews.rating': 'Rating',
    'reviews.helpful': 'Helpful',
    'reviews.not_helpful': 'Not helpful',
    'reviews.report': 'Report',
    'reviews.no_reviews': 'No reviews yet',
    'reviews.be_first': 'Be the first to write a review!',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.search_placeholder': 'Search FAQ...',
    'faq.no_results': 'No FAQ entries found',
    'faq.helpful': 'Was this helpful?',
    'faq.yes': 'Yes',
    'faq.no': 'No',
    
    // Errors
    'error.404.title': 'Page Not Found',
    'error.404.description': 'The page you are looking for does not exist.',
    'error.404.back_home': 'Back to Home',
    'error.500.title': 'Server Error',
    'error.500.description': 'Something went wrong on our end. Please try again later.',
    'error.network.title': 'Network Error',
    'error.network.description': 'Please check your internet connection and try again.',
    
    // Accessibility
    'accessibility.skip_to_content': 'Skip to main content',
    'accessibility.menu': 'Menu',
    'accessibility.close_menu': 'Close menu',
    'accessibility.toggle_theme': 'Toggle theme',
    'accessibility.search': 'Search',
    'accessibility.language': 'Language',
    'accessibility.previous_page': 'Previous page',
    'accessibility.next_page': 'Next page',
    'accessibility.current_page': 'Current page',
    
    // Performance
    'performance.loading': 'Loading...',
    'performance.optimizing': 'Optimizing...',
    'performance.retry': 'Retry',
    'performance.offline': 'You are offline',
    'performance.slow_connection': 'Slow connection detected',
    
    // Onboarding
    'onboarding.welcome': 'Welcome to Opensoftware!',
    'onboarding.step1': 'Discover amazing free software alternatives',
    'onboarding.step2': 'Read reviews and compare features',
    'onboarding.step3': 'Download safely with verified checksums',
    'onboarding.get_started': 'Get Started',
    'onboarding.skip': 'Skip Tour',
    
    // Analytics
    'analytics.popular_software': 'Popular Software',
    'analytics.trending': 'Trending',
    'analytics.most_downloaded': 'Most Downloaded',
    'analytics.recently_added': 'Recently Added',
    'analytics.user_favorites': 'User Favorites',
    
    // Settings
    'settings.title': 'Settings',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.privacy': 'Privacy',
    'settings.accessibility': 'Accessibility',
    'settings.performance': 'Performance',
    'settings.reset': 'Reset to defaults',
    'settings.save': 'Save settings',
    'settings.saved': 'Settings saved!',
    
    // Themes
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
    'theme.auto': 'Auto',
    'theme.high_contrast': 'High Contrast',
    
    // Download integrity
    'download.integrity.title': 'Secure Download with Integrity Verification',
    'download.integrity.verifying': 'Verifying file integrity...',
    'download.integrity.success': 'File verified and downloaded successfully!',
    'download.integrity.error': 'Verification failed or download error occurred.',
    'download.integrity.warning': 'File integrity verification failed. The downloaded file may be corrupted or tampered with.',
    
    // Toast notifications
    'toast.success': 'Success!',
    'toast.error': 'Error!',
    'toast.warning': 'Warning!',
    'toast.info': 'Info',
    'toast.copied': 'Copied to clipboard!',
    'toast.saved': 'Saved!',
    'toast.deleted': 'Deleted!',
    'toast.updated': 'Updated!',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.software': 'Software',
    'nav.productivity': 'Productividad',
    'nav.tools': 'Herramientas',
    'nav.blog': 'Blog',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    
    // Common
    'common.download': 'Descargar',
    'common.read_more': 'Leer más',
    'common.learn_more': 'Saber más',
    'common.free': 'Gratis',
    'common.open_source': 'Código Abierto',
    'common.rating': 'Valoración',
    'common.reviews': 'Reseñas',
    'common.favorites': 'Favoritos',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.category': 'Categoría',
    'common.all_categories': 'Todas las Categorías',
    'common.featured': 'Destacado',
    'common.popular': 'Popular',
    'common.new': 'Nuevo',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.try_again': 'Intentar de nuevo',
    'common.close': 'Cerrar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.submit': 'Enviar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    
    // Hero section
    'hero.title': 'Descubre el Mejor Software Gratuito',
    'hero.subtitle': 'Alternativas profesionales a software costoso. Código abierto, seguro y completamente gratis.',
    'hero.cta_primary': 'Explorar Software',
    'hero.cta_secondary': 'Saber Más',
    
    // Features
    'features.title': '¿Por qué elegir software gratuito?',
    'features.subtitle': 'Descubre los beneficios de usar alternativas de código abierto',
    'features.cost_effective.title': 'Rentable',
    'features.cost_effective.description': 'Ahorra dinero con software de calidad profesional que no cuesta nada',
    'features.security.title': 'Seguro y Transparente',
    'features.security.description': 'El código abierto significa mejor seguridad y transparencia',
    'features.community.title': 'Soporte Comunitario',
    'features.community.description': 'Las grandes comunidades proporcionan soporte y desarrollo continuo',
    'features.customizable.title': 'Personalizable',
    'features.customizable.description': 'Modifica y adapta el software a tus necesidades específicas',
    
    // Software categories
    'categories.design': 'Diseño',
    'categories.development': 'Desarrollo',
    'categories.productivity': 'Productividad',
    'categories.multimedia': 'Multimedia',
    'categories.security': 'Seguridad',
    'categories.utilities': 'Utilidades',
    'categories.education': 'Educación',
    'categories.business': 'Negocio',
    'categories.gaming': 'Juegos',
    'categories.communication': 'Comunicación',
    
    // Blog
    'blog.title': 'Nuestro Blog',
    'blog.subtitle': 'Guías, tutoriales y las últimas noticias sobre software gratuito',
    'blog.read_time': 'min de lectura',
    'blog.published_on': 'Publicado el',
    'blog.author': 'Por',
    'blog.tags': 'Etiquetas',
    'blog.related_articles': 'Artículos Relacionados',
    'blog.search_placeholder': 'Buscar artículos...',
    'blog.no_results': 'No se encontraron artículos',
    'blog.featured_article': 'Artículo Destacado',
    
    // Newsletter
    'newsletter.title': '¡Mantente al día con las últimas noticias!',
    'newsletter.description': 'Recibe artículos exclusivos, consejos y las mejores alternativas de software gratuito directamente en tu email.',
    'newsletter.email_placeholder': 'Tu dirección de email',
    'newsletter.subscribe': 'Suscribirse',
    'newsletter.success': '¡Gracias por suscribirte!',
    'newsletter.error': 'Hubo un error. Por favor, inténtalo de nuevo.',
    'newsletter.already_subscribed': '¡Ya estás suscrito!',
    
    // Footer
    'footer.about': 'Acerca de',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.sitemap': 'Mapa del Sitio',
    'footer.rss': 'Feed RSS',
    'footer.social': 'Síguenos',
    'footer.copyright': 'Todos los derechos reservados',
    'footer.description': 'Opensoftware es tu fuente confiable para descubrir las mejores alternativas de software gratuito y de código abierto.',
    
    // Errors
    'error.404.title': 'Página No Encontrada',
    'error.404.description': 'La página que buscas no existe.',
    'error.404.back_home': 'Volver al Inicio',
    'error.500.title': 'Error del Servidor',
    'error.500.description': 'Algo salió mal en nuestro lado. Por favor, inténtalo más tarde.',
    'error.network.title': 'Error de Red',
    'error.network.description': 'Por favor, verifica tu conexión a internet y vuelve a intentarlo.',
  },
  // Add other languages as needed...
  fr: {
    'nav.home': 'Accueil',
    'nav.software': 'Logiciel',
    'nav.blog': 'Blog',
    'common.download': 'Télécharger',
    'common.free': 'Gratuit',
    'hero.title': 'Découvrez les Meilleurs Logiciels Gratuits',
    // ... more translations
  },
  de: {
    'nav.home': 'Startseite',
    'nav.software': 'Software',
    'nav.blog': 'Blog',
    'common.download': 'Herunterladen',
    'common.free': 'Kostenlos',
    'hero.title': 'Entdecken Sie die Beste Kostenlose Software',
    // ... more translations
  },
  // Add more languages as needed
};

// I18n Context
interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: TranslationKey, variables?: Record<string, string>) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

// RTL languages
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

// I18n Provider
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<string>('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLanguage = navigator.language.split('-')[0];
      if (translations[browserLanguage as keyof typeof translations]) {
        setLanguage(browserLanguage);
      }
    }
  }, []);

  useEffect(() => {
    // Update RTL state
    setIsRTL(RTL_LANGUAGES.includes(language));
    
    // Update document language and direction
    document.documentElement.lang = language;
    document.documentElement.dir = RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
    
    // Save language preference
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: TranslationKey, variables?: Record<string, string>): string => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en;
    
    // Type-safe access to translations
    const getTranslation = (obj: any, path: string): string => {
      return obj?.[path] || translations.en?.[path as keyof typeof translations.en] || path;
    };
    
    let translation = getTranslation(langTranslations, key);
    
    // Replace variables
    if (variables) {
      Object.entries(variables).forEach(([varKey, varValue]) => {
        translation = translation.replace(`{{${varKey}}}`, varValue);
      });
    }
    
    return translation;
  };

  const value = {
    language,
    setLanguage,
    t,
    isRTL
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// Custom hook to use i18n
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Language Selector Component
interface LanguageSelectorProps {
  className?: string;
  showFlag?: boolean;
  showName?: boolean;
}

export function LanguageSelector({ 
  className = '', 
  showFlag = true, 
  showName = true 
}: LanguageSelectorProps) {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages[language as keyof typeof languages] || languages.en;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white"
        aria-label={t('accessibility.language')}
      >
        <Globe className="w-4 h-4 text-gray-500" />
        {showFlag && <span className="text-sm">{currentLanguage.flag}</span>}
        {showName && <span className="text-sm font-medium text-gray-700">{currentLanguage.name}</span>}
        <ChevronDown className={`w-4 h-4 text-gray-500
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white">
          <div className="py-2 max-h-64 overflow-y-auto">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50
                  language === code ? 'bg-blue-50
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === code && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Translation utility for server-side rendering
export function getTranslation(language: string, key: TranslationKey, variables?: Record<string, string>): string {
  const langTranslations = translations[language as keyof typeof translations] || translations.en;
  let translation = (langTranslations as any)[key] || (translations.en as any)[key] || key;
  
  if (variables) {
    Object.entries(variables).forEach(([varKey, varValue]) => {
      translation = translation.replace(`{{${varKey}}}`, varValue);
    });
  }
  
  return translation;
}

// Language detection utility
export function detectLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  
  const saved = localStorage.getItem('preferred-language');
  if (saved && translations[saved as keyof typeof translations]) {
    return saved;
  }
  
  const browser = navigator.language.split('-')[0];
  if (translations[browser as keyof typeof translations]) {
    return browser;
  }
  
  return 'en';
}

// Standalone translation function for use outside React components
export function t(key: TranslationKey, language: string = 'en', variables?: Record<string, string>): string {
  const langTranslations = translations[language as keyof typeof translations] || translations.en;
  
  // Type-safe access to translations
  const getTranslation = (obj: any, path: string): string => {
    return obj?.[path] || translations.en?.[path as keyof typeof translations.en] || path;
  };
  
  let translation = getTranslation(langTranslations, key);
  
  if (variables) {
    Object.entries(variables).forEach(([varKey, varValue]) => {
      translation = translation.replace(`{{${varKey}}}`, varValue);
    });
  }
  
  return translation;
}

export default I18nProvider;
