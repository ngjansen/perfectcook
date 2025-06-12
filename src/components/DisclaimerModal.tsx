import React from 'react';
import { X, AlertTriangle, Shield, CheckCircle } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  showAcceptButton?: boolean;
  title?: string;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  showAcceptButton = false,
  title = "Important Disclaimer"
}) => {
  if (!isOpen) return null;

  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-pop-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-warm-900 dark:text-white">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close disclaimer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4 text-warm-700 dark:text-gray-300">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
            <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Food Safety Disclaimer
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
              The cooking times, temperatures, and recommendations provided by Smart Food Timer are for 
              <strong> general informational purposes only</strong>. Actual results may vary based on your 
              equipment, food type, and other factors.
            </p>
          </div>

          <div className="space-y-3">
            <p className="leading-relaxed">
              This app <strong>does not replace professional culinary, nutritional, or food safety advice</strong>. 
              Users must exercise their own judgment and follow all local food safety regulations and guidelines.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
              <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">
                ⚠️ Always check that food is cooked to a safe internal temperature before consumption, 
                especially for meats, poultry, and eggs. Use a food thermometer when in doubt.
              </p>
            </div>

            <p className="leading-relaxed">
              <strong>Use this app at your own risk.</strong> The developers are not responsible for any 
              illness, injury, or damages resulting from the use of this app or reliance on its information.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
              For Your Safety:
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Always use a meat thermometer for accurate temperature readings</li>
              <li>• Follow USDA food safety guidelines for minimum cooking temperatures</li>
              <li>• When in doubt, cook longer rather than shorter</li>
              <li>• Trust your senses - if food looks, smells, or tastes off, don't eat it</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {!showAcceptButton ? (
            <button
              onClick={onClose}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-xl font-medium transition-colors"
            >
              I Understand
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                I Agree & Continue
              </button>
            </>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          Last updated: January 2024
        </p>
      </div>
    </div>
  );
};