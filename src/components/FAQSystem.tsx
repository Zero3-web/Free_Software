import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, HelpCircle, Star, ThumbsUp, ThumbsDown, Tag, MessageCircle } from 'lucide-react';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
  lastUpdated: string;
  featured: boolean;
}

interface FAQSystemProps {
  faqs: FAQ[];
  onVote: (faqId: string, vote: 'helpful' | 'notHelpful') => void;
  onSearch?: (query: string) => void;
  categories?: string[];
  showSearch?: boolean;
  showCategories?: boolean;
  maxItems?: number;
}

const DEFAULT_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'How do I download software safely?',
    answer: 'Always download software from official sources or trusted repositories. Check for security badges, read reviews, and scan downloads with antivirus software. Our platform verifies all software before listing.',
    category: 'Security',
    tags: ['download', 'safety', 'security', 'antivirus'],
    helpful: 45,
    notHelpful: 2,
    lastUpdated: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    question: 'Are all software on this platform really free?',
    answer: 'Yes, all software listed on our platform is completely free to download and use. We may include freemium software with optional paid features, but the core functionality is always free.',
    category: 'General',
    tags: ['free', 'pricing', 'license'],
    helpful: 38,
    notHelpful: 1,
    lastUpdated: '2024-01-10',
    featured: true
  },
  {
    id: '3',
    question: 'How do I check software compatibility with my system?',
    answer: 'Each software page includes detailed system requirements. Check the minimum OS version, RAM, processor, and storage requirements. Our compatibility checker can also help identify potential issues.',
    category: 'Technical',
    tags: ['compatibility', 'system requirements', 'OS'],
    helpful: 52,
    notHelpful: 3,
    lastUpdated: '2024-01-12',
    featured: true
  },
  {
    id: '4',
    question: 'Can I install multiple versions of the same software?',
    answer: 'This depends on the software. Some applications support multiple versions, while others may conflict. Check the software documentation or use virtual environments when possible.',
    category: 'Technical',
    tags: ['installation', 'versions', 'multiple'],
    helpful: 29,
    notHelpful: 4,
    lastUpdated: '2024-01-08',
    featured: false
  },
  {
    id: '5',
    question: 'What should I do if software doesn\'t work properly?',
    answer: 'First, check if your system meets the requirements. Try restarting the application, updating to the latest version, or reinstalling. Contact the software developer for specific issues or check our troubleshooting guides.',
    category: 'Troubleshooting',
    tags: ['troubleshooting', 'bugs', 'issues', 'support'],
    helpful: 33,
    notHelpful: 2,
    lastUpdated: '2024-01-14',
    featured: false
  },
  {
    id: '6',
    question: 'How often is software updated on your platform?',
    answer: 'We check for updates daily and typically update software within 24-48 hours of a new release. Popular software is prioritized for faster updates.',
    category: 'Updates',
    tags: ['updates', 'versions', 'frequency'],
    helpful: 41,
    notHelpful: 1,
    lastUpdated: '2024-01-16',
    featured: true
  },
  {
    id: '7',
    question: 'Can I suggest new software to be added?',
    answer: 'Absolutely! Use our suggestion form to recommend software. We review all suggestions and add high-quality, popular, and safe software to our catalog.',
    category: 'General',
    tags: ['suggestions', 'request', 'new software'],
    helpful: 27,
    notHelpful: 0,
    lastUpdated: '2024-01-11',
    featured: false
  },
  {
    id: '8',
    question: 'How do I uninstall software properly?',
    answer: 'Use your operating system\'s built-in uninstaller (Control Panel on Windows, Applications folder on Mac). For complete removal, consider using specialized uninstaller software to remove leftover files.',
    category: 'Technical',
    tags: ['uninstall', 'removal', 'cleanup'],
    helpful: 35,
    notHelpful: 2,
    lastUpdated: '2024-01-13',
    featured: false
  }
];

