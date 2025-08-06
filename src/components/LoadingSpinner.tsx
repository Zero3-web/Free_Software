interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white ${className}`}>
      <div className="flex items-center justify-center relative">
        <div className="w-48 h-48 border border-transparent rounded-full absolute animate-rotate1 border-b-8 border-b-pink-500"></div>
        <div className="w-48 h-48 border border-transparent rounded-full absolute animate-rotate2 border-b-8 border-b-red-500"></div>
        <div className="w-48 h-48 border border-transparent rounded-full absolute animate-rotate3 border-b-8 border-b-cyan-500"></div>
        <div className="w-48 h-48 border border-transparent rounded-full absolute animate-rotate4 border-b-8 border-b-orange-500"></div>
        <div className="text-gray-600 font-medium text-lg">loading</div>
      </div>
    </div>
  );
}
