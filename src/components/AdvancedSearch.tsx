import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Star, Download, Calendar, Tag, Zap, SlidersHorizontal } from 'lucide-react';
import type { Product } from '../data/products';

export interface AdvancedSearchFilters {
  query: string;
  category: string;
  company: string;
  tags: string[];
  minRating: number;
  minDownloads: number;
  releaseYear: string;
  sortBy: 'relevance' | 'rating' | 'downloads' | 'releaseDate' | 'name';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedSearchProps {
  products: Product[];
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  onResultsChange: (results: Product[]) => void;
}

export default function AdvancedSearch({ products, onFiltersChange, onResultsChange }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<AdvancedSearchFilters>({
    query: '',
    category: '',
    company: '',
    tags: [],
    minRating: 0,
    minDownloads: 0,
    releaseYear: '',
    sortBy: 'relevance',
    sortOrder: 'desc'
  });

  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    const categories = [...new Set(products.map(p => p.category))].sort();
    const companies = [...new Set(products.map(p => p.company))].sort();
    const allTags = [...new Set(products.flatMap(p => p.tags))].sort();
    const years = [...new Set(products.map(p => new Date(p.releaseDate).getFullYear()))].sort((a, b) => b - a);
    
    return { categories, companies, allTags, years };
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let results = products.filter(product => {
      // Text search
      if (filters.query) {
        const query = filters.query.toLowerCase();
        if (!product.name.toLowerCase().includes(query) &&
            !product.description.toLowerCase().includes(query) &&
            !product.fullDescription.toLowerCase().includes(query) &&
            !product.company.toLowerCase().includes(query) &&
            !product.category.toLowerCase().includes(query) &&
            !product.tags.some(tag => tag.toLowerCase().includes(query))) {
          return false;
        }
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Company filter
      if (filters.company && product.company !== filters.company) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        if (!filters.tags.some(tag => product.tags.includes(tag))) {
          return false;
        }
      }

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Downloads filter
      if (filters.minDownloads > 0 && product.downloads < filters.minDownloads) {
        return false;
      }

      // Release year filter
      if (filters.releaseYear) {
        const productYear = new Date(product.releaseDate).getFullYear();
        if (productYear.toString() !== filters.releaseYear) {
          return false;
        }
      }

      return true;
    });

    // Sort results
    results.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'relevance':
          // Relevance scoring based on query match
          if (filters.query) {
            const aScore = getRelevanceScore(a, filters.query);
            const bScore = getRelevanceScore(b, filters.query);
            comparison = bScore - aScore;
          } else {
            comparison = b.downloads - a.downloads; // Fallback to downloads
          }
          break;
        case 'rating':
          comparison = b.rating - a.rating;
          break;
        case 'downloads':
          comparison = b.downloads - a.downloads;
          break;
        case 'releaseDate':
          comparison = new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
      }

