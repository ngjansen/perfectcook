import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceControlProps {
  isEnabled: boolean;
  onCommand: (command: string) => void;
  onToggle: (enabled: boolean) => void;
}

export const VoiceControl: React.FC<VoiceControlProps> = ({ 
  isEnabled, 
  onCommand, 
  onToggle 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [lastCommand, setLastCommand] = useState<string>('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setLastCommand(command);
        onCommand(command);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onCommand]);

  const startListening = () => {
    if (recognition && isEnabled) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  if (!recognition) {
    return null; // Voice recognition not supported
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={!isEnabled}
        className={`p-3 rounded-full transition-all duration-200 relative overflow-hidden ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white animate-voice-listening'
            : isEnabled
            ? 'bg-primary-500 hover:bg-primary-600 text-white transform hover:scale-105'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        aria-label={isListening ? 'Stop listening' : 'Start voice command'}
      >
        {/* Listening indicator rings */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
          </>
        )}
        
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {/* Waveform visualization when listening */}
      {isListening && (
        <div className="waveform text-primary-500">
          <div className="waveform-bar h-1"></div>
          <div className="waveform-bar h-2"></div>
          <div className="waveform-bar h-3"></div>
          <div className="waveform-bar h-2"></div>
          <div className="waveform-bar h-1"></div>
        </div>
      )}

      <button
        onClick={() => onToggle(!isEnabled)}
        className={`p-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
          isEnabled
            ? 'bg-primary-100 text-primary-600 hover:bg-primary-200'
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`}
        aria-label="Toggle voice control"
      >
        <Volume2 className="w-4 h-4" />
      </button>

      {lastCommand && (
        <div className="text-xs text-gray-500 max-w-32 truncate animate-fade-in">
          "{lastCommand}"
        </div>
      )}
    </div>
  );
};