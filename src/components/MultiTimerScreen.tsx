import React, { useState } from 'react';
import { Plus, Play, Pause, Trash2, AlertCircle, GripVertical } from 'lucide-react';
import { Navigation } from './Navigation';
import { MultiTimer } from '../types';
import { formatTime } from '../utils/calculations';

interface MultiTimerScreenProps {
  timers: MultiTimer[];
  onBack: () => void;
  onAddTimer: () => void;
  onStartTimer: (id: string) => void;
  onPauseTimer: (id: string) => void;
  onDeleteTimer: (id: string) => void;
}

export const MultiTimerScreen: React.FC<MultiTimerScreenProps> = ({
  timers,
  onBack,
  onAddTimer,
  onStartTimer,
  onPauseTimer,
  onDeleteTimer,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerTime, setNewTimerTime] = useState(300); // 5 minutes default
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);

  const handleAddTimer = () => {
    if (newTimerName.trim()) {
      // This would be handled by parent component
      onAddTimer();
      setNewTimerName('');
      setNewTimerTime(300);
      setShowAddForm(false);
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-red-300 bg-red-50';
      case 'medium': return 'border-accent-300 bg-accent-50';
      case 'low': return 'border-primary-300 bg-primary-50';
    }
  };

  const getTimeColor = (timeRemaining: number) => {
    if (timeRemaining <= 30) return 'text-red-600';
    if (timeRemaining <= 120) return 'text-accent-600';
    return 'text-primary-600';
  };

  const getTimerStateClass = (timer: MultiTimer) => {
    if (timer.timeRemaining === 0) return 'timer-completed';
    if (timer.isPaused) return 'timer-paused';
    if (timer.isRunning) return 'timer-running';
    return '';
  };

  const handleDragStart = (e: React.DragEvent, timerId: string) => {
    setDraggedItem(timerId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, timerId: string) => {
    e.preventDefault();
    setDragOverItem(timerId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetId) {
      // Handle reordering logic here
      console.log(`Move timer ${draggedItem} to position of ${targetId}`);
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return (
    <div className="min-h-screen bg-primary-50 animate-fade-in">
      <Navigation onBack={onBack} title="Multi-Timer" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 animate-fade-in">
          <div>
            <h2 className="text-xl font-semibold text-warm-800">
              Active Timers ({timers.length})
            </h2>
            <p className="text-warm-600 text-sm">
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

        {/* Enhanced Add Timer Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl p-6 mb-6 border border-primary-200 animate-pop-in">
            <h3 className="font-semibold text-warm-800 mb-4">Add New Timer</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Timer Name
                </label>
                <input
                  type="text"
                  value={newTimerName}
                  onChange={(e) => setNewTimerName(e.target.value)}
                  placeholder="e.g., Pasta, Vegetables, Sauce"
                  className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Time (minutes)
                </label>
                <input
                  type="number"
                  value={Math.round(newTimerTime / 60)}
                  onChange={(e) => setNewTimerTime(Number(e.target.value) * 60)}
                  min="1"
                  max="120"
                  className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTimer}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Add Timer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Timer List with Drag and Drop */}
        <div className="space-y-4">
          {timers.map((timer, index) => (
            <div
              key={timer.id}
              draggable
              onDragStart={(e) => handleDragStart(e, timer.id)}
              onDragOver={(e) => handleDragOver(e, timer.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, timer.id)}
              className={`rounded-2xl p-5 border-2 transition-all duration-200 cursor-move draggable ${
                getTimerStateClass(timer)
              } ${getPriorityColor(timer.priority)} ${
                dragOverItem === timer.id ? 'drop-zone drag-over' : ''
              } ${
                draggedItem === timer.id ? 'dragging' : ''
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-warm-800">
                      {timer.foodName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-warm-600">
                      <span>Priority: {timer.priority}</span>
                      {timer.priority === 'high' && (
                        <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onDeleteTimer(timer.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95"
                  aria-label="Delete timer"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className={`text-2xl font-bold transition-all duration-300 ${
                  getTimeColor(timer.timeRemaining)
                } ${
                  timer.timeRemaining <= 30 && timer.isRunning && !timer.isPaused ? 'animate-pulse' : ''
                }`}>
                  {formatTime(timer.timeRemaining)}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-xs text-warm-500">
                    {Math.round((timer.totalTime - timer.timeRemaining) / timer.totalTime * 100)}%
                  </div>
                  
                  <button
                    onClick={() => timer.isRunning && !timer.isPaused 
                      ? onPauseTimer(timer.id) 
                      : onStartTimer(timer.id)
                    }
                    className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                      timer.isRunning && !timer.isPaused
                        ? 'bg-accent-500 hover:bg-accent-600 text-white'
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

              {/* Enhanced Progress Bar */}
              <div className="bg-white/50 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    timer.priority === 'high' ? 'bg-red-500' :
                    timer.priority === 'medium' ? 'bg-accent-500' : 'bg-primary-500'
                  } ${
                    timer.isRunning && !timer.isPaused ? 'animate-pulse' : ''
                  }`}
                  style={{
                    width: `${((timer.totalTime - timer.timeRemaining) / timer.totalTime) * 100}%`
                  }}
                />
              </div>

              {/* Timer state indicator */}
              {timer.timeRemaining <= 30 && timer.isRunning && !timer.isPaused && (
                <div className="mt-2 text-xs text-red-600 font-medium animate-pulse">
                  🔥 Almost done!
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {timers.length === 0 && !showAddForm && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-bounce">
              <Plus className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-warm-800 mb-2">
              No Active Timers
            </h3>
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
      </div>
    </div>
  );
};