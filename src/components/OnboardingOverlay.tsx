import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X, Play, Clock, Thermometer, Star } from 'lucide-react';
import { OnboardingStep } from '../types';

interface OnboardingOverlayProps {
  onComplete: () => void;
  onSkip: () => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Smart Food Timer! 👋',
    description: 'Get perfect cooking results every time with scientifically validated timing and food safety guidance.',
  },
  {
    id: 'food-selection',
    title: 'Choose Your Food 🍳',
    description: 'Select from our curated database of foods, each with precise timing calculations based on culinary science.',
  },
  {
    id: 'texture-perfect',
    title: 'Perfect Your Texture 🎯',
    description: 'From soft-boiled eggs to al dente pasta - choose exactly how you like your food cooked.',
  },
  {
    id: 'smart-timing',
    title: 'Smart Timing Calculations ⏱️',
    description: 'Our algorithm considers cooking method, thickness, starting temperature, and food safety requirements.',
  },
  {
    id: 'safety-first',
    title: 'Food Safety Built-In 🛡️',
    description: 'Never worry about undercooked food. We include USDA safety guidelines and temperature requirements.',
  },
  {
    id: 'features',
    title: 'Powerful Features 🚀',
    description: 'Voice commands, multi-timers, favorites, and personalized recommendations based on your feedback.',
  },
];

export const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = onboardingSteps[currentStep];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'welcome': return <Star className="w-8 h-8" />;
      case 'food-selection': return <Play className="w-8 h-8" />;
      case 'texture-perfect': return <Clock className="w-8 h-8" />;
      case 'smart-timing': return <Clock className="w-8 h-8" />;
      case 'safety-first': return <Thermometer className="w-8 h-8" />;
      case 'features': return <Star className="w-8 h-8" />;
      default: return <Clock className="w-8 h-8" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in fade-in duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="text-primary-500">
            {getStepIcon(step.id)}
          </div>
          <button
            onClick={onSkip}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Skip onboarding"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {step.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep
                  ? 'bg-primary-500'
                  : index < currentStep
                  ? 'bg-primary-300'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            {currentStep < onboardingSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {onboardingSteps.length}
          </span>
        </div>
      </div>
    </div>
  );
};