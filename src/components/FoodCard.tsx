import React, { useState } from 'react';
import { Food } from '../types';
import { formatTemperature } from '../utils/temperature';
import { CheckCircle } from 'lucide-react';

interface FoodCardProps {
  food: Food;
  onClick: () => void;
  isSelected?: boolean;
  temperatureUnit?: 'celsius' | 'fahrenheit';
}

export const FoodCard: React.FC<FoodCardProps> = ({ 
  food, 
  onClick, 
  isSelected = false,
  temperatureUnit = 'fahrenheit'
}) => {
  const [showRipple, setShowRipple] = useState(false);

  const handleClick = () => {
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full p-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden ${
        isSelected
          ? 'bg-primary-500 text-white shadow-lg ring-2 ring-primary-300 animate-pop-in'
          : 'bg-white hover:bg-primary-50 shadow-md border border-primary-100'
      }`}
    >
      {/* Ripple effect */}
      {showRipple && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4 h-4 bg-white/30 rounded-full animate-ripple" />
        </div>
      )}

      {/* Selection checkmark with animation */}
      {isSelected && (
        <div className="absolute top-3 right-3 animate-pop-in">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-primary-500" />
          </div>
        </div>
      )}
      
      <div className="text-center">
        <div className={`text-4xl mb-3 transition-transform duration-200 ${
          isSelected ? 'animate-gentle-bounce' : ''
        }`}>
          {food.icon}
        </div>
        <h3 className={`font-semibold text-lg mb-2 ${
          isSelected ? 'text-white' : 'text-warm-800'
        }`}>
          {food.name}
        </h3>
        <p className={`text-sm ${
          isSelected ? 'text-primary-100' : 'text-warm-600'
        }`}>
          {food.description}
        </p>
        {food.safetyTemp && (
          <div className={`mt-3 text-xs px-3 py-1 rounded-full inline-block transition-all duration-200 ${
            isSelected 
              ? 'bg-white/20 text-white' 
              : 'bg-primary-100 text-primary-700'
          }`}>
            Safe at {formatTemperature(food.safetyTemp, temperatureUnit)}
          </div>
        )}
      </div>
    </button>
  );
};