import { NotificationProvider } from '../contexts/NotificationContext';
import ProductCard from './ProductCard';
import type { Product } from '../data/products';

interface ProductCardWrapperProps {
  product: Product;
}

export default function ProductCardWrapper({ product }: ProductCardWrapperProps) {
  return (
    <NotificationProvider>
      <ProductCard product={product} />
    </NotificationProvider>
  );
}
