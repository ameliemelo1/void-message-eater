
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface DelayConfigProps {
  delay: number;
  onDelayChange: (delay: number) => void;
}

const DelayConfig = ({ delay, onDelayChange }: DelayConfigProps) => {
  const handleSliderChange = (value: number[]) => {
    onDelayChange(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 300) {
      onDelayChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-muted-foreground block">
        Message Deletion Delay (seconds)
      </label>
      
      <div className="flex items-center gap-4">
        <Slider
          value={[delay]}
          min={1}
          max={300}
          step={1}
          onValueChange={handleSliderChange}
          className="flex-1"
        />
        <div className="w-20">
          <Input
            type="number"
            value={delay}
            onChange={handleInputChange}
            min={1}
            max={300}
            className="bg-discord-darker"
          />
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        {delay === 1 ? (
          <p>Messages will be deleted after 1 second</p>
        ) : (
          <p>Messages will be deleted after {delay} seconds</p>
        )}
      </div>
    </div>
  );
};

export default DelayConfig;
