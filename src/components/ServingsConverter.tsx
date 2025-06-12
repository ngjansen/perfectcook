import React, { useState } from 'react';
import { Users, Calculator, ArrowRight } from 'lucide-react';

interface ServingsConverterProps {
  baseServings: number;
  baseTime: number;
  onTimeAdjusted: (newTime: number, servings: number) => void;
  className?: string;
}

export const ServingsConverter: React.FC<ServingsConverterProps> = ({
  baseServings,
  baseTime,
  onTimeAdjusted,
  className = '',
}) => {
  const [targetServings, setTargetServings] = useState(baseServings);
  const [showCalculation, setShowCalculation] = useState(false);

  const calculateAdjustedTime = (servings: number) => {
    // Smart scaling algorithm
    const ratio = servings / baseServings;
    
    // For small increases (up to 2x), use square root scaling
    // For larger increases, use logarithmic scaling to prevent overcooking
    let timeMultiplier;
    if (ratio <= 2) {
      timeMultiplier = Math.sqrt(ratio);
    } else {
      timeMultiplier = 1.4 + (Math.log(ratio) * 0.3);
    }
    
    return Math.round(baseTime * timeMultiplier);
  };

  const adjustedTime = calculateAdjustedTime(targetServings);
  const timeIncrease = adjustedTime - baseTime;
  const percentIncrease = Math.round(((adjustedTime - baseTime) / baseTime) * 100);

  const handleApply = () => {
    onTimeAdjusted(adjustedTime, targetServings);
    setShowCalculation(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-blue-50 rounded-xl p-4 border border-blue-200 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-blue-800">Servings Converter</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Target Servings
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={targetServings}
              onChange={(e) => setTargetServings(Number(e.target.value))}
              className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
          </div>
          
          <div className="text-center">
            <div className="text-sm text-blue-600 mb-1">Base</div>
            <div className="font-semibold text-blue-800">{baseServings}</div>
          </div>
          
          <ArrowRight className="w-4 h-4 text-blue-600" />
          
          <div className="text-center">
            <div className="text-sm text-blue-600 mb-1">New</div>
            <div className="font-semibold text-blue-800">{targetServings}</div>
          </div>
        </div>

        {targetServings !== baseServings && (
          <div className="bg-white rounded-lg p-3 border border-blue-200 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-700">Adjusted Time:</span>
              <span className="font-semibold text-blue-800">
                {formatTime(adjustedTime)}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-blue-700">Time Change:</span>
              <span className={`font-medium ${timeIncrease > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                {timeIncrease > 0 ? '+' : ''}{formatTime(Math.abs(timeIncrease))} ({percentIncrease > 0 ? '+' : ''}{percentIncrease}%)
              </span>
            </div>
            
            <button
              onClick={() => setShowCalculation(!showCalculation)}
              className="text-xs text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-1"
            >
              <Calculator className="w-3 h-3" />
              {showCalculation ? 'Hide' : 'Show'} calculation
            </button>
            
            {showCalculation && (
              <div className="text-xs text-blue-600 bg-blue-50 rounded p-2 mb-3 animate-fade-in">
                <p className="mb-1">
                  <strong>Smart Scaling:</strong> {targetServings > baseServings ? 'Increased' : 'Decreased'} servings by {Math.round((targetServings / baseServings) * 100)}%
                </p>
                <p>
                  Time scaling uses {targetServings / baseServings <= 2 ? 'square root' : 'logarithmic'} algorithm 
                  to prevent overcooking with larger batches.
                </p>
              </div>
            )}
            
            <button
              onClick={handleApply}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Apply Adjustment
            </button>
          </div>
        )}
        
        <div className="text-xs text-blue-600">
          💡 Tip: Larger batches may need extra time for even cooking
        </div>
      </div>
    </div>
  );
};