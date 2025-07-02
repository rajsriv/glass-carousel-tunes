import React from 'react';
import { X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Playlist } from './MusicPlayer';

interface PlaylistPanelProps {
  playlists: Playlist[];
  onClose: () => void;
  onPlaylistSelect: (playlist: Playlist) => void;
}

export const PlaylistPanel: React.FC<PlaylistPanelProps> = ({
  playlists,
  onClose,
  onPlaylistSelect
}) => {
  return (
    <div className="fixed inset-y-0 right-0 w-96 glass-panel border-l border-white/20 z-50 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Playlists</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="glass-button rounded-full p-2"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Playlists List */}
      <div className="space-y-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="glass-card rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-all duration-300 group"
            onClick={() => onPlaylistSelect(playlist)}
          >
            <div className="flex items-center gap-4">
              {/* Playlist Cover */}
              <div className="w-16 h-16 rounded-lg overflow-hidden glass-panel">
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Playlist Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {playlist.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {playlist.songs.length} songs
                </p>
              </div>

              {/* Play Button */}
              <Button
                variant="ghost"
                size="sm"
                className="glass-button rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>

            {/* Songs Preview */}
            <div className="mt-3 space-y-1">
              {playlist.songs.slice(0, 3).map((song, index) => (
                <div key={song.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-4 text-right">{index + 1}</span>
                  <span className="truncate">{song.title}</span>
                  <span className="text-xs opacity-60">by {song.artist}</span>
                </div>
              ))}
              {playlist.songs.length > 3 && (
                <div className="text-xs text-muted-foreground opacity-60">
                  +{playlist.songs.length - 3} more songs
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create New Playlist Button */}
      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full glass-button border-white/30 hover:bg-white/10"
        >
          Create New Playlist
        </Button>
      </div>
    </div>
  );
};