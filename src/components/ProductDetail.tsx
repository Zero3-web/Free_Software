import { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [activeTab, setActiveTab] = useState('overview');
  const { showSuccess, showError, showWarning } = useNotifications();

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      showSuccess(`${product.name} agregado a favoritos`);
    } else {
      showSuccess(`${product.name} removido de favoritos`);
    }
  };

  const handleDownload = () => {
    showSuccess(`Iniciando descarga de ${product.name}...`);
    // Aquí iría la lógica real de descarga
    setTimeout(() => {
      showSuccess('¡Descarga completada! Revisa tu carpeta de descargas.');
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).then(() => {
        showSuccess('Enlace compartido correctamente');
      }).catch(() => {
        showError('Error al compartir');
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        showSuccess('Enlace copiado al portapapeles');
      }).catch(() => {
        showError('Error al copiar enlace');
      });
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
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const tabs = [
    { id: 'overview', label: 'Descripción' },
    { id: 'features', label: 'Características' },
    { id: 'requirements', label: 'Requisitos' },
    { id: 'related', label: 'Relacionados' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al catálogo</span>
        </motion.button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column - Image and quick info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Product image */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden mb-6">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {product.company.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {product.rating}
                </div>
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(product.rating)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Calificación promedio
                </div>
              </div>
              <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatDownloads(product.downloads)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total de descargas
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-md">
                  {product.company}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleFavoriteToggle}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite
                          ? 'text-red-500 fill-current'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                    />
                  </button>
                  <ShareButtons 
                    title={product.name}
                    description={product.description}
                  />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            {/* Tags and Badges */}
            <div className="space-y-4 mb-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Product Badges */}
              {product.badges && product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.badges.map((badge, index) => (
                    <ProductBadge key={badge} badge={badge} index={index} />
                  ))}
                </div>
              )}

              {/* Security Indicators */}
              {product.securityBadges && product.securityBadges.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Indicadores de Seguridad
                  </h3>
                  <SecurityIndicators badges={product.securityBadges} size="md" />
                </div>
              )}
            </div>

            {/* Version and info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Versión</div>
                <div className="font-semibold text-gray-900 dark:text-white">{product.version}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tamaño</div>
                <div className="font-semibold text-gray-900 dark:text-white">{product.size}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Categoría</div>
                <div className="font-semibold text-gray-900 dark:text-white">{product.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Fecha de lanzamiento</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {new Date(product.releaseDate).toLocaleDateString('es-ES')}
                </div>
              </div>
            </div>

            
          </motion.div>
        </div>

        {/* Detailed information tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          {/* Tab navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Descripción */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-lg dark:prose-invert max-w-none"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Acerca de {product.name}
                  </h3>
                  <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {product.fullDescription}
                  </div>
                </motion.div>
              )}

              {/* Requisitos del sistema debajo de la descripción */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Requisitos del Sistema
                </h3>
                <div className="space-y-4">
                  <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Monitor className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Sistema Operativo
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {product.systemRequirements.os.join(', ')}
                    </p>
                  </div>
                  <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Cpu className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Procesador
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {product.systemRequirements.processor}
                    </p>
                  </div>
                  <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <HardDrive className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Memoria RAM
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {product.systemRequirements.memory}
                    </p>
                  </div>
                  <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <HardDrive className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Espacio de Almacenamiento
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {product.systemRequirements.storage}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Características debajo de requisitos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Características Principales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-[var(--bg-primary)] rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Download info */}
              <div className="bg-[var(--bg-primary)] p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Información de Descarga
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tamaño:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Versión:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Idioma:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Español/Inglés</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Licencia:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Gratuita</span>
                  </div>
                </div>
              </div>

              {/* Support info */}
              <div className="bg-[var(--bg-primary)] p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Soporte y Ayuda
                </h4>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Documentación oficial</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Users className="w-4 h-4" />
                    <span>Comunidad de usuarios</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Tutoriales y guías</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Botón de descarga al final de todo */}
        <div className="flex flex-col items-center justify-center mt-16 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="w-full max-w-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-8 rounded-lg text-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-3 shadow-xl mb-2"
          >
            <Download className="w-7 h-7" />
            <span>Descargar Gratis</span>
          </motion.button>
          <p className="text-base text-gray-600 dark:text-gray-400 text-center mt-2">
            ✓ Descarga completamente gratuita • ✓ Sin virus • ✓ Sin spyware
          </p>
        </div>
      </div>
    </div>
  );
}
