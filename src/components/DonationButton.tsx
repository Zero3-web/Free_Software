import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { SiKofi, SiPaypal, SiPatreon } from 'react-icons/si';
import { MdCoffee } from 'react-icons/md';

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
  const [showThankYou, setShowThankYou] = useState(false);

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
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  if (variant === 'floating') {
    return (
      <div className={`${positionClasses[variant]} ${className}`}>
        {/* Floating Donation Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            ${sizeClasses[size]} rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg
            hover:shadow-xl hover:scale-105 transition-all duration-300 transform
          `}
          title="¡Apóyanos con una donación!"
        >
          <Heart className={`${iconSizes[size]} animate-pulse`} />
        </button>

        {/* Thank You Notification */}
        {showThankYou && (
          <div className="absolute bottom-full right-0 mb-4 bg-green-500 text-white p-3 rounded-lg shadow-lg transition-all duration-300">
            <p className="text-sm font-medium">¡Gracias por tu apoyo! 💝</p>
          </div>
        )}

        {/* Donation Panel */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            />

            {/* Donation Modal */}
            <div className="absolute bottom-full right-0 mb-4 bg-white rounded-xl p-6 shadow-2xl border w-80 z-50 transform transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-900">¡Apóyanos!</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Si te gusta nuestro trabajo, considera hacer una donación para ayudarnos a mantener el sitio gratuito y actualizado.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {donationPlatforms.map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <button
                      key={platform.name}
                      onClick={() => handleDonation(platform)}
                      className={`flex flex-col items-center p-3 rounded-lg text-white transition-all duration-200 hover:scale-105 transform ${platform.color}`}
                      title={platform.description}
                    >
                      <IconComponent className="text-lg mb-1" />
                      <span className="text-xs font-medium text-center">{platform.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  ¡Toda donación es apreciada! 💝
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Inline or Footer variant
  return (
    <div className={`${positionClasses[variant]} ${className}`}>
      <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-6 border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Heart className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              ¿Te gusta nuestro trabajo?
            </h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Ayúdanos a mantener este sitio gratuito y actualizado con una pequeña donación.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {donationPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <button
                  key={platform.name}
                  onClick={() => handleDonation(platform)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition-all duration-200 hover:scale-105 transform ${platform.color}`}
                >
                  <IconComponent className="text-lg" />
                  <span className="font-medium">{platform.name}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-500">
            ¡Cada donación nos ayuda a seguir creciendo! ✨
          </p>
        </div>
      </div>
    </div>
  );
}
