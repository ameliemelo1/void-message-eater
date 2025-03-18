
import React from 'react';

interface MainLogoProps {
  size: number;
}

export const MainLogo = ({ size }: MainLogoProps) => {
  return (

    <div className={`h-${size} w-${size} rounded-full overflow-hidden bg-void-primary flex items-center justify-center`}>
      <img src="/logo-void.png" className="h-full w-full" />
    </div>
  );
};
