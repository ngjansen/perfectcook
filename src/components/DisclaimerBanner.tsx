import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

interface DisclaimerBannerProps {
  onViewDisclaimer: () => void;
  variant?: 'compact' | 'full';
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  onViewDisclaimer,
  variant = 'compact',
  className = ''
}) => {
  if (variant === 'compact') {
    return (
      <div className={`bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 ${className}`}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-300 flex-1">
            Always check food safety guidelines.
          </p>
          <button
            onClick={onViewDisclaimer}
            className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            Disclaimer
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-red-800 dark:text-red-400 mb-1">
            Important Food Safety Notice
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
            Cooking times are estimates. Always verify food safety with proper temperature checks 
            and follow local guidelines.
          </p>
          <button
            onClick={onViewDisclaimer}
            className="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            Read Full Disclaimer
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};