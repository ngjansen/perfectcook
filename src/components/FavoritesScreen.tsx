import React from 'react';
import { Star, Trash2, Play, Clock } from 'lucide-react';
import { Navigation } from './Navigation';
import { FavoriteSetting } from '../types';
import { foods } from '../data/foods';
import { texturesByFood } from '../data/textures';
import { cookingMethods } from '../data/cookingMethods';
import { formatTime } from '../utils/calculations';

interface FavoritesScreenProps {
  favorites: FavoriteSetting[];
  onBack: () => void;
  onUseFavorite: (favorite: FavoriteSetting) => void;
  onDeleteFavorite: (id: string) => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favorites,
  onBack,
  onUseFavorite,
  onDeleteFavorite,
}) => {
  const getFoodDetails = (foodId: string) => {
    return foods.find(f => f.id === foodId);
  };

  const getTextureDetails = (foodId: string, textureId: string) => {
    return texturesByFood[foodId]?.find(t => t.id === textureId);
  };

  const getMethodDetails = (methodId: string) => {
    return cookingMethods.find(m => m.id === methodId);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50">
        <Navigation onBack={onBack} title="Favorites" />
        
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
          <div className="text-center">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Favorites Yet
            </h2>
            <p className="text-gray-500 max-w-md">
              Save your perfect cooking combinations for quick access. 
              Complete a cooking session and rate it 4+ stars to add to favorites!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <Navigation onBack={onBack} title="Favorites" />
      
      <div className="p-6 space-y-4">
        <div className="text-center mb-6">
          <p className="text-warm-600">
            Your saved cooking combinations for perfect results every time
          </p>
        </div>

        {favorites.map((favorite) => {
          const food = getFoodDetails(favorite.foodId);
          const texture = getTextureDetails(favorite.foodId, favorite.textureId);
          const method = getMethodDetails(favorite.cookingMethod);

          if (!food || !texture || !method) return null;

          return (
            <div
              key={favorite.id}
              className="bg-white rounded-2xl p-5 shadow-md border border-primary-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{food.icon}</span>
                  <div>
                    <h3 className="font-semibold text-warm-800">
                      {favorite.name}
                    </h3>
                    <p className="text-sm text-warm-600">
                      {texture.name} {food.name} • {method.name}
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
    </div>
  );
};