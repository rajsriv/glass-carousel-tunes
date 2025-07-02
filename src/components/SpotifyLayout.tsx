import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { SongLibrary } from '@/components/SongLibrary';
import { MiniPlayer } from '@/components/MiniPlayer';
import { MusicProvider } from '@/contexts/MusicContext';

export const SpotifyLayout: React.FC = () => {
  return (
    <MusicProvider>
      <SidebarProvider>
        <div className="min-h-screen w-full relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 noise-background opacity-20" />
          
          <div className="flex min-h-screen w-full relative z-10">
            <AppSidebar />
            
            <main className="flex-1 flex flex-col">
              {/* Header with Sidebar Trigger */}
              <header className="glass-panel border-b border-white/20 p-4 flex items-center">
                <SidebarTrigger className="glass-button rounded-full p-2" />
                <h1 className="ml-4 text-xl font-semibold text-foreground">
                  Music Player
                </h1>
              </header>
              
              {/* Main Content */}
              <div className="flex-1 overflow-y-auto pb-32">
                <SongLibrary />
              </div>
            </main>
          </div>
          
          {/* Mini Player - Always visible at bottom */}
          <MiniPlayer />
        </div>
      </SidebarProvider>
    </MusicProvider>
  );
};