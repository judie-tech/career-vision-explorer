
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FuturisticCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  animated?: boolean;
}

export const FuturisticCard = ({ 
  children, 
  className, 
  hover = true, 
  glow = false, 
  animated = false 
}: FuturisticCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300",
        hover && "hover:scale-105 hover:shadow-2xl",
        glow && "pulse-glow",
        animated && "floating-animation",
        className
      )}
    >
      {children}
    </div>
  );
};
