import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { SiKofi, SiPaypal, SiPatreon } from 'react-icons/si';
import { MdCoffee } from 'react-icons/md';
import { useNotifications } from '../contexts/NotificationContext';

interface DonationButtonProps {
  variant?: 'floating' | 'inline' | 'footer';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const donationPlatforms = [
  {
    name: 'Buy Me a Coffee',
    icon: MdCoffee,
    color: 'bg-yellow-500 hover:bg-yellow-600',
    url: 'https://buymeacoffee.com/softwaregratis',
    description: '¡Invítanos un café!'
  },
  {
    name: 'Ko-fi',
    icon: SiKofi,
    color: 'bg-blue-500 hover:bg-blue-600',
    url: 'https://ko-fi.com/softwaregratis',
    description: 'Apóyanos en Ko-fi'
  },
  {
    name: 'PayPal',
    icon: SiPaypal,
    color: 'bg-blue-700 hover:bg-blue-800',
    url: 'https://paypal.me/softwaregratis',
    description: 'Donación via PayPal'
  },
  {
    name: 'Patreon',
    icon: SiPatreon,
    color: 'bg-orange-500 hover:bg-orange-600',
    url: 'https://patreon.com/softwaregratis',
    description: 'Suscríbete en Patreon'
  }
];

export default function DonationButton({ variant = 'floating', size = 'md', className = '' }: DonationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { showSuccess } = useNotifications();

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const positionClasses = {
    floating: 'fixed bottom-6 right-6 z-50',
    inline: '',
    footer: 'w-full'
  };

  const handleDonation = (platform: typeof donationPlatforms[0]) => {
    window.open(platform.url, '_blank');
    setIsOpen(false);
    showSuccess(`¡Gracias por considerar apoyarnos a través de ${platform.name}!`);
  };

  if (variant === 'floating') {
    return (
      <div className={`${positionClasses[variant]} ${className}`}>
        {/* Floating Donation Button */}
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            ${sizeClasses[size]} rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg
            hover:shadow-xl transition-all duration-300
          `}
          title="¡Apóyanos con una donación!"
        >
          <Heart className={`${iconSizes[size]} animate-pulse`} />
        </motion.button>

        {/* Donation Panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Donation Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-full right-0 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-6 w-80 z-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>¡Apóyanos!</span>
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Si te gusta nuestro trabajo, considera hacer una donación para ayudarnos a mantener el sitio gratuito y actualizado.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {donationPlatforms.map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                      <motion.button
                        key={platform.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDonation(platform)}
                        className={`flex flex-col items-center p-3 rounded-lg text-white transition-colors ${platform.color}`}
                        title={platform.description}
                      >
                        <IconComponent className="text-lg mb-1" />
                        <span className="text-xs font-medium text-center">{platform.name}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ¡Toda donación es apreciada! 💝
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Inline or Footer variant
  return (
    <div className={`${positionClasses[variant]} ${className}`}>
      <div className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Heart className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              ¿Te gusta nuestro trabajo?
            </h3>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Ayúdanos a mantener este sitio gratuito y actualizado con una pequeña donación.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {donationPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <motion.button
                  key={platform.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDonation(platform)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition-colors ${platform.color}`}
                >
                  <IconComponent className="text-lg" />
                  <span className="font-medium">{platform.name}</span>
                </motion.button>
              );
            })}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            ¡Cada donación nos ayuda a seguir creciendo! ✨
          </p>
        </div>
      </div>
    </div>
  );
}
