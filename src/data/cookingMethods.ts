import { CookingMethod } from '../types';

export const cookingMethods: CookingMethod[] = [
  {
    id: 'boiling',
    name: 'Boiling',
    multiplier: 1.0,
    description: 'In rapidly bubbling water (212°F/100°C)',
  },
  {
    id: 'simmering',
    name: 'Simmering',
    multiplier: 1.15, // Reduced from 1.2 for more accuracy
    description: 'In gently bubbling water (185-200°F)',
  },
  {
    id: 'steaming',
    name: 'Steaming',
    multiplier: 1.1,
    description: 'Over boiling water (steam heat)',
  },
  {
    id: 'baking-350',
    name: 'Baking (350°F)',
    multiplier: 1.0, // Base for chicken at 350°F
    description: 'In 350°F oven',
  },
  {
    id: 'baking-400',
    name: 'Baking (400°F)',
    multiplier: 0.85,
    description: 'In 400°F oven (higher heat)',
  },
  {
    id: 'pan-frying',
    name: 'Pan Frying',
    multiplier: 0.7, // Reduced for more accurate high-heat cooking
    description: 'In hot pan with oil (medium-high heat)',
  },
  {
    id: 'grilling',
    name: 'Grilling',
    multiplier: 0.65, // Reduced for high direct heat
    description: 'Over direct heat (high temperature)',
  },
];