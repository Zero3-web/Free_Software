import { useState, useEffect, useRef } from 'react';

interface EnhancedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  blurhash?: string;
  aspectRatio?: string;
}

export default function EnhancedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'empty',
  quality = 75,
  onLoad,
  onError,
  lazy = true,
  blurhash,
  aspectRatio
}: EnhancedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(!lazy);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isIntersecting]);

  // Generate WebP and AVIF sources from original src
  const generateSources = (baseSrc: string) => {
    const basePath = baseSrc.replace(/\.[^/.]+$/, '');
    const extension = baseSrc.split('.').pop()?.toLowerCase();
    
    // If already WebP or AVIF, return as is
    if (extension === 'webp' || extension === 'avif') {
      return { avif: baseSrc, webp: baseSrc, fallback: baseSrc };
    }
    
    // Generate optimized versions
    const queryParams = new URLSearchParams();
    if (quality !== 75) queryParams.set('q', quality.toString());
    if (width) queryParams.set('w', width.toString());
    if (height) queryParams.set('h', height.toString());
    
    const queryString = queryParams.toString();
    const suffix = queryString ? `?${queryString}` : '';
    
    return {
      avif: `${basePath}.avif${suffix}`,
      webp: `${basePath}.webp${suffix}`,
      fallback: `${baseSrc}${suffix}`
    };
  };

  const sources = generateSources(src);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setLoadAttempts(prev => prev + 1);
    
    // Try fallback formats
    if (loadAttempts === 0 && imgRef.current) {
      // First attempt failed, try WebP
      imgRef.current.src = sources.webp;
      return;
    } else if (loadAttempts === 1 && imgRef.current) {
      // Second attempt failed, try original
      imgRef.current.src = sources.fallback;
      return;
    }
    
    // All attempts failed
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined) 
      }}
    >
      {/* Loading skeleton */}
      {isLoading && placeholder !== 'empty' && (
        <div className="absolute inset-0 skeleton animate-shimmer" />
      )}
      
      {/* Blurhash placeholder */}
      {isLoading && blurhash && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,${btoa(`
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" fill="#f3f4f6"/>
              </svg>
            `)}")`
          }}
        />
      )}
      
      {/* Error fallback */}
      {hasError ? (
        <div className="img-placeholder h-full w-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Failed to load image</span>
          </div>
          <span className="sr-only">Image failed to load: {alt}</span>
        </div>
      ) : (
        <picture className="w-full h-full">
          {/* AVIF source for modern browsers */}
          <source 
            srcSet={sources.avif} 
            type="image/avif" 
            sizes={sizes}
          />
          {/* WebP source for most browsers */}
          <source 
            srcSet={sources.webp} 
            type="image/webp" 
            sizes={sizes}
          />
          {/* Fallback for older browsers */}
          <img
            ref={imgRef}
            src={sources.fallback}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            sizes={sizes}
            className={`img-optimized w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
            }}
          />
        </picture>
      )}
      
      {/* Load status indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 text-xs bg-black bg-opacity-50 text-white px-1 rounded">
          {isLoading ? 'Loading...' : hasError ? 'Error' : 'Loaded'}
          {loadAttempts > 0 && ` (${loadAttempts} attempts)`}
        </div>
      )}
    </div>
  );
}
