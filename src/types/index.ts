export interface Food {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  safetyTemp?: number;
  baseTime: number; // base time in seconds
  image?: string; // High-quality food image URL
}

export interface Texture {
  id: string;
  name: string;
  description: string;
  multiplier: number; // multiplier for base time
  visual: string;
  tips: string[];
  beforeImage?: string; // Visual reference for texture
  afterImage?: string; // Expected result image
}

export interface CookingMethod {
  id: string;
  name: string;
  multiplier: number;
  description: string;
  icon?: string;
}

export interface CookingSession {
  foodId: string;
  textureId: string;
  cookingMethod: string;
  thickness: number;
  startingTemp: 'cold' | 'room' | 'warm';
  calculatedTime: number;
  timestamp: number;
  rating?: number;
  feedback?: string;
  wasAccurate?: boolean;
}

export interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  totalTime: number;
  isPaused: boolean;
}

export interface AppSettings {
  temperatureUnit: 'celsius' | 'fahrenheit';
  darkMode: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  voiceEnabled: boolean;
  hasSeenOnboarding: boolean;
  favoriteSettings: FavoriteSetting[];
}

export interface FavoriteSetting {
  id: string;
  name: string;
  foodId: string;
  textureId: string;
  cookingMethod: string;
  thickness: number;
  startingTemp: 'cold' | 'room' | 'warm';
  createdAt: number;
}

export interface MultiTimer {
  id: string;
  foodName: string;
  timeRemaining: number;
  totalTime: number;
  isRunning: boolean;
  isPaused: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export type Screen = 'welcome' | 'onboarding' | 'food-selection' | 'texture-selection' | 'cooking-details' | 'timer' | 'multi-timer' | 'success' | 'favorites' | 'settings';