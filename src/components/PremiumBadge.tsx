import React from 'react';
import { Crown, Lock } from 'lucide-react';

interface PremiumBadgeProps {
  variant?: 'crown' | 'lock' | 'text';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showText?: boolean;
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  variant = 'crown',
  size = 'medium',
  className = '',
  showText = false,
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 text-xs',
    medium: 'w-5 h-5 text-sm',
    large: 'w-6 h-6 text-base',
  };

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };

  if (variant === 'text') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-accent-400 to-accent-600 text-white rounded-full font-medium ${sizeClasses[size]} ${className}`}>
        <Crown className={iconSizes[size]} />
        {showText && 'Premium'}
      </span>
    );
  }

  if (variant === 'lock') {
    return (
      <div className={`inline-flex items-center justify-center bg-gray-400 text-white rounded-full ${sizeClasses[size]} ${className}`}>
        <Lock className={iconSizes[size]} />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center bg-gradient-to-r from-accent-400 to-accent-600 text-white rounded-full ${sizeClasses[size]} ${className} animate-gentle-bounce`}>
      <Crown className={iconSizes[size]} />
    </div>
  );
};