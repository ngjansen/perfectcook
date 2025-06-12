import React from 'react';
import { ArrowRight, Check, Crown, Star } from 'lucide-react';
import { Navigation } from './Navigation';
import { PremiumBadge } from './PremiumBadge';
import { premiumFeatures } from '../data/premiumFeatures';

interface PremiumBenefitsScreenProps {
  onBack: () => void;
  onUpgrade: () => void;
}

export const PremiumBenefitsScreen: React.FC<PremiumBenefitsScreenProps> = ({
  onBack,
  onUpgrade,
}) => {
  const featuresByCategory = premiumFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, typeof premiumFeatures>);

  const categoryTitles = {
    cooking: 'Advanced Cooking',
    timers: 'Timer Management',
    customization: 'Personalization',
    support: 'Premium Support',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-primary-50 animate-fade-in">
      <Navigation onBack={onBack} title="Premium Benefits" />
      
      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full flex items-center justify-center animate-gentle-bounce">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-warm-900 mb-3">
            Unlock Premium Features
          </h1>
          <p className="text-warm-600 max-w-md mx-auto">
            Take your cooking to the next level with advanced features designed for culinary excellence
          </p>
        </div>

        {/* Feature Categories */}
        {Object.entries(featuresByCategory).map(([category, features], categoryIndex) => (
          <div 
            key={category}
            className="animate-fade-in"
            style={{ animationDelay: `${categoryIndex * 0.1}s` }}
          >
            <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">
                {category === 'cooking' && '👨‍🍳'}
                {category === 'timers' && '⏰'}
                {category === 'customization' && '🎨'}
                {category === 'support' && '🎧'}
              </span>
              {categoryTitles[category as keyof typeof categoryTitles]}
            </h2>
            
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="bg-white rounded-2xl p-5 border border-primary-200 shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${(categoryIndex * 0.1) + (index * 0.05)}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-warm-800">{feature.name}</h3>
                        <PremiumBadge variant="crown" size="small" />
                      </div>
                      <p className="text-warm-600 text-sm">{feature.description}</p>
                    </div>
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Comparison Section */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold text-warm-800 mb-6 text-center">
            Free vs Premium
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-warm-700 mb-4 text-center">Free Version</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-warm-600">
                  <Check className="w-4 h-4 text-green-500" />
                  8 basic foods
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Standard textures
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Single timer
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-600">
                  <Check className="w-4 h-4 text-green-500" />
                  10 favorites max
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-4">
              <h3 className="font-medium text-warm-700 mb-4 text-center flex items-center justify-center gap-2">
                <Crown className="w-4 h-4 text-accent-600" />
                Premium Version
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-warm-600">
                  <Check className="w-4 h-4 text-green-500" />
                  100+ foods & growing
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-600">
                  <Check className="w-4 h-4 text-green-500" />
                  AI food recognition
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Unlimited multi-timers
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Unlimited favorites
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Equipment calibration
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Priority support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-6 px-8 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-xl flex items-center justify-center gap-3"
          >
            <Crown className="w-6 h-6" />
            Upgrade to Premium
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <p className="text-sm text-warm-500">
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>

        {/* Social Proof */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent-500 fill-current" />
              ))}
            </div>
            <h3 className="font-semibold text-blue-800 mb-2">
              Loved by 50,000+ Home Cooks
            </h3>
            <p className="text-sm text-blue-700">
              "Premium features transformed my cooking. The AI recognition and multi-timers are game-changers!"
            </p>
            <p className="text-xs text-blue-600 mt-2">- Sarah M., Premium User</p>
          </div>
        </div>
      </div>
    </div>
  );
};