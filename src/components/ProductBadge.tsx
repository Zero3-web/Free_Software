import { Crown, Zap, Star, Sparkles } from 'lucide-react';

interface ProductBadgeProps {
  badge: string;
  index?: number;
}

const badgeConfig: Record<string, { color: string; icon?: React.ReactNode; label: string }> = {
  'Nuevo': {
    color: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    icon: <Sparkles className="w-3 h-3" />,
    label: 'Nuevo'
  },
  'Top': {
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
    icon: <Crown className="w-3 h-3" />,
    label: 'Top'
  },
  'Popular': {
    color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    icon: <Star className="w-3 h-3" />,
    label: 'Popular'
  },
  'Actualizado': {
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    icon: <Zap className="w-3 h-3" />,
    label: 'Actualizado'
  },
  'Esencial': {
    color: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
    icon: <Star className="w-3 h-3" />,
    label: 'Esencial'
  }
};

export default function ProductBadge({ badge, index = 0 }: ProductBadgeProps) {
  const config = badgeConfig[badge] || {
    color: 'bg-gray-500 text-white',
    label: badge
  };

  return (
    <div
      className={`
        inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold
        ${config.color} shadow-lg backdrop-blur-sm transition-all duration-300
      `}
    >
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}
