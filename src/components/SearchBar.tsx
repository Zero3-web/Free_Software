import { useState, useEffect, useRef } from 'react';
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

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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

    // Navegación compatible con Astro SPA (si está disponible)
    if (typeof window !== 'undefined' && window?.location && window?.history?.pushState) {
      window.history.pushState({}, '', `/software/${product.id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      window.location.href = `/software/${product.id}`;
    }
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

  return (  <div ref={searchRef} className={`relative ${className}`}>
      {/* Input de búsqueda */}
      <div
        className={[
          "flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm px-3 py-2 transition-all",
          isOpen ? "ring-2 ring-primary-500" : "",
          "w-full min-w-[200px] max-w-full"
        ].join(' ')}
      >
        <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          className="w-full min-w-0 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm md:text-base"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={e => {
            // Solo cerrar si el nuevo foco está fuera del dropdown
            const next = e.relatedTarget as HTMLElement | null;
            if (!next || !searchRef.current || !searchRef.current.contains(next)) {
              setIsOpen(false);
            }
          }}
          onKeyDown={handleKeyDown}
          aria-label="Buscar software"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none flex-shrink-0"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown de resultados - Enhanced responsive */}
      {isOpen && (
        <div className="absolute left-0 z-30 mt-2 w-full min-w-[300px] max-w-[90vw] sm:max-w-[520px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
          {/* Resultados de búsqueda */}
          {query && filteredProducts.length > 0 && (
            <div className="p-2 max-h-64 sm:max-h-80 overflow-y-auto">
              {filteredProducts.map((product) => (
                <a
                  key={product.id}
                  href={`/software/${product.id}`}
                  className="w-full flex items-center space-x-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors no-underline group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-white text-xs sm:text-sm font-bold">
                        {product.company.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate group-hover:text-blue-600">
                      {product.name}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                      {product.company} • {product.category}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center space-x-1 flex-shrink-0">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Sin resultados */}
          {query && filteredProducts.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm sm:text-base">No se encontraron resultados para "{query}"</p>
            </div>
          )}

          {/* Búsquedas recientes */}
          {!query && recentSearches.length > 0 && (
            <div className="p-2 max-h-64 overflow-y-auto">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Búsquedas recientes</span>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  Limpiar
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={`recent-${index}`}
                  onClick={() => handleRecentSearchClick(search)}
                  className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
                >
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm truncate">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Sugerencias populares */}
          {!query && recentSearches.length === 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>Búsquedas populares</span>
              </div>
              {['Adobe Photoshop', 'AutoCAD', 'Adobe Illustrator', 'Maya'].map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => handleRecentSearchClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
                >
                  <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm truncate">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
