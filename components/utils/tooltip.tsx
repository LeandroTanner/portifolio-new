import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { isValidString } from "@/lib/formatters";

interface TooltipProps extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    text: string;
    children: React.ReactNode;
}

export function TooltipHover({  title, text, children }: TooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {title && isValidString(title) ? 
            <div className="flex flex-col items-center justify-center">
                <h3 className="font-bold mb-1">{title}</h3> 
                <p>{text}</p>
            </div>
            : 
            <p className="font-bold text-md">{text}</p>
        }
      </TooltipContent>
    </Tooltip>
  )
}
