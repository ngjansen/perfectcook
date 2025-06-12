import React, { useState } from 'react';
import { Mic, Volume2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface VoiceCommandsHelpProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const VoiceCommandsHelp: React.FC<VoiceCommandsHelpProps> = ({
  isEnabled,
  onToggle,
}) => {
  const [showCommands, setShowCommands] = useState(false);

  const voiceCommands = [
    {
      category: 'Timer Control',
      commands: [
        { phrase: '"Start timer"', action: 'Begin cooking timer' },
        { phrase: '"Pause timer"', action: 'Pause current timer' },
        { phrase: '"Resume timer"', action: 'Resume paused timer' },
        { phrase: '"Reset timer"', action: 'Reset to original time' },
        { phrase: '"Stop timer"', action: 'Stop and reset timer' },
      ]
    },
    {
      category: 'Time Adjustments',
      commands: [
        { phrase: '"Add 2 minutes"', action: 'Extend cooking time by 2 minutes' },
        { phrase: '"Add 5 minutes"', action: 'Extend cooking time by 5 minutes' },
        { phrase: '"Add one minute"', action: 'Extend cooking time by 1 minute' },
        { phrase: '"Subtract 1 minute"', action: 'Reduce cooking time by 1 minute' },
      ]
    },
    {
      category: 'Navigation',
      commands: [
        { phrase: '"Go back"', action: 'Navigate to previous screen' },
        { phrase: '"Go home"', action: 'Return to main screen' },
        { phrase: '"Show favorites"', action: 'Open favorites list' },
        { phrase: '"Open settings"', action: 'Access app settings' },
      ]
    },
    {
      category: 'Information',
      commands: [
        { phrase: '"How much time left?"', action: 'Announce remaining time' },
        { phrase: '"What\'s cooking?"', action: 'Announce current food and texture' },
        { phrase: '"Read instructions"', action: 'Read cooking tips aloud' },
        { phrase: '"Help"', action: 'Show voice command help' },
      ]
    }
  ];

  return (
    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isEnabled ? 'bg-blue-500' : 'bg-gray-400'}`}>
            <Mic className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800">Voice Commands</h3>
            <p className="text-sm text-blue-600">
              {isEnabled ? 'Voice control is active' : 'Voice control is disabled'}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => onToggle(!isEnabled)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            isEnabled ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              isEnabled ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {isEnabled && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <Volume2 className="w-4 h-4" />
            <span>Say "Hey Timer" followed by a command</span>
          </div>
          
          <button
            onClick={() => setShowCommands(!showCommands)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <HelpCircle className="w-4 h-4" />
            {showCommands ? 'Hide' : 'Show'} available commands
            {showCommands ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {showCommands && (
            <div className="bg-white rounded-lg p-4 border border-blue-200 animate-fade-in">
              <div className="space-y-4">
                {voiceCommands.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-blue-800 mb-2">{category.category}</h4>
                    <div className="space-y-1">
                      {category.commands.map((command, cmdIndex) => (
                        <div key={cmdIndex} className="flex items-center justify-between text-sm">
                          <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {command.phrase}
                          </code>
                          <span className="text-blue-600 text-xs">{command.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-1">Tips for Better Recognition:</h5>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Speak clearly and at normal pace</li>
                  <li>• Use exact phrases shown above</li>
                  <li>• Ensure microphone permissions are enabled</li>
                  <li>• Minimize background noise</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};