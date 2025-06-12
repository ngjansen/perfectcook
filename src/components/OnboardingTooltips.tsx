import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Lightbulb } from 'lucide-react';

interface TooltipStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: string;
}

interface OnboardingTooltipsProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingTooltips: React.FC<OnboardingTooltipsProps> = ({
  isActive,
  onComplete,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipSteps: TooltipStep[] = [
    {
      id: 'welcome',
      target: '.welcome-start-button',
      title: 'Welcome to Smart Food Timer! 👋',
      content: 'Let\'s take a quick tour to help you get the most out of the app.',
      position: 'top',
      action: 'Start Tour'
    },
    {
      id: 'temperature-toggle',
      target: '.temperature-toggle',
      title: 'Temperature Units',
      content: 'Easily switch between Fahrenheit and Celsius with this toggle.',
      position: 'bottom'
    },
    {
      id: 'multi-timer',
      target: '.multi-timer-button',
      title: 'Multi-Timer',
      content: 'Run multiple timers simultaneously for complex meals (Premium feature).',
      position: 'bottom'
    },
    {
      id: 'favorites',
      target: '.favorites-button',
      title: 'Favorites',
      content: 'Save your perfect cooking combinations for quick access.',
      position: 'bottom'
    },
    {
      id: 'food-selection',
      target: '.food-grid',
      title: 'Choose Your Food',
      content: 'Select from our scientifically validated food database.',
      position: 'top'
    },
    {
      id: 'premium-foods',
      target: '.premium-food-card',
      title: 'Premium Foods',
      content: 'Premium foods are marked with a crown icon. Upgrade to access 100+ foods.',
      position: 'top'
    },
    {
      id: 'voice-control',
      target: '.voice-control',
      title: 'Voice Commands',
      content: 'Use voice commands for hands-free cooking. Say "Start timer" to begin.',
      position: 'top'
    },
    {
      id: 'safety-disclaimer',
      target: '.disclaimer-banner',
      title: 'Food Safety',
      content: 'Always check our safety disclaimer and use a thermometer for best results.',
      position: 'top'
    }
  ];

  useEffect(() => {
    if (isActive) {
      setShowTooltip(true);
    }
  }, [isActive]);

  const handleNext = () => {
    if (currentStep < tooltipSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setShowTooltip(false);
    onComplete();
  };

  const handleSkip = () => {
    setShowTooltip(false);
    onSkip();
  };

  if (!isActive || !showTooltip) {
    return null;
  }

  const currentTooltip = tooltipSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40 pointer-events-none" />
      
      {/* Tooltip */}
      <div className="fixed z-50 max-w-sm">
        <div className="bg-white rounded-2xl p-6 shadow-2xl border border-primary-200 animate-pop-in">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-primary-600">
                Tip {currentStep + 1} of {tooltipSteps.length}
              </span>
            </div>
            <button
              onClick={handleSkip}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          <h3 className="font-semibold text-warm-800 mb-2">
            {currentTooltip.title}
          </h3>
          
          <p className="text-warm-600 text-sm mb-4">
            {currentTooltip.content}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {tooltipSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Previous
                </button>
              )}
              
              <button
                onClick={handleNext}
                className="flex items-center gap-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {currentStep === tooltipSteps.length - 1 ? 'Finish' : currentTooltip.action || 'Next'}
                {currentStep < tooltipSteps.length - 1 && <ArrowRight className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Pointer */}
        <div className={`absolute w-3 h-3 bg-white border border-primary-200 transform rotate-45 ${
          currentTooltip.position === 'top' ? '-bottom-1.5 left-1/2 -translate-x-1/2' :
          currentTooltip.position === 'bottom' ? '-top-1.5 left-1/2 -translate-x-1/2' :
          currentTooltip.position === 'left' ? '-right-1.5 top-1/2 -translate-y-1/2' :
          '-left-1.5 top-1/2 -translate-y-1/2'
        }`} />
      </div>
    </>
  );
};