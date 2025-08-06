import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  CheckCircle, 
  Star, 
  Download, 
  Heart, 
  Search,
  Filter,
  Grid,
  Settings,
  User,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  content: React.ReactNode;
  targetElement?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: {
    text: string;
    onClick: () => void;
  };
}

interface OnboardingProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
  currentUser?: any;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Opensoftware!',
    description: 'Your ultimate destination for free, professional software',
    icon: Star,
    content: (
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
          <Star className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Welcome to Opensoftware!</h3>
        <p className="text-[var(--text-secondary)] max-w-md mx-auto">
          Discover thousands of high-quality, free software applications for work, creativity, and productivity. 
          Let's take a quick tour to get you started!
        </p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium">Free Downloads</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium">Verified Safe</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium">Latest Versions</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'search',
    title: 'Powerful Search',
    description: 'Find exactly what you need with our advanced search system',
    icon: Search,
    content: (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
          <Search className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] text-center">Advanced Search & Filters</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-[var(--accent-primary)]" />
            <span className="text-[var(--text-secondary)]">Search by name, category, or features</span>
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-[var(--accent-primary)]" />
            <span className="text-[var(--text-secondary)]">Filter by rating, downloads, and release date</span>
          </div>
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-[var(--accent-primary)]" />
            <span className="text-[var(--text-secondary)]">Sort by relevance, popularity, or date</span>
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <p className="text-sm text-[var(--text-muted)] italic">
            💡 Pro tip: Use tags like "photo editing" or "code editor" for better results
          </p>
        </div>
      </div>
    ),
    targetElement: '.search-bar'
  },
  {
    id: 'favorites',
    title: 'Save Your Favorites',
    description: 'Keep track of software you love with our favorites system',
    icon: Heart,
    content: (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] text-center">Favorites & Collections</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-[var(--text-secondary)]">Click the heart icon to save software</span>
          </div>
          <div className="flex items-center space-x-3">
            <Grid className="w-5 h-5 text-[var(--accent-primary)]" />
            <span className="text-[var(--text-secondary)]">Organize favorites into custom collections</span>
          </div>
          <div className="flex items-center space-x-3">
            <Download className="w-5 h-5 text-[var(--accent-primary)]" />
            <span className="text-[var(--text-secondary)]">Export your favorites for backup</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-pink-50">
          <p className="text-sm text-red-700">
            ❤️ Your favorites are automatically saved to your browser
          </p>
        </div>
      </div>
    ),
    targetElement: '.favorite-button'
  },
  {
    id: 'categories',
    title: 'Explore Categories',
    description: 'Browse software by category to discover new tools',
    icon: Grid,
    content: (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
          <Grid className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] text-center">Software Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-center">
            <p className="font-medium text-[var(--text-primary)]">Design & Graphics</p>
            <p className="text-xs text-[var(--text-muted)]">Photo editing, illustration</p>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-center">
            <p className="font-medium text-[var(--text-primary)]">Development</p>
            <p className="text-xs text-[var(--text-muted)]">Code editors, tools</p>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-center">
            <p className="font-medium text-[var(--text-primary)]">Productivity</p>
            <p className="text-xs text-[var(--text-muted)]">Office suites, utilities</p>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-center">
            <p className="font-medium text-[var(--text-primary)]">Multimedia</p>
            <p className="text-xs text-[var(--text-muted)]">Audio, video editing</p>
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <p className="text-sm text-[var(--text-muted)] italic">
            🎯 Each category shows the most popular and highest-rated software
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'safety',
    title: 'Safe Downloads',
    description: 'All software is verified and safe to download',
    icon: CheckCircle,
    content: (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] text-center">Safety First</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-[var(--text-secondary)]">All downloads are scanned for malware</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-[var(--text-secondary)]">Software comes from official sources</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-[var(--text-secondary)]">Regular security updates and monitoring</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50">
          <p className="text-sm text-green-700">
            🛡️ Look for security badges on each software page
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Start exploring and downloading amazing free software',
    icon: Lightbulb,
    content: (
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
          <Lightbulb className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">You're Ready to Go!</h3>
        <p className="text-[var(--text-secondary)] max-w-md mx-auto">
          You now know the basics of using Opensoftware. Start exploring our vast collection of free software!
        </p>
        <div className="space-y-2 text-sm text-[var(--text-muted)]">
          <p>🚀 <strong>Next steps:</strong></p>
          <p>• Browse popular software or search for specific tools</p>
          <p>• Save your favorites for easy access later</p>
          <p>• Check out our latest additions and updates</p>
          <p>• Read reviews from other users</p>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <p className="text-sm text-blue-700">
            💡 Need help? Check out our FAQ section or contact support
          </p>
        </div>
      </div>
    )
  }
];

export default function OnboardingSystem({ isVisible, onComplete, onSkip, currentUser }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-start onboarding for new users
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('opensoftware_onboarding_completed');
    if (!hasSeenOnboarding && !currentUser) {
      // Auto-show onboarding for new users after a short delay
      const timer = setTimeout(() => {
        // onStart();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  const nextStep = async () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 150);
    } else {
      handleComplete();
    }
  };

  const prevStep = async () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('opensoftware_onboarding_completed', 'true');
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('opensoftware_onboarding_completed', 'true');
    onSkip();
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < ONBOARDING_STEPS.length) {
      setCurrentStep(stepIndex);
    }
  };

  const currentStepData = ONBOARDING_STEPS[currentStep];
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[var(--bg-primary)] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-[var(--border-primary)]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-primary)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <currentStepData.icon className="w-6 h-6 text-[var(--accent-primary)]" />
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    {currentStepData.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {currentStepData.description}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] mb-2">
                <span>Step {currentStep + 1} of {ONBOARDING_STEPS.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              {ONBOARDING_STEPS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-[var(--accent-primary)] scale-125'
                      : index < currentStep
                        ? 'bg-[var(--accent-primary)] opacity-50'
                        : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: isAnimating ? 20 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStepData.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSkip}
                  className="px-4 py-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                >
                  Skip Tour
                </button>
                
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-secondary)] transition-colors"
                >
                  {currentStep === ONBOARDING_STEPS.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Get Started</span>
                    </>
                  ) : (
                    <>
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
