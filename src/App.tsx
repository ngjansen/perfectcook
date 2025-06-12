import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { OnboardingOverlay } from './components/OnboardingOverlay';
import { FoodSelection } from './components/FoodSelection';
import { TextureSelection } from './components/TextureSelection';
import { CookingDetails } from './components/CookingDetails';
import { TimerScreen } from './components/TimerScreen';
import { MultiTimerScreen } from './components/MultiTimerScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { PremiumBenefitsScreen } from './components/PremiumBenefitsScreen';
import { UpgradeFlowScreen } from './components/UpgradeFlowScreen';
import { AccountScreen } from './components/AccountScreen';
import { BillingScreen } from './components/BillingScreen';
import { SupportScreen } from './components/SupportScreen';
import { PremiumUpsellModal } from './components/PremiumUpsellModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useHapticFeedback } from './hooks/useHapticFeedback';
import { Food, Texture, Screen, CookingSession, AppSettings, FavoriteSetting, MultiTimer } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [previousScreen, setPreviousScreen] = useState<Screen>('welcome');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [selectedTexture, setSelectedTexture] = useState<Texture | null>(null);
  const [calculatedTime, setCalculatedTime] = useState<number>(0);
  const [cookingDetails, setCookingDetails] = useState<any>(null);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [upsellFeature, setUpsellFeature] = useState({ name: '', description: '' });
  
  const [cookingHistory, setCookingHistory] = useLocalStorage<CookingSession[]>('cooking-history', []);
  const [settings, setSettings] = useLocalStorage<AppSettings>('app-settings', {
    temperatureUnit: 'fahrenheit',
    darkMode: false,
    soundEnabled: true,
    vibrationEnabled: true,
    voiceEnabled: false,
    hasSeenOnboarding: false,
    favoriteSettings: [],
    isPremium: false,
    premiumExpiryDate: undefined,
    theme: 'default',
  });
  const [multiTimers, setMultiTimers] = useLocalStorage<MultiTimer[]>('multi-timers', []);

  const { triggerButtonPress, triggerTimerStart, triggerTimerComplete } = useHapticFeedback();

  // Show onboarding for first-time users
  useEffect(() => {
    if (!settings.hasSeenOnboarding && currentScreen === 'welcome') {
      // Small delay to let welcome screen render first
      setTimeout(() => {
        if (currentScreen === 'welcome') {
          setCurrentScreen('onboarding');
        }
      }, 1000);
    }
  }, [settings.hasSeenOnboarding, currentScreen]);

  // Apply dark mode
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Enhanced screen navigation with transitions
  const navigateToScreen = (newScreen: Screen, isBack: boolean = false) => {
    setPreviousScreen(currentScreen);
    setIsNavigatingBack(isBack);
    
    // Add a small delay for transition effect
    setTimeout(() => {
      setCurrentScreen(newScreen);
    }, isBack ? 0 : 50);
  };

  // Premium feature access check
  const checkPremiumAccess = (featureName: string, featureDescription: string): boolean => {
    if (settings.isPremium) {
      return true;
    }
    
    setUpsellFeature({ name: featureName, description: featureDescription });
    setShowUpsellModal(true);
    return false;
  };

  const handleOnboardingComplete = () => {
    setSettings(prev => ({ ...prev, hasSeenOnboarding: true }));
    navigateToScreen('welcome');
  };

  const handleOnboardingSkip = () => {
    setSettings(prev => ({ ...prev, hasSeenOnboarding: true }));
    navigateToScreen('welcome');
  };

  const handleStart = () => {
    triggerButtonPress();
    navigateToScreen('food-selection');
  };

  const handleFoodSelect = (food: Food) => {
    // Check if food is premium
    if (food.isPremium && !checkPremiumAccess('Premium Foods', 'Access our complete database of 100+ foods with precise timing calculations.')) {
      return;
    }
    
    triggerButtonPress();
    setSelectedFood(food);
    navigateToScreen('texture-selection');
  };

  const handleTextureSelect = (texture: Texture) => {
    // Check if texture is premium
    if (texture.isPremium && !checkPremiumAccess('Advanced Textures', 'Fine-tune your cooking with premium texture options and custom controls.')) {
      return;
    }
    
    triggerButtonPress();
    setSelectedTexture(texture);
    navigateToScreen('cooking-details');
  };

  const handleStartTimer = (time: number, details: any) => {
    triggerTimerStart();
    setCalculatedTime(time);
    setCookingDetails(details);
    navigateToScreen('timer');
  };

  const handleTimerComplete = () => {
    triggerTimerComplete();
    
    // Save to cooking history
    if (selectedFood && selectedTexture) {
      const session: CookingSession = {
        foodId: selectedFood.id,
        textureId: selectedTexture.id,
        cookingMethod: cookingDetails?.method?.id || '',
        thickness: cookingDetails?.thickness || 3,
        startingTemp: cookingDetails?.startingTemp || 'room',
        calculatedTime,
        timestamp: Date.now(),
      };
      
      setCookingHistory(prev => [session, ...prev.slice(0, 9)]); // Keep last 10
    }
    
    navigateToScreen('success');
  };

  const handleSaveFavorite = (rating: number, feedback: string) => {
    if (rating >= 4 && selectedFood && selectedTexture && cookingDetails) {
      // Check premium limit for favorites
      if (!settings.isPremium && settings.favoriteSettings.length >= 10) {
        checkPremiumAccess('Unlimited Favorites', 'Save unlimited cooking combinations and never lose your perfect recipes.');
        return;
      }
      
      const favorite: FavoriteSetting = {
        id: Date.now().toString(),
        name: `${selectedTexture.name} ${selectedFood.name}`,
        foodId: selectedFood.id,
        textureId: selectedTexture.id,
        cookingMethod: cookingDetails.method.id,
        thickness: cookingDetails.thickness,
        startingTemp: cookingDetails.startingTemp,
        createdAt: Date.now(),
      };
      
      setSettings(prev => ({
        ...prev,
        favoriteSettings: [favorite, ...prev.favoriteSettings.slice(0, settings.isPremium ? 99 : 9)]
      }));
    }
  };

  const handleUseFavorite = (favorite: FavoriteSetting) => {
    // This would set up the cooking session with the favorite settings
    // For now, just navigate to food selection
    navigateToScreen('food-selection');
  };

  const handleDeleteFavorite = (id: string) => {
    setSettings(prev => ({
      ...prev,
      favoriteSettings: prev.favoriteSettings.filter(f => f.id !== id)
    }));
  };

  const handleMultiTimer = () => {
    if (!checkPremiumAccess('Multi-Timer', 'Run unlimited timers simultaneously with priority management and batch cooking coordination.')) {
      return;
    }
    navigateToScreen('multi-timer');
  };

  const handleRestart = () => {
    triggerButtonPress();
    navigateToScreen('food-selection');
  };

  const handleHome = () => {
    triggerButtonPress();
    navigateToScreen('welcome');
    setSelectedFood(null);
    setSelectedTexture(null);
    setCalculatedTime(0);
    setCookingDetails(null);
  };

  const handleTemperatureToggle = (unit: 'celsius' | 'fahrenheit') => {
    setSettings(prev => ({ ...prev, temperatureUnit: unit }));
  };

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleUpgradeComplete = () => {
    setSettings(prev => ({ 
      ...prev, 
      isPremium: true,
      premiumExpiryDate: Date.now() + (365 * 24 * 60 * 60 * 1000) // 1 year from now
    }));
    setShowUpsellModal(false);
    navigateToScreen('welcome');
  };

  const goBack = () => {
    triggerButtonPress();
    setIsNavigatingBack(true);
    
    switch (currentScreen) {
      case 'food-selection':
        navigateToScreen('welcome', true);
        break;
      case 'texture-selection':
        navigateToScreen('food-selection', true);
        break;
      case 'cooking-details':
        navigateToScreen('texture-selection', true);
        break;
      case 'timer':
        navigateToScreen('cooking-details', true);
        break;
      case 'success':
        navigateToScreen('timer', true);
        break;
      case 'favorites':
      case 'settings':
      case 'multi-timer':
      case 'account':
      case 'billing':
      case 'support':
        navigateToScreen('welcome', true);
        break;
      case 'premium-benefits':
        navigateToScreen('welcome', true);
        break;
      case 'upgrade-flow':
        navigateToScreen('premium-benefits', true);
        break;
      default:
        navigateToScreen('welcome', true);
    }
  };

  // Get transition class based on navigation direction
  const getTransitionClass = () => {
    if (isNavigatingBack) {
      return 'screen-enter-back';
    }
    return 'screen-enter';
  };

  return (
    <div className={`font-sans ${settings.darkMode ? 'dark' : ''}`}>
      {currentScreen === 'onboarding' && (
        <OnboardingOverlay 
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
      
      <div className={getTransitionClass()}>
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onStart={handleStart}
            onFavorites={() => navigateToScreen('favorites')}
            onSettings={() => navigateToScreen('settings')}
            onMultiTimer={handleMultiTimer}
            onAccount={() => navigateToScreen('account')}
            onPremiumBenefits={() => navigateToScreen('premium-benefits')}
            favoriteCount={settings.favoriteSettings.length}
            temperatureUnit={settings.temperatureUnit}
            onTemperatureToggle={handleTemperatureToggle}
            isPremium={settings.isPremium}
          />
        )}
        
        {currentScreen === 'food-selection' && (
          <FoodSelection 
            onBack={goBack} 
            onNext={handleFoodSelect}
            temperatureUnit={settings.temperatureUnit}
            onTemperatureToggle={handleTemperatureToggle}
            isPremium={settings.isPremium}
            onPremiumFeatureClick={(name, desc) => checkPremiumAccess(name, desc)}
          />
        )}
        
        {currentScreen === 'texture-selection' && selectedFood && (
          <TextureSelection 
            food={selectedFood} 
            onBack={goBack} 
            onNext={handleTextureSelect}
            isPremium={settings.isPremium}
            onPremiumFeatureClick={(name, desc) => checkPremiumAccess(name, desc)}
          />
        )}
        
        {currentScreen === 'cooking-details' && selectedFood && selectedTexture && (
          <CookingDetails
            food={selectedFood}
            texture={selectedTexture}
            onBack={goBack}
            onNext={handleStartTimer}
            isPremium={settings.isPremium}
            onPremiumFeatureClick={(name, desc) => checkPremiumAccess(name, desc)}
          />
        )}
        
        {currentScreen === 'timer' && selectedFood && selectedTexture && (
          <TimerScreen
            food={selectedFood}
            texture={selectedTexture}
            totalTime={calculatedTime}
            onBack={goBack}
            onComplete={handleTimerComplete}
            temperatureUnit={settings.temperatureUnit}
            onTemperatureToggle={handleTemperatureToggle}
            voiceEnabled={settings.voiceEnabled}
            isPremium={settings.isPremium}
          />
        )}

        {currentScreen === 'multi-timer' && (
          <MultiTimerScreen
            timers={multiTimers}
            onBack={goBack}
            onAddTimer={() => {/* Implementation needed */}}
            onStartTimer={(id) => {/* Implementation needed */}}
            onPauseTimer={(id) => {/* Implementation needed */}}
            onDeleteTimer={(id) => {/* Implementation needed */}}
            isPremium={settings.isPremium}
          />
        )}
        
        {currentScreen === 'success' && selectedFood && selectedTexture && (
          <SuccessScreen
            food={selectedFood}
            texture={selectedTexture}
            onRestart={handleRestart}
            onHome={handleHome}
            onSaveFavorite={handleSaveFavorite}
            isPremium={settings.isPremium}
            onPremiumFeatureClick={(name, desc) => checkPremiumAccess(name, desc)}
          />
        )}

        {currentScreen === 'favorites' && (
          <FavoritesScreen
            favorites={settings.favoriteSettings}
            onBack={goBack}
            onUseFavorite={handleUseFavorite}
            onDeleteFavorite={handleDeleteFavorite}
            isPremium={settings.isPremium}
            onPremiumFeatureClick={(name, desc) => checkPremiumAccess(name, desc)}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            settings={settings}
            onBack={goBack}
            onUpdateSettings={handleUpdateSettings}
            onAccount={() => navigateToScreen('account')}
            onPremiumBenefits={() => navigateToScreen('premium-benefits')}
          />
        )}

        {currentScreen === 'premium-benefits' && (
          <PremiumBenefitsScreen
            onBack={goBack}
            onUpgrade={() => navigateToScreen('upgrade-flow')}
          />
        )}

        {currentScreen === 'upgrade-flow' && (
          <UpgradeFlowScreen
            onBack={goBack}
            onComplete={handleUpgradeComplete}
          />
        )}

        {currentScreen === 'account' && (
          <AccountScreen
            onBack={goBack}
            onBilling={() => navigateToScreen('billing')}
            onSupport={() => navigateToScreen('support')}
          />
        )}

        {currentScreen === 'billing' && (
          <BillingScreen
            onBack={goBack}
          />
        )}

        {currentScreen === 'support' && (
          <SupportScreen
            onBack={goBack}
          />
        )}
      </div>

      {/* Premium Upsell Modal */}
      <PremiumUpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        onUpgrade={() => {
          setShowUpsellModal(false);
          navigateToScreen('premium-benefits');
        }}
        featureName={upsellFeature.name}
        featureDescription={upsellFeature.description}
      />
    </div>
  );
}

export default App;