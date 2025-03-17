
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DiscordChannel, DiscordGuild } from '@/types';

interface ChannelSelectorProps {
  guilds: DiscordGuild[];
  selectedGuildId?: string;
  selectedChannelId?: string;
  onGuildChange: (guildId: string) => void;
  onChannelChange: (channelId: string) => void;
}

const ChannelSelector = ({
  guilds,
  selectedGuildId,
  selectedChannelId,
  onGuildChange,
  onChannelChange
}: ChannelSelectorProps) => {
  const selectedGuild = guilds.find(guild => guild.id === selectedGuildId);
  const channels = selectedGuild?.channels || [];
  const textChannels = channels.filter(channel => channel.type === 0); // Type 0 is text channel in Discord API
  
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Server</label>
        <Select
          value={selectedGuildId}
          onValueChange={onGuildChange}
        >
          <SelectTrigger className="bg-discord-darker">
            <SelectValue placeholder="Select a server" />
          </SelectTrigger>
          <SelectContent>
            {guilds.map((guild) => (
              <SelectItem key={guild.id} value={guild.id}>
                <div className="flex items-center gap-2">
                  {guild.icon ? (
                    <img 
                      src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} 
                      alt={guild.name} 
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs">{guild.name.charAt(0)}</span>
                    </div>
                  )}
                  {guild.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Channel</label>
        <Select
          value={selectedChannelId}
          onValueChange={onChannelChange}
          disabled={!selectedGuildId}
        >
          <SelectTrigger className="bg-discord-darker">
            <SelectValue placeholder="Select a channel" />
          </SelectTrigger>
          <SelectContent>
            {textChannels.map((channel) => (
              <SelectItem key={channel.id} value={channel.id}>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">#</span>
                  {channel.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ChannelSelector;
