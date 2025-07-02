import React, { useState, useEffect } from 'react';
import { Song } from './MusicPlayer';

interface CircularCarouselProps {
  songs: Song[];
  currentIndex: number;
  onSongSelect: (index: number) => void;
  isPlaying: boolean;
}

export const CircularCarousel: React.FC<CircularCarouselProps> = ({
  songs,
  currentIndex,
  onSongSelect,
  isPlaying
}) => {
  const [rotation, setRotation] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const radius = 120;
  const angleStep = (2 * Math.PI) / songs.length;

  useEffect(() => {
    const targetRotation = -currentIndex * (360 / songs.length);
    setRotation(targetRotation);
  }, [currentIndex, songs.length]);

  const getItemPosition = (index: number) => {
    const angle = index * angleStep + (rotation * Math.PI) / 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const scale = index === currentIndex ? 1.2 : 0.8;
    const zIndex = index === currentIndex ? 10 : 1;
    const opacity = index === currentIndex ? 1 : 0.7;
    
    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      zIndex,
      opacity: hoveredIndex === index ? 1 : opacity,
    };
  };

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Center Circle */}
      <div className="absolute w-16 h-16 glass-panel rounded-full flex items-center justify-center glow-primary">
        <div className={`w-8 h-8 rounded-full bg-primary ${isPlaying ? 'animate-pulse' : ''}`} />
      </div>

      {/* Carousel Items */}
      <div 
        className="relative w-full h-full transition-transform duration-700 ease-smooth"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="absolute w-20 h-20 cursor-pointer transition-all duration-500 ease-bounce"
            style={{
              ...getItemPosition(index),
              left: '50%',
              top: '50%',
              marginLeft: '-40px',
              marginTop: '-40px',
            }}
            onClick={() => onSongSelect(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div 
              className={`w-full h-full rounded-full glass-card overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? 'border-primary glow-primary' 
                  : 'border-white/20'
              }`}
              style={{
                transform: `rotate(${-rotation}deg)`,
              }}
            >
              <img
                src={song.albumCover}
                alt={song.album}
                className={`w-full h-full object-cover ${
                  index === currentIndex && isPlaying ? 'vinyl-spin' : ''
                }`}
              />
              
              {/* Vinyl Record Effect */}
              {index === currentIndex && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-black/30 rounded-full" />
                  <div className="absolute w-2 h-2 bg-black/50 rounded-full" />
                </div>
              )}
            </div>
            
            {/* Song Title Tooltip */}
            {hoveredIndex === index && (
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 glass-panel px-3 py-1 rounded-lg">
                <p className="text-xs text-foreground whitespace-nowrap">
                  {song.title}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Corner Hinged Slider */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24">
        <div 
          className="w-full h-full glass-panel rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 flex items-center justify-center"
          onClick={() => onSongSelect((currentIndex + 1) % songs.length)}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full opacity-80" />
          </div>
        </div>
      </div>

      {/* Left Corner Slider */}
      <div className="absolute -bottom-6 -left-6 w-24 h-24">
        <div 
          className="w-full h-full glass-panel rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 flex items-center justify-center"
          onClick={() => onSongSelect((currentIndex - 1 + songs.length) % songs.length)}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};