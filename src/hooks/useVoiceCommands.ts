import { useCallback } from 'react';

interface VoiceCommandsProps {
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onResumeTimer: () => void;
  onResetTimer: () => void;
  onAddTime: (minutes: number) => void;
}

export const useVoiceCommands = ({
  onStartTimer,
  onPauseTimer,
  onResumeTimer,
  onResetTimer,
  onAddTime,
}: VoiceCommandsProps) => {
  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Start timer commands
    if (lowerCommand.includes('start timer') || lowerCommand.includes('begin cooking')) {
      onStartTimer();
      return `Starting timer`;
    }
    
    // Pause timer commands
    if (lowerCommand.includes('pause timer') || lowerCommand.includes('stop timer')) {
      onPauseTimer();
      return `Timer paused`;
    }
    
    // Resume timer commands
    if (lowerCommand.includes('resume timer') || lowerCommand.includes('continue timer')) {
      onResumeTimer();
      return `Timer resumed`;
    }
    
    // Reset timer commands
    if (lowerCommand.includes('reset timer') || lowerCommand.includes('restart timer')) {
      onResetTimer();
      return `Timer reset`;
    }
    
    // Add time commands
    const addTimeMatch = lowerCommand.match(/add (\d+) minute[s]?/);
    if (addTimeMatch) {
      const minutes = parseInt(addTimeMatch[1]);
      onAddTime(minutes);
      return `Added ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    
    // Quick add time commands
    if (lowerCommand.includes('add one minute')) {
      onAddTime(1);
      return `Added 1 minute`;
    }
    
    if (lowerCommand.includes('add two minutes')) {
      onAddTime(2);
      return `Added 2 minutes`;
    }
    
    if (lowerCommand.includes('add five minutes')) {
      onAddTime(5);
      return `Added 5 minutes`;
    }
    
    return `Command not recognized: "${command}"`;
  }, [onStartTimer, onPauseTimer, onResumeTimer, onResetTimer, onAddTime]);

  return { processCommand };
};