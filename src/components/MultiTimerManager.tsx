import React, { useState, useEffect } from 'react';
import { Plus, Play, Pause, Trash2, AlertCircle, GripVertical, Clock, Star } from 'lucide-react';
import { MultiTimer } from '../types';
import { formatTime } from '../utils/calculations';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { useNotifications } from '../hooks/useNotifications';

interface MultiTimerManagerProps {
  timers: MultiTimer[];
  onUpdateTimers: (timers: MultiTimer[]) => void;
  onAddTimer: (timer: Omit<MultiTimer, 'id'>) => void;
  isPremium: boolean;
  onPremiumFeatureClick: (name: string, description: string) => void;
}

export const MultiTimerManager: React.FC<MultiTimerManagerProps> = ({
  timers,
  onUpdateTimers,
  onAddTimer,
  isPremium,
  onPremiumFeatureClick,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTimer, setNewTimer] = useState({
    name: '',
    minutes: 5,
    priority: 'medium' as 'high' | 'medium' | 'low',
    color: '#FF6B35',
  });
  const { triggerTimerComplete, triggerWarning } = useHapticFeedback();
  const { showNotification } = useNotifications();

  // Timer countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = timers.map(timer => {
        if (timer.isRunning && !timer.isPaused && timer.timeRemaining > 0) {
          const newTimeRemaining = timer.timeRemaining - 1;
          
          // Trigger notifications at key intervals
          if (newTimeRemaining === 30 && timer.priority === 'high') {
            triggerWarning();
            showNotification(`${timer.name} - 30 seconds!`, 'High priority timer almost complete');
          } else if (newTimeRemaining === 0) {
            triggerTimerComplete();
            showNotification(`${timer.name} Complete!`, 'Timer has finished');
          }
          
          return { ...timer, timeRemaining: newTimeRemaining };
        }
        return timer;
      });
      
      if (JSON.stringify(updatedTimers) !== JSON.stringify(timers)) {
        onUpdateTimers(updatedTimers);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timers, onUpdateTimers, triggerTimerComplete, triggerWarning, showNotification]);

  const handleAddTimer = () => {
    if (!isPremium && timers.length >= 2) {
      onPremiumFeatureClick('Unlimited Multi-Timers', 'Run unlimited timers simultaneously with priority management.');
      return;
    }

    if (newTimer.name.trim()) {
      onAddTimer({
        name: newTimer.name,
        timeRemaining: newTimer.minutes * 60,
        totalTime: newTimer.minutes * 60,
        isRunning: false,
        isPaused: false,
        priority: newTimer.priority,
        color: newTimer.color,
      });
      setNewTimer({ name: '', minutes: 5, priority: 'medium', color: '#FF6B35' });
      setShowAddForm(false);
    }
  };

  const handleTimerAction = (id: string, action: 'start' | 'pause' | 'resume' | 'delete') => {
    const updatedTimers = timers.map(timer => {
      if (timer.id === id) {
        switch (action) {
          case 'start':
            return { ...timer, isRunning: true, isPaused: false };
          case 'pause':
            return { ...timer, isPaused: true };
          case 'resume':
            return { ...timer, isPaused: false };
          default:
            return timer;
        }
      }
      return timer;
    }).filter(timer => action !== 'delete' || timer.id !== id);

    onUpdateTimers(updatedTimers);
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-red-300 bg-red-50';
      case 'medium': return 'border-amber-300 bg-amber-50';
      case 'low': return 'border-green-300 bg-green-50';
    }
  };

  const getTimeColor = (timeRemaining: number, priority: string) => {
    if (timeRemaining <= 30) return 'text-red-600';
    if (timeRemaining <= 120 && priority === 'high') return 'text-amber-600';
    return 'text-primary-600';
  };

  const colors = [
    '#FF6B35', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#06B6D4', '#84CC16'
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-warm-800">
            Multi-Timer ({timers.length}{!isPremium && '/2'})
          </h3>
          <p className="text-sm text-warm-600">
            Coordinate multiple cooking tasks
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Timer
        </button>
      </div>

      {/* Add Timer Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-pop-in">
          <h4 className="font-semibold text-warm-800 mb-4">Add New Timer</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">
                Timer Name
              </label>
              <input
                type="text"
                value={newTimer.name}
                onChange={(e) => setNewTimer(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Pasta, Vegetables, Sauce"
                className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Time (minutes)
                </label>
                <input
                  type="number"
                  value={newTimer.minutes}
                  onChange={(e) => setNewTimer(prev => ({ ...prev, minutes: Number(e.target.value) }))}
                  min="1"
                  max="120"
                  className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Priority
                </label>
                <select
                  value={newTimer.priority}
                  onChange={(e) => setNewTimer(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">
                Color
              </label>
              <div className="flex gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setNewTimer(prev => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      newTimer.color === color ? 'border-gray-400 scale-110' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTimer}
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-medium transition-all duration-200"
              >
                Add Timer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timer List */}
      <div className="space-y-3">
        {timers.map((timer, index) => (
          <div
            key={timer.id}
            className={`rounded-2xl p-4 border-2 transition-all duration-200 ${
              getPriorityColor(timer.priority)
            } ${
              timer.timeRemaining <= 30 && timer.isRunning && !timer.isPaused ? 'animate-pulse' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: timer.color }}
                />
                <div>
                  <h4 className="font-semibold text-warm-800">{timer.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-warm-600">
                    <span>Priority: {timer.priority}</span>
                    {timer.priority === 'high' && timer.timeRemaining <= 60 && (
                      <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
                    )}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleTimerAction(timer.id, 'delete')}
                className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className={`text-2xl font-bold transition-all duration-300 ${
                getTimeColor(timer.timeRemaining, timer.priority)
              }`}>
                {formatTime(timer.timeRemaining)}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-xs text-warm-500">
                  {Math.round((timer.totalTime - timer.timeRemaining) / timer.totalTime * 100)}%
                </div>
                
                <button
                  onClick={() => handleTimerAction(
                    timer.id, 
                    timer.isRunning && !timer.isPaused ? 'pause' : 
                    timer.isPaused ? 'resume' : 'start'
                  )}
                  className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                    timer.isRunning && !timer.isPaused
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  {timer.isRunning && !timer.isPaused ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/50 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000`}
                style={{
                  width: `${((timer.totalTime - timer.timeRemaining) / timer.totalTime) * 100}%`,
                  backgroundColor: timer.color
                }}
              />
            </div>

            {/* Status indicators */}
            {timer.timeRemaining <= 30 && timer.isRunning && !timer.isPaused && (
              <div className="mt-2 text-xs text-red-600 font-medium animate-pulse">
                🔥 Almost done!
              </div>
            )}
            
            {timer.isPaused && (
              <div className="mt-2 text-xs text-amber-600 font-medium">
                ⏸️ Paused
              </div>
            )}
            
            {timer.timeRemaining === 0 && (
              <div className="mt-2 text-xs text-green-600 font-medium">
                ✅ Complete!
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {timers.length === 0 && !showAddForm && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-bounce">
            <Clock className="w-8 h-8 text-primary-600" />
          </div>
          <h4 className="text-lg font-semibold text-warm-800 mb-2">
            No Active Timers
          </h4>
          <p className="text-warm-600 mb-6">
            Add multiple timers to coordinate complex meals
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Add Your First Timer
          </button>
        </div>
      )}

      {/* Premium Limit Notice */}
      {!isPremium && timers.length >= 2 && (
        <div className="bg-accent-50 rounded-xl p-4 border border-accent-200">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-accent-600" />
            <div>
              <h4 className="font-medium text-accent-800">Premium Feature</h4>
              <p className="text-sm text-accent-700">
                Upgrade to run unlimited timers simultaneously
              </p>
            </div>
            <button
              onClick={() => onPremiumFeatureClick('Unlimited Multi-Timers', 'Run unlimited timers simultaneously with priority management.')}
              className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
    </div>
  );
};