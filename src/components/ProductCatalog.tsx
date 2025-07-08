import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from './ProductGrid';
import FilterPanel, { type FilterState } from './FilterPanel';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { type Product } from '../data/products';

interface ProductCatalogProps {
  products: Product[];
}

const PRODUCTS_PER_PAGE = 12;

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    company: '',
    rating: 0,
    sortBy: 'downloads',
    searchTerm: ''
  });
  
  const [currentPage, setCurrentPage] = useState(1);

  // Extraer categorías y empresas únicas
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.sort();
  }, [products]);

  const companies = useMemo(() => {
    const uniqueCompanies = [...new Set(products.map(p => p.company))];
    return uniqueCompanies.sort();
  }, [products]);

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Filtro por término de búsqueda
      if (filters.searchTerm && !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !product.category.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }

      // Filtro por categoría
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Filtro por empresa
      if (filters.company && product.company !== filters.company) {
        return false;
      }

      // Filtro por rating
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      return true;
    });

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'releaseDate':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'downloads':
        default:
          return b.downloads - a.downloads;
      }
    });

    return filtered;
  }, [products, filters]);

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Resetear página cuando cambien los filtros
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barra de búsqueda */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Panel de filtros */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={categories}
        companies={companies}
      />

      {/* Resultados */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-[var(--text-secondary)]">
            Mostrando {paginatedProducts.length} de {filteredProducts.length} productos
          </p>
          
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-xl text-[var(--text-secondary)] mb-2">
                No se encontraron productos
              </p>
              <p className="text-[var(--text-muted)]">
                Prueba ajustando los filtros o términos de búsqueda
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Grid de productos */}
      {filteredProducts.length > 0 && (
        <>
          <ProductGrid products={paginatedProducts} />
          
          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
