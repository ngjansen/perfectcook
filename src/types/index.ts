export interface Food {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  safetyTemp?: number;
  baseTime: number; // base time in seconds
  image?: string; // High-quality food image URL
  isPremium?: boolean; // Premium food items
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
  isPremium?: boolean; // Premium texture options
}

export interface CookingMethod {
  id: string;
  name: string;
  multiplier: number;
  description: string;
  icon?: string;
  isPremium?: boolean; // Premium cooking methods
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
  isPremium?: boolean;
  premiumExpiryDate?: number;
  theme?: 'default' | 'chef' | 'modern' | 'minimal';
  // New accessibility settings
  highContrast?: boolean;
  largeText?: boolean;
  reducedMotion?: boolean;
  // New feature settings
  showTooltips?: boolean;
  autoSaveFavorites?: boolean;
  smartNotifications?: boolean;
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
  usageCount?: number;
  lastUsed?: number;
}

export interface MultiTimer {
  id: string;
  name: string;
  timeRemaining: number;
  totalTime: number;
  isRunning: boolean;
  isPaused: boolean;
  priority: 'high' | 'medium' | 'low';
  color?: string;
  foodId?: string;
  textureId?: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'cooking' | 'timers' | 'customization' | 'support';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'annual';
  features: string[];
  popular?: boolean;
  savings?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  subscriptionStatus: 'free' | 'premium';
  subscriptionPlan?: string;
  subscriptionExpiry?: number;
  joinDate: number;
}

export interface CookingStep {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  type: 'prep' | 'cook' | 'rest';
  priority: 'high' | 'medium' | 'low';
  instructions: string;
  isCompleted: boolean;
}

export interface FeedbackData {
  rating: number;
  accuracy: 'perfect' | 'close' | 'off';
  comments: string;
  wouldRecommend: boolean;
  timestamp: number;
  foodId: string;
  textureId: string;
}

export type Screen = 'welcome' | 'onboarding' | 'food-selection' | 'texture-selection' | 'cooking-details' | 'timer' | 'multi-timer' | 'success' | 'favorites' | 'settings' | 'premium-benefits' | 'upgrade-flow' | 'account' | 'billing' | 'support';