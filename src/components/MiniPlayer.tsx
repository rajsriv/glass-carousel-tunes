import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Music,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMusicContext } from '@/contexts/MusicContext';

export const MiniPlayer: React.FC = () => {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    currentTime,
    isShuffled,
    isPlayerCollapsed,
    setIsPlaying,
    setCurrentTime,
    setIsShuffled,
    setIsPlayerCollapsed,
    playNext,
    playPrevious,
    toggleFavorite
  } = useMusicContext();

  const currentSong = songs[currentSongIndex];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Collapsed State */}
      {isPlayerCollapsed && (
        <div className="glass-panel border-t border-white/20 p-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Song Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <img
                src={currentSong.albumCover}
                alt={currentSong.album}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {currentSong.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentSong.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(currentSong.id)}
                className="glass-button rounded-full p-2"
              >
                <Music className={`h-4 w-4 ${currentSong.isFavorite ? 'text-primary' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={playPrevious}
                className="glass-button rounded-full p-2"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="glass-button rounded-full p-2"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={playNext}
                className="glass-button rounded-full p-2"
              >
                <SkipForward className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlayerCollapsed(false)}
                className="glass-button rounded-full p-2 ml-2"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mini Progress Bar */}
          <div className="mt-2">
            <Slider
              value={[currentTime]}
              max={currentSong.duration}
              step={1}
              onValueChange={handleTimeChange}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Expanded State */}
      {!isPlayerCollapsed && (
        <div className="glass-panel border-t border-white/20 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Collapse Button */}
            <div className="flex justify-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlayerCollapsed(true)}
                className="glass-button rounded-full p-2"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 items-center">
              {/* Song Info */}
              <div className="flex items-center gap-4">
                <img
                  src={currentSong.albumCover}
                  alt={currentSong.album}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-foreground truncate">
                    {currentSong.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {currentSong.artist}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(currentSong.id)}
                  className="glass-button rounded-full p-2"
                >
                  <Music className={`h-4 w-4 ${currentSong.isFavorite ? 'text-primary' : ''}`} />
                </Button>
              </div>

              {/* Player Controls */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={`glass-button rounded-full p-2 ${isShuffled ? 'text-primary' : ''}`}
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={playPrevious}
                    className="glass-button rounded-full"
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="glass-button rounded-full p-3 glow-primary"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 ml-1" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={playNext}
                    className="glass-button rounded-full"
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {formatTime(currentTime)}
                  </span>
                  <Slider
                    value={[currentTime]}
                    max={currentSong.duration}
                    step={1}
                    onValueChange={handleTimeChange}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-10">
                    {formatTime(currentSong.duration)}
                  </span>
                </div>
              </div>

              {/* Volume & Options */}
              <div className="flex items-center justify-end gap-2">
                <div className="w-24">
                  <Slider
                    defaultValue={[70]}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};