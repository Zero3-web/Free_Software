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
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 sm:py-16 lg:py-20 min-h-[85vh] lg:min-h-[90vh] flex items-center">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full bg-repeat" 
          style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}
        />
      </div>
      
      <div className="relative container-wide w-full">
        <div className="text-center">
          {/* Enhanced main heading with responsive typography */}
          <h1 className="font-extrabold text-center leading-tight tracking-tight text-black dark:text-white mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-5xl mx-auto">
            Professional{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Software
            </span>{' '}
            <br className="hidden sm:block" />
            <span className="hover:text-blue-600 transition-colors duration-300">Completely Free</span>
          </h1>

          {/* Enhanced subtitle with responsive text */}
          <p className="text-responsive-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Download the best tools from Adobe alternatives, development tools, and more. No hidden costs, no subscriptions, just professional quality software.
          </p>
          
          {/* Powered by - responsive visibility */}
          <p className="text-responsive-base sm:text-lg text-gray-500 mb-8 sm:mb-12 font-medium">
            powered by <span className="text-blue-600 font-semibold">zerotech</span>
          </p>

          {/* Enhanced CTA Buttons - Better mobile layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 mt-8 sm:mt-12 px-4 sm:px-0">
            <button 
              onClick={scrollToProducts}
              className="btn-responsive bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2 sm:space-x-3 group w-full sm:w-auto justify-center"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
              <span>Explore Software</span>
            </button>
            <a 
              href="/catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-responsive bg-white/80 text-gray-900 border border-gray-300 hover:bg-gray-50 transform hover:scale-105 w-full sm:w-auto justify-center"
            >
              View More Software
            </a>
          </div>

          {/* Enhanced Features Grid - Better responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 sm:px-0">
            <div className="text-center group cursor-pointer">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-responsive-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Direct Download
              </h3>
              <p className="text-responsive-sm text-gray-600">
                Direct links without wait times or ads
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-responsive-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                Premium Quality
              </h3>
              <p className="text-responsive-sm text-gray-600">
                Only the best professional software
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-responsive-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                100% Safe
              </h3>
              <p className="text-responsive-sm text-gray-600">
                Verified and malware-free downloads
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-responsive-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Fast Speed
              </h3>
              <p className="text-responsive-sm text-gray-600">
                High-speed servers worldwide
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
