import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  Download, 
  Eye, 
  Star, 
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Activity,
  Calendar,
  PieChart,
  Target
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalDownloads: number;
    totalPageViews: number;
    averageRating: number;
    bounceRate: number;
    sessionDuration: number;
  };
  userDemographics: {
    byCountry: Array<{ country: string; users: number; percentage: number }>;
    byDevice: Array<{ device: string; users: number; percentage: number }>;
    byAge: Array<{ ageGroup: string; users: number; percentage: number }>;
  };
  popularSoftware: Array<{
    id: string;
    name: string;
    category: string;
    downloads: number;
    views: number;
    rating: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  searchAnalytics: {
    topQueries: Array<{ query: string; count: number; ctr: number }>;
    searchTrends: Array<{ date: string; searches: number }>;
    noResultsQueries: Array<{ query: string; count: number }>;
  };
  performance: {
    pageLoadTimes: Array<{ page: string; avgTime: number; p95Time: number }>;
    errorRates: Array<{ page: string; errorRate: number }>;
    conversionRates: Array<{ funnel: string; rate: number }>;
  };
  timeSeriesData: Array<{
    date: string;
    users: number;
    downloads: number;
    pageViews: number;
  }>;
}

// Simulated analytics data
const MOCK_ANALYTICS: AnalyticsData = {
  overview: {
    totalUsers: 125680,
    totalDownloads: 892340,
    totalPageViews: 2450680,
    averageRating: 4.6,
    bounceRate: 42.3,
    sessionDuration: 245
  },
  userDemographics: {
    byCountry: [
      { country: 'United States', users: 42300, percentage: 33.7 },
      { country: 'Germany', users: 18900, percentage: 15.0 },
      { country: 'United Kingdom', users: 15600, percentage: 12.4 },
      { country: 'France', users: 12400, percentage: 9.9 },
      { country: 'Japan', users: 9800, percentage: 7.8 },
      { country: 'Others', users: 26680, percentage: 21.2 }
    ],
    byDevice: [
      { device: 'Desktop', users: 75400, percentage: 60.0 },
      { device: 'Mobile', users: 37700, percentage: 30.0 },
      { device: 'Tablet', users: 12580, percentage: 10.0 }
    ],
    byAge: [
      { ageGroup: '18-24', users: 25136, percentage: 20.0 },
      { ageGroup: '25-34', users: 37704, percentage: 30.0 },
      { ageGroup: '35-44', users: 31420, percentage: 25.0 },
      { ageGroup: '45-54', users: 18852, percentage: 15.0 },
      { ageGroup: '55+', users: 12568, percentage: 10.0 }
    ]
  },
  popularSoftware: [
    { id: 'photoshop', name: 'Adobe Photoshop', category: 'Design', downloads: 156800, views: 450200, rating: 4.8, trend: 'up' },
    { id: 'vscode', name: 'Visual Studio Code', category: 'Development', downloads: 142300, views: 380500, rating: 4.9, trend: 'up' },
    { id: 'blender', name: 'Blender', category: '3D', downloads: 98400, views: 280300, rating: 4.7, trend: 'stable' },
    { id: 'gimp', name: 'GIMP', category: 'Design', downloads: 87600, views: 245800, rating: 4.5, trend: 'down' },
    { id: 'audacity', name: 'Audacity', category: 'Audio', downloads: 76200, views: 198700, rating: 4.6, trend: 'up' }
  ],
  searchAnalytics: {
    topQueries: [
      { query: 'photo editor', count: 15680, ctr: 8.4 },
      { query: 'code editor', count: 12450, ctr: 12.1 },
      { query: 'video editor', count: 10890, ctr: 6.8 },
      { query: 'design software', count: 8920, ctr: 9.2 },
      { query: '3d modeling', count: 7340, ctr: 11.5 }
    ],
    searchTrends: [
      { date: '2024-01-01', searches: 2300 },
      { date: '2024-01-02', searches: 2890 },
      { date: '2024-01-03', searches: 3100 },
      { date: '2024-01-04', searches: 2780 },
      { date: '2024-01-05', searches: 3450 }
    ],
    noResultsQueries: [
      { query: 'mac software only', count: 234 },
      { query: 'linux alternatives', count: 189 },
      { query: 'mobile app editor', count: 156 },
      { query: 'free cad software', count: 143 }
    ]
  },
  performance: {
    pageLoadTimes: [
      { page: 'Homepage', avgTime: 1.2, p95Time: 2.8 },
      { page: 'Software Details', avgTime: 1.8, p95Time: 3.4 },
      { page: 'Search Results', avgTime: 0.9, p95Time: 2.1 },
      { page: 'Category Pages', avgTime: 1.4, p95Time: 2.9 }
    ],
    errorRates: [
      { page: 'Homepage', errorRate: 0.1 },
      { page: 'Software Details', errorRate: 0.3 },
      { page: 'Search Results', errorRate: 0.2 },
      { page: 'Download Pages', errorRate: 0.8 }
    ],
    conversionRates: [
      { funnel: 'Search to View', rate: 78.4 },
      { funnel: 'View to Download', rate: 23.7 },
      { funnel: 'Visit to Download', rate: 18.6 },
      { funnel: 'Search to Download', rate: 14.2 }
    ]
  },
  timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    users: Math.floor(Math.random() * 2000) + 3000,
    downloads: Math.floor(Math.random() * 5000) + 8000,
    pageViews: Math.floor(Math.random() * 10000) + 20000
  }))
};

