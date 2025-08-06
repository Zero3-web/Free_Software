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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Back Button - Mobile optimized */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 sm:mb-6 transition-colors touch-target p-2 -ml-2 rounded-lg"
        aria-label="Volver a la página anterior"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base font-medium">Volver</span>
      </button>

      {/* Mobile-first responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Product Header - Mobile optimized */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Product Icon - Responsive sizing */}
              <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden mx-auto sm:mx-0 border-2 border-gray-100">
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
                    className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 object-contain transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                    loading="lazy"
                  />
                ) : (
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-600">
                    {product.company?.charAt(0) || product.name.charAt(0)}
                  </span>
                )}
                {!imageLoaded && (product.image || (product as any).icon) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Product Info - Mobile optimized */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                  <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                    <p className="text-lg sm:text-xl text-gray-700 font-medium">{product.company}</p>
                    <p className="text-sm sm:text-base text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">{product.category}</p>
                    
                    {/* Badges - Mobile responsive */}
                    {product.badges && product.badges.length > 0 && (
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                        {product.badges.map((badge, index) => (
                          <ProductBadge key={badge} badge={badge} index={index} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons - Mobile optimized */}
                  <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-2">
                    <button
                      onClick={handleFavoriteToggle}
                      className={`touch-target p-3 sm:p-2 rounded-full transition-all duration-200 ${
                        isFavorite 
                          ? 'bg-red-100 text-red-600 shadow-lg scale-105' 
                          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                      }`}
                      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="touch-target p-3 sm:p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                      aria-label="Compartir producto"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stats - Mobile optimized */}
                <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-6 mt-4 sm:mt-6">
                  <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-2 rounded-lg">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                    <span className="font-bold text-gray-900 text-sm sm:text-base">{formatRating(product.rating)}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="font-semibold">{formatDownloads(product.downloads)}</span> downloads
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description - Mobile optimized */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Descripción</h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">{product.description}</p>
          </div>

          {/* Features - Mobile optimized */}
          {product.features && product.features.length > 0 && (
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Características principales</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements - Mobile optimized */}
          {product.requirements && (
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Requisitos del sistema</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Mínimos</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                    <li className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <Monitor className="w-4 h-4 text-blue-600" />
                      <span><strong>OS:</strong> {product.requirements.minimum?.os || 'No especificado'}</span>
                    </li>
                    <li className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span><strong>CPU:</strong> {product.requirements.minimum?.cpu || 'No especificado'}</span>
                    </li>
                    <li className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <HardDrive className="w-4 h-4 text-blue-600" />
                      <span><strong>RAM:</strong> {product.requirements.minimum?.ram || 'No especificado'}</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Recomendados</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                    <li className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                      <Monitor className="w-4 h-4 text-blue-600" />
                      <span><strong>OS:</strong> {product.requirements.recommended?.os || 'No especificado'}</span>
                    </li>
                    <li className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span><strong>CPU:</strong> {product.requirements.recommended?.cpu || 'No especificado'}</span>
                    </li>
                    <li className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                      <HardDrive className="w-4 h-4 text-blue-600" />
                      <span><strong>RAM:</strong> {product.requirements.recommended?.ram || 'No especificado'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Mobile optimized with better download section */}
        <div className="lg:col-span-1">
          {/* Sticky Download Section for Mobile */}
          <div className="lg:sticky lg:top-8 space-y-4 sm:space-y-6">
            {/* Download Card - Enhanced for mobile */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
              {/* Download Header */}
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Download Info</h2>
                <div className="space-y-1">
                  <p className="text-gray-700 font-medium">Version {product.version}</p>
                  <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">{product.size}</p>
                </div>
              </div>

              {/* Primary Download Button - Mobile optimized */}
              <button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 mb-4 touch-target"
                aria-label={`Descargar ${product.name}`}
              >
                <Download className="w-6 h-6" />
                <span>Download Free</span>
              </button>

              {/* Security Indicators - Mobile optimized */}
              <div className="mb-4 sm:mb-6">
                <SecurityIndicators 
                  badges={['verified', 'virus-free', 'secure']}
                  size="sm"
                />
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="font-semibold text-gray-900">Release Date</div>
                  <div className="text-gray-600 text-xs mt-1">{formatDate(product.releaseDate || new Date().toISOString())}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="font-semibold text-gray-900">Developer</div>
                  <div className="text-gray-600 text-xs mt-1">{product.company}</div>
                </div>
              </div>

              {/* Alternative Links - Mobile optimized */}
              <div className="space-y-2">
                {product.downloadUrl && (
                  <a
                    href={product.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 border border-gray-200 touch-target"
                    aria-label={`Visitar sitio oficial de ${product.name}`}
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
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 border border-gray-200 touch-target"
                    aria-label={`Más información sobre ${product.name}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Learn More</span>
                  </a>
                )}
              </div>
            </div>

            {/* Additional Info Card - Mobile optimized */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Developer:</span>
                  <span className="font-medium text-gray-900 text-sm">{product.company}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Category:</span>
                  <span className="font-medium text-gray-900 text-sm">{product.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">License:</span>
                  <span className="font-medium text-gray-900 text-sm">
                    {product.priceType === 'free' ? 'Free' : 
                     product.priceType === 'open-source' ? 'Open Source' : 
                     'Freemium'}
                  </span>
                </div>
                {product.releaseDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Release:</span>
                    <span className="font-medium text-gray-900 text-sm">{formatDate(product.releaseDate)}</span>
                  </div>
                )}
                {product.platforms && product.platforms.length > 0 && (
                  <div>
                    <span className="text-gray-600 text-sm block mb-2">Platforms:</span>
                    <div className="flex flex-wrap gap-1">
                      {product.platforms.map((platform) => (
                        <span 
                          key={platform}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
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
      </div>

      {/* Mobile Fixed Download Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
        <button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center space-x-3 touch-target"
          aria-label={`Descargar ${product.name}`}
        >
          <Download className="w-6 h-6" />
          <span>Download Free</span>
        </button>
      </div>
    </div>
  );
}
