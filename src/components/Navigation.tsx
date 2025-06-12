import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { TemperatureToggle } from './TemperatureToggle';

interface NavigationProps {
  onBack?: () => void;
  title?: string;
  showBack?: boolean;
  showTempToggle?: boolean;
  temperatureUnit?: 'celsius' | 'fahrenheit';
  onTemperatureToggle?: (unit: 'celsius' | 'fahrenheit') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  onBack, 
  title, 
  showBack = true,
  showTempToggle = false,
  temperatureUnit = 'fahrenheit',
  onTemperatureToggle
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-primary-100 dark:border-gray-700">
      {showBack && onBack ? (
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </button>
      ) : (
        <div className="w-10 h-10" />
      )}
      
      {title && (
        <h1 className="text-lg font-semibold text-warm-800 dark:text-white text-center flex-1">
          {title}
        </h1>
      )}
      
      {showTempToggle && onTemperatureToggle ? (
        <div className="bg-primary-50 dark:bg-gray-700 rounded-xl p-2">
          <TemperatureToggle
            unit={temperatureUnit}
            onToggle={onTemperatureToggle}
            size="small"
            showIcon={false}
          />
        </div>
      ) : (
        <div className="w-10 h-10" />
      )}
    </div>
  );
};