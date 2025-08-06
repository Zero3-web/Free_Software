import { useState, useEffect } from 'react';
import { Star, User, ThumbsUp, ThumbsDown, Flag, MessageCircle, Calendar, Shield, Check, X } from 'lucide-react';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  userVote?: 'helpful' | 'notHelpful' | null;
  tags: string[];
  pros: string[];
  cons: string[];
}

interface ReviewsSystemProps {
  productId: string;
  reviews: Review[];
  onReviewSubmit: (review: Omit<Review, 'id' | 'date' | 'helpful' | 'notHelpful' | 'userVote'>) => void;
  onVote: (reviewId: string, vote: 'helpful' | 'notHelpful') => void;
  onReport: (reviewId: string, reason: string) => void;
  currentUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

const REVIEW_TAGS = [
  'Easy to use', 'Great features', 'Good value', 'Reliable', 'Fast performance',
  'Good support', 'Regular updates', 'Intuitive interface', 'Powerful tools',
  'Flexible', 'Stable', 'Innovative', 'Professional', 'Beginner-friendly'
];

export default function ReviewsSystem({ 
  productId, 
  reviews, 
  onReviewSubmit, 
  onVote, 
  onReport, 
  currentUser 
}: ReviewsSystemProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful' | 'rating'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
    tags: [] as string[],
    pros: [''],
    cons: ['']
  });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  // Sort and filter reviews
  const sortedReviews = [...reviews]
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'helpful':
          return b.helpful - a.helpful;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const review = {
      productId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      verified: true, // Could be based on actual purchase verification
      tags: newReview.tags,
      pros: newReview.pros.filter(p => p.trim() !== ''),
      cons: newReview.cons.filter(c => c.trim() !== '')
    };

    onReviewSubmit(review);
    setNewReview({
      rating: 5,
      title: '',
      content: '',
      tags: [],
      pros: [''],
      cons: ['']
    });
    setShowReviewForm(false);
  };

  const toggleTag = (tag: string) => {
    setNewReview(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const updateProsCons = (type: 'pros' | 'cons', index: number, value: string) => {
    setNewReview(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => i === index ? value : item)
    }));
  };

  const addProsCons = (type: 'pros' | 'cons') => {
    setNewReview(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }));
  };

  const removeProsCons = (type: 'pros' | 'cons', index: number) => {
    setNewReview(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const StarRating = ({ rating, onRate, interactive = false }: { 
    rating: number; 
    onRate?: (rating: number) => void; 
    interactive?: boolean;
  }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRate?.(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= (hoverRating || rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">Reviews</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold text-[var(--text-primary)]">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-[var(--text-secondary)]">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>
        
        {currentUser && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-secondary)] transition-colors"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Rating Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Rating Distribution</h4>
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm text-[var(--text-secondary)] w-4">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <div className="flex-1 bg-[var(--bg-secondary)] rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-[var(--text-secondary)] w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Most Mentioned</h4>
          <div className="flex flex-wrap gap-2">
            {REVIEW_TAGS.slice(0, 8).map(tag => {
              const count = reviews.filter(r => r.tags.includes(tag)).length;
              return count > 0 ? (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-sm rounded-full"
                >
                  {tag} ({count})
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-[var(--bg-secondary)] rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[var(--text-secondary)]">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-[var(--text-secondary)]">Filter by rating:</span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setFilterRating(null)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                filterRating === null
                  ? 'bg-[var(--accent-primary)] text-white'
                  : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
              }`}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filterRating === rating
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
                }`}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Write your review</h4>
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Rating
                </label>
                <StarRating
                  rating={newReview.rating}
                  onRate={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                  interactive
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Summarize your experience..."
                  className="w-full p-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Detailed Review
                </label>
                <textarea
                  value={newReview.content}
                  onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your detailed experience with this software..."
                  rows={4}
                  className="w-full p-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Tags (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {REVIEW_TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        newReview.tags.includes(tag)
                          ? 'bg-[var(--accent-primary)] text-white'
                          : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Pros
                  </label>
                  {newReview.pros.map((pro, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={pro}
                        onChange={(e) => updateProsCons('pros', index, e.target.value)}
                        placeholder="What did you like?"
                        className="flex-1 p-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)]"
                      />
                      {newReview.pros.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProsCons('pros', index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addProsCons('pros')}
                    className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
                  >
                    + Add another pro
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Cons
                  </label>
                  {newReview.cons.map((con, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={con}
                        onChange={(e) => updateProsCons('cons', index, e.target.value)}
                        placeholder="What could be improved?"
                        className="flex-1 p-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)]"
                      />
                      {newReview.cons.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProsCons('cons', index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addProsCons('cons')}
                    className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
                  >
                    + Add another con
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-secondary)] transition-colors"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[var(--accent-primary)] rounded-full flex items-center justify-center">
                  {review.userAvatar ? (
                    <img src={review.userAvatar} alt={review.userName} className="w-full h-full rounded-full" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[var(--text-primary)]">{review.userName}</span>
                    {review.verified && (
                      <div className="flex items-center space-x-1 text-green-500">
                        <Shield className="w-4 h-4" />
                        <span className="text-xs">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[var(--text-secondary)]">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>

            <h5 className="font-semibold text-[var(--text-primary)] mb-2">{review.title}</h5>
            <p className="text-[var(--text-secondary)] mb-4">{review.content}</p>

            {/* Pros and Cons */}
            {(review.pros.length > 0 || review.cons.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {review.pros.length > 0 && (
                  <div>
                    <h6 className="font-medium text-green-600 mb-2">Pros:</h6>
                    <ul className="space-y-1">
                      {review.pros.map((pro, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <Check className="w-4 h-4 text-green-500" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {review.cons.length > 0 && (
                  <div>
                    <h6 className="font-medium text-red-600 mb-2">Cons:</h6>
                    <ul className="space-y-1">
                      {review.cons.map((con, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <X className="w-4 h-4 text-red-500" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            {review.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {review.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[var(--bg-primary)] text-[var(--text-secondary)] text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onVote(review.id, 'helpful')}
                className={`flex items-center space-x-1 text-sm transition-colors ${
                  review.userVote === 'helpful'
                    ? 'text-green-600'
                    : 'text-[var(--text-secondary)] hover:text-green-600'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button
                onClick={() => onVote(review.id, 'notHelpful')}
                className={`flex items-center space-x-1 text-sm transition-colors ${
                  review.userVote === 'notHelpful'
                    ? 'text-red-600'
                    : 'text-[var(--text-secondary)] hover:text-red-600'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span>Not Helpful ({review.notHelpful})</span>
              </button>
              <button
                onClick={() => onReport(review.id, 'inappropriate')}
                className="flex items-center space-x-1 text-sm text-[var(--text-secondary)] hover:text-red-600 transition-colors"
              >
                <Flag className="w-4 h-4" />
                <span>Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedReviews.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-xl text-[var(--text-secondary)] mb-2">No reviews yet</p>
          <p className="text-[var(--text-muted)]">Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
}
