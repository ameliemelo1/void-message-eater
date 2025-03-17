
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MessageDemoProps {
  delay: number;
}

const MessageDemo = ({ delay }: MessageDemoProps) => {
  const [messages, setMessages] = useState<Array<{id: string, text: string, fading: boolean}>>([]);
  
  const addMessage = () => {
    const demoMessages = [
      "Hello world!",
      "This message will disappear soon...",
      "The void consumes all...",
      "Nothing lasts forever",
      "Temporary thoughts..."
    ];
    
    const newMessage = {
      id: Math.random().toString(36).substring(2, 9),
      text: demoMessages[Math.floor(Math.random() * demoMessages.length)],
      fading: false
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Start the deletion sequence
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, fading: true } : msg
        )
      );
      
      // Remove the message after fade animation
      setTimeout(() => {
        setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
      }, 1000);
    }, delay * 1000);
  };
  
  return (
    <Card className="border-border bg-discord-darker">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Message Preview</h3>
          <Button 
            size="sm"
            onClick={addMessage}
            className="bg-void-primary hover:bg-void-dark"
          >
            Send Test Message
          </Button>
        </div>
        
        <div className="bg-discord-dark rounded-md h-[200px] overflow-y-auto p-4 flex flex-col gap-2">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              Click "Send Test Message" to see how messages disappear
            </div>
          ) : (
            messages.map(message => (
              <div 
                key={message.id}
                className={`bg-discord-darker p-3 rounded-md ${message.fading ? 'animate-fade' : ''}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 rounded-full bg-void-primary flex items-center justify-center">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                  <div className="font-medium">User</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageDemo;
