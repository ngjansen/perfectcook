import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { cookingMethods } from '../data/cookingMethods';
import { calculateCookingTime, formatTime, validateFoodSafety } from '../utils/calculations';
import { Food, Texture, CookingMethod } from '../types';

interface CookingDetailsProps {
  food: Food;
  texture: Texture;
  onBack: () => void;
  onNext: (calculatedTime: number, details: any) => void;
}

export const CookingDetails: React.FC<CookingDetailsProps> = ({ 
  food, 
  texture, 
  onBack, 
  onNext 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<CookingMethod>(cookingMethods[0]);
  const [thickness, setThickness] = useState<number>(3);
  const [startingTemp, setStartingTemp] = useState<'cold' | 'room' | 'warm'>('room');

  const calculatedTime = calculateCookingTime(food, texture, selectedMethod, thickness, startingTemp);
  const isFoodSafe = validateFoodSafety(food, calculatedTime, selectedMethod);

  const handleStart = () => {
    if (!isFoodSafe) {
      alert('Warning: This cooking time may not be sufficient for food safety. Please increase cooking time or temperature.');
      return;
    }
    onNext(calculatedTime, {
      method: selectedMethod,
      thickness,
      startingTemp,
    });
  };

  const thicknessLabels = {
    1: 'Very Thin (< 0.5")',
    2: 'Thin (0.5-1")',
    3: 'Medium (1-1.5")',
    4: 'Thick (1.5-2")',
    5: 'Very Thick (> 2")',
  };

  const tempLabels = {
    cold: 'Cold (Refrigerator 35-40°F)',
    room: 'Room Temperature (65-70°F)',
    warm: 'Warm/Pre-heated',
  };

  return (
    <div className="min-h-screen bg-primary-50 animate-fade-in">
      <Navigation onBack={onBack} title="Cooking Details" />
      
      <div className="p-6 space-y-8">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-3xl animate-gentle-bounce">{food.icon}</span>
            <span className="text-2xl">→</span>
            <span className="text-lg font-semibold text-primary-600">
              {texture.name}
            </span>
          </div>
          <p className="text-warm-600">
            Help us calculate the perfect timing
          </p>
        </div>

        {/* Enhanced Food Safety Warning for High-Risk Foods */}
        {food.safetyTemp && (
          <div className={`rounded-xl p-4 border-2 animate-fade-in ${
            !isFoodSafe 
              ? 'bg-red-50 border-red-300 animate-safety-warning' 
              : 'bg-red-50 border-red-200'
          }`}>
            <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              🌡️ Food Safety Critical
              {!isFoodSafe && <span className="animate-bounce">⚠️</span>}
            </h3>
            <p className="text-sm text-red-700">
              {food.name} must reach an internal temperature of {food.safetyTemp}°F (71°C) to be safe. 
              Use a meat thermometer to verify doneness.
            </p>
          </div>
        )}

        {/* Enhanced Cooking Method Selection */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-semibold text-warm-800 mb-3">Cooking Method</h3>
          <div className="grid grid-cols-1 gap-3">
            {cookingMethods.map((method, index) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method)}
                className={`p-4 rounded-xl text-left transition-all duration-200 transform hover:scale-[1.01] ${
                  selectedMethod.id === method.id
                    ? 'bg-primary-500 text-white shadow-md animate-pop-in'
                    : 'bg-white text-warm-700 border border-primary-200 hover:bg-primary-50'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="font-medium mb-1">{method.name}</div>
                <div className={`text-sm ${
                  selectedMethod.id === method.id ? 'text-primary-100' : 'text-warm-500'
                }`}>
                  {method.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Thickness Slider */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-semibold text-warm-800 mb-3">
            Thickness: {thicknessLabels[thickness as keyof typeof thicknessLabels]}
          </h3>
          <div className="bg-white rounded-xl p-4 border border-primary-200">
            <input
              type="range"
              min="1"
              max="5"
              value={thickness}
              onChange={(e) => setThickness(Number(e.target.value))}
              className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-warm-500 mt-2">
              <span>Very Thin</span>
              <span>Very Thick</span>
            </div>
          </div>
        </div>

        {/* Enhanced Starting Temperature */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-semibold text-warm-800 mb-3">Starting Temperature</h3>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(tempLabels).map(([key, label], index) => (
              <button
                key={key}
                onClick={() => setStartingTemp(key as any)}
                className={`p-4 rounded-xl text-left transition-all duration-200 transform hover:scale-[1.01] ${
                  startingTemp === key
                    ? 'bg-primary-500 text-white shadow-md animate-pop-in'
                    : 'bg-white text-warm-700 border border-primary-200 hover:bg-primary-50'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="font-medium">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Calculated Time Display */}
        <div className={`rounded-2xl p-6 text-center border-2 transition-all duration-300 animate-fade-in ${
          isFoodSafe 
            ? 'bg-accent-100 border-accent-200' 
            : 'bg-red-100 border-red-300 animate-safety-warning'
        }`} style={{ animationDelay: '0.4s' }}>
          <h3 className="font-semibold text-warm-800 mb-2">
            {isFoodSafe ? 'Estimated Cooking Time' : '⚠️ Safety Warning'}
          </h3>
          <div className={`text-4xl font-bold mb-2 transition-all duration-300 ${
            isFoodSafe ? 'text-primary-600' : 'text-red-600 animate-pulse'
          }`}>
            {formatTime(calculatedTime)}
          </div>
          <p className="text-sm text-warm-600">
            {isFoodSafe 
              ? 'Scientifically validated timing with safety margin'
              : 'This time may be insufficient for food safety'
            }
          </p>
        </div>

        {/* Enhanced Start Button */}
        <button
          onClick={handleStart}
          className={`w-full font-semibold py-6 px-8 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-xl animate-fade-in ${
            isFoodSafe
              ? 'bg-primary-500 hover:bg-primary-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
          }`}
          style={{ animationDelay: '0.5s' }}
        >
          {isFoodSafe ? 'Start Timer' : 'Start Timer (Use Caution)'}
        </button>

        {/* Scientific Accuracy Note */}
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h3 className="font-semibold text-blue-800 mb-2">📚 Scientifically Validated</h3>
          <p className="text-sm text-blue-700">
            Our cooking times are based on USDA food safety guidelines and culinary science research. 
            Always verify doneness with appropriate tools (thermometer, visual cues, texture tests).
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #FF6B35;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #FF6B35;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};