import { useState, useMemo } from 'react';
import ProductGrid from './ProductGrid';
import LoadingSpinner from './LoadingSpinner';
import { type Product } from '../data/products';

interface ProductCatalogProps {
  products: Product[];
}

const INITIAL_PRODUCTS = 6;
const PRODUCTS_PER_LOAD = 12;

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [displayedCount, setDisplayedCount] = useState(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  // Productos a mostrar
  const displayedProducts = useMemo(() => {
    return products.slice(0, displayedCount);
  }, [products, displayedCount]);

  const hasMoreProducts = displayedCount < products.length;

  const loadMore = async () => {
    setIsLoading(true);
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 1400));
    
    setDisplayedCount(prev => Math.min(prev + PRODUCTS_PER_LOAD, products.length));
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div id="products-section" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Resultados con mejor contraste */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <p className="text-gray-700 font-medium text-sm sm:text-base">
            Showing {displayedProducts.length} of {products.length} professional software
          </p>
        </div>
      </div>

      {/* Grid de productos con mejor spacing móvil */}
      <ProductGrid products={displayedProducts} />
      
      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="mt-12 text-center">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ver Más Software
          </button>
        </div>
      )}
    </div>
  );
}
