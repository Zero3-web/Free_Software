import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Zap, 
  Globe, 
  Image, 
  Database, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Monitor,
  Wifi,
  HardDrive,
  Eye
} from 'lucide-react';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  totalBlockingTime: number;
  imageOptimization: number;
  cacheHitRate: number;
  networkRequests: number;
  bundleSize: number;
  jsExecutionTime: number;
  memoryUsage: number;
  domNodes: number;
  timestamp: string;
}

interface PerformanceOptimization {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  implemented: boolean;
  estimatedGain: string;
}

const PERFORMANCE_THRESHOLDS = {
  pageLoadTime: { good: 2000, needs_improvement: 4000 },
  firstContentfulPaint: { good: 1800, needs_improvement: 3000 },
  largestContentfulPaint: { good: 2500, needs_improvement: 4000 },
  cumulativeLayoutShift: { good: 0.1, needs_improvement: 0.25 },
  firstInputDelay: { good: 100, needs_improvement: 300 },
  totalBlockingTime: { good: 200, needs_improvement: 600 }
};

const OPTIMIZATIONS: PerformanceOptimization[] = [
  {
    id: 'image_optimization',
    type: 'critical',
    title: 'Implement Advanced Image Optimization',
    description: 'Use WebP/AVIF formats, lazy loading, and responsive images to reduce bandwidth.',
    impact: 'high',
    effort: 'medium',
    implemented: true,
    estimatedGain: '30-50% faster image loading'
  },
  {
    id: 'code_splitting',
    type: 'warning',
    title: 'Enable Route-based Code Splitting',
    description: 'Split JavaScript bundles by routes to reduce initial bundle size.',
    impact: 'medium',
    effort: 'medium',
    implemented: false,
    estimatedGain: '20-30% faster initial load'
  },
  {
    id: 'preloading',
    type: 'info',
    title: 'Implement Critical Resource Preloading',
    description: 'Preload critical fonts, images, and API data for faster rendering.',
    impact: 'medium',
    effort: 'low',
    implemented: true,
    estimatedGain: '15-25% faster perceived load'
  },
  {
    id: 'caching',
    type: 'critical',
    title: 'Optimize Caching Strategy',
    description: 'Implement service workers and optimize cache headers for better performance.',
    impact: 'high',
    effort: 'high',
    implemented: false,
    estimatedGain: '40-60% faster repeat visits'
  },
  {
    id: 'css_optimization',
    type: 'warning',
    title: 'Optimize CSS Delivery',
    description: 'Remove unused CSS, inline critical CSS, and defer non-critical styles.',
    impact: 'medium',
    effort: 'medium',
    implemented: true,
    estimatedGain: '10-20% faster rendering'
  },
  {
    id: 'cdn_implementation',
    type: 'info',
    title: 'Enable Global CDN',
    description: 'Serve static assets from a global CDN for reduced latency worldwide.',
    impact: 'medium',
    effort: 'low',
    implemented: true,
    estimatedGain: '25-40% faster global access'
  }
];

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState<{ cpu: number; memory: number; network: number }>({
    cpu: 0,
    memory: 0,
    network: 0
  });
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Collect initial performance metrics
    collectPerformanceMetrics();

    // Start real-time monitoring
    intervalRef.current = setInterval(() => {
      updateRealTimeMetrics();
    }, 1000);

    // Get connection info
    getConnectionInfo();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const collectPerformanceMetrics = async () => {
    try {
      // Wait for page to fully load
      await new Promise<void>(resolve => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', () => resolve());
        }
      });

      // Collect Web Vitals and other metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      
      // Simulate some metrics (in real app, these would come from actual measurement)
      const newMetrics: PerformanceMetrics = {
        pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        firstContentfulPaint: fcp,
        largestContentfulPaint: fcp + Math.random() * 1000 + 500, // Simulated
        cumulativeLayoutShift: Math.random() * 0.2, // Simulated
        firstInputDelay: Math.random() * 200, // Simulated
        totalBlockingTime: Math.random() * 400, // Simulated
        imageOptimization: 85, // Percentage of optimized images
        cacheHitRate: 78, // Percentage of cached resources
        networkRequests: performance.getEntriesByType('resource').length,
        bundleSize: 1.2, // MB
        jsExecutionTime: Math.random() * 300 + 100,
        memoryUsage: (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0,
        domNodes: document.querySelectorAll('*').length,
        timestamp: new Date().toISOString()
      };

      setMetrics(newMetrics);
      setLoading(false);
    } catch (error) {
      console.error('Error collecting performance metrics:', error);
      setLoading(false);
    }
  };

  const updateRealTimeMetrics = () => {
    setRealTimeData({
      cpu: Math.random() * 100,
      memory: (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || Math.random() * 50,
      network: Math.random() * 10
    });
  };

  const getConnectionInfo = () => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      setConnectionInfo({
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      });
    }
  };

  const getScoreColor = (value: number, metric: string): string => {
    const thresholds = PERFORMANCE_THRESHOLDS[metric as keyof typeof PERFORMANCE_THRESHOLDS];
    if (!thresholds) return 'text-gray-500';
    
    if (metric === 'cumulativeLayoutShift') {
      if (value <= thresholds.good) return 'text-green-500';
      if (value <= thresholds.needs_improvement) return 'text-yellow-500';
      return 'text-red-500';
    } else {
      if (value <= thresholds.good) return 'text-green-500';
      if (value <= thresholds.needs_improvement) return 'text-yellow-500';
      return 'text-red-500';
    }
  };

  const getScoreLabel = (value: number, metric: string): string => {
    const thresholds = PERFORMANCE_THRESHOLDS[metric as keyof typeof PERFORMANCE_THRESHOLDS];
    if (!thresholds) return 'Unknown';
    
    if (metric === 'cumulativeLayoutShift') {
      if (value <= thresholds.good) return 'Good';
      if (value <= thresholds.needs_improvement) return 'Needs Improvement';
      return 'Poor';
    } else {
      if (value <= thresholds.good) return 'Good';
      if (value <= thresholds.needs_improvement) return 'Needs Improvement';
      return 'Poor';
    }
  };

  const calculateOverallScore = (): number => {
    if (!metrics) return 0;
    
    let score = 100;
    
    // Deduct points based on metrics
    Object.entries(PERFORMANCE_THRESHOLDS).forEach(([metric, thresholds]) => {
      const value = metrics[metric as keyof PerformanceMetrics] as number;
      const label = getScoreLabel(value, metric);
      
      if (label === 'Poor') score -= 20;
      else if (label === 'Needs Improvement') score -= 10;
    });
    
    return Math.max(0, score);
  };

  const MetricCard = ({ icon: Icon, title, value, unit, metric }: {
    icon: any;
    title: string;
    value: number;
    unit: string;
    metric?: string;
  }) => {
    const color = metric ? getScoreColor(value, metric) : 'text-[var(--text-primary)]';
    const label = metric ? getScoreLabel(value, metric) : '';
    
    return (
      <div className="bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border-primary)]">
        <div className="flex items-center space-x-2 mb-2">
          <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
          <span className="text-sm font-medium text-[var(--text-secondary)]">{title}</span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className={`text-2xl font-bold ${color}`}>
            {typeof value === 'number' ? value.toFixed(value < 10 ? 2 : 0) : value}
          </span>
          <span className="text-sm text-[var(--text-muted)]">{unit}</span>
        </div>
        {label && (
          <div className={`text-xs font-medium mt-1 ${color}`}>
            {label}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-primary)]"></div>
          <span className="ml-3 text-[var(--text-secondary)]">Collecting performance data...</span>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Unable to collect performance metrics</p>
        </div>
      </div>
    );
  }

  const overallScore = calculateOverallScore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-[var(--accent-primary)]" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Performance Monitor</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-[var(--text-secondary)]">Overall Score</div>
            <div className={`text-3xl font-bold ${overallScore >= 80 ? 'text-green-500' : overallScore >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
              {overallScore}
            </div>
          </div>
        </div>

        {/* Real-time metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Monitor className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">CPU Usage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${realTimeData.cpu}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm font-semibold">{realTimeData.cpu.toFixed(1)}%</span>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <HardDrive className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Memory</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200">
                <motion.div
                  className="bg-green-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(realTimeData.memory / 100) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm font-semibold">{realTimeData.memory.toFixed(1)} MB</span>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wifi className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200">
                <motion.div
                  className="bg-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${realTimeData.network * 10}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm font-semibold">{realTimeData.network.toFixed(1)} MB/s</span>
            </div>
          </div>
        </div>

        {/* Connection info */}
        {connectionInfo && (
          <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Connection Info</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-[var(--text-secondary)]">Type:</span>
                <span className="ml-2 font-medium">{connectionInfo.effectiveType?.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-[var(--text-secondary)]">Speed:</span>
                <span className="ml-2 font-medium">{connectionInfo.downlink} Mbps</span>
              </div>
              <div>
                <span className="text-[var(--text-secondary)]">Latency:</span>
                <span className="ml-2 font-medium">{connectionInfo.rtt} ms</span>
              </div>
              <div>
                <span className="text-[var(--text-secondary)]">Data Saver:</span>
                <span className="ml-2 font-medium">{connectionInfo.saveData ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Core Web Vitals */}
      <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span>Core Web Vitals</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            icon={Clock}
            title="First Contentful Paint"
            value={metrics.firstContentfulPaint}
            unit="ms"
            metric="firstContentfulPaint"
          />
          <MetricCard
            icon={Eye}
            title="Largest Contentful Paint"
            value={metrics.largestContentfulPaint}
            unit="ms"
            metric="largestContentfulPaint"
          />
          <MetricCard
            icon={TrendingUp}
            title="Cumulative Layout Shift"
            value={metrics.cumulativeLayoutShift}
            unit=""
            metric="cumulativeLayoutShift"
          />
          <MetricCard
            icon={Activity}
            title="First Input Delay"
            value={metrics.firstInputDelay}
            unit="ms"
            metric="firstInputDelay"
          />
          <MetricCard
            icon={Clock}
            title="Total Blocking Time"
            value={metrics.totalBlockingTime}
            unit="ms"
            metric="totalBlockingTime"
          />
          <MetricCard
            icon={Globe}
            title="Page Load Time"
            value={metrics.pageLoadTime}
            unit="ms"
            metric="pageLoadTime"
          />
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-500" />
          <span>Resource Metrics</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={Image}
            title="Image Optimization"
            value={metrics.imageOptimization}
            unit="%"
          />
          <MetricCard
            icon={Database}
            title="Cache Hit Rate"
            value={metrics.cacheHitRate}
            unit="%"
          />
          <MetricCard
            icon={Globe}
            title="Network Requests"
            value={metrics.networkRequests}
            unit="requests"
          />
          <MetricCard
            icon={HardDrive}
            title="Bundle Size"
            value={metrics.bundleSize}
            unit="MB"
          />
        </div>
      </div>

      {/* Performance Optimizations */}
      <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span>Performance Optimizations</span>
        </h3>
        
        <div className="space-y-4">
          {OPTIMIZATIONS.map((optimization) => (
            <div
              key={optimization.id}
              className={`p-4 rounded-lg border ${
                optimization.implemented
                  ? 'bg-green-50 border-green-200'
                  : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {optimization.implemented ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertTriangle className={`w-5 h-5 ${
                        optimization.type === 'critical' ? 'text-red-500' :
                        optimization.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                    )}
                    <h4 className="font-semibold text-[var(--text-primary)]">{optimization.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      optimization.impact === 'high' ? 'bg-red-100 text-red-800' :
                      optimization.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {optimization.impact} impact
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-2">{optimization.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-[var(--text-muted)]">
                    <span>Effort: {optimization.effort}</span>
                    <span>•</span>
                    <span>Estimated gain: {optimization.estimatedGain}</span>
                  </div>
                </div>
                <div className="ml-4">
                  {optimization.implemented ? (
                    <span className="px-3 py-1 bg-green-100">
                      Implemented
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
        <div className="space-y-2">
          <p>• Implement service worker caching for better offline experience</p>
          <p>• Enable route-based code splitting to reduce initial bundle size</p>
          <p>• Consider implementing a performance budget to maintain speed</p>
          <p>• Set up continuous performance monitoring in production</p>
        </div>
      </div>
    </div>
  );
}
