import { Texture } from '../types';

export const texturesByFood: Record<string, Texture[]> = {
  eggs: [
    {
      id: 'soft-boiled',
      name: 'Soft-Boiled',
      description: 'Runny yolk, set white',
      multiplier: 0.86, // 6 minutes (scientifically validated)
      visual: 'Creamy golden yolk flows out',
      tips: ['Perfect for toast dipping', 'Yolk should be bright orange', 'White should be just set', 'Use room temperature eggs for best results'],
      beforeImage: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400',
      afterImage: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 'jammy',
      name: 'Jammy',
      description: 'Soft, jammy yolk center',
      multiplier: 1.0, // 7 minutes (scientifically validated)
      visual: 'Yolk is creamy but holds shape',
      tips: ['Perfect for ramen and salads', 'Yolk should be slightly jammy', 'Cool in ice water immediately', 'Peel under running water'],
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Slightly soft yolk center',
      multiplier: 1.14, // 8 minutes (scientifically validated)
      visual: 'Yolk is mostly set with soft center',
      tips: ['Great for breakfast', 'Yolk should be mostly firm', 'Easy to peel when cooled', 'No green ring around yolk'],
    },
    {
      id: 'hard-boiled',
      name: 'Hard-Boiled',
      description: 'Completely set throughout',
      multiplier: 1.43, // 10 minutes (scientifically validated)
      visual: 'Firm yellow yolk, no green ring',
      tips: ['Perfect for deviled eggs', 'Should not have gray ring around yolk', 'Cool immediately in ice water', 'Add 30 seconds for each size increase'],
    },
  ],
  pasta: [
    {
      id: 'al-dente',
      name: 'Al Dente',
      description: 'Firm to the bite',
      multiplier: 0.75, // 2-3 minutes less than package directions
      visual: 'Slight resistance when bitten',
      tips: ['Should have slight firmness in center', 'Perfect for further cooking in sauces', 'Test frequently near end time', 'Save pasta water for sauce'],
    },
    {
      id: 'tender',
      name: 'Tender',
      description: 'Soft but not mushy',
      multiplier: 1.0, // Standard cooking time
      visual: 'Easily chewed, no hard center',
      tips: ['Great for most dishes', 'Should break cleanly when bitten', 'Reserve pasta water for sauce', 'Drain immediately when done'],
    },
    {
      id: 'well-done',
      name: 'Well-Done',
      description: 'Very soft texture',
      multiplier: 1.25, // Extended cooking time
      visual: 'Very soft, easily mashable',
      tips: ['Good for soups and casseroles', 'May break apart easily', 'Watch carefully to avoid mush', 'Best for baked pasta dishes'],
    },
  ],
  chicken: [
    {
      id: 'juicy',
      name: 'Juicy & Safe',
      description: 'Perfectly cooked, moist, 165°F internal',
      multiplier: 1.0, // 25 minutes for 4 oz boneless breast
      visual: 'Clear juices, no pink meat',
      tips: ['Internal temp must reach 165°F', 'Juices run clear when pierced', 'Let rest 5 minutes before cutting', 'Use meat thermometer for safety'],
    },
    {
      id: 'well-done',
      name: 'Well-Done',
      description: 'Fully cooked, firm, extra safe',
      multiplier: 1.2, // Extended cooking for extra safety
      visual: 'Firm texture, completely white',
      tips: ['Safe for all family members', 'May be slightly drier', 'Great for meal prep', 'Internal temp well above 165°F'],
    },
    {
      id: 'fall-apart',
      name: 'Fall-Apart Tender',
      description: 'Ultra tender, shreds easily',
      multiplier: 2.0, // Extended slow cooking
      visual: 'Shreds with a fork',
      tips: ['Perfect for pulled chicken', 'Great for soups and stews', 'Very safe and tender', 'Ideal for slow cooking methods'],
    },
  ],
  potatoes: [
    {
      id: 'firm',
      name: 'Firm',
      description: 'Holds shape, slight resistance (12-15 min)',
      multiplier: 0.8, // Small potatoes timing
      visual: 'Fork pierces with slight pressure',
      tips: ['Perfect for salads', 'Holds shape when mixed', 'Great for roasting after', 'Test with fork for doneness'],
    },
    {
      id: 'tender',
      name: 'Tender',
      description: 'Soft, easily pierced (15-20 min)',
      multiplier: 1.0, // Medium potatoes timing
      visual: 'Fork slides in easily',
      tips: ['Great for mashing', 'Perfect for most recipes', 'Easy to cut and serve', 'Drain well after cooking'],
    },
    {
      id: 'soft',
      name: 'Very Soft',
      description: 'Perfect for mashing (20-25 min)',
      multiplier: 1.3, // Large potatoes timing
      visual: 'Falls apart when pierced',
      tips: ['Ideal for smooth mashed potatoes', 'Great for soups', 'May break apart when stirred', 'Drain thoroughly before mashing'],
    },
  ],
  rice: [
    {
      id: 'firm',
      name: 'Firm',
      description: 'Individual grains, slight bite',
      multiplier: 0.89, // 10-12 minutes cooking + 5 min rest
      visual: 'Grains are separate and distinct',
      tips: ['Perfect for fried rice', 'Grains dont stick together', 'Great for salads', 'Use 1:1.5 rice to water ratio'],
    },
    {
      id: 'fluffy',
      name: 'Fluffy',
      description: 'Light, tender grains',
      multiplier: 1.0, // 15 minutes total (10 min cook + 5 min rest)
      visual: 'Light and airy texture',
      tips: ['Perfect for most dishes', 'Should not be sticky', 'Let rest 5 minutes before serving', 'Fluff with fork before serving'],
    },
    {
      id: 'soft',
      name: 'Soft',
      description: 'Very tender, slightly sticky',
      multiplier: 1.2, // Extended cooking time
      visual: 'Grains are very soft',
      tips: ['Great for rice pudding', 'Good for young children', 'May clump together slightly', 'Add extra water if needed'],
    },
  ],
  fish: [
    {
      id: 'flaky',
      name: 'Flaky',
      description: 'Just cooked through, flakes easily',
      multiplier: 1.0,
      visual: 'Flesh flakes with a fork',
      tips: ['Internal temp 145°F', 'Flesh should be opaque', 'Flakes easily when tested', 'Don\'t overcook'],
    },
    {
      id: 'firm',
      name: 'Firm',
      description: 'Well-cooked, holds together',
      multiplier: 1.2,
      visual: 'Firm texture, fully opaque',
      tips: ['Great for grilling', 'Holds shape well', 'Perfect for fish tacos', 'Safe for all diners'],
    },
  ],
  vegetables: [
    {
      id: 'crisp-tender',
      name: 'Crisp-Tender',
      description: 'Bright color, slight crunch',
      multiplier: 0.7,
      visual: 'Vibrant color, tender but firm',
      tips: ['Perfect for stir-fries', 'Retains nutrients', 'Bright, appealing color', 'Quick cooking method'],
    },
    {
      id: 'tender',
      name: 'Tender',
      description: 'Soft, easily pierced',
      multiplier: 1.0,
      visual: 'Fork-tender, fully cooked',
      tips: ['Great for most dishes', 'Easy to eat', 'Good for all ages', 'Versatile texture'],
    },
    {
      id: 'soft',
      name: 'Very Soft',
      description: 'Perfect for mashing or purees',
      multiplier: 1.4,
      visual: 'Very soft, breaks apart easily',
      tips: ['Ideal for baby food', 'Great for soups', 'Easy to digest', 'Perfect for purees'],
    },
  ],
  beef: [
    {
      id: 'rare',
      name: 'Rare',
      description: 'Cool red center (120-125°F)',
      multiplier: 0.6,
      visual: 'Cool red center, warm exterior',
      tips: ['Internal temp 120-125°F', 'Very tender', 'Not recommended for ground beef', 'High-quality cuts only'],
    },
    {
      id: 'medium-rare',
      name: 'Medium-Rare',
      description: 'Warm red center (130-135°F)',
      multiplier: 0.8,
      visual: 'Warm red center, browned exterior',
      tips: ['Internal temp 130-135°F', 'Most popular doneness', 'Juicy and flavorful', 'Perfect for steaks'],
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Pink center (135-145°F)',
      multiplier: 1.0,
      visual: 'Pink center, well-browned outside',
      tips: ['Internal temp 135-145°F', 'Good balance of doneness', 'Still juicy', 'Safe for most people'],
    },
    {
      id: 'well-done',
      name: 'Well-Done',
      description: 'No pink, fully cooked (145°F+)',
      multiplier: 1.3,
      visual: 'No pink, uniformly brown',
      tips: ['Internal temp 145°F+', 'Safest option', 'May be less juicy', 'Required for ground beef'],
    },
  ],
};