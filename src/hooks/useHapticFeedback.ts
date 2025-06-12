import { useCallback } from 'react';

export const useHapticFeedback = () => {
  const triggerHaptic = useCallback((pattern: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') => {
    if (!('vibrate' in navigator)) return;
    
    const patterns = {
      light: [50],
      medium: [100],
      heavy: [200],
      success: [100, 50, 100],
      warning: [150, 100, 150],
      error: [200, 100, 200, 100, 200],
    };
    
    navigator.vibrate(patterns[pattern]);
  }, []);

  const triggerButtonPress = useCallback(() => {
    triggerHaptic('light');
  }, [triggerHaptic]);

  const triggerTimerStart = useCallback(() => {
    triggerHaptic('medium');
  }, [triggerHaptic]);

  const triggerTimerComplete = useCallback(() => {
    triggerHaptic('success');
  }, [triggerHaptic]);

  const triggerWarning = useCallback(() => {
    triggerHaptic('warning');
  }, [triggerHaptic]);

  const triggerError = useCallback(() => {
    triggerHaptic('error');
  }, [triggerHaptic]);

  return {
    triggerHaptic,
    triggerButtonPress,
    triggerTimerStart,
    triggerTimerComplete,
    triggerWarning,
    triggerError,
  };
};