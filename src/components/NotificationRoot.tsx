import { NotificationProvider } from '../contexts/NotificationContext';
import ProductCatalog from './ProductCatalog';
import ProductDetail from './ProductDetail';
import type { Product } from '../data/products';

interface NotificationRootProps {
  products?: Product[];
  product?: Product;
  page: 'grid' | 'detail';
}

export default function NotificationRoot({ products, product, page }: NotificationRootProps) {
  return (
    <NotificationProvider>
      {page === 'grid' && products && <ProductCatalog products={products} />}
      {page === 'detail' && product && <ProductDetail product={product} />}
    </NotificationProvider>
  );
}
