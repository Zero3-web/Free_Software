import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', animated = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const LogoComponent = animated ? motion.div : 'div';
  const animationProps = animated ? {
    whileHover: { scale: 1.05, rotate: 5 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
  } : {};

  return (
    <LogoComponent
      {...animationProps}
      className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg ${className}`}
    >
      <svg 
        className="w-3/4 h-3/4 text-white" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M12 10v6m0 0l-3-3m3 3l3-3M7 7l3-3 1.5 1.5L15 2l3 3-3 3-1.5-1.5L10 10l-3-3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          opacity="0.6"
        />
      </svg>
    </LogoComponent>
  );
}
