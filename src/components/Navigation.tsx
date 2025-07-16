import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Monitor, Paintbrush, Video, FileText, Code, Zap, Calculator, Shield } from 'lucide-react';
import LoadingWrapper from './LoadingWrapper';

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
    label: 'Productivity',
    href: '/software/productividad',
    icon: FileText,
    description: 'Office and work tools'
  },
  {
    label: 'Graphic Design',
    href: '/software/diseno',
    icon: Paintbrush,
    description: 'Software for creating and editing images'
  },
  {
    label: 'Video Editing',
    href: '/software/video',
    icon: Video,
    description: 'Professional video editors'
  },
  {
    label: 'Development',
    href: '/software/desarrollo',
    icon: Code,
    description: 'IDEs and programming tools'
  },
  {
    label: 'Utilities',
    href: '/software/utilidades',
    icon: Zap,
    description: 'System tools and optimization'
  },
  {
    label: 'Security',
    href: '/software/seguridad',
    icon: Shield,
    description: 'Antivirus and digital protection'
  }
];

const herramientasItems: DropdownItem[] = [
  {
    label: 'File Converter',
    href: '/herramientas/convertidor',
    icon: Monitor,
    description: 'Convert between different formats'
  },
  {
    label: 'Compression',
    href: '/herramientas/compresion',
    icon: Calculator,
    description: 'Compress and decompress files'
  }
];

export default function Navigation({ className = '' }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Changed to lg breakpoint
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

  const DropdownMenu = ({ items, isActive }: { items: DropdownItem[]; isActive: boolean }) => {
    if (!isActive) return null;
    
    return (
      <div
        className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
        onMouseEnter={() => !isMobile && handleMouseEnter(activeDropdown!)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-2">
          {items.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 group cursor-pointer hover:scale-105"
                onClick={() => setActiveDropdown(null)}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300">
                  <IconComponent className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-all duration-300">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-700 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <nav className={`hidden md:flex items-center gap-10 px-2 ${className}`}>
      {/* Home */}
      <a
        href="/"
        className="text-gray-900 hover:text-blue-600 font-semibold text-base px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:bg-gray-100 cursor-pointer hover:scale-105"
      >
        Home
      </a>

      {/* Software Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('software')}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="flex items-center gap-1 text-gray-900 hover:text-blue-600 font-semibold text-base px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:bg-gray-100 cursor-pointer hover:scale-105"
          onClick={() => handleClick('software')}
        >
          <span>Software</span>
          <div className={`transform transition-transform duration-300 ${activeDropdown === 'software' ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>
        <DropdownMenu items={softwareCategories} isActive={activeDropdown === 'software'} />
      </div>

      {/* Tools */}
      <a
        href="/herramientas"
        className="text-gray-900 hover:text-blue-600 font-semibold text-base px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:bg-gray-100 cursor-pointer hover:scale-105"
      >
        Tools
      </a>

      {/* Blog */}
      <LoadingWrapper
        href="/blog"
        className="text-gray-900 hover:text-blue-600 font-semibold text-base px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:bg-gray-100 cursor-pointer hover:scale-105"
      >
        Blog
      </LoadingWrapper>

      {/* About Us */}
      <LoadingWrapper
        href="/sobre-nosotros"
        className="text-gray-900 hover:text-blue-600 font-semibold text-base px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:bg-gray-100 cursor-pointer hover:scale-105"
      >
        About Us
      </LoadingWrapper>
    </nav>
  );
}
