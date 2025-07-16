import ProductCard from './ProductCard';
import type { Product } from '../data/products';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-responsive-2xl sm:text-responsive-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Software Profesional <span className="text-blue-500">Gratuito</span>
          </h2>
          <p className="text-responsive-base sm:text-responsive-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Descarga las mejores herramientas profesionales sin costo. Software de calidad para creativos, desarrolladores e ingenieros.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button removed as requested */}
      </div>
    </section>
  );
}
