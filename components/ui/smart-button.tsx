import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SmartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: React.ReactNode;
  href?: string; 
  target?: React.HTMLAttributeAnchorTarget;
}

const SmartButton = React.forwardRef<HTMLButtonElement, SmartButtonProps>(
  ({ className, label, icon, href, onClick, ...props }, ref) => {
    
    const buttonStyles = cn(
      "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full",
      "bg-background/80 border border-input backdrop-blur-sm",
      "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]", 
      "hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:shadow-lg hover:border-primary/50",
      "dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80", 
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "cursor-pointer px-4", 
      className
    );

    const ButtonContent = () => (
      <>
        <span className="relative z-10 flex shrink-0 items-center justify-center transition-transform duration-500 group-hover:rotate-15">
          {icon}
        </span>

        <span className="hidden md:flex max-w-0 flex-col overflow-hidden opacity-0 whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:max-w-50 group-hover:opacity-100">
          <span className="pl-3 text-sm font-medium">{label}</span>
        </span>
      </>
    );

    const Component = href ? 'a' : 'button';
    const componentProps = href ? { href } : { onClick, ...props };

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* @ts-ignore */}
            <Component
              ref={ref as any}
              className={buttonStyles}
              {...componentProps}
            >
              <ButtonContent />
            </Component>
          </TooltipTrigger>
          
          <TooltipContent 
            side="bottom" 
            className="md:hidden bg-zinc-800 text-zinc-50 border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 font-semibold"
          >
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

SmartButton.displayName = "SmartButton";

export { SmartButton };