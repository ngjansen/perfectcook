import React, { useState } from 'react';
import { Star, Trash2, Play, Clock, Search, Filter, Heart } from 'lucide-react';
import { FavoriteSetting } from '../types';
import { foods } from '../data/foods';
import { texturesByFood } from '../data/textures';
import { cookingMethods } from '../data/cookingMethods';
import { formatTime } from '../utils/calculations';

interface FavoritesManagerProps {
  favorites: FavoriteSetting[];
  onUseFavorite: (favorite: FavoriteSetting) => void;
  onDeleteFavorite: (id: string) => void;
  onAddToFavorites: (favorite: Omit<FavoriteSetting, 'id' | 'createdAt'>) => void;
  isPremium: boolean;
  onPremiumFeatureClick: (name: string, description: string) => void;
}

export const FavoritesManager: React.FC<FavoritesManagerProps> = ({
  favorites,
  onUseFavorite,
  onDeleteFavorite,
  onAddToFavorites,
  isPremium,
  onPremiumFeatureClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'popular'>('all');
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const getFoodDetails = (foodId: string) => {
    return foods.find(f => f.id === foodId);
  };

  const getTextureDetails = (foodId: string, textureId: string) => {
    return texturesByFood[foodId]?.find(t => t.id === textureId);
  };

  const getMethodDetails = (methodId: string) => {
    return cookingMethods.find(m => m.id === methodId);
  };

  const filteredFavorites = favorites
    .filter(favorite => {
      const food = getFoodDetails(favorite.foodId);
      const texture = getTextureDetails(favorite.foodId, favorite.textureId);
      const searchText = `${favorite.name} ${food?.name} ${texture?.name}`.toLowerCase();
      return searchText.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      switch (filterBy) {
        case 'recent':
          return b.createdAt - a.createdAt;
        case 'popular':
          // Sort by usage frequency (mock data for now)
          return Math.random() - 0.5;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleQuickAdd = (foodId: string, textureId: string) => {
    if (!isPremium && favorites.length >= 10) {
      onPremiumFeatureClick('Unlimited Favorites', 'Save unlimited cooking combinations and never lose your perfect recipes.');
      return;
    }

    const food = getFoodDetails(foodId);
    const texture = getTextureDetails(foodId, textureId);
    
    if (food && texture) {
      onAddToFavorites({
        name: `${texture.name} ${food.name}`,
        foodId,
        textureId,
        cookingMethod: 'boiling',
        thickness: 3,
        startingTemp: 'room',
      });
      setShowQuickAdd(false);
    }
  };

  const popularCombinations = [
    { foodId: 'eggs', textureId: 'soft-boiled', name: 'Soft-Boiled Eggs' },
    { foodId: 'pasta', textureId: 'al-dente', name: 'Al Dente Pasta' },
    { foodId: 'chicken', textureId: 'juicy', name: 'Juicy Chicken' },
    { foodId: 'potatoes', textureId: 'tender', name: 'Tender Potatoes' },
  ];

  if (favorites.length === 0 && !showQuickAdd) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-bounce">
          <Heart className="w-8 h-8 text-accent-600" />
        </div>
        <h3 className="text-xl font-semibold text-warm-800 mb-2">
          No Favorites Yet
        </h3>
        <p className="text-warm-600 max-w-md mx-auto mb-6">
          Save your perfect cooking combinations for quick access. Complete a cooking session 
          and rate it 4+ stars to add to favorites!
        </p>
        
        <button
          onClick={() => setShowQuickAdd(true)}
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Add Popular Favorites
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-warm-800">
            Favorites ({favorites.length}{!isPremium && '/10'})
          </h3>
          <p className="text-sm text-warm-600">
            Your saved cooking combinations
          </p>
        </div>
        
        <button
          onClick={() => setShowQuickAdd(true)}
          className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200"
        >
          Quick Add
        </button>
      </div>

      {/* Search and Filter */}
      {favorites.length > 0 && (
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search favorites..."
              className="w-full pl-10 pr-4 py-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="pl-10 pr-8 py-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All</option>
              <option value="recent">Recent</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>
      )}

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-pop-in">
          <h4 className="font-semibold text-warm-800 mb-4">Add Popular Favorites</h4>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {popularCombinations.map((combo) => {
              const food = getFoodDetails(combo.foodId);
              const texture = getTextureDetails(combo.foodId, combo.textureId);
              
              return (
                <button
                  key={`${combo.foodId}-${combo.textureId}`}
                  onClick={() => handleQuickAdd(combo.foodId, combo.textureId)}
                  className="p-4 bg-accent-50 hover:bg-accent-100 rounded-xl text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{food?.icon}</span>
                    <div>
                      <h5 className="font-medium text-warm-800">{combo.name}</h5>
                      <p className="text-sm text-warm-600">{texture?.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setShowQuickAdd(false)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* Favorites List */}
      <div className="space-y-4">
        {filteredFavorites.map((favorite) => {
          const food = getFoodDetails(favorite.foodId);
          const texture = getTextureDetails(favorite.foodId, favorite.textureId);
          const method = getMethodDetails(favorite.cookingMethod);

          if (!food || !texture || !method) return null;

          return (
            <div
              key={favorite.id}
              className="bg-white rounded-2xl p-5 shadow-md border border-primary-100 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{food.icon}</span>
                  <div>
                    <h4 className="font-semibold text-warm-800">
                      {favorite.name}
                    </h4>
                    <p className="text-sm text-warm-600">
                      {texture.name} {food.name} • {method.name}
                    </p>
                    <p className="text-xs text-warm-500">
                      Added {new Date(favorite.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent-500 fill-current" />
                  <button
                    onClick={() => onDeleteFavorite(favorite.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete favorite"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-warm-600">
                  <span>Thickness: {favorite.thickness}/5</span>
                  <span>Temp: {favorite.startingTemp}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>~{formatTime(Math.round(food.baseTime * texture.multiplier))}</span>
                  </div>
                </div>

                <button
                  onClick={() => onUseFavorite(favorite)}
                  className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Use
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Premium Limit Notice */}
      {!isPremium && favorites.length >= 10 && (
        <div className="bg-accent-50 rounded-xl p-4 border border-accent-200">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-accent-600" />
            <div>
              <h4 className="font-medium text-accent-800">Premium Feature</h4>
              <p className="text-sm text-accent-700">
                Upgrade to save unlimited favorites
              </p>
            </div>
            <button
              onClick={() => onPremiumFeatureClick('Unlimited Favorites', 'Save unlimited cooking combinations and never lose your perfect recipes.')}
              className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredFavorites.length === 0 && favorites.length > 0 && (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h4 className="font-medium text-warm-800 mb-1">No favorites found</h4>
          <p className="text-sm text-warm-600">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
};