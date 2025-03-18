
import React from 'react';
import { Button } from '@/components/ui/button';
import { DiscordLogo } from '@/components/icons/DiscordLogo';
import { LogOut } from 'lucide-react';
import { MainLogo } from './icons/MainLogo';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Header = ({ isAuthenticated, onLogin, onLogout }: HeaderProps) => {
  return (
    <header className="border-b border-border py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MainLogo size={10} />
          <h1 className="text-xl font-bold text-white">The Void</h1>
          <div className="px-2 py-1 bg-void-dark rounded text-xs font-medium text-white">ALPHA</div>
        </div>

        {isAuthenticated ? (
          <Button
            variant="outline"
            onClick={onLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            Disconnect
          </Button>
        ) : (
          <Button
            onClick={onLogin}
            className="bg-discord-primary hover:bg-discord-primary/90 flex items-center gap-2"
          >
            <DiscordLogo className="h-5 w-5" />
            Connect with Discord
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