export default function FAQSystem({ 
  faqs = DEFAULT_FAQS, 
  onVote, 
  onSearch,
  categories = ['General', 'Security', 'Technical', 'Troubleshooting', 'Updates'],
  showSearch = true,
  showCategories = true,
  maxItems
}: FAQSystemProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'helpful' | 'recent' | 'alphabetical'>('helpful');

  const filteredFAQs = faqs
    .filter(faq => {
      const matchesSearch = !searchQuery || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || faq.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'helpful':
          return (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful);
        case 'recent':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'alphabetical':
          return a.question.localeCompare(b.question);
        default:
          return 0;
      }
    })
    .slice(0, maxItems);

  // Move featured items to the top
  const sortedFAQs = [
    ...filteredFAQs.filter(faq => faq.featured),
    ...filteredFAQs.filter(faq => !faq.featured)
  ];

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const categoryStats = categories.map(category => ({
    category,
    count: faqs.filter(faq => faq.category === category).length
  }));

  return (
    <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-6 h-6 text-[var(--accent-primary)]" />
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Frequently Asked Questions</h2>
        </div>
        <div className="text-sm text-[var(--text-secondary)]">
          {sortedFAQs.length} of {faqs.length} questions
        </div>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search questions, answers, or tags..."
            className="w-full pl-10 pr-4 py-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
          />
        </div>
      )}

      {/* Categories and Sort */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {showCategories && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[var(--text-secondary)]">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm"
            >
              <option value="">All Categories</option>
              {categoryStats.map(({ category, count }) => (
                <option key={category} value={category}>
                  {category} ({count})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <span className="text-sm text-[var(--text-secondary)]">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm"
          >
            <option value="helpful">Most Helpful</option>
            <option value="recent">Most Recent</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Featured Questions */}
      {!searchQuery && !selectedCategory && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Featured Questions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedFAQs.filter(faq => faq.featured).slice(0, 3).map(faq => (
              <div
                key={faq.id}
                className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => toggleExpanded(faq.id)}
              >
                <h4 className="font-medium text-[var(--text-primary)] mb-2">{faq.question}</h4>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{faq.answer}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-[var(--accent-primary)] text-white text-xs rounded-full">
                      {faq.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-[var(--text-secondary)]">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{faq.helpful}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {sortedFAQs.map((faq) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] overflow-hidden"
          >
            <button
              onClick={() => toggleExpanded(faq.id)}
              className="w-full px-6 py-4 text-left hover:bg-[var(--bg-primary)] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-medium text-[var(--text-primary)]">{faq.question}</h3>
                    {faq.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-[var(--text-secondary)]">
                    <span className="px-2 py-1 bg-[var(--accent-primary)] text-white rounded-full">
                      {faq.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{faq.helpful}</span>
                    </div>
                    <span>Updated {new Date(faq.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-[var(--text-secondary)]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--text-secondary)]" />
                  )}
                </div>
              </div>
            </button>

            <AnimatePresence>
              {expandedItems.includes(faq.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 pb-4 border-t border-[var(--border-primary)]"
                >
                  <div className="pt-4">
                    <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                      {faq.answer}
                    </p>

                    {/* Tags */}
                    {faq.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {faq.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-[var(--bg-primary)] text-[var(--text-muted)] text-xs rounded-full flex items-center space-x-1"
                          >
                            <Tag className="w-3 h-3" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => onVote(faq.id, 'helpful')}
                          className="flex items-center space-x-1 text-sm text-[var(--text-secondary)] hover:text-green-600 transition-colors"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({faq.helpful})</span>
                        </button>
                        <button
                          onClick={() => onVote(faq.id, 'notHelpful')}
                          className="flex items-center space-x-1 text-sm text-[var(--text-secondary)] hover:text-red-600 transition-colors"
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>Not Helpful ({faq.notHelpful})</span>
                        </button>
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        Last updated: {new Date(faq.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {sortedFAQs.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-xl text-[var(--text-secondary)] mb-2">No questions found</p>
          <p className="text-[var(--text-muted)]">
            {searchQuery ? 'Try adjusting your search terms' : 'Check back later for more questions'}
          </p>
        </div>
      )}

      {/* Contact Support */}
      <div className="mt-8 p-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-lg text-white">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-5 h-5" />
          <div>
            <h4 className="font-semibold">Can't find what you're looking for?</h4>
            <p className="text-sm opacity-90">Contact our support team for personalized help</p>
          </div>
        </div>
      </div>
    </div>
  );
}
