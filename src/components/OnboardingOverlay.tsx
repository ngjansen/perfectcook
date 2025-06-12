import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X, Play, Clock, Thermometer, Star, Shield } from 'lucide-react';
import { OnboardingStep } from '../types';
import { DisclaimerModal } from './DisclaimerModal';

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
  {
    id: 'disclaimer',
    title: 'Important Safety Information ⚠️',
    description: 'Before we begin, please review our food safety disclaimer to ensure safe cooking practices.',
  },
];

export const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
  const step = onboardingSteps[currentStep];

  const handleNext = () => {
    if (step.id === 'disclaimer') {
      setShowDisclaimer(true);
      return;
    }
    
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (hasAcceptedDisclaimer) {
        onComplete();
      } else {
        setShowDisclaimer(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDisclaimerAccept = () => {
    setHasAcceptedDisclaimer(true);
    setShowDisclaimer(false);
    onComplete();
  };

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'welcome': return <Star className="w-8 h-8" />;
      case 'food-selection': return <Play className="w-8 h-8" />;
      case 'texture-perfect': return <Clock className="w-8 h-8" />;
      case 'smart-timing': return <Clock className="w-8 h-8" />;
      case 'safety-first': return <Thermometer className="w-8 h-8" />;
      case 'features': return <Star className="w-8 h-8" />;
      case 'disclaimer': return <Shield className="w-8 h-8" />;
      default: return <Clock className="w-8 h-8" />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in fade-in duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className={`${step.id === 'disclaimer' ? 'text-red-500' : 'text-primary-500'}`}>
              {getStepIcon(step.id)}
            </div>
            <button
              onClick={onSkip}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Skip onboarding"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${
              step.id === 'disclaimer' ? 'text-red-800 dark:text-red-400' : 'text-gray-900 dark:text-white'
            }`}>
              {step.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {step.description}
            </p>
            
            {step.id === 'disclaimer' && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-300">
                  You'll need to review and accept our food safety disclaimer before using the app.
                </p>
              </div>
            )}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? step.id === 'disclaimer' ? 'bg-red-500' : 'bg-primary-500'
                    : index < currentStep
                    ? 'bg-primary-300'
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}
            
            <button
              onClick={handleNext}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                step.id === 'disclaimer'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
              }`}
            >
              {step.id === 'disclaimer' ? 'Review Disclaimer' : 
               currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < onboardingSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep + 1} of {onboardingSteps.length}
            </span>
          </div>
        </div>
      </div>

      <DisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
        onAccept={handleDisclaimerAccept}
        showAcceptButton={true}
        title="Food Safety Disclaimer"
      />
    </>
  );
};