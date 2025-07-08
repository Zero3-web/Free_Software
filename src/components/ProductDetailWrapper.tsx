import { NotificationProvider } from '../contexts/NotificationContext';
import ProductDetail from './ProductDetail';
import type { Product } from '../data/products';

interface ProductDetailWrapperProps {
  product: Product;
}

export default function ProductDetailWrapper({ product }: ProductDetailWrapperProps) {
  return (
    <NotificationProvider>
      <ProductDetail product={product} />
    </NotificationProvider>
  );
}
