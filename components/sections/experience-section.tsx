'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/utils/section-header';
import { FadeIn } from '@/components/utils/motion';
import { Icon } from '@/components/icons/icon';
import { Button } from '@/components/ui/button';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  url?: string;
}

export default function ExperienceSection() {
  const t = useTranslations('Experience');
  const items = t.raw('items') as ExperienceItem[];

  return (
    <section id="experience" className="py-20 md:py-28 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-8 md:gap-12">
            {items.map((item, i) => (
              <FadeIn key={i} delay={i * 0.15} direction="left">
                <div className="relative pl-12 md:pl-20 group">
                  <div className="absolute left-0 md:left-4 top-1 w-8 h-8 rounded-full bg-card border-2 border-blue-500 flex items-center justify-center z-10 group-hover:bg-blue-500 transition-colors duration-300">
                    <Icon name="briefcase" className="text-blue-500 text-xs group-hover:text-card transition-colors duration-300" />
                  </div>

                  <div className="p-5 md:p-6 rounded-2xl border border-border bg-card hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <h3 className="text-lg md:text-xl font-bold text-foreground">{item.role}</h3>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Icon name="calendar" className="text-xs" />
                        {item.period}
                      </span>
                    </div>

                    {!item.url ? 
                    (
                        <p className="flex items-center gap-1.5 text-sm text-blue-500 font-medium mb-3">
                            <Icon name="building" className="text-xs" />
                            {item.company}
                        </p>
                    ) 
                    : 
                    (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-blue-500 font-medium mb-3">
                            <Icon name="building" className="text-xs" />
                            {item.company}
                            <Icon name='link' className='text-xs' />
                        </a>
                    )}

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
