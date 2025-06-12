import React, { useState } from 'react';
import { Food } from '../types';
import { formatTemperature } from '../utils/temperature';
import { CheckCircle, Lock } from 'lucide-react';
import { PremiumBadge } from './PremiumBadge';

interface FoodCardProps {
  food: Food;
  onClick: () => void;
  isSelected?: boolean;
  temperatureUnit?: 'celsius' | 'fahrenheit';
  isPremium?: boolean;
  onPremiumFeatureClick?: (name: string, description: string) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ 
  food, 
  onClick, 
  isSelected = false,
  temperatureUnit = 'fahrenheit',
  isPremium = false,
  onPremiumFeatureClick
}) => {
  const [showRipple, setShowRipple] = useState(false);

  const handleClick = () => {
    if (food.isPremium && !isPremium && onPremiumFeatureClick) {
      onPremiumFeatureClick('Premium Food', `${food.name} is available with premium subscription.`);
      return;
    }
    
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
    onClick();
  };

  const isLocked = food.isPremium && !isPremium;

  return (
    <button
      onClick={handleClick}
      className={`w-full p-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden ${
        isSelected
          ? 'bg-primary-500 text-white shadow-lg ring-2 ring-primary-300 animate-pop-in'
          : isLocked
          ? 'bg-gray-100 hover:bg-gray-200 shadow-md border border-gray-200'
          : 'bg-white hover:bg-primary-50 shadow-md border border-primary-100'
      }`}
    >
      {/* Ripple effect */}
      {showRipple && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4 h-4 bg-white/30 rounded-full animate-ripple" />
        </div>
      )}

      {/* Premium badge */}
      {food.isPremium && (
        <div className="absolute top-3 left-3">
          {isPremium ? (
            <PremiumBadge variant="crown" size="small" />
          ) : (
            <PremiumBadge variant="lock" size="small" />
          )}
        </div>
      )}

      {/* Selection checkmark with animation */}
      {isSelected && !isLocked && (
        <div className="absolute top-3 right-3 animate-pop-in">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-primary-500" />
          </div>
        </div>
      )}
      
      <div className="text-center">
        <div className={`text-4xl mb-3 transition-transform duration-200 ${
          isSelected && !isLocked ? 'animate-gentle-bounce' : ''
        } ${isLocked ? 'opacity-50' : ''}`}>
          {food.icon}
        </div>
        <h3 className={`font-semibold text-lg mb-2 ${
          isSelected && !isLocked ? 'text-white' : 
          isLocked ? 'text-gray-500' : 'text-warm-800'
        }`}>
          {food.name}
        </h3>
        <p className={`text-sm ${
          isSelected && !isLocked ? 'text-primary-100' : 
          isLocked ? 'text-gray-400' : 'text-warm-600'
        }`}>
          {food.description}
        </p>
        {food.safetyTemp && (
          <div className={`mt-3 text-xs px-3 py-1 rounded-full inline-block transition-all duration-200 ${
            isSelected && !isLocked
              ? 'bg-white/20 text-white' 
              : isLocked
              ? 'bg-gray-200 text-gray-500'
              : 'bg-primary-100 text-primary-700'
          }`}>
            Safe at {formatTemperature(food.safetyTemp, temperatureUnit)}
          </div>
        )}
        
        {isLocked && (
          <div className="mt-3 text-xs text-gray-500 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Premium Required
          </div>
        )}
      </div>
    </button>
  );
};