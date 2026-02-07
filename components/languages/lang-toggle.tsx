'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/icons/icon';

export function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='cursor-pointer p-0 hover:bg-accent'>
            <Icon name='language' className='text-xl p-0 m-0' />
            <span className='sr-only'>Trocar idioma</span>
          </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        {/* Opção Português */}
        <DropdownMenuItem
          onClick={() => handleLanguageChange('pt')}
          className='cursor-pointer text-[1rem] font-semibold flex justify-between'
        >
          Português (BR)
          {locale === 'pt' && <Icon name='flag' className='h-3 w-3 ml-2' />}
          <span className='sr-only'>Português Brasil</span>
        </DropdownMenuItem>

        {/* Opção Inglês */}
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className='cursor-pointer text-[1rem] font-semibold flex justify-between'
        >
          English
          {locale === 'en' && <Icon name='flag' className='h-3 w-3 ml-2' />}
          <span className='sr-only'>Inglês</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
