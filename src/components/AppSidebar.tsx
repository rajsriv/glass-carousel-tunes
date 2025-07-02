import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Music, 
  Heart, 
  Plus,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useMusicContext } from '@/contexts/MusicContext';

const navigationItems = [
  { title: 'Home', icon: Home, id: 'home' },
  { title: 'Search', icon: Search, id: 'search' },
  { title: 'Your Library', icon: Music, id: 'library' },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { playlists, favorites } = useMusicContext();
  const [activeSection, setActiveSection] = useState('home');
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar
      className={`${isCollapsed ? 'w-16' : 'w-64'} glass-panel border-r border-white/20`}
      collapsible="icon"
    >
      <SidebarContent className="bg-transparent">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`glass-button ${
                      activeSection === item.id ? 'bg-white/20 text-primary' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span className="ml-3">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Favorites */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 text-muted-foreground">
              <Heart className="h-4 w-4" />
              Liked Songs ({favorites.length})
            </SidebarGroupLabel>
          </SidebarGroup>
        )}

        {/* Playlists */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="flex items-center justify-between text-muted-foreground">
              <span>Playlists</span>
              <Plus className="h-4 w-4 cursor-pointer hover:text-primary" />
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {playlists.map((playlist) => (
                <SidebarMenuItem key={playlist.id}>
                  <SidebarMenuButton className="glass-button">
                    <img
                      src={playlist.cover}
                      alt={playlist.name}
                      className="h-8 w-8 rounded object-cover"
                    />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0 ml-3">
                        <p className="text-sm font-medium truncate">{playlist.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {playlist.songs.length} songs
                        </p>
                      </div>
                    )}
                    {!isCollapsed && <ChevronRight className="h-4 w-4" />}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}