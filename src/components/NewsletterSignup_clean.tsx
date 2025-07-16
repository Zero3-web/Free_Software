import { useState } from 'react';
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
  title = 'Mantente al día',
  description = 'Recibe las últimas actualizaciones de software gratuito directamente en tu email.',
  className = ''
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      showError('Por favor, introduce un email válido');
      return;
    }

    setIsLoading(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubscribed(true);
      showSuccess('¡Te has suscrito exitosamente!');
      setEmail('');
      
      // Reset después de 3 segundos
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
      
    } catch (error) {
      showError('Error al suscribirse. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'modal':
        return 'bg-white';
      case 'footer':
        return 'bg-gradient-to-r from-blue-50 to-purple-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className={`p-6 rounded-xl ${getVariantStyles()} ${className}`}>
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          {isSubscribed ? (
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          {isSubscribed ? '¡Suscripción exitosa!' : title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {isSubscribed 
            ? 'Gracias por suscribirte. Recibirás nuestras mejores actualizaciones.'
            : description
          }
        </p>

        {!isSubscribed && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Suscribiendo...' : 'Suscribirse'}
              </button>
            </div>
            
            <p className="text-xs text-gray-500">
              No spam. Puedes cancelar la suscripción en cualquier momento.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
