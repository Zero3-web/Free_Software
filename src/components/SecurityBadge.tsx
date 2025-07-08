import { motion } from 'framer-motion';
import { Shield, CheckCircle, Lock, Award, Verified } from 'lucide-react';

interface SecurityBadgeProps {
  type: 'verified' | 'virus-free' | 'secure' | 'trusted' | 'certified';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const securityConfig = {
  'verified': {
    icon: CheckCircle,
    label: 'Verificado',
    color: 'bg-green-100 text-green-800 border-green-200',
    darkColor: 'dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    description: 'Software verificado por nuestro equipo'
  },
  'virus-free': {
    icon: Shield,
    label: 'Sin Virus',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    darkColor: 'dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    description: 'Escaneado y libre de malware'
  },
  'secure': {
    icon: Lock,
    label: 'Seguro',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    darkColor: 'dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
    description: 'Descarga segura y cifrada'
  },
  'trusted': {
    icon: Award,
    label: 'Confiable',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    darkColor: 'dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800',
    description: 'Fuente oficial y confiable'
  },
  'certified': {
    icon: Verified,
    label: 'Certificado',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    darkColor: 'dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
    description: 'Certificado por autoridades digitales'
  }
};

const sizeConfig = {
  sm: {
    padding: 'px-2 py-1',
    iconSize: 'w-3 h-3',
    textSize: 'text-xs',
    gap: 'space-x-1'
  },
  md: {
    padding: 'px-3 py-2',
    iconSize: 'w-4 h-4',
    textSize: 'text-sm',
    gap: 'space-x-2'
  },
  lg: {
    padding: 'px-4 py-2',
    iconSize: 'w-5 h-5',
    textSize: 'text-base',
    gap: 'space-x-2'
  }
};

export default function SecurityBadge({ 
  type, 
  size = 'md', 
  animated = true, 
  className = '' 
}: SecurityBadgeProps) {
  const config = securityConfig[type];
  const sizeStyles = sizeConfig[size];
  
  const IconComponent = config.icon;
  
  const badgeContent = (
    <div 
      className={`
        inline-flex items-center ${sizeStyles.gap} ${sizeStyles.padding} 
        rounded-full border font-medium
        ${config.color} ${config.darkColor}
        ${className}
      `}
      title={config.description}
    >
      <IconComponent className={sizeStyles.iconSize} />
      <span className={sizeStyles.textSize}>{config.label}</span>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {badgeContent}
      </motion.div>
    );
  }

  return badgeContent;
}

// Componente para mostrar múltiples badges de seguridad
interface SecurityIndicatorsProps {
  badges: Array<SecurityBadgeProps['type']>;
  size?: SecurityBadgeProps['size'];
  className?: string;
}

export function SecurityIndicators({ badges, size = 'md', className = '' }: SecurityIndicatorsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badge, index) => (
        <SecurityBadge 
          key={badge} 
          type={badge} 
          size={size}
          animated={true}
        />
      ))}
    </div>
  );
}
