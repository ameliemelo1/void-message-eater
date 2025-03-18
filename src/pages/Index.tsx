
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChannelSelector from '@/components/ChannelSelector';
import DelayConfig from '@/components/DelayConfig';
import BotStatus from '@/components/BotStatus';
import MessageDemo from '@/components/MessageDemo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DiscordGuild, BotConfig } from '@/types';
import { discordService } from '@/services/discordService';
import { toast } from '@/components/ui/use-toast';
import { MainLogo } from '@/components/icons/MainLogo';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [guilds, setGuilds] = useState<DiscordGuild[]>([]);
  const [config, setConfig] = useState<BotConfig>({
    deleteDelay: 5,
    enabled: false
  });

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const auth = discordService.isAuthenticated();
      setIsAuthenticated(auth);

      if (auth) {
        // Fetch data if authenticated
        try {
          const [guildsData, configData] = await Promise.all([
            discordService.getGuilds(),
            discordService.getConfig()
          ]);

          setGuilds(guildsData);
          setConfig(configData);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load data. Please try again.",
            variant: "destructive"
          });
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await discordService.login();
      setIsAuthenticated(true);

      // After login, fetch guilds and config
      const [guildsData, configData] = await Promise.all([
        discordService.getGuilds(),
        discordService.getConfig()
      ]);

      setGuilds(guildsData);
      setConfig(configData);

      toast({
        title: "Connected",
        description: "Successfully connected to Discord",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Could not connect to Discord. Please try again.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await discordService.logout();
      setIsAuthenticated(false);
      toast({
        title: "Disconnected",
        description: "Successfully disconnected from Discord",
      });
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "Could not disconnect. Please try again.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleGuildChange = (guildId: string) => {
    setConfig(prev => ({ ...prev, guildId, channelId: undefined }));
  };

  const handleChannelChange = (channelId: string) => {
    setConfig(prev => ({ ...prev, channelId }));

    // Save the updated config
    discordService.updateConfig({
      ...config,
      channelId
    });
  };

  const handleDelayChange = (delay: number) => {
    setConfig(prev => ({ ...prev, deleteDelay: delay }));

    // Save the updated config
    discordService.updateConfig({
      ...config,
      deleteDelay: delay
    });
  };

  const handleToggleBotStatus = async (enabled: boolean) => {
    try {
      const updatedConfig = await discordService.updateConfig({
        ...config,
        enabled
      });

      setConfig(updatedConfig);
      toast({
        title: enabled ? "Bot Activated" : "Bot Deactivated",
        description: enabled
          ? "The Void is now consuming messages"
          : "The Void is now dormant",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bot status",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <main className="flex-1 py-8">
        <div className="container">
          {!isAuthenticated ? (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
              <MainLogo size={20} />
              <h1 className="text-3xl font-bold text-center">Welcome to <span className="text-secondary">The Void</span></h1>
              <p className="text-center text-muted-foreground max-w-md">
                A Discord bot that removes messages after a specified delay,
                leaving no trace behind. Connect with Discord to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-6">
                <Card className="border-border bg-discord-darker">
                  <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <ChannelSelector
                        guilds={guilds}
                        selectedGuildId={config.guildId}
                        selectedChannelId={config.channelId}
                        onGuildChange={handleGuildChange}
                        onChannelChange={handleChannelChange}
                      />

                      <DelayConfig
                        delay={config.deleteDelay}
                        onDelayChange={handleDelayChange}
                      />
                    </div>
                  </CardContent>
                </Card>

                <BotStatus
                  config={config}
                  onToggle={handleToggleBotStatus}
                />
              </div>

              <div className="md:col-span-8 space-y-6">
                <MessageDemo delay={config.deleteDelay} />

                <Card className="border-border bg-discord-darker">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-4">About The Void</h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-primary">The Void</strong> is a Discord bot that automatically deletes messages
                        from specified channels after a configurable time delay.
                      </p>
                      <p>
                        Perfect for temporary conversations, announcements with expiration dates,
                        or creating an ephemeral chat experience where nothing remains permanent.
                      </p>
                      <p>
                        Messages are consumed by The Void after the specified delay, leaving no trace behind.
                      </p>
                      <div className="p-3 bg-discord-dark rounded">
                        <p className="font-medium text-foreground">How to use:</p>
                        <ol className="list-decimal list-inside space-y-1 mt-2">
                          <li>Select a server and channel</li>
                          <li>Set your desired message deletion delay</li>
                          <li>Activate The Void using the toggle switch</li>
                          <li>Messages in the selected channel will be automatically consumed</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
