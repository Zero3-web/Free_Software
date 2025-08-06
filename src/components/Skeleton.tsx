interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export default function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  lines = 1
}: SkeletonProps) {
  const baseClasses = "skeleton animate-shimmer";
  
  const variantClasses = {
    text: "skeleton-text",
    rectangular: "rounded",
    circular: "skeleton-avatar",
    rounded: "rounded-lg"
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses.text}`}
            style={{
              width: index === lines - 1 ? '75%' : '100%',
              height: style.height
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Preset skeleton components
export function ProductCardSkeleton() {
  return (
    <div className="bg-white">
      <Skeleton variant="rectangular" height={160} className="mb-4" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <div className="flex justify-between items-center pt-4">
        <Skeleton variant="text" width={80} />
        <Skeleton variant="rectangular" width={100} height={32} className="rounded-md" />
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white">
      <Skeleton variant="rectangular" height={200} />
      <div className="p-6 space-y-3">
        <Skeleton variant="text" lines={2} />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div className="comment-card">
      <div className="flex space-x-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" lines={3} />
        </div>
      </div>
    </div>
  );
}

export function NavigationSkeleton() {
  return (
    <div className="flex space-x-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} variant="text" width={80} height={20} />
      ))}
    </div>
  );
}
