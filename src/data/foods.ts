import { Food } from '../types';

export const foods: Food[] = [
  {
    id: 'eggs',
    name: 'Eggs',
    icon: '🥚',
    category: 'protein',
    description: 'Perfect for any meal',
    safetyTemp: 160,
    baseTime: 420, // 7 minutes for medium-boiled (scientifically validated)
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'pasta',
    name: 'Pasta',
    icon: '🍝',
    category: 'grain',
    description: 'Al dente to tender',
    baseTime: 480, // 8 minutes base (average for common pasta shapes)
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'chicken',
    name: 'Chicken',
    icon: '🍗',
    category: 'protein',
    description: 'Safe and delicious',
    safetyTemp: 165, // Correct FDA requirement
    baseTime: 1500, // 25 minutes base for boneless breast (4 oz at 350°F)
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    icon: '🥔',
    category: 'vegetable',
    description: 'Firm to soft',
    baseTime: 1020, // 17 minutes base (average for medium potatoes)
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'rice',
    name: 'Rice',
    icon: '🍚',
    category: 'grain',
    description: 'Fluffy and perfect',
    baseTime: 900, // 15 minutes base (absorption method + 5 min rest)
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'fish',
    name: 'Fish',
    icon: '🐟',
    category: 'protein',
    description: 'Flaky and tender',
    safetyTemp: 145,
    baseTime: 600, // 10 minutes base
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: '🥕',
    category: 'vegetable',
    description: 'Crisp to tender',
    baseTime: 480, // 8 minutes base
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'beef',
    name: 'Beef',
    icon: '🥩',
    category: 'protein',
    description: 'Rare to well-done',
    safetyTemp: 145,
    baseTime: 900, // 15 minutes base
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];