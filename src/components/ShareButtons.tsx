import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
  className?: string;
}

interface SocialPlatform {
  name: string;
  icon: string;
  color: string;
  getUrl: (title: string, url: string, description?: string) => string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: 'WhatsApp',
    icon: '📱',
    color: 'bg-green-500 hover:bg-green-600',
    getUrl: (title, url, description) => 
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${description || ''}\n${url}`)}`
  },
  {
    name: 'Telegram',
    icon: '✈️',
    color: 'bg-blue-500 hover:bg-blue-600',
    getUrl: (title, url, description) => 
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title}\n${description || ''}`)}`
  },
  {
    name: 'Facebook',
    icon: '📘',
    color: 'bg-blue-600 hover:bg-blue-700',
    getUrl: (title, url) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`
  },
  {
    name: 'X (Twitter)',
    icon: '🐦',
    color: 'bg-black hover:bg-gray-800',
    getUrl: (title, url, description) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}\n${description || ''}`)}&url=${encodeURIComponent(url)}`
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-700 hover:bg-blue-800',
    getUrl: (title, url, description) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || '')}`
  },
  {
    name: 'Reddit',
    icon: '🔄',
    color: 'bg-orange-600 hover:bg-orange-700',
    getUrl: (title, url) => 
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  }
];

export default function ShareButtons({ title, url, description, className = '' }: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showSuccess } = useNotifications();

  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleShare = (platform: SocialPlatform) => {
    const shareUrl = platform.getUrl(title, currentUrl, description);
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    setIsOpen(false);
    showSuccess(`Compartiendo en ${platform.name}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      showSuccess('¡Enlace copiado al portapapeles!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showSuccess('No se pudo copiar el enlace');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span>Compartir</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Share Panel */}
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 min-w-80">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Compartir {title}
              </h3>
              <p className="text-sm text-gray-600">
                Elige tu plataforma favorita
              </p>
            </div>

            {/* Social Platforms */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleShare(platform)}
                  className={`flex items-center space-x-2 p-3 rounded-lg text-white transition-colors ${platform.color}`}
                >
                  <span className="text-lg">{platform.icon}</span>
                  <span className="font-medium">{platform.name}</span>
                </button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="border-t border-gray-200 pt-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-between w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2">
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                  <span className="text-gray-900">
                    {copied ? '¡Copiado!' : 'Copiar enlace'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
