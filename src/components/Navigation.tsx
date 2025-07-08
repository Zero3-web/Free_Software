import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Monitor, Paintbrush, Video, FileText, Code, Zap, Calculator, Shield } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface NavigationProps {
  className?: string;
}

const softwareCategories: DropdownItem[] = [
  {
    label: 'Productividad',
    href: '/software/productividad',
    icon: FileText,
    description: 'Herramientas para trabajo y oficina'
  },
  {
    label: 'Diseño Gráfico',
    href: '/software/diseno',
    icon: Paintbrush,
    description: 'Software para crear y editar imágenes'
  },
  {
    label: 'Edición de Video',
    href: '/software/video',
    icon: Video,
    description: 'Editores profesionales de video'
  },
  {
    label: 'Desarrollo',
    href: '/software/desarrollo',
    icon: Code,
    description: 'IDEs y herramientas de programación'
  },
  {
    label: 'Utilidades',
    href: '/software/utilidades',
    icon: Zap,
    description: 'Herramientas del sistema y optimización'
  },
  {
    label: 'Seguridad',
    href: '/software/seguridad',
    icon: Shield,
    description: 'Antivirus y protección digital'
  }
];

const herramientasItems: DropdownItem[] = [
  {
    label: 'Convertidor de Archivos',
    href: '/herramientas/convertidor',
    icon: Monitor,
    description: 'Convierte entre diferentes formatos'
  },
  {
    label: 'Compresión',
    href: '/herramientas/compresion',
    icon: Calculator,
    description: 'Comprime y descomprime archivos'
  }
];

export default function Navigation({ className = '' }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = (dropdown: string) => {
    if (!isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 150);
    }
  };

  const handleClick = (dropdown: string) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    }
  };

  const DropdownMenu = ({ items, isActive }: { items: DropdownItem[]; isActive: boolean }) => (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-80 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl shadow-xl z-50"
          onMouseEnter={() => !isMobile && handleMouseEnter(activeDropdown!)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-2">
            {items.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors group"
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveDropdown(null)}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[var(--accent-primary)] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[var(--accent-primary)]" {...{}} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <nav className={`hidden md:flex items-center space-x-8 ${className}`}>
      {/* Inicio */}
      <a
        href="/"
        className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors"
      >
        Inicio
      </a>

      {/* Software Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('software')}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="flex items-center space-x-1 text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors"
          onClick={() => handleClick('software')}
        >
          <span>Software</span>
          <motion.div
            animate={{ rotate: activeDropdown === 'software' ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
        <DropdownMenu items={softwareCategories} isActive={activeDropdown === 'software'} />
      </div>

      {/* Herramientas Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('herramientas')}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="flex items-center space-x-1 text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors"
          onClick={() => handleClick('herramientas')}
        >
          <span>Herramientas</span>
          <motion.div
            animate={{ rotate: activeDropdown === 'herramientas' ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
        <DropdownMenu items={herramientasItems} isActive={activeDropdown === 'herramientas'} />
      </div>

      {/* Blog */}
      <a
        href="/blog"
        className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors"
      >
        Blog
      </a>

      {/* Sobre Nosotros */}
      <a
        href="/sobre-nosotros"
        className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors"
      >
        Sobre Nosotros
      </a>
    </nav>
  );
}