      return filters.sortOrder === 'asc' ? -comparison : comparison;
    });

    return results;
  }, [products, filters]);

  // Relevance scoring for search
  const getRelevanceScore = (product: Product, query: string): number => {
    const q = query.toLowerCase();
    let score = 0;

    // Exact name match gets highest score
    if (product.name.toLowerCase() === q) score += 100;
    else if (product.name.toLowerCase().includes(q)) score += 50;

    // Company match
    if (product.company.toLowerCase().includes(q)) score += 30;

    // Category match
    if (product.category.toLowerCase().includes(q)) score += 20;

    // Description match
    if (product.description.toLowerCase().includes(q)) score += 15;

    // Tags match
    product.tags.forEach(tag => {
      if (tag.toLowerCase().includes(q)) score += 10;
    });

    // Boost score based on popularity
    score += Math.log(product.downloads) * 0.1;
    score += product.rating * 2;

    return score;
  };

  // Update filters
  const updateFilter = <K extends keyof AdvancedSearchFilters>(
    key: K,
    value: AdvancedSearchFilters[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const addTag = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      const newTags = [...filters.tags, tag];
      updateFilter('tags', newTags);
    }
  };

  const removeTag = (tag: string) => {
    const newTags = filters.tags.filter(t => t !== tag);
    updateFilter('tags', newTags);
  };

  const clearFilters = () => {
    const clearedFilters: AdvancedSearchFilters = {
      query: '',
      category: '',
      company: '',
      tags: [],
      minRating: 0,
      minDownloads: 0,
      releaseYear: '',
      sortBy: 'relevance',
      sortOrder: 'desc'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = useMemo(() => {
    return filters.category || filters.company || filters.tags.length > 0 || 
           filters.minRating > 0 || filters.minDownloads > 0 || filters.releaseYear;
  }, [filters]);

  // Update results when filters change
  useEffect(() => {
    onResultsChange(filteredProducts);
  }, [filteredProducts, onResultsChange]);

  return (
    <div className="bg-[var(--bg-primary)] rounded-xl shadow-lg p-6 mb-8 border border-[var(--border-primary)]">
      {/* Main search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
        <input
          type="text"
          value={filters.query}
          onChange={(e) => updateFilter('query', e.target.value)}
          placeholder="Search for software, company, category, or features..."
          className="w-full pl-10 pr-4 py-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all text-lg"
        />
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => updateFilter('minRating', 4.5)}
          className={`px-3 py-1 rounded-full text-sm transition-all ${
            filters.minRating === 4.5
              ? 'bg-[var(--accent-primary)] text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
          }`}
        >
          <Star className="w-3 h-3 inline mr-1" />
          Top Rated (4.5+)
        </button>
        <button
          onClick={() => updateFilter('minDownloads', 1000000)}
          className={`px-3 py-1 rounded-full text-sm transition-all ${
            filters.minDownloads === 1000000
              ? 'bg-[var(--accent-primary)] text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
          }`}
        >
          <Download className="w-3 h-3 inline mr-1" />
          Popular (1M+ downloads)
        </button>
        <button
          onClick={() => updateFilter('releaseYear', '2024')}
          className={`px-3 py-1 rounded-full text-sm transition-all ${
            filters.releaseYear === '2024'
              ? 'bg-[var(--accent-primary)] text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
          }`}
        >
          <Calendar className="w-3 h-3 inline mr-1" />
          Latest (2024)
        </button>
      </div>

      {/* Advanced filters toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Advanced Filters</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Filter className="w-4 h-4" />
          </motion.div>
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {/* Advanced filters panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 pt-4 border-t border-[var(--border-primary)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Category filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full p-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                >
                  <option value="">All categories</option>
                  {filterOptions.categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Company filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Company
                </label>
                <select
                  value={filters.company}
                  onChange={(e) => updateFilter('company', e.target.value)}
                  className="w-full p-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                >
                  <option value="">All companies</option>
                  {filterOptions.companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>

              {/* Release year filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Release Year
                </label>
                <select
                  value={filters.releaseYear}
                  onChange={(e) => updateFilter('releaseYear', e.target.value)}
                  className="w-full p-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                >
                  <option value="">All years</option>
                  {filterOptions.years.map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rating and downloads sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Minimum Rating: {filters.minRating.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.minRating}
                  onChange={(e) => updateFilter('minRating', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Minimum Downloads: {filters.minDownloads.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="25000000"
                  step="100000"
                  value={filters.minDownloads}
                  onChange={(e) => updateFilter('minDownloads', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Tags filter */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-1 mb-2">
                {filters.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[var(--accent-primary)] text-white text-xs rounded-full flex items-center space-x-1"
                  >
                    <span>{tag}</span>
                    <button onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {filterOptions.allTags
                  .filter(tag => !filters.tags.includes(tag))
                  .slice(0, 20)
                  .map(tag => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs rounded-full hover:bg-[var(--accent-primary)] hover:text-white transition-all"
                    >
                      <Tag className="w-3 h-3 inline mr-1" />
                      {tag}
                    </button>
                  ))}
              </div>
            </div>

            {/* Sort options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Sort by
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                  className="w-full p-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="downloads">Downloads</option>
                  <option value="releaseDate">Release Date</option>
                  <option value="name">Name</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Order
                </label>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => updateFilter('sortOrder', e.target.value as any)}
                  className="w-full p-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                >
                  <option value="desc">Highest first</option>
                  <option value="asc">Lowest first</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
