'use client';

import { useTranslations } from 'next-intl';
import { useRawArray } from '@/config/formatters';
import { Typewriter } from '@/components/utils/typewriter';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons/icon';
import { CvDialog } from '@/components/dialogs/cv-dialog';
import { siteConfig } from '@/config/site';
import { openUrl, scrollTo } from '@/config/utils';
import ProjectsSection from '@/components/sections/projects-section';
import AboutSection from '@/components/sections/about-section';
import ContactSection from '@/components/sections/contact-section';
import GraduationSection from '@/components/sections/graduation-section';
import ExperienceSection from '@/components/sections/experience-section';

export default function HomePage() {
  const t = useTranslations('Hero');
  const skills = useRawArray('Hero.skills');
  const dialogCV = useTranslations('Dialog.cv');
  const linkGithub = siteConfig.links.github;

  return (
    <div>
    <section id='hero' className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='flex flex-col items-center gap-6 text-center'>
        {/* Título Principal */}
        <h1 className='text-4xl md:text-6xl font-bold'>{t('title')}</h1>

        {/* Efeito de Digitação */}
        <div className='h-8 md:h-10 text-xl md:text-2xl text-blue-500 font-semibold flex items-center justify-center'>
          <Typewriter
            words={skills}
            typingSpeed={80} // Velocidade de escrita
            deletingSpeed={50} // Velocidade de apagar
            pauseTime={2000} // Tempo de espera antes de apagar
          />
        </div>

        {/* Subtítulo */}
        <p className='text-lg md:text-xl text-muted-foreground max-w-lg'>{t('subtitle')}</p>
      </div>
      <div className='relative z-50 flex flex-col gap-4 md:gap-6 mt-8 w-fit mx-auto'>
        <div className='flex gap-3 md:gap-4 w-full'>
          <Button variant='outline_hover' className='px-3 shrink-0 md:h-10' onClick={() => openUrl(linkGithub)} >
            <Icon name='github' className='p-0 md:scale-150' />
          </Button>
          <Button variant='outline_hover' className='px-3 shrink-0 md:h-10' onClick={() => scrollTo('contact')}>
            <Icon name='mail' className='p-0 md:scale-150' />
          </Button>
          <Button variant='outline_hover' className='flex-1 md:h-10 md:text-lg gap-2' onClick={() => scrollTo('projects')}>
            <Icon name='rocket' className='p-0 md:scale-115' /> {t('projects')}
          </Button>
        </div>

        {/* Currículo */}
        <div className='w-full'>
          <CvDialog
            title={dialogCV('title')}
            description={dialogCV('description')}
            text_download={dialogCV('btn-download')}
            text_view={dialogCV('btn-view')}
          >
            <Button variant='outline_hover' className='w-full md:h-12 md:text-lg gap-2'>
              <Icon name='curriculum' className='p-0 md:scale-115' /> {t('curriculum')}
            </Button>
          </CvDialog>
        </div>
      </div>
    </section>
    <AboutSection />
    <ExperienceSection />
    <GraduationSection />
    <ProjectsSection />
    <ContactSection />
    </div>
  );
}
