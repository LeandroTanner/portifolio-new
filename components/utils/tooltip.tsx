import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { isValidString } from '@/config/formatters';
import { Inter } from 'next/font/google';

const interTooltip = Inter({ subsets: ['latin'] });

interface TooltipProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  text: string;
  children: React.ReactNode;
}

export function TooltipHover({ title, text, children }: TooltipProps) {
  const hasTitle = title && isValidString(title);

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className={`${interTooltip.className} max-w-xs text-left`}>
        {hasTitle ? (
          <div className='flex flex-col items-center justify-center'>
            <h3 className='mb-1 font-bold'>{title}</h3>
            <p>{text}</p>
          </div>
        ) : (
          <p className='text-md'>{text}</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
