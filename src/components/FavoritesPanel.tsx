import React from 'react';
import { X, Play, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Song } from './MusicPlayer';

interface FavoritesPanelProps {
  favorites: Song[];
  onClose: () => void;
  onSongSelect: (song: Song) => void;
  onToggleFavorite: (songId: string) => void;
}

export const FavoritesPanel: React.FC<FavoritesPanelProps> = ({
  favorites,
  onClose,
  onSongSelect,
  onToggleFavorite
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-y-0 left-0 w-96 glass-panel border-r border-white/20 z-50 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 glass-panel rounded-full">
            <Music className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Favorites</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="glass-button rounded-full p-2"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Favorites Count */}
      <div className="glass-card rounded-lg p-3 mb-6">
        <p className="text-sm text-muted-foreground text-center">
          {favorites.length} favorite song{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Favorites List */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 glass-panel rounded-full mb-4">
            <Music className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No favorite songs yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Heart songs to add them here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((song, index) => (
            <div
              key={song.id}
              className="glass-card rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                {/* Song Cover */}
                <div className="w-12 h-12 rounded-lg overflow-hidden glass-panel relative">
                  <img
                    src={song.albumCover}
                    alt={song.album}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSongSelect(song);
                      }}
                    >
                      <Play className="h-3 w-3 text-white" />
                    </Button>
                  </div>
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {song.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {song.artist}
                  </p>
                  <p className="text-xs text-muted-foreground opacity-60 truncate">
                    {song.album}
                  </p>
                </div>

                {/* Duration */}
                <div className="text-xs text-muted-foreground">
                  {formatDuration(song.duration)}
                </div>

                {/* Remove from Favorites */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass-button rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(song.id);
                  }}
                >
                  <Music className="h-4 w-4 text-primary" />
                </Button>
              </div>

              {/* Color indicator */}
              <div 
                className="w-full h-1 rounded-full mt-3 opacity-60"
                style={{ background: song.color }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Play All Button */}
      {favorites.length > 0 && (
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full glass-button border-white/30 hover:bg-white/10"
            onClick={() => {
              if (favorites.length > 0) {
                onSongSelect(favorites[0]);
              }
            }}
          >
            <Play className="h-4 w-4 mr-2" />
            Play All Favorites
          </Button>
        </div>
      )}
    </div>
  );
};