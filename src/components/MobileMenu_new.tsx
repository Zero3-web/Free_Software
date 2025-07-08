import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Download, Home, Info, Mail, ChevronDown, FileText, Paintbrush, Video, Code, Zap, Shield, Monitor, Calculator } from 'lucide-react';
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

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Abrir menú"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-xl z-50 md:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">SG</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">Software Gratis</span>
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <SearchBar 
                  products={products}
                  className="w-full"
                  placeholder="Buscar software..."
                />
              </div>

              {/* Menu Items */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {mainMenuItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        onClick={toggleMenu}
                        className="flex items-center space-x-3 p-3 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <item.icon className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                        <span className="font-medium">{item.label}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Software Categories */}
                <div className="mt-6">
                  <button
                    onClick={() => toggleSection('software')}
                    className="flex items-center justify-between w-full p-3 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Download className="w-5 h-5" />
                      <span className="font-medium">Software</span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSection === 'software' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedSection === 'software' && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-8 mt-2 space-y-1 overflow-hidden"
                      >
                        {softwareCategories.map((category) => (
                          <motion.li
                            key={category.href}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <a
                              href={category.href}
                              onClick={toggleMenu}
                              className="flex items-center space-x-3 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <category.icon className="w-4 h-4" />
                              <span className="text-sm">{category.label}</span>
                            </a>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Herramientas */}
                <div className="mt-4">
                  <button
                    onClick={() => toggleSection('herramientas')}
                    className="flex items-center justify-between w-full p-3 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5" />
                      <span className="font-medium">Herramientas</span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSection === 'herramientas' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedSection === 'herramientas' && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-8 mt-2 space-y-1 overflow-hidden"
                      >
                        {herramientas.map((herramienta) => (
                          <motion.li
                            key={herramienta.href}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <a
                              href={herramienta.href}
                              onClick={toggleMenu}
                              className="flex items-center space-x-3 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <herramienta.icon className="w-4 h-4" />
                              <span className="text-sm">{herramienta.label}</span>
                            </a>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              {/* Footer */}
              <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    © 2024 Software Gratis
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Versión 1.0.0
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
