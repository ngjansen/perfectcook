import React from 'react';
import { ChefHat, Clock, Thermometer, CheckCircle, Star, Settings, Timer, Zap } from 'lucide-react';
import { TemperatureToggle } from './TemperatureToggle';

interface WelcomeScreenProps {
  onStart: () => void;
  onFavorites: () => void;
  onSettings: () => void;
  onMultiTimer: () => void;
  favoriteCount: number;
  temperatureUnit?: 'celsius' | 'fahrenheit';
  onTemperatureToggle?: (unit: 'celsius' | 'fahrenheit') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onStart, 
  onFavorites, 
  onSettings, 
  onMultiTimer,
  favoriteCount,
  temperatureUnit = 'fahrenheit',
  onTemperatureToggle
}) => {
  const features = [
    {
      icon: <ChefHat className="w-6 h-6" />,
      title: 'Perfect Textures',
      description: 'From soft-boiled to al dente',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Smart Timing',
      description: 'AI-powered calculations',
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: 'Food Safety',
      description: 'USDA guidelines built-in',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Voice Control',
      description: 'Hands-free operation',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header with quick actions and temperature toggle */}
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-2">
          <button
            onClick={onFavorites}
            className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm border border-primary-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <Star className="w-4 h-4 text-accent-500" />
            <span className="text-sm font-medium text-warm-700 dark:text-gray-300">
              {favoriteCount > 0 ? `${favoriteCount}` : 'Favorites'}
            </span>
          </button>
          
          <button
            onClick={onMultiTimer}
            className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm border border-primary-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <Timer className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-warm-700 dark:text-gray-300">Multi</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Prominent Temperature Toggle */}
          {onTemperatureToggle && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm border border-primary-100 dark:border-gray-700">
              <TemperatureToggle
                unit={temperatureUnit}
                onToggle={onTemperatureToggle}
                size="medium"
                showIcon={true}
              />
            </div>
          )}
          
          <button
            onClick={onSettings}
            className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-primary-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <Settings className="w-5 h-5 text-warm-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-primary-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Clock className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-warm-900 dark:text-white mb-3">
            Smart Food Timer
          </h1>
          <p className="text-xl text-warm-600 dark:text-gray-300 max-w-md">
            Perfect cooking results with AI-powered timing and food safety
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-primary-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="text-primary-500 mb-2 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-warm-800 dark:text-white text-sm mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-warm-600 dark:text-gray-400 leading-tight">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full max-w-md bg-primary-500 hover:bg-primary-600 text-white font-semibold py-6 px-8 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-xl"
        >
          Start Cooking
        </button>

        <p className="text-sm text-warm-500 dark:text-gray-500 mt-6 max-w-sm">
          Choose your food, select texture, and let AI handle perfect timing with food safety built-in
        </p>
      </div>

      {/* Bottom feature highlight */}
      <div className="p-4">
        <div className="bg-accent-100 dark:bg-gray-800 rounded-2xl p-4 border border-accent-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-warm-800 dark:text-white text-sm">
                Scientifically Validated
              </h3>
              <p className="text-xs text-warm-600 dark:text-gray-400">
                Based on USDA guidelines and culinary science research
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};