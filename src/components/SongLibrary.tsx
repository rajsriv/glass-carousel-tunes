import React from 'react';
import { Play, Pause, Music, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMusicContext } from '@/contexts/MusicContext';

export const SongLibrary: React.FC = () => {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    playSong,
    toggleFavorite
  } = useMusicContext();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Library</h1>
        <p className="text-muted-foreground">
          {songs.length} songs in your collection
        </p>
      </div>

      {/* Songs Table */}
      <div className="glass-card rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-sm text-muted-foreground font-medium">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Title</div>
          <div className="col-span-3">Album</div>
          <div className="col-span-2">Artist</div>
          <div className="col-span-1 flex justify-center">
            <Clock className="h-4 w-4" />
          </div>
        </div>

        {/* Songs List */}
        <div className="divide-y divide-white/5">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className={`grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors group cursor-pointer ${
                currentSongIndex === index ? 'bg-white/10' : ''
              }`}
              onClick={() => playSong(index)}
            >
              {/* Track Number / Play Button */}
              <div className="col-span-1 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  {currentSongIndex === index && isPlaying ? (
                    <div className="w-4 h-4 bg-primary rounded animate-pulse" />
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground group-hover:hidden">
                        {index + 1}
                      </span>
                      <Play className="h-4 w-4 hidden group-hover:block text-foreground" />
                    </>
                  )}
                </div>
              </div>

              {/* Title & Album Cover */}
              <div className="col-span-5 flex items-center gap-3">
                <img
                  src={song.albumCover}
                  alt={song.album}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    currentSongIndex === index ? 'text-primary' : 'text-foreground'
                  }`}>
                    {song.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {song.artist}
                  </p>
                </div>
              </div>

              {/* Album */}
              <div className="col-span-3 flex items-center">
                <p className="text-sm text-muted-foreground truncate">
                  {song.album}
                </p>
              </div>

              {/* Artist */}
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-muted-foreground truncate">
                  {song.artist}
                </p>
              </div>

              {/* Duration & Actions */}
              <div className="col-span-1 flex items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(song.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                >
                  <Music className={`h-4 w-4 ${song.isFavorite ? 'text-primary' : 'text-muted-foreground'}`} />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {formatDuration(song.duration)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};