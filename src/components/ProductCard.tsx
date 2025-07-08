import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Download, Eye } from 'lucide-react';
import type { Product } from '../data/products';
import { useNotifications } from '../contexts/NotificationContext';
import ProductBadge from './ProductBadge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      showSuccess(`${product.name} agregado a favoritos`);
    } else {
      showSuccess(`${product.name} removido de favoritos`);
    }
  };

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) {
      return `${(downloads / 1000000).toFixed(1)}M`;
    }
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}K`;
    }
    return downloads.toString();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--bg-primary)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image Container */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {product.company.charAt(0)}
              </span>
            </div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 p-3 rounded-full hover:bg-white transition-colors"
            onClick={() => window.open(`/software/${product.id}`, '_blank')}
          >
            <Eye className="w-5 h-5 text-gray-800" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition-colors text-white"
          >
            <Download className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {product.badges.map((badge, index) => (
              <ProductBadge key={badge} badge={badge} index={index} />
            ))}
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-[var(--bg-secondary)] backdrop-blur-sm hover:bg-[var(--bg-tertiary)] transition-colors hover-scale"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite
                ? 'text-red-500 fill-current'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          />
        </button>

        {/* Company badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-md">
          {product.company}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md">
              +{product.tags.length - 3}
            </span>
          )}
        </div>

        {/* Rating and Downloads */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
              {product.rating}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {formatDownloads(product.downloads)} descargas
          </div>
        </div>

        {/* Version and Size */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>v{product.version}</span>
          <span>{product.size}</span>
        </div>

        {/* Action button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
          onClick={() => window.location.href = `/software/${product.id}`}
        >
          <span>Ver Detalles</span>
          <Eye className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
