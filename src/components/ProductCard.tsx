import { useState } from 'react';
import { Star, Heart, ExternalLink } from 'lucide-react';
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
    } else if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}K`;
    }
    return downloads.toString();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const getPriceTypeColor = (type: string) => {
    const colors = {
      'free': 'bg-green-100 text-green-800 border-green-200',
      'freemium': 'bg-blue-100 text-blue-800 border-blue-200',
      'open-source': 'bg-purple-100 text-purple-800 border-purple-200',
      'trial': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[type as keyof typeof colors] || colors.free;
  };

  const getFavoriteState = () => {
    return propIsFavorited !== undefined ? propIsFavorited : isFavorite;
  };

  if (layout === 'list') {
    return (
      <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 ease-out overflow-hidden group ${className}`}>
        <div className="p-4 sm:p-6">
          {/* Mobile Layout */}
          <div className="flex flex-col sm:hidden space-y-3">
            <div className="flex items-center space-x-3">
              {/* Product Image */}
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {product.company?.charAt(0) || product.name.charAt(0)}
                </span>
              </div>
              
              {/* Title and Company */}
              <div className="flex-1 min-w-0">
                <h3 className="text-responsive-base font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-600 truncate">{product.company}</p>
              </div>
              
              {/* Favorite Button */}
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                  getFavoriteState() ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${getFavoriteState() ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            {/* Rating and Category */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{formatRating(product.rating)}</span>
                <span className="text-gray-500">({formatDownloads(product.downloads)})</span>
              </div>
              <span className="text-gray-500">{product.category}</span>
            </div>
            
            {/* Action Button */}
            <Button
              href={`/software/${product.id}`}
              variant="primary"
              size="sm"
              className="w-full"
            >
              Ver Detalles
            </Button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center space-x-6">
            {/* Product Image */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {product.company?.charAt(0) || product.name.charAt(0)}
              </span>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-responsive-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                  <p className="text-responsive-sm text-gray-600 truncate">{product.company}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span>{product.category}</span>
                    <span>v{product.version}</span>
                    <span>{product.size}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-responsive-sm font-medium">{formatRating(product.rating)}</span>
                    <span className="text-xs text-gray-500">({formatDownloads(product.downloads)})</span>
                  </div>
                  <button
                    onClick={handleFavoriteToggle}
                    className={`p-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                      getFavoriteState() ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${getFavoriteState() ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              <Button
                href={`/software/${product.id}`}
                variant="primary"
                size="sm"
                className="whitespace-nowrap"
              >
                Ver Detalles
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 ease-out overflow-hidden group transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Schema.org microdata - hidden from visual but available to search engines */}
      <div style={{ display: 'none' }}>
        <span itemProp="name">{product.name}</span>
        <span itemProp="description">{product.description}</span>
        <span itemProp="applicationCategory">{product.category}</span>
        <span itemProp="operatingSystem">{product.platforms?.join(', ')}</span>
        <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
          <span itemProp="ratingValue">{product.rating}</span>
          <span itemProp="ratingCount">{product.downloads}</span>
        </div>
        <div itemProp="author" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">{product.company}</span>
        </div>
      </div>

      {/* Product Image/Icon */}
      <div className="relative h-36 sm:h-44 lg:h-48 overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {product.company?.charAt(0) || product.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 touch-manipulation ${
            getFavoriteState() 
              ? 'bg-white text-red-500 shadow-md' 
              : 'bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100 hover:text-red-500'
          }`}
        >
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 ${getFavoriteState() ? 'fill-current' : ''}`} />
        </button>

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1">
            {product.badges.slice(0, 2).map((badge, index) => (
              <ProductBadge key={badge} badge={badge} index={index} />
            ))}
          </div>
        )}

        {/* Price Type Badge */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
          <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-105 ${getPriceTypeColor(product.priceType || 'free')}`}>
            {product.priceType === 'free' ? 'Free' : 
             product.priceType === 'freemium' ? 'Freemium' :
             product.priceType === 'open-source' ? 'Open Source' : 'Free'}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="mb-3 sm:mb-4">
          <h3 className="text-responsive-base sm:text-responsive-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 truncate">{product.company}</p>
          
          {showDescription && (
            <p className="text-sm text-gray-700 line-clamp-2 hidden sm:block">
              {product.description}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm font-medium">{formatRating(product.rating)}</span>
            <span className="text-xs text-gray-500">
              ({formatDownloads(product.downloads)})
            </span>
          </div>
          
          <div className="text-xs text-gray-500 truncate ml-2">
            {product.category}
          </div>
        </div>

        {/* Platform support */}
        {product.platforms && product.platforms.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1">
              {product.platforms.slice(0, 3).map((platform) => (
                <span 
                  key={platform}
                  className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {platform}
                </span>
              ))}
              {product.platforms.length > 3 && (
                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  +{product.platforms.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Version and Size */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          <span>v{product.version}</span>
          <span>{product.size}</span>
        </div>

        {/* Action button */}
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 sm:py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer hover:scale-105 hover:shadow-lg touch-manipulation text-sm sm:text-base"
          onClick={() => window.location.href = `/software/${product.id}`}
        >
          <span>View Details</span>
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-12" />
        </button>
      </div>
    </div>
  );
}
