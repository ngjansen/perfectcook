import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { TextureCard } from './TextureCard';
import { texturesByFood } from '../data/textures';
import { Food, Texture } from '../types';

interface TextureSelectionProps {
  food: Food;
  onBack: () => void;
  onNext: (texture: Texture) => void;
}

export const TextureSelection: React.FC<TextureSelectionProps> = ({ food, onBack, onNext }) => {
  const [selectedTexture, setSelectedTexture] = useState<Texture | null>(null);
  const textures = texturesByFood[food.id] || [];

  const handleTextureSelect = (texture: Texture) => {
    setSelectedTexture(texture);
    // Auto-advance after selection
    setTimeout(() => onNext(texture), 300);
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <Navigation onBack={onBack} title="Choose Texture" />
      
      <div className="p-6">
        <div className="mb-6 text-center">
          <div className="text-4xl mb-3">{food.icon}</div>
          <h2 className="text-xl font-semibold text-warm-800 mb-2">
            How do you like your {food.name.toLowerCase()}?
          </h2>
          <p className="text-warm-600">
            Select your preferred texture for perfect results
          </p>
        </div>

        <div className="space-y-4">
          {textures.map((texture) => (
            <TextureCard
              key={texture.id}
              texture={texture}
              onClick={() => handleTextureSelect(texture)}
              isSelected={selectedTexture?.id === texture.id}
            />
          ))}
        </div>

        {textures.length === 0 && (
          <div className="text-center py-12">
            <p className="text-warm-600">
              No texture options available for this food yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};