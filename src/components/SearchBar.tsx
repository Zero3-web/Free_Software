import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import type { Product } from '../data/products';

interface SearchBarProps {
  products?: Product[];
  onProductSelect?: (product: Product) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  products = [], 
  onProductSelect, 
  onSearch,
  placeholder = "Buscar software...",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cargar búsquedas recientes del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Filtrar productos en tiempo real
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.company.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 6); // Limitar a 6 resultados

    setFilteredProducts(filtered);
  }, [query, products]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0 || recentSearches.length > 0);
    
    // Llamar onSearch si está disponible
    onSearch?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Guardar en búsquedas recientes si hay query
      if (query.trim()) {
        const newRecentSearches = [query.trim(), ...recentSearches.filter(s => s !== query.trim())].slice(0, 5);
        setRecentSearches(newRecentSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      }
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleInputFocus = () => {
    setIsOpen(query.length > 0 || recentSearches.length > 0);
  };

  const handleProductSelect = (product: Product) => {
    setQuery(product.name);
    setIsOpen(false);
    
    // Guardar en búsquedas recientes
    const newRecentSearches = [product.name, ...recentSearches.filter(s => s !== product.name)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

    onProductSelect?.(product);
    // Redirigir a la página del producto
    window.location.href = `/software/${product.id}`;
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Input de búsqueda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Dropdown de resultados */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto"
          >
            {/* Resultados de búsqueda */}
            {query && filteredProducts.length > 0 && (
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Resultados
                </div>
                {filteredProducts.map((product, index) => (
                  <motion.button
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleProductSelect(product)}
                    className="w-full flex items-center space-x-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {product.company.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {product.company} • {product.category}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sin resultados */}
            {query && filteredProducts.length === 0 && (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No se encontraron resultados para "{query}"</p>
              </div>
            )}

            {/* Búsquedas recientes */}
            {!query && recentSearches.length > 0 && (
              <div className="p-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Búsquedas recientes</span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    Limpiar
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <motion.button
                    key={`recent-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleRecentSearchClick(search)}
                    className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{search}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sugerencias populares */}
            {!query && recentSearches.length === 0 && (
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Búsquedas populares</span>
                </div>
                {['Adobe Photoshop', 'AutoCAD', 'Adobe Illustrator', 'Maya'].map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleRecentSearchClick(suggestion)}
                    className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
