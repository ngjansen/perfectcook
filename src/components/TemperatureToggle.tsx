import React from 'react';
import { Thermometer } from 'lucide-react';

interface TemperatureToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: (unit: 'celsius' | 'fahrenheit') => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
}

export const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ 
  unit, 
  onToggle, 
  className = '',
  size = 'medium',
  showIcon = true
}) => {
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2'
  };

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <Thermometer className={`text-primary-600 ${iconSizes[size]}`} />
      )}
      <div className="relative bg-primary-100 rounded-xl p-1 shadow-inner">
        <div className="flex relative">
          {/* Background slider */}
          <div 
            className={`absolute top-1 bottom-1 bg-primary-500 rounded-lg shadow-sm transition-all duration-300 ease-out ${
              unit === 'fahrenheit' ? 'left-1' : 'translate-x-full left-1'
            }`}
            style={{ 
              width: 'calc(50% - 4px)',
            }}
          />
          
          {/* Fahrenheit button */}
          <button
            onClick={() => onToggle('fahrenheit')}
            className={`relative z-10 font-medium rounded-lg transition-all duration-200 ${sizeClasses[size]} ${
              unit === 'fahrenheit'
                ? 'text-white'
                : 'text-primary-700 hover:text-primary-800'
            }`}
            style={{ minWidth: '40px' }}
          >
            °F
          </button>
          
          {/* Celsius button */}
          <button
            onClick={() => onToggle('celsius')}
            className={`relative z-10 font-medium rounded-lg transition-all duration-200 ${sizeClasses[size]} ${
              unit === 'celsius'
                ? 'text-white'
                : 'text-primary-700 hover:text-primary-800'
            }`}
            style={{ minWidth: '40px' }}
          >
            °C
          </button>
        </div>
      </div>
    </div>
  );
};