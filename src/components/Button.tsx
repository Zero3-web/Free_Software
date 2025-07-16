import type { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  href,
  className = '',
  ariaLabel,
  type = 'button'
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--focus-ring)]
    disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden
  `;

  const variantClasses = {
    primary: `
      bg-[var(--brand-primary)] text-white hover:bg-blue-700 
      shadow-md hover:shadow-lg active:shadow-sm
      focus:ring-[var(--brand-primary)]
    `,
    secondary: `
      bg-[var(--brand-secondary)] text-white hover:bg-purple-700 
      shadow-md hover:shadow-lg active:shadow-sm
      focus:ring-[var(--brand-secondary)]
    `,
    outline: `
      border-2 border-[var(--border-primary)] text-[var(--text-primary)] 
      hover:bg-[var(--bg-secondary)] hover:border-[var(--brand-primary)]
      focus:ring-[var(--brand-primary)]
    `,
    ghost: `
      text-[var(--text-secondary)] hover:text-[var(--text-primary)] 
      hover:bg-[var(--bg-secondary)]
      focus:ring-[var(--brand-primary)]
    `,
    success: `
      bg-[var(--success)] text-white hover:bg-green-700 
      shadow-md hover:shadow-lg active:shadow-sm
      focus:ring-[var(--success)]
    `,
    warning: `
      bg-[var(--warning)] text-white hover:bg-amber-700 
      shadow-md hover:shadow-lg active:shadow-sm
      focus:ring-[var(--warning)]
    `,
    error: `
      bg-[var(--error)] text-white hover:bg-red-700 
      shadow-md hover:shadow-lg active:shadow-sm
      focus:ring-[var(--error)]
    `
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-md gap-1.5',
    md: 'px-4 py-2.5 text-base rounded-lg gap-2',
    lg: 'px-6 py-3 text-lg rounded-lg gap-2.5',
    xl: 'px-8 py-4 text-xl rounded-xl gap-3'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  const buttonContent = (
    <>
      {/* Shimmer effect for primary buttons */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Loading spinner */}
      {loading && (
        <svg 
          className={`animate-spin ${iconSizeClasses[size]} ${iconPosition === 'right' ? 'order-last' : ''}`}
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
        </svg>
      )}
      
      {/* Icon */}
      {Icon && !loading && (
        <Icon className={`${iconSizeClasses[size]} ${iconPosition === 'right' ? 'order-last' : ''}`} />
      )}
      
      {/* Text content */}
      <span className={iconPosition === 'right' ? 'order-first' : ''}>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${buttonClasses} hover:scale-105 transform transition-all duration-200`}
        aria-label={ariaLabel}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={`${buttonClasses} ${disabled ? '' : 'hover:scale-105 transform transition-all duration-200'}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {buttonContent}
    </button>
  );
}
