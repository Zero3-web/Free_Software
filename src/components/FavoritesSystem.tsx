import { useState, useEffect, useCallback } from 'react';
import { Heart, X, Grid, List, Filter, Download, Star, Calendar, FolderPlus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import type { Product } from '../data/products';

export interface FavoriteItem {
  id: string;
  product: Product;
  dateAdded: string;
  collections: string[];
  notes?: string;
}

export interface FavoriteCollection {
  id: string;
  name: string;
  description?: string;
  color: string;
  dateCreated: string;
  productIds: string[];
}

interface FavoritesSystemProps {
  products: Product[];
  onFavoriteChange?: (productId: string, isFavorite: boolean) => void;
}

const DEFAULT_COLLECTIONS: FavoriteCollection[] = [
  {
    id: 'default',
    name: 'My Favorites',
    description: 'All your favorite software',
    color: '#3B82F6',
    dateCreated: new Date().toISOString(),
    productIds: []
  }
];

const COLLECTION_COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

export default function FavoritesSystem({ products, onFavoriteChange }: FavoritesSystemProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [collections, setCollections] = useState<FavoriteCollection[]>(DEFAULT_COLLECTIONS);
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'dateAdded' | 'name' | 'rating' | 'downloads'>('dateAdded');
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLLECTION_COLORS[0]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('opensoftware_favorites');
    const savedCollections = localStorage.getItem('opensoftware_collections');
    
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
    
    if (savedCollections) {
      try {
        setCollections(JSON.parse(savedCollections));
      } catch (error) {
        console.error('Error loading collections:', error);
        setCollections(DEFAULT_COLLECTIONS);
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('opensoftware_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('opensoftware_collections', JSON.stringify(collections));
  }, [collections]);

  // Check if product is favorited
  const isFavorited = useCallback((productId: string): boolean => {
    return favorites.some(fav => fav.product.id === productId);
  }, [favorites]);

  // Add to favorites
  const addToFavorites = useCallback((product: Product, collectionIds: string[] = ['default']) => {
    const newFavorite: FavoriteItem = {
      id: `${product.id}_${Date.now()}`,
      product,
      dateAdded: new Date().toISOString(),
      collections: collectionIds
    };

    setFavorites(prev => [...prev, newFavorite]);

    // Update collections
    setCollections(prev => prev.map(collection => {
      if (collectionIds.includes(collection.id)) {
        return {
          ...collection,
          productIds: [...collection.productIds, product.id]
        };
      }
      return collection;
    }));

    onFavoriteChange?.(product.id, true);
  }, [onFavoriteChange]);

  // Remove from favorites
  const removeFromFavorites = useCallback((productId: string) => {
    setFavorites(prev => prev.filter(fav => fav.product.id !== productId));

    // Update collections
    setCollections(prev => prev.map(collection => ({
      ...collection,
      productIds: collection.productIds.filter(id => id !== productId)
    })));

    onFavoriteChange?.(productId, false);
  }, [onFavoriteChange]);

  // Toggle favorite
  const toggleFavorite = useCallback((product: Product) => {
    if (isFavorited(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }, [isFavorited, addToFavorites, removeFromFavorites]);

  // Add to collection
  const addToCollection = (productId: string, collectionId: string) => {
    setFavorites(prev => prev.map(fav => 
      fav.product.id === productId 
        ? { ...fav, collections: [...new Set([...fav.collections, collectionId])] }
        : fav
    ));

    setCollections(prev => prev.map(collection => 
      collection.id === collectionId
        ? { ...collection, productIds: [...new Set([...collection.productIds, productId])] }
        : collection
    ));
  };

  // Remove from collection
  const removeFromCollection = (productId: string, collectionId: string) => {
    setFavorites(prev => prev.map(fav => 
      fav.product.id === productId 
        ? { ...fav, collections: fav.collections.filter(id => id !== collectionId) }
        : fav
    ));

    setCollections(prev => prev.map(collection => 
      collection.id === collectionId
        ? { ...collection, productIds: collection.productIds.filter(id => id !== productId) }
        : collection
    ));
  };

  // Create new collection
  const createCollection = () => {
    if (!newCollectionName.trim()) return;

    const newCollection: FavoriteCollection = {
      id: `collection_${Date.now()}`,
      name: newCollectionName.trim(),
      description: newCollectionDescription.trim(),
      color: selectedColor,
      dateCreated: new Date().toISOString(),
      productIds: []
    };

    setCollections(prev => [...prev, newCollection]);
    setNewCollectionName('');
    setNewCollectionDescription('');
    setShowCreateCollection(false);
  };

  // Delete collection
  const deleteCollection = (collectionId: string) => {
    if (collectionId === 'default') return; // Can't delete default collection

    setCollections(prev => prev.filter(col => col.id !== collectionId));
    
    // Remove collection from favorites
    setFavorites(prev => prev.map(fav => ({
      ...fav,
      collections: fav.collections.filter(id => id !== collectionId)
    })));

    if (selectedCollection === collectionId) {
      setSelectedCollection('all');
    }
  };

  // Get filtered favorites
  const filteredFavorites = favorites.filter(favorite => {
    if (selectedCollection === 'all') return true;
    return favorite.collections.includes(selectedCollection);
  });

  // Sort favorites
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'dateAdded':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'name':
        return a.product.name.localeCompare(b.product.name);
      case 'rating':
        return b.product.rating - a.product.rating;
      case 'downloads':
        return b.product.downloads - a.product.downloads;
      default:
        return 0;
    }
  });

  // Export favorites
  const exportFavorites = () => {
    const data = {
      favorites,
      collections,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `opensoftware-favorites-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Enhanced ProductCard with collection management
  const EnhancedProductCard = ({ favorite }: { favorite: FavoriteItem }) => (
    <div className="group relative">
      <ProductCard 
        product={favorite.product} 
        isFavorited={true}
        onFavoriteClick={() => toggleFavorite(favorite.product)}
      />
      
      {/* Collection badges */}
      <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[70%]">
        {favorite.collections.map(collectionId => {
          const collection = collections.find(c => c.id === collectionId);
          return collection ? (
            <span
              key={collectionId}
              className="px-2 py-1 text-xs text-white rounded-full shadow-lg"
              style={{ backgroundColor: collection.color }}
            >
              {collection.name}
            </span>
          ) : null;
        })}
      </div>

      {/* Quick actions on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
        <button
          onClick={() => toggleFavorite(favorite.product)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Heart className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">My Favorites</h2>
          <span className="px-3 py-1 bg-[var(--accent-primary)] text-white text-sm rounded-full">
            {favorites.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={exportFavorites}
            className="px-3 py-2 bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-lg hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
          >
            <Download className="w-4 h-4 inline mr-1" />
            Export
          </button>
          <button
            onClick={() => setShowCreateCollection(true)}
            className="px-3 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-secondary)] transition-colors"
          >
            <FolderPlus className="w-4 h-4 inline mr-1" />
            New Collection
          </button>
        </div>
      </div>

      {/* Collections */}
      <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-primary)]">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Collections</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedCollection('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCollection === 'all'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
            }`}
          >
            All ({favorites.length})
          </button>
          
          {collections.map(collection => (
            <div key={collection.id} className="relative group">
              <button
                onClick={() => setSelectedCollection(collection.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                  selectedCollection === collection.id
                    ? 'text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white'
                }`}
                style={{
                  backgroundColor: selectedCollection === collection.id ? collection.color : undefined,
                }}
              >
                <span>{collection.name}</span>
                <span className="text-xs opacity-75">({collection.productIds.length})</span>
              </button>
              
              {collection.id !== 'default' && (
                <button
                  onClick={() => deleteCollection(collection.id)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Selected collection info */}
        {selectedCollection !== 'all' && (
          <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
            {(() => {
              const collection = collections.find(c => c.id === selectedCollection);
              return collection ? (
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: collection.color }}
                  />
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)]">{collection.name}</h4>
                    {collection.description && (
                      <p className="text-sm text-[var(--text-secondary)]">{collection.description}</p>
                    )}
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[var(--text-secondary)]">View:</span>
            <div className="flex border border-[var(--border-primary)] rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-[var(--text-secondary)]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm"
            >
              <option value="dateAdded">Date Added</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="downloads">Downloads</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-[var(--text-secondary)]">
          Showing {sortedFavorites.length} of {favorites.length} favorites
        </div>
      </div>

      {/* Create Collection Modal */}
      <AnimatePresence>
        {showCreateCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowCreateCollection(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--bg-primary)] rounded-xl p-6 max-w-md w-full mx-4 border border-[var(--border-primary)]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Create New Collection</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="e.g., Design Tools, Development"
                    className="w-full p-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Description (optional)
                  </label>
                  <textarea
                    value={newCollectionDescription}
                    onChange={(e) => setNewCollectionDescription(e.target.value)}
                    placeholder="Describe this collection..."
                    rows={3}
                    className="w-full p-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COLLECTION_COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color ? 'border-[var(--text-primary)] scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={createCollection}
                  disabled={!newCollectionName.trim()}
                  className="flex-1 px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Collection
                </button>
                <button
                  onClick={() => setShowCreateCollection(false)}
                  className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Grid/List */}
      {sortedFavorites.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedFavorites.map(favorite => (
              <EnhancedProductCard key={favorite.id} favorite={favorite} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedFavorites.map(favorite => (
              <div key={favorite.id} className="bg-[var(--bg-primary)] rounded-lg p-4 border border-[var(--border-primary)] flex items-center space-x-4">
                <img
                  src={favorite.product.image}
                  alt={favorite.product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">{favorite.product.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{favorite.product.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">{favorite.product.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
                      <span className="text-sm text-[var(--text-muted)]">
                        Added {new Date(favorite.dateAdded).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(favorite.product)}
                  className="p-2 text-red-500 hover:bg-red-50"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-xl text-[var(--text-secondary)] mb-2">No favorites yet</p>
          <p className="text-[var(--text-muted)]">
            {selectedCollection === 'all' 
              ? 'Start adding software to your favorites!'
              : 'This collection is empty. Add some software to it!'
            }
          </p>
        </div>
      )}
    </div>
  );
}
