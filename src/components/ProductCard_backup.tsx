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
  const { showSuccess } = useNotifications();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (propOnFavoriteClick) {
      propOnFavoriteClick();
    } else {
      setIsFavorite(!isFavorite);
      showSuccess(`${product.name} ${!isFavorite ? 'agregado a' : 'removido de'} favoritos`);
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
      'free': 'bg-green-100 text-green-800 border-green-200',
      'freemium': 'bg-blue-100 text-blue-800 border-blue-200',
      'open-source': 'bg-purple-100 text-purple-800 border-purple-200',
      'trial': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type as keyof typeof colors] || colors.free;
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group ${className}`}
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      {/* Schema.org microdata */}
      <meta itemProp="name" content={product.name} />
      <meta itemProp="description" content={product.description} />
      <meta itemProp="applicationCategory" content={product.category} />
      <meta itemProp="operatingSystem" content={product.systemRequirements?.os?.join(', ') || 'Cross-platform'} />
      <meta itemProp="softwareVersion" content={product.version} />
      <meta itemProp="fileSize" content={product.size} />
      
      <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating" style={{ display: 'none' }}>
        <meta itemProp="ratingValue" content={product.rating.toString()} />
        <meta itemProp="bestRating" content="5" />
        <meta itemProp="ratingCount" content={Math.floor(product.downloads / 10).toString()} />
      </div>
      
      <div itemProp="offers" itemScope itemType="https://schema.org/Offer" style={{ display: 'none' }}>
        <meta itemProp="price" content="0" />
        <meta itemProp="priceCurrency" content="USD" />
        <meta itemProp="availability" content="https://schema.org/InStock" />
      </div>

      {/* Image Container */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {product.company?.charAt(0) || product.name.charAt(0)}
              </span>
            </div>
          </div>
        )}
        
        <img
          src={product.image}
          alt={`${product.name} - ${product.description}`}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {product.badges.slice(0, 2).map((badge, index) => (
              <ProductBadge key={badge} badge={badge} index={index} />
            ))}
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
          aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite
                ? 'text-red-500 fill-current'
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>

        {/* Price Type Badge */}
        <div className={`absolute bottom-3 left-3 px-2 py-1 text-xs font-medium rounded-md ${getBadgeColor(product.priceType || 'free')}`}>
          {product.priceType === 'free' ? 'Free' : 
           product.priceType === 'freemium' ? 'Freemium' :
           product.priceType === 'open-source' ? 'Open Source' :
           product.priceType === 'trial' ? 'Free Trial' : 'Free'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {product.name}
          </h3>
          {product.company && (
            <p className="text-sm text-gray-600 mb-2">{product.company}</p>
          )}
          {showDescription && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Rating and Downloads */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {formatDownloads(product.downloads)} downloads
          </div>
        </div>

        {/* Action Button */}
        <Button
          href={`/software/${product.id}`}
          variant="primary"
          size="sm"
          className="w-full"
          aria-label={`View details for ${product.name}`}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </div>
    </div>
  );
}
