import { useState } from 'react';
import FullScreenLoader from './FullScreenLoader';

interface LoadingWrapperProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  loadingDuration?: number;
}

export default function LoadingWrapper({ 
  children, 
  href, 
  onClick, 
  className = '', 
  loadingDuration = 1400 
}: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    if (href && (href.includes('/blog') || href.includes('/sobre-nosotros'))) {
      e.preventDefault();
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, loadingDuration));
      
      window.location.href = href;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <FullScreenLoader isVisible={isLoading} />
      {href ? (
        <a 
          href={href} 
          className={className}
          onClick={handleClick}
        >
          {children}
        </a>
      ) : (
        <button 
          className={className}
          onClick={handleClick}
        >
          {children}
        </button>
      )}
    </>
  );
}
