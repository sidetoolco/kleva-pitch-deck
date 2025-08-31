import React, { useState, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Maximize, 
  Minimize,
  Volume2,
  VolumeX,
  Settings,
  Download
} from 'lucide-react';

interface PresentationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (slide: number) => void;
  onExport?: () => void;
  className?: string;
}

/**
 * Presentation control panel with autoplay, fullscreen, and navigation
 */
export const PresentationControls: React.FC<PresentationControlsProps> = ({
  currentSlide,
  totalSlides,
  onNavigate,
  onExport,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState(5000);

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        onNavigate(currentSlide + 1);
      } else {
        setIsPlaying(false);
      }
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, totalSlides, onNavigate, autoplaySpeed]);

  // Fullscreen handling
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === ' ' && e.shiftKey) {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleFullscreen]);

  const handlePrevious = () => {
    if (currentSlide > 0) {
      onNavigate(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      onNavigate(currentSlide + 1);
    }
  };

  const handleSlideSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onNavigate(Number(e.target.value));
  };

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 ${className}`}>
      <div className="bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2 flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={handlePrevious}
          disabled={currentSlide === 0}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous slide"
        >
          <SkipBack size={20} />
        </button>

        {/* Play/Pause button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next slide"
        >
          <SkipForward size={20} />
        </button>

        {/* Slide selector */}
        <select
          value={currentSlide}
          onChange={handleSlideSelect}
          className="px-3 py-1 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Select slide"
        >
          {Array.from({ length: totalSlides }, (_, i) => (
            <option key={i} value={i}>
              Slide {i + 1}
            </option>
          ))}
        </select>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Volume control */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>

        {/* Settings */}
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
          
          {showSettings && (
            <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
              <h3 className="font-semibold mb-3">Presentation Settings</h3>
              
              <div className="mb-3">
                <label className="text-sm text-gray-600 block mb-1">
                  Autoplay Speed
                </label>
                <input
                  type="range"
                  min="2000"
                  max="10000"
                  step="1000"
                  value={autoplaySpeed}
                  onChange={(e) => setAutoplaySpeed(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2s</span>
                  <span>{autoplaySpeed / 1000}s</span>
                  <span>10s</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p><kbd>F</kbd> - Fullscreen</p>
                <p><kbd>Shift + Space</kbd> - Play/Pause</p>
                <p><kbd>M</kbd> - Mute/Unmute</p>
              </div>
            </div>
          )}
        </div>

        {/* Export button */}
        {onExport && (
          <>
            <div className="w-px h-6 bg-gray-300 mx-2" />
            <button
              onClick={onExport}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Export presentation"
            >
              <Download size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * Minimal presenter view with notes
 */
export const PresenterView: React.FC<{
  currentSlide: number;
  notes?: string;
  nextSlidePreview?: React.ReactNode;
  elapsedTime: number;
  className?: string;
}> = ({
  currentSlide,
  notes,
  nextSlidePreview,
  elapsedTime,
  className = '',
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-black text-white p-6 rounded-lg ${className}`}>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-400">Current Slide</h3>
          <div className="text-3xl font-bold mb-4">{currentSlide + 1}</div>
          
          {notes && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-400">Notes</h3>
              <p className="text-sm leading-relaxed">{notes}</p>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-400">Next Slide</h3>
          {nextSlidePreview && (
            <div className="bg-white rounded-lg p-4 text-black text-xs">
              {nextSlidePreview}
            </div>
          )}
          
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-400">Elapsed Time</h3>
            <div className="text-2xl font-mono">{formatTime(elapsedTime)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};