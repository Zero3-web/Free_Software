import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Heart } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export default function Toast({ 
  isVisible, 
  onClose, 
  type = 'success', 
  title, 
  message, 
  duration = 3000 
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <X className="w-6 h-6 text-red-500" />;
      case 'info':
        return <Heart className="w-6 h-6 text-blue-500" />;
      default:
        return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-white dark:bg-gray-800 border-l-4 border-green-500';
      case 'error':
        return 'bg-white dark:bg-gray-800 border-l-4 border-red-500';
      case 'info':
        return 'bg-white dark:bg-gray-800 border-l-4 border-blue-500';
      default:
        return 'bg-white dark:bg-gray-800 border-l-4 border-green-500';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className={`${getBackgroundColor()} rounded-lg shadow-lg p-4`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {title}
                </p>
                {message && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {message}
                  </p>
                )}
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  aria-label="Cerrar notificación"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
