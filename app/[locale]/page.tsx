'use client';

import { useTranslations } from 'next-intl';
import { useRawArray } from '@/config/formatters';
import { Typewriter } from '@/components/utils/typewriter';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons/icon';
import { CvDialog } from '@/components/dialogs/cv-dialog';
import { siteConfig } from '@/config/site';
import { openUrl, scrollTo } from '@/config/utils';
import { FadeIn } from '@/components/utils/motion';
import { motion } from 'framer-motion';
import ProjectsSection from '@/components/sections/projects-section';
import AboutSection from '@/components/sections/about-section';
import ContactSection from '@/components/sections/contact-section';
import GraduationSection from '@/components/sections/graduation-section';
import ExperienceSection from '@/components/sections/experience-section';

export default function HomePage() {
  const t = useTranslations('Hero');
  const skills = useRawArray('Hero.skills');
  const dialogCV = useTranslations('Dialog.cv');
  const linkGithub = siteConfig.links.githubProject;

  return (
    <div>
      <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance">
              {t('title')}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="h-8 md:h-10 text-xl md:text-2xl text-blue-500 font-semibold flex items-center justify-center">
              <Typewriter
                words={skills}
                typingSpeed={80}
                deletingSpeed={50}
                pauseTime={2000}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg text-pretty">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.7}>
          <div className="relative z-10 flex flex-col gap-4 md:gap-6 mt-8 w-fit mx-auto">
            <div className="flex gap-3 md:gap-4 w-full">
              <Button variant="outline_hover" className="px-3 shrink-0 md:h-10" onClick={() => openUrl(linkGithub)}>
                <Icon name="github" className="p-0 md:scale-125" />
              </Button>
              <Button variant="outline_hover" className="px-3 shrink-0 md:h-10" onClick={() => scrollTo('contact')}>
                <Icon name="mail" className="p-0 md:scale-125" />
              </Button>
              <Button variant="outline_hover" className="flex-1 md:h-10 md:text-md gap-2" onClick={() => scrollTo('projects')}>
                <Icon name="rocket" className="p-0 md:scale-105" /> {t('projects')}
              </Button>
            </div>

            <div className="w-full">
              <CvDialog
                title={dialogCV('title')}
                description={dialogCV('description')}
                text_download={dialogCV('btn-download')}
                text_view={dialogCV('btn-view')}
              >
                <Button variant="outline_hover" className="w-full md:h-12 md:text-md gap-2">
                  <Icon name="curriculum" className="p-0 md:scale-105" /> {t('curriculum')}
                </Button>
              </CvDialog>
            </div>
          </div>
        </FadeIn>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 z-10"
        >
          <button
            onClick={() => scrollTo('about')}
            className="text-muted-foreground hover:text-blue-500 transition-colors duration-300 cursor-pointer"
            aria-label="Scroll down"
          >
            <Icon name="arrowDown" className="text-xl" />
          </button>
        </motion.div>
      </section>

      <AboutSection />
      <ExperienceSection />
      <GraduationSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
