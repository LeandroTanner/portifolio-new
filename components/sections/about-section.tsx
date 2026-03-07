'use client';

import { useTranslations } from 'next-intl';
import { useRawArray } from '@/config/formatters';
import { SectionHeader } from '@/components/utils/section-header';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/utils/motion';
import { Icon } from '@/components/icons/icon';

const highlightIcons = ['briefcase', 'rocket', 'cpu', 'star'] as const;

export default function AboutSection() {
  const t = useTranslations('About');
  const highlights = t.raw('highlights') as { label: string; value: string; id: string }[];
  const paragraphs = t.raw('paragraphs') as string[];
  const projects = useRawArray('Projects.items');
  const skills = useRawArray('Projects.techStack');
  const skillsCount = skills.length;
  const projectsCount = projects.length;

  return (
    <section id="about" className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t('title')} />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <FadeIn direction="left" className="flex-1">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              {t('description')}
            </p>
            {paragraphs.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 gap-4 lg:gap-5 w-full lg:w-auto lg:min-w-[320px]" staggerDelay={0.15}>
            {highlights.map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex flex-col items-center gap-3 p-5 md:p-6 rounded-2xl border border-border bg-card hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Icon name={highlightIcons[i]} className="text-blue-500 text-lg" />
                  </div>
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    {
                      item.id === 'skills' ? `${skillsCount} +` : item.id === 'projects' ? `${projectsCount} +` : item.value
                    }
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground text-center text-nowrap">{item.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
