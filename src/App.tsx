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
  
  const [cookingHistory, setCookingHistory] = useLocalStorage<CookingSession[]>('cooking-history', []);
  const [settings, setSettings] = useLocalStorage<AppSettings>('app-settings', {
    temperatureUnit: 'fahrenheit',
    darkMode: false,
    soundEnabled: true,
    vibrationEnabled: true,
    voiceEnabled: false,
    hasSeenOnboarding: false,
    favoriteSettings: [],
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
    triggerButtonPress();
    setSelectedFood(food);
    navigateToScreen('texture-selection');
  };

  const handleTextureSelect = (texture: Texture) => {
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
        favoriteSettings: [favorite, ...prev.favoriteSettings.slice(0, 9)] // Keep last 10
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
        navigateToScreen('welcome', true);
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
            onMultiTimer={() => navigateToScreen('multi-timer')}
            favoriteCount={settings.favoriteSettings.length}
            temperatureUnit={settings.temperatureUnit}
            onTemperatureToggle={handleTemperatureToggle}
          />
        )}
        
        {currentScreen === 'food-selection' && (
          <FoodSelection 
            onBack={goBack} 
            onNext={handleFoodSelect}
            temperatureUnit={settings.temperatureUnit}
            onTemperatureToggle={handleTemperatureToggle}
          />
        )}
        
        {currentScreen === 'texture-selection' && selectedFood && (
          <TextureSelection 
            food={selectedFood} 
            onBack={goBack} 
            onNext={handleTextureSelect} 
          />
        )}
        
        {currentScreen === 'cooking-details' && selectedFood && selectedTexture && (
          <CookingDetails
            food={selectedFood}
            texture={selectedTexture}
            onBack={goBack}
            onNext={handleStartTimer}
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
          />
        )}
        
        {currentScreen === 'success' && selectedFood && selectedTexture && (
          <SuccessScreen
            food={selectedFood}
            texture={selectedTexture}
            onRestart={handleRestart}
            onHome={handleHome}
            onSaveFavorite={handleSaveFavorite}
          />
        )}

        {currentScreen === 'favorites' && (
          <FavoritesScreen
            favorites={settings.favoriteSettings}
            onBack={goBack}
            onUseFavorite={handleUseFavorite}
            onDeleteFavorite={handleDeleteFavorite}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            settings={settings}
            onBack={goBack}
            onUpdateSettings={handleUpdateSettings}
          />
        )}
      </div>
    </div>
  );
}

export default App;