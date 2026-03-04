'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/utils/section-header';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/utils/motion';
import { Icon, IconName } from '@/components/icons/icon';
import { Button } from '@/components/ui/button';
import { openUrl } from '@/config/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
}

interface TechItem {
  name: string;
  icon: string;
}

export default function ProjectsSection() {
  const t = useTranslations('Projects');
  const items = t.raw('items') as ProjectItem[];
  const techStack = t.raw('techStack') as TechItem[];

  return (
    <section id="projects" className="py-20 md:py-28 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-20 md:mb-28" staggerDelay={0.15}>
          {items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="group h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col">
                <div className="relative h-44 md:h-48 bg-muted overflow-hidden">
                  {item.image ? (
                    <Image 
                      src={item.image} 
                      alt={`Thumbnail do projeto ${item.title}`}
                      fill
                      className="object-contain object-center p-4 group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    // Fallback
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                      <Icon name="code" className="text-4xl text-blue-500/40 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  )}
                </div>

                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{item.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.technologies.map((tech, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {item.liveUrl && (
                      <Button
                        variant="outline_hover"
                        size="sm"
                        className="flex-1 gap-1.5 text-xs"
                        onClick={() => openUrl(item.liveUrl)}
                      >
                        <Icon name="link" className="text-xs" />
                        {t('viewProject')}
                      </Button>
                    )}
                    {item.repoUrl && (
                      <Button
                        variant="outline_hover"
                        size="sm"
                        className="flex-1 gap-1.5 text-xs"
                        onClick={() => openUrl(item.repoUrl)}
                      >
                        <Icon name="github" className="text-xs" />
                        {t('viewCode')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn>
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-balance">{t('techTitle')}</h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto text-pretty">{t('techSubtitle')}</p>
            <div className="w-12 h-1 rounded-full bg-blue-500 mx-auto mt-4" />
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4" staggerDelay={0.05}>
          {techStack.map((tech, i) => (
            <StaggerItem key={i}>
                <motion.div
                    whileHover={{ y: -4, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group flex flex-col items-center gap-2.5 p-3 md:p-4 rounded-xl border border-border bg-card hover:border-blue-500/30 hover:shadow-md transition-colors duration-300 cursor-default"
                >
                    <Icon name={tech.icon as IconName} className="text-xl md:text-2xl text-muted-foreground group-hover:text-blue-500" />
                    <span className="text-xs font-medium text-muted-foreground text-center leading-tight">{tech.name}</span>
                </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <p className='text-muted-foreground text-sm mt-3 text-center' >{t('explanation')}</p>

    </section>
  );
}
