
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface AdminButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  icon?: React.ReactNode;
}

export const AdminButton = forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ className, variant = "primary", icon, children, ...props }, ref) => {
    const baseStyles = "font-medium shadow-sm";
    
    // Map our custom variants to the ButtonProps variants
    const getButtonVariant = () => {
      switch (variant) {
        case "primary": return "default";
        case "secondary": return "secondary";
        case "outline": return "outline";
        case "danger": return "destructive";
        default: return "default";
      }
    };
    
    const variantStyles = {
      primary: "bg-career-blue text-white hover:bg-career-blue/90",
      secondary: "bg-career-purple text-white hover:bg-career-purple/90",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };
    
    return (
      <Button
        ref={ref}
        variant={getButtonVariant()}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Button>
    );
  }
);

AdminButton.displayName = "AdminButton";
