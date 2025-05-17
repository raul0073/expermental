import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingSpinnerProps {
  /** Optional text to display below the spinner */
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
}) => (
  <div className="flex flex-col items-center justify-center h-screen p-4">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
    <span className="mt-2 text-sm text-muted-foreground">
      {message}
    </span>
  </div>
);
