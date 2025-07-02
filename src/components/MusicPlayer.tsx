import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { CircularCarousel } from './CircularCarousel';
import { PlaylistPanel } from './PlaylistPanel';
import { FavoritesPanel } from './FavoritesPanel';
import { useToast } from '@/hooks/use-toast';
import album1 from '@/assets/album1.jpg';
import album2 from '@/assets/album2.jpg';
import album3 from '@/assets/album3.jpg';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  duration: number;
  isFavorite: boolean;
  color: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  cover: string;
}

const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Synthwave Artist',
    album: 'Electric Nights',
    albumCover: album1,
    duration: 245,
    isFavorite: false,
    color: '#8B5CF6'
  },
  {
    id: '2',
    title: 'Ocean Waves',
    artist: 'Ambient Collective',
    album: 'Deep Blue',
    albumCover: album2,
    duration: 320,
    isFavorite: true,
    color: '#06B6D4'
  },
  {
    id: '3',
    title: 'Sunset Meditation',
    artist: 'Peaceful Sounds',
    album: 'Golden Hour',
    albumCover: album3,
    duration: 280,
    isFavorite: false,
    color: '#F97316'
  }
];

const samplePlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    songs: sampleSongs,
    cover: album2
  },
  {
    id: '2',
    name: 'Electronic Mix',
    songs: [sampleSongs[0], sampleSongs[2]],
    cover: album1
  }
];

export const MusicPlayer: React.FC = () => {
  const [songs] = useState<Song[]>(sampleSongs);
  const [playlists, setPlaylists] = useState<Playlist[]>(samplePlaylists);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Song[]>(songs.filter(song => song.isFavorite));
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSong.duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Paused" : "Now Playing",
      description: `${currentSong.title} by ${currentSong.artist}`,
    });
  };

  const handleNext = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(randomIndex);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    if (currentTime > 5) {
      setCurrentTime(0);
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
      setCurrentTime(0);
    }
  };

  const handleSongSelect = (index: number) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
  };

  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const toggleFavorite = (songId: string) => {
    const song = songs.find(s => s.id === songId);
    if (song) {
      song.isFavorite = !song.isFavorite;
      setFavorites(songs.filter(s => s.isFavorite));
      toast({
        title: song.isFavorite ? "Added to Favorites" : "Removed from Favorites",
        description: song.title,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 noise-background opacity-30"
        style={{
          background: `linear-gradient(45deg, ${currentSong.color}15, ${currentSong.color}25, ${currentSong.color}10)`
        }}
      />
      
      {/* Main Player Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        
        {/* Circular Carousel */}
        <div className="mb-8">
          <CircularCarousel 
            songs={songs}
            currentIndex={currentSongIndex}
            onSongSelect={handleSongSelect}
            isPlaying={isPlaying}
          />
        </div>

        {/* Song Info */}
        <div className="glass-panel rounded-2xl p-6 mb-6 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-2 text-shadow">
            {currentSong.title}
          </h2>
          <p className="text-muted-foreground text-lg mb-4">
            {currentSong.artist}
          </p>
          <p className="text-sm text-muted-foreground">
            {currentSong.album}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="glass-panel rounded-xl p-4 mb-6 w-full max-w-md">
          <Slider
            value={[currentTime]}
            max={currentSong.duration}
            step={1}
            onValueChange={handleTimeChange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="glass-panel rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsShuffled(!isShuffled)}
              className={`glass-button rounded-full ${isShuffled ? 'glow-primary' : ''}`}
            >
              <Shuffle className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={handlePrevious}
              className="glass-button rounded-full"
            >
              <SkipBack className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={handlePlayPause}
              className="glass-button rounded-full p-4 glow-primary pulse-glow"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={handleNext}
              className="glass-button rounded-full"
            >
              <SkipForward className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setShowFavorites(!showFavorites)}
              className="glass-button rounded-full"
            >
              <Music className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button
            variant="ghost"
            onClick={() => setShowPlaylists(!showPlaylists)}
            className="glass-button rounded-lg"
          >
            Playlists
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowFavorites(!showFavorites)}
            className="glass-button rounded-lg"
          >
            Favorites ({favorites.length})
          </Button>
        </div>
      </div>

      {/* Side Panels */}
      {showPlaylists && (
        <PlaylistPanel
          playlists={playlists}
          onClose={() => setShowPlaylists(false)}
          onPlaylistSelect={(playlist) => {
            // Handle playlist selection
            toast({
              title: "Playlist Selected",
              description: playlist.name,
            });
          }}
        />
      )}

      {showFavorites && (
        <FavoritesPanel
          favorites={favorites}
          onClose={() => setShowFavorites(false)}
          onSongSelect={(song) => {
            const index = songs.findIndex(s => s.id === song.id);
            if (index !== -1) handleSongSelect(index);
          }}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};