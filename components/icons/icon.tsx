import { cn } from '@/lib/utils';

const iconMap = {
  sun: 'fa-solid fa-sun',
  moon: 'fa-solid fa-moon',
  menu: 'fa-solid fa-bars',
  close: 'fa-solid fa-xmark',
  code: 'fa-solid fa-code',
  
  home: 'fa-solid fa-house',                      // Para Início
  xp: 'fa-solid fa-medal',                        // Para Experiência
  user: 'fa-solid fa-user',                       // Para Sobre
  graduation: 'fa-solid fa-graduation-cap',       // Para Formação
  cpu:  'fa-solid fa-microchip',                  // Para Skills
  mail: 'fa-solid fa-envelope',                   // Para Contato
  rocket:  'fa-solid fa-rocket',                  // Para Projetos
  
  github: 'fa-brands fa-github',
  linkedin: 'fa-brands fa-linkedin',
  whatsapp: 'fa-brands fa-whatsapp',
  instagram: 'fa-brands fa-instagram',
  curriculum: 'fa-solid fa-file-lines',

  download: 'fa-solid fa-download', 
  view: 'fa-solid fa-eye',

  // Línguas
  globe: 'fa-solid fa-earth-americas',
  language: 'fa-solid fa-language',
  check: 'fa-solid fa-check',
  flag: 'fa-solid fa-flag',
};

export type IconName = keyof typeof iconMap;

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconName;
}

export function Icon({ name, className, ...props }: IconProps) {
  const iconClass = iconMap[name];

  if (!iconClass) {
    console.warn(`Icone '${name}' não encontrado no mapa.`);
    return <i className='fa-solid fa-notdef'></i>;
  }

  return (
    <i
      className={cn('flex items-center justify-center text-center', iconClass, className)}
      aria-hidden='true'
      {...props}
    />
  );
}
