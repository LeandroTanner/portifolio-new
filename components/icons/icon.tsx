import { cn } from '@/lib/utils';

const iconMap = {
  sun: 'fa-solid fa-sun',
  moon: 'fa-solid fa-moon',
  menu: 'fa-solid fa-bars',
  close: 'fa-solid fa-xmark',
  code: 'fa-solid fa-code',
  clear: 'fa-solid fa-broom',
  info: 'fa-solid fa-info',
  soon: 'fa-solid fa-hourglass-half fa-beat-fade',
  
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
  telegram: 'fa-brands fa-telegram',
  curriculum: 'fa-solid fa-file-lines',

  download: 'fa-solid fa-download', 
  view: 'fa-solid fa-eye',

  // Línguas
  globe: 'fa-solid fa-earth-americas',
  language: 'fa-solid fa-language',
  check: 'fa-solid fa-check',
  flag: 'fa-solid fa-flag',

  briefcase: 'fa-solid fa-briefcase',
  calendar: 'fa-solid fa-calendar-days',
  building: 'fa-solid fa-building',
  certificate: 'fa-solid fa-award',
  award: 'fa-solid fa-award',
  book: 'fa-solid fa-book',
  link: 'fa-solid fa-arrow-up-right-from-square',
  location: 'fa-solid fa-location-dot',
  clock: 'fa-solid fa-clock',
  heart: 'fa-solid fa-heart',
  star: 'fa-solid fa-star',
  bolt: 'fa-solid fa-bolt',
  loader: 'fa-solid fa-spinner', 
  send: 'fa-solid fa-paper-plane',
  phone: 'fa-solid fa-phone',
  chevronRight: 'fa-solid fa-chevron-right',
  arrowDown: 'fa-solid fa-arrow-down',
  quote: 'fa-solid fa-quote-left',

  csharp: 'fa-brands fa-microsoft',
  dotnet: 'fa-brands fa-microsoft',
  database: 'fa-solid fa-database',
  postgre: 'fa-brands fa-postgresql',
  javascript: 'fa-brands fa-js',
  php: 'fa-brands fa-php',
  java: 'fa-brands fa-java',
  linux: 'fa-brands fa-linux',
  typescript: 'fa-brands fa-typescript',
  react: 'fa-brands fa-react',
  nextjs: 'fa-brands fa-react',
  nodejs: 'fa-brands fa-node-js',
  tailwind: 'fa-brands fa-css3-alt',
  bootstrap: 'fa-brands fa-bootstrap',
  html: 'fa-brands fa-html5',
  css: 'fa-brands fa-css3-alt',
  git: 'fa-brands fa-git-alt',
  docker: 'fa-brands fa-docker',
  figma: 'fa-brands fa-figma',
  python: 'fa-brands fa-python',
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
