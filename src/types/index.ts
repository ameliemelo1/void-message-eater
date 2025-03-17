
export interface DiscordChannel {
  id: string;
  name: string;
  type: number;
  guildId: string;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string;
  channels: DiscordChannel[];
}

export interface BotConfig {
  guildId?: string;
  channelId?: string;
  deleteDelay: number;
  enabled: boolean;
}
