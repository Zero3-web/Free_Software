import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, X, Star } from 'lucide-react';

export interface FilterState {
  category: string;
  company: string;
  rating: number;
  sortBy: string;
  searchTerm: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  companies: string[];
}

export default function FilterPanel({ filters, onFilterChange, categories, companies }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      company: '',
      rating: 0,
      sortBy: 'downloads',
      searchTerm: ''
    });
  };

  const sortOptions = [
    { value: 'downloads', label: 'Más descargados' },
    { value: 'rating', label: 'Mejor calificados' },
    { value: 'releaseDate', label: 'Más recientes' },
    { value: 'name', label: 'Alfabético' }
  ];

  const hasActiveFilters = filters.category || filters.company || filters.rating > 0;

  return (
    <div className="bg-[var(--bg-primary)] rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span>Filtros Avanzados</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Limpiar filtros</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Ordenar por */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Ordenar por
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="w-full p-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Categoría
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full p-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Empresa */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Empresa
                </label>
                <select
                  value={filters.company}
                  onChange={(e) => updateFilter('company', e.target.value)}
                  className="w-full p-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
                >
                  <option value="">Todas las empresas</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating mínimo */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Calificación mínima
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => updateFilter('rating', Number(e.target.value))}
                  className="w-full p-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
                >
                  <option value={0}>Cualquier calificación</option>
                  <option value={4}>4+ estrellas</option>
                  <option value={4.5}>4.5+ estrellas</option>
                  <option value={4.7}>4.7+ estrellas</option>
                </select>
              </div>
            </div>

            {/* Filtros activos */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-primary)]">
                <span className="text-sm text-[var(--text-secondary)]">Filtros activos:</span>
                {filters.category && (
                  <span className="px-2 py-1 bg-[var(--accent-primary)] text-white text-xs rounded-full flex items-center space-x-1">
                    <span>{filters.category}</span>
                    <button onClick={() => updateFilter('category', '')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.company && (
                  <span className="px-2 py-1 bg-[var(--accent-primary)] text-white text-xs rounded-full flex items-center space-x-1">
                    <span>{filters.company}</span>
                    <button onClick={() => updateFilter('company', '')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.rating > 0 && (
                  <span className="px-2 py-1 bg-[var(--accent-primary)] text-white text-xs rounded-full flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>{filters.rating}+</span>
                    <button onClick={() => updateFilter('rating', 0)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
