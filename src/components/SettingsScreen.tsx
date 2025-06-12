import React from 'react';
import { Moon, Sun, Volume2, VolumeX, Smartphone, Mic, MicOff } from 'lucide-react';
import { Navigation } from './Navigation';
import { TemperatureToggle } from './TemperatureToggle';
import { AppSettings } from '../types';

interface SettingsScreenProps {
  settings: AppSettings;
  onBack: () => void;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onBack,
  onUpdateSettings,
}) => {
  const handleToggle = (key: keyof AppSettings, value: any) => {
    onUpdateSettings({ [key]: value });
  };

  return (
    <div className="min-h-screen bg-primary-50 animate-fade-in">
      <Navigation onBack={onBack} title="Settings" />
      
      <div className="p-6 space-y-6">
        {/* Display Settings */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in">
          <h3 className="font-semibold text-warm-800 mb-4">Display</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.darkMode ? (
                  <Moon className="w-5 h-5 text-primary-600" />
                ) : (
                  <Sun className="w-5 h-5 text-primary-600" />
                )}
                <div>
                  <div className="font-medium text-warm-800">Dark Mode</div>
                  <div className="text-sm text-warm-600">
                    Better for low-light cooking
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleToggle('darkMode', !settings.darkMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.darkMode ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-warm-800">Temperature Unit</div>
                <div className="text-sm text-warm-600">
                  Choose Fahrenheit or Celsius
                </div>
              </div>
              
              <div className="bg-primary-50 rounded-xl p-2">
                <TemperatureToggle
                  unit={settings.temperatureUnit}
                  onToggle={(unit) => handleToggle('temperatureUnit', unit)}
                  size="medium"
                  showIcon={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Audio & Notifications */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-semibold text-warm-800 mb-4">Audio & Notifications</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-primary-600" />
                ) : (
                  <VolumeX className="w-5 h-5 text-primary-600" />
                )}
                <div>
                  <div className="font-medium text-warm-800">Sound Alerts</div>
                  <div className="text-sm text-warm-600">
                    Audio notifications when timers complete
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleToggle('soundEnabled', !settings.soundEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.soundEnabled ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.soundEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-primary-600" />
                <div>
                  <div className="font-medium text-warm-800">Vibration</div>
                  <div className="text-sm text-warm-600">
                    Haptic feedback for timer alerts
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleToggle('vibrationEnabled', !settings.vibrationEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.vibrationEnabled ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.vibrationEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Voice Control */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-semibold text-warm-800 mb-4">Voice Control</h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {settings.voiceEnabled ? (
                <Mic className="w-5 h-5 text-primary-600" />
              ) : (
                <MicOff className="w-5 h-5 text-primary-600" />
              )}
              <div>
                <div className="font-medium text-warm-800">Voice Commands</div>
                <div className="text-sm text-warm-600">
                  Hands-free timer control
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleToggle('voiceEnabled', !settings.voiceEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.voiceEnabled ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.voiceEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.voiceEnabled && (
            <div className="bg-primary-50 rounded-xl p-4 animate-fade-in">
              <h4 className="font-medium text-primary-800 mb-2">Available Commands:</h4>
              <div className="text-sm text-primary-700 space-y-1">
                <div>• "Start timer" - Begin cooking</div>
                <div>• "Pause timer" - Pause current timer</div>
                <div>• "Resume timer" - Resume paused timer</div>
                <div>• "Reset timer" - Reset to original time</div>
                <div>• "Add 2 minutes" - Extend cooking time</div>
              </div>
            </div>
          )}
        </div>

        {/* Data & Privacy */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-semibold text-warm-800 mb-4">Data & Privacy</h3>
          
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-primary-50 rounded-xl transition-colors">
              <div className="font-medium text-warm-800">Reset Onboarding</div>
              <div className="text-sm text-warm-600">Show intro tutorial again</div>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-red-50 rounded-xl transition-colors">
              <div className="font-medium text-red-600">Clear All Data</div>
              <div className="text-sm text-warm-600">Remove favorites and cooking history</div>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-semibold text-warm-800 mb-4">About</h3>
          
          <div className="space-y-2 text-sm text-warm-600">
            <div>Smart Food Timer v2.0</div>
            <div>Built with scientific cooking data</div>
            <div>USDA food safety compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
};