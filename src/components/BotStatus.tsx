
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { BotConfig } from '@/types';

interface BotStatusProps {
  config: BotConfig;
  onToggle: (enabled: boolean) => void;
}

const BotStatus = ({ config, onToggle }: BotStatusProps) => {
  const { enabled, channelId, guildId } = config;
  
  const handleToggle = (checked: boolean) => {
    onToggle(checked);
  };
  
  return (
    <Card className="border-border bg-discord-darker">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium text-lg">Bot Status</h3>
            <p className="text-sm text-muted-foreground">
              {enabled 
                ? 'The Void is active and consuming messages' 
                : 'The Void is dormant'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {enabled ? 'Active' : 'Inactive'}
            </span>
            <div className="flex items-center">
              <Switch 
                checked={enabled} 
                onCheckedChange={handleToggle}
                disabled={!channelId || !guildId}
                className={enabled ? "bg-void-primary" : ""}
              />
              {enabled && (
                <div className="ml-2 h-2 w-2 rounded-full bg-discord-green animate-pulse-slow" />
              )}
            </div>
          </div>
        </div>
        
        {(!channelId || !guildId) && (
          <div className="mt-4 p-3 bg-discord-dark rounded text-sm text-amber-400">
            You need to select a server and channel before activating The Void
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BotStatus;
