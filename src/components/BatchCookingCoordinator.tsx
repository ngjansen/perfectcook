import React, { useState, useEffect } from 'react';
import { Clock, ChefHat, AlertCircle, CheckCircle, Play } from 'lucide-react';
import { formatTime } from '../utils/calculations';

interface CookingStep {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  type: 'prep' | 'cook' | 'rest';
  priority: 'high' | 'medium' | 'low';
  instructions: string;
  isCompleted: boolean;
}

interface BatchCookingCoordinatorProps {
  steps: CookingStep[];
  onUpdateSteps: (steps: CookingStep[]) => void;
  isPremium: boolean;
  onPremiumFeatureClick: (name: string, description: string) => void;
}

export const BatchCookingCoordinator: React.FC<BatchCookingCoordinatorProps> = ({
  steps,
  onUpdateSteps,
  isPremium,
  onPremiumFeatureClick,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Check for step completions and alerts
  useEffect(() => {
    const updatedSteps = steps.map(step => {
      const stepEndTime = step.startTime + step.duration;
      const shouldBeCompleted = currentTime >= stepEndTime;
      
      if (shouldBeCompleted && !step.isCompleted) {
        // Trigger notification for step completion
        return { ...step, isCompleted: true };
      }
      
      return step;
    });
    
    if (JSON.stringify(updatedSteps) !== JSON.stringify(steps)) {
      onUpdateSteps(updatedSteps);
    }
  }, [currentTime, steps, onUpdateSteps]);

  const getActiveSteps = () => {
    return steps.filter(step => {
      const stepStartTime = step.startTime;
      const stepEndTime = step.startTime + step.duration;
      return currentTime >= stepStartTime && currentTime < stepEndTime && !step.isCompleted;
    });
  };

  const getUpcomingSteps = () => {
    return steps.filter(step => currentTime < step.startTime)
      .sort((a, b) => a.startTime - b.startTime)
      .slice(0, 3);
  };

  const getTotalDuration = () => {
    return Math.max(...steps.map(step => step.startTime + step.duration));
  };

  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'prep': return '🔪';
      case 'cook': return '🔥';
      case 'rest': return '⏰';
      default: return '👨‍🍳';
    }
  };

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case 'prep': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cook': return 'bg-red-100 text-red-800 border-red-200';
      case 'rest': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-amber-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  if (!isPremium) {
    return (
      <div className="bg-accent-50 rounded-xl p-6 border border-accent-200 text-center">
        <ChefHat className="w-12 h-12 text-accent-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-accent-800 mb-2">
          Batch Cooking Coordinator
        </h3>
        <p className="text-accent-700 mb-4">
          Coordinate multiple dishes with timeline view and smart scheduling
        </p>
        <button
          onClick={() => onPremiumFeatureClick('Batch Cooking Coordinator', 'Timeline view for cooking multiple dishes simultaneously with smart scheduling.')}
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Upgrade to Premium
        </button>
      </div>
    );
  }

  const activeSteps = getActiveSteps();
  const upcomingSteps = getUpcomingSteps();
  const totalDuration = getTotalDuration();
  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-warm-800">
            Batch Cooking Coordinator
          </h3>
          <p className="text-sm text-warm-600">
            Timeline: {formatTime(currentTime)} / {formatTime(totalDuration)}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-colors"
          >
            {showTimeline ? 'Hide' : 'Show'} Timeline
          </button>
          
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? 'Pause' : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-500 to-accent-500 h-full transition-all duration-1000"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Active Steps */}
      {activeSteps.length > 0 && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Active Now ({activeSteps.length})
          </h4>
          
          <div className="space-y-3">
            {activeSteps.map(step => {
              const timeRemaining = (step.startTime + step.duration) - currentTime;
              
              return (
                <div
                  key={step.id}
                  className={`bg-white rounded-lg p-4 border-l-4 ${getPriorityColor(step.priority)} animate-pulse`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getStepTypeIcon(step.type)}</span>
                      <div>
                        <h5 className="font-semibold text-warm-800">{step.name}</h5>
                        <p className="text-sm text-warm-600">{step.instructions}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-red-600">
                        {formatTime(timeRemaining)}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${getStepTypeColor(step.type)}`}>
                        {step.type}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Steps */}
      {upcomingSteps.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Coming Up
          </h4>
          
          <div className="space-y-2">
            {upcomingSteps.map(step => {
              const timeUntilStart = step.startTime - currentTime;
              
              return (
                <div
                  key={step.id}
                  className="bg-white rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getStepTypeIcon(step.type)}</span>
                    <div>
                      <h6 className="font-medium text-warm-800">{step.name}</h6>
                      <p className="text-xs text-warm-600">{step.instructions}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">
                      in {formatTime(timeUntilStart)}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full border ${getStepTypeColor(step.type)}`}>
                      {step.type}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline View */}
      {showTimeline && (
        <div className="bg-white rounded-xl p-4 border border-primary-200">
          <h4 className="font-semibold text-warm-800 mb-4">Timeline View</h4>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300" />
            
            <div className="space-y-4">
              {steps
                .sort((a, b) => a.startTime - b.startTime)
                .map((step, index) => {
                  const isActive = currentTime >= step.startTime && currentTime < step.startTime + step.duration;
                  const isPast = currentTime >= step.startTime + step.duration;
                  
                  return (
                    <div key={step.id} className="relative flex items-center gap-4">
                      {/* Timeline dot */}
                      <div className={`w-3 h-3 rounded-full border-2 z-10 ${
                        isPast ? 'bg-green-500 border-green-500' :
                        isActive ? 'bg-red-500 border-red-500 animate-pulse' :
                        'bg-white border-gray-300'
                      }`} />
                      
                      <div className={`flex-1 p-3 rounded-lg border ${
                        isActive ? 'bg-red-50 border-red-200' :
                        isPast ? 'bg-green-50 border-green-200' :
                        'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{getStepTypeIcon(step.type)}</span>
                            <div>
                              <h6 className="font-medium text-warm-800">{step.name}</h6>
                              <p className="text-sm text-warm-600">{step.instructions}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {formatTime(step.startTime)} - {formatTime(step.startTime + step.duration)}
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full border ${getStepTypeColor(step.type)}`}>
                              {step.type} • {formatTime(step.duration)}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {isPast && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {steps.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-warm-800 mb-2">
            No Cooking Steps
          </h4>
          <p className="text-warm-600">
            Add multiple cooking steps to coordinate your meal preparation
          </p>
        </div>
      )}
    </div>
  );
};