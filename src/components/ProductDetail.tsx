import { useState, useEffect } from 'react';
import { 
  Download, 
  Star, 
  Heart, 
  Share2, 
  Monitor, 
  HardDrive, 
  Cpu, 
  Calendar,
  Users,
  CheckCircle,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import type { Product } from '../data/products';
import { useNotifications } from '../contexts/NotificationContext';
import { SecurityIndicators } from './SecurityBadge';
import ShareButtons from './ShareButtons';
import ProductBadge from './ProductBadge';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  // Fallback: mostrar imagen tras 500ms aunque no dispare onLoad
  useEffect(() => {
    if (!product.image) return;
    setImageLoaded(false);
    const timer = setTimeout(() => setImageLoaded(true), 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [product.image]);
  const [activeTab, setActiveTab] = useState('overview');
  const { showSuccess, showError, showWarning } = useNotifications();

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      showSuccess(`${product.name} added to favorites`);
    } else {
      showSuccess(`${product.name} removed from favorites`);
    }
  };

  const handleDownload = () => {
    showSuccess(`Starting download of ${product.name}...`);
    // Real download logic would go here
    setTimeout(() => {
      showSuccess('Download completed! Check your downloads folder.');
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href);
      showSuccess('Enlace copiado al portapapeles');
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver</span>
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Product Header */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <div className="flex items-start space-x-6">
              {/* Product Icon */}
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img
                    key={product.image}
                    src={product.image}
                    alt={`${product.name} logo`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                    loading="lazy"
                  />
                ) : (product as any).icon ? (
                  <img 
                    src={(product as any).icon} 
                    alt={`${product.name} icon`}
                    className={`w-28 h-28 object-contain transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                    loading="lazy"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {product.company?.charAt(0) || product.name.charAt(0)}
                  </span>
                )}
                {!imageLoaded && (product.image || (product as any).icon) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <p className="text-lg text-gray-600 mb-1">{product.company}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    
                    {/* Badges */}
                    {product.badges && product.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {product.badges.map((badge, index) => (
                          <ProductBadge key={badge} badge={badge} index={index} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleFavoriteToggle}
                      className={`p-3 rounded-full transition-colors ${
                        isFavorite 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{formatRating(product.rating)}</span>
                    <span className="text-gray-500">({formatDownloads(product.downloads)} downloads)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Características principales</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {product.requirements && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requisitos del sistema</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Mínimos</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4" />
                      <span>OS: {product.requirements.minimum?.os || 'No especificado'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4" />
                      <span>CPU: {product.requirements.minimum?.cpu || 'No especificado'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <HardDrive className="w-4 h-4" />
                      <span>RAM: {product.requirements.minimum?.ram || 'No especificado'}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Recomendados</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4" />
                      <span>OS: {product.requirements.recommended?.os || 'No especificado'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4" />
                      <span>CPU: {product.requirements.recommended?.cpu || 'No especificado'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <HardDrive className="w-4 h-4" />
                      <span>RAM: {product.requirements.recommended?.ram || 'No especificado'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Software Info</h2>
              <p className="text-gray-600">Version {product.version}</p>
              <p className="text-sm text-gray-500">{product.size}</p>
            </div>

            {/* Security Indicators */}
            <div className="mb-6">
              <SecurityIndicators 
                badges={['verified', 'virus-free', 'secure']}
                size="sm"
              />
            </div>

            {/* Alternative Links */}
            <div className="space-y-2">
              {product.downloadUrl && (
                <a
                  href={product.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Official Website</span>
                </a>
              )}
              {(product as any).websiteUrl && (
                <a
                  href={(product as any).websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Learn More</span>
                </a>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Developer:</span>
                <span className="font-medium">{product.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">License:</span>
                <span className="font-medium">
                  {product.priceType === 'free' ? 'Free' : 
                   product.priceType === 'open-source' ? 'Open Source' : 
                   'Freemium'}
                </span>
              </div>
              {product.releaseDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Release:</span>
                  <span className="font-medium">{formatDate(product.releaseDate)}</span>
                </div>
              )}
              {product.platforms && product.platforms.length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-2">Platforms:</span>
                  <div className="flex flex-wrap gap-1">
                    {product.platforms.map((platform) => (
                      <span 
                        key={platform}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Download Section - Moved to bottom */}
      <div className="max-w-4xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center border border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Download {product.name}</h2>
          <p className="text-gray-600 mb-6">Version {product.version} • {product.size}</p>
          
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-3 mx-auto text-lg shadow-lg transform hover:scale-105"
          >
            <Download className="w-6 h-6" />
            <span>Download Free</span>
          </button>
          
          <p className="text-sm text-gray-500 mt-4">100% Safe • No Ads • Direct Download</p>
        </div>
      </div>
    </div>
  );
}
