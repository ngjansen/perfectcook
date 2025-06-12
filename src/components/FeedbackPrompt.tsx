import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Send } from 'lucide-react';

interface FeedbackPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: {
    rating: number;
    accuracy: 'perfect' | 'close' | 'off';
    comments: string;
    wouldRecommend: boolean;
  }) => void;
  foodName: string;
  textureName: string;
}

export const FeedbackPrompt: React.FC<FeedbackPromptProps> = ({
  isOpen,
  onClose,
  onSubmit,
  foodName,
  textureName,
}) => {
  const [rating, setRating] = useState(0);
  const [accuracy, setAccuracy] = useState<'perfect' | 'close' | 'off' | null>(null);
  const [comments, setComments] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating > 0 && accuracy && wouldRecommend !== null) {
      onSubmit({
        rating,
        accuracy,
        comments,
        wouldRecommend,
      });
      
      // Reset form
      setRating(0);
      setAccuracy(null);
      setComments('');
      setWouldRecommend(null);
      setCurrentStep(1);
      onClose();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return rating > 0;
      case 2: return accuracy !== null;
      case 3: return wouldRecommend !== null;
      default: return true;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'How was your cooking result?';
      case 2: return 'How accurate was the timing?';
      case 3: return 'Would you recommend this app?';
      case 4: return 'Any additional feedback?';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-pop-in">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-warm-900 mb-2">
            Quick Feedback
          </h2>
          <p className="text-warm-600 text-sm">
            {textureName} {foodName}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === currentStep ? 'bg-primary-500' :
                step < currentStep ? 'bg-primary-300' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-warm-800 mb-4 text-center">
            {getStepTitle()}
          </h3>

          {/* Step 1: Overall Rating */}
          {currentStep === 1 && (
            <div className="text-center">
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-2 transition-colors ${
                      star <= rating ? 'text-accent-500' : 'text-gray-300 hover:text-accent-400'
                    }`}
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </button>
                ))}
              </div>
              <p className="text-sm text-warm-600">
                {rating === 0 ? 'Tap to rate your experience' :
                 rating <= 2 ? 'We\'ll work to improve!' :
                 rating === 3 ? 'Good, but room for improvement' :
                 rating === 4 ? 'Great result!' :
                 'Perfect! Exactly what you wanted'}
              </p>
            </div>
          )}

          {/* Step 2: Timing Accuracy */}
          {currentStep === 2 && (
            <div className="space-y-3">
              {[
                { value: 'perfect', label: 'Perfect timing', desc: 'Exactly as expected' },
                { value: 'close', label: 'Close enough', desc: 'Within 1-2 minutes' },
                { value: 'off', label: 'Way off', desc: 'Significantly different' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setAccuracy(option.value as any)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    accuracy === option.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-warm-700'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className={`text-sm ${
                    accuracy === option.value ? 'text-primary-100' : 'text-warm-500'
                  }`}>
                    {option.desc}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Recommendation */}
          {currentStep === 3 && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setWouldRecommend(true)}
                className={`flex items-center gap-2 px-6 py-4 rounded-xl transition-all ${
                  wouldRecommend === true
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-warm-700'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                Yes
              </button>
              
              <button
                onClick={() => setWouldRecommend(false)}
                className={`flex items-center gap-2 px-6 py-4 rounded-xl transition-all ${
                  wouldRecommend === false
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-warm-700'
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
                No
              </button>
            </div>
          )}

          {/* Step 4: Additional Comments */}
          {currentStep === 4 && (
            <div>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Any specific feedback about timing, texture, or the app experience? (Optional)"
                className="w-full p-4 border border-primary-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                rows={4}
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
            >
              Previous
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Feedback
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm transition-colors"
        >
          Skip feedback
        </button>
      </div>
    </div>
  );
};