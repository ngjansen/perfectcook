import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, AlertTriangle, Mic, Plus } from 'lucide-react';
import { Navigation } from './Navigation';
import { VoiceControl } from './VoiceControl';
import { useTimer } from '../hooks/useTimer';
import { useNotifications } from '../hooks/useNotifications';
import { useVoiceCommands } from '../hooks/useVoiceCommands';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { formatTime } from '../utils/calculations';
import { formatTemperature } from '../utils/temperature';
import { Food, Texture } from '../types';

interface TimerScreenProps {
  food: Food;
  texture: Texture;
  totalTime: number;
  onBack: () => void;
  onComplete: () => void;
  temperatureUnit: 'celsius' | 'fahrenheit';
  onTemperatureToggle: (unit: 'celsius' | 'fahrenheit') => void;
  voiceEnabled: boolean;
}

export const TimerScreen: React.FC<TimerScreenProps> = ({ 
  food, 
  texture, 
  totalTime, 
  onBack, 
  onComplete,
  temperatureUnit,
  onTemperatureToggle,
  voiceEnabled
}) => {
  const timer = useTimer(totalTime);
  const { showNotification } = useNotifications();
  const { triggerTimerStart, triggerTimerComplete, triggerWarning } = useHapticFeedback();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    timer.setTime(totalTime);
  }, [totalTime]);

  useEffect(() => {
    if (timer.isComplete && timer.isRunning) {
      setShowConfetti(true);
      triggerTimerComplete();
      showNotification(
        'Cooking Complete! 🎉',
        `Your ${texture.name.toLowerCase()} ${food.name.toLowerCase()} is ready!`
      );
      setTimeout(() => {
        setShowConfetti(false);
        onComplete();
      }, 2000);
    }
  }, [timer.isComplete, timer.isRunning]);

  // Voice command handlers
  const voiceCommands = useVoiceCommands({
    onStartTimer: () => {
      if (!timer.isRunning) {
        timer.start();
        triggerTimerStart();
      }
    },
    onPauseTimer: () => {
      if (timer.isRunning && !timer.isPaused) {
        timer.pause();
      }
    },
    onResumeTimer: () => {
      if (timer.isPaused) {
        timer.resume();
      }
    },
    onResetTimer: () => {
      timer.reset();
    },
    onAddTime: (minutes: number) => {
      timer.setTime(timer.timeRemaining + (minutes * 60));
    },
  });

  // Alert notifications at key intervals
  useEffect(() => {
    if (timer.isRunning && !timer.isPaused) {
      // Alert at 2 minutes remaining for high-risk foods
      if (food.safetyTemp && timer.timeRemaining === 120) {
        triggerWarning();
        showNotification(
          '2 Minutes Remaining',
          'Prepare your thermometer to check internal temperature'
        );
      }
      // Alert at 30 seconds remaining
      if (timer.timeRemaining === 30) {
        triggerWarning();
        showNotification(
          '30 Seconds Remaining',
          'Get ready to check your food!'
        );
      }
    }
  }, [timer.timeRemaining, timer.isRunning, timer.isPaused]);

  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (timer.progress / 100) * circumference;

  const getTimeColor = () => {
    if (timer.timeRemaining <= 30) return 'text-red-500';
    if (timer.timeRemaining <= 120) return 'text-accent-500';
    return 'text-primary-600';
  };

  const getRingColor = () => {
    if (timer.timeRemaining <= 30) return 'stroke-red-500';
    if (timer.timeRemaining <= 120) return 'stroke-accent-500';
    return 'stroke-primary-500';
  };

  const getTimerAnimation = () => {
    if (timer.timeRemaining <= 30 && timer.isRunning && !timer.isPaused) {
      return 'animate-timer-urgent';
    }
    if (timer.timeRemaining <= 120 && timer.isRunning && !timer.isPaused) {
      return 'animate-timer-pulse';
    }
    return '';
  };

  const handleButtonPress = (action: () => void) => {
    action();
  };

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-gray-900 animate-fade-in">
      <Navigation 
        onBack={onBack} 
        title="Cooking Timer"
        showTempToggle={true}
        temperatureUnit={temperatureUnit}
        onTemperatureToggle={onTemperatureToggle}
      />
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 celebration-mode animate-pulse" />
            {/* Enhanced confetti animation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce">
              🎉
            </div>
            <div className="absolute top-1/3 left-1/3 text-4xl animate-confetti" style={{ animationDelay: '0.2s' }}>
              ✨
            </div>
            <div className="absolute top-2/3 right-1/3 text-4xl animate-confetti" style={{ animationDelay: '0.4s' }}>
              🌟
            </div>
          </div>
        )}

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-4xl animate-gentle-bounce">{food.icon}</span>
            <span className="text-3xl text-primary-400">→</span>
            <span className="text-xl font-semibold text-primary-600 dark:text-primary-400">
              {texture.name}
            </span>
          </div>
          <p className="text-warm-600 dark:text-gray-400">
            {texture.description}
          </p>
        </div>

        {/* Enhanced Circular Progress Timer */}
        <div className={`relative mb-8 ${getTimerAnimation()}`}>
          <svg className="transform -rotate-90 w-80 h-80" viewBox="0 0 300 300">
            {/* Background ring */}
            <circle
              cx="150"
              cy="150"
              r="140"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-primary-200 dark:text-gray-700"
            />
            {/* Progress ring with enhanced animations */}
            <circle
              cx="150"
              cy="150"
              r="140"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className={`${getRingColor()} transition-all duration-1000 ease-linear`}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: timer.isRunning && !timer.isPaused 
                  ? 'stroke-dashoffset 1s linear, stroke 0.3s ease' 
                  : 'stroke-dashoffset 0.3s ease, stroke 0.3s ease',
                filter: timer.timeRemaining <= 30 && timer.isRunning && !timer.isPaused
                  ? 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6))'
                  : timer.timeRemaining <= 120 && timer.isRunning && !timer.isPaused
                  ? 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))'
                  : 'none'
              }}
            />
            {/* Pulse ring for urgent state */}
            {timer.timeRemaining <= 30 && timer.isRunning && !timer.isPaused && (
              <circle
                cx="150"
                cy="150"
                r="140"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="stroke-red-400 animate-pulse-ring opacity-50"
              />
            )}
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-6xl font-bold mb-2 transition-all duration-300 ${getTimeColor()}`}>
              {formatTime(timer.timeRemaining)}
            </div>
            <div className="text-warm-600 dark:text-gray-400 text-center max-w-32">
              {timer.isRunning
                ? timer.isPaused 
                  ? 'Paused' 
                  : 'Cooking...'
                : 'Ready to start'
              }
            </div>
            {/* Progress percentage */}
            <div className="text-xs text-warm-500 dark:text-gray-500 mt-1">
              {Math.round(timer.progress)}% complete
            </div>
          </div>
        </div>

        {/* Enhanced Control Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleButtonPress(timer.isRunning && !timer.isPaused ? timer.pause : timer.start)}
            className="bg-primary-500 hover:bg-primary-600 text-white p-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-[72px] min-w-[72px] relative overflow-hidden"
            disabled={timer.isComplete}
          >
            {/* Button press ripple effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 transition-transform duration-200 active:scale-100" />
            {timer.isRunning && !timer.isPaused ? (
              <Pause className="w-8 h-8 relative z-10" />
            ) : (
              <Play className="w-8 h-8 relative z-10" />
            )}
          </button>
          
          {timer.isPaused && (
            <button
              onClick={() => handleButtonPress(timer.resume)}
              className="bg-accent-500 hover:bg-accent-600 text-white p-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-[72px] min-w-[72px] animate-pop-in"
            >
              <Play className="w-8 h-8" />
            </button>
          )}
          
          <button
            onClick={() => handleButtonPress(timer.reset)}
            className="bg-warm-500 hover:bg-warm-600 text-white p-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-[72px] min-w-[72px]"
          >
            <RotateCcw className="w-8 h-8" />
          </button>

          <button
            onClick={() => handleButtonPress(() => timer.setTime(timer.timeRemaining + 120))}
            className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-[72px] min-w-[72px]"
            title="Add 2 minutes"
          >
            <Plus className="w-8 h-8" />
          </button>
        </div>

        {/* Enhanced Voice Control */}
        {voiceEnabled && (
          <div className="mb-6 animate-fade-in">
            <VoiceControl
              isEnabled={voiceEnabled}
              onCommand={voiceCommands.processCommand}
              onToggle={() => {}} // Handled in settings
            />
          </div>
        )}

        {/* Tips */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-primary-200 dark:border-gray-700 mb-4 animate-fade-in">
          <h3 className="font-semibold text-warm-800 dark:text-white mb-3 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-primary-500" />
            Cooking Tips
          </h3>
          <div className="space-y-2">
            {texture.tips.map((tip, index) => (
              <p key={index} className="text-sm text-warm-600 dark:text-gray-400 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                • {tip}
              </p>
            ))}
          </div>
        </div>

        {/* Enhanced Safety Note */}
        {food.safetyTemp && (
          <div className={`p-4 rounded-xl border max-w-md w-full animate-fade-in ${
            timer.timeRemaining <= 120 && timer.isRunning && !timer.isPaused
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 animate-safety-warning'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`w-5 h-5 text-red-600 ${
                timer.timeRemaining <= 30 && timer.isRunning && !timer.isPaused ? 'animate-bounce' : ''
              }`} />
              <h3 className="font-semibold text-red-800 dark:text-red-400">Food Safety Critical</h3>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300">
              🌡️ Ensure internal temperature reaches {formatTemperature(food.safetyTemp, temperatureUnit)} for food safety. 
              Use a meat thermometer to verify doneness.
            </p>
          </div>
        )}

        {/* Enhanced Time Remaining Alerts */}
        {timer.isRunning && timer.timeRemaining <= 120 && timer.timeRemaining > 0 && (
          <div className={`mt-4 p-3 rounded-xl border max-w-md w-full animate-fade-in ${
            timer.timeRemaining <= 30
              ? 'bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700 animate-safety-warning'
              : 'bg-accent-100 dark:bg-accent-900/20 border-accent-300 dark:border-accent-700'
          }`}>
            <p className={`text-sm text-center font-medium ${
              timer.timeRemaining <= 30
                ? 'text-red-800 dark:text-red-400'
                : 'text-accent-800 dark:text-accent-400'
            }`}>
              {timer.timeRemaining <= 30 
                ? '🔥 Almost done! Get ready to check your food!'
                : '⏰ 2 minutes remaining - prepare to test doneness'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};