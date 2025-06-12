import React, { useState } from 'react';
import { CheckCircle, Star, RotateCcw, Home, Heart, Share2 } from 'lucide-react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { DisclaimerModal } from './DisclaimerModal';
import { Food, Texture } from '../types';

interface SuccessScreenProps {
  food: Food;
  texture: Texture;
  onRestart: () => void;
  onHome: () => void;
  onSaveFavorite: (rating: number, feedback: string) => void;
  isPremium: boolean;
  onPremiumFeatureClick: (name: string, description: string) => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ 
  food, 
  texture, 
  onRestart, 
  onHome,
  onSaveFavorite,
  isPremium,
  onPremiumFeatureClick
}) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleRatingSubmit = () => {
    onSaveFavorite(rating, feedback);
    setHasSubmitted(true);
    
    if (rating >= 4) {
      // Show success message for high ratings
      setTimeout(() => {
        alert('Added to favorites! 🌟');
      }, 500);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Perfect Cooking Result!',
      text: `Just cooked perfect ${texture.name.toLowerCase()} ${food.name.toLowerCase()} with Smart Food Timer! 🍳✨`,
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-primary-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-warm-900 dark:text-white mb-3">
          Cooking Complete! 🎉
        </h1>
        
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-3xl">{food.icon}</span>
          <span className="text-xl font-semibold text-primary-600 dark:text-primary-400">
            {texture.name} {food.name}
          </span>
        </div>
        
        <p className="text-warm-600 dark:text-gray-400 max-w-md">
          Your {texture.name.toLowerCase()} {food.name.toLowerCase()} should be perfect! 
          Let us know how it turned out.
        </p>
      </div>

      {/* Rating Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-lg border border-primary-100 dark:border-gray-700 mb-6">
        <h3 className="font-semibold text-warm-800 dark:text-white mb-4 text-center">
          How did it turn out?
        </h3>
        
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`p-2 transition-colors ${
                star <= rating ? 'text-accent-500' : 'text-warm-300 hover:text-accent-400'
              }`}
              disabled={hasSubmitted}
            >
              <Star className="w-8 h-8 fill-current" />
            </button>
          ))}
        </div>
        
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Optional: Tell us about the texture, timing, or any adjustments needed..."
          className="w-full p-3 border border-primary-200 dark:border-gray-600 rounded-xl text-sm resize-none focus:ring-2 focus:ring-primary-300 focus:border-transparent dark:bg-gray-700 dark:text-white"
          rows={3}
          disabled={hasSubmitted}
        />
        
        {rating > 0 && !hasSubmitted && (
          <button
            onClick={handleRatingSubmit}
            className="w-full mt-4 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            {rating >= 4 ? (
              <span className="flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                Save as Favorite
              </span>
            ) : (
              'Submit Feedback'
            )}
          </button>
        )}

        {hasSubmitted && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-800 dark:text-green-400 text-center">
              Thank you for your feedback! This helps improve our timing algorithms.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-3 w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <RotateCcw className="w-5 h-5" />
          Cook Again
        </button>
        
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 flex-1 bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          
          <button
            onClick={onHome}
            className="flex items-center justify-center gap-2 flex-1 bg-white hover:bg-primary-50 text-warm-700 font-semibold py-4 px-6 rounded-2xl shadow-md border border-primary-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>
      </div>

      {/* Achievement Badge for High Ratings */}
      {hasSubmitted && rating >= 4 && (
        <div className="mt-6 p-4 bg-accent-100 dark:bg-accent-900/20 rounded-xl border border-accent-200 dark:border-accent-700 max-w-md w-full">
          <div className="text-center">
            <div className="text-2xl mb-2">🏆</div>
            <h3 className="font-semibold text-accent-800 dark:text-accent-400 mb-1">
              Perfect Cook Achievement!
            </h3>
            <p className="text-sm text-accent-700 dark:text-accent-500">
              You've mastered {texture.name.toLowerCase()} {food.name.toLowerCase()}!
            </p>
          </div>
        </div>
      )}

      {/* Premium Upsell */}
      {!isPremium && (
        <div className="mt-8 p-4 bg-accent-50 dark:bg-gray-800 rounded-xl border border-accent-200 dark:border-gray-700 max-w-md w-full">
          <h3 className="font-semibold text-warm-800 dark:text-white mb-2">🚀 Upgrade to Premium</h3>
          <p className="text-sm text-warm-600 dark:text-gray-400 mb-3">
            Get access to 100+ foods, AI photo recognition, batch cooking coordination, and advanced customization!
          </p>
          <button 
            onClick={() => onPremiumFeatureClick('Premium Features', 'Unlock the full potential of Smart Food Timer with premium features.')}
            className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Learn More
          </button>
        </div>
      )}

      {/* Disclaimer Banner */}
      <DisclaimerBanner
        onViewDisclaimer={() => setShowDisclaimer(true)}
        variant="compact"
        className="mt-6 max-w-md w-full"
      />

      <DisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </div>
  );
};