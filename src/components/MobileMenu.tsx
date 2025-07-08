import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Download, Home, Info, Mail } from 'lucide-react';
import SearchBar from './SearchBar';
import type { Product } from '../data/products';

interface MobileMenuProps {
  products: Product[];
}

export default function MobileMenu({ products }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Inicio', href: '/' },
    { icon: Download, label: 'Descargas', href: '/descargas' },
    { icon: Heart, label: 'Favoritos', href: '/favoritos' },
    { icon: Info, label: 'Acerca de', href: '/acerca' },
    { icon: Mail, label: 'Contacto', href: '/contacto' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
        aria-label="Abrir menú"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring',
                damping: 25,
                stiffness: 200
              }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[var(--bg-primary)] shadow-2xl z-50 md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--border-primary)]">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-[var(--text-primary)]">
                    Software <span className="text-blue-500">Gratis</span>
                  </span>
                </div>
                
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Section */}
              <div className="p-4 border-b border-[var(--border-primary)]">
                <SearchBar 
                  products={products} 
                  placeholder="Buscar software..."
                  className="w-full"
                />
              </div>

              {/* Menu Items */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        onClick={toggleMenu}
                        className="flex items-center space-x-3 p-3 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors group"
                      >
                        <item.icon className="w-5 h-5 group-hover:text-[var(--accent-primary)] transition-colors" />
                        <span className="font-medium">{item.label}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border-primary)]">
                <div className="text-center">
                  <p className="text-sm text-[var(--text-secondary)]">
                    © 2024 Software Gratis
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
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
