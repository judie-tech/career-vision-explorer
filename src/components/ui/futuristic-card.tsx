
import React from 'react';
import { cn } from '@/lib/utils';

export interface FuturisticCardProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  style?: React.CSSProperties;
}

export const FuturisticCard: React.FC<FuturisticCardProps> = ({ 
  children, 
  className, 
  animated = false,
  style,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "futuristic-card",
        animated && "floating",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default FuturisticCard;
