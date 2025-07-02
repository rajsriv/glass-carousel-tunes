import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song, Playlist } from '@/components/MusicPlayer';
import album1 from '@/assets/album1.jpg';
import album2 from '@/assets/album2.jpg';
import album3 from '@/assets/album3.jpg';

interface MusicContextType {
  songs: Song[];
  playlists: Playlist[];
  currentSongIndex: number;
  isPlaying: boolean;
  currentTime: number;
  isShuffled: boolean;
  favorites: Song[];
  isPlayerCollapsed: boolean;
  setCurrentSongIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setIsShuffled: (shuffled: boolean) => void;
  setFavorites: (favorites: Song[]) => void;
  setIsPlayerCollapsed: (collapsed: boolean) => void;
  toggleFavorite: (songId: string) => void;
  playNext: () => void;
  playPrevious: () => void;
  playSong: (index: number) => void;
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
  },
  {
    id: '4',
    title: 'Cosmic Journey',
    artist: 'Space Sounds',
    album: 'Galaxy',
    albumCover: album1,
    duration: 195,
    isFavorite: true,
    color: '#EC4899'
  },
  {
    id: '5',
    title: 'Digital Rain',
    artist: 'Cyber Collective',
    album: 'Matrix',
    albumCover: album2,
    duration: 267,
    isFavorite: false,
    color: '#10B981'
  }
];

const samplePlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    songs: [sampleSongs[1], sampleSongs[2], sampleSongs[4]],
    cover: album2
  },
  {
    id: '2',
    name: 'Electronic Mix',
    songs: [sampleSongs[0], sampleSongs[3]],
    cover: album1
  },
  {
    id: '3',
    name: 'Focus Music',
    songs: [sampleSongs[2], sampleSongs[4]],
    cover: album3
  }
];

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [songs] = useState<Song[]>(sampleSongs);
  const [playlists] = useState<Playlist[]>(samplePlaylists);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [favorites, setFavorites] = useState<Song[]>(songs.filter(song => song.isFavorite));
  const [isPlayerCollapsed, setIsPlayerCollapsed] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout>();

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            playNext();
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

  const playNext = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(randomIndex);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
    setCurrentTime(0);
  };

  const playPrevious = () => {
    if (currentTime > 5) {
      setCurrentTime(0);
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
      setCurrentTime(0);
    }
  };

  const playSong = (index: number) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const toggleFavorite = (songId: string) => {
    const song = songs.find(s => s.id === songId);
    if (song) {
      song.isFavorite = !song.isFavorite;
      setFavorites(songs.filter(s => s.isFavorite));
    }
  };

  const value: MusicContextType = {
    songs,
    playlists,
    currentSongIndex,
    isPlaying,
    currentTime,
    isShuffled,
    favorites,
    isPlayerCollapsed,
    setCurrentSongIndex,
    setIsPlaying,
    setCurrentTime,
    setIsShuffled,
    setFavorites,
    setIsPlayerCollapsed,
    toggleFavorite,
    playNext,
    playPrevious,
    playSong,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};