import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Hero');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-4xl text-center font-bold mb-4'>{t('title')}</h1>
      <p className='text-xl text-muted-foreground'>{t('subtitle')}</p>
    </div>
  );
}
