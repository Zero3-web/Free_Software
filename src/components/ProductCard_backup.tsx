import { useState } from 'react';
import { Star, Heart, ExternalLink   const getPriceTypeColor = (type: string) => {
    const colors = {
      'free': 'bg-green-100 text-green-800 border-green-200',
      'freemium': 'bg-blue-100 text-blue-800 border-blue-200',
      'open-source': 'bg-purple-100 text-purple-800 border-purple-200',
      'trial': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[type as keyof typeof colors] || colors.free;
  };ucide-react';
import type { Product } from '../data/products';
import { useNotifications } from '../contexts/NotificationContext';
import ProductBadge from './ProductBadge';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  className?: string;
  showDescription?: boolean;
  layout?: 'grid' | 'list';
  isFavorited?: boolean;
  onFavoriteClick?: () => void;
}

export default function ProductCard({ 
  product, 
  className = '', 
  showDescription = true,
  layout = 'grid',
  isFavorited: propIsFavorited,
  onFavoriteClick: propOnFavoriteClick
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(propIsFavorited || false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (propOnFavoriteClick) {
      propOnFavoriteClick();
    } else {
      setIsFavorite(!isFavorite);
      if (!isFavorite) {
        showSuccess(`${product.name} agregado a favoritos`);
      } else {
        showSuccess(`${product.name} removido de favoritos`);
      }
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

  const getBadgeColor = (type: string) => {
    const colors = {
      'free': 'bg-[var(--success-bg)] text-[var(--success)] border-[var(--success-border)]',
      'freemium': 'bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning-border)]',
      'open-source': 'bg-[var(--info-bg)] text-[var(--info)] border-[var(--info-border)]',
      'trial': 'bg-[var(--error-bg)] text-[var(--error)] border-[var(--error-border)]'
    };
    return colors[type as keyof typeof colors] || colors.free;
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      {/* Schema.org microdata - hidden from visual but available to search engines */}
      <meta itemProp="name" content={product.name} />
      <meta itemProp="description" content={product.description} />
      <meta itemProp="applicationCategory" content={product.category} />
      <meta itemProp="operatingSystem" content={product.systemRequirements.os.join(', ')} />
      <meta itemProp="softwareVersion" content={product.version} />
      <meta itemProp="fileSize" content={product.size} />
      <meta itemProp="downloadUrl" content={`https://software-gratis.com/software/${product.id}`} />
      <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating" style={{ display: 'none' }}>
        <meta itemProp="ratingValue" content={product.rating.toString()} />
        <meta itemProp="bestRating" content="5" />
        <meta itemProp="ratingCount" content={Math.floor(product.downloads / 10).toString()} />
      </div>
      <div itemProp="offers" itemScope itemType="https://schema.org/Offer" style={{ display: 'none' }}>
        <meta itemProp="price" content="0" />
        <meta itemProp="priceCurrency" content="EUR" />
        <meta itemProp="availability" content="https://schema.org/InStock" />
      </div>
      {/* Image Container */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
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
        {/* Removed Eye and Download icon buttons for cleaner card UI */}

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
                : 'text-gray-600'
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
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600">
            {product.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100">
              +{product.tags.length - 3}
            </span>
          )}
        </div>

        {/* Rating and Downloads */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600">
              {product.rating}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {formatDownloads(product.downloads)} descargas
          </div>
        </div>

        {/* Version and Size */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>v{product.version}</span>
          <span>{product.size}</span>
        </div>

        {/* Action button */}
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
          onClick={() => window.location.href = `/software/${product.id}`}
        >
          <span>Ver Detalles</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
