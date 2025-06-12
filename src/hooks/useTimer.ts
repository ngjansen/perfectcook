import { useState, useEffect, useCallback } from 'react';
import { TimerState } from '../types';

export const useTimer = (initialTime: number) => {
  const [state, setState] = useState<TimerState>({
    isRunning: false,
    timeRemaining: initialTime,
    totalTime: initialTime,
    isPaused: false,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isRunning && !state.isPaused && state.timeRemaining > 0) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1),
        }));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isRunning, state.isPaused, state.timeRemaining]);

  const start = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resume = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      timeRemaining: prev.totalTime,
    }));
  }, []);

  const setTime = useCallback((time: number) => {
    setState(prev => ({
      ...prev,
      timeRemaining: time,
      totalTime: time,
      isRunning: false,
      isPaused: false,
    }));
  }, []);

  return {
    ...state,
    start,
    pause,
    resume,
    reset,
    setTime,
    isComplete: state.timeRemaining === 0,
    progress: state.totalTime > 0 ? ((state.totalTime - state.timeRemaining) / state.totalTime) * 100 : 0,
  };
};