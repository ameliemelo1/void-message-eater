
import { DiscordGuild, BotConfig } from '@/types';

// Mock data for frontend demonstration
const mockGuilds: DiscordGuild[] = [
  {
    id: '123456789',
    name: 'The Void Server',
    icon: '',
    channels: [
      { id: 'channel1', name: 'general', type: 0, guildId: '123456789' },
      { id: 'channel2', name: 'void-zone', type: 0, guildId: '123456789' },
      { id: 'channel3', name: 'announcements', type: 0, guildId: '123456789' },
    ]
  },
  {
    id: '987654321',
    name: 'Testing Server',
    icon: '',
    channels: [
      { id: 'channel4', name: 'general', type: 0, guildId: '987654321' },
      { id: 'channel5', name: 'test-void', type: 0, guildId: '987654321' },
      { id: 'channel6', name: 'bot-commands', type: 0, guildId: '987654321' },
    ]
  }
];

const defaultConfig: BotConfig = {
  deleteDelay: 5,
  enabled: false
};

// Mock implementation of API calls
export const discordService = {
  // Mock login
  login: (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('discord_authenticated', 'true');
        resolve(true);
      }, 1000);
    });
  },
  
  // Mock logout
  logout: (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('discord_authenticated');
        resolve(true);
      }, 500);
    });
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem('discord_authenticated') === 'true';
  },
  
  // Get user's guilds
  getGuilds: (): Promise<DiscordGuild[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGuilds);
      }, 800);
    });
  },
  
  // Get bot configuration
  getConfig: (): Promise<BotConfig> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const savedConfig = localStorage.getItem('bot_config');
        if (savedConfig) {
          resolve(JSON.parse(savedConfig));
        } else {
          resolve(defaultConfig);
        }
      }, 500);
    });
  },
  
  // Update bot configuration
  updateConfig: (config: BotConfig): Promise<BotConfig> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('bot_config', JSON.stringify(config));
        resolve(config);
      }, 500);
    });
  }
};
