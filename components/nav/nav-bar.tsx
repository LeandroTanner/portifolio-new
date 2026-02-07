import { ModeToggle } from '@/components/themes/mode-toggle';
import { LangToggle } from '../languages/lang-toggle';
import Image from 'next/image';
import { Icon, IconName } from '../icons/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from 'next-intl';
import { TooltipHover } from '../utils/tooltip';

interface NavItem {
  name: string;
  icon: IconName;
  key: string;
}

export default function NavBar() {
  const t = useTranslations('Nav.items');

  const navItems: NavItem[] = [
    { name: t('about'),    icon: 'user',    key: 'about' },
    { name: t('xp'),     icon: 'xp',    key: 'xp' },
    { name: t('graduation'),     icon: 'graduation',    key: 'graduation' },
    { name: t('projects'), icon: 'code',    key: 'projects' },
    { name: t('contact'),  icon: 'mail',    key: 'contact' },
  ];

  return (
    <header className="fixed bottom-4 sm:top-4 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      <nav className="
        flex items-center gap-1 p-1.5
        rounded-full
        bg-white/70 dark:bg-slate-950/70 
        backdrop-blur-md 
        border border-gray-200 dark:border-slate-800
        shadow-lg shadow-black/5
        transition-all duration-300
      ">
        
        {/* LOGO */}
        <TooltipHover text={t('home')}>
          <a href='/' className="flex items-center gap-2 px-2 border-r border-slate-200 dark:border-slate-800 shrink-0">
            <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0">
              <Image
                src="/img/logo/_logo-sm.png"
                alt="Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-sm font-bold hidden sm:block text-slate-700 dark:text-slate-200">
              ltanner<span className="text-blue-500">.dev</span>
            </span>
          </a>
        </TooltipHover>

        {/* LISTA DE ITENS */}
        <TooltipProvider delayDuration={0}>
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href={`#${item.key}`} 
                      className="
                        group flex items-center justify-center
                        w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 
                        rounded-full
                        text-slate-600 dark:text-slate-400
                        hover:bg-white dark:hover:bg-slate-800
                        hover:text-blue-600 dark:hover:text-blue-400
                        transition-all duration-300 ease-in-out
                      "
                    >
                      <Icon name={item.icon} className="w-4 h-4 shrink-0" />
                      
                      {/* TEXTO EXPANSIVO */}
                      <span className="
                        hidden sm:block
                        max-w-0 overflow-hidden opacity-0 
                        sm:group-hover:max-w-25 sm:group-hover:opacity-100 sm:group-hover:ml-2
                        transition-all duration-300 ease-in-out
                        text-xs font-semibold whitespace-nowrap
                      ">
                        {item.name}
                      </span>
                    </a>
                  </TooltipTrigger>
                  
                  {/* CONTEÚDO DO TOOLTIP */}
                  <TooltipContent side="bottom" className="sm:hidden text-xs bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>

        {/* TOGGLES */}
        <div className="flex items-center gap-0.5 pl-1 sm:pl-2 sm:ml-1 border-l border-slate-200 dark:border-slate-800 shrink-0">
          <div className="hidden min-[350px]:block scale-75 sm:scale-90 origin-center"> 
            <ModeToggle />
          </div>
          <div className="scale-75 sm:scale-90 origin-center">
              <LangToggle />
          </div>
        </div>

      </nav>
    </header>
  );
}