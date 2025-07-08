import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal' | 'footer';
  title?: string;
  description?: string;
  className?: string;
}

export default function NewsletterSignup({ 
  variant = 'inline', 
  title = 'No te pierdas ninguna actualización',
  description = 'Suscríbete a nuestro newsletter para recibir las últimas novedades sobre software gratuito',
  className = '' 
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      showError('Por favor, introduce un email válido');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubscribed(true);
      setEmail('');
      showSuccess('¡Te has suscrito correctamente! Revisa tu email para confirmar.');
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      showError('Hubo un error al suscribirte. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'modal':
        return 'bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md mx-auto';
      case 'footer':
        return 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${getVariantStyles()} ${className}`}
    >
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          {isSubscribed ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </motion.div>
          ) : (
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {isSubscribed ? '¡Suscripción exitosa!' : title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {isSubscribed 
            ? 'Te hemos enviado un email de confirmación. ¡Bienvenido/a a nuestra comunidad!'
            : description
          }
        </p>

        {!isSubscribed && (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="tu-email@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-describedby="newsletter-description"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting || !email}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Suscribiendo...</span>
                  </div>
                ) : (
                  'Suscribirse'
                )}
              </motion.button>
            </div>
          </form>
        )}

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>
            Al suscribirte, aceptas recibir emails de Software Gratis. 
            <br />
            Puedes cancelar la suscripción en cualquier momento.
          </p>
        </div>

        {variant === 'inline' && (
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Sin spam</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Cancelar cuando quieras</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Contenido exclusivo</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
