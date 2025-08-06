import { useState, useEffect } from 'react';
import { X, Heart, Download, Home, Info, Mail, ChevronDown, FileText, Paintbrush, Video, Code, Zap, Shield, Monitor, Calculator } from 'lucide-react';
import SearchBar from './SearchBar';
import type { Product } from '../data/products';

interface MobileMenuProps {
  products: Product[];
}

export default function MobileMenu({ products }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const softwareCategories = [
    { icon: FileText, label: 'Productividad', href: '/software/productividad' },
    { icon: Paintbrush, label: 'Diseño Gráfico', href: '/software/diseno' },
    { icon: Video, label: 'Edición de Video', href: '/software/video' },
    { icon: Code, label: 'Desarrollo', href: '/software/desarrollo' },
    { icon: Zap, label: 'Utilidades', href: '/software/utilidades' },
    { icon: Shield, label: 'Seguridad', href: '/software/seguridad' }
  ];

  const herramientas = [
    { icon: Monitor, label: 'Convertidor', href: '/herramientas/convertidor' },
    { icon: Calculator, label: 'Compresión', href: '/herramientas/compresion' }
  ];

  const mainMenuItems = [
    { icon: Home, label: 'Inicio', href: '/' },
    { icon: Heart, label: 'Favoritos', href: '/favoritos' },
    { icon: Info, label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { icon: Download, label: 'Blog', href: '/blog' },
    { icon: Mail, label: 'Contacto', href: '/contacto' }
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setExpandedSection(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Enhanced Menu Toggle Button with Animation */}
      <button
        onClick={toggleMenu}
        className={`md:hidden p-2 rounded-lg text-gray-900 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative z-50 ${isOpen ? 'hamburger-menu active' : 'hamburger-menu'}`}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
        type="button"
      >
        <div className="relative w-6 h-6">
          <span className={`hamburger-line absolute w-6 h-0.5 bg-gray-900 rounded transition-all duration-300 ${isOpen ? 'top-3 rotate-45' : 'top-1'}`}></span>
          <span className={`hamburger-line absolute w-6 h-0.5 bg-gray-900 rounded transition-all duration-300 top-3 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`hamburger-line absolute w-6 h-0.5 bg-gray-900 rounded transition-all duration-300 ${isOpen ? 'top-3 -rotate-45' : 'top-5'}`}></span>
        </div>
      </button>

      {/* Enhanced Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop with improved styling */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Menu Panel with improved responsive design */}
          <div className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white border-l border-gray-200 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
            {/* Header with improved spacing */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">SG</span>
                </div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Software Gratis</span>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
                aria-label="Cerrar menú"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search with improved mobile layout */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <SearchBar 
                products={products}
                className="w-full"
                placeholder="Buscar software..."
                onProductSelect={handleLinkClick}
              />
            </div>

            {/* Menu Items with enhanced scrolling */}
            <nav className="flex-1 p-4 overflow-y-auto bg-white">
              <ul className="space-y-1">
                {mainMenuItems.map((item, index) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 p-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium touch-target"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Software Categories with improved animation */}
              <div className="mt-6">
                <button
                  onClick={() => toggleSection('software')}
                  className="flex items-center justify-between w-full p-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium touch-target"
                  aria-expanded={expandedSection === 'software'}
                  type="button"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5" />
                    <span className="font-medium">Software</span>
                  </div>
                  <div className={`transform transition-transform duration-200 ${expandedSection === 'software' ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {expandedSection === 'software' && (
                  <div className="ml-8 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {softwareCategories.map((category) => (
                      <a
                        key={category.href}
                        href={category.href}
                        onClick={handleLinkClick}
                        className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 text-sm touch-target"
                      >
                        <category.icon className="w-4 h-4" />
                        <span>{category.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Herramientas with improved animation */}
              <div className="mt-4">
                <button
                  onClick={() => toggleSection('herramientas')}
                  className="flex items-center justify-between w-full p-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium touch-target"
                  aria-expanded={expandedSection === 'herramientas'}
                  type="button"
                >
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5" />
                    <span className="font-medium">Herramientas</span>
                  </div>
                  <div className={`transform transition-transform duration-200 ${expandedSection === 'herramientas' ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {expandedSection === 'herramientas' && (
                  <div className="ml-8 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {herramientas.map((herramienta) => (
                      <a
                        key={herramienta.href}
                        href={herramienta.href}
                        onClick={handleLinkClick}
                        className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 text-sm touch-target"
                      >
                        <herramienta.icon className="w-4 h-4" />
                        <span>{herramienta.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Footer with improved responsive design */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  © 2024 Software Gratis
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Versión 1.0.0
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