export default function AnalyticsInsights() {
  const [data, setData] = useState<AnalyticsData>(MOCK_ANALYTICS);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'performance'>('overview');

  const MetricCard = ({ 
    icon: Icon, 
    title, 
    value, 
    change, 
    format = 'number' 
  }: {
    icon: any;
    title: string;
    value: number;
    change?: number;
    format?: 'number' | 'percentage' | 'currency' | 'duration';
  }) => {
    const formatValue = (val: number) => {
      switch (format) {
        case 'percentage':
          return `${val}%`;
        case 'currency':
          return `$${val.toLocaleString()}`;
        case 'duration':
          return `${Math.floor(val / 60)}m ${val % 60}s`;
        default:
          return val.toLocaleString();
      }
    };

    return (
      <div className="bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border-primary)]">
        <div className="flex items-center justify-between mb-2">
          <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
          {change !== undefined && (
            <div className={`flex items-center space-x-1 text-sm ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`w-4 h-4 ${change < 0 ? 'rotate-180' : ''}`} />
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">{title}</h3>
        <p className="text-2xl font-bold text-[var(--text-primary)]">{formatValue(value)}</p>
      </div>
    );
  };

  const ProgressBar = ({ 
    label, 
    value, 
    total, 
    color = 'bg-[var(--accent-primary)]' 
  }: {
    label: string;
    value: number;
    total: number;
    color?: string;
  }) => {
    const percentage = (value / total) * 100;
    
    return (
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-[var(--text-secondary)]">{label}</span>
          <span className="text-[var(--text-primary)]">{value.toLocaleString()}</span>
        </div>
        <div className="w-full bg-[var(--bg-primary)] rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        <div className="text-xs text-[var(--text-muted)] mt-1">{percentage.toFixed(1)}%</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart className="w-6 h-6 text-[var(--accent-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Analytics & Insights</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="px-3 py-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)]"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-[var(--bg-secondary)] rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'content', label: 'Content', icon: Star },
          { id: 'performance', label: 'Performance', icon: Target }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-[var(--accent-primary)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              icon={Users}
              title="Total Users"
              value={data.overview.totalUsers}
              change={12.5}
            />
            <MetricCard
              icon={Download}
              title="Total Downloads"
              value={data.overview.totalDownloads}
              change={8.3}
            />
            <MetricCard
              icon={Eye}
              title="Page Views"
              value={data.overview.totalPageViews}
              change={-2.1}
            />
            <MetricCard
              icon={Star}
              title="Average Rating"
              value={data.overview.averageRating}
              change={1.8}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Time Series Chart */}
            <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Trends Over Time</h3>
              <div className="h-64 flex items-end space-x-2">
                {data.timeSeriesData.slice(-14).map((day, index) => (
                  <div key={day.date} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.users / 5000) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="w-full bg-[var(--accent-primary)] rounded-t min-h-[4px] mb-2"
                    />
                    <span className="text-xs text-[var(--text-muted)] rotate-45 origin-left">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-[var(--accent-primary)] rounded"></div>
                  <span className="text-[var(--text-secondary)]">Daily Users</span>
                </div>
              </div>
            </div>

            {/* Device Distribution */}
            <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Device Usage</h3>
              <div className="space-y-4">
                {data.userDemographics.byDevice.map((device) => {
                  const Icon = device.device === 'Desktop' ? Monitor : 
                              device.device === 'Mobile' ? Smartphone : Tablet;
                  return (
                    <div key={device.device} className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
                      <div className="flex-1">
                        <ProgressBar
                          label={device.device}
                          value={device.users}
                          total={data.overview.totalUsers}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Geographic Distribution */}
            <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Users by Country</span>
              </h3>
              <div className="space-y-3">
                {data.userDemographics.byCountry.map((country) => (
                  <ProgressBar
                    key={country.country}
                    label={country.country}
                    value={country.users}
                    total={data.overview.totalUsers}
                  />
                ))}
              </div>
            </div>

            {/* Age Demographics */}
            <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Age Demographics</span>
              </h3>
              <div className="space-y-3">
                {data.userDemographics.byAge.map((age) => (
                  <ProgressBar
                    key={age.ageGroup}
                    label={age.ageGroup}
                    value={age.users}
                    total={data.overview.totalUsers}
                    color="bg-green-500"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* User Behavior Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              icon={Clock}
              title="Avg. Session Duration"
              value={data.overview.sessionDuration}
              format="duration"
              change={5.2}
            />
            <MetricCard
              icon={TrendingUp}
              title="Bounce Rate"
              value={data.overview.bounceRate}
              format="percentage"
              change={-3.1}
            />
            <MetricCard
              icon={Eye}
              title="Pages per Session"
              value={3.2}
              change={8.7}
            />
          </div>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Popular Software */}
          <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Most Popular Software</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-primary)]">
                    <th className="text-left py-3 text-[var(--text-secondary)]">Software</th>
                    <th className="text-left py-3 text-[var(--text-secondary)]">Category</th>
                    <th className="text-left py-3 text-[var(--text-secondary)]">Downloads</th>
                    <th className="text-left py-3 text-[var(--text-secondary)]">Views</th>
                    <th className="text-left py-3 text-[var(--text-secondary)]">Rating</th>
                    <th className="text-left py-3 text-[var(--text-secondary)]">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {data.popularSoftware.map((software) => (
                    <tr key={software.id} className="border-b border-[var(--border-primary)]">
                      <td className="py-3 font-medium text-[var(--text-primary)]">{software.name}</td>
                      <td className="py-3 text-[var(--text-secondary)]">{software.category}</td>
                      <td className="py-3 text-[var(--text-primary)]">{software.downloads.toLocaleString()}</td>
                      <td className="py-3 text-[var(--text-secondary)]">{software.views.toLocaleString()}</td>
                      <td className="py-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-[var(--text-primary)]">{software.rating}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className={`flex items-center space-x-1 ${
                          software.trend === 'up' ? 'text-green-600' :
                          software.trend === 'down' ? 'text-red-600' : 'text-[var(--text-muted)]'
                        }`}>
                          <TrendingUp className={`w-4 h-4 ${
                            software.trend === 'down' ? 'rotate-180' : 
                            software.trend === 'stable' ? 'rotate-90' : ''
                          }`} />
                          <span className="capitalize">{software.trend}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Search Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Top Search Queries</h3>
              <div className="space-y-3">
                {data.searchAnalytics.topQueries.map((query, index) => (
                  <div key={query.query} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-[var(--accent-primary)] text-white rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className="text-[var(--text-primary)]">{query.query}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[var(--text-primary)] font-medium">{query.count.toLocaleString()}</div>
                      <div className="text-xs text-[var(--text-muted)]">{query.ctr}% CTR</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Zero Results Queries</h3>
              <div className="space-y-3">
                {data.searchAnalytics.noResultsQueries.map((query) => (
                  <div key={query.query} className="flex items-center justify-between py-2 border-b border-[var(--border-primary)]">
                    <span className="text-[var(--text-primary)]">{query.query}</span>
                    <span className="text-[var(--text-secondary)]">{query.count} searches</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-[var(--bg-secondary)] rounded-lg">
                <p className="text-sm text-[var(--text-muted)]">
                  💡 Consider adding content for these popular but unsatisfied searches
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Page Load Times */}
            <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Page Load Performance</h3>
              <div className="space-y-4">
                {data.performance.pageLoadTimes.map((page) => (
                  <div key={page.page}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--text-secondary)]">{page.page}</span>
                      <span className="text-[var(--text-primary)]">{page.avgTime}s avg</span>
                    </div>
                    <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          page.avgTime < 2 ? 'bg-green-500' :
                          page.avgTime < 3 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((page.avgTime / 5) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">
                      95th percentile: {page.p95Time}s
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversion Rates */}
            <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Conversion Funnels</h3>
              <div className="space-y-4">
                {data.performance.conversionRates.map((funnel) => (
                  <div key={funnel.funnel}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--text-secondary)]">{funnel.funnel}</span>
                      <span className="text-[var(--text-primary)]">{funnel.rate}%</span>
                    </div>
                    <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-[var(--accent-primary)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${funnel.rate}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Error Rates */}
          <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Error Rates by Page</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.performance.errorRates.map((page) => (
                <div key={page.page} className="text-center p-4 bg-[var(--bg-secondary)] rounded-lg">
                  <div className="text-lg font-semibold text-[var(--text-primary)]">{page.errorRate}%</div>
                  <div className="text-sm text-[var(--text-secondary)]">{page.page}</div>
                  <div className={`text-xs mt-1 ${
                    page.errorRate < 1 ? 'text-green-600' :
                    page.errorRate < 2 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {page.errorRate < 1 ? 'Good' : page.errorRate < 2 ? 'Fair' : 'Needs attention'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Export Analytics Data</h3>
        <p className="text-sm opacity-90 mb-4">
          Download detailed reports and data for further analysis
        </p>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
            Export as CSV
          </button>
          <button className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
            Generate PDF Report
          </button>
          <button className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
            Schedule Email Reports
          </button>
        </div>
      </div>
    </div>
  );
}
