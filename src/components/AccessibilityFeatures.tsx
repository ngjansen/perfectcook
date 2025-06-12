import React from 'react';
import { Eye, Ear, Hand, Smartphone, Volume2, Type } from 'lucide-react';
import { AppSettings } from '../types';

interface AccessibilityFeaturesProps {
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
}

export const AccessibilityFeatures: React.FC<AccessibilityFeaturesProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const handleToggle = (key: keyof AppSettings, value: any) => {
    onUpdateSettings({ [key]: value });
  };

  const accessibilityOptions = [
    {
      id: 'highContrast',
      title: 'High Contrast Mode',
      description: 'Increase contrast for better visibility',
      icon: <Eye className="w-5 h-5" />,
      enabled: settings.highContrast || false,
      category: 'visual'
    },
    {
      id: 'largeText',
      title: 'Large Text',
      description: 'Increase font size throughout the app',
      icon: <Type className="w-5 h-5" />,
      enabled: settings.largeText || false,
      category: 'visual'
    },
    {
      id: 'soundEnabled',
      title: 'Audio Alerts',
      description: 'Sound notifications for timer events',
      icon: <Volume2 className="w-5 h-5" />,
      enabled: settings.soundEnabled,
      category: 'audio'
    },
    {
      id: 'voiceEnabled',
      title: 'Voice Commands',
      description: 'Control timers with voice commands',
      icon: <Ear className="w-5 h-5" />,
      enabled: settings.voiceEnabled,
      category: 'audio'
    },
    {
      id: 'vibrationEnabled',
      title: 'Haptic Feedback',
      description: 'Vibration for button presses and alerts',
      icon: <Smartphone className="w-5 h-5" />,
      enabled: settings.vibrationEnabled,
      category: 'haptic'
    },
    {
      id: 'reducedMotion',
      title: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      icon: <Hand className="w-5 h-5" />,
      enabled: settings.reducedMotion || false,
      category: 'motion'
    }
  ];

  const categories = {
    visual: { title: 'Visual', color: 'blue' },
    audio: { title: 'Audio', color: 'green' },
    haptic: { title: 'Touch & Haptic', color: 'purple' },
    motion: { title: 'Motion', color: 'amber' }
  };

  const groupedOptions = Object.entries(categories).map(([key, category]) => ({
    ...category,
    key,
    options: accessibilityOptions.filter(option => option.category === key)
  }));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-warm-800 mb-2">
          Accessibility Features
        </h3>
        <p className="text-sm text-warm-600">
          Customize the app to meet your accessibility needs
        </p>
      </div>

      {groupedOptions.map(category => (
        <div key={category.key} className="bg-white rounded-2xl p-6 border border-primary-200">
          <h4 className={`font-semibold text-${category.color}-800 mb-4 flex items-center gap-2`}>
            <div className={`w-2 h-2 bg-${category.color}-500 rounded-full`} />
            {category.title}
          </h4>
          
          <div className="space-y-4">
            {category.options.map(option => (
              <div key={option.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`text-${category.color}-600`}>
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-medium text-warm-800">{option.title}</div>
                    <div className="text-sm text-warm-600">{option.description}</div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleToggle(option.id as keyof AppSettings, !option.enabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    option.enabled ? `bg-${category.color}-500` : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      option.enabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Accessibility Tips */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-3">Accessibility Tips</h4>
        <div className="space-y-2 text-sm text-blue-700">
          <p>• Use voice commands for hands-free cooking</p>
          <p>• Enable high contrast mode in bright kitchens</p>
          <p>• Turn on haptic feedback for silent notifications</p>
          <p>• Large text mode helps when hands are messy</p>
          <p>• Audio alerts work great with background noise</p>
        </div>
      </div>

      {/* System Accessibility */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-2">System Accessibility</h4>
        <p className="text-sm text-gray-600 mb-3">
          This app also respects your device's accessibility settings:
        </p>
        <div className="space-y-1 text-sm text-gray-600">
          <p>• Screen reader compatibility (VoiceOver, TalkBack)</p>
          <p>• System font size preferences</p>
          <p>• Reduced motion settings</p>
          <p>• High contrast system themes</p>
        </div>
      </div>
    </div>
  );
};