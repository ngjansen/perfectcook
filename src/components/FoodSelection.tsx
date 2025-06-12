import React, { useState } from 'react';
import { Camera, Grid3X3 } from 'lucide-react';
import { Navigation } from './Navigation';
import { FoodCard } from './FoodCard';
import { DisclaimerBanner } from './DisclaimerBanner';
import { DisclaimerModal } from './DisclaimerModal';
import { foods } from '../data/foods';
import { Food } from '../types';

interface FoodSelectionProps {
  onBack: () => void;
  onNext: (food: Food) => void;
  temperatureUnit: 'celsius' | 'fahrenheit';
  onTemperatureToggle: (unit: 'celsius' | 'fahrenheit') => void;
  isPremium: boolean;
  onPremiumFeatureClick: (name: string, description: string) => void;
}

export const FoodSelection: React.FC<FoodSelectionProps> = ({ 
  onBack, 
  onNext,
  temperatureUnit,
  onTemperatureToggle,
  isPremium,
  onPremiumFeatureClick
}) => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [mode, setMode] = useState<'grid' | 'camera'>('grid');
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleFoodSelect = (food: Food) => {
    // Check if food is premium
    if (food.isPremium && !isPremium) {
      onPremiumFeatureClick('Premium Foods', 'Access our complete database of 100+ foods with precise timing calculations.');
      return;
    }
    
    setSelectedFood(food);
    // Auto-advance after selection
    setTimeout(() => onNext(food), 300);
  };

  const handleCameraUpload = () => {
    if (!isPremium) {
      onPremiumFeatureClick('AI Food Recognition', 'Take a photo and let AI identify your food automatically with premium features.');
      return;
    }
    // Simulate camera functionality for MVP
    alert('Camera feature coming soon! Please select from the grid below.');
    setMode('grid');
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <Navigation 
        onBack={onBack} 
        title="Choose Your Food"
        showTempToggle={true}
        temperatureUnit={temperatureUnit}
        onTemperatureToggle={onTemperatureToggle}
      />
      
      <div className="p-6">
        <div className="mb-6">
          <p className="text-warm-600 text-center mb-6">
            Select your food to get started with perfect timing
          </p>
          
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleCameraUpload}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl transition-all relative ${
                mode === 'camera'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-warm-700 border border-primary-200 hover:bg-primary-50'
              }`}
            >
              <Camera className="w-5 h-5" />
              <span className="font-medium">Take Photo</span>
              {!isPremium && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✨</span>
                </div>
              )}
            </button>
            
            <button
              onClick={() => setMode('grid')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl transition-all ${
                mode === 'grid'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-warm-700 border border-primary-200 hover:bg-primary-50'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
              <span className="font-medium">Browse Grid</span>
            </button>
          </div>
        </div>

        {mode === 'grid' && (
          <div className="grid grid-cols-2 gap-4">
            {foods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onClick={() => handleFoodSelect(food)}
                isSelected={selectedFood?.id === food.id}
                temperatureUnit={temperatureUnit}
                isPremium={isPremium}
                onPremiumFeatureClick={onPremiumFeatureClick}
              />
            ))}
          </div>
        )}

        {!isPremium && (
          <div className="mt-8 p-4 bg-accent-50 rounded-xl border border-accent-200">
            <h3 className="font-semibold text-warm-800 mb-2">💡 Premium Features</h3>
            <p className="text-sm text-warm-600 mb-3">
              Advanced AI food recognition, extended food database (100+ items), and equipment calibration settings available with premium.
            </p>
            <button
              onClick={() => onPremiumFeatureClick('Premium Features', 'Unlock the complete Smart Food Timer experience.')}
              className="text-accent-600 hover:text-accent-700 font-medium text-sm"
            >
              Learn More →
            </button>
          </div>
        )}

        {/* Disclaimer Banner */}
        <DisclaimerBanner
          onViewDisclaimer={() => setShowDisclaimer(true)}
          variant="compact"
          className="mt-6"
        />
      </div>

      <DisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </div>
  );
};