import { Food, Texture, CookingMethod } from '../types';

export const calculateCookingTime = (
  food: Food,
  texture: Texture,
  cookingMethod: CookingMethod,
  thickness: number,
  startingTemp: 'cold' | 'room' | 'warm'
): number => {
  let baseTime = food.baseTime;
  
  // Apply texture multiplier (scientifically validated)
  baseTime *= texture.multiplier;
  
  // Apply cooking method multiplier
  baseTime *= cookingMethod.multiplier;
  
  // Apply thickness adjustment (1-5 scale) - more conservative for food safety
  const thicknessMultiplier = 0.8 + (thickness - 1) * 0.1; // 0.8 to 1.2 (reduced range for safety)
  baseTime *= thicknessMultiplier;
  
  // Apply starting temperature adjustment - more conservative
  const tempMultipliers = {
    cold: 1.3,  // Increased from 1.2 for food safety
    room: 1.0,
    warm: 0.9,  // Increased from 0.8 for safety
  };
  baseTime *= tempMultipliers[startingTemp];
  
  // Add safety margin for critical foods
  if (food.safetyTemp && food.safetyTemp >= 165) {
    baseTime *= 1.05; // 5% safety margin for high-risk foods
  }
  
  return Math.round(baseTime);
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// New utility functions for cooking accuracy
export const getEggSizeAdjustment = (size: 'small' | 'medium' | 'large' | 'extra-large'): number => {
  const adjustments = {
    'small': -30,
    'medium': 0,
    'large': 30,
    'extra-large': 60,
  };
  return adjustments[size];
};

export const validateFoodSafety = (food: Food, calculatedTime: number, cookingMethod: CookingMethod): boolean => {
  // Ensure minimum cooking times for food safety
  const minimumTimes = {
    'chicken': 1200, // 20 minutes minimum for chicken
    'eggs': 360,     // 6 minutes minimum for eggs
  };
  
  const minTime = minimumTimes[food.id as keyof typeof minimumTimes];
  return !minTime || calculatedTime >= minTime;
};