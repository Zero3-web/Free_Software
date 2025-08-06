import ProductCard from './ProductCard';
import type { Product } from '../data/products';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-6 sm:py-8 lg:py-12">
      <div className="w-full px-0">
        {/* Section Header with better contrast */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Professional <span className="text-blue-600">Software</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Download the best professional tools for free. Quality software for creatives, developers and engineers.
          </p>
        </div>

        {/* Products Grid - Mobile-first responsive design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
