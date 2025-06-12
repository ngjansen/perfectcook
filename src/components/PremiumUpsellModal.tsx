import React from 'react';
import { X, Crown, ArrowRight, Star } from 'lucide-react';

interface PremiumUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  featureName: string;
  featureDescription: string;
}

export const PremiumUpsellModal: React.FC<PremiumUpsellModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  featureName,
  featureDescription,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-pop-in">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Unlock {featureName}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {featureDescription}
          </p>
        </div>

        {/* Premium Benefits Preview */}
        <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-4 mb-6">
          <h3 className="font-semibold text-warm-800 mb-3 flex items-center gap-2">
            <Crown className="w-4 h-4 text-accent-600" />
            Premium Benefits
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-warm-600">
              <Star className="w-3 h-3 text-accent-500 fill-current" />
              100+ foods with precise timing
            </div>
            <div className="flex items-center gap-2 text-sm text-warm-600">
              <Star className="w-3 h-3 text-accent-500 fill-current" />
              AI food recognition
            </div>
            <div className="flex items-center gap-2 text-sm text-warm-600">
              <Star className="w-3 h-3 text-accent-500 fill-current" />
              Unlimited multi-timers
            </div>
            <div className="flex items-center gap-2 text-sm text-warm-600">
              <Star className="w-3 h-3 text-accent-500 fill-current" />
              Priority support
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <Crown className="w-5 h-5" />
            Upgrade to Premium
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Maybe Later
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          30-day money-back guarantee • Cancel anytime
        </p>
      </div>
    </div>
  );
};