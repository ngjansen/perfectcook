import React, { useState } from 'react';
import { Texture } from '../types';
import { CheckCircle } from 'lucide-react';

interface TextureCardProps {
  texture: Texture;
  onClick: () => void;
  isSelected?: boolean;
}

export const TextureCard: React.FC<TextureCardProps> = ({ texture, onClick, isSelected = false }) => {
  const [showRipple, setShowRipple] = useState(false);

  const handleClick = () => {
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full p-5 rounded-2xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] text-left relative overflow-hidden ${
        isSelected
          ? 'bg-primary-500 text-white shadow-lg ring-2 ring-primary-300 animate-pop-in'
          : 'bg-white hover:bg-primary-50 shadow-md border border-primary-100'
      }`}
    >
      {/* Ripple effect */}
      {showRipple && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4 h-4 bg-white/30 rounded-full animate-ripple" />
        </div>
      )}

      {/* Animated checkmark */}
      {isSelected && (
        <div className="absolute top-3 right-3 animate-pop-in">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <svg 
              className="w-4 h-4 text-primary-500" 
              viewBox="0 0 20 20" 
              fill="none"
            >
              <path
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                fill="currentColor"
                className="animate-checkmark"
                style={{
                  strokeDasharray: '20',
                  strokeDashoffset: '20',
                  stroke: 'currentColor',
                  strokeWidth: '2',
                  fill: 'none'
                }}
              />
            </svg>
          </div>
        </div>
      )}
      
      <div className="pr-8">
        <h3 className={`font-semibold text-lg mb-2 transition-colors duration-200 ${
          isSelected ? 'text-white' : 'text-warm-800'
        }`}>
          {texture.name}
        </h3>
        
        <p className={`text-sm mb-3 transition-colors duration-200 ${
          isSelected ? 'text-primary-100' : 'text-warm-600'
        }`}>
          {texture.description}
        </p>
        
        <div className={`text-xs mb-3 px-3 py-1 rounded-full inline-block transition-all duration-200 ${
          isSelected 
            ? 'bg-white/20 text-white' 
            : 'bg-primary-100 text-primary-700'
        }`}>
          {texture.visual}
        </div>
        
        <div className="space-y-1">
          {texture.tips.slice(0, 2).map((tip, index) => (
            <p key={index} className={`text-xs transition-colors duration-200 ${
              isSelected ? 'text-primary-200' : 'text-warm-500'
            }`}>
              • {tip}
            </p>
          ))}
        </div>
      </div>
    </button>
  );
};