import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingSpinnerProps {
  
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
}) => (
  <div className="flex flex-col items-center justify-center h-[55vh] max-h-screen p-4">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
    <span className="mt-2 text-sm text-muted-foreground capitalize">
      {message}
    </span>
  </div>
);
