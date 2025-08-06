import React, { useCallback } from 'react';
import { Download, Star, Shield, Zap } from 'lucide-react';

export default function HeroSection() {
  const scrollToProducts = useCallback(() => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <section className="relative bg-white py-8 sm:py-12 md:py-16 lg:py-20 min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center">
      {/* Enhanced background decoration with better contrast */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="w-full h-full bg-repeat" 
          style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%233B82F6\" fill-opacity=\"0.08\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}
        />
      </div>
      
      <div className="relative container-wide w-full">
        <div className="text-center">
          {/* Enhanced main heading with better contrast and mobile-first */}
          <h1 className="font-extrabold text-center leading-tight tracking-tight text-gray-900 mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-5xl mx-auto">
            Professional{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Software
            </span>{' '}
            <br className="hidden sm:block" />
            <span className="text-gray-900 hover:text-blue-600 transition-colors duration-300">Completely Free</span>
          </h1>

          {/* Enhanced subtitle with better contrast */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0 font-medium">
            Download the best tools from Adobe alternatives, development tools, and more. No hidden costs, no subscriptions, just professional quality software.
          </p>
          
          {/* Powered by - better contrast */}
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 font-medium">
            powered by <span className="text-blue-600 font-semibold">zerotech</span>
          </p>

          {/* Enhanced CTA Buttons - Mobile-first design with better contrast */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 mt-8 sm:mt-12 px-4 sm:px-0">
            <button 
              onClick={scrollToProducts}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 group"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
              <span>Explore Software</span>
            </button>
            <a 
              href="/catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-900 font-semibold border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              View More Software
            </a>
          </div>

          {/* Enhanced Features Grid - Mobile-first with better contrast */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
            <div className="text-center group cursor-pointer p-4 rounded-xl hover:bg-blue-50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Download className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Direct Download
              </h3>
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                Direct links without wait times or ads
              </p>
            </div>

            <div className="text-center group cursor-pointer p-4 rounded-xl hover:bg-purple-50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Star className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                Premium Quality
              </h3>
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                Only the best professional software
              </p>
            </div>

            <div className="text-center group cursor-pointer p-4 rounded-xl hover:bg-red-50 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                100% Safe
              </h3>
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                Verified and malware-free downloads
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements - Responsive sizing */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-purple-500/10 rounded-full blur-xl animate-float animation-delay-150"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-pink-500/10 rounded-full blur-xl animate-float"></div>
    </section>
  );
}
